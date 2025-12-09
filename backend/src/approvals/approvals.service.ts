import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotionService } from '../notion/notion.service';
import { ApprovalStatus, EntityStatus } from '@prisma/client';

@Injectable()
export class ApprovalsService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => NotionService))
    private notionService: NotionService,
  ) {}

  // Listar todas as solicitações pendentes
  async findPendingRequests() {
    return this.prisma.registrationRequest.findMany({
      where: { status: ApprovalStatus.PENDING },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Listar todas as solicitações (todas os status)
  async findAllRequests() {
    return this.prisma.registrationRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Aprovar solicitação
  async approveRequest(requestId: string, adminId: string) {
    const request = await this.prisma.registrationRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Solicitação não encontrada');
    }

    if (request.status !== ApprovalStatus.PENDING) {
      throw new BadRequestException('Solicitação já foi processada');
    }

    // Atualizar solicitação
    await this.prisma.registrationRequest.update({
      where: { id: requestId },
      data: {
        status: ApprovalStatus.APPROVED,
        reviewedBy: adminId,
        reviewedAt: new Date(),
      },
    });

    // Aprovar a entidade correspondente
    if (request.entityId) {
      if (request.entityType === 'TOURIST_POINT') {
        await this.prisma.touristPoint.update({
          where: { id: request.entityId },
          data: { status: EntityStatus.ACTIVE },
        });
      } else if (request.entityType === 'RESTAURANT') {
        await this.prisma.restaurant.update({
          where: { id: request.entityId },
          data: { status: EntityStatus.ACTIVE },
        });
      } else if (request.entityType === 'ACCOMMODATION') {
        await this.prisma.accommodation.update({
          where: { id: request.entityId },
          data: { status: EntityStatus.ACTIVE },
        });
      }

      // 🔥 SINCRONIZAÇÃO AUTOMÁTICA COM NOTION
      try {
        await this.notionService.syncEntityOnApproval(request.entityType, request.entityId);
      } catch (error) {
        // Não falhar a aprovação se Notion falhar
        console.warn('Erro ao sincronizar com Notion (não crítico):', error.message);
      }
    }

    return { message: 'Solicitação aprovada com sucesso' };
  }

  // Rejeitar solicitação
  async rejectRequest(requestId: string, adminId: string, reason: string) {
    const request = await this.prisma.registrationRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Solicitação não encontrada');
    }

    if (request.status !== ApprovalStatus.PENDING) {
      throw new BadRequestException('Solicitação já foi processada');
    }

    // Atualizar solicitação
    await this.prisma.registrationRequest.update({
      where: { id: requestId },
      data: {
        status: ApprovalStatus.REJECTED,
        reviewedBy: adminId,
        reviewedAt: new Date(),
        rejectionReason: reason,
      },
    });

    // Opcional: Excluir ou marcar como inativa a entidade rejeitada
    if (request.entityId) {
      if (request.entityType === 'TOURIST_POINT') {
        await this.prisma.touristPoint.update({
          where: { id: request.entityId },
          data: { status: EntityStatus.INACTIVE },
        });
      } else if (request.entityType === 'RESTAURANT') {
        await this.prisma.restaurant.update({
          where: { id: request.entityId },
          data: { status: EntityStatus.INACTIVE },
        });
      } else if (request.entityType === 'ACCOMMODATION') {
        await this.prisma.accommodation.update({
          where: { id: request.entityId },
          data: { status: EntityStatus.INACTIVE },
        });
      }
    }

    return { message: 'Solicitação rejeitada' };
  }

  // Buscar detalhes de uma solicitação
  async findOne(requestId: string) {
    const request = await this.prisma.registrationRequest.findUnique({
      where: { id: requestId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            phone: true,
          },
        },
      },
    });

    if (!request) {
      throw new NotFoundException('Solicitação não encontrada');
    }

    // Buscar dados da entidade se existir
    let entityData = null;
    if (request.entityId) {
      if (request.entityType === 'TOURIST_POINT') {
        entityData = await this.prisma.touristPoint.findUnique({
          where: { id: request.entityId },
        });
      } else if (request.entityType === 'RESTAURANT') {
        entityData = await this.prisma.restaurant.findUnique({
          where: { id: request.entityId },
        });
      } else if (request.entityType === 'ACCOMMODATION') {
        entityData = await this.prisma.accommodation.findUnique({
          where: { id: request.entityId },
        });
      }
    }

    return {
      ...request,
      entityData,
    };
  }

  // Estatísticas de aprovações
  async getStats() {
    const [pending, approved, rejected, total] = await Promise.all([
      this.prisma.registrationRequest.count({
        where: { status: ApprovalStatus.PENDING },
      }),
      this.prisma.registrationRequest.count({
        where: { status: ApprovalStatus.APPROVED },
      }),
      this.prisma.registrationRequest.count({
        where: { status: ApprovalStatus.REJECTED },
      }),
      this.prisma.registrationRequest.count(),
    ]);

    return {
      pending,
      approved,
      rejected,
      total,
    };
  }
}

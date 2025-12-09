import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTouristPointDto, UpdateTouristPointDto } from './dto/tourist-point.dto';
import { EntityStatus, ApprovalStatus } from '@prisma/client';

@Injectable()
export class TouristPointsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTouristPointDto) {
    const point = await this.prisma.touristPoint.create({
      data: { ...dto, ownerId: userId, status: EntityStatus.PENDING_APPROVAL },
    });

    await this.prisma.registrationRequest.create({
      data: {
        userId,
        entityType: 'TOURIST_POINT',
        entityId: point.id,
        status: ApprovalStatus.PENDING,
        requestData: dto,
      },
    });

    return { message: 'Ponto turístico criado e aguardando aprovação', point };
  }

  async findAll(city?: string) {
    return this.prisma.touristPoint.findMany({
      where: { status: EntityStatus.ACTIVE, ...(city && { city }) },
      include: { owner: { select: { name: true, phone: true } } },
    });
  }

  async findMyPoints(userId: string) {
    return this.prisma.touristPoint.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const point = await this.prisma.touristPoint.findUnique({
      where: { id },
      include: { owner: { select: { name: true, phone: true } } },
    });
    if (!point) throw new NotFoundException('Ponto turístico não encontrado');
    return point;
  }

  async update(id: string, userId: string, userRole: string, dto: UpdateTouristPointDto) {
    const point = await this.prisma.touristPoint.findUnique({ where: { id } });
    if (!point) throw new NotFoundException('Ponto turístico não encontrado');
    if (userRole !== 'ADMIN' && point.ownerId !== userId) {
      throw new ForbiddenException('Você não tem permissão para editar este ponto');
    }
    return this.prisma.touristPoint.update({ where: { id }, data: dto });
  }

  async remove(id: string, userId: string, userRole: string) {
    const point = await this.prisma.touristPoint.findUnique({ where: { id } });
    if (!point) throw new NotFoundException('Ponto turístico não encontrado');
    if (userRole !== 'ADMIN' && point.ownerId !== userId) {
      throw new ForbiddenException('Você não tem permissão para excluir este ponto');
    }
    await this.prisma.touristPoint.delete({ where: { id } });
    return { message: 'Ponto turístico excluído com sucesso' };
  }
}

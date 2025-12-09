import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EntityStatus, ApprovalStatus } from '@prisma/client';

@Injectable()
export class AccommodationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    const accommodation = await this.prisma.accommodation.create({
      data: { ...data, ownerId: userId, status: EntityStatus.PENDING_APPROVAL },
    });
    await this.prisma.registrationRequest.create({
      data: { userId, entityType: 'ACCOMMODATION', entityId: accommodation.id, status: ApprovalStatus.PENDING, requestData: data },
    });
    return { message: 'Hospedagem criada e aguardando aprovação', accommodation };
  }

  async findAll(city?: string) {
    return this.prisma.accommodation.findMany({
      where: { status: EntityStatus.ACTIVE, ...(city && { city }) },
      include: { owner: { select: { name: true, phone: true } } },
    });
  }

  async findMyAccommodations(userId: string) {
    return this.prisma.accommodation.findMany({ where: { ownerId: userId } });
  }

  async findOne(id: string) {
    return this.prisma.accommodation.findUnique({
      where: { id },
      include: { owner: { select: { name: true, phone: true } } },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.accommodation.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.accommodation.delete({ where: { id } });
    return { message: 'Hospedagem excluída' };
  }
}

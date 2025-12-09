import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EntityStatus, ApprovalStatus } from '@prisma/client';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    const restaurant = await this.prisma.restaurant.create({
      data: { ...data, ownerId: userId, status: EntityStatus.PENDING_APPROVAL },
    });
    await this.prisma.registrationRequest.create({
      data: { userId, entityType: 'RESTAURANT', entityId: restaurant.id, status: ApprovalStatus.PENDING, requestData: data },
    });
    return { message: 'Restaurante criado e aguardando aprovação', restaurant };
  }

  async findAll(city?: string) {
    return this.prisma.restaurant.findMany({
      where: { status: EntityStatus.ACTIVE, ...(city && { city }) },
      include: { owner: { select: { name: true, phone: true } } },
    });
  }

  async findMyRestaurants(userId: string) {
    return this.prisma.restaurant.findMany({ where: { ownerId: userId } });
  }

  async findOne(id: string) {
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: { owner: { select: { name: true, phone: true } } },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.restaurant.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.prisma.restaurant.delete({ where: { id } });
    return { message: 'Restaurante excluído' };
  }
}

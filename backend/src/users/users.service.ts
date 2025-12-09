import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        city: true,
        cnpj: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        city: true,
        cnpj: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        city: true,
        cnpj: true,
        createdAt: true,
      },
    });

    // Buscar estatísticas baseado no role
    let stats = {};

    if (user.role === 'TOURIST_POINT') {
      const points = await this.prisma.touristPoint.findMany({
        where: { ownerId: userId },
        select: { status: true },
      });
      stats = {
        total: points.length,
        active: points.filter(p => p.status === 'ACTIVE').length,
        pending: points.filter(p => p.status === 'PENDING_APPROVAL').length,
      };
    } else if (user.role === 'RESTAURANT') {
      const restaurants = await this.prisma.restaurant.findMany({
        where: { ownerId: userId },
        select: { status: true },
      });
      stats = {
        total: restaurants.length,
        active: restaurants.filter(r => r.status === 'ACTIVE').length,
        pending: restaurants.filter(r => r.status === 'PENDING_APPROVAL').length,
      };
    } else if (user.role === 'ACCOMMODATION') {
      const accommodations = await this.prisma.accommodation.findMany({
        where: { ownerId: userId },
        select: { status: true },
      });
      stats = {
        total: accommodations.length,
        active: accommodations.filter(a => a.status === 'ACTIVE').length,
        pending: accommodations.filter(a => a.status === 'PENDING_APPROVAL').length,
      };
    }

    return { ...user, stats };
  }
}

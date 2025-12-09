import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  // Relatório geral para Admin
  async getAdminStats() {
    const [users, touristPoints, restaurants, accommodations, pendingApprovals] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.touristPoint.count(),
      this.prisma.restaurant.count(),
      this.prisma.accommodation.count(),
      this.prisma.registrationRequest.count({ where: { status: 'PENDING' } }),
    ]);

    return {
      users,
      touristPoints,
      restaurants,
      accommodations,
      pendingApprovals,
      timestamp: new Date(),
    };
  }

  // Relatório por cidade (Prefeitura)
  async getCityStats(city: string) {
    const [touristPoints, restaurants, accommodations] = await Promise.all([
      this.prisma.touristPoint.findMany({
        where: { city, status: 'ACTIVE' },
        select: { id: true, name: true, category: true },
      }),
      this.prisma.restaurant.findMany({
        where: { city, status: 'ACTIVE' },
        select: { id: true, name: true, cuisine: true },
      }),
      this.prisma.accommodation.findMany({
        where: { city, status: 'ACTIVE' },
        select: { id: true, name: true, type: true },
      }),
    ]);

    return {
      city,
      stats: {
        touristPoints: touristPoints.length,
        restaurants: restaurants.length,
        accommodations: accommodations.length,
        total: touristPoints.length + restaurants.length + accommodations.length,
      },
      details: { touristPoints, restaurants, accommodations },
      timestamp: new Date(),
    };
  }

  // Criar relatório e salvar no banco
  async createReport(type: string, city: string | null, data: any, userId?: string) {
    return this.prisma.report.create({
      data: {
        title: `Relatório ${type} - ${city || 'Geral'}`,
        type,
        city,
        data,
        generatedBy: userId,
      },
    });
  }

  // Listar relatórios salvos
  async findAll(city?: string) {
    return this.prisma.report.findMany({
      where: city ? { city } : {},
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}

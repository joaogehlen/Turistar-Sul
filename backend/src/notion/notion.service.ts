import { Injectable, Logger } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotionService {
  private notion: Client;
  private readonly logger = new Logger(NotionService.name);

  constructor(private prisma: PrismaService) {
    const token = process.env.NOTION_TOKEN;
    if (token) {
      this.notion = new Client({ auth: token });
    }
  }

  private isConfigured(): boolean {
    return !!this.notion && !!process.env.NOTION_DATABASE_ID;
  }

  // Sincronizar Ponto Turístico
  async syncTouristPointToNotion(pointId: string) {
    if (!this.isConfigured()) {
      this.logger.warn('Notion não configurado');
      return { success: false, message: 'Notion não configurado' };
    }

    try {
      const point = await this.prisma.touristPoint.findUnique({
        where: { id: pointId },
        include: { owner: { select: { name: true, email: true } } },
      });

      if (!point) return { success: false, message: 'Ponto turístico não encontrado' };

      const response = await this.notion.pages.create({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: {
          Name: { title: [{ text: { content: point.name } }] },
          Type: { select: { name: 'Ponto Turístico' } },
          City: { select: { name: point.city } },
          State: { rich_text: [{ text: { content: point.state } }] },
          Category: point.category ? { select: { name: point.category } } : undefined,
          Status: { select: { name: point.status } },
          Owner: { rich_text: [{ text: { content: point.owner.name } }] },
          Address: { rich_text: [{ text: { content: point.address } }] },
          CreatedAt: { date: { start: point.createdAt.toISOString() } },
        },
      });

      await this.prisma.notionSync.create({
        data: {
          entityType: 'TOURIST_POINT',
          entityId: pointId,
          notionPageId: response.id,
          syncData: { name: point.name, city: point.city },
        },
      });

      this.logger.log(`Ponto turístico sincronizado: ${point.name}`);
      return { success: true, notionPageId: response.id };
    } catch (error) {
      this.logger.error('Erro ao sincronizar ponto turístico:', error.message);
      return { success: false, message: error.message };
    }
  }

  // Sincronizar Restaurante
  async syncRestaurantToNotion(restaurantId: string) {
    if (!this.isConfigured()) {
      this.logger.warn('Notion não configurado');
      return { success: false, message: 'Notion não configurado' };
    }

    try {
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
        include: { owner: { select: { name: true, email: true } } },
      });

      if (!restaurant) return { success: false, message: 'Restaurante não encontrado' };

      const response = await this.notion.pages.create({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: {
          Name: { title: [{ text: { content: restaurant.name } }] },
          Type: { select: { name: 'Restaurante' } },
          City: { select: { name: restaurant.city } },
          State: { rich_text: [{ text: { content: restaurant.state } }] },
          Cuisine: restaurant.cuisine ? { select: { name: restaurant.cuisine } } : undefined,
          PriceRange: restaurant.priceRange ? { select: { name: restaurant.priceRange } } : undefined,
          Status: { select: { name: restaurant.status } },
          Owner: { rich_text: [{ text: { content: restaurant.owner.name } }] },
          Address: { rich_text: [{ text: { content: restaurant.address } }] },
          Phone: restaurant.phone ? { phone_number: restaurant.phone } : undefined,
          CreatedAt: { date: { start: restaurant.createdAt.toISOString() } },
        },
      });

      await this.prisma.notionSync.create({
        data: {
          entityType: 'RESTAURANT',
          entityId: restaurantId,
          notionPageId: response.id,
          syncData: { name: restaurant.name, city: restaurant.city },
        },
      });

      this.logger.log(`Restaurante sincronizado: ${restaurant.name}`);
      return { success: true, notionPageId: response.id };
    } catch (error) {
      this.logger.error('Erro ao sincronizar restaurante:', error.message);
      return { success: false, message: error.message };
    }
  }

  // Sincronizar Hospedagem
  async syncAccommodationToNotion(accommodationId: string) {
    if (!this.isConfigured()) {
      this.logger.warn('Notion não configurado');
      return { success: false, message: 'Notion não configurado' };
    }

    try {
      const accommodation = await this.prisma.accommodation.findUnique({
        where: { id: accommodationId },
        include: { owner: { select: { name: true, email: true } } },
      });

      if (!accommodation) return { success: false, message: 'Hospedagem não encontrada' };

      const response = await this.notion.pages.create({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: {
          Name: { title: [{ text: { content: accommodation.name } }] },
          Type: { select: { name: 'Hospedagem' } },
          City: { select: { name: accommodation.city } },
          State: { rich_text: [{ text: { content: accommodation.state } }] },
          AccommodationType: accommodation.type ? { select: { name: accommodation.type } } : undefined,
          Rooms: accommodation.rooms ? { number: accommodation.rooms } : undefined,
          PricePerNight: accommodation.pricePerNight ? { number: Number(accommodation.pricePerNight) } : undefined,
          Status: { select: { name: accommodation.status } },
          Owner: { rich_text: [{ text: { content: accommodation.owner.name } }] },
          Address: { rich_text: [{ text: { content: accommodation.address } }] },
          Phone: accommodation.phone ? { phone_number: accommodation.phone } : undefined,
          CreatedAt: { date: { start: accommodation.createdAt.toISOString() } },
        },
      });

      await this.prisma.notionSync.create({
        data: {
          entityType: 'ACCOMMODATION',
          entityId: accommodationId,
          notionPageId: response.id,
          syncData: { name: accommodation.name, city: accommodation.city },
        },
      });

      this.logger.log(`Hospedagem sincronizada: ${accommodation.name}`);
      return { success: true, notionPageId: response.id };
    } catch (error) {
      this.logger.error('Erro ao sincronizar hospedagem:', error.message);
      return { success: false, message: error.message };
    }
  }

  // Sincronizar Relatório
  async syncReportToNotion(reportId: string) {
    if (!this.isConfigured()) {
      this.logger.warn('Notion não configurado');
      return { success: false, message: 'Notion não configurado' };
    }

    try {
      const report = await this.prisma.report.findUnique({ where: { id: reportId } });
      if (!report) return { success: false, message: 'Relatório não encontrado' };

      const response = await this.notion.pages.create({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: {
          Name: { title: [{ text: { content: report.title } }] },
          Type: { select: { name: 'Relatório' } },
          ReportType: { select: { name: report.type } },
          City: report.city ? { select: { name: report.city } } : undefined,
          CreatedAt: { date: { start: report.createdAt.toISOString() } },
        },
      });

      await this.prisma.notionSync.create({
        data: {
          entityType: 'REPORT',
          entityId: reportId,
          notionPageId: response.id,
          syncData: { reportTitle: report.title },
        },
      });

      this.logger.log(`Relatório sincronizado: ${report.title}`);
      return { success: true, notionPageId: response.id };
    } catch (error) {
      this.logger.error('Erro ao sincronizar relatório:', error.message);
      return { success: false, message: error.message };
    }
  }

  // Sincronizar automaticamente qualquer entidade aprovada
  async syncEntityOnApproval(entityType: string, entityId: string) {
    this.logger.log(`Sincronizando ${entityType} automaticamente: ${entityId}`);

    switch (entityType) {
      case 'TOURIST_POINT':
        return this.syncTouristPointToNotion(entityId);
      case 'RESTAURANT':
        return this.syncRestaurantToNotion(entityId);
      case 'ACCOMMODATION':
        return this.syncAccommodationToNotion(entityId);
      default:
        return { success: false, message: 'Tipo de entidade não suportado' };
    }
  }

  async getSyncStatus(entityType: string, entityId: string) {
    return this.prisma.notionSync.findUnique({
      where: { entityType_entityId: { entityType, entityId } },
    });
  }

  async getAllSyncs() {
    return this.prisma.notionSync.findMany({
      orderBy: { syncedAt: 'desc' },
      take: 100,
    });
  }
}

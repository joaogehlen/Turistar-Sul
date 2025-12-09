import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('Relatórios')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('admin-stats')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Estatísticas gerais (Admin)' })
  getAdminStats() {
    return this.reportsService.getAdminStats();
  }

  @Get('city-stats')
  @Roles(Role.PREFECTURE, Role.ADMIN)
  @ApiOperation({ summary: 'Estatísticas por cidade (Prefeitura/Admin)' })
  getCityStats(@Query('city') city: string, @CurrentUser() user: any) {
    // Se for prefeitura, usar a cidade do usuário
    const targetCity = user.role === Role.PREFECTURE ? user.city : city;
    return this.reportsService.getCityStats(targetCity);
  }

  @Get()
  @Roles(Role.ADMIN, Role.PREFECTURE)
  @ApiOperation({ summary: 'Listar relatórios salvos' })
  findAll(@Query('city') city?: string) {
    return this.reportsService.findAll(city);
  }

  @Post('generate')
  @Roles(Role.ADMIN, Role.PREFECTURE)
  @ApiOperation({ summary: 'Gerar e salvar relatório' })
  async generateReport(@CurrentUser() user: any, @Body() body: { type: string; city?: string }) {
    const data = body.city 
      ? await this.reportsService.getCityStats(body.city)
      : await this.reportsService.getAdminStats();
    
    return this.reportsService.createReport(body.type, body.city || null, data, user.id);
  }
}

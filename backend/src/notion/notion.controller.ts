import { Controller, Post, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { NotionService } from './notion.service';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Notion Integration')
@ApiBearerAuth()
@Controller('notion')
export class NotionController {
  constructor(private notionService: NotionService) {}

  @Post('sync-tourist-point/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Sincronizar ponto turístico com Notion' })
  syncTouristPoint(@Param('id') id: string) {
    return this.notionService.syncTouristPointToNotion(id);
  }

  @Post('sync-restaurant/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Sincronizar restaurante com Notion' })
  syncRestaurant(@Param('id') id: string) {
    return this.notionService.syncRestaurantToNotion(id);
  }

  @Post('sync-accommodation/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Sincronizar hospedagem com Notion' })
  syncAccommodation(@Param('id') id: string) {
    return this.notionService.syncAccommodationToNotion(id);
  }

  @Post('sync-report/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Sincronizar relatório com Notion' })
  syncReport(@Param('id') id: string) {
    return this.notionService.syncReportToNotion(id);
  }

  @Get('syncs')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar todas as sincronizações' })
  getAllSyncs() {
    return this.notionService.getAllSyncs();
  }

  @Get('sync-status')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Ver status de sincronização de uma entidade' })
  getSyncStatus(@Query('entityType') type: string, @Query('entityId') id: string) {
    return this.notionService.getSyncStatus(type, id);
  }
}

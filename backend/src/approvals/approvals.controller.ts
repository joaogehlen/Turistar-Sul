import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApprovalsService } from './approvals.service';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';
import { RejectRequestDto } from './dto/reject-request.dto';

@ApiTags('Aprovações')
@ApiBearerAuth()
@Controller('approvals')
export class ApprovalsController {
  constructor(private approvalsService: ApprovalsService) {}

  @Get('pending')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar solicitações pendentes (Admin)' })
  @ApiResponse({ status: 200, description: 'Lista de solicitações pendentes' })
  findPending() {
    return this.approvalsService.findPendingRequests();
  }

  @Get('all')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar todas as solicitações (Admin)' })
  findAll() {
    return this.approvalsService.findAllRequests();
  }

  @Get('stats')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Estatísticas de aprovações (Admin)' })
  getStats() {
    return this.approvalsService.getStats();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Buscar detalhes de uma solicitação (Admin)' })
  findOne(@Param('id') id: string) {
    return this.approvalsService.findOne(id);
  }

  @Patch(':id/approve')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Aprovar solicitação (Admin)' })
  @ApiResponse({ status: 200, description: 'Solicitação aprovada com sucesso' })
  approve(@Param('id') id: string, @CurrentUser() user: any) {
    return this.approvalsService.approveRequest(id, user.id);
  }

  @Patch(':id/reject')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Rejeitar solicitação (Admin)' })
  @ApiResponse({ status: 200, description: 'Solicitação rejeitada' })
  reject(
    @Param('id') id: string,
    @Body() rejectDto: RejectRequestDto,
    @CurrentUser() user: any,
  ) {
    return this.approvalsService.rejectRequest(id, user.id, rejectDto.reason);
  }
}

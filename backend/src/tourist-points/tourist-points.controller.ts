import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TouristPointsService } from './tourist-points.service';
import { CreateTouristPointDto, UpdateTouristPointDto } from './dto/tourist-point.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('Pontos Turísticos')
@Controller('tourist-points')
export class TouristPointsController {
  constructor(private service: TouristPointsService) {}

  @Post()
  @ApiBearerAuth()
  @Roles(Role.TOURIST_POINT, Role.ADMIN)
  @ApiOperation({ summary: 'Criar ponto turístico (aguarda aprovação)' })
  create(@CurrentUser() user: any, @Body() dto: CreateTouristPointDto) {
    return this.service.create(user.id, dto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar pontos turísticos ativos (público)' })
  findAll(@Query('city') city?: string) {
    return this.service.findAll(city);
  }

  @Get('my-points')
  @ApiBearerAuth()
  @Roles(Role.TOURIST_POINT, Role.ADMIN)
  @ApiOperation({ summary: 'Listar meus pontos turísticos' })
  findMyPoints(@CurrentUser() user: any) {
    return this.service.findMyPoints(user.id);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Buscar ponto turístico por ID (público)' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles(Role.TOURIST_POINT, Role.ADMIN)
  @ApiOperation({ summary: 'Atualizar ponto turístico' })
  update(@Param('id') id: string, @CurrentUser() user: any, @Body() dto: UpdateTouristPointDto) {
    return this.service.update(id, user.id, user.role, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.TOURIST_POINT, Role.ADMIN)
  @ApiOperation({ summary: 'Excluir ponto turístico' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.id, user.role);
  }
}

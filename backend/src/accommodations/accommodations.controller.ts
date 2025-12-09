import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AccommodationsService } from './accommodations.service';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('Hospedagens')
@Controller('accommodations')
export class AccommodationsController {
  constructor(private service: AccommodationsService) {}

  @Post() @ApiBearerAuth() @Roles(Role.ACCOMMODATION, Role.ADMIN)
  create(@CurrentUser() user: any, @Body() data: any) { return this.service.create(user.id, data); }

  @Get() @Public()
  findAll(@Query('city') city?: string) { return this.service.findAll(city); }

  @Get('my-accommodations') @ApiBearerAuth() @Roles(Role.ACCOMMODATION, Role.ADMIN)
  findMy(@CurrentUser() user: any) { return this.service.findMyAccommodations(user.id); }

  @Get(':id') @Public()
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Patch(':id') @ApiBearerAuth() @Roles(Role.ACCOMMODATION, Role.ADMIN)
  update(@Param('id') id: string, @Body() data: any) { return this.service.update(id, data); }

  @Delete(':id') @ApiBearerAuth() @Roles(Role.ACCOMMODATION, Role.ADMIN)
  remove(@Param('id') id: string) { return this.service.remove(id); }
}

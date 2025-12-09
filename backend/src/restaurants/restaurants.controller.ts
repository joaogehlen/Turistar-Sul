import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('Restaurantes')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private service: RestaurantsService) {}

  @Post() @ApiBearerAuth() @Roles(Role.RESTAURANT, Role.ADMIN)
  create(@CurrentUser() user: any, @Body() data: any) { return this.service.create(user.id, data); }

  @Get() @Public()
  findAll(@Query('city') city?: string) { return this.service.findAll(city); }

  @Get('my-restaurants') @ApiBearerAuth() @Roles(Role.RESTAURANT, Role.ADMIN)
  findMy(@CurrentUser() user: any) { return this.service.findMyRestaurants(user.id); }

  @Get(':id') @Public()
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Patch(':id') @ApiBearerAuth() @Roles(Role.RESTAURANT, Role.ADMIN)
  update(@Param('id') id: string, @Body() data: any) { return this.service.update(id, data); }

  @Delete(':id') @ApiBearerAuth() @Roles(Role.RESTAURANT, Role.ADMIN)
  remove(@Param('id') id: string) { return this.service.remove(id); }
}

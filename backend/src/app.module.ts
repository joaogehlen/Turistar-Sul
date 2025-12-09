import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TouristPointsModule } from './tourist-points/tourist-points.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { AccommodationsModule } from './accommodations/accommodations.module';
import { ApprovalsModule } from './approvals/approvals.module';
import { ReportsModule } from './reports/reports.module';
import { NotionModule } from './notion/notion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    TouristPointsModule,
    RestaurantsModule,
    AccommodationsModule,
    ApprovalsModule,
    ReportsModule,
    NotionModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TouristPointsService } from './tourist-points.service';
import { TouristPointsController } from './tourist-points.controller';

@Module({
  controllers: [TouristPointsController],
  providers: [TouristPointsService],
})
export class TouristPointsModule {}

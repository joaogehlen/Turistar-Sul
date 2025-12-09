import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTouristPointDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() description?: string;
  @ApiProperty() @IsString() address: string;
  @ApiProperty() @IsString() city: string;
  @ApiProperty() @IsString() state: string;
  @ApiProperty({ required: false }) @IsOptional() @IsNumber() latitude?: number;
  @ApiProperty({ required: false }) @IsOptional() @IsNumber() longitude?: number;
  @ApiProperty({ required: false }) @IsOptional() @IsString() category?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() openingHours?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() entryFee?: string;
}

export class UpdateTouristPointDto {
  @ApiProperty({ required: false }) @IsOptional() @IsString() name?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() description?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() address?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() city?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() state?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsNumber() latitude?: number;
  @ApiProperty({ required: false }) @IsOptional() @IsNumber() longitude?: number;
  @ApiProperty({ required: false }) @IsOptional() @IsString() category?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() openingHours?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() entryFee?: string;
}

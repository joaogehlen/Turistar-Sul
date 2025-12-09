import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RejectRequestDto {
  @ApiProperty({ example: 'Dados incompletos ou inválidos' })
  @IsString()
  @MinLength(10)
  reason: string;
}

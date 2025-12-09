import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'contato@empresa.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Senha@123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Nome da Empresa' })
  @IsString()
  name: string;

  @ApiProperty({ example: '(51) 99999-9999', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ enum: Role, example: Role.TOURIST_POINT })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ example: '12.345.678/0001-00', required: false })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiProperty({ example: 'Gramado', required: false })
  @IsOptional()
  @IsString()
  city?: string;
}

import { PrismaClient, Role, EntityStatus, ApprovalStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.notionSync.deleteMany();
  await prisma.report.deleteMany();
  await prisma.registrationRequest.deleteMany();
  await prisma.touristPoint.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.accommodation.deleteMany();
  await prisma.user.deleteMany();

  // Hash da senha padrão
  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  // 1. Criar Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@turistarsul.com',
      password: hashedPassword,
      name: 'Administrador',
      role: Role.ADMIN,
      phone: '(51) 99999-0000',
    },
  });

  console.log('✅ Admin criado:', admin.email);

  // 2. Criar Prefeitura
  const prefecture = await prisma.user.create({
    data: {
      email: 'prefeitura@gramado.rs.gov.br',
      password: hashedPassword,
      name: 'Prefeitura de Gramado',
      role: Role.PREFECTURE,
      city: 'Gramado',
      cnpj: '12.345.678/0001-00',
    },
  });

  console.log('✅ Prefeitura criada:', prefecture.email);

  // 3. Criar Parceiro - Ponto Turístico
  const touristPointOwner = await prisma.user.create({
    data: {
      email: 'contato@miniaturasgaucho.com.br',
      password: hashedPassword,
      name: 'Mini Mundo Gramado',
      role: Role.TOURIST_POINT,
      phone: '(54) 3286-4055',
      cnpj: '11.222.333/0001-44',
    },
  });

  console.log('✅ Parceiro Ponto Turístico criado:', touristPointOwner.email);

  // 4. Criar Parceiro - Restaurante
  const restaurantOwner = await prisma.user.create({
    data: {
      email: 'contato@borattogastro.com.br',
      password: hashedPassword,
      name: 'Restaurante Boratto',
      role: Role.RESTAURANT,
      phone: '(54) 3286-1644',
      cnpj: '22.333.444/0001-55',
    },
  });

  console.log('✅ Parceiro Restaurante criado:', restaurantOwner.email);

  // 5. Criar Parceiro - Hospedagem
  const accommodationOwner = await prisma.user.create({
    data: {
      email: 'reservas@serraaul.com.br',
      password: hashedPassword,
      name: 'Hotel Serra Azul',
      role: Role.ACCOMMODATION,
      phone: '(54) 3295-1082',
      cnpj: '33.444.555/0001-66',
    },
  });

  console.log('✅ Parceiro Hospedagem criado:', accommodationOwner.email);

  // 6. Criar Ponto Turístico APROVADO
  const touristPoint1 = await prisma.touristPoint.create({
    data: {
      name: 'Mini Mundo',
      description: 'Parque temático com miniaturas de construções famosas do mundo.',
      address: 'R. Horácio Cardoso, 1.000',
      city: 'Gramado',
      state: 'RS',
      latitude: -29.3798,
      longitude: -50.8757,
      category: 'Parque Temático',
      openingHours: '09:00 - 18:00',
      entryFee: 'R$ 52,00',
      ownerId: touristPointOwner.id,
      status: EntityStatus.ACTIVE,
    },
  });

  console.log('✅ Ponto Turístico criado:', touristPoint1.name);

  // 7. Criar Ponto Turístico PENDENTE
  const touristPoint2 = await prisma.touristPoint.create({
    data: {
      name: 'Lago Negro',
      description: 'Lago artificial cercado por árvores e jardins.',
      address: 'Av. das Hortênsias',
      city: 'Gramado',
      state: 'RS',
      latitude: -29.3711,
      longitude: -50.8642,
      category: 'Natureza',
      openingHours: '24 horas',
      entryFee: 'Grátis',
      ownerId: touristPointOwner.id,
      status: EntityStatus.PENDING_APPROVAL,
    },
  });

  console.log('✅ Ponto Turístico PENDENTE criado:', touristPoint2.name);

  // 8. Criar Restaurante APROVADO
  const restaurant1 = await prisma.restaurant.create({
    data: {
      name: 'Restaurante Boratto',
      description: 'Culinária italiana autêntica com ambiente aconchegante.',
      address: 'Av. Borges de Medeiros, 2.101',
      city: 'Gramado',
      state: 'RS',
      latitude: -29.3788,
      longitude: -50.8731,
      cuisine: 'Italiana',
      priceRange: '$$$',
      openingHours: '12:00 - 15:00, 19:00 - 23:00',
      phone: '(54) 3286-1644',
      ownerId: restaurantOwner.id,
      status: EntityStatus.ACTIVE,
    },
  });

  console.log('✅ Restaurante criado:', restaurant1.name);

  // 9. Criar Restaurante PENDENTE
  const restaurant2 = await prisma.restaurant.create({
    data: {
      name: 'Churrascaria Gaúcha',
      description: 'Churrasco tradicional do Rio Grande do Sul.',
      address: 'Rua Coberta, 500',
      city: 'Gramado',
      state: 'RS',
      cuisine: 'Brasileira',
      priceRange: '$$',
      openingHours: '11:30 - 15:00, 18:30 - 22:30',
      phone: '(54) 3286-2000',
      ownerId: restaurantOwner.id,
      status: EntityStatus.PENDING_APPROVAL,
    },
  });

  console.log('✅ Restaurante PENDENTE criado:', restaurant2.name);

  // 10. Criar Hospedagem APROVADA
  const accommodation1 = await prisma.accommodation.create({
    data: {
      name: 'Hotel Serra Azul',
      description: 'Hotel com vista panorâmica da serra gaúcha.',
      address: 'Av. das Hortênsias, 1.845',
      city: 'Gramado',
      state: 'RS',
      latitude: -29.3684,
      longitude: -50.8769,
      type: 'Hotel',
      rooms: 60,
      capacity: 150,
      pricePerNight: 450.00,
      amenities: 'Wi-Fi, Café da manhã, Piscina aquecida, Estacionamento',
      phone: '(54) 3295-1082',
      ownerId: accommodationOwner.id,
      status: EntityStatus.ACTIVE,
    },
  });

  console.log('✅ Hospedagem criada:', accommodation1.name);

  // 11. Criar Hospedagem PENDENTE
  const accommodation2 = await prisma.accommodation.create({
    data: {
      name: 'Pousada do Vale',
      description: 'Pousada aconchegante em meio à natureza.',
      address: 'Estrada do Vale, km 5',
      city: 'Canela',
      state: 'RS',
      type: 'Pousada',
      rooms: 12,
      capacity: 30,
      pricePerNight: 280.00,
      amenities: 'Wi-Fi, Café da manhã, Lareira',
      phone: '(54) 3282-5000',
      ownerId: accommodationOwner.id,
      status: EntityStatus.PENDING_APPROVAL,
    },
  });

  console.log('✅ Hospedagem PENDENTE criada:', accommodation2.name);

  // 12. Criar solicitações de aprovação
  await prisma.registrationRequest.create({
    data: {
      userId: touristPointOwner.id,
      entityType: 'TOURIST_POINT',
      entityId: touristPoint2.id,
      status: ApprovalStatus.PENDING,
      requestData: {
        name: touristPoint2.name,
        description: touristPoint2.description,
      },
    },
  });

  await prisma.registrationRequest.create({
    data: {
      userId: restaurantOwner.id,
      entityType: 'RESTAURANT',
      entityId: restaurant2.id,
      status: ApprovalStatus.PENDING,
      requestData: {
        name: restaurant2.name,
        description: restaurant2.description,
      },
    },
  });

  await prisma.registrationRequest.create({
    data: {
      userId: accommodationOwner.id,
      entityType: 'ACCOMMODATION',
      entityId: accommodation2.id,
      status: ApprovalStatus.PENDING,
      requestData: {
        name: accommodation2.name,
        description: accommodation2.description,
      },
    },
  });

  console.log('✅ Solicitações de aprovação criadas');

  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('\n📝 Credenciais de acesso:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Admin:       admin@turistarsul.com | Admin@123');
  console.log('Prefeitura:  prefeitura@gramado.rs.gov.br | Admin@123');
  console.log('Ponto:       contato@miniaturasgaucho.com.br | Admin@123');
  console.log('Restaurante: contato@borattogastro.com.br | Admin@123');
  console.log('Hospedagem:  reservas@serraaul.com.br | Admin@123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

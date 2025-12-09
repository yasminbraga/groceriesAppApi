import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: configService.get<string>('DB_URL'),
  synchronize: false,
  entities: ['**/*.entity.ts'],
  migrations: ['src/database/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});

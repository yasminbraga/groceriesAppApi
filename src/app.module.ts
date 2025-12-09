import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ListsModule } from './lists/lists.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ProductsModule } from './products/products.module';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      autoLoadEntities: true,
      synchronize: false,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
    }),
    RecipesModule,
    ListsModule,
    ProductsModule,
    AuthModule,
    UsersModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

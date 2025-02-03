import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './auth/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Chargeement des variables d'env
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    // Config TypeORM 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [UserEntity],
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
})
export class AppModule {}

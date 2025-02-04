import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Client } from './client.entity/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  imports:[TypeOrmModule.forFeature([Client]), ContactModule],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}

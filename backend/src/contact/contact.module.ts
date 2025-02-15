import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Contact } from './contact.entity/contact.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Contact]),],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [TypeOrmModule],
})
export class ContactModule {}

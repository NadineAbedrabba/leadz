import { Module } from '@nestjs/common';
import { ProspectController } from './prospect.controller';
import { ProspectService } from './prospect.service';
import { Prospect } from './prospect.entity/prospect.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  imports:[TypeOrmModule.forFeature([Prospect]), ContactModule],
  controllers: [ProspectController],
  providers: [ProspectService]
})
export class ProspectModule {}

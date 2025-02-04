import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from'dotenv' ;
import { JwtStrategy } from './strategie/passport-jwt.strategie';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
PassportModule.register( {
  defaultStrategy: 'jwt'
}),
 JwtModule.register({
  secret: process.env.SECRET,
  signOptions: { expiresIn: '1h' },
 })

] ,
  controllers: [AuthController,],
  providers: [AuthService , JwtStrategy] 
})
export class AuthModule {}

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntityDto } from 'src/dto/auth.entity.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { PassThrough } from 'stream';
import { loginCredentialsDto } from 'src/dto/login.credentials.dto';
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


    constructor(

        @InjectRepository(UserEntity)
        private authRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) { }


    async register(userData: AuthEntityDto): Promise<Partial<UserEntity>> {
        const user = this.authRepository.create(
            { ...userData }
        );
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);

        try {
            await this.authRepository.save(user);

        }
        catch (e) {
            throw new ConflictException('le username et le password doivent etre unique')
        }
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password

        }



    };

    async login(credentials: loginCredentialsDto) {

        const { username, password } = credentials;
        const user = await this.authRepository.createQueryBuilder("user")
            .where("user.username = :username or user.email = :username", { username })
            .getOne();

        if (!user)
            throw new NotFoundException('username or password incorrect');

        const hashedPassword = await bcrypt.hash(password, user.salt);

        if (hashedPassword == user.password)
          {  const payload = {
                username : user.username,
                email: user.email,
                role: user.role
            };
const jwt= await this.jwtService.sign(payload) ;
            return {
                "access_token": jwt 
            }
        }
        else
            throw new NotFoundException('username or password incorrect');

    }

    FindAllUsers(): Promise<UserEntity[]> {
        return this.authRepository.find();
    }
}

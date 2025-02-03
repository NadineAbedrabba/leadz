import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEnum } from 'src/enums/user.role.enum';


@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        name: "username",
        length: 50
    })
    username: string;

    @Column({
        unique: true

    })
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({
        type: 'enum', // Spécifie que c'est un type ENUM
        enum: UserRoleEnum, // Référence à l'énumération
        default: UserRoleEnum.USER, // Valeur par défaut
      })
      role: UserRoleEnum;

}
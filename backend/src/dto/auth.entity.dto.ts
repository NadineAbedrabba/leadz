import { IsEmail,  IsNotEmpty } from "class-validator";

export class AuthEntityDto {


@IsNotEmpty()
username : string ;

@IsEmail()
@IsNotEmpty()
email : string ;

@IsNotEmpty()
password: string ;
    
}
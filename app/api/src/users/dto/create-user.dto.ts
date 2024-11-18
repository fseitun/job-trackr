import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
        message:
            'Password too weak. It must contain uppercase, lowercase letters and numbers.',
    })
    password!: string;
}

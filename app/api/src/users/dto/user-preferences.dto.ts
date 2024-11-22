import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreateUserPreferenceDto {
    @IsJSON()
    @IsNotEmpty()
    preferences!: Record<string, boolean>;
}

export class UpdateUserPreferenceDto {
    @IsJSON()
    @IsNotEmpty()
    preferences!: Record<string, boolean>;
}

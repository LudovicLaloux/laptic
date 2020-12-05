import { IsNotEmpty, IsString } from "class-validator"

export class CreateExerciceCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string
}

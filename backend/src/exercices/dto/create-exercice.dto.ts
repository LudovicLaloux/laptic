import { IsNotEmpty, IsString, IsOptional, IsInt } from "class-validator"

export class CreateExerciceDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    equipements: string

    @IsNotEmpty()
    @IsInt()
    categoryId: number
}

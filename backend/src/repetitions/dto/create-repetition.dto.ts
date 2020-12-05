import { IsNotEmpty, IsInt, IsOptional } from "class-validator"
import { Serie } from "src/series/entities/serie.entity"

export class CreateRepetitionDto {
    @IsOptional()
    @IsInt()
    repNumber: number

    @IsOptional()
    @IsInt()
    repTime: string

    @IsNotEmpty()
    @IsInt()
    rest: number

    @IsNotEmpty()
    @IsInt()
    order: number

    @IsNotEmpty()
    @IsInt()
    serieId: Serie
}

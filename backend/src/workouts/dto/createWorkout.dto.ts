import { IsNotEmpty, IsISO8601, IsString } from "class-validator" 

export class CreateWorkoutDto {
    
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    bloc: string

    @IsNotEmpty()
    @IsISO8601()
	createdDate: string
}

import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    HttpException,
    HttpStatus,
} from "@nestjs/common"
import { RepetitionsService } from "./repetitions.service"
import { CreateRepetitionDto } from "./dto/create-repetition.dto"
import { UpdateRepetitionDto } from "./dto/update-repetition.dto"

@Controller("repetitions")
export class RepetitionsController {
    constructor(private readonly repetitionsService: RepetitionsService) {}

    @Post()
    create(@Body() createRepetitionDto: CreateRepetitionDto) {
        if (
            createRepetitionDto.repNumber === null &&
            createRepetitionDto.repTime === null
        ) {
            throw new HttpException(
                "repNumber and repTime can't be both null. At least one value expected",
                HttpStatus.UNPROCESSABLE_ENTITY,
            )
        } else if (
            createRepetitionDto.repNumber !== null &&
            createRepetitionDto.repTime !== null
        ) {
            throw new HttpException(
                "repNumber and repTime can't have both a value. At least one value must be null",
                HttpStatus.UNPROCESSABLE_ENTITY,
            )
        }
        return this.repetitionsService.create(createRepetitionDto)
    }

    @Get()
    findAll() {
        return this.repetitionsService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.repetitionsService.findOne(id)
    }

    @Put(":id")
    update(
        @Param("id") id: number,
        @Body() updateRepetitionDto: UpdateRepetitionDto,
    ) {
        return this.repetitionsService.update(id, updateRepetitionDto)
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.repetitionsService.remove(id)
    }
}

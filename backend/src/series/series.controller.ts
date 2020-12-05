import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common"
import { SeriesService } from "./series.service"
import { CreateSeriesDto } from "./dto/create-series.dto"
import { UpdateSeriesDto } from "./dto/update-series.dto"

@Controller("series")
export class SeriesController {
    constructor(private readonly seriesService: SeriesService) {}

    @Post()
    create(@Body() createSeriesDto: CreateSeriesDto) {
        return this.seriesService.create(createSeriesDto)
    }

    @Get()
    findAll() {
        return this.seriesService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.seriesService.findOne(id)
    }

    @Put(":id")
    update(@Param("id") id: number, @Body() updateSeriesDto: UpdateSeriesDto) {
        return this.seriesService.update(id, updateSeriesDto)
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.seriesService.remove(id)
    }
}

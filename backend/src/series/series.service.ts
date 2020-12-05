import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, Connection } from "typeorm"
import { CreateSeriesDto } from "./dto/create-series.dto"
import { UpdateSeriesDto } from "./dto/update-series.dto"
import { Serie } from "./entities/serie.entity"

@Injectable()
export class SeriesService {
    constructor(
        @InjectRepository(Serie)
        private serieRepository: Repository<Serie>,
        private connection: Connection,
    ) {}
    async create(createSeriesDto: CreateSeriesDto) {
        // get a connection and create a new query runner
        const queryRunner = this.connection.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const serie = new Serie()
            serie.restTime = createSeriesDto.restTime
            serie.order = createSeriesDto.order
            serie.workout = createSeriesDto.workoutId
            serie.exercice = createSeriesDto.exerciceId

            const response = await queryRunner.manager.save(serie)
            await queryRunner.commitTransaction()
            return response
        } catch (error) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction()
            return error
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release()
        }
    }

    findAll(): Promise<Serie[]> {
        return this.serieRepository.find()
    }

    findOne(id: number): Promise<Serie> {
        return this.serieRepository.findOne(id, {
            relations: ["repetitions"],
        })
    }

    async update(id: number, updateSeriesDto: UpdateSeriesDto) {
        // get a connection and create a new query runner
        const queryRunner = this.connection.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const serie = await this.serieRepository.findOne(id)
            // if serie doesn't exist, throw error
            if (!serie) {
                throw new HttpException(
                    "Serie id doesn't exist",
                    HttpStatus.UNPROCESSABLE_ENTITY,
                )
            }
            serie.workout = updateSeriesDto.workoutId
            serie.restTime = updateSeriesDto.restTime
            serie.order = updateSeriesDto.order

            const response = await queryRunner.manager.save(serie)
            await queryRunner.commitTransaction()
            return response
        } catch (error) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction()
            return error
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release()
        }
    }

    async remove(id: number): Promise<void> {
        await this.serieRepository.delete(id)
    }
}

import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, Connection } from "typeorm"
import { CreateWorkoutDto } from "./dto/create-workout.dto"
import { UpdateWorkoutDto } from "./dto/update-workout.dto"
import { Workout } from "./entities/workout.entity"

@Injectable()
export class WorkoutsService {
    constructor(
        @InjectRepository(Workout)
        private workoutRepository: Repository<Workout>,
        private connection: Connection,
    ) {}

    async create(createWorkoutDto: CreateWorkoutDto) {
        // get a connection and create a new query runner
        const queryRunner = this.connection.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const workout = new Workout()
            workout.name = createWorkoutDto.name
            workout.date = createWorkoutDto.date
            workout.category = createWorkoutDto.categoryId

            const response = await queryRunner.manager.save(workout)
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

    findAll(): Promise<Workout[]> {
        return this.workoutRepository.find()
    }

    findOne(id: number): Promise<Workout> {
        return this.workoutRepository.findOne(id, { relations: ["series"] })
    }

    async update(id: number, UpdateWorkoutDto: UpdateWorkoutDto) {
        // // get a connection and create a new query runner
        const queryRunner = this.connection.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            // get workout to update
            const workout = await this.workoutRepository.findOne(id)
            // if workout doesn't exist, throw error
            if (!workout) {
                throw new HttpException(
                    "Workout id doesn't exist",
                    HttpStatus.UNPROCESSABLE_ENTITY,
                )
            }
            workout.name = UpdateWorkoutDto.name
            workout.date = UpdateWorkoutDto.date

            const response = await queryRunner.manager.save(workout)
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
        await this.workoutRepository.delete(id)
    }
}

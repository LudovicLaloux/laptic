import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, Connection } from "typeorm"
import { CreateWorkoutCategoryDto } from "./dto/create-workout-category.dto"
import { UpdateWorkoutCategoryDto } from "./dto/update-workout-category.dto"
import { WorkoutCategory } from "./entities/workout-category.entity"

@Injectable()
export class WorkoutCategoriesService {
    constructor(
        @InjectRepository(WorkoutCategory)
        private workoutCategoryRepository: Repository<WorkoutCategory>,
        private connection: Connection,
    ) {}

    async create(createWorkoutCategoryDto: CreateWorkoutCategoryDto) {
        // get a connection and create a new query runner
        const queryRunner = this.connection.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const category = new WorkoutCategory()
            category.name = createWorkoutCategoryDto.name

            const response = await queryRunner.manager.save(category)
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

    findAll(): Promise<WorkoutCategory[]> {
        return this.workoutCategoryRepository.find()
    }

    findOne(id: number): Promise<WorkoutCategory> {
        return this.workoutCategoryRepository.findOne(id)
    }

    async update(
        id: number,
        updateWorkoutCategoryDto: UpdateWorkoutCategoryDto,
    ) {
        // get a connection and create a new query runner
        const queryRunner = this.connection.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const category = await this.workoutCategoryRepository.findOne(id)
            // if category doesn't exist, throw error
            if (!category) {
                throw new HttpException(
                    "Workout category id doesn't exist",
                    HttpStatus.UNPROCESSABLE_ENTITY,
                )
            }
            category.name = updateWorkoutCategoryDto.name

            const response = await queryRunner.manager.save(category)
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
        await this.workoutCategoryRepository.delete(id)
    }
}

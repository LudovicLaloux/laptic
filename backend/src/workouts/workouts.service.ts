import { Injectable } from "@nestjs/common"
import { CreateWorkoutDto } from "./dto/createWorkout.dto"
import { UpdateWorkoutDto } from "./dto/updateWorkout.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, Connection } from "typeorm"
import { Workout } from "./entities/workout.entity"

@Injectable()
export class WorkoutsService {
    constructor(
        @InjectRepository(Workout)
        private workoutRepository: Repository<Workout>,
        private connection: Connection
    ) {}

    async create(createWorkoutDto: CreateWorkoutDto) {
        const workout = new Workout()
        workout.name = createWorkoutDto.name
        workout.bloc = createWorkoutDto.bloc
        workout.created_date = createWorkoutDto.createdDate

        // // get a connection and create a new query runner
        const queryRunner = this.connection.createQueryRunner()

        // establish real database connection using our new query runner
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const response = await queryRunner.manager.save(workout)
            await queryRunner.commitTransaction()
            return response
        }
        catch(error) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction()
            return error
        } 
        finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release()
        }
    }

    findAll(): Promise<Workout[]> {
        return this.workoutRepository.find();
    }

    findOne(id: number): Promise<Workout> {
        return this.workoutRepository.findOne(id);
    }

    update(id: number, data: UpdateWorkoutDto) {
        return `This action updates a #${id} workout`
    }

    async remove(id: number): Promise<void> {
        await this.workoutRepository.delete(id);
    }
}

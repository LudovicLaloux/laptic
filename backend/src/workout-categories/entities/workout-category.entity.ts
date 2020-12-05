import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Workout } from "../../workouts/entities/workout.entity"

@Entity()
export class WorkoutCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 45 })
    name: string

    @OneToMany(
        () => Workout,
        workout => workout.category,
    )
    workouts: Workout[]
}

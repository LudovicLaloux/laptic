import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
} from "typeorm"
import { Serie } from "../../series/entities/serie.entity"
import { WorkoutCategory } from "../../workout-categories/entities/workout-category.entity"

@Entity()
export class Workout {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 200 })
    name: string

    @ManyToOne(
        () => WorkoutCategory,
        category => category.workouts,
    )
    category: WorkoutCategory

    @Column("date")
    date: string

    @OneToMany(
        () => Serie,
        serie => serie.workout,
    )
    series: Serie[]
}

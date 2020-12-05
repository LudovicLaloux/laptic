import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
} from "typeorm"
import { Serie } from "../../series/entities/serie.entity"
import { ExerciceCategory } from "../../exercice-categories/entities/exercice-category.entity"

@Entity()
export class Exercice {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 45 })
    name: string

    @Column("text", { nullable: true })
    equipements: string

    @OneToMany(
        () => Serie,
        serie => serie.exercice,
    )
    series: Serie[]

    @ManyToOne(
        () => ExerciceCategory,
        category => category.exercices,
    )
    category: ExerciceCategory
}

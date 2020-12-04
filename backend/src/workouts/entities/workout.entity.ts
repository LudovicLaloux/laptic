import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Workout {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 200 })
    name: string

    @Column("varchar", { length: 200 })
    bloc: string

    @Column("date")
    created_date: string
}

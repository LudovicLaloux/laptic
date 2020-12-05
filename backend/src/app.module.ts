import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { WorkoutsModule } from "./workouts/workouts.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SeriesModule } from './series/series.module';
import { WorkoutCategoriesModule } from './workout-categories/workout-categories.module';
import { ExercicesModule } from './exercices/exercices.module';
import { ExerciceCategoriesModule } from './exercice-categories/exercice-categories.module';
import { RepetitionsModule } from './repetitions/repetitions.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "admin",
            password: "password",
            database: "laptic",
            autoLoadEntities: true,
            synchronize: process.env.NODE_ENV === "development",
        }),
        WorkoutsModule,
        SeriesModule,
        WorkoutCategoriesModule,
        ExercicesModule,
        ExerciceCategoriesModule,
        RepetitionsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

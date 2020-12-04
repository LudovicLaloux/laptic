import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { WorkoutsModule } from "./workouts/workouts.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Connection } from "typeorm"

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
            synchronize: true,
        }),
        WorkoutsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

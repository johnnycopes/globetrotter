import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from "./entities/user.entity";
import { UserModule } from './user/user.module';

@Module({
  imports: [
		AuthModule,
		UserModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'password',
			database: 'globetrotter',
			entities: [User],
			synchronize: true,
		}),
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { GendersModule } from './genders/genders.module';
import { Gender } from './genders/entities/gender.entity';
import { TitlesModule } from './titles/titles.module';
import { Title } from './titles/entities/title.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Gender,
        Title,
      ],
      synchronize: true
    }),
    CloudinaryModule,
    GendersModule,
    TitlesModule,
  ],
  providers: [
    CloudinaryProvider
  ],
})

export class AppModule {
  constructor(
    private readonly dataSource: DataSource
  ){}
}

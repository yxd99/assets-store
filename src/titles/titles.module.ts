import { Module } from '@nestjs/common';
import { TitlesService } from './titles.service';
import { TitlesController } from './titles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Title } from './entities/title.entity';
import { GendersModule } from 'src/genders/genders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Title]),
    GendersModule,
  ],
  controllers: [TitlesController],
  providers: [TitlesService],
  exports: [TitlesService],
})
export class TitlesModule {}

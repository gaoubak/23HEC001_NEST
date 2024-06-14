import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [],
  controllers: [SongsController],
  providers: [SongsService, DatabaseService],
})
export class SongsModule {}

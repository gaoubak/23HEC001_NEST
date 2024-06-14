import { Module } from '@nestjs/common';
import { PlayListsController } from './playlists.controller';
import { PlayListsService } from './playlists.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [],
  controllers: [PlayListsController],
  providers: [PlayListsService, DatabaseService],
})
export class PlayListsModule {}

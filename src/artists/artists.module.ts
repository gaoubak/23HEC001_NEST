// src/artists/artists.module.ts

import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [],
  controllers: [ArtistsController],
  providers: [ArtistsService, DatabaseService], 
})
export class ArtistsModule {}

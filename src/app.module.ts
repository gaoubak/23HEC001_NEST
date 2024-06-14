import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SongsModule } from './songs/songs.module';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { PlayListsModule } from './playlists/playlists.module';
import { DatabaeModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SongsModule,
    ArtistsModule,
    UsersModule,
    PlayListsModule,
    DatabaeModule,
  ],
})
export class AppModule {}

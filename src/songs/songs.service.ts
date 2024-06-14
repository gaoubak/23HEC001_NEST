import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import { Prisma, Song } from '@prisma/client';

@Injectable()
export class SongsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSongDTO: CreateSongDTO): Promise<Song> {
    if (!createSongDTO.artistIds || !Array.isArray(createSongDTO.artistIds)) {
      throw new Error('Invalid artistIds provided');
    }
  
    const artistsConnect = createSongDTO.artistIds.map((id) => ({ id }));
  
    return this.databaseService.song.create({
      data: {
        title: createSongDTO.title,
        releasedDate: createSongDTO.releasedDate,
        duration: createSongDTO.duration,
        lyrics: createSongDTO.lyrics,
        artists: {
          connect: artistsConnect,
        },
        playListId: createSongDTO.playListId,
      },
    });
  }
  

  async findAll(): Promise<Song[]> {
    return this.databaseService.song.findMany({
      include: {
        artists: true,
        playList: true,
        SongArtists: true
      },
    });
  }

  async findOne(id: number): Promise<Song | null> {
    return this.databaseService.song.findUnique({
      where: { id },
      include: {
        artists: true,
        playList: true,
      },
    });
  }

  async update(id: number, updateSongDto: UpdateSongDto): Promise<Song | null> {

    const existingSong = await this.databaseService.song.findUnique({
      where: { id },
    });

    if (!existingSong) {
      return null;
    }

    const dataToUpdate: Prisma.SongUpdateInput = {
      ...updateSongDto,
    };

    const updatedSong = await this.databaseService.song.update({
      where: { id },
      data: {
        ...dataToUpdate,
      },
    });

    return updatedSong;
  }

  async remove(id: number): Promise<void> {
    await this.databaseService.song.delete({
      where: { id },
    });
  }
}
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Playlist, Prisma } from '@prisma/client';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlayListsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    return this.databaseService.playlist.create({
      data: {
        ...createPlaylistDto,
      },
    });
  }

  async findAll(): Promise<Playlist[]> {
    return this.databaseService.playlist.findMany({
      include: {
        songs: true, 
      },
    });
  }

  async findOne(id: number): Promise<Playlist> {
    return this.databaseService.playlist.findUnique({
      where: { id },
      include: {
        songs: true,
      },
    });
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist | null> {

    const existingPlaylist = await this.databaseService.playlist.findUnique({
      where: { id },
    });

    if (!existingPlaylist) {
      return null; 
    }

    const dataToUpdate: Prisma.PlaylistUpdateInput = {
      ...updatePlaylistDto,
    };

    const updatedPlaylist = await this.databaseService.playlist.update({
      where: { id },
      data: {
        ...dataToUpdate,
      },
    });

    return updatedPlaylist;
  }

  async remove(id: number): Promise<Playlist> {
    return this.databaseService.playlist.delete({
      where: { id },
    });
  }
}
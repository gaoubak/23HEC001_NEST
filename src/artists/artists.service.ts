import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Artist } from '@prisma/client';
import { UpdateArtistDto } from './dto/update-artists.dto';
import { CreateArtistDto } from './dto/create-artists.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.databaseService.artist.create({
      data: {
        ...createArtistDto,
      },
    });
  }

  async findAll(): Promise<Artist[]> {
    return this.databaseService.artist.findMany();
  }

  async findOne(id: number): Promise<Artist | null> {
    return this.databaseService.artist.findUnique({
      where: { id },
    });
  }

  async update(id: number, artistDto: UpdateArtistDto): Promise<Artist> {
    const { userId, songIds } = artistDto;
    return this.databaseService.artist.update({
      where: { id },
      data: {
        user: { connect: { id: userId } },
        songs: { connect: songIds.map((songId) => ({ id: songId })) },
      },
    });
}

  async remove(id: number): Promise<void> {
    await this.databaseService.artist.delete({
      where: { id },
    });
  }
}

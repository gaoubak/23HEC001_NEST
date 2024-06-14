import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from '@prisma/client';
import { UpdateArtistDto } from './dto/update-artists.dto';
import { CreateArtistDto } from './dto/create-artists.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Artist | null> {
    return this.artistsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() artistDto: UpdateArtistDto): Promise<Artist> {
    return this.artistsService.update(+id, artistDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.artistsService.remove(+id);
  }
}

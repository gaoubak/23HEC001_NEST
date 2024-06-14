import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PlayListsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from '@prisma/client';

@Controller('playlists')
export class PlayListsController {
  constructor(private readonly playlistsService: PlayListsService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    return this.playlistsService.create(createPlaylistDto);
  }

  @Get()
  findAll(): Promise<Playlist[]> {
    return this.playlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Playlist> {
    return this.playlistsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
    return this.playlistsService.update(Number(id), updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Playlist> {
    return this.playlistsService.remove(Number(id));
  }
}
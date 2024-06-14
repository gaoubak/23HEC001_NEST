import { PartialType } from '@nestjs/mapped-types';
import { CreateSongDTO } from './create-song-dto';

export class UpdateSongDto extends PartialType(CreateSongDTO) {}

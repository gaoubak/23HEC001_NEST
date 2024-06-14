import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artists.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}

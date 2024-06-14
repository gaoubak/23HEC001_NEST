export class CreateSongDTO {
  title: string;
  releasedDate: Date;
  duration: string;
  lyrics: string;
  artistIds: number[]; 
  playListId: number | null;
}

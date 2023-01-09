import { Thumbnail } from "./thumbnail.model";

export class Character {
  id: number;
  name: string;
  thumbnail: Thumbnail;
  favorite: boolean = false;
}

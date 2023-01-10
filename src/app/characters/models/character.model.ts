import { Events } from "./events.model";
import { Series } from "./series.model";
import { Stories } from "./stories.model";
import { Thumbnail } from "./thumbnail.model";
import { Url } from "./url.model";

export class Character {
  id: number;
  name: string;
  favorite: boolean;
  description: string;
  thumbnail: Thumbnail;
  stories: Stories;
  series: Series;
  events: Events;
  urls: Url[];

  constructor() {
    this.favorite = false;
  }
}

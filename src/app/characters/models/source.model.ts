import { Character } from "./character.model";

export class Source {
  limit: number;
  offset: number;
  total: number;
  results: Character[];

  constructor() {
    this.limit = 0;
    this.offset = 0;
    this.total = 0;
    this.results = new Array<Character>();
  }
}

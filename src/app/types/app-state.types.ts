import { Character } from './characters.types';

export interface CharactersStateModel {
  data: Character[];
  info?: {
    next: string;
  };
}

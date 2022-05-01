import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { CharactersStateModel } from '../../types/app-state.types';
import { CharactersActions } from './characters.actions';
import { tap } from 'rxjs/operators';
import { append, patch } from '@ngxs/store/operators';

@State<CharactersStateModel>({
  name: 'characters',
  defaults: {
    data: [],
  },
})
@Injectable()
export class CharactersState {
  constructor(private http: HttpClient) {}

  @Selector()
  static getCharacters(state: CharactersStateModel) {
    return state.data ?? [];
  }

  @Action(CharactersActions.FetchCharacters, { cancelUncompleted: true })
  fetchCharacters(ctx: StateContext<CharactersStateModel>) {
    const state = ctx.getState();

    return this.http
      .get(state.info?.next ?? 'https://rickandmortyapi.com/api/character')
      .pipe(
        tap(({ results, info }: any) => {
          ctx.setState(
            patch({
              data: append(
                results.map(
                  ({ image, name }: { image: string; name: string }) => ({
                    image,
                    name,
                  })
                )
              ),
              info: { next: info.next },
            })
          );
        })
      );
  }
}

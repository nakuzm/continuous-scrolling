import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { Character } from '../types/characters.types';
import { CharactersState } from '../app-state/characters/characters.state';
import { CharactersActions } from '../app-state/characters/characters.actions';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  ActionsExecuting,
  actionsExecuting,
} from '@ngxs-labs/actions-executing';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit, OnDestroy {
  public characters: Observable<Character[]>;
  private destroyed$ = new Subject<void>();
  @Select(actionsExecuting([CharactersActions.FetchCharacters]))
  public fetchCharactersIsExecuting$: Observable<ActionsExecuting> | undefined;

  constructor(private store: Store) {
    this.characters = this.store.select(CharactersState.getCharacters);

    merge(
      fromEvent(window, 'scroll').pipe(
        startWith(true),
        map(() => this.isUserNearBottom()),
        distinctUntilChanged(),
        filter((isUserNearBottom) => isUserNearBottom),
        takeUntil(this.destroyed$),
        tap(() => this.store.dispatch(new CharactersActions.FetchCharacters()))
      )
    ).subscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position = window.scrollY + window.innerHeight;
    const height = document.body.scrollHeight;
    return position > height - threshold;
  }
}

import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { CharactersState } from './characters/characters.state';
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([CharactersState], {
      developmentMode: !environment.production,
    }),
    NgxsActionsExecutingModule.forRoot(),
  ],
})
export class AppStateModule {}

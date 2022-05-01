import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { CharactersState } from './characters/characters.state';
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([CharactersState], {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot(),
    NgxsActionsExecutingModule.forRoot(),
  ],
})
export class AppStateModule {}

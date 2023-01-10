import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character/character.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CharacterRoutingModule } from './character.route';
import { NgxPaginationModule } from 'ngx-pagination';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { MyCommonModule } from '../common/common.module';
@NgModule({
  declarations: [
    CharacterComponent,
    CharacterListComponent,
    CharacterDetailComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CharacterRoutingModule,
    FormsModule,
    NgxPaginationModule,
    MyCommonModule
  ]
})
export class CharacterModule { }

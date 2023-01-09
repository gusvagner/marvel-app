import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CharacterListComponent } from "./character-list/character-list.component";

const characterRouterConfig: Routes = [
  { path: '', component: CharacterListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(characterRouterConfig)
  ],
  exports: [
    RouterModule
  ]
})
export class CharacterRoutingModule { }

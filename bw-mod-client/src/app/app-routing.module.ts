import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchModule } from './search/search.module'

const routes: Routes = [
  { path: 'search', loadChildren: './search/search.module#SearchModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SearchModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

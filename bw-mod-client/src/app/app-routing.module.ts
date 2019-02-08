import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchModule } from './search/search.module'
import { PassengerModule } from './passenger/passenger.module'

const routes: Routes = [
  { path: 'search', loadChildren: './search/search.module#SearchModule' },
  { path: 'passenger', loadChildren: './passenger/passenger.module#PassengerModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SearchModule,
    PassengerModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

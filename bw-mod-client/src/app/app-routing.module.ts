import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchModule } from './search/search.module'
import { PassengerModule } from './passenger/passenger.module'

const routes: Routes = [
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
  { path: 'passenger', loadChildren: () => import('./passenger/passenger.module').then(m => m.PassengerModule) }
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableClientsComponent } from './components/table-clients/table-clients.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clients',
    pathMatch: 'full'
  },
  {
    path: 'clients',
    component: TableClientsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

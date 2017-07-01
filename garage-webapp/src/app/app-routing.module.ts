import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './users/list/userList.component';
import { UserManagerComponent } from './users/manager/userManager.component';
import { BillListComponent } from './bills/manager/billManager.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users/list', component: UserListComponent },
  { path: 'users/usermanager/:id', component: UserManagerComponent },
  { path: 'billsmanager', component: BillListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

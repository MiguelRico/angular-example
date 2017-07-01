import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import {DataTableModule} from 'angular2-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DashboardComponent } from './dashboard/dashboard.component';

import { UserListComponent } from './users/list/userList.component';
import { UserManagerComponent } from './users/manager/userManager.component';
import { UserService } from './users/user.service';

import { CarListComponent } from './cars/list/carList.component';

import { BillListComponent } from './bills/manager/billManager.component';
import { BillService } from './bills/bill.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserManagerComponent,
    CarListComponent,
    BillListComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    ReactiveFormsModule,
    DataTableModule,
    Ng2SmartTableModule
  ],
  providers: [UserService, BillService],
  bootstrap: [AppComponent]
})
export class AppModule { }

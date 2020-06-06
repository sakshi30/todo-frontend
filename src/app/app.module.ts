import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadComponent } from './shared/head/head.component';
import { AuthorizationModule } from './components/authorization/authorization.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TodoListModule } from './components/todo-list/todo-list.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { DevelopersModule } from './components/developers/developers.module';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    DashboardModule.forRoot(),
    ToastrModule.forRoot(),
    AuthorizationModule.forRoot(),
    TodoListModule.forRoot(),
    DevelopersModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

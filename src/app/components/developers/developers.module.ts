import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevelopersComponent } from './developers.component';
import { DevelopersRoutingModule } from './developers-router.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
      DevelopersComponent
  ],
  imports: [
    CommonModule,
    DevelopersRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
]
})
export class DevelopersModule { 
  static forRoot() {
    return {
      ngModule: DevelopersModule,
      providers: []
    };
  }
}

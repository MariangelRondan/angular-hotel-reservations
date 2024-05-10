import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ], exports: [ //para que los otros componentes puedan usar la etiqueta <app-home>
    HomeComponent 
  ]
})
export class HomeModule { }

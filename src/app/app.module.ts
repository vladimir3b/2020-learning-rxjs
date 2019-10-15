import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app-root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { Chapter1ProblemComponent } from './components/chapter1/problem/problem.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { Chapter1SolutionComponent } from './components/chapter1/solution/solution.component';
import { Chapter1BuildingBlocksComponent } from './components/chapter1/building-blocks/building-blocks.component';
import { Chapter2CreatingObservablesComponent } from './components/chapter2/creating-observables/creating-observables.component';
import { Chapter2SubjectsComponent } from './components/chapter2/subjects/subjects.component';
import { Chapter2ColdAndHotObservablesComponent } from './components/chapter2/cold-and-hot-observables/cold-and-hot-observables.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    Chapter1ProblemComponent,
    Chapter1SolutionComponent,
    Chapter1BuildingBlocksComponent,
    Chapter2CreatingObservablesComponent,
    Chapter2SubjectsComponent,
    Chapter2ColdAndHotObservablesComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Chapter1ProblemComponent } from './components/chapter1/problem/problem.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { Chapter1SolutionComponent } from './components/chapter1/solution/solution.component';
import { Chapter1BuildingBlocksComponent } from './components/chapter1/building-blocks/building-blocks.component';
import { Chapter2CreatingObservablesComponent } from './components/chapter2/creating-observables/creating-observables.component';
import { Chapter2SubjectsComponent } from './components/chapter2/subjects/subjects.component';
import { Chapter2ColdAndHotObservablesComponent } from './components/chapter2/cold-and-hot-observables/cold-and-hot-observables.component';
import { Chapter3BasicOperatorsComponent } from './components/chapter3/basic-operators/basic-operators.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: '1-01',
    component: Chapter1ProblemComponent
  },
  {
    path: '1-02',
    component: Chapter1SolutionComponent
  },
  {
    path: '1-03',
    component: Chapter1BuildingBlocksComponent
  },
  {
    path: '2-01',
    component: Chapter2CreatingObservablesComponent
  },
  {
    path: '2-02',
    component: Chapter2SubjectsComponent
  },
  {
    path: '2-03',
    component: Chapter2ColdAndHotObservablesComponent
  },
  {
    path: '3-01',
    component: Chapter3BasicOperatorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

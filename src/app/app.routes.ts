import { Routes } from '@angular/router';
import { GameplayComponent } from './gameplay/gameplay.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent },
  { path: 'game', component: GameplayComponent },
];

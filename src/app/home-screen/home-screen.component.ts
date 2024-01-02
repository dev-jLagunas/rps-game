import { Component } from '@angular/core';
import { GameplayService } from '../gameplay.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss',
})
export class HomeScreenComponent {
  constructor(
    private gameplayService: GameplayService,
    private router: Router
  ) {}

  playerChoice(choice: string) {
    this.gameplayService.updatePlayerChoice(choice);
    this.router.navigate(['/gameplay']);
  }
}

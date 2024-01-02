import { Component } from '@angular/core';
import { GameplayService } from '../gameplay.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
})
export class ScoreComponent {
  gameScore$ = this.gameplayService.score$;

  constructor(private gameplayService: GameplayService) {}
}

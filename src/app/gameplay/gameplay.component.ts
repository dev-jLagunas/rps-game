import { Component, OnInit } from '@angular/core';
import { GameplayService, Choice, Outcome } from '../gameplay.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gameplay',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.scss',
})
export class GameplayComponent implements OnInit {
  score$ = this.gameplayService.score$;
  playerChoice$ = this.gameplayService.playerChoice$;
  computerChoice$ = this.gameplayService.computerChoice$;
  winner$!: Observable<Outcome | null>;

  constructor(
    private gameplayService: GameplayService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.winner$ = this.gameplayService.playerChoice$.pipe(
      map((playerChoice) => {
        const computerChoice = this.gameplayService.computerChoice;
        if (playerChoice && computerChoice) {
          return this.gameplayService.decideWinner(
            playerChoice,
            computerChoice
          );
        } else {
          return null;
        }
      })
    );
  }

  onPlayerChoice(choice: Choice): void {
    this.gameplayService.updatePlayerChoice(choice);
  }

  onPlayAgain(): void {
    this.gameplayService.playAgain();
    this.router.navigate(['/']);
  }
}

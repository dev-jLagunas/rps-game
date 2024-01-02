import { Component, OnInit } from '@angular/core';
import { GameplayService } from '../gameplay.service';
import { Observable, combineLatest } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NgIf } from '@angular/common';

export type Choice = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';

@Component({
  selector: 'app-gameplay',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.scss',
})
export class GameplayComponent implements OnInit {
  playerChoice$!: Observable<string | null>;
  computerChoice$!: Observable<string | null>;
  winner!: string | null;

  constructor(private gameplayService: GameplayService) {}

  ngOnInit(): void {
    this.playerChoice$ = this.gameplayService.playerChoice$;
    this.computerChoice$ = this.gameplayService.computerChoice$;

    if (this.playerChoice$ && this.computerChoice$) {
      this.checkWinner();
    }
  }

  checkWinner(): void {
    combineLatest([this.playerChoice$, this.computerChoice$]).subscribe(
      ([playerChoice, computerChoice]) => {
        if (playerChoice && computerChoice) {
          this.winner = this.gameplayService.decideWinner(
            playerChoice as Choice,
            computerChoice as Choice
          );
          this.gameplayService.checkAndScoreWinner(
            playerChoice as Choice,
            computerChoice as Choice
          );
        }
      }
    );
  }

  playAgain(): void {
    this.gameplayService.playAgain();
  }
}

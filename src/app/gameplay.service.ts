import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

type Choice = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';

@Injectable({
  providedIn: 'root',
})
export class GameplayService {
  private scoreSource = new BehaviorSubject<number>(0);
  score$ = this.scoreSource.asObservable();

  private playerChoiceSource = new BehaviorSubject<string | null>(null);
  playerChoice$ = this.playerChoiceSource.asObservable();

  private choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
  private computerChoiceSource = new BehaviorSubject<string | null>(null);
  computerChoice$ = this.computerChoiceSource.asObservable();

  private outcomes: { [K in Choice]: Choice[] } = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock'],
  };

  constructor(private router: Router) {
    this.listenForPlayerChoice();
  }

  listenForPlayerChoice() {
    this.playerChoice$.pipe(tap(() => this.computerChoice())).subscribe();
  }

  updateScore(newScore: number) {
    this.scoreSource.next(newScore);
  }

  updatePlayerChoice(newChoice: string) {
    this.playerChoiceSource.next(newChoice);
  }

  computerChoice() {
    const randomIndex = Math.floor(Math.random() * this.choices.length);
    const computerChoice = this.choices[randomIndex];
    this.computerChoiceSource.next(computerChoice);
  }

  updateComputerChoice(newChoice: string) {
    this.computerChoiceSource.next(newChoice);
  }

  decideWinner(playerChoice: Choice, computerChoice: Choice): string {
    if (playerChoice === computerChoice) {
      return 'DRAW';
    } else if (this.outcomes[playerChoice].includes(computerChoice)) {
      return 'YOU WIN';
    } else {
      return 'YOU LOSE';
    }
  }

  checkAndScoreWinner(playerChoice: Choice, computerChoice: Choice) {
    const result = this.decideWinner(playerChoice, computerChoice);
    let currentScore = this.scoreSource.getValue();

    if (result === 'YOU WIN') {
      currentScore += 1;
    } else if (result === 'YOU LOSE') {
      currentScore -= 1;
    } else if (result === 'DRAW') {
      // No points are added or subtracted in case of a draw
    }

    this.scoreSource.next(currentScore);
  }

  playAgain() {
    this.playerChoiceSource.next(null);
    this.computerChoiceSource.next(null);
    this.router.navigate(['/']);
  }
}

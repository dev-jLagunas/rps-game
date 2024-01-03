import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Choice = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';
export type Outcome = 'DRAW' | 'YOU WIN' | 'YOU LOSE';

@Injectable({
  providedIn: 'root',
})
export class GameplayService {
  private playerChoiceSource = new BehaviorSubject<Choice | null>(null);
  playerChoice$ = this.playerChoiceSource.asObservable();

  private computerChoiceSource = new BehaviorSubject<Choice | null>(null);
  computerChoice$ = this.computerChoiceSource.asObservable();

  private score: number = 0;
  private scoreSource = new BehaviorSubject<number>(this.score);
  score$ = this.scoreSource.asObservable();

  private winningOutcomes: { [K in Choice]: Choice[] } = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock'],
  };

  updatePlayerChoice(newChoice: Choice): void {
    this.playerChoiceSource.next(newChoice);
    this.randomComputerChoice();
    this.checkWinnerAndUpdateScore(newChoice, this.computerChoiceSource.value!);
  }

  private randomComputerChoice(): void {
    const choices: Choice[] = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    this.computerChoiceSource.next(choices[randomIndex]);
  }

  get computerChoice(): Choice | null {
    return this.computerChoiceSource.value;
  }

  decideWinner(playerChoice: Choice, computerChoice: Choice): Outcome {
    if (playerChoice === computerChoice) {
      return 'DRAW';
    } else if (this.winningOutcomes[playerChoice].includes(computerChoice)) {
      return 'YOU WIN';
    } else {
      return 'YOU LOSE';
    }
  }

  private checkWinnerAndUpdateScore(
    playerChoice: Choice,
    computerChoice: Choice
  ): void {
    const result = this.decideWinner(playerChoice, computerChoice);
    this.score += result === 'YOU WIN' ? 1 : result === 'YOU LOSE' ? -1 : 0;
    this.scoreSource.next(this.score);
  }

  playAgain(): void {
    this.playerChoiceSource.next(null);
    this.computerChoiceSource.next(null);
  }
}

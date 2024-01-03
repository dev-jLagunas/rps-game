import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ScoreComponent } from './score/score.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { RulesModalComponent } from './rules-modal/rules-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ScoreComponent,
    GameplayComponent,
    RulesModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize() {
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight * 0.01}px`
    );
  }

  ngOnInit() {
    this.onResize();
  }
}

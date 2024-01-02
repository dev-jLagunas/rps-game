import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-rules-modal',
  standalone: true,
  imports: [],
  templateUrl: './rules-modal.component.html',
  styleUrl: './rules-modal.component.scss',
})
export class RulesModalComponent {
  @ViewChild('myDialog') dialog!: ElementRef;

  openDialog(): void {
    this.dialog.nativeElement.showModal();
  }

  closeDialog(): void {
    this.dialog.nativeElement.close();
  }
}

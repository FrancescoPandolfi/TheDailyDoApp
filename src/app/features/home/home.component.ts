import {Component} from '@angular/core';
import {NotesService} from './services/notes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  timer = '0:00:00';
  timerInterval: any;
  isPlaying = false;

  constructor(
    public notesService: NotesService,
  ) {
  }

  createNewNote(): void {
  }


  startCount(): void {
    const count = () => {
      const timeChunks = this.timer.split(':');
      let hour = Number(timeChunks[0]);
      let mins = Number(timeChunks[1]);
      let secs = Number(timeChunks[2]);

      secs++;
      if (secs === 60) {
        secs = 0;
        mins = mins + 1;
      }
      if (mins === 60) {
        mins = 0;
        hour = hour + 1;
      }
      if (hour === 13) {
        hour = 1;
      }
      this.timer = hour + ':' + this.plz(mins) + ':' + this.plz(secs);
    };

    this.timerInterval = setInterval(count, 1000);
    this.isPlaying = true;
  }

  pauseCount(): void {
    clearInterval(this.timerInterval);
    this.isPlaying = false;
  }

  resetCount(): void {
    this.timer = '0:00:00';
    this.pauseCount();
  }

  plz(digit: number): string {
    let zpad = digit + '';
    if (digit < 10) {
      zpad = '0' + zpad;
    }
    return zpad;
  }


}

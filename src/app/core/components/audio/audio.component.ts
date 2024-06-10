import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements OnInit {
  private audio: HTMLAudioElement | undefined = new Audio();
  private volume: number = 0;

  @Input()
  set url(url: string) {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = url;
      this.audio.play();
    }
  }

  ngOnInit() {}
}

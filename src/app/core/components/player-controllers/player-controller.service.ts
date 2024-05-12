import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import {
  Observable,
  Subject,
  concat,
  interval,
  map,
  of,
  takeWhile,
} from 'rxjs';

export type DataTimer = {
  progress: string;
  currentTime: string;
  remainingTime: string;
  isFinished?: boolean;
};
@Injectable()
export class PlayerControllerService {
  private INTERVAL_TIME = 1000;
  private trackDuration: number = 30000; //Priview duration
  private currentTime: number = 0;

  public getDataTimer(initialTime: number): Observable<DataTimer> {
    this.trackDuration = initialTime;
    return concat(
      interval(this.INTERVAL_TIME).pipe(
        takeWhile(
          () =>
            (this.currentTime + 1) * this.INTERVAL_TIME <= this.trackDuration
        ),
        map((): DataTimer => {
          this.currentTime++;
          return this.calcDataTimer(this.currentTime, this.trackDuration);
        })
      ),
      of(this.calcDataTimer(this.currentTime, this.trackDuration, true))
    );
  }

  private calcDataTimer(
    currentTime: number,
    trackDuration: number,
    isFinished?: boolean
  ): DataTimer {
    return {
      progress: this.transformTime((currentTime * 1000) / trackDuration),
      currentTime: this.transformTime(currentTime * 1000),
      remainingTime: this.transformTime(trackDuration - currentTime * 1000),
      isFinished,
    };
  }

  private transformTime(time: number): string {
    return formatDate(time, 'mm:ss', 'en-US');
  }
}

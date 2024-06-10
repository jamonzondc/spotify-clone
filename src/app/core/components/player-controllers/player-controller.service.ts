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
  takeUntil,
  takeWhile,
} from 'rxjs';

export type DataTimer = {
  progress: number;
  currentTime: number;
  remainingTime: number;
  isFinished?: boolean;
};
@Injectable()
export class PlayerControllerService {
  private INTERVAL_TIME = 1000;
  private trackDuration: number = 30000; //Priview duration
  private currentTime: number = 0;
  private stop$ = new Subject<void>();

  public stopDataTimer(): void {
    this.currentTime = 0;
    this.stop$.next();
  }

  public pauseDataTimer(): void {
    this.stop$.next();
  }

  public startDataTimer(initialTime: number): Observable<DataTimer> {
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
    ).pipe(takeUntil(this.stop$));
  }

  private calcDataTimer(
    currentTime: number,
    trackDuration: number,
    isFinished?: boolean
  ): DataTimer {
    return {
      progress: (currentTime * 1000) / trackDuration,
      currentTime: currentTime * 1000,
      remainingTime: trackDuration - currentTime * 1000,
      isFinished,
    };
  }
}

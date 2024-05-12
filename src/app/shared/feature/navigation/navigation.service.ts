import { Injectable, inject } from '@angular/core';
import { Navigation } from './navigation';
import { NavController } from '@ionic/angular';

@Injectable()
export class NavigationService extends Navigation {
  private currentIndex: number = 0;
  private history: string[] = ['/home'];
  private navController: NavController = inject(NavController);

  navigateTo(url: string): void {
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(url);
    this.currentIndex++;
    this.navController.navigateForward(url);
  }

  navigateBack(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const url = this.history[this.currentIndex];
      this.navController.navigateBack(url);
    }
  }

  navigateForward(): void {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      const url = this.history[this.currentIndex];
      this.navController.navigateForward(url);
    }
  }
}

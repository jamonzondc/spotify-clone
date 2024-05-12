export abstract class Navigation {
  abstract navigateTo(url: string): void;
  abstract navigateBack(): void;
  abstract navigateForward(): void;
}

export abstract class LaunchExternalApp {
  abstract open(url: string): Promise<void>;
}

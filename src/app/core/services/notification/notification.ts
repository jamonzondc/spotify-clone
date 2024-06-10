export abstract class Notification {
  abstract showNotification(code: string | undefined): Promise<void>;
}

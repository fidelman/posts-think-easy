export interface CookieProvider {
  get(name: string): string | undefined;
  set(name: string, value: string): void;
  remove(name: string): void;
}

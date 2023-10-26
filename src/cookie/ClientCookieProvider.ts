import { CookieProvider } from "./CookieProvider";
import Cookies from "js-cookie";

class ClientCookieProvider implements CookieProvider {
  set(name: string, value: string) {
    Cookies.set(name, value);
  }

  get(name: string) {
    return Cookies.get(name);
  }

  remove(name: string) {
    Cookies.remove(name);
  }
}

export const clientCookieProvider = new ClientCookieProvider();

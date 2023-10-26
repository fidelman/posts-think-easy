import { cookies } from "next/headers";
import { CookieProvider } from "./CookieProvider";
import Cookies from "js-cookie";

export class ServerCookieProvider implements CookieProvider {
  set(name: string, value: string) {
    Cookies.set(name, value);
    // cookies().set(name, value);
  }

  get(name: string) {
    return cookies().get(name)?.value;
  }

  remove(name: string) {
    // cookies().delete(name);
    Cookies.remove(name);
  }
}

export const serverCookieProvider = new ServerCookieProvider();

import { cookies } from "next/headers";
import { CookieProvider } from "./CookieProvider";
import Cookies from "js-cookie";

export class ServerCookieProvider implements CookieProvider {
  set(name: string, value: string) {
    Cookies.set(name, value);
  }

  get(name: string) {
    return cookies().get(name)?.value;
  }

  remove(name: string) {
    return cookies().delete(name);
  }
}

export const serverCookieProvider = new ServerCookieProvider();

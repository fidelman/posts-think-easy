import {
  Auth,
  LoginInput,
  SignupInput,
} from "@/api/clientInstanceEndpoints.schemas";
import { BodyType } from "@/api/mutator/instance-creator";
import { Gateway } from "@/api/serverGatewayCreator";
import { CookieProvider } from "@/cookie/CookieProvider";

export class AuthRepository {
  constructor(
    private readonly cookieProvider: CookieProvider,
    private readonly gateway: Gateway
  ) {}

  get isLoggedIn() {
    return this.accessToken !== "" && this.refreshToken !== "";
  }

  get accessToken() {
    return this.cookieProvider.get("accessToken") || "";
  }

  get refreshToken() {
    return this.cookieProvider.get("refreshToken") || "";
  }

  async login(input: BodyType<LoginInput>) {
    const response = await this.gateway.authControllerLogin(input);
    if (response.data) {
      this.setTokens(response.data);
    }
    return response;
  }

  async signup(input: BodyType<SignupInput>) {
    const response = await this.gateway.authControllerSignup(input);
    if (response.data) {
      this.setTokens(response.data);
    }
    return response;
  }

  signOut() {
    this.cookieProvider.remove("accessToken");
    this.cookieProvider.remove("refreshToken");
    this.setTokens({ accessToken: "", refreshToken: "" });
  }

  async updateToken() {
    const response = await this.gateway.authControllerRefreshToken({
      token: this.refreshToken,
    });
    if (response.data) {
      this.cookieProvider.set("accessToken", response.data.access_token);
    }
    return response;
  }

  private setTokens(data: Auth) {
    this.cookieProvider.set("accessToken", data.accessToken);
    this.cookieProvider.set("refreshToken", data.refreshToken);
  }
}

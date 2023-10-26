import Link from "next/link";
import { WriteIcon } from "../new-post/components/WriteIcon";
import { Logo } from "./Logo";
import { SearchInput } from "@/search/components/SearchInput";
import { useServerAuth } from "../app/(root)/(auth)/server-presenter";
import { SignOutButton } from "../auth/signout/components/SignOutButton";

export const Header = () => {
  const { isLoggedIn } = useServerAuth();

  return (
    <header className="border-b h-20 flex">
      <div className="container mx-auto flex">
        <ul className="flex items-center justify-center gap-4">
          <li>
            <Link className="block w-16" href="/">
              <Logo />
            </Link>
          </li>
          <li>
            <SearchInput />
          </li>
        </ul>
        <ul className="flex ml-auto items-center justify-center">
          {!isLoggedIn && (
            <li>
              <Link className="btn btn-primary" href="/sign-up">
                Sign Up
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link className="btn btn-transparent" href="/log-in">
                Log In
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link className="btn btn-transparent btn-icon" href="/new-post">
                <WriteIcon />
                <span className="ml-1.5">Write</span>
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <SignOutButton />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

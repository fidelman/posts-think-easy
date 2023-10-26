import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FC } from "react";

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: FC<P> = (props) => {
    const cookieList = cookies();
    const isLoggedIn = Boolean(cookieList.get("accessToken")?.value);
    if (!isLoggedIn) {
      redirect("/log-in");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

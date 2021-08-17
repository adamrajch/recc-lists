import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { supabase } from "../../client";
export default function Header(): ReactElement {
  const router = useRouter();
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");
  //  const { user } = await supabase.auth.api.getUserByCookie(req);
  useEffect(() => {
    checkUser();
  }, []);
  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }
  async function checkUser() {
    const user = await supabase.auth.user();
    console.log(user);
    if (user) {
      setAuthenticatedState("authenticated");
    }
  }

  return (
    <div>
      {authenticatedState === "not-authenticated" ? (
        <Button onClick={() => router.push("/login")}>Go to login</Button>
      ) : (
        <Button onClick={() => signOut()}> Sign Out</Button>
      )}
    </div>
  );
}

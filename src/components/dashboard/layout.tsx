import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { supabase } from "../../../client";
import { MobileTopBar } from "./mobiletopbar";
import { Sidebar } from "./sidebar";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const router = useRouter();

  //  const { user } = await supabase.auth.api.getUserByCookie(req);
  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const user = await supabase.auth.user();
    console.log("my user: ", user);
    if (user) {
      // setAuthenticatedState("authenticated");
    } else {
      router.push("/login");
    }
  }

  return (
    <Flex h="100vh" flexDirection="column" position="fixed" w="100%">
      <MobileTopBar />
      <Flex flex="1">
        <Sidebar display={{ base: "none", md: "flex" }} />

        {children}
      </Flex>
    </Flex>
  );
}

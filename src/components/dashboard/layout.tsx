import { Flex } from "@chakra-ui/react";
import React from "react";
import { MobileTopBar } from "./mobiletopbar";
import { Sidebar } from "./sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
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

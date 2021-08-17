import { Avatar, Flex, HStack, Link, Text } from "@chakra-ui/react";
import * as React from "react";

export const UserProfile = () => {
  const placeholder = {
    username: "Loading...",
  };
  return (
    <Link href="/dashboard/profile">
      <HStack spacing="4" px="2" flexShrink={0} borderTopWidth="1px" p="4">
        <Avatar
          size="sm"
          // name={user ? user.getUsername : placeholder.username}
          // src={user?.image}
        />
        <Flex direction="column" fontWeight="medium">
          <Text fontSize="sm">user</Text>
        </Flex>
      </HStack>
    </Link>
  );
};

import { SettingsIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../client";

export const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  //  const { user } = await supabase.auth.api.getUserByCookie(req);
  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const user = await supabase.auth.user();
    console.log("my user: ", user);
    if (user) {
      setUser(user);
      // setAuthenticatedState("authenticated");
    } else {
      router.push("/login");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }
  const placeholder = {
    username: "Loading...",
  };

  return (
    <>
      {user ? (
        <Menu>
          <MenuButton as={Button} rightIcon={<SettingsIcon />}>
            {user.email}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => router.push("/dashboard/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <>{placeholder.username}</>
      )}
    </>
  );
};

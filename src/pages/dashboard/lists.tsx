import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  Icon,
  SettingsIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import { AddListModal } from "@components/addListModal";
import { ShowCard } from "@components/card";
import Layout from "@components/dashboard/layout";
import React, { ReactElement, useEffect, useState } from "react";
import { supabase } from "../../../client";
// import { supabase } from "../../../client";
export default function Lists(): ReactElement {
  const [lists, setLists] = useState([]);

  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchLists();
  }, []);
  async function fetchLists() {
    const profileData = await supabase.auth.user();
    setUser(profileData);
    console.log(profileData);
    const { data, error } = await supabase
      .from("lists")
      .select(
        `  title, id, genre, media(title, image_url, episodes, rated, synopsis, score, status, genre)`
      )
      .eq("user_id", profileData.id);
    if (error) {
      console.log(error);
    }
    setLists(data);
    console.log("data: ", data);
  }
  //  async function fetchMedia() {
  //    const { data } = await supabase.from("media").select();
  //    setMedia(data);
  //    console.log("data: ", data);
  //  }
  async function addList({ title, genre }) {
    const { data, error } = await supabase
      .from("lists")
      .insert({ title: title, genre: genre, user_id: user.id });
    if (error) {
      console.log(error);
      return;
    }
    setLists((prev) => [...lists, data[0]]);
    console.log(data);
  }
  return (
    <Layout>
      <VStack>
        <Heading fontSize="3xl">My Recommendation Lists</Heading>
        <AddListModal addList={addList} />
        <Box>
          {lists.map((list) => {
            return (
              <Box
                key={list.id}
                px={4}
                my={3}
                // bgColor="brand.800"
                borderRadius="1rem"
              >
                <Flex align="center">
                  <Heading fontSize="lg">{list.title}</Heading>
                  <Icon as={AddIcon} onClick={() => console.log("hi")} />
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="options"
                      icon={<SettingsIcon />}
                      variant="ghost"
                    />
                    <MenuList>
                      <MenuItem icon={<EditIcon />}>Edit</MenuItem>
                      <MenuItem icon={<DeleteIcon />}>Delete List</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>

                {list.media.length && list.media ? (
                  <HStack spacing={2} py={2}>
                    {list.media.map((show, i) => {
                      return <ShowCard key={i} show={show} />;
                    })}
                  </HStack>
                ) : (
                  <Box>
                    howdy<Box>hi</Box>
                    <Box>hi</Box>
                    <Box>hi</Box>
                    <Box>hi</Box>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </VStack>
    </Layout>
  );
}

// export async function getServerSideProps({ req }) {
//   const { user } = await supabase.auth.api.getUserByCookie(req);

//   if (!user) {
//     // If no user, redirect to index.
//     return {
//       props: {},
//       redirect: { destination: "/dashboard", permanent: false },
//     };
//   }

//   // If there is a user, return it.
//   return { props: { user } };
// }

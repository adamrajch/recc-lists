import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export function MediaCard(props: any) {
  const { show, lists } = props;
  // const status = show.end_date ? "completed" : "ongoing";
  const { isOpen, onOpen, onClose } = useDisclosure();

  // async function createMedia(id) {
  //   const { data, error } = await supabase.from("media").insert([
  //     {
  //       title: show.title,
  //       score: show.score,
  //       synopsis: show.synopsis,
  //       image_url: show.image_url,
  //       user_score: null,
  //       episodes: show.episodes,
  //       rated: show.rated,
  //       genre: "anime",
  //       status: status,
  //     },
  //   ]);
  //   if (error) {
  //     console.log(error);
  //     return;
  //   }
  //   const addedMedia = addShowToList(id);
  //   console.log(addedMedia);
  //   console.log(data);
  //   return data;
  // }

  // async function addShowToList(id) {
  //   const { data, error } = await supabase.from("showlist").insert([
  //     {
  //       list_id: id,
  //       media_id: id,
  //     },
  //   ]);
  //   if (error) {
  //     console.log(error);
  //   }
  //   return data;
  // }

  return (
    <Box
      onClick={onOpen}
      my={3}
      border="2px solid transparent"
      _hover={{ border: "2px solid gray", cursor: "pointer" }}
    >
      <Box
        bgImage={show.image_url}
        // h="100%"
        minH="300px"
        position="relative"
        minW="200px"

        // bgGradient="linear-gradient(to top,rgba(0,0,0,0=), rgba(0,0,0,0))"
        // objectFit="cover"
      >
        <Box
          height="100%"
          // bgGradient="linear-gradient(to top,rgba(255,255,255,0) 100%, rgba(0,0,0,0), 0%)"
          // background="rgb(0,0,0)"
          background="linear-gradient(0deg, rgba(0,0,0,.75) 0%, rgba(255,255,255,0) 100%)"
          minH="300px"
          zIndex="3"
        />
        <Box
          py={3}
          px={2}
          position="absolute"
          zIndex="4"
          bottom="0"
          width="100%"
        >
          <Text as="b" fontSize="xl">
            {show.title}
          </Text>
        </Box>
      </Box>

      <Modal
        size="4xl"
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay mt={0} />
        <ModalContent bg="black">
          {/* <ModalHeader>{show.title}</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody mt={3}>
            <Flex justify="center" align="center">
              <Image src={show.image_url} />
              <VStack justify="center" align="center">
                <Flex justify="space-between" w="100%">
                  <Heading flexGrow={1}>{show.title}</Heading>
                  {/* <Button onClick={() => createMedia()}>Create Show</Button> */}
                  <Menu>
                    <MenuButton as={Button} rightIcon={<AddIcon />}>
                      Add
                    </MenuButton>
                    <MenuList>
                      {lists.length === 0 ? (
                        <MenuItem>Download</MenuItem>
                      ) : (
                        <>
                          {lists.map((list) => (
                            <MenuItem
                              key={list.id}
                              onClick={() => props.createMedia(list.id, show)}
                            >
                              {list.title}
                            </MenuItem>
                          ))}
                        </>
                      )}
                    </MenuList>
                  </Menu>
                </Flex>

                <HStack spacing={2} justify="flex-start">
                  <Text>{`${show.episodes} eps`}</Text>
                  <Divider
                    orientation="vertical"
                    colorScheme="blue"
                    w="1px"
                    bgColor="blue"
                  />
                  <Text>{show.rated}</Text>
                  <Divider orientation="vertical" />
                  <Text>{show.type}</Text>
                  <Divider orientation="vertical" />
                  <Text>{show.end_date ? "Completed" : null}</Text>
                </HStack>
                <Container>
                  <Text>{show.synopsis}</Text>
                </Container>
              </VStack>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

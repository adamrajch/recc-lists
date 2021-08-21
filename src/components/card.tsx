import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
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

export function ShowCard(props: any) {
  const { show } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      onClick={onOpen}
      my={3}
      border="2px solid transparent"
      _hover={{ border: "2px solid gray", cursor: "pointer" }}
    >
      <Box
        bgImage={show.image_url}
        minH="250px"
        position="relative"
        minW="170px"
      >
        <Box
          height="100%"
          background="linear-gradient(0deg, rgba(0,0,0,.75) 0%, rgba(255,255,255,0) 100%)"
          minH="250px"
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
          <ModalCloseButton />
          <ModalBody mt={3}>
            <Flex justify="center" align="center">
              <Image src={show.image_url} />
              <VStack justify="center" align="center">
                <Flex justify="space-between" w="100%">
                  <Heading flexGrow={1}>{show.title}</Heading>
                  {/* 
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
                  </Menu> */}
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
                  <Text>{show.status}</Text>
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

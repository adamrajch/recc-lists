import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Radio,
  RadioGroup,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

export function AddListModal(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("anime");
  async function handleSave() {
    // add list to supabase table

    props.addList({ title, genre });
    onClose();
    console.log("hi");
  }

  function handleChange(e) {
    e.preventDefault();
    if (title.length < 25) {
      setTitle(e.target.value);
    }
  }
  return (
    <Box>
      <IconButton icon={<AddIcon />} aria-label="add" onClick={onOpen}>
        Add new list
      </IconButton>
      <Modal
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay mt={0} />
        <ModalContent bg="black">
          <ModalCloseButton />
          <ModalBody mt={3}>
            <form>
              <VStack spacing={4}>
                <FormControl>
                  <Input
                    placeholder="give your list a name"
                    variant="flushed"
                    value={title}
                    onChange={(e) => handleChange(e)}
                  />
                </FormControl>
                <FormControl as="fieldset">
                  <RadioGroup onChange={setGenre} value={genre}>
                    <HStack>
                      <Radio value="anime">Anime</Radio>
                      <Radio value="movie">Movie</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="green" onClick={() => handleSave()}>
                Save
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

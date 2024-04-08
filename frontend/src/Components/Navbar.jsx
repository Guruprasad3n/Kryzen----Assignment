import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import CreateTask from "./CreateTask";

function Navbar({ tasks, setTasks }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navgate = useNavigate();
  useEffect(() => {}, []);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navgate("/login");
  };
  const authToken = localStorage.getItem("authToken");
  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex="sticky"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box ml={5}>
            <Link to={"/"}>
              {" "}
              <Text fontSize={"2xl"} fontStyle={"unset"}>
                {" "}
                Kryzen
              </Text>
            </Link>
          </Box>

          <Flex alignItems={"center"}>
            <Stack
              direction={"row"}
              spacing={7}
              display={"flex"}
              align={"center"}
            >
              <Button onClick={openModal}>Create Task</Button>

              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {authToken && (
                <Button colorScheme={"red"} onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateTask
              onTaskCreated={closeModal}
              tasks={tasks}
              setTasks={setTasks}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Navbar;

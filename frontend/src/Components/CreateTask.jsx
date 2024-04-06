import {
  FormControl,
  FormLabel,
  Container,
  Input,
  Select,
  Heading,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

function CreateTask() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("todo");
  const [taskDate, setTaskDate] = useState("");
  const toast = useToast();
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/create-task`, {
        name,
        status,
        taskDate,
      });
      if (response.status == 200) {
        toast({
          title: "Task Created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      return;
      console.log(response);
    } catch (error) {
      toast({
        title: `Create Task Failed`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        height={"80vh"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
        gap={5}
      >
        <Container maxW="md">
          <Heading textAlign={"center"}>Create Task</Heading>
          <FormControl>
            <FormLabel>Task Name</FormLabel>
            <Input
              placeholder="Task Name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="todo">Todo</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
              <option value="rework">Re-Work</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              placeholder="Select Date"
              size="md"
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
            />
          </FormControl>
        </Container>
        <Container
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          maxW="md"
        >
          <Button paddingX={20} colorScheme="telegram" onClick={handleSubmit}>
            Create
          </Button>
        </Container>
      </Flex>
    </>
  );
}
export default CreateTask;

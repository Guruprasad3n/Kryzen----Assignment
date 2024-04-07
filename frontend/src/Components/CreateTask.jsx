import {
  FormControl,
  FormLabel,
  Container,
  Input,
  Button,
  useToast,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

function CreateTask({ onTaskCreated }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("todo");
  const [date, setTaskDate] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/create-task`, {
        name,
        status,
        date,
      });
      if (response.status === 200) {
        toast({
          title: "Task Created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onTaskCreated();
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: `Create Task Failed`,
        description: "An error occurred while creating the task.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Container maxW="md">
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
            value={date}
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
        <Button
          mt={8}
          paddingX={20}
          colorScheme="telegram"
          onClick={handleSubmit}
        >
          Create Task
        </Button>
      </Container>
    </>
  );
}

export default CreateTask;
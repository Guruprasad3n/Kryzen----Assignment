import React, { forwardRef, useState } from "react";
import {
  Container,
  Text,
  Box,
  Flex,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";

const Task = forwardRef(({ status, tasks }, ref) => {
  const [taskList, setTaskList] = useState(tasks);

  const filteredTasks = taskList.filter((task) => task.status === status);
  const taskCount = filteredTasks.length;

  const formatDate = (dateString) => {
    const options = {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/delete-task/${taskId}`);
      setTaskList(taskList.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "todo":
        return "#FFA07A";
      case "inProgress":
        return "#FFB90F";
      case "done":
        return "#90EE90";
      case "reWork":
        return "#87CEEB";
      default:
        return "#FFFFFF";
    }
  };

  return (
    <Container textAlign="center">
      <Box
        backgroundColor={getStatusColor()}
        padding={2}
        marginBottom={4}
        borderRadius={"lg"}
        ref={ref}
      >
        <Text fontSize="xl" fontWeight="bold">
          {status.toUpperCase()} ({taskCount})
        </Text>
      </Box>
      <ul>
        {filteredTasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            formatDate={formatDate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </Container>
  );
});

const TaskItem = ({ task, formatDate, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "task",
      item: { id: task.id, type: "task", status: task.status },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [task.id, task.status]
  );

  const handleDelete = () => {
    onDelete(task._id);
  };

  return (
    <div ref={drag}>
      <Box
        minW="200px"
        paddingX={2}
        borderWidth="1px"
        borderRadius="xl"
        textTransform="capitalize"
        fontSize="1xl"
        fontWeight={500}
        paddingTop={0}
        paddingBottom={3}
        mt={2}
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        opacity={isDragging ? 0.5 : 1}
      >
        <Flex alignItems={"center"} justifyContent={"space-evenly"} gap={10}>
          <Box>
            {" "}
            <Text>{task.name}</Text>
            <Text>{formatDate(task.date)}</Text>
          </Box>

          <IconButton
            _hover={"none"}
            fontSize={"2xl"}
            color={"red"}
            icon={<DeleteIcon />}
            aria-label="Delete Task"
            variant="ghost"
            onClick={handleDelete}
          />
        </Flex>
      </Box>
    </div>
  );
};

export default Task;

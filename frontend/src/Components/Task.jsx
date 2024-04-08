import React, { forwardRef } from "react";
import { Container, Text, Box } from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { useNavigate } from "react-router-dom";
const Task = forwardRef(({ status, tasks }, ref) => {
  const filteredTasks = tasks.filter((task) => task.status === status);
  const taskCount = filteredTasks.length;
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const options = {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-IN", options);
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
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    navigate("/login");
  }

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
          <TaskItem key={index} task={task} formatDate={formatDate} />
        ))}
      </ul>
    </Container>
  );
});

const TaskItem = ({ task, formatDate }) => {
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
        <Text>{task.name}</Text>
        <Text>{formatDate(task.date)}</Text>
      </Box>
    </div>
  );
};

export default Task;

import React, { useEffect, useState } from "react";
import { Flex, Input, Container, Text, Box } from "@chakra-ui/react";
import axios from "axios";
import Task from "./Task";
import { useDrop } from "react-dnd";
import DownloadButton from "./DownloadButton";

const TaskList = ({ tasks, setTasks }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:8000/all-tasks`;
        if (startDate && endDate) {
          url = `http://localhost:8000/task/filter?startDate=${startDate}&endDate=${endDate}`;
        }
        const response = await axios.get(url);
        setAllTasks(response.data.task);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const moveTask = (taskId, status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  const statuses = ["todo", "inProgress", "done", "reWork"];
  const dropTargets = statuses.map((status) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "task",
      drop: () => handleDrop(status),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    return { status, isOver, drop };
  });

  const handleDrop = (status) => (item) => {
    const { id: taskId } = item;
    moveTask(taskId, status.status);
    return undefined;
  };

  return (
    <Flex direction="column" gap={4}>
      <Container>
        <Text textAlign={"center"} fontSize={"2xl"}>
          Filter By Date{" "}
        </Text>
        <Flex direction={"column"} gap={2}>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
          />
        </Flex>
      </Container>
      <Flex justify="center">
        {/* <DownloadButton data={allTasks} /> */}
      </Flex>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <Flex gap={10}>
          {dropTargets.map(({ status, isOver, drop }) => (
            <Box
              key={status}
              ref={drop}
              flexGrow={1}
              maxWidth="25%"
              style={{
                backgroundColor: isOver ? "#ededed" : "",
                borderRadius: "10px",
              }}
            >
              <Task status={status} tasks={allTasks} />
            </Box>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default TaskList;
// Components/Login.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Text,
  useToast,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate("/task");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const fillCredentials = () => {
    // Fill email and password fields with predefined values
    setEmail("test@email.com");
    setPassword("123456");
  };
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/task");
    }
  }, []);

  return (
    <Container>
      <Box>
        <Heading as="h2" size="lg" mb="4" textAlign={"center"}>
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb="4">
            <FormLabel>Email address</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" mb="4">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Flex
            margin={"auto"}
            direction={"column"}
            gap={2}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button width={60} type="submit" colorScheme="teal">
              Login
            </Button>
            <Button width={100} colorScheme="green" onClick={fillCredentials}>
              Test User
            </Button>
          </Flex>
        </form>
        {/* <Text mt="2">
          Don't have an account?{" "}
          <Link to="/" color="teal.500">
            Sign up here
          </Link>
        </Text> */}
      </Box>
    </Container>
  );
}

export default Login;

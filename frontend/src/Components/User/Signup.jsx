// Components/Signup.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Container,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/user/register", {
        name,
        email,
        password,
      });
      console.log(response);
      if (response.status === 201) {
        toast({
          title: "Registration successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login")
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: "An error occurred while registering. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
     navigate("/task"); // Redirect to home page if authToken is present
    }
  }, []);
  return (
    <Container>
      <Box>
        <Heading as="h2" size="lg" mb="4" textAlign={"center"}>
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" mb="4">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
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
          <Button type="submit" colorScheme="teal">
            Sign Up
          </Button>
        </form>
        <Text mt="2">
          Already have an account?{" "}
          <Link to="/login" color="teal.500">
            Login here
          </Link>
        </Text>
      </Box>
    </Container>
  );
}

export default Signup;

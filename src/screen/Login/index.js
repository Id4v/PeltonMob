import { Box, Button, Center, FormControl, Heading, Icon, IconButton, Input, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import Client from "api/client";
import Password from "components/Password";

export default function Login() {
  const isInvalid = false;

  const [jwtToken, setJwtToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (jwtToken) {
    console.log(jwtToken)
   return null ;
  }

  function handleLogin() {
    const api = new Client();
    if (username && password) {
      api.authenticate(username, password)
      .then((response) => {
        setJwtToken(response.data.token);
      }).catch((error) => {
        console.error('Bad Login')
      })
    }
  }

  return (
    <Center flex={1} alignItems={"center"}>
      <VStack
        space="5"
        alignItems="center"
        justifyItems="center"
        w={"100%"}
        px={4}
      >
        <Heading>Welcome to Padel Play</Heading>
        <Heading size={"md"}>Connectez-vous</Heading>
        <FormControl isRequired isInvalid={isInvalid}>
          <FormControl.ErrorMessage>
            Identifiants invalides
          </FormControl.ErrorMessage>
          <Box py={3}>
            <FormControl.Label>Email</FormControl.Label>
            <Input p={2} placeholder="user@example.com" value={username} onChangeText={setUsername} keyboardType="email-address"/>
          </Box>
          <Box>
            <FormControl.Label>Password</FormControl.Label>
            <Password p={2} placeholder="Password" value={password} onChangeText={setPassword} /> 
          </Box>
        </FormControl>
        <Button startIcon={<Icon as={MaterialIcons} name="send" size={"sm"}/>} onPress={handleLogin}>
            Connexion
        </Button>
        
        
      </VStack>
    </Center>
  );
}

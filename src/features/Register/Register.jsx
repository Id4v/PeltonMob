import {
  Button, Center, FormControl, Heading, HStack, Icon, Input, Toast, VStack,
} from 'native-base';
import {useState} from 'react';
import Password from '@app/components/Password';
import {MaterialIcons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import Api from "@app/api/client";
import {hideLoader, showLoader} from "@app/components/LoadingView/loaderSlice";
import {showToast} from "@app/components/Toast";

export default function Register({navigation}) {
  const [name, setName] = useState();
  const [firstname, setFirstName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const handleRegister = async () => {

    dispatch(showLoader());

    try {
      const response = await Api.register({
        username,
        email,
        lastname: name,
        firstname,
        password
      });

      dispatch(hideLoader());

      navigation.navigate("Login");

      showToast({type: 'success', title: "Inscription réussie", message: "Inscription bien reçue. Vérifie tes emails pour pouvoir te connecter."})

      return response;
    } catch (error) {
      dispatch(hideLoader());

      showToast({type: 'error', 'title': 'Une erreur s\'est produite', message:error.message})
    }
  };

  return (
    <Center flex={1} backgroundColor="white">
      <VStack w="100%" alignItems="center" justifyItems="center" space={5} px={4}>
        <Heading>Inscrivez-vous</Heading>
        <HStack py={3} space={3}>
          <FormControl flex={1}>
            <FormControl.Label>Nom</FormControl.Label>
            <Input
              p={2}
              placeholder="Nom"
              value={name}
              onChangeText={setName}
            />
          </FormControl>
          <FormControl flex={1}>
            <FormControl.Label>Prénom</FormControl.Label>
            <Input
              p={2}
              placeholder="Prénom"
              value={firstname}
              onChangeText={setFirstName}
            />
          </FormControl>
        </HStack>
        <FormControl>
          <FormControl.Label>Username</FormControl.Label>
          <Input
            p={2}
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            p={2}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Password
            p={2}
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
          />
        </FormControl>
        <Button
          startIcon={<Icon as={MaterialIcons} name="person-add" size="sm"/>}
          onPress={handleRegister}
        >
          S&apos;inscrire
        </Button>
      </VStack>
    </Center>
  );
}

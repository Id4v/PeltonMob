import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Icon,
  Input, Link, useTheme, View,
  VStack,
} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import {useState} from 'react';
import Password from '@app/components/Password';
import {useDispatch, useSelector} from 'react-redux';
import {authenticate, getJwtToken, isLoggedIn} from './userSlice';

export default function Login({navigation}) {
  const isInvalid = false;
  const jwtToken = useSelector(getJwtToken);
  const loggedIn = useSelector(isLoggedIn);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (loggedIn) {
    console.log(jwtToken);
    return null;
  }

  function handleLogin() {
    if (username !== '' && password !== '') {
      dispatch(authenticate({username, password}));
    }
  }

  function goTo(route) {
    navigation.navigate(route);
  }

  return (
    <View flex={1} justifyContent={"center"} alignItems="center" alignContent="space-between" backgroundColor="white">
        <VStack
          space="5"
          alignItems="center"
          justifyItems="center"
          w="100%"
          px={4}
        >
          <Heading size={"xl"} color={"primary.900"}>Welcome to Padel Play</Heading>
          <Heading size="md">Connectez-vous</Heading>
          <FormControl isRequired isInvalid={isInvalid}>
            <FormControl.ErrorMessage>
              Identifiants invalides
            </FormControl.ErrorMessage>
            <Box py={3}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                p={2}
                placeholder="user@example.com"
                value={username}
                onChangeText={setUsername}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Box>
            <Box>
              <FormControl.Label>Password</FormControl.Label>
              <Password
                p={2}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
              />
            </Box>
          </FormControl>
          <Button
            startIcon={<Icon as={MaterialIcons} name="send" size="sm"/>}
            onPress={handleLogin}
          >
            Connexion
          </Button>
          <Link onPress={() => {
            goTo('lostPassword');
          }}
          >
            Mot de passe perdu ?
          </Link>
          <Heading size="xl" mt={"100"}>Pas encore inscrit ?</Heading>
          <Button bgColor={"tertiary.600"} onPress={() => {
            goTo('register');
          }}
          >
            Crée ton compte !
          </Button>
        </VStack>
    </View>
  );
}

import {Button, Center, FormControl, Heading, Icon, Input, Text, VStack} from 'native-base';
import {useState} from "react";
import {MaterialIcons} from "@expo/vector-icons";
import {showToast} from "@app/components/Toast";
import {hideLoader, showLoader} from "@app/components/LoadingView/loaderSlice";
import {useDispatch} from "react-redux";
import Api from "@app/api/client";

export default function ({navigation}) {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  async function handleSubmit() {
    if (email !== '') {
      dispatch(showLoader());
      try {
        const response = await Api.requestResetPassword(email);
        dispatch(hideLoader());
        navigation.navigate('Login');
        showToast({type: 'success', title: "Réinitialisation reçue", message: "Un email a été envoyé pour réinitialiser le mot de passe."})
      } catch (error) {
        dispatch(hideLoader());
        showToast({type: "error", title : "Une erreur est survenue",  message: error.message})
      }

    }
  }


  return (
    <Center flex={1} backgroundColor="white">
      <VStack w="100%"
              justifyItems="center"
              alignItems="center"
              space="5"
              px={4}
      >
        <Heading>Réinitialisez votre mot de passe</Heading>
        <Text color={"muted.400"} italic={true}>Renseignez votre email pour recevoir les instructions de remise à zéro de votre mot de passe.</Text>
        <FormControl py={3}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            p={2}
            placeholder="user@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </FormControl>
        <Button
          startIcon={<Icon as={MaterialIcons} name="send" size="sm"/>}
          onPress={handleSubmit}
        >
          Envoyer
        </Button>
      </VStack>
    </Center>
  );
}

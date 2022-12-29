import {
  Center, Heading, HStack, Spinner,
} from 'native-base';
import {ActivityIndicator, Dimensions} from 'react-native';
import CurvedBackground from "@app/components/CurvedBackground";

export default function LoadingView() {
  return (
    <Center w={Dimensions.get('screen').width} h={Dimensions.get('screen').height}>
      <HStack space={2} justifyContent="center">
        <Spinner size="lg" />
        <Heading color="primary.600" fontSize="2xl" letterSpacing={4}>Loading...</Heading>
      </HStack>
      <CurvedBackground />
    </Center>
  );
}

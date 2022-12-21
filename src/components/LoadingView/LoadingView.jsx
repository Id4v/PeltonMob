import {
  Center, Heading, HStack, Spinner,
} from 'native-base';
import { Dimensions } from 'react-native';

export default function LoadingView() {
  return (
    <Center backgroundColor="dark.100:alpha.30" w={Dimensions.get('screen').width} h={Dimensions.get('screen').height}>
      <HStack space={2} justifyContent="center">
        <Spinner size="lg" />
        <Heading color="primary.600" fontSize="md">Loading...</Heading>
      </HStack>
    </Center>
  );
}

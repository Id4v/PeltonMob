import {
  Center, Heading, HStack, Spinner,
} from 'native-base';
import {Dimensions} from 'react-native';
import CurvedBackground from "@app/components/CurvedBackground";
import {useSelector} from "react-redux";
import {getText} from "@app/components/LoadingView/loaderSlice";

export default function LoadingView() {
  const text = useSelector(getText);


  return (
    <Center w={Dimensions.get('screen').width} h={Dimensions.get('screen').height}>
      <HStack space={2} justifyContent="center">
        <Spinner size="lg" />
        <Heading color="primary.600" fontSize="2xl" letterSpacing={4}>{text}</Heading>
      </HStack>
      <CurvedBackground />
    </Center>
  );
}

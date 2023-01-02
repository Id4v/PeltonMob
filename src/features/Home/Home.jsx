import {
  AspectRatio,
  Box, Center,
  Column, Flex,
  Heading,
  Image,
  Pressable,
  Row, ScrollView,
  Spacer,
  Text,
  View
} from "native-base";
import {useSelector} from "react-redux";
import {getUsername} from "@app/features/Login/userSlice";
import Title from "@app/components/Title/Title";
import {showToast} from "@app/components/Toast";
import Footer from "@app/components/Footer/Footer";
import {Dimensions} from "react-native";

export default function Home({navigation}) {
  const username = useSelector(getUsername)

  function createMatch() {
    navigation.navigate()
  }


  return (
    <View flex={1}>
      <ScrollView
        mx={3}
        maxH={Dimensions.get('screen').height - 70}
        overflow={'hidden'}
        pb={4}
        mb={1}
      >
        <Title>
          <Text my={0} py={0} fontSize={"2xl"}>Salut <Text bold>{username}</Text></Text>
          <Text my={0} py={0} fontSize={"xl"}>Tu tapes qui aujourd'hui ?</Text>
        </Title>
        <Pressable onPress={() => showToast({type: 'warning', title: 'ADADAZD'})} mt={5} mb={15}>
          <Flex flexDirection={"row"}
                alignItems={"center"}
                maxW={"100%"} rounded={"lg"}
                backgroundColor={"white"}
                mt={3}
                overflow={"hidden"}
                h={100}
          >
            <Box backgroundColor={"#191A47"} px={3} flex={1} alignItems={"center"} justifyContent={"center"} h={"100%"}>
              <Text color={"white"} fontSize={"5xl"}>+</Text>
            </Box>
            <Box h={"100%"} flex={1} flexGrow={7} alignContent={"center"} justifyContent={"center"}>
              <Text px={2} fontSize={"28"} color={"#323637"} bold>CRÉE UN MATCH !</Text>
            </Box>
          </Flex>
        </Pressable>
        <Pressable onPress={() => showToast({type: 'warning', title: 'ADADAZD'})}>
          <Box>
            <Row bg={"white"} rounded={"lg"}>
              <Column w={'75%'} p={3}>
                <Box width={"100%"} minH={10}>
                  <Text px={2} fontSize={"3xl"} color={"#323637"} bold>CRÉE UNE LIGUE !</Text>
                  <Text px={2} fontSize={"xl"} color={"#323637"}>Affronte tes potes</Text>
                </Box>
              </Column>
              <AspectRatio
                ratio={2 / 3}
                w={'25%'}
              >
                <Image src={'https://baconmockup.com/200/300/'} alt={"coupe"}></Image>
              </AspectRatio>
            </Row>
          </Box>
        </Pressable>
        <Row mt={5}>
          <Box bg={"white"} rounded={"lg"} p={2} w={'50%'}>
            <Pressable>
              <Heading mb={2}>LANCE UN AMERICANA</Heading>
              <Text>Tout le monde se rencontre</Text>
            </Pressable>
          </Box>
          <Spacer/>
          <Column w={"45%"} justifyContent={'space-between'}>
            <Box>
              <Pressable bg={"pink.600"} w={"100%"} rounded={"lg"} p={2}>
                <Heading color={"white"} size={"md"}>TOURNOI</Heading>
                <Text color={"white"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
              </Pressable>
            </Box>
            <Box>
              <Pressable bg={"pink.600"} w={'100%'} mt={5} rounded={"lg"} p={2}>
                <Heading color={"white"} size={"md"}>MULTILIGUE</Heading>
                <Text color={"white"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
              </Pressable>
            </Box>
          </Column>
        </Row>
      </ScrollView>
      <Footer>
        <Pressable>
          <Center>
            <Heading size={"md"} color={"white"}>REJOINS UNE PARTIE / LIGUE</Heading>
            <Text color={"white"}>Entre ton code</Text>
          </Center>
        </Pressable>
      </Footer>
    </View>
  );
}

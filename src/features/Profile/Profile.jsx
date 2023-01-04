import {
  AspectRatio,
  Avatar,
  Box,
  Column,
  Heading,
  Icon,
  Pressable,
  Row,
  ScrollView,
  Skeleton,
  Spacer,
  Text,
  View
} from "native-base";
import Title from "@app/components/Title";
import {Dimensions} from "react-native";
import Footer from "@app/components/Footer/Footer";
import {SimpleLineIcons} from "@expo/vector-icons";
import UserProfileInfos from "@app/components/UserProfileInfos";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {fetchProfile} from "@app/features/Login/userSlice";

export default function Profile({navigation}) {

  const [profile, setProfile] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  function onScreenFocused() {
    dispatch(fetchProfile())
      .then(
        (action) => {
          setLoaded(action.payload !== undefined);
          setProfile(action.payload);
        }
      )
      .catch(
        (error) => {
          setLoaded(false);
        }
      )
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      onScreenFocused,
    );

    return unsubscribe;
  }, [navigation]);

  return (
    <View flex={1}>
      <ScrollView
        mx={3}
        maxH={Dimensions.get('screen').height - 70}
        overflow={'hidden'}
        pb={4}
        mb={1}
      >
        <Column space={3}>
          <Title>
            <Text my={0} py={0} fontSize={"2xl"}>Ton meilleur <Text bold>profil</Text></Text>
          </Title>
          <UserProfileInfos user={profile}/>

          <Box rounded={'lg'} bg={"white"} p={3}>
            <Column>
              <Skeleton.Text lines={3} isLoaded={isLoaded}>
                <Text><Text bold>Niveau :</Text> Niv</Text>
                <Text><Text bold>N° Licence :</Text> Lic</Text>
                <Text><Text bold>Club :</Text> Cl</Text>
              </Skeleton.Text>
            </Column>
          </Box>

          <Text>Tu ne connais pas ton niveau, jette un oeil <Text bold>ICI</Text></Text>

          <Box rounded={'lg'} bg={"white"} p={3}>
            <Row space={2}>
              <Column w={'70%'} space={2}>
                <Skeleton isLoaded={isLoaded}/>
                <Skeleton.Text lines={1} isLoaded={isLoaded}>
                  <Text>Pratique</Text>
                </Skeleton.Text>
                <Spacer/>

                <Skeleton isLoaded={isLoaded}/>
                <Skeleton.Text lines={1} isLoaded={isLoaded}>
                  <Text>Pratique</Text>
                </Skeleton.Text>
                <Spacer/>

                <Skeleton isLoaded={isLoaded}/>
                <Skeleton.Text lines={1} isLoaded={isLoaded}>
                  <Text>Pratique</Text>
                </Skeleton.Text>
              </Column>
              <Column w={'25%'}>
                <Spacer/>
                <AspectRatio ratio={1} ml={3}>
                  <Avatar size={"lg"}/>
                </AspectRatio>
                <Spacer/>
              </Column>
            </Row>
          </Box>
        </Column>
      </ScrollView>
      <Footer>
        <Pressable mx={2}>
          <Row>
            <Column>
              <Heading size={"md"} color={"white"}>T'AS PAS D'AMI ?</Heading>
              <Text color={"white"}>Invite les à télécharger l'appli</Text>
            </Column>
            <Spacer/>
            <Column>
              <Icon color={"white"} size={'4xl'} as={<SimpleLineIcons name={"share-alt"}/>} mr={5}/>
            </Column>
          </Row>
        </Pressable>
      </Footer>
    </View>
  );
}
import {Center, Heading, Text} from "native-base";
import {useSelector, useStore} from "react-redux";
import {getUsername} from "@app/features/Login/userSlice";

export default function Home() {
  const username = useSelector(getUsername)

  return (
    <Center flex={1} alignContent={"center"} justifyContent={"center"}>
      <Heading size={"3xl"}>Salut <Text bold={true}>{username}</Text></Heading>
    </Center>
  );
}

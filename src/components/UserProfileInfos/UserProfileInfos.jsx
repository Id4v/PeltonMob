import {Avatar, Box, Column, Row, Skeleton, Spacer, Text} from "native-base";
import {useEffect, useState} from "react";

export default function UserProfileInfos(props) {

  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoaded(props.user !== null && props.user !== undefined);
    setUser(props.user);
  },[props.user]);

  return (
    <Box rounded={'lg'} bg={'white'} p={3}>
      <Row>
        <Avatar size={"xl"} bg={'indigo.50'}/>
        <Spacer/>
        <Column space={2} mr={4} minW={'50%'}>
          <Skeleton.Text lines={4} isLoaded={isLoaded}>
            {
              isLoaded ?
                (
                  <>
                    <Text bold={1}>{user.username}</Text>
                    <Text>{user.firstname} {user.lastname}</Text>
                    <Text>{user.email}</Text>
                    <Text>{user.phone}</Text>
                  </>
              )
              :
              (null)
            }
          </Skeleton.Text>
        </Column>
      </Row>
    </Box>
  );
}
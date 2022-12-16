import {Box, Button, Center, FormControl, Heading, HStack, Icon, Input, VStack} from "native-base";
import {useState} from "react";
import Password from "components/Password";
import {MaterialIcons} from "@expo/vector-icons";

export default () => {

    let isInvalid = false;
    const [name, setName] = useState();
    const [firstname, setFirstName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleRegister = () => {

    }

    return (
        <Center flex={1} backgroundColor={"white"}>
            <VStack w={"100%"} alignItems={"center"} justifyItems={"center"} space={5} px={4}>
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
                        placeholder={"Username"}
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        value={username}
                        onChangeText={setUsername}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                        p={2}
                        placeholder={"Email"}
                        keyboardType={"email-address"}
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Password
                        p={2}
                        placeholder={"Password"}
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        value={password}
                        onChangeText={setPassword}
                    />
                </FormControl>
                <Button
                    startIcon={<Icon as={MaterialIcons} name="person-add" size={"sm"} />}
                    onPress={handleRegister}
                >
                    S'inscrire
                </Button>
            </VStack>
        </Center>
    );
}
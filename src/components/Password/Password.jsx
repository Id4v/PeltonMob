import { Icon, Input, Pressable } from 'native-base';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function Password(props) {
  const [show, setShow] = useState(false);

  function PasswordToggle() {
    return (
      <Pressable onPress={() => setShow(!show)}>
        <Icon
          as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
          size={5}
          mr={2}
          color="muted.400"
        />
      </Pressable>
    );
  }

  const localProps = {
    ...props,
    ...{
      InputRightElement: <PasswordToggle />,
      type: show ? 'text' : 'password',
    },
  };

  return <Input {...localProps} />;
}

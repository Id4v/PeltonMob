import {Alert, CloseIcon, HStack, IconButton, Text, Toast, useToast, VStack} from "native-base";

export function showToast({ type, title, message, placement }) {
  const item = {
    title,
    description: message,
    isClosable: true,
    variant: "left-accent",
    status: type
  }

  if (placement === undefined) {
    placement = "top";
  }
  
  const ToastAlert = ({
                        id,
                        status,
                        variant,
                        title,
                        description,
                        isClosable,
                        ...rest
                      }) =>
    <Alert
      maxWidth="100%"
      alignSelf="center"
      flexDirection="row"
      status={status ? status : "info"}
      variant={variant}
      {...rest}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon/>
            <Text fontSize="md" fontWeight="medium" flexShrink={1}
                  color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
              {title}
            </Text>
          </HStack>
          {isClosable ? <IconButton variant="unstyled" icon={<CloseIcon size="3"/>} _icon={{
            color: variant === "solid" ? "lightText" : "darkText"
          }} onPress={() => Toast.close(id)}/> : null}
        </HStack>
        <Text px="6" color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
          {description}
        </Text>
      </VStack>
    </Alert>;

  Toast.show({
    placement,
    render: ({id}) => {
      return <ToastAlert id={id} {...item} />;
    }
  });
}
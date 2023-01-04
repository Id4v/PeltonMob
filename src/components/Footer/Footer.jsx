import {Dimensions} from "react-native";
import {Box, Center, Heading, Pressable, Text} from "native-base";

export default function Footer({children, ...props}) {
  const defaultProps = {
    w:Dimensions.get('screen').width,
    bg:"darkBlue.800",
    h:"65",
    m:0,
    py:2,
  }

  const mergedProps = {
    ...defaultProps,
    ...props,
  };


  return (
    <Box {...mergedProps}>
      {children}
    </Box>
  );
}
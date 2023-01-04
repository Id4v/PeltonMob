import {Dimensions} from "react-native";
import {Box} from "native-base";

export default function Footer({children, ...props}) {
  const defaultProps = {
    w:Dimensions.get('screen').width,
    bg:"darkBlue.800",
    h:"65",
    m:0,
    py:2,
    px: 3
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
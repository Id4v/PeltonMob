import {Text, VStack} from "native-base";
import HorizontalLine from "@app/components/HorizontalLine";

export default function Title({children, line = { width: '33%', mt:2}, ...props}) {

  const mergedProps = {
    ...props,
    ...line,
  }

  return (
    <VStack>
      {children}
      <HorizontalLine {...mergedProps} />
    </VStack>
  );
}
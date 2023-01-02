import {View} from "native-base";

export default function HorizontalLine({color='#000', size=2, width='100%', ...props}) {
  return (
    <View borderBottomColor={color} borderBottomWidth={size} w={width} { ...props }/>
  )
}
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'native-base';
import { Dimensions } from 'react-native';

export default function CurvedBackground() {
  const theme = useTheme();

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      height="90"
      width={Dimensions.get('screen').width}
      style={{
        position: 'absolute',
        bottom: -5,
        padding: 0,
        margin: 0,
      }}
    >
      <Path
        fill={theme.colors.primary['600']}
        fill-opacity="1"
        d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,154.7C672,149,768,171,864,165.3C960,160,1056,128,1152,106.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </Svg>
  );
}

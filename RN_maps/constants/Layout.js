import { Dimensions, Platform } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const window = {
  width,
  height,
};
export const isSmallDevice = width < 375;
export const isAndroid = Platform.OS === 'android';
export const size = {

  s1: 32,
  s2: 24,
  s3: 18,
  s4: 16,
  s5: 14,
  s6: 12
};

import { NativeModules } from 'react-native';

type NearbyMessagesType = {
  multiply(a: number, b: number): Promise<number>;
};

const { NearbyMessages } = NativeModules;

export default NearbyMessages as NearbyMessagesType;

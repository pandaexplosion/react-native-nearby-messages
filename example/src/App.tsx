import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {
  checkBluetoothPermission,
  useNearbyErrorCallback,
  connect,
  disconnect,
  publish,
  subscribe,
  checkBluetoothAvailability,
} from 'react-native-nearby-messages';
import { useCallback, useEffect, useState } from 'react';

const API_KEY = 'AIzaSyDcwKl_kx1drZHLW0lu7IqcGMPV3RSeyZw';

export default function App() {
  const [nearbyMessage, setNearbyMessage] = useState<string | undefined>('');
  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      if (
        granted['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the app');
      } else {
        console.log('Permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  useNearbyErrorCallback(
    useCallback((kind, message) => {
      Alert.alert(kind, message);
    }, [])
  );

  const _connect = useCallback(async () => {
    console.log('Connecting...');
    await connect({
      apiKey: API_KEY,
    });
    console.log('Connected!');
    return () => disconnect();
  }, []);
  const _publish = useCallback(async () => {
    const deviceName = 'roxxors';
    console.log(`Publishing "${deviceName}"...`);
    await publish(deviceName);
    console.log(`Published "${deviceName}"!`);
  }, []);

  const _subscribe = useCallback(async () => {
    console.log('Subscribing...');
    await subscribe(
      (m) => {
        setNearbyMessage(m);
        console.log(`Found: ${JSON.stringify(m)}`);
      },
      (m) => {
        setNearbyMessage('');
        console.log(`Lost: ${JSON.stringify(m)}`);
      }
    );
    console.log('Subscribed!');
  }, []);
  const _checkPermissions = useCallback(async () => {
    const permission = await checkBluetoothPermission();
    const available = await checkBluetoothAvailability();
    Alert.alert(
      'Bluetooth Permissions:',
      `Granted: ${permission}, Available: ${available}`
    );
  }, []);

  useEffect(() => {
    const start = async () => {
      try {
        await requestPermissions();
        await _checkPermissions();
        await _connect();
        await _subscribe();
        await _publish();
      } catch (e) {
        Alert.alert(
          'Unknown error occurred while connecting!',
          JSON.stringify(e.message ?? e)
        );
      }
    };

    start();
    return () => disconnect();
  }, [_connect, _subscribe, _publish, _checkPermissions]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>☆GoogleNearbyMessages example☆</Text>
      <Text style={styles.welcome}>Nearby Message:</Text>
      <Text style={styles.instructions}>{nearbyMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

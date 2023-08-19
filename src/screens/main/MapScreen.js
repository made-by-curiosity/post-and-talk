import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const defaultLat = 32.67607814339923;
const defaultLon = -117.15783643799291;

export const MapScreen = ({ route }) => {
  const { coords, location } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: coords ? coords?.latitude : defaultLat,
          longitude: coords ? coords?.longitude : defaultLon,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        <Marker
          coordinate={{
            latitude: coords ? coords?.latitude : defaultLat,
            longitude: coords ? coords?.longitude : defaultLon,
          }}
          title={location}
        />
      </MapView>
    </View>
  );
};

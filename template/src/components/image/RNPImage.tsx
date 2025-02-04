import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native-paper';

export default function RNPImage(props: FastImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={styles.container}>
      <FastImage
        {...props}
        source={error ? require('../../assets/images/error.png') : props.source}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
      {loading && (
        <View style={[props.style, styles.loaderContainer]}>
          <ActivityIndicator animating={loading} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

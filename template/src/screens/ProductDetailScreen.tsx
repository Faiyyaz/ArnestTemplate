import React, {useLayoutEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {fetchProduct} from '../viewmodels/ProductViewModel';
import {useFetch} from '../hooks/useFetch';
import {wp} from '../utils/responsive';
import {useNavigation} from '@react-navigation/native';
import RNPCustomView from '../components/common/RNPCustomView';
import RNPImage from '../components/image/RNPImage';
import RNPText from '../components/text/RNPText';
import appStyles from '../styles/styles';

export default function ProductDetailScreen(props: any) {
  const params = props.route.params;
  const {id, name} = params;
  const navigation: any = useNavigation();

  const {
    data: product,
    loading,
    error,
    refetch,
  } = useFetch(() => fetchProduct(id));

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation, name]);

  return (
    <RNPCustomView onRetry={refetch} isLoading={loading} error={error}>
      <RNPImage style={styles.productImage} source={{uri: product?.image}} />
      <View
        style={[
          appStyles.paddingLeft16,
          appStyles.paddingRight16,
          appStyles.paddingTop16,
          appStyles.paddingBottom16,
        ]}>
        <RNPText variant="titleLarge">{product?.title}</RNPText>
        <RNPText style={appStyles.paddingTop16} variant="bodyMedium">
          {product?.description}
        </RNPText>
      </View>
    </RNPCustomView>
  );
}

const styles = StyleSheet.create({
  productImage: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').width / 16) * 9,
    borderRadius: wp(8),
  },
});

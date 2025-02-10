import React from 'react';
import {StyleSheet} from 'react-native';
import {fetchProducts} from '../viewmodels/ProductViewModel';
import {useFetch} from '../hooks/useFetch';
import RNPFlatList from '../components/list/RNPFlatlist';
import RNPImage from '../components/image/RNPImage';
import appStyles from '../styles/styles';
import {wp} from '../utils/responsive';
import {List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function ProductScreen() {
  const {data: products, loading, error} = useFetch(() => fetchProducts());
  const navigation: any = useNavigation();

  const renderLeftIcon = (imageUri: string) => (
    <RNPImage style={styles.productImage} source={{uri: imageUri}} />
  );

  return (
    <RNPFlatList
      contentContainerStyle={[
        appStyles.flexGrow1,
        appStyles.paddingLeft16,
        appStyles.paddingRight16,
      ]}
      renderItem={({item}) => {
        return (
          <List.Item
            onPress={() => {
              navigation.push('ProductDetailScreen', {
                id: item.id,
                name: item.title,
              });
            }}
            left={() => renderLeftIcon(item.image)}
            title={item.title}
            description={item.description}
          />
        );
      }}
      data={products}
      isLoading={loading}
      error={error}
    />
  );
}

const styles = StyleSheet.create({
  productImage: {
    width: wp(60),
    height: wp(60),
    borderRadius: wp(8),
  },
});

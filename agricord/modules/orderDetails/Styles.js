import {StyleSheet} from 'react-native';
import {BasicStyles, Color} from 'common';

const styles = StyleSheet.create({
  BackgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    elevation: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Color.containerBackground
  },
  OrderDetailsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  Details: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#F3F3F3',
    borderBottomWidth: 0.5,
  },
  DetailsTitleContainer: {
    width: '50%',
  },
  DetailsTitleTextStyle: {
    fontSize: BasicStyles.titleText.fontSize,
    color: '#969696',
  },
  DetailsTextStyle: {
    fontSize: BasicStyles.normalText.fontSize,
    color: '#969696',
  },
  DetailsTextContainer: {
    width: '50%',
  },
  ProductContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  ProductDetailsContainer: {
    width: '60%',
  },
  ProductNameTextStyle: {
    fontWeight: 'bold',
    fontSize: BasicStyles.titleText.fontSize,
  },
  ProductDataContainer: {
    flexDirection: 'row',
  },
  ProductManufacturerTextStyle: {
    fontSize: BasicStyles.normalText.fontSize,
  },
  ProductQuantityTextStyle: {
    fontSize: BasicStyles.normalText.fontSize,
  },
  ProductNumberOfItemsContainer: {
    width: '40%',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  ProductNumberOfItemsTextStyle: {
    color: '#FFFFFF',
    fontSize: BasicStyles.titleText.fontSize,
    fontWeight: 'bold',
  },
});

export default styles;

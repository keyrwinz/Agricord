import {Color} from 'common';
import {Dimensions, StyleSheet} from 'react-native';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Color.gray,
  },
  MainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: Color.white,
  },
  sliderContainer: {
    flex: 1,
    minHeight: height,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#F1F1F1',
  },
  ScrollView: {
    flex: 1,
  },
  circleButton: {
    padding: 5,
    height: 75,
    width: 75,
    borderRadius: 400,
    backgroundColor: '#FF5B04',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 80,
    padding: 50,
    borderRadius: 5,
    resizeMode: 'contain',
  },
});

export default styles;

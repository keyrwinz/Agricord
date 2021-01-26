import { Color, BasicStyles } from 'common';
import { Dimensions } from 'react-native';
import { Row } from 'native-base';
const width = Math.round(Dimensions.get('window').width);
export default {
  container: {
    marginTop: 25,
    minHeight: 50,
    width: '100%',
    marginVertical: 10,
    // box-shadow
    backgroundColor: Color.white,
    borderRadius: 12,
    borderColor: '#FFFFFF',
    borderWidth:1,
    ...BasicStyles.standardShadow,
    flexDirection:'row'
  },
  text: {
    width: '100%',
    textAlign: 'justify',
    fontSize: BasicStyles.standardSubTitleFontSize
  }
}
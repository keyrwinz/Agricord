import {Color, BasicStyles} from 'common';
import {Dimensions} from 'react-native';
export default{
  cardWithShadow:{
    minHeight: 10,
    width: '100%',
    // marginVertical: 10,
    // box-shadow
    backgroundColor: Color.white,
    borderRadius: 8,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    ...BasicStyles.standardShadow,
    // alignItems: 'center',
    // flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 1,
  }
}
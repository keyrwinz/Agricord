import { Color } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
export default {
  modal: {
    backgroundColor: Color.gray
  },
  MainContainer: {
    flex: 1,
    backgroundColor: Color.containerBackground
  },
  sliderContainer: {
    flex: 1,
    minHeight: '100%',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  ScrollView: {
    flex: 1
  },
  circleButton:{
    padding: 5,
    height: 75,
    width: 75,  
    borderRadius:400, 
    backgroundColor:'#FF5B04',
    justifyContent:'center',
},
image:{   
  width: '100%',
  height: 80,
  padding: 50,
  borderRadius: 5,
  resizeMode:'contain'
 },
}
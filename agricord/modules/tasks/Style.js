import { Color } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
export default {
  modal: {
    backgroundColor: Color.gray
  },
  MainContainer: {
    flex: 1
  },
  BackgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    elevation: 2,
    backgroundColor: Color.containerBackground
  },
  sliderContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F1F1F1'
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
  padding:50,
  borderRadius:5,
  resizeMode:'contain'
 },
headerContainer:{
  backgroundColor:Color.white,minHeight:55,  shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2
}
}
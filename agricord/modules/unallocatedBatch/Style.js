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
    minHeight: height,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  searchIcon: {
    position: 'absolute',
    right: '5%',
    top: 4.5
  },
  searchbar: {
    width: '90%',
    marginLeft: '5%',
    paddingLeft: 15,
    height: 35,
    borderRadius: 12,
    borderColor: Color.gray,
    borderWidth: 1,
    backgroundColor: Color.white, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 9
    // textAlign: 'center'
  },
  searchbarContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 60,
    // marginTop: 5,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 0
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
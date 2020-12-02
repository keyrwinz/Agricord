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
    backgroundColor: Color.white
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
  circleButton: {
    padding: 5,
    height: 75,
    width: 75,  
    borderRadius:400, 
    backgroundColor:'#FF5B04',
    justifyContent:'center',
  },
  image: {   
    width: '100%',
    height: 80,
    padding: 50,
    borderRadius:5,
    resizeMode:'contain'
  },
  searchbarContainer: {
    position: 'relative',
    backgroundColor: Color.white,
    width: '100%',
    height: 60,
    paddingTop: 0,
    marginTop: -10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.gray,
  },
  searchbar: {
    // backgroundColor: 'red',
    width: '70%',
    marginLeft: 30,
    paddingLeft: 15,
    height: 35,
    borderRadius: 12,
    borderColor: Color.gray,
    borderWidth: 1,
  },
  searchIcon: {
    position: 'absolute',
    right: '22%',
    top: 4.5
  },
  nfcIcon: {
    position: 'absolute',
    right: 25
  }
}
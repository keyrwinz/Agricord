import { Color } from 'common';
import { Dimensions } from 'react-native';
import { Row } from 'native-base';
const width = Math.round(Dimensions.get('window').width);
export default {
  container: {
    minHeight:100,
    width: '80%',
    marginVertical: 10,
    // box-shadow
    backgroundColor: Color.white,
    borderRadius: 12,
    borderColor: '#FFFFFF',
    borderWidth:1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
    flexDirection:'row'
  
  },
  imageContainer:{
    marginTop:-10,
    width:'50%',
    borderRadius:10,
    marginBottom:5,
    alignItems:'center',
},
image:{   
 width: '100%',
 height: 100,
 padding:100,
 borderRadius:5,
 resizeMode:'contain'
},
textContainer:{
  width:'80%',
  flexShrink:1,
  marginBottom:15,
},
text:{
 fontFamily:'Roboto',
 textAlign:'center',
 fontWeight:"bold",
 fontSize:18,
},
cardInfo:{
  flexDirection:'row',
  margin:15,
},
paddockContainer: {
  minHeight:60,
  width: '90%',
  marginVertical: 10,
  // box-shadow
  backgroundColor: Color.white,
  borderRadius: 12,
  borderColor: '#FFFFFF',
  borderWidth:1,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 2,
  alignItems:'center',
  flexDirection:'row',
},

paddockInfo:{
  marginLeft:20,
  flexDirection:'column',
  width:'60%',
},

paddockDate:{
  width:'30%',
  minHeight:40,
  marginRight:5,
  borderRadius:12,
  backgroundColor:Color.white,
  borderColor:'#C0C0C0',
  borderWidth:1.5,
  justifyContent:'center',
  alignItems:'center',
},
}
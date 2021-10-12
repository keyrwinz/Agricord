import { Color, BasicStyles } from 'common';
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
    ...BasicStyles.standardShadow,
    alignItems:'center',
  },
  imageContainer:{
    marginTop:-10,
    width:'50%',
    borderRadius: BasicStyles.standardBorderRadius,
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
    minHeight: 60,
    width: '100%',
    marginVertical: 10,
    backgroundColor: Color.white,
    borderRadius: BasicStyles.standardBorderRadius,
    borderColor: '#FFFFFF',
    borderWidth:1,
    ...BasicStyles.standardShadow,
    alignItems:'center',
    flexDirection:'row',
    borderBottomColor: Color.primary,
    borderBottomWidth: 10
  },

  paddockInfo:{
    marginLeft:20,
    flexDirection:'column',
    width:'60%',
  },

  paddockDate:{
    width: '30%',
    minHeight: 40,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: Color.white,
    borderColor: Color.lightGray,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    elevation: 2,
    backgroundColor: Color.containerBackground
  },
}
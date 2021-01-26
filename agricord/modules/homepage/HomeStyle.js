import { Color } from 'common';
import { Dimensions } from 'react-native';
// const width = Math.round(Dimensions.get('window').width);
// const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width)

export default {
  ScrollView: {
    flex: 1,
    
  },
  MainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
    paddingBottom: 30,
    width: '100%',
    backgroundImage: 'assets/homescreen/background.svg'
  },
  flexRow: {
    flexDirection: 'row',
  },
  background: {
    position: 'absolute',
    maxHeight: 200,
    width: '100%',
    objectFit: 'cover',
  },
  backgroundImage: {  
    width: width,
    height: '100%',
    objectFit: 'cover',
    backgroundSize: 'cover'  
  },
  textWhite: { color: Color.white },
  textBlack: { color: Color.black },
  imageContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 0,
    paddingVertical: 15
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20 
  },
  username: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  graphContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginVertical: 10
  },
  graphTextContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  graphTextBold: {
    fontWeight: 'bold',
    fontSize: 40
  },
  graphText: {

  },
  overviewChart: {
    position: 'relative',
    width: '100%',
    backgroundColor: Color.white,
    marginTop: 15,
    padding: 10,
    borderRadius: 12,
  },
  chartDetails: {
    padding: 10,
    justifyContent: 'space-evenly',
    width: '50%',
    borderBottomWidth: 2,
    borderBottomColor: Color.lightGray
  },
  graphLabel: {
    alignItems: 'center'
  },

  // IN FOCUS
  InFocusContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: Color.white,
    marginTop: 15,
    padding: 10,
    paddingBottom: 0,
    borderRadius: 12,
  },
  focusTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20
  },
  focusTaskDetails: {
    width: '60%'
  },
  taskPayloadText: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  chevronDown: {
    marginTop: 10,
    size: 45,
    alignSelf: 'center',
  },

  // RECENT EVENTS
  RecentEventsContainer: {
    position: 'relative',
    backgroundColor: Color.white,
    marginTop: 15,
    padding: 10,
    paddingBottom: 20,
    borderRadius: 12,
  },
  eventDetailsContainer: {
    flex: 1,
    marginLeft: 50,
    marginRight: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray
  },
  eventText: {
    marginLeft: 7,
    color: Color.gray,
  },
  overFlowText: {
    width: 20
  },

  eventPayloadText: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: 16,
  },
  eventIcon: {
    position: 'absolute',
    top: 12
  }
}

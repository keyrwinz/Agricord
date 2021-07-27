import {Color, BasicStyles} from 'common';
import {Dimensions} from 'react-native';
import {Row} from 'native-base';
const width = Math.round(Dimensions.get('window').width);
export default {
  container: {
    minHeight: 100,
    width: '100%',
    marginVertical: 10,
    // box-shadow
    backgroundColor: Color.white,
    borderRadius: BasicStyles.standardBorderRadius,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    ...BasicStyles.standardShadow,
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: -10,
    width: '50%',
    borderRadius: BasicStyles.standardBorderRadius,
    marginBottom: 5,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    padding: 100,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  textContainer: {
    width: '80%',
    flexShrink: 1,
    marginBottom: 15,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  labelTitle: {
    fontWeight: 'bold',
    color: '#969696',
    width: '50%',
    fontSize: BasicStyles.standardFontSize,
  },
  label: {
    fontSize: BasicStyles.standardFontSize,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  paddockContainer: {
    minHeight: 60,
    width: '100%',
    marginVertical: 10,
    // box-shadow
    backgroundColor: Color.white,
    borderRadius: BasicStyles.standardBorderRadius,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    ...BasicStyles.standardShadow,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },

  paddockInfo: {
    flexDirection: 'column',
    width: '60%',
  },

  paddockDate: {
    width: '30%',
    minHeight: 40,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: Color.white,
    borderColor: Color.gray,
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
    backgroundColor: Color.containerBackground,
  },
  focusTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 15,
    paddingHorizontal: 5,
  },
  eventText: {
    marginLeft: 7,
    color: Color.gray,
  },
  overFlowText: {
    width: 100,
  },
  focusTaskDetails: {
    width: '50%'
  },
  flexRow: {
    flexDirection: 'row',
  },
  taskPayloadText: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
};

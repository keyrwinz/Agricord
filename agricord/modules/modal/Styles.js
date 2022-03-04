import { Color, BasicStyles } from 'common';
import { Dimensions, Platform } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
export default {
  IconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 100
  },
  ModalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  ContentContainer: {
    flex: 1,
    backgroundColor: Color.white,
    elevation: 10,
    borderRadius: BasicStyles.standardBorderRadius,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  TitleContainer: {
    width: '100%',
    position: 'relative',
    zIndex: 50
  },
  TitleTextStyle: {
    fontSize: BasicStyles.standardHeaderFontSize,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },
  DetailsContainer: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    paddingTop: 20,
  },
  DetailContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  DetailTitleContainer: {
    width: '50%',
    paddingTop: 20,
  },
  DetailTitleTextStyle: {
    fontSize: BasicStyles.standardFontSize,
    color: '#969696',
  },
  DetailDetailContainer: {
    paddingTop: 20,
    width: '50%',
  },
  DetailDetailTextStyle: {
    fontSize: BasicStyles.standardFontSize,
  },
  AddToBatchContainer: {
    paddingHorizontal: '12%',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  AddToBatchTextStyle: {fontSize: 14},
  SwipeTextContainer: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingHorizontal: '12%',
  },
  SwipeTextStyle: {
    fontSize: BasicStyles.standardFontSize,
    color: '#D5D5D5',
  },
  action: {
    width: '100%',
    borderTopColor: Color.gray,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    height: height - 100,
    width: width - 40,
    borderRadius: 10,
    backgroundColor: Color.white
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    width: '100%',
    borderBottomColor: Color.gray,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
}
import { Color, BasicStyles } from 'common';
import { Dimensions } from 'react-native';
const width = Math.round(Dimensions.get('window').width);

export default {
  MainContainer: {
    flex: 1,
  },
  ScrollView: {
    flex: 1
  },
  textStyle: {
    fontSize: 9
  },
  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: '10%'
  },
  mixCardContainer: {
    width: '100%',
    backgroundColor: 'red',
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: Color.white,
    borderRadius: BasicStyles.standardBorderRadius,
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
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 17
  },
  mixTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: BasicStyles.standardBorderRadius,
    borderTopRightRadius: BasicStyles.standardBorderRadius,
    paddingHorizontal: 20,
    minHeight: 50
  },
  mixDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: BasicStyles.standardBorderRadius,
    borderBottomRightRadius: BasicStyles.standardBorderRadius,
    height: '70%',
    padding: 20,
  },
  mixLeftDetail: {
    width: '50%',
    height: '120%',
    marginTop: -15
  },
  mixRightDetail: {
    width: '50%'
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50%',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
  },
  remainingBox: {
    alignItems: 'center',
    paddingVertical: 5,
    margin: 7,
    borderWidth: 0.5,
    borderColor: '#CDCDCD',
    borderRadius: 6
  },

  checkBar: {
    marginTop: 40,
    height: 50,
    width,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderColor: 'rgba(255, 255, 255, 0.65)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  checkBox: {
    width: '20%',
    backgroundColor: '#5A84EE',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },


  appliedRate: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderBottomColor: '#F3F3F3',
    paddingBottom: 10
  },
  totalAreaBox: {
    borderWidth: 1,
    borderColor: '#5A84EE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  appliedPaddock: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7AA0FF',
    backgroundColor: '#E1EAFF',
    padding: 3,
    marginVertical: 2
  },
  appliedPaddockText: {
    color: '#094EFF',
    marginRight: 2
  }
}
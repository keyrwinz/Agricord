import {StyleSheet} from 'react-native';
import {BasicStyles} from 'common';
const styles = StyleSheet.create({
  AppSettings: {
    backgroundColor: '#F1F1F1',
    height: '100%',
    alignItems: 'center',
  },
  SettingContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '3%',
  },
  AppSettingsContainer: {
    marginVertical: 10,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  AppSettingsTitleContainer: {
    marginTop: 15,
    paddingLeft: '10%',
    alignSelf: 'flex-start',
  },
  AppSettingsTitleTextStyle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  AppSettingTileContainer: {
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    width: '95%',
    height: 75,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: '4%',
  },
  AppSettingTileContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  AppSettingTileIconContainer: {
    paddingRight: '10%',
  },
  AppSettingTileIconStyle: {
    // height: 50,
    // width: 50,
  },
  AppSettingTileTextContainer: {
    justifyContent: 'flex-start',
    width: '70%',
  },
  AppSettingTileTitleTextStyle: {
    fontWeight: 'bold',
    fontSize: BasicStyles.titleText.fontSize,
  },
  AppSettingTileDescriptionTextStyle: {
    fontSize: BasicStyles.normalText.fontSize,
    color: '#C6C6C6',
  },
  AppSettingTileContainerRight: {
    width: '20%',
  },
});

export default styles;

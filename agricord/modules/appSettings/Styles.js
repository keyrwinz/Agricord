import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  AppSettings: {
    backgroundColor: '#F1F1F1',
    height: '100%',
    alignItems: 'center',
  },
  SettingContainer: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  AppSettingsContainer: {
    marginVertical: 15,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  AppSettingTileContainer: {
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    width: '90%',
    height: 75,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  AppSettingTileContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 14,
  },
  AppSettingTileDescriptionTextStyle: {
    fontSize: 12,
  },
  AppSettingTileContainerRight: {
    paddingLeft: '10%',
  },
});

export default styles;

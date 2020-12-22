import {StyleSheet} from 'react-native';
import {BasicStyles} from 'common';

const styles = StyleSheet.create({
  PickerContainer: {
    marginTop: 20,
    width: '90%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5A84EE',
  },
  ButtonContainer: {
    height: '100%',
    width: 35,
    borderRadius: 10.5,
    backgroundColor: '#5A84EE',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
    borderWidth: 0,
    borderColor: '#5A84EE',
    padding: 0,
  },
  OptionsContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '10%',
    justifyContent: 'flex-end',
    height: 170,
    width: '90%',
    borderColor: '#AEAEAE',
    borderWidth: 0.5,
    backgroundColor: 'white',
    paddingLeft: 20,
    elevation: 2,
    marginTop: 60,
    overflow: 'scroll',
  },
  OptionContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  OptionIconContainer: {},
  OptionTextContainer: {
    paddingLeft: 15,
    justifyContent: 'center',
    borderRadius: 6,
  },
  OptionTextStyle: {
    fontSize: BasicStyles.normalText.fontSize,
  },
  titleText: {
    fontSize: 17,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#ffffff',
  },
  ApplyTaskContainer: {
    backgroundColor: '#F1F1F1',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 50
  },
  SliderIconContainer: {
    backgroundColor: '#5A84EE',
    borderRadius: 12,
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SliderIconTextStyle: {
    fontSize: BasicStyles.titleText.fontSize,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  RecentTasksContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    marginTop: 10,
  },
  RecentTasksTitleContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },
  RecentTasksTitleTextStyle: {
    fontWeight: 'bold',
    fontSize: BasicStyles.titleText.fontSize,
  },
  Task: {
    height: 35,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5A84EE',
    borderRadius: 12,
    marginHorizontal: 7,
  },
  TaskTextStyle: {
    fontSize: BasicStyles.normalText.fontSize,
  },
  TaskContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    height: 300,
    width: '85%',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    zIndex: 0,
  },
  TitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#5A84EE',
    borderBottomWidth: 4,
    width: '100%',
    height: 55,
  },
  TitleIconContainer: {
    paddingLeft: 15,
  },
  TitleIconStyle: {},
  TitleTextContainer: {
    paddingLeft: 10,
  },
  TitleTextStyle: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  ChildrenContainer: {
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    zIndex: 0,
  },
});

export default styles;

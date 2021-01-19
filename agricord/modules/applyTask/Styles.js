import {StyleSheet} from 'react-native';
import {BasicStyles, Color} from 'common';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Color.containerBackground
  },
  PickerContainer: {
    marginTop: 20,
    width: '90%',
    borderWidth: 1,
    borderColor: '#5A84EE',
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  ButtonContainer: {
    height: '100%',
    width: 45,
    borderRadius: 6,
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
    marginTop: 4,
    justifyContent: 'flex-end',
    height: 170,
    overflow: 'scroll',
    width: '90%',
    borderColor: '#AEAEAE',
    borderWidth: 0.5,
    backgroundColor: 'white',
    paddingLeft: 20,
    elevation: 2,
    borderRadius: 5,
    // position: 'absolute'
  },
  OptionContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  OptionIconContainer: {},
  OptionTextContainer: {
    paddingLeft: 15,
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
    marginBottom: 100,
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
    height: 33,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5A84EE',
    borderRadius: 12,
    margin: 1
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
  SelectContainer: {
    zIndex: 0,
    top: 30,
    width: '85%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 35,
    paddingBottom: 25
  },
  TitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#5A84EE',
    borderBottomWidth: 4,
    width: '100%',
    height: 55
  },
  SelectTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#5A84EE',
    borderBottomWidth: 4,
    width: '100%',
    height: 55
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
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    zIndex: 5,
    position: 'relative'
  },
});

export default styles;

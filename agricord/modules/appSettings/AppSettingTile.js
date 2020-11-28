import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Switch from 'components/Toggle/Switch.js';
import CustomSwitch from 'components/Toggle/CustomSwitch.js';
class AppSettingTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
    };
  }

  onToggle = () => {
    this.setState({isEnabled: !this.state.isEnabled});
  };

  render() {
    const isEnabled = this.state.isEnabled;
    return (
      <View style={styles.AppSettingTileContainer}>
        <View style={styles.AppSettingTileContainerLeft}>
          <View style={styles.AppSettingTileIconContainer}>
            <Image
              source={this.props.icon}
              style={styles.AppSettingTileIconStyle}
            />
          </View>
          <View style={styles.AppSettingTileTextContainer}>
            <Text style={styles.AppSettingTileTitleTextStyle}>
              {this.props.title}
            </Text>
            {this.props.description && (
              <Text style={styles.AppSettingTileDescriptionTextStyle}>
                {this.props.description}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.AppSettingTileContainerRight}>
          <CustomSwitch
            onToggle={this.onToggle}
            isEnabled={this.state.isEnabled}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default AppSettingTile;

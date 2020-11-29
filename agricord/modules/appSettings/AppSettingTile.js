import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Switch from 'components/Toggle/Switch.js';
import CustomSwitch from 'components/Toggle/Switch.js';
import styles from 'modules/appSettings/Styles.js';

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
          <Switch
            onToggle={this.onToggle}
            isEnabled={this.state.isEnabled}
          />
        </View>
      </View>
    );
  }
}

export default AppSettingTile;

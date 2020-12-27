import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import AppSettingTile from 'modules/appSettings/AppSettingTile';
import {connect} from 'react-redux';
import styles from 'modules/appSettings/Styles.js';
import { BasicStyles } from 'common';

class AppSettings extends Component {
  render() {
    return (
      <View style={{height: '100%', width: '100%'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.AppSettings}>
            <View style={styles.SettingContainer}>
              <View style={styles.AppSettingsTitleContainer}>
                <Text style={styles.AppSettingsTitleTextStyle}>
                  Phone Settings
                </Text>
              </View>
              <View
                style={[
                  styles.AppSettingsContainer,
                  {height: 80, borderRadius: BasicStyles.standardBorderRadius},
                ]}>
                <AppSettingTile
                  title="Dedicated NFC"
                  description="Required for Smart Label use"
                  icon={'wifi'}
                />
              </View>
              <View style={styles.AppSettingsTitleContainer}>
                <Text style={styles.AppSettingsTitleTextStyle}>Security</Text>
              </View>
              <View
                style={[
                  styles.AppSettingsContainer,
                  {height: 160, borderRadius: BasicStyles.standardBorderRadius},
                ]}>
                <AppSettingTile
                  title="Stay logged in"
                  description="Select 'Off' to require password on restart"
                  icon={'logout'}
                />
                <AppSettingTile
                  title="Enable work offline"
                  description="Read tag data only"
                  icon={'wifioffline'}
                />
              </View>
              <View style={styles.AppSettingsTitleContainer}>
                <Text style={styles.AppSettingsTitleTextStyle}>
                  Notifications
                </Text>
              </View>
              <View
                style={[
                  styles.AppSettingsContainer,
                  {height: 160, borderRadius: BasicStyles.standardBorderRadius},
                ]}>
                <AppSettingTile
                  title="Allow push notifications"
                  icon={'bell'}
                />
                <AppSettingTile
                  title="Allow to run in background"
                  icon={'image'}
                />
              </View>
              <View style={{height: 300}} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppSettings);

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Pagination from 'components/Pagination';
import {Pager, PagerProvider} from '@crowdlinker/react-native-pager';
import AccountSettings from 'modules/accountSettings';
import AppSettings from 'modules/appSettings';
import { Color } from 'common';
import styles from 'modules/settingsPage/Styles.js';
class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  onPageChange = activeIndex => {
    this.setState({activeIndex});
  };

  render() {
    const {activeIndex} = this.state;
    const paginationProps = [
      {
        name: 'Account Settings',
      },
      {
        name: 'App Settings',
      },
    ];
    return (
      <View style={styles.MainContainer}>
        <View style={{backgroundColor:Color.white,height:50}}>
          <Pagination
            activeIndex={activeIndex}
            onChange={index => this.onPageChange(index)}
            pages={paginationProps}
          />
        </View>
        <PagerProvider activeIndex={activeIndex}>
          <Pager panProps={{enabled: false}}>
            <View style={styles.sliderContainer}>
              <AccountSettings />
            </View>
            <View style={styles.sliderContainer}>
              <AppSettings />
            </View>
          </Pager>
        </PagerProvider>
      </View>
    );
  }
}

export default SettingsPage;

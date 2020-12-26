import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Pagination from 'components/Pagination/GradientBorder';
import {Pager, PagerProvider} from '@crowdlinker/react-native-pager';
import AccountSettings from 'modules/accountSettings';
import AppSettings from 'modules/appSettings';
import { Color, BasicStyles } from 'common';
import styles from 'modules/settingsPage/Styles.js';
import {connect} from 'react-redux';
const paginationProps = [
  {
    name: 'Account Settings',
  },
  {
    name: 'App Settings',
  },
];
class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  componentDidMount(){
    const { appSetting } = this.props.state;
    this.setState({
      activeIndex: appSetting
    })
  }

  onPageChange = activeIndex => {
    this.setState({activeIndex});
    const { setSetting } = this.props;
    setSetting(index)
  };

  render() {
    const {activeIndex} = this.state;

    return (
      <View style={styles.MainContainer}>
        <View style={BasicStyles.paginationHolder}>
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

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setSetting: (setting) => dispatch(actions.setSetting(setting)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsPage);


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
      activeIndex: 0
    };
  }

  componentDidMount(){
    this.setState({
      activeIndex: this.props.parentNav.state && this.props.parentNav.state.params ? this.props.parentNav.state.params.index : 0
    })
  }

  onPageChange = activeIndex => {
    this.setState({activeIndex});
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsPage);


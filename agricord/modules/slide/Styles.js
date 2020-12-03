import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SwipeButton from 'rn-swipe-button';

class Slide extends Component {
  render() {
    return (
      <SwipeButton
        height={25}
        shouldResetAfterSuccess={true}
        resetAfterSuccessAnimDelay={1000}
      />
    );
  }
}

const styles = StyleSheet.create({});
export default Slide;

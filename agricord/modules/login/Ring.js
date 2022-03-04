import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { Color } from 'common';
class Ring extends Component {
  render() {
    let containerStyle = styles.container
    return (
      <View style={containerStyle}>
        <ActivityIndicator
          size={125}
          color={Color.primary}
          style={[
            styles.wrapper,
            { borderRadius: 50 },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: 125,
    width: 125,
  },
  container_full_stretch: {
    flexGrow: 1,
    height: 125,
    width: 125,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: 'transparent',
    zIndex: 100,
  },
})


export default Ring;

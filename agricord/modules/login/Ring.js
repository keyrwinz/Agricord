import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Ring extends Component {
  render() {
    return (
      <View style={styles.OuterRingContainer}>
        <View style={styles.InnerRingContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  OuterRingContainer: {
    height: 130,
    width: 130,
    borderRadius: 65,
    backgroundColor: '#84CA5C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20%',
    bottom: '25%',
  },
  InnerRingContainer: {
    height: 110,
    width: 110,
    borderRadius: 55,
    backgroundColor: '#FFFFFF',
  },
});

export default Ring;

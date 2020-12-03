import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import SwipeButton from 'rn-swipe-button';
import {BasicStyles} from 'common';
class Slide extends Component {
  render() {
    return (
      <View
        style={{
          height: 100,
          width: '85%',
          borderRadius: 12,
          backgroundColor: '#F1F1F1',
          borderColor: '#E0E0E0',
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 0,
        }}>
        <SwipeButton
          title=""
          height={100}
          width="100%"
          containerStyle={{width: 200}}
          railStyles={{borderRadius: 12}}
          thumbIconStyles={{
            borderRadius: 12,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onSwipeSuccess={() => {
            console.log('Swipe');
          }}
          railBorderColor="#F1F1F1"
          railBackgroundColor="#F1F1F1"
          railFillBorderColor="#F1F1F1"
          railFillBackgroundColor="#F1F1F1"
          thumbIconComponent={() => {
            return (
              <View style={styles.SliderIconContainer}>
                <Text style={styles.SliderIconTextStyle}>
                  {this.props.title}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  RailStyles: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  ContainerStyle: {
    borderRadius: 12,
  },
  SliderIconContainer: {
    backgroundColor: '#5A84EE',
    borderRadius: 12,
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SliderIconTextStyle: {
    fontSize: BasicStyles.titleText.fontSize,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Slide;

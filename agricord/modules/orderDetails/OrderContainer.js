import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {BasicStyles} from 'common';
class OrderDetails extends Component {
  render() {
    return (
      <View style={[styles.OrderContainer, {height: this.props.height}]}>
        {this.props.title ? (
          <View style={styles.OrderTitleContainer}>
            <Text style={styles.OrderTitleTextContainer}>
              {this.props.title}
            </Text>
          </View>
        ) : null}
        <View style={styles.OrderDataContainer}>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  OrderContainer: {
    marginTop: 15,
    width: '95%',
    height: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 3,
    paddingHorizontal: 20,
  },
  OrderTitleContainer: {
    paddingTop: 20,
  },
  OrderTitleTextContainer: {
    fontSize: BasicStyles.titleText.fontSize,
    fontWeight: 'bold',
  },
  OrderDataContainer: {
    height: '100%',
    width: '100%',
  },
});

export default OrderDetails;

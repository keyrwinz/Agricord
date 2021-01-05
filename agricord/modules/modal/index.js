import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {BasicStyles} from 'common';
import {faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import {faHistory, faFlask, faPlus} from '@fortawesome/free-solid-svg-icons';
import SlidingButtonRelative from 'modules/generic/SlidingButtonRelative.js';

class BatchBuild extends Component {
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.visible}
        style={styles.ModalContainer}
        onRequestClose={() => {
          this.props.closeModal();
        }}
        collapsable={true}>
        <View style={styles.BatchBuildContainer}>
          <TouchableOpacity
            style={styles.IconContainer}
            onPress={() => {
              this.props.closeModal();
            }}>
            <FontAwesomeIcon
              color="#9E9E9E"
              icon={faTimes}
              size={25}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <View style={styles.TitleContainer}>
            <Text style={styles.TitleTextStyle}>{this.props.productName}</Text>
          </View>
          <View style={styles.DetailsContainer}>
            <View style={styles.DetailContainer}>
              <View style={styles.DetailTitleContainer}>
                <Text style={styles.DetailTitleTextStyle}>Batch</Text>
              </View>
              <View style={styles.DetailDetailContainer}>
                <Text style={styles.DetailDetailTextStyle}>
                  {this.props.batch}
                </Text>
              </View>
            </View>
            <View style={styles.DetailContainer}>
              <View style={styles.DetailTitleContainer}>
                <Text style={styles.DetailTitleTextStyle}>
                  Manufacture Date
                </Text>
              </View>
              <View style={styles.DetailDetailContainer}>
                <Text style={styles.DetailDetailTextStyle}>
                  {this.props.manufactureDate}
                </Text>
              </View>
            </View>
            <View style={styles.DetailContainer}>
              <View style={styles.DetailTitleContainer}>
                <Text style={styles.DetailTitleTextStyle}>
                  Volume Remaining
                </Text>
              </View>
              <View style={styles.DetailDetailContainer}>
                <Text style={styles.DetailDetailTextStyle}>
                  {this.props.volumeRemaining}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.AddToBatchContainer}>
            <Text style={styles.AddToBatchTextStyle}>Add to Batch</Text>
          </View>
          {
            <SlidingButtonRelative
              icon={faCheck}
              title={'ADD 76,8 L'}
              label={'Swip Right to Confirm'}
              />
          }
          {/*
          <RNSlidingButton
            style={{
              marginTop: 60,
              width: '85%',
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
              borderColor: '#CFCFCF',
              borderWidth: 1,
            }}
            height={45}
            onSlidingSuccess={() => {}}
            slideDirection={SlideDirection.RIGHT}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  backgroundColor: '#5A84EE',
                  height: 45,
                  width: 129,
                  borderRadius: 12,
                  padding: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon color="#FFFFFF" icon={faPlus} size={25} />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '60%',
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: BasicStyles.titleText.fontSize,
                    fontWeight: 'bold',
                    color: '#5A84EE',
                  }}>
                  ADD 76,8 L
                </Text>
              </View>
            </View>
          </RNSlidingButton>
          <View style={styles.SwipeTextContainer}>
            <Text style={styles.SwipeTextStyle}>Swipe Right to Confirm</Text>
          </View>
        </View>
      */}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  IconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  ModalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  BatchBuildContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 120,
    marginHorizontal: 50,
    elevation: 10,
    borderRadius: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  TitleTextStyle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  DetailsContainer: {
    width: '100%',
    paddingHorizontal: '12%',
    paddingTop: 20,
  },
  DetailContainer: {
    flexDirection: 'row',
  },
  DetailTitleContainer: {
    width: '60%',
    paddingTop: 20,
  },
  DetailTitleTextStyle: {
    fontSize: BasicStyles.titleText.fontSize,
    color: '#969696',
  },
  DetailDetailContainer: {
    paddingTop: 20,
    width: '40%',
  },
  DetailDetailTextStyle: {
    fontSize: BasicStyles.titleText.fontSize,
  },
  AddToBatchContainer: {
    paddingHorizontal: '12%',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  AddToBatchTextStyle: {fontSize: 14},
  TitleContainer: {
    marginTop: 40,
  },
  SwipeTextContainer: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingHorizontal: '12%',
  },
  SwipeTextStyle: {
    fontSize: BasicStyles.normalText.fontSize,
    color: '#D5D5D5',
  },
});

export default BatchBuild;

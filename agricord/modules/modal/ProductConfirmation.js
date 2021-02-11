import React, {Component} from 'react';
import {View, Text, Modal, TouchableOpacity, Platform, ScrollView} from 'react-native';
import {BasicStyles} from 'common';
import {faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import {faHistory, faFlask, faPlus} from '@fortawesome/free-solid-svg-icons';
import SlidingButtonRelative from 'modules/generic/InputSlidingButton.js';
import { connect } from 'react-redux';
import styles from './Styles.js'
class ProductConfirmation extends Component {

  redirect(){

  }

  render() {
    const { data } = this.props;
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          this.props.onClose();
        }}
        collapsable={true}>
        <View style={styles.ModalContainer}>
          <View
            style={styles.ContentContainer}
            >
            <TouchableOpacity
              style={styles.IconContainer}
              onPress={() => {
                this.props.onClose();
              }}>
              <FontAwesomeIcon
                color="#9E9E9E"
                icon={faTimes}
                size={25}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
            <View style={styles.TitleContainer}>
              <Text style={styles.TitleTextStyle}>{data.title}</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.DetailsContainer}>
                <View style={styles.DetailContainer}>
                  <View style={styles.DetailTitleContainer}>
                    <Text style={styles.DetailTitleTextStyle}>Batch</Text>
                  </View>
                  <View style={styles.DetailDetailContainer}>
                    <Text style={styles.DetailDetailTextStyle}>
                      {data.batch_number}
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
                      {data.manufacturing_date}
                    </Text>
                  </View>
                </View>

                <View style={[styles.DetailContainer, {
                  marginBottom: 25
                }]}>
                  <View style={styles.DetailTitleContainer}>
                    <Text style={styles.DetailTitleTextStyle}>
                      Volume Remaining
                    </Text>
                  </View>
                  <View style={styles.DetailDetailContainer}>
                    <Text style={styles.DetailDetailTextStyle}>
                      {data.volume_remaining}
                    </Text>
                  </View>
                </View>

              </View>
            </ScrollView>



            <SlidingButtonRelative
              icon={faPlus}
              title={'ADD 76,8 L'}
              label={'Swipe Right to Confirm'}
              onComplete={() => this.props.onSuccess()}
              widthLeft={'30%'}
              widthRight={'70%'}
              changeText={this.props.changeText}
              />
          </View>
        </View>
      </Modal>
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
)(ProductConfirmation);

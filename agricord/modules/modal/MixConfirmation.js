import React, {Component} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {BasicStyles} from 'common';
import {faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import {faHistory, faFlask, faPlus} from '@fortawesome/free-solid-svg-icons';
import SlidingButtonRelative from 'modules/generic/SlidingButtonRelative.js';
import { connect } from 'react-redux';
import styles from './Styles.js'
class MixConfirmation extends Component {

  redirect(){

  }

  render() {
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
          <View style={styles.ContentContainer}>
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
            <View>
              <Text style={styles.TitleTextStyle}>Confirm</Text>
            </View>
            <View style={styles.DetailsContainer}>
              <View style={styles.DetailContainer}>
                <View style={styles.DetailTitleContainer}>
                  <Text style={styles.DetailTitleTextStyle}>Machine</Text>
                </View>
                <View style={styles.DetailDetailContainer}>
                  <Text style={styles.DetailDetailTextStyle}>
                    {'test'}
                  </Text>
                </View>
              </View>
              <View style={styles.DetailContainer}>
                <View style={styles.DetailTitleContainer}>
                  <Text style={styles.DetailTitleTextStyle}>
                    Mix
                  </Text>
                </View>
                <View style={styles.DetailDetailContainer}>
                  <Text style={styles.DetailDetailTextStyle}>
                    {'test'}
                  </Text>
                </View>
              </View>

              <View style={styles.DetailContainer}>
                <View style={styles.DetailTitleContainer}>
                  <Text style={styles.DetailTitleTextStyle}>
                    Applied Rate
                  </Text>
                </View>
                <View style={styles.DetailDetailContainer}>
                  <Text style={styles.DetailDetailTextStyle}>
                    {'test'}
                  </Text>
                </View>
              </View>

              <View style={styles.DetailContainer}>
                <View style={styles.DetailTitleContainer}>
                  <Text style={styles.DetailTitleTextStyle}>
                    Paddock A
                  </Text>
                </View>
                <View style={styles.DetailDetailContainer}>
                  <Text style={styles.DetailDetailTextStyle}>
                    {'test'}
                  </Text>
                </View>
              </View>

              <View style={[styles.DetailContainer, {
                marginBottom: 25
              }]}>
                <View style={styles.DetailTitleContainer}>
                  <Text style={styles.DetailTitleTextStyle}>
                    Paddock B
                  </Text>
                </View>
                <View style={styles.DetailDetailContainer}>
                  <Text style={styles.DetailDetailTextStyle}>
                    {'test'}
                  </Text>
                </View>
              </View>
            </View>

            <SlidingButtonRelative
              icon={faCheck}
              title={'ADD 76,8 L'}
              label={'Swip Right to Confirm'}
              onComplete={() => this.props.onSuccess()}
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
)(MixConfirmation);

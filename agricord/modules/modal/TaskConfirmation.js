import React, {Component} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {BasicStyles, Color} from 'common';
import {faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import {faHistory, faFlask, faPlus} from '@fortawesome/free-solid-svg-icons';
import SlidingButtonRelative from 'modules/generic/SlidingButtonRelative.js';
import { connect } from 'react-redux';
import styles from './Styles.js'
class TaskConfirmation extends Component {

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
              <Text style={[styles.TitleTextStyle, {
                color: Color.primary,
                paddingLeft: 30,
                paddingRight: 30,
                textAlign: 'center',
                paddingBottom: 25,
                paddingTop: 50
              }]}>BATCH APPLICATION IN PROGRESS</Text>
            </View>

            <View style={{marginBottom: 100}}>
              <Text style={[styles.TitleTextStyle, {
                paddingLeft: 30,
                paddingRight: 30,
                textAlign: 'center',
                paddingBottom: 25,
                borderBottomColor: Color.gray,
                borderBottomWidth: 2,
                width: 310,
                marginRight: 'auto',
                marginLeft: 'auto'
              }]}>SWIPE TO COMPLETE WHEN TANK IS EMPTY</Text>
            </View>

            <SlidingButtonRelative
              position={this.props.position}
              icon={null}
              buttonTitle={'Task Complete'}
              title={''}
              label={'Swipe Right to Confirm'}
              onComplete={() => this.props.onSuccess()}
              widthLeft={'50%'}
              widthRight={'50%'}
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
)(TaskConfirmation);

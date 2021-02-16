import React, {Component} from 'react';
import {View, Text, Modal, TouchableOpacity, ScrollView} from 'react-native';
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
    const { task } = this.props.state;
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
            style={styles.ContentContainer}>
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
              <Text style={styles.TitleTextStyle}>Confirm</Text>
            </View>

            <ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={styles.DetailsContainer}>
              <View style={[styles.DetailContainer, { borderBottomColor: '#969696', borderBottomWidth: .5, borderTopColor: '#969696', borderTopWidth: 1, paddingBottom: 15, paddingTop: -1 }]}>
                <View style={styles.DetailTitleContainer}>
                  <Text style={styles.DetailTitleTextStyle}>Machine</Text>
                </View>
                <View style={styles.DetailDetailContainer}>
                  <Text style={styles.DetailDetailTextStyle}>
                    {task.machine ? task.machine.name : null}
                  </Text>
                </View> 
              </View>
              <View style={[styles.DetailContainer, { borderBottomColor: '#969696', borderBottomWidth: .5, paddingBottom: 15 }]}>
                <View style={styles.DetailTitleContainer}>
                  <Text style={styles.DetailTitleTextStyle}>
                    Mix
                  </Text>
                </View>
                <View style={styles.DetailDetailContainer}>
                  <Text style={styles.DetailDetailTextStyle}>
                    {task.spray_mix ? task.spray_mix.name : null}
                  </Text>
                </View>
              </View>

              <View style={[styles.DetailContainer, {
                marginBottom: data.length > 0 ? 0 : 15,
                borderBottomColor: '#969696', borderBottomWidth: .5, paddingBottom: 15
              }]}>
                <View style={styles.DetailTitleContainer}>
                  <Text style={styles.DetailTitleTextStyle}>
                    Applied Rate
                  </Text>
                </View>
                <View style={styles.DetailDetailContainer}>
                  <Text style={styles.DetailDetailTextStyle}>
                    {task.spray_mix ? task.spray_mix.application_rate + ' L / ha' : null}
                  </Text>
                </View>
              </View>

              {
                data && data.map((item, index) => (
                  <View style={[styles.DetailContainer, {borderBottomColor: '#969696', borderBottomWidth: .5, paddingBottom: 15}]}>
                    <View style={styles.DetailTitleContainer}>
                      <Text style={styles.DetailTitleTextStyle}>
                        {
                          item.name
                        }
                      </Text>
                    </View>
                    <View style={[styles.DetailDetailContainer, {
                      marginBottom: data.length > (index + 1) ? 15 : 0
                    }]}>
                      <Text style={styles.DetailDetailTextStyle}>
                        {
                          item.area + ' ha'
                        }
                      </Text>
                    </View>
                  </View>
                ))
              }

              </View>
            </ScrollView>
            <View style={{
              borderBottomLeftRadius: BasicStyles.standaradBorderRadius,
              borderBottomRightRadius: BasicStyles.standaradBorderRadius,
              marginBottom: 10
            }}>
              <SlidingButtonRelative
                icon={faCheck}
                title={this.props.volume}
                label={'Swipe Right to Confirm'}
                onComplete={() => this.props.onSuccess()}
                widthLeft={'30%'}
                widthRight={'70%'}
                style={{
                  borderBottomLeftRadius: BasicStyles.standaradBorderRadius,
                  borderBottomRightRadius: BasicStyles.standaradBorderRadius,
                }}
                />
            </View>
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

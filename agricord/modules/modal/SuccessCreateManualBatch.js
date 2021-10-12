import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { Color, BasicStyles } from 'common';
import { connect } from 'react-redux';
import moment from 'moment';
const height = Math.round(Dimensions.get('window').height);
class SuccessCreateManualBatch extends Component {

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
        <View style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1
        }}>
          <View style={{
            flex: 1,
            backgroundColor: Color.white,
            elevation: 10,
            marginTop: height / 3,
            marginBottom: height / 3,
            borderRadius: BasicStyles.standardBorderRadius,
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%',
          }}>
            <View style={{
              width: '100%',
              backgroundColor: '#5A84EE',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              borderTopLeftRadius: BasicStyles.standardBorderRadius,
              borderTopRightRadius: BasicStyles.standardBorderRadius
            }}>
              <Text style={{
                fontSize: 25,
                color: Color.white
              }}>Success</Text>
            </View>
            <View style={{
              padding: 30,
              width: '100%'
            }}>
              <View style={{
                borderBottomWidth: 1,
                borderColor: Color.gray,
              }}>
                <Text style={{
                  borderBottomColor: Color.gray,
                  fontSize: 15,
                }}>Manual Batch recorded as {'Test'}</Text>
                <Text style={{
                  borderBottomColor: Color.gray,
                  fontSize: 15,
                  marginBottom: 14
                }}>Completed: {moment(new Date()).format('DD/MM/YYYY h:s')}</Text>
              </View>
            </View>
            <View style={{
              alignItems: 'center'
            }}>
              <TouchableOpacity
                style={{
                  ...BasicStyles.standardButton,
                  backgroundColor: Color.danger,
                  borderRadius: 10,
                  width: '50%'
                }}
                onPress={() => {
                  this.props.exit()
                }}>
                <Text style={{
                  color: Color.white,
                  textAlign: 'center'
                }}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}


const mapStateToProps = state => ({ state: state });
const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuccessCreateManualBatch);

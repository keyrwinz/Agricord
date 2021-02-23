import React, {Component} from 'react';
import styles from './Styles.js';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { Color , BasicStyles, Helper, Routes} from 'common';
class MessageModal extends Component {
  constructor(props){
    super(props);
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render(){
    return (
      <View>
        <Modal isVisible={this.props.visible}>
          <View style={styles.mainContainer}>
            <View style={[styles.container, {
              height: '35%',
              marginTop: '10%'
            }]}>
              <View style={{
                width: '95%',
                borderBottomColor: Color.gray,
                alignItems: 'center',
                justifyContent: 'center'}}>
                <View>
                  <Text style={[styles.text, {
                    color: Color.black,
                    fontWeight: 'bold' 
                  }]}>{this.props.title}</Text>
                </View>
              </View>
              <View style={[styles.content, {
                marginVertical: '5%',
                paddingHorizontal: 9,
                height: '30%',
                justifyContent: 'center'
              }]}>
                <Text style={{
                  color: Color.black,
                  textAlign: 'center'
                }}>
                {
                  this.props.message
                }
                </Text>
              </View>
              <View style={[styles.action, {
                height: '10%'
              }]}>
                <View style={{
                  width: '50%',
                  alignItems: 'center',
                  marginTop: 25,
                  height: '100%'
                }}>
                  <TouchableOpacity
                    underlayColor={Color.gray} 
                    style={[{backgroundColor: Color.primary, width: '80%', marginRight: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: 40, borderRadius: 5,}]}
                    onPress={() => this.props.onClose()}
                    >
                    <Text style={{ color: Color.white}}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default MessageModal;
import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, Keyboard, Dimensions } from 'react-native';
import { Color } from 'common';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';
import { faHistory, faFlask, faPlus } from '@fortawesome/free-solid-svg-icons';
import SlidingButtonRelative from 'modules/generic/SlidingButtonRelative.js';
import { connect } from 'react-redux';
import styles from './Styles.js'
import Conversion from 'services/Conversion';
import { color } from 'react-native-reanimated';
const height = Math.round(Dimensions.get('window').height);
class ProductConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardState: 'closed'
    }
  }

  redirect() {
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      keyboardState: 'opened'
    });
  }

  _keyboardDidHide = () => {
    this.setState({
      keyboardState: 'closed'
    });
  }

  render() {
    const { data, remaining } = this.props;
    const { keyboardState } = this.state;
    console.log(keyboardState, '-------------------')
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
            style={[styles.ContentContainer, {
              marginBottom: keyboardState === 'opened' ? 50 : height / 5,
              marginTop: keyboardState === 'opened' ? 50 : height / 5,
            }]}
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
              <Text style={styles.TitleTextStyle}>{data.product.title}</Text>
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
                      {data.qty?.toFixed(2) + ' ' + Conversion.getUnitsAbbreviation(data.units)}
                    </Text>
                  </View>
                </View>
              </View>
              {this.props.input &&
                <View>
                  <View style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingBottom: 20,
                    width: '100%',
                    height: 70,
                    backgroundColor: '#f0f0f0',
                    flexDirection: 'row'
                  }}>
                    <View style={styles.DetailTitleContainer}>
                      <Text style={[styles.DetailTitleTextStyle, {
                        fontWeight: 'bold'
                      }]}>
                        Applied Amount
                      </Text>
                    </View>
                    <View style={{
                      paddingTop: 20,
                      width: '50%'
                    }}>
                      <View style={{
                        position: 'absolute',
                        right: 10,
                        top: 20,
                        width: '50%',
                        borderWidth: .5,
                        borderColor: '#5A84EE',
                        borderRadius: 5
                      }}
                      >
                        <TextInput
                          style={{
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 10,
                            paddingRight: 10,
                            width: '90%'
                          }}
                          keyboardType={'numeric'}
                          value={this.props.appliedAmount}
                          onChangeText={(text) => { this.props.appliedAmountHandler(text) }}
                        />
                        <Text style={{
                          position: 'absolute',
                          right: 10,
                          top: 3
                        }}>
                          {Conversion.getUnitsAbbreviation(data.units)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {keyboardState === 'opened' && <View style={{
                      padding: 20,
                      flexDirection: 'row',
                      flexWrap: 'wrap'
                    }}>
                      <Text style={styles.DetailTitleTextStyle}>
                        WARNING:  <Text style={[styles.DetailTitleTextStyle, { fontWeight: 'normal' }]}>
                          {this.props.warning}
                        </Text>
                      </Text>
                    </View>}
                  {keyboardState === 'closed' && <View style={{
                    padding: 10,
                    paddingLeft: 20,
                    width: '100%',
                  }}>
                    <Text style={[styles.DetailDetailTextStyle], {
                      fontWeight: 'bold'
                    }}>
                      Add to Batch
                    </Text>
                  </View>}
                </View>
              }
            </ScrollView>



            {keyboardState === 'closed' && <SlidingButtonRelative
              icon={faPlus}
              title={this.props.input ? (`ADD ${this.props.appliedAmount} ${Conversion.getUnitsAbbreviation(data.units)}`) : (`ADD ${data.rate > remaining && remaining > 0 ? remaining?.toFixed(2) : data.rate?.toFixed(2)} ${Conversion.getUnitsAbbreviation(data.units)}`)}
              label={'Swipe Right to Confirm'}
              onComplete={() => this.props.onSuccess(data)}
              widthLeft={'30%'}
              widthRight={'70%'}
            />}

            {this.props.warning && keyboardState === 'closed' && <View style={{
              padding: 20,
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}>
              <Text style={styles.DetailTitleTextStyle}>
                WARNING:  <Text style={[styles.DetailTitleTextStyle, { fontWeight: 'normal' }]}>
                  {this.props.warning}
                </Text>
              </Text>
            </View>}
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
)(ProductConfirmation);

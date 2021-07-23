import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { BasicStyles } from 'common';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';
import { faHistory, faFlask, faPlus } from '@fortawesome/free-solid-svg-icons';
import SlidingButtonRelative from 'modules/generic/SlidingButtonRelative.js';
import { connect } from 'react-redux';
import styles from './Styles.js'
import Conversion from 'services/Conversion';
class ProductConfirmation extends Component {

  constructor(props) {
    super(props);
  }

  redirect() {

  }

  render() {
    const { data, remaining } = this.props;
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
                      {data.qty + ' ' + Conversion.getUnitsAbbreviation(data.units)}
                    </Text>
                  </View>
                </View>

              </View>
            </ScrollView>



            <SlidingButtonRelative
              icon={faPlus}
              title={`ADD ${data.rate > remaining && remaining > 0 ? remaining?.toFixed(2) : data.rate?.toFixed(2)} ${Conversion.getUnitsAbbreviation(data.units)}`}
              label={'Swipe Right to Confirm'}
              onComplete={() => this.props.onSuccess(data)}
              widthLeft={'30%'}
              widthRight={'70%'}
            />

            {this.props.warning && <View style={{
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

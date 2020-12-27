import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Color, BasicStyles } from 'common';
import Style from './Style.js';

import Background from 'assets/inventory/background.svg';
import ItemImage from 'assets/inventory/temp_item.svg';
import FileIcon from 'assets/inventory/file_icon.svg';
import CheckIcon from 'assets/inventory/check_icon.svg';

const height = Math.round(Dimensions.get('window').height);

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
  }

  componentDidMount(){
    console.log('params', this.props.navigation.state.params.data)
  }

  render() {
    const data = this.props.route?.params?.data || null
    const { modal } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={Style.modalBody}>
              <TouchableOpacity
                style={Style.modalCloseBtn}
                onPress={() => this.setState({
                  modal: false
                })}
              >
                <FontAwesomeIcon
                  style={{ color: Color.gray }}
                  icon={faTimesCircle}
                  size={25}
                />
              </TouchableOpacity>

              <Text style={Style.modalTitle}>
                Recommended Personal Protective Equipment
              </Text>

              <View style={Style.modalContent}>
                <View style={Style.modalContentRow}>
                  <CheckIcon />
                  <Text style={{ paddingHorizontal: 20 }}>
                    Wear cotton overalls buttoned to neck and wrist
                  </Text>
                </View>
                <View style={Style.modalContentRow}>
                  <CheckIcon />
                  <Text style={{ paddingHorizontal: 20 }}>
                    Wear a washable hat
                  </Text>
                </View>
                <View style={Style.modalContentRow}>
                  <CheckIcon />
                  <Text style={{ paddingHorizontal: 20 }}>
                    Wear elbow-length PVC gloves
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Background style={{ position: 'absolute' }} />
          <View style={
            Style.MainContainer,
            {
              minHeight: height,
              paddingVertical: 15,
              paddingHorizontal: 30,
            }
          }>
            <View style={Style.itemDescContainer}>
              <View style={Style.itemDescription}>
                <ItemImage />
                {
                  data && (
                    <Text style={{ paddingHorizontal: 30, textAlign: 'center', paddingTop: 10 }}>
                      {data.description}
                    </Text>
                  )
                }
              </View>
            </View>

            <View style={Style.itemDescContainer}>
              <View style={Style.itemDetailsContainer}>
                <View style={Style.itemDetailRow}>
                  <View style={Style.itemDetailLeft}>
                    <Text style={Style.itemDetailLabel}>
                      Manufacturer
                    </Text>
                  </View>
                  <View style={Style.itemDetailRight}>
                    {
                      data && (
                        <Text style={Style.itemDetailValue}>
                          {data.manufacturer || 'No data'}
                        </Text>
                      )
                    }
                    
                  </View>
                </View>
              </View>

              <View style={Style.itemDetailsContainer}>
                <View style={Style.itemDetailRow}>
                  <View style={Style.itemDetailLeft}>
                    <Text style={Style.itemDetailLabel}>
                      Type
                    </Text>
                  </View>
                  <View style={Style.itemDetailRight}>
                    {
                      data && (
                        <Text style={Style.itemDetailValue}>
                          {data.type || 'No data'}
                        </Text>
                      )
                    }
                  </View>
                </View>
              </View>

              <View style={Style.itemDetailsContainer}>
                <View style={Style.itemDetailRow}>
                  <View style={Style.itemDetailLeft}>
                    <Text style={Style.itemDetailLabel}>
                      Group
                    </Text>
                  </View>
                  <View style={Style.itemDetailRight}>
                    {
                      data && (
                        <Text style={Style.itemDetailValue}>
                          {data.group || 'No data'}
                        </Text>
                      )
                    }
                  </View>
                </View>
              </View>

              <View style={Style.itemDetailsContainer}>
                <View style={Style.itemDetailRow}>
                  <View style={Style.itemDetailLeft}>
                    <Text style={Style.itemDetailLabel}>
                      Active
                    </Text>
                  </View>
                  <View style={Style.itemDetailRight}>
                    {
                      (data && data.active != null && data.active.length) && data.active.map((string, idx) => (
                          <Text key={idx} style={Style.itemDetailValue}>
                            {string || 'No data'}
                          </Text>
                      ))
                    }
                  </View>
                </View>
              </View>

              <View style={Style.itemDetailsContainer}>
                <View style={Style.itemDetailRow}>
                  <View style={Style.itemDetailLeft}>
                    <Text style={Style.itemDetailLabel}>
                      Solvent
                    </Text>
                  </View>
                  <View style={Style.itemDetailRight}>
                    {
                      data && (
                        <Text style={Style.itemDetailValue}>
                          {data.solvent || 'No data'}
                        </Text>
                      )
                    }
                  </View>
                </View>
              </View>

              <View style={Style.itemDetailsContainer}>
                <View style={Style.itemDetailRow}>
                  <View style={Style.itemDetailLeft}>
                    <Text style={Style.itemDetailLabel}>
                      Volume
                    </Text>
                  </View>
                  <View style={Style.itemDetailRight}>
                    {
                      data && (
                        <Text style={Style.itemDetailValue}>
                          {data.volume || 'No data'}
                        </Text>
                      )
                    }
                  </View>
                </View>
              </View>

              <View style={Style.itemDetailsContainer}>
                <View style={Style.itemDetailRow}>
                  <View style={Style.itemDetailLeft}>
                    <Text style={Style.itemDetailLabel}>
                      Formulation
                    </Text>
                  </View>
                  <View style={Style.itemDetailRight}>
                    {
                      data && (
                        <Text style={Style.itemDetailValue}>
                          {data.Formulation || 'No data'}
                        </Text>
                      )
                    }
                  </View>
                </View>
              </View>

              <View style={Style.itemDetailsContainer}>
                <View style={Style.itemDetailRow}>
                  <View style={Style.itemDetailLeft}>
                    <Text style={Style.itemDetailLabel}>
                      Mixing order
                    </Text>
                  </View>
                  <View style={Style.itemDetailRight}>
                    {
                      data && (
                        <Text style={Style.itemDetailValue}>
                          {data.mixingOrder || 'No data'}
                        </Text>
                      )
                    }
                  </View>
                </View>
              </View>

              <View style={Style.itemDetailsContainer}>
                <View style={Style.itemDetailRow}>
                  <View style={Style.itemDetailLeft}>
                    <Text style={Style.itemDetailLabel}>
                      Safety Equipment
                    </Text>
                  </View>
                  <View style={[Style.itemDetailRight, { justifyContent: 'center', alignItems: 'center' }]}>
                    <TouchableOpacity onPress={() => this.setState({
                      modal: true
                    })}>
                      <Text style={[Style.itemDetailValue, { color: '#5A84EE' }]}>
                        Click to show
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={Style.itemDetailsContainer}>
                <View style={Style.itemDetailRow}>
                  <View style={Style.itemDetailLeft}>
                    <Text style={Style.itemDetailLabel}>
                      Batch
                    </Text>
                  </View>
                  <View style={Style.itemDetailRight}>
                    <Text style={Style.itemDetailValue}>
                      Batch_trace
                    </Text>
                  </View>
                </View>
              </View>

              <View style={Style.itemDetailsContainer}>
                <View style={Style.itemDetailRow}>
                  <View style={Style.itemDetailLeft}>
                    <Text style={Style.itemDetailLabel}>
                      Manufactured
                    </Text>
                  </View>
                  <View style={Style.itemDetailRight}>
                    <Text style={Style.itemDetailValue}>
                      Man_date_trace
                    </Text>
                  </View>
                </View>
              </View>

            </View>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginBottom: 10 }}>
              Recent Files
            </Text>
            <View
              style={[Style.itemDescContainer, {
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }]}
            >
              <View style={Style.fileUploaded}>
                <FileIcon />
                <Text style={Style.fileUploadedText}>
                  Label
                </Text>
              </View>
              <View style={Style.fileUploaded}>
                <FileIcon />
                <Text style={Style.fileUploadedText}>
                  Safety Data (SDS)
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
)(ProductDetails);

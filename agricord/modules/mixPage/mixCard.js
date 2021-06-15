import React,  {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { Color, BasicStyles } from 'common';
import Style from './Style.js';
import Message from 'modules/modal/MessageModal.js';
const COLORS = ['#FFC700', '#5A84EE', '#9AD267'];

class MixCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      message : false,
      text: 0
    }
  }

  removePad = () => {
    this.props.removePaddock(this.props.from, this.props.data.item)
  }

  messageModal = () => {
    this.state.message = true
  }

  closeModal = () => {
    this.setState({message: false})
    this.props.data.item.partial = false
    this.state.text = ''
  }

  fun = async(data) => {
    await this.setState({text: data})
  }

  render = () => {
    const { data, hasCheck, totalRate, partialss, maxRate } = this.props;
    const origPartial = parseFloat(data.item.remaining_spray_area - (totalRate - maxRate)).toFixed(2)
    const remainCalc = parseFloat(data.item.remaining_spray_area - origPartial).toFixed(2)
    let borderColor = ''
    if (data != null) {
      const color_idx = (+data.index % COLORS.length)
      borderColor = COLORS[color_idx]
    }

    return (
          <TouchableOpacity
            style={[Style.mixCardContainer, {
              zIndex: 999
            }]}
            onLongPress={() => {
              this.props.addToSelected(data.item)
            }} 
          >
              <View style={
                [ Style.mixTitle, 
                { borderBottomWidth: 3, borderBottomColor: borderColor }]
              }>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[Style.textBold, {
                    marginRight: 5,
                    fontSize: BasicStyles.standardTitleFontSize
                   }]}>
                    {data?.item?.name}
                  </Text>
                  {
                    hasCheck && (
                      <FontAwesomeIcon
                        size={16}
                        icon={faCheckCircle}
                        color={'#BBF486'}
                      />
                    )
                  }
                </View>
                <View style={{
                  flexDirection: 'row'
                }}>
                  {
                    (data && data.item.partial_flag && this.props.from == 'selected' && partialss == false) && (
                      <TouchableOpacity
                        onPress={() => this.props.onPartialChange(data.item)}>
                        <View style={{
                          flexDirection: 'row',
                          marginLeft: 10,
                          marginRight: 10
                        }}>
                          <FontAwesomeIcon
                            size={16}
                            icon={data.item.partial ? faCheckSquare : faSquare}
                            color={data.item.partial ? Color.blue : Color.white}
                            style={{
                              borderWidth: data.item.partial ? 0 : 1,
                              borderColor: data.item.partial ? Color.blue : Color.gray
                            }}
                          />
                          <Text style={{
                            fontSize: BasicStyles.standardFontSize,
                            marginLeft: 5
                          }}>Partial</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  }

                  {
                    this.props.from == 'selected' && (
                      <TouchableOpacity
                        onPress={() => this.removePad() }>
                        <FontAwesomeIcon
                          size={16}
                          icon={faTimesCircle}
                          color={'#C4C4C4'}
                        />
                      </TouchableOpacity>
                    )
                  }
                </View>
                
              </View>
              <View style={Style.mixDetails}>
                <View style={Style.mixLeftDetail}>
                  <View style={Style.detailRow}>
                    <Text style={[Style.textBold, { color: '#969696', fontSize: BasicStyles.standardFontSize }]}>
                      Crop
                    </Text>
                    <Text style={{ fontSize: BasicStyles.standardFontSize }}>
                      {data?.item?.crop_name}
                    </Text>
                  </View>
                  <View style={Style.detailRow}>
                    <Text style={[Style.textBold, { color: '#969696', fontSize: BasicStyles.standardFontSize - .5 }]}>
                      {this.props.from == 'selected' ? 'Remaining Spray Area' : 'Spray Area'}
                    </Text>
                    <Text style={{ fontSize: BasicStyles.standardFontSize }}>
                    {data.item.partial == true ? remainCalc  + ' ' + data?.item?.units : data?.item?.remaining_spray_area + ' ' + data?.item?.units} 
                    </Text>
                  </View>
                </View>
                {
                  data.item.partial == true && (
                      <View style={Style.mixRightDetail}>
                        <View style={[Style.remainingBox, {
                          borderColor: Color.primary
                        }]}>
                          <Text style={{ color: '#5A84EE', fontSize: BasicStyles.standardFontSize, fontWeight: 'bold', marginBottom: 5 }}>
                            APPLIED AREA
                          </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: BasicStyles.standardTitleFontSize}}>
                              {origPartial + ' ' + data?.item?.units}
                            </Text>
                            
                            {/* <TextInput
                              value={partials >= 0 || partials == '' || partials == NaN ? partials : this.messageModal()}
                              placeholder={origPartial}
                              keyboardType={'numeric'}
                              maxLength={5}
                              style={{
                                fontWeight: 'bold',
                                width: 50,
                                fontSize: BasicStyles.standardTitleFontSize
                              }}
                              onChangeText={(input) => {
                                this.fun(input)
                              }}
                            /> */}
                            {/* <Text style={{ fontWeight: 'bold', fontSize: BasicStyles.standardTitleFontSize}}>
                              {data?.item?.units}
                            </Text> */}
                          <View>
                            { 
                              (this.state.message === true || origPartial < 0) ?
                                <Message
                                  visible={true}
                                  title={'Area too large'}
                                  message={`You've still selected too many hectares. \n\n\t Remove a whole paddock or complete a partial application on another paddock to continue.`}
                                  onClose={() => this.closeModal()}
                                /> : null
                            }
                          </View>
                        </View>
                      </View>
                    )
                }
                {
                  data.item.partial == false && (
                    <View style={Style.mixRightDetail}>
                      <View style={Style.remainingBox}>
                        <Text style={{ color: '#5A84EE', fontSize: BasicStyles.standardFontSize, fontWeight: 'bold', marginBottom: 5, width: '100%', textAlign: 'center'}}>
                          {this.props.from == 'selected' ? 'APPLIED AREA' : 'REMAINING SPRAY AREA'}
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: BasicStyles.standardTitleFontSize}}>
                          {parseFloat(data?.item?.spray_area).toFixed(2) + ' ' + 'Ha'}
                          {/* {parseFloat(data?.item?.remaining_spray_area).toFixed(2) + ' ' + 'Ha'} */}
                        </Text>
                      </View>
                    </View>
                  )
                }

              </View>
          </TouchableOpacity>
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
)(MixCard);

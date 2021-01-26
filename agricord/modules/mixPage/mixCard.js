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
import Draggable from 'react-native-draggable';
const COLORS = ['#FFC700', '#5A84EE', '#9AD267'];

class MixCard extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount = () => {

  }

  render(){
    const { data, hasCheck } = this.props;
    console.log('data here', data)
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
                    (data && data.item.partial_flag && this.props.from == 'selected') && (
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
                        onPress={() => this.props.removePaddock(this.props.from, data.item)}>
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
                    <Text style={[Style.textBold, { color: '#969696', fontSize: BasicStyles.standardFontSize }]}>
                      Area
                    </Text>
                    <Text style={{ fontSize: BasicStyles.standardFontSize }}>
                    {data?.item?.area + ' ' + data?.item?.units} 
                    </Text>
                  </View>
                </View>
                {
                  data.item.partial == true && (
                      <View style={Style.mixRightDetail}>
                        <View style={[Style.remainingBox, {
                          borderColor: Color.danger
                        }]}>
                          <Text style={{ color: Color.danger, fontSize: BasicStyles.standardFontSize, fontWeight: 'bold', marginBottom: 5 }}>
                            PARTIAL
                          </Text>
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <TextInput
                              value={data.item.remaining_area}
                              placeholder={'000'}
                              keyboardType={'numeric'}
                              maxLength={3}
                              style={{
                                fontWeight: 'bold',
                                width: 40,
                                fontSize: BasicStyles.standardTitleFontSize
                              }}
                              onChangeText={(input) => {
                              }}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: BasicStyles.standardTitleFontSize}}>
                              {data?.item?.units}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )
                }
                {
                  data.item.partial == false && (
                    <View style={Style.mixRightDetail}>
                      <View style={Style.remainingBox}>
                        <Text style={{ color: '#5A84EE', fontSize: BasicStyles.standardFontSize, fontWeight: 'bold', marginBottom: 5 }}>
                          REMAINING AREA
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: BasicStyles.standardTitleFontSize}}>
                          {data?.item?.remaining_area + ' ' + data?.item?.spray_mix_units}
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

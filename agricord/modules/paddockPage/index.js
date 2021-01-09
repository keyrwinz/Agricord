import React, { Component, useState } from 'react';
import Style from './Style.js';
import { View,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground
} from 'react-native';
import { Spinner } from 'components';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { Color, Routes ,BasicStyles} from 'common'
import Api from 'services/api/index.js'
import { NavigationActions } from 'react-navigation'
import MapView, { PROVIDER_GOOGLE, Marker,Callout } from 'react-native-maps';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import { Divider } from 'react-native-elements';
import _, { isError } from 'lodash'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import TaskButton from 'modules/generic/TaskButton.js';

class paddockPage extends Component{
  
  constructor(props){
    super(props);
    this.state = { 
      pressed: false,
      isLoading: false,
      data: null
    }
  }

  componentDidMount(){
    // const {data}=this.props.navigation.state.params.data
    // console.log(data)

    this.retrieveData()

  }

  retrieveData = () => {
    const { paddock, user } = this.props.state;

    if(paddock == null || user == null){
      return
    }

    this.setState({
      isLoading: true
    })

    const parameter={
      condition: [{
        value: paddock.paddock_id,
        column: 'id',
        clause: '='
      }]
    }

    Api.request(Routes.paddocksRetrieveWithSprayMix, parameter, response => {
      this.setState({
        isLoading: false
      })
      if(response.data != null){
        this.setState({
          data: response.data[0]
        });
      }
     }, error => {
      console.log("ERROR HAPPENS", error )
      this.setState({
        isLoading: false
      })
    })
  }

  renderTopCard=()=>{
    const { paddock } = this.props.state;
    const { data } = this.state;
    console.log('data', data)
    return(
      <View style={Style.container}>
        {
          (paddock && paddock.from == "due" && data) && (
            <React.Fragment>
              <View style={Style.imageContainer}>  
                <Image
                  style={Style.image}
                  source={require('assets/FieldPea.png')}
                  />
              </View>
              <View style={Style.textContainer}>
                <Text style={Style.text}>Field Pea</Text>
                <Text style={{
                    textAlign:'center',
                    fontSize: BasicStyles.standardFontSize,
                    color: Color.gray
                  }}>{data.crop_name}</Text> 
              </View>
              <Divider style={{
                  width:'90%'
                }}/>
                <View style={{
                    width:'100%',
                    flexDirection:'row',
                    justifyContent:'space-around',
                    paddingTop: 10,
                    paddingBottom: 10
                  }}>
                  <View style={Style.label}>
                    <Text style={{
                        fontWeight:'bold',
                        color: Color.blue
                      }}>Due Date</Text>
                    <Text>{data.due_date}</Text>
                  </View>
                  <View>
                    <Text style={{fontWeight:'bold',color:'#5A84EE'}}>Created By</Text>
                    <Text>{data.creator}</Text> 
                  </View>  
                </View>
              <Divider style={[BasicStyles.starndardDivider, {marginBottom: 10}]}/>
          </React.Fragment>
        )
      }

      {
        (paddock && paddock.from != "due" && data) && (
          <React.Fragment>
            {
              (data.crop_name) && (
                <View style={Style.cardInfo}>
                  <Text style={Style.labelTitle}>
                    Crop
                  </Text>
                  <Text style={Style.label}>{data.crop_name}</Text>
                </View>
              )
            }
            {
              (data.crop_name) && (
                <Divider style={BasicStyles.starndardDivider}/>
              )
            }


            <View style={Style.cardInfo}>
              <Text style={Style.labelTitle}>
                Machine
              </Text>
              <Text style={Style.label}>{data.machine ? data.machine : ''}</Text>
            </View>

            <Divider style={BasicStyles.starndardDivider}/>
            
            {
              (data.operator) && (
                <View style={Style.cardInfo}>
                  <Text style={Style.labelTitle}>
                    Operator
                  </Text>
                  <Text style={Style.label}>{data.operator}</Text>
                </View>
              )
            }
            {
              (data.operator) && (
                <Divider style={BasicStyles.starndardDivider}/>
              )
            }
            {
              (data.start_date && paddock.from == 'history') && (
                <View style={Style.cardInfo}>
                  <Text style={Style.labelTitle}>
                    Start Time
                  </Text>
                  <Text style={Style.label}>{data.start_date}</Text>
                </View>
              )
            }
            {
              (data.start_date && paddock.from == 'history') && (
                <Divider style={BasicStyles.starndardDivider}/>
              )
            }
            {
              (data.end_date && paddock.from == 'history') && (
                <View style={Style.cardInfo}>
                  <Text style={Style.labelTitle}>
                    Finish Time
                  </Text>
                  <Text style={Style.label}>{data.end_date}</Text>
                </View>
              )
            }

            {
              (data.started && paddock.from == 'inprogress') && (
                <View style={Style.cardInfo}>
                  <Text style={Style.labelTitle}>
                    Started
                  </Text>
                  <Text style={Style.label}>{data.started}</Text>
                </View>
              )
            }

            <Divider style={[BasicStyles.starndardDivider, {marginBottom: 10}]}/>
            
          </React.Fragment>
        )}
        </View>
    )
  }

  renderMixCards = (item) => {
    const { paddock } = this.props.state;
    return(
      <TouchableOpacity
      onPress={()=>{
        this.props.navigation.navigate('mixNameStack', {
          data: item
        })
      }}
      style={[Style.paddockContainer]}
      >
        <React.Fragment>
          <View style={[Style.paddockInfo, {
            width: '50%'
          }]}>
            <View style={{
              flexDirection:'row'
              }}>
              <View style={{
                marginTop: 6,
                marginRight: 10,
                width: 10,
                height: 10,
                borderRadius: 100/2,
                backgroundColor: Color.primary
              }}/>
              <Text style={{
                fontWeight:'bold',
                fontSize: BasicStyles.standardTitleFontSize
              }}>Spray Mix</Text>
            </View>
          </View>
          <View style={[Style.paddockDate, {
            width: '50%'
          }]}>   
            <Text style={{
              fontSize: BasicStyles.standardFontSize
            }}>{item.spray_mix.name}</Text>
          </View>  
        </React.Fragment>
      </TouchableOpacity>
    )
  }

  render() {
    const { isLoading, data } = this.state;
    return (
      <ImageBackground
        source={require('assets/backgroundlvl1.png')}
        style={Style.BackgroundContainer}>
        <View style={{
          alignItems: 'center',
          height: '100%',
          width: '90%',
          marginRight: '5%',
          marginLeft: '5%',
          marginBottom: 100,
          marginTop: 15
        }}>
          {data && this.renderTopCard()}
          {data && this.renderMixCards(data)}        
        </View>
        <TaskButton navigation={this.props.navigation}/>
        {this.state.isLoading ? <Spinner mode="overlay" /> : null}
     </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    setMixName: (mix) => dispatch(actions.setSetting(mix)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(paddockPage);

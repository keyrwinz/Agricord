import React, { Component, useState } from 'react';
import Style from './Style.js';
import { View, Image, TouchableHighlight, Text, ScrollView, FlatList,TouchableOpacity,Button,StyleSheet, ColorPropType,TextInput,PermissionsAndroid,ImageBackground} from 'react-native';
import { Spinner, Empty, SystemNotification,GooglePlacesAutoComplete,ImageUpload} from 'components';
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
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Geolocation from '@react-native-community/geolocation';
import { Row } from 'native-base';
import { CheckoutCard } from 'components/Checkout';
import TearLines from "react-native-tear-lines";
import TaskIcon from 'components/Products/TaskIcon.js'
import TaskButton from 'modules/generic/TaskButton.js';

class paddockPage extends Component{
  
  constructor(props){
    super(props);
    this.state = { 
      pressed:false,
      paddock:{
        paddock_tasks_data:[],
        crop_name:[],
      },
    }
  }

  componentDidMount(){
    // const {data}=this.props.navigation.state.params.data
    // console.log(data)

    this.retrieveData()

  }

  retrieveData = () => {
    const { paddock, user } = this.props.state;
    console.log('user', user)

    if(paddock == null || user == null){
      return
    }

    this.setState({
      isLoading: true
    })

    console.log('paddock', paddock)


    const parameter={
      status: paddock.from,
      merchant_id: user.sub_account.merchant.id,
      id: paddock.id
    }
    Api.request(Routes.paddockDetailsRetrieve, parameter, response => {
      if(response.data != null){
        this.setState({paddock: response.data.paddock_data[0]});
      }
     }, error => {
      console.log("ERROR HAPPENS", error )
    })
  }

  renderTopCard=()=>{
    const { paddock } = this.props.state;
    return(
      <View style={Style.container}>
        {
          (paddock && paddock.from == "due") && (
            <React.Fragment>
              <View style={Style.imageContainer}>  
                <Image
                  style={Style.image}
                  source={require('assets/FieldPea.png')}
                  />
              </View>
              <View style={Style.textContainer}>
                <Text style={Style.text}>Field Pea</Text>
                <Text style={{textAlign:'center',fontSize:13,color:'#969696',fontWeight:'bold'}}>CROP</Text> 
              </View>
              <Divider style={{height:0.5,width:'90%',margin:10}}/>
                <View style={{minHeight:70,width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
                  <View style={{flexDirection:'column'}}>
                    <Text style={{fontWeight:'bold',color:'#5A84EE',marginBottom:7}}>Due Date</Text>
                    <Text>03/02/2020</Text>
                  </View>

                  <View style={{flexDirection:'column'}}>
                    <Text style={{fontWeight:'bold',color:'#5A84EE',marginBottom:7}}>Created By</Text>
                    <Text>Agricord</Text> 
                  </View>  
                </View>
              <Divider style={{height:0.5,width:'90%',marginBottom:10}}/>
          </React.Fragment>
        )
      }

      {
        (paddock && paddock.from != "due") && (
          <React.Fragment>
            <View style={Style.cardInfo}>
              <Text style={{fontWeight: 'bold', color: '#969696', width: '50%',marginLeft:20}}>
                Crop
              </Text>
              {
                (paddock && paddock.paddock_plans && paddock.paddock_plans.length > 0 && paddock.paddock_plans[0].crop_name) && (
                  <Text>{paddock.paddock_plans[0].crop_name[0]!=null ? paddock.paddock_plans[0].crop_name[0].name : null}</Text>
                )
              }
              
            </View>
            <Divider style={{height:0.5,width:'90%'}}/>
            <View style={Style.cardInfo}>
              <Text style={{fontWeight: 'bold', color: '#969696', width: '50%',marginLeft:20}}>
                Machine
              </Text>
              <Text>{paddock.machine!=null ? paddock.machine:null}</Text>
            </View>
            <Divider style={{height:0.5,width:'90%'}}/>
            <View style={Style.cardInfo}>
              <Text style={{fontWeight: 'bold', color: '#969696', width: '50%',marginLeft:20}}>
                Operator
              </Text>
              <Text>{paddock.operator != null ? paddock.operator : null}</Text>
            </View>
            <Divider style={{height:0.5,width:'90%'}}/>
            <View style={Style.cardInfo}>
            {
              paddock && (
                <Text style={{fontWeight: 'bold', color: '#969696', width: '50%',marginLeft:20}}>
                  {paddock.status == "completed" ? "Start Time" : "Started"}
                </Text>
              )
            }
              
            {
              (paddock && paddock.paddock_plans && paddock.paddock_plans.length > 0) && (
                <Text>{paddock.paddock_plans[0].start_date != null ? paddock.paddock_plans[0].start_date : null}</Text>  
              ) 
            }
            </View>
            <Divider style={{height:0.5,width:'90%'}}/>
            {
              (paddock && paddock.status=="completed") ? 
                (  <View style={Style.cardInfo}>
                  <Text style={{fontWeight: 'bold', color: '#969696', width: '50%',marginLeft:20}}>
                    Finish Time
                  </Text>
                  {
                    (paddock && paddock.paddock_plans && paddock.paddock_plans.length > 0) && (
                      <Text>{paddock.paddock_plans[0].end_date != null ? paddock.paddock_plans[0].end_date : null}</Text>
                    )
                  }
                  
                </View>
                ): null
            }
          </React.Fragment>
        )}
        </View>
    )
  }

  renderMixCards = () => {
    const { paddock } = this.props.state;
    return(
      <TouchableHighlight
      onPress={()=>{
        this.props.navigation.navigate('mixNameStack', {
          paddock: paddock
        })
      }}
      style={[Style.paddockContainer]}
      underlayColor={Color.blue}
      >
        <React.Fragment>
          <View style={Style.paddockInfo}>
            <View style={{flexDirection:'row'}}>
              <View style={{marginTop:6,marginRight:10,width:10,height:10,borderRadius:100/2,backgroundColor:'#D3E584'}}/>
                <Text style={{fontWeight:'bold',fontSize:18}}>Spray Mix</Text>
            </View>
            </View>
            <View style={[Style.paddockDate]}>   
                <Text style={{fontSize:16}}>Contents</Text>
            </View>  
        </React.Fragment>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <ImageBackground
        source={require('assets/backgroundlvl1.png')}
        style={Style.BackgroundContainer}>
        <View style={{alignItems:'center',margin:10,height:'100%',flex:1}}>
          {this.renderTopCard()}
          {this.renderMixCards()}        
        </View>
        <TaskButton navigation={this.props.navigation}/>
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

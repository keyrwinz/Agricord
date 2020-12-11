import React, { Component, useState } from 'react';
import Style from './Style.js';
import { View, Image, TouchableHighlight, Text, ScrollView, FlatList,TouchableOpacity,Button,StyleSheet, ColorPropType,TextInput,PermissionsAndroid} from 'react-native';
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
import {faEdit,faExclamationTriangle,faTint} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Geolocation from '@react-native-community/geolocation';
import { Icon, Row } from 'native-base';
import { CheckoutCard } from 'components/Checkout';
import TearLines from "react-native-tear-lines";
import TaskIcon from 'components/Products/TaskIcon.js'
import {data} from './data-test.js';
import PaddockCard from 'components/Products/paddockCard.js';




class paddockPage extends Component{
  
  constructor(props){
    super(props);
    this.state = { 
      pressed:false
    }
  }

  componentDidMount(){
    const { user } = this.props.state; 
    console.log(data)
  }

  renderTopCard=()=>{
    return(
    <View style={Style.container}>
      <View style={{width:'30%',minHeight:100,borderTopLeftRadius:12,borderBottomLeftRadius:12,backgroundColor:'#ED1C24',justifyContent:'center'}}>
        {/* <FontAwesomeIcon icon={faExclamationTriangle} style={{alignSelf:'center'}} size={55} ></FontAwesomeIcon> */}
        <Image
    style={{width:'20%',resizeMode:'contain',marginRight:5,alignSelf:'center',padding:30}}
    source={require('../../assets/warningSign.png')}
  />
      </View>
      <View style={{width:'70%',marginTop:10}}>
        <Text style={{fontWeight:'bold',color:'#ED1C24',fontSize:24,marginLeft:15,marginBottom:15}}>Create Batch</Text>
        <Text style={{marginBottom:15,marginLeft:15}}>1. Confirm mixing order on label</Text>
        <Text style={{marginBottom:15,marginLeft:15}}>2. Scan the Agricord tag on each drum to record quantity added and details</Text>
        <Divider height={0.5} style={{marginBottom:10,width:'85%',marginLeft:15,backgroundColor:'#F3F3F3'}}></Divider>
      </View>
    </View>
    )
  }


  render() {
    return (
      <View style={{alignItems:'center',margin:10,height:'100%',flex:1}}>
       {this.renderTopCard()}
       {data.map(item=>(
         <PaddockCard details={item}></PaddockCard>
       ))}
       <View style={[Style.paddockContainer,{backgroundColor:'#5A84EE'}]}>
       <Image
    style={{width:'5%',resizeMode:'contain',marginRight:5,alignSelf:'center',marginLeft:20}}
    source={require('../../assets/waterDrop.png')}
  />
       <View style={{flexDirection:'row',width:'80%',justifyContent:'space-between'}}>
        <Text style={{color:'#FFFFFF',marginLeft:10,fontSize:18}}>Water</Text>
        <Text style={{color:'#FFFFFF',fontSize:18,fontWeight:'bold',marginRight:10}}>4403L</Text>
       </View>
       </View>
      
     </View>

    );
  }
}
const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(paddockPage);

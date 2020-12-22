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
    const { user } = this.props.state; 
    console.log(this.props)
    // const {data}=this.props.navigation.state.params.data
    // console.log(data)

    this.retrieveData()

  }

  retrieveData=()=>{
    this.setState({
      isLoading: true
    })

    const parameter={
      status:this.props.navigation.state.params.data.status,
      merchant_id:1,
      id:this.props.navigation.state.params.data.id,
    }
    console.log(Routes.paddockDetailsRetrieve)
  Api.request(Routes.paddockDetailsRetrieve, parameter, response => {
    if(response.data!=null){
    this.setState({paddock:response.data.paddock_data[0]});
    }
   

     }, error => {
      console.log("ERROR HAPPENS",error )
     
    })
  console.log(parameter)
  }

  renderTopCard=()=>{
    const {data}=this.props.navigation.state.params
    const {paddock}=this.state
    return(
    <View style={Style.container}>
      {data.status=="due" && (
    <React.Fragment>
    <View style={Style.imageContainer}>
      
    <Image
      style={Style.image}
      source={require('../../assets/FieldPea.png')}
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
      )}

      {(data.status!="due") && (
        <React.Fragment>
         
            <View style={Style.cardInfo}>
            <Text style={{fontWeight: 'bold', color: '#969696', width: '50%',marginLeft:20}}>
              Crop
            </Text>
            <Text>{paddock.crop_name[0]!=null ? paddock.crop_name[0].name:null}</Text>
          </View>
          <Divider style={{height:0.5,width:'90%'}}/>

          <View style={Style.cardInfo}>
            <Text style={{fontWeight: 'bold', color: '#969696', width: '50%',marginLeft:20}}>
              Machine
            </Text>
            <Text>{data.machine!=null ? data.machine:null}</Text>
          </View>
          <Divider style={{height:0.5,width:'90%'}}/>
          <View style={Style.cardInfo}>
            <Text style={{fontWeight: 'bold', color: '#969696', width: '50%',marginLeft:20}}>
              Operator
            </Text>
            <Text>{data.operator!=null ? data.operator:null}</Text>
          </View>
          <Divider style={{height:0.5,width:'90%'}}/>
          <View style={Style.cardInfo}>
            <Text style={{fontWeight: 'bold', color: '#969696', width: '50%',marginLeft:20}}>
              {data.status=="completed"?"Start Time" : "Started"}
            </Text>
            <Text>{paddock.start_date!=null ? paddock.start_date:null}</Text>
          </View>
          <Divider style={{height:0.5,width:'90%'}}/>
          {
            data.status=="completed" ? 
            (  <View style={Style.cardInfo}>
              <Text style={{fontWeight: 'bold', color: '#969696', width: '50%',marginLeft:20}}>
                Finish Time
              </Text>
              <Text>{data.finished!=null ? data.finished:null}</Text>
            </View>
            ): null
          }
        </React.Fragment>
      )}

</View>
    )
  }

  renderMixCards=()=>{
    return(
      <TouchableHighlight
      onPress={()=>{
        this.props.navigation.navigate('mixNameStack',{details:this.props.navigation.state.params.data,dataFrom:this.props.navigation.state.params.dataFrom})
        // console.log(this.props.navigation)
      }}
      style={[Style.paddockContainer]}
      underlayColor={'#5A84EE'}
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
    
        <TaskIcon bottom={70}></TaskIcon> 
     </View>
     </ImageBackground>

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

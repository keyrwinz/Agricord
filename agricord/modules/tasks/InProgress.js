import React, { Component } from 'react';
import {View, Image,TouchableHighlight,Text,ScrollView,FlatList, Dimensions,TouchableOpacity,TextInput,SafeAreaView} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { connect } from 'react-redux';
import {faPlus,faMinus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification } from 'components';
import { MainCard, Feature, Card, MainFeature, PromoCard } from 'components/ProductThumbnail'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Divider } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PaddockCard from 'components/Products/paddockCard.js';
import {products} from './data-test.js';


const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class InProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
     
    }
  

  componentDidMount(){
    const { user } = this.props.state;
    if (user != null) {
    }
  }

  
  render() {
    const {isLoading} = this.state;
    const {user} = this.props.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
       <ScrollView>
      <View style={Style.MainContainer,{minHeight:height}}>
        <Text style={{fontWeight:'bold'}}>Paddocks</Text>
      {this.props.data.map(item=>(
        <PaddockCard details={item} key={item.id}></PaddockCard>
      ))}
       </View>
       </ScrollView>
       <View style={{position:'absolute',bottom:150,alignSelf:'flex-end'}}>
       <TouchableOpacity onPress={()=>alert('redirect')}>
          <View style={{alignItems:'center'}}>
          <Image
          style={{padding:30,height:50,width:'100%'}}
            source={require('../../assets/taskIcon.png')}
            />
          </View>
       </TouchableOpacity>
    </View>
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
)(InProgress);

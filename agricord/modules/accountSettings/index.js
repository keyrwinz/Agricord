import React, { Component } from 'react';
import {View, Image,TouchableHighlight,Text,ScrollView,FlatList, Dimensions,TouchableOpacity,TextInput} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { connect } from 'react-redux';
import {faUserCircle,faMapMarker, faUniversity,faKaaba,faFilter} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification } from 'components';
import { MainCard, Feature, Card, MainFeature, PromoCard } from 'components/ProductThumbnail'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Divider } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Pagination from 'components/Pagination';
import { Pager, PagerProvider } from '@crowdlinker/react-native-pager';
import {accountInfo} from './data-test.js';


const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
     
    }
  

  componentDidMount(){
    const { user } = this.props.state;
    if (user != null) {
    }
    
  }

  render() {
 
    return (
      <View style={{alignItems:'center',width:'100%',height:'100%'}}>
       <View style={Style.productInfoContainer}>

<View style={Style.cardInfo}>
  <Image
    style={{width:'10%',resizeMode:'contain',marginRight:5}}
    source={require('../../assets/nameIcon.png')}
  />
  <Text style={{fontWeight:'bold',color:'#969696',width:'40%'}}>Name</Text>
  <Text>Steve Abacus</Text>
</View>
<Divider style={{height:0.5,marginLeft:10,marginRight:10}}/>
<View style={Style.cardInfo}>
<Image
    style={{width:'10%',resizeMode:'contain',marginRight:5}}
    source={require('../../assets/businessAccountIcon.png')}
  />
<Text style={{fontWeight:'bold',color:'#969696',width:'40%'}}>Business Account</Text>
<Text>Agricord. Inc</Text>
</View>
<Divider style={{height:0.5,marginLeft:10,marginRight:10}}/>
<View style={Style.cardInfo}>
<Image
    style={{width:'10%',resizeMode:'contain',marginRight:5}}
    source={require('../../assets/permissionIcon.png')}
  />
<Text style={{fontWeight:'bold',color:'#969696',width:'40%'}}>Permissions Level</Text>
  <Text>Premium</Text>
</View>
<Divider style={{height:0.5}}/>
<View style={Style.cardInfo}>
<Image
    style={{width:'10%',resizeMode:'contain',marginRight:5}}
    source={require('../../assets/lastLoginIcon.png')}
  />
<Text style={{fontWeight:'bold',color:'#969696',width:'40%'}}>Last Login</Text>
  <Text>22 October 2020</Text>
</View>
<Divider style={{height:0.5}}/>

</View>
      </View>
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
)(Tasks);

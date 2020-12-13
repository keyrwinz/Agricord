import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Thumbnail, List, ListItem, Separator} from 'native-base';
import {connect} from 'react-redux';
import Style from './Style.js';
import {Routes, Color, Helper, BasicStyles} from 'common';
import {Spinner, Empty, SystemNotification} from 'components';
import {
  MainCard,
  Feature,
  Card,
  MainFeature,
  PromoCard,
} from 'components/ProductThumbnail';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import {Divider} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import OrderCard from './OrderCard';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {user} = this.props.state;
    if (user != null) {
    }
    console.log('Oorder data', this.props.data);
  }

  render() {
    const {isLoading} = this.state;
    const {user} = this.props.state;
    return (
      <SafeAreaView style={{flex: 1,marginBottom:160}}>
        <ScrollView>
          <View style={(Style.MainContainer, {minHeight: height})}>
            {this.props.data.map((order, index) => (
              <OrderCard details={order} key={index} />
            ))}
          </View>
        </ScrollView>
        <View
          style={{position: 'absolute', bottom: 230, alignSelf: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ApplyTask')}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{padding: 30, height: 50, width: '100%'}}
                source={require('../../assets/taskIcon.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{position: 'absolute', bottom: 230, alignSelf: 'flex-end'}}>
          <TouchableOpacity onPress={() => alert('redirect')}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{padding: 30, height: 50, width: '100%'}}
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
)(Orders);

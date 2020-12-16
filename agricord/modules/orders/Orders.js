import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import Style from './Style.js';
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
  }

  render() {
    const {user} = this.props.state;
    return (
      <SafeAreaView style={{flex: 1, marginBottom: 160}}>
        <ScrollView>
          <View style={(Style.MainContainer, {minHeight: height})}>
            {this.props.data.map((order, index) => (
              <OrderCard
                details={order}
                key={index}
                navigation={this.props.navigation}
              />
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

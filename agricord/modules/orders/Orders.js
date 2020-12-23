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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={(Style.MainContainer, {minHeight: height})}>
            {this.props.data.map((order, index) => (
              <OrderCard
                details={order}
                key={index}
                parentNav={this.props.parentNav}
              />
            ))}
          </View>
        </ScrollView>
        <View
          style={{position: 'absolute', bottom: 130, alignSelf: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => this.props.parentNav.navigate('applyTaskStack')}>
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

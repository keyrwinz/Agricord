import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import Style from './Style.js';
import OrderCard from 'modules/generic/OrderCard';

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
    const { user } = this.props.state;
    const { from, data, loading } = this.props;
    return (
      <SafeAreaView style={{flex: 1, marginBottom: 160}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={(event) => {
            let scrollingHeight = event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y
            let totalHeight = event.nativeEvent.contentSize.height
            if(event.nativeEvent.contentOffset.y <= 0) {
              if(loading == false){
                // this.retrieve(false)
              }
            }
            if(scrollingHeight >= (totalHeight)) {
              if(loading == false){
                this.props.retrieve(true)
              }
            }
          }}
          >
          <View style={(Style.MainContainer, {minHeight: height, marginTop: 15})}>
            {
              (data && data.length > 0) ? data.map((order, index) => {
                return(
                  <OrderCard
                    item={{
                      ...order,
                      from
                    }}
                    key={index}
                    navigation={this.props.parentNav}
                  />
                )}) : (
                <Text style={{ marginTop: 10 }}>{loading ? '' : 'No orders found'}</Text>
              )
            }
          </View>
          <View style={{marginBottom: 100}} />
        </ScrollView>
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

import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import Style from './Style.js';
const height = Math.round(Dimensions.get('window').height);
import Manual_Batch from 'assets/Manual_Batch.svg';

class TaskButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubs: false,
    };
  }
  render() {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 20,
            alignSelf: 'flex-end',
          }}>
          {this.state.showSubs && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 0,
                  position: 'absolute',
                  bottom: 20,
                  right: '30%',
                  width: 180,
                  zIndex: 9000
                }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('manualBatchPage')}
                  style={{marginRight: 20}}>
                  <View style={[Style.cardWithShadow ,{
                    marginLeft: 30}]}>
                    <Text>Manual Batch</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('manualBatchPage')}>
                  <Manual_Batch width="40" height="40" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 0,
                  position: 'absolute',
                  bottom: 80,
                  right: '30%',
                  width: 180,
                  zIndex: 9000
                }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('applyTaskStack')} style={{marginRight: 20}}>
                  <View style={[Style.cardWithShadow ,{
                    marginLeft: 31}]}>
                  <Text>Planned Task</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('applyTaskStack')}>
                  <Image
                    style={{
                      flex: 1,
                      width: 39,
                      height: '1%',
                      aspectRatio: 1,
                      resizeMode: 'stretch',
                    }}
                    source={require('assets/taskIcon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              this.setState({showSubs: !this.state.showSubs});
              this.props.showOverlay(!this.state.showSubs);
            }}
            style={{zIndex: 9000}}>
            <Image
              style={{
                padding: 30,
                height: 50,
                width: '100%',
              }}
              source={require('assets/taskIcon.png')}
            />
          </TouchableOpacity>
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
)(TaskButton);

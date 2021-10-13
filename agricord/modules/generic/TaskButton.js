import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import Style from './Style.js';
const height = Math.round(Dimensions.get('window').height);

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
            right: 10,
            alignSelf: 'flex-end',
          }}>
          {this.state.showSubs && (
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('manualBatchPage')}
                style={{
                  flexDirection: 'row',
                  marginRight: 10,
                  position: 'absolute',
                  bottom: 10,
                  right: '100%',
                  width: 100,
                  zIndex: 9000,
                }}>
                <View style={[Style.cardWithShadow, {marginRight: 30}]}>
                  <Text>Manual Batch</Text>
                </View>
                <Image
                  style={{
                    // flex: 1,
                    width: 25,
                    height: '1%',
                    aspectRatio: 1,
                    resizeMode: 'stretch',
                  }}
                  source={require('assets/taskIcon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('applyTaskStack')}
                style={{
                  flexDirection: 'row',
                  marginRight: 10,
                  position: 'absolute',
                  bottom: 60,
                  right: '100%',
                  width: 100,
                  zIndex: 9000,
                }}>
                <View style={[Style.cardWithShadow, {marginRight: 30}]}>
                  <Text>Planned Task</Text>
                </View>
                <Image
                  style={{
                    // flex: 1,
                    width: 25,
                    height: '1%',
                    aspectRatio: 1,
                    resizeMode: 'stretch',
                  }}
                  source={require('assets/taskIcon.png')}
                />
              </TouchableOpacity>
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

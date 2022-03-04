import React, {Component} from 'react';
import Style from './Style.js';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';
import {Spinner} from 'components';
import {connect} from 'react-redux';
import {Color, Routes, BasicStyles} from 'common';
import Api from 'services/api/index.js';
import {Divider} from 'react-native-elements';
import TaskButton from 'modules/generic/TaskButton.js';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      isLoading: false,
      data: null,
      showOverlay: false
    };
  }

  componentDidMount() {
    this.retrieveData()
  }

  retrieveData = () => {
    const {user} = this.props.state;
    if (user == null) {
      return;
    }
    this.setState({isLoading: true});
    const parameter = {
      session: this.props.navigation.state.params?.data.session
    };
    Api.request(Routes.batchesRetrieveBatchBySession, parameter, response => {
      console.log('[batches By Session]', parameter, response)
      this.setState({isLoading: false});
      if (response.data != null) {
        this.setState({
          data: response.data,
        });
      }
    },
    error => {
      console.log('ERROR HAPPENS', error);
      this.setState({
        isLoading: false,
      });
    },
    );
  };

  renderTopCard = () => {
    const {data} = this.state;
    console.log('[DATA]:', data);
    return (
      <View style={Style.container}>
        {data && (
          <React.Fragment>
            <View style={Style.cardInfo}>
              <Text style={Style.labelTitle}>Task</Text>
              <Text style={Style.label}>Unallocated Batch</Text>
            </View>
            <Divider style={BasicStyles.starndardDivider} />
            {data.operator && (
              <View style={Style.cardInfo}>
                <Text style={Style.labelTitle}>Operator</Text>
                <Text style={Style.label}>{data.operator}</Text>
              </View>
            )}
            {data.operator && <Divider style={BasicStyles.starndardDivider} />}
            <View style={Style.cardInfo}>
              <Text style={Style.labelTitle}>Completed</Text>
              <Text style={Style.label}>{data.date_completed_formatted}</Text>
            </View>
            <Divider style={BasicStyles.starndardDivider} />
            <View style={Style.cardInfo}>
              <Text style={Style.labelTitle}>Notes</Text>
              <Text style={[Style.label, {width: 150}]}>{data.notes !== null ? data.notes : 'No notes'}</Text>
            </View>
          </React.Fragment>
        )}
      </View>
    );
  };

  renderMixCards = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('mixNameUnallocatedStack', {
            data: item.products, 
            id: item.id,
          });
        }}
        style={[Style.paddockContainer]}>
        <React.Fragment>
          <View
            style={[
              Style.paddockInfo,
              {
                width: '50%',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  marginTop: 6,
                  marginRight: 10,
                  width: 10,
                  height: 10,
                  borderRadius: 100 / 2,
                  backgroundColor: Color.primary,
                }}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: BasicStyles.standardTitleFontSize,
                }}>
                Batch Contents
              </Text>
            </View>
          </View>
          <View
            style={[
              Style.paddockDate,
              {
                width: '50%',
              },
            ]}>
            <Text
              style={{
                fontSize: BasicStyles.standardFontSize,
              }}>
              Manual Mix
            </Text>
          </View>
        </React.Fragment>
      </TouchableOpacity>
    )
  };

  render() {
    const {isLoading, data} = this.state;
    return (
      <ImageBackground
        source={require('assets/backgroundlvl1.png')}
        style={Style.BackgroundContainer}>
        <View
          style={{
            alignItems: 'center',
            height: '75%',
            width: '90%',
            marginRight: '5%',
            marginLeft: '5%',
            marginBottom: 150,
            marginTop: 15,
          }}>
          {data && this.renderTopCard()}
          {data && this.renderMixCards(data)}
        </View>
        <TaskButton navigation={this.props.navigation} showOverlay={(bool) => this.setState({showOverlay: bool})}/>
        {
          this.state.showOverlay && (
            <View style={{
               flex: 1,
               position: 'absolute',
               left: 0,
               top: 0,
               opacity: 0.7,
               backgroundColor: 'white',
               width: width,
               height: height
            }}></View>
          )
        }
        {this.state.isLoading ? <Spinner mode="overlay" /> : null}
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setMixName: mix => dispatch(actions.setSetting(mix)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);

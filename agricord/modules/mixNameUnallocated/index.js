import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import Style from './Style.js';
import {Spinner} from 'components';
import ProductCardUnallocated from 'components/Products/thumbnail/ProductUnallocated.js';
import TaskButton from 'modules/generic/TaskButton.js';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class MixName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [],
      isLoading: false,
      spray_mix: null,
      sprayMix: null,
      showOverlay: false
    };
  }
  render() {
    const { isLoading } = this.state;
    return (
      <ImageBackground
        source={require('assets/backgroundlvl2.png')}
        style={Style.BackgroundContainer}>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              height: '100%',
              width: '90%',
              marginRight: '5%',
              marginLeft: '5%',
              marginBottom: 100,
              marginTop: 15
            }}>
            {
              this.props.navigation.state.params != undefined && this.props.navigation.state.params.data.map((item, index) => (
                <ProductCardUnallocated
                  item={{
                    ...item,
                    from: 'paddockPage'
                  }}
                  keya={this.props.navigation.state.params.data[index].batch_number}
                  navigation={this.props.navigation}
                  batch={false}
                />
              ))
            }
            {
              this.props.navigation.state.params != undefined && this.props.navigation.state.params.data.length == 0 && (
                <View style={{
                    width: '100%'
                  }}>
                  <Text style={{ marginTop: 10 }}>{ isLoading ? '' : 'No product found'}</Text>
                </View>
              )
            }
          </View>
        </ScrollView>
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

        {isLoading ? <Spinner mode="overlay" /> : null}
      </ImageBackground>
    );
  }
}
const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setTask: task => dispatch(actions.setTask(task)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MixName);

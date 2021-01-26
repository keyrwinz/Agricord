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
  ImageBackground,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Thumbnail, List, ListItem, Separator} from 'native-base';
import {connect} from 'react-redux';
import {
  faUserCircle,
  faMapMarker,
  faUniversity,
  faKaaba,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import Api from 'services/api/index.js';
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
import Pagination from 'components/Pagination';
import {Pager, PagerProvider} from '@crowdlinker/react-native-pager';
import ProductCard from 'components/Products/thumbnail/ProductCard.js';
import TitleLogo from 'assets/inventory/title_logo.svg';
import SwipeButton from 'components/SwipeableButton';
import WifiSvg from 'assets/settings/wifi.svg';
import TaskButton from 'modules/generic/TaskButton.js';
import SlidingButton from 'modules/generic/SlidingButton';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class MixName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [],
      isLoading: false,
      spray_mix: null
    };
  }

  componentDidMount() {
    const { paddock } = this.props.state;
    if (paddock == null && (paddock && paddock.spray_mix_id == null)) {
      return
    }
    const parameter = {
      condition: [{
        value: paddock.spray_mix_id,
        column: 'spray_mix_id',
        clause: '='
      }],
      sort: {
        created_at: 'desc'
      },
      offset: 0,
      limit: 10
    };
    this.setState({
      isLoading: true
    })
    console.log('parameter', parameter)
    Api.request(Routes.sprayMixProductsRetrieve, parameter, response => {
        console.log('response', response)
        this.setState({data: response.data, isLoading: false, spray_mix: response.spray_mix});
      },
      error => {
        this.setState({
          isLoading: false,
          spray_mix: null,
          data: []
        })
        console.log({error});
      },
    );
  }

  redirect = () => {
    const { setTask } = this.props;
    let task = {
      machine: null,
      spray_mix: this.props.navigation.state.params.data ? this.props.navigation.state.params.data.spray_mix : null
    };
    setTask(task);
    setTimeout(() => {
      this.props.navigation.navigate('applyTaskStack', {fromMix: true});
    }, 100)
  };

  render() {
    const { paddock } = this.props.state;
    const { isLoading, data } = this.state;
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
            <View style={[Style.paddockContainer]}>
              <View style={Style.paddockInfo}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{
                    fontSize: BasicStyles.standardTitleFontSize
                  }}>
                    { (paddock && paddock.from == 'due') ? 'Application Volume' : 'Applied Volume' }
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  width: '25%',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  65L/Ha
                </Text>
              </View>
            </View>
            {
              data.length > 0 && (
                  <View style={{
                    width: '100%',
                  }}>
                    <Text style={{
                      textAlign: 'left',
                      fontWeight: 'bold',
                      marginTop: 10,
                      fontSize: BasicStyles.standardTitleFontSize
                    }}>PRODUCT RATE (PER HA)</Text>
                  </View>

              )
            }
            {
              data && data.map((item, index) => (
                      <ProductCard
                        item={{
                          ...item.product,
                          from: 'paddockPage'
                        }}
                        key={item.id}
                        navigation={this.props.navigation}
                        theme={'v2'}
                      />
                    ) 
                  )
            }
            {
              data.length == 0 && (
                <View style={{
                    width: '100%'
                  }}>
                  <Text style={{ marginTop: 10 }}>{ isLoading ? '' : 'No product found'}</Text>
                </View>
              )
            }
          </View>
        </ScrollView>

        {
          (paddock && paddock.from == 'due') && (
            <SlidingButton
              title={'Apply Mix'}
              label={'Swipe Right'}
              onSuccess={() => this.redirect()}
              />

        )}

        {
          (paddock && paddock.from != 'due') && (
            <TaskButton navigation={this.props.navigation}/>
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

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

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class MixName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      products: [],
    };
  }

  componentDidMount() {
    const {user} = this.props.state;
    if (user != null) {
    }
    const parameter = {
      offset: 0,
      limit: 10,
      merchant_id: 38,
    };
    Api.request(
      Routes.sprayMixesRetrieve,
      parameter,
      response => {
        this.setState({products: response.data});
      },
      error => {
        console.log({error});
      },
    );
  }

  render() {
    const { paddock } = this.props.state;
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
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>
                    Applied Rate
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
                  65L
                </Text>
              </View>
            </View>

            <View style={{
              width: '100%',
            }}>
            {
              (paddock && paddock.from != 'due') && (
                <Text style={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  marginTop: 10
                }}>PRODUCT RATE (PER HA)</Text>
              )
            }
            {
              (paddock && paddock.from == 'due') && (
                <Text style={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  marginTop: 10
                }}>SPRAY RATE PER HECTARE</Text>
              )
            }
            </View>

            {this.state.products.map((item, index) => (
              <ProductCard
                item={{
                  ...item,
                  from: 'paddockPage',
                  title: item.product_title
                }}
                key={item.id}
                navigation={this.props.navigation}
                theme={'v2'}
              />
            ))}
          </View>
        </ScrollView>

        {
          (paddock && paddock.from == 'due') && (
            <SwipeButton
              thumbIconBackgroundColor={Color.blue}
              thumbIconBorderColor={Color.blue}
              thumbIconImageSource={<WifiSvg />}
              shouldResetAfterSuccess={true}
              resetAfterSuccessAnimDelay={100}
              titleColor={Color.white}
              title=""
              height={55}
              railStyles={{
                backgroundColor: Color.blue,
                borderColor: Color.blue,
              }}
              onSwipeSuccess={() => alert('Action Complete Here')}
            />
        )}

        {
          (paddock && paddock.from != 'due') && (
            <TaskButton navigation={this.props.navigation}/>
          )
        }
      </ImageBackground>
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
)(MixName);

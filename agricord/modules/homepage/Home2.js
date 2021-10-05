import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faChevronRight,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import Style from './HomeStyle';
import {Routes, Color, Helper, BasicStyles} from 'common';
import Background from 'assets/homescreen/background.svg';
import CircleGraph from 'assets/homescreen/circle_graph.svg';
import Circles from 'assets/homescreen/circles.svg';
import BlueCircle from 'assets/homescreen/blue_circle.svg';
import GreenCircle from 'assets/homescreen/green_circle.svg';
import YellowCircle from 'assets/homescreen/yellow_circle.svg';
import TaskFocusIcon from 'assets/homescreen/focus_task.svg';
import OrderFocusIcon from 'assets/homescreen/focus_order.svg';
import InProgressIcon from 'assets/homescreen/in_progress_icon.svg';
import CompletedEventIcon from 'assets/homescreen/event_complete_icon.svg';
import CompleteIcon from 'assets/homescreen/complete_icon.svg';
import {Spinner} from 'components';
import Api from 'services/api/index.js';
import {VictoryPie, VictoryTheme} from 'victory-native';
import Config from 'src/config.js';
import _ from 'lodash';
import {Dimensions} from 'react-native';
const height = Math.round(Dimensions.get('window').height);

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      data: [],
      orders: null,
      totalRecentData: 0,
      totalTasksData: 0,
      totalOrderData: 0,
      totalActivities: 0,
      offset: 0,
      limit: 5,
      loading: false,
      recenData: []
    };
  }

  getIcon = type => {
    switch (type) {
      case 'Task':
        return <TaskFocusIcon/>;
      case 'Order':
        return <OrderFocusIcon />;
    }
  };

  redirectToOrder = (obj, props) => {
    this.props.parentNav.navigate('orderDetailsStack', {data: obj});
    const {setSelectedOrder} = this.props;
    let selectedOrder = obj;
    setSelectedOrder(selectedOrder);
  };
  
  redirectToTask = (obj, props) => {
    const {setPaddock} = this.props;
    this.props.parentNav.navigate('paddockStack', {data: obj});
    setPaddock({...obj});
  }

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.retrieve(false);
    });
    this.retrieve(false);
  }

  retrieve = flag => {
    const {user} = this.props.state;
    let parameters = {
      condition: [
        {
          column: user.account_type === 'USER' ? 'merchant_to' : 'merchant_id',
          value: user.sub_account.merchant.id,
          clause: '=',
        },
        {
          column: 'status',
          value: 'inprogress',
          clause: '=',
        },
      ],
      sort: {
        created_at: 'desc',
      },
      limit: this.state.limit,
      offset: flag == true && this.state.offset > 0 ? this.state.offset * this.state.limit : this.state.offset,
    };
    this.setState({loading: true})
    console.log('[PARAMETERS]', parameters);
    Api.request(Routes.dashboardRetrieve, parameters, response => {
      console.log('[RESPONSE]', response, response.data.totalOrders, response.data.totalRecent, response.data.totalInfocus);
      if(response.data !== null || response.data !== undefined) {
        response.data.recent = response.data.recent.length > 0 ? _.orderBy(response.data.recent, ['date_completed'], ['asc']) : []
        let temp  = []
        this.setState({
          loading: false,
          orders: response.data,
          totalOrderData: response.data.totalOrders,
          totalRecentData:  response.data.totalRecent,
          totalTasksData: response.data.totalInfocus,
          totalActivities: response.data.totalOrders + response.data.totalRecent + response.data.totalInfocus
        })
        temp.push(response.data.totalOrders)
        temp.push(response.data.totalRecent)
        temp.push(response.data.totalInfocus)
        this.setState({data: temp})
        if(response.data.recent.length > 0){
          for (let index = 0; index <= response.data.recent.length-1; index++) {
            const element = response.data.recent[index];
            console.log('[ELEMENTS-----------]', element);
          }
        }
      }else{
        this.setState({orders: !flag ? null : this.state.orders})
      }
    })
  };
  render(){
    const {user} = this.props.state
    const {totalOrderData, orders, totalRecentData, totalTasksData, totalActivities, loading, data} = this.state
    return (
      <ScrollView
      style={Style.ScrollView}
      onScroll={(e) => {
        if(e.nativeEvent.contentOffset.y === 0){
          retrieve(false);
        }
      }}
      showsVerticalScrollIndicator={false}>
      <Spinner mode="overlay" />
      <SafeAreaView>
        <View style={Style.background}>
          <Background style={Style.backgroundImage} />
        </View>
        <ImageBackground
          source={require('assets/HomePageBackground.png')}
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            borderRadius: 10,
            minHeight: height,
          }}>
          <View style={Style.MainContainer}>
            <View>
              <View>
                <Text style={[Style.username, Style.textWhite]}>
                  Hi{' '}
                  {user?.account_information !== undefined
                    ? user?.account_information?.first_name
                    : user?.username}
                </Text>
                <Text style={Style.textWhite}>Welcome to Your Dashboard</Text>
              </View>

              {/* OVERVIEW CONTAINER */}

              <View style={Style.overviewChart}>
                <Circles />
                <View style={Style.flexRow}>
                  <View style={Style.graphContainer}>
                    {/* <CircleGraph /> */}
                    <VictoryPie
                      innerRadius={50}
                      data={data}
                      colorScale={['#5A84EE', '#4BB543', '#FFDF00']}
                      labels={() => null}
                      width={180}
                      height={150}
                      radius={70}
                      animate={{
                        duration: 2000,
                        onLoad: {duration: 1000},
                        onEnter: {duration: 500, before: () => ({y: 0})},
                      }}
                    />
                    <View style={Style.graphTextContainer}>
                      <Text style={Style.graphTextBold}>
                        {totalActivities ? totalActivities : 0}
                      </Text>
                      <Text style={Style.graphText}>Activities</Text>
                    </View>
                  </View>
                  <View style={Style.chartDetails}>
                    <Text style={{color: Color.gray}}>Overview Chart</Text>
                    <View style={[Style.flexRow, Style.graphLabel]}>
                      <GreenCircle style={{marginRight: 10}} />
                      <Text>
                        {totalRecentData !== undefined
                          ? totalRecentData
                          : 0}{' '}
                        Recent Event
                      </Text>
                    </View>
                    <View style={[Style.flexRow, Style.graphLabel]}>
                      <YellowCircle style={{marginRight: 10}} />
                      <Text>
                        {totalTasksData ? totalTasksData : 0} Task in
                        Focus
                      </Text>
                    </View>
                    <View style={[Style.flexRow, Style.graphLabel]}>
                      <BlueCircle style={{marginRight: 10}} />
                      <Text>
                        {totalOrderData ? totalOrderData : 0} Order in
                        Focus
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {!loading && orders !== null ? (
              <View>
                {(orders?.orders?.length <= 0 &&
                  orders?.infocus?.length <= 0 &&
                  orders?.recent?.length <= 0) ||
                ((orders?.orders == undefined &&
                  orders?.infocus == undefined) ||
                  orders?.recent == undefined) ? (
                  <View
                    style={{
                      padding: 20,
                      justifyContent: 'center',
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      It's a little quiet here, go online to add new orders and
                      tasks
                    </Text>
                  </View>
                ) : (
                  <View>
                    {/* IN FOCUS */}
                    {orders?.orders?.length > 0 ||
                    orders?.infocus.length > 0 ? (
                      <View style={Style.InFocusContainer}>
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          In Focus
                        </Text>
                        {orders?.orders?.length > 0 && (
                          <View>
                            {orders?.orders.map((obj, idx) => {
                              if ((orders?.orders?.length) > 4 && !isExpanded) return;
                              const icon = this.getIcon('Order');
                              return (
                                <TouchableOpacity
                                  key={idx}
                                  onPress={() => this.redirectToOrder(obj, this.props)}>
                                  <View style={[Style.focusTask]}>
                                    {icon}
                                    <View style={[Style.focusTaskDetails, {width: '73%'}]}>
                                      <View style={Style.flexRow}>
                                        <InProgressIcon />
                                        {/* <Text style={Style.eventText}>
                                          {obj.status}
                                        </Text> */}
                                        <Text
                                          style={[
                                            Style.eventText,
                                            {color: '#54BAEC'},
                                          ]}>
                                          {obj.date_of_delivery_formatted}
                                        </Text>
                                        <Text
                                          style={[
                                            Style.eventText,
                                            // Style.overFlowText,
                                          ]}
                                          numberOfLines={1}
                                          ellipsizeMode="tail">
                                          {obj.merchant_from.name}
                                        </Text>
                                      </View>
                                      <View style={Style.flexRow}>
                                        <Text style={[Style.taskPayloadText, {fontSize: 15}]}>
                                          ORDER NUMBER: {obj.order_number}
                                        </Text>
                                        <Text style={Style.taskPayloadText}>
                                          {obj.payload_value}
                                        </Text>
                                      </View>
                                    </View>
                                    <View style={{width: 20, marginRight: 10}}>
                                      <FontAwesomeIcon
                                        icon={faChevronRight}
                                        color={Color.gray}
                                        size={25}
                                      />
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        )}
                        {orders?.infocus?.length > 0 && (
                          <View>
                            {orders?.infocus.map((obj, idx) => {
                              if (orders?.orders?.length >= 4 && !isExpanded) return;
                              const icon = this.getIcon('Task');
                              return (
                                <TouchableOpacity
                                  key={idx}
                                  onPress={() => this.redirectToTask(obj, this.props)}>
                                  <View style={Style.focusTask}>
                                    {icon}
                                    <View style={[Style.focusTaskDetails, {width: 220}]}>
                                      <View style={Style.flexRow}>
                                        <InProgressIcon />
                                        {/* <Text style={Style.eventText}>
                                          {obj.status}
                                        </Text> */}
                                        <Text
                                          style={[
                                            Style.eventText,
                                            {color: '#54BAEC'},
                                          ]}>
                                          {obj.due_date_format}
                                        </Text>
                                        <Text
                                          style={[
                                            Style.eventText,
                                            // Style.overFlowText,
                                          ]}
                                          numberOfLines={1}
                                          ellipsizeMode="tail">
                                          {obj.nickname}
                                        </Text>
                                      </View>
                                      <View style={Style.flexRow}>
                                        <Text style={Style.taskPayloadText}>
                                          {obj.paddock.name}
                                        </Text>
                                        <Text style={Style.taskPayloadText}>
                                          {/* {obj.payload_value} */}
                                        </Text>
                                      </View>
                                    </View>
                                    <View>
                                      <FontAwesomeIcon
                                        icon={faChevronRight}
                                        color={Color.gray}
                                        size={25}
                                      />
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        )}
                        {orders &&
                        (orders?.orders?.length + orders?.infocus?.length > 4) ? (
                          <TouchableOpacity
                            style={Style.chevronDown}
                            onPress={() => setExpand(!isExpanded)}>
                            <FontAwesomeIcon
                              icon={isExpanded ? faChevronUp : faChevronDown}
                              color={Color.gray}
                              size={25}
                            />
                          </TouchableOpacity>
                        ) : (
                          <View style={{marginTop: 20}} />
                        )}
                      </View>
                    ) : (
                      <View />
                    )}

                    {/* RECENT EVENTS */}
                    {orders?.recent?.length > 0 ? (
                      <View style={Style.RecentEventsContainer}>
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          Recent Event
                        </Text>
                        {orders?.recent?.length > 0 && (
                          <View>
                            {orders?.recent.map((obj, idx) => {
                              return (
                                <TouchableOpacity
                                  key={idx}
                                  onPress={() =>
                                    obj?.order_number
                                      ? this.redirectToOrder(obj, this.props)
                                      : this.redirectToTask(obj, this.props)
                                  }>
                                  <View
                                    key={idx}
                                    style={[
                                      Style.flexRow,
                                      {
                                        position: 'relative',
                                        marginLeft: 15,
                                      },
                                    ]}>
                                    {idx + 1 === orders?.recent?.length ? (
                                      <CompleteIcon style={Style.eventIcon} />
                                    ) : (
                                      <CompletedEventIcon
                                        style={Style.eventIcon}
                                      />
                                    )}
                                    <View style={Style.eventDetailsContainer}>
                                      <View style={Style.flexRow}>
                                        <Text style={Style.eventText}>
                                          {obj?.order_number ? 'Order' : 'Task'}
                                        </Text>
                                        <Text
                                          style={[
                                            Style.eventText,
                                            {color: '#54BAEC'},
                                          ]}>
                                          {obj?.order_number
                                            ? obj.date_completed
                                            : obj.date_completed}
                                        </Text>
                                        <Text style={Style.eventText}>
                                          {obj?.order_number
                                            ? obj.delivered_by
                                            : obj.nickname}
                                        </Text>
                                      </View>
                                      <View style={Style.flexRow}>
                                        <Text style={[Style.eventPayloadText, {width: '100%', fontSize: 15}]}>
                                          {obj?.order_number
                                            ? 'ORDER NUMBER: '+ obj.order_number
                                            : obj.paddock?.name}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        )}
                      </View>
                    ) : (
                      <View />
                    )}
                  </View>
                )}
              </View>
            ) : (
              <Spinner mode="overlay" />
            )}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </ScrollView>
    )
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setSelectedOrder: selectedOrder => {
      dispatch(actions.setSelectedOrder(selectedOrder));
    },
    setPaddock: product => dispatch(actions.setPaddock(product)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);

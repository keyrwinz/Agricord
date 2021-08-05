import React, {useEffect, useState} from 'react';
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
// const width = Math.round(Dimensions.get('window').width);
// const height = Math.round(Dimensions.get('window').height);
const height = Math.round(Dimensions.get('window').height);

const getIcon = type => {
  switch (type) {
    case 'Task':
      return <TaskFocusIcon/>;
    case 'Order':
      return <OrderFocusIcon />;
  }
};

const redirectToOrder = (obj, props) => {
  props.parentNav.navigate('orderDetailsStack', {data: obj});
  const {setSelectedOrder} = props;
  let selectedOrder = obj;
  setSelectedOrder(selectedOrder);
};

const redirectToTask = (obj, props) => {
  const {setPaddock} = props;
  props.parentNav.navigate('paddockStack', {data: obj});
  setPaddock({...obj});
};

const Home = props => {
  const [isExpanded, setExpand] = useState(false);
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState();
  const [totalRecentData, setTotalRecentData] = useState(0);
  const [totalTasksData, setTotalTasksData] = useState(0);
  const [totalOrderData, setTotalOrderData] = useState(0);
  const [totalActivities, setTotalActivities] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState();
  const [arrayData, setArrayData] = useState([]);
  const [recentCount, setRecentCount] = useState(0);
  const [taskCount, setTaskCount] = useState();
  var offset = 0;
  var limit = 5;
  // const totalRecentData = null

  const retrieve = flag => {
    const {user} = props.state;
    console.log('==================', user.sub_account.merchant.id);
    let parameters = {
      condition: [
        {
          column: user.account_type === 'USER' ? 'merchant_to' : 'merchant_id',
          value: user.sub_account.merchant.id, //temporarily used id of 1 because the current user.sub_account.merchant.id (4) causes API to returns null data
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
      limit: limit,
      offset: flag == true && offset > 0 ? offset * limit : offset,
    };
    console.log('[PARAMETER]', parameters);
    setLoading(false);
    Api.request(
      Routes.dashboardRetrieve,
      parameters,
      response => {
        setLoading(false);
        setOrders();
        if (response.data != null || response.data != undefined) {
          setOrders(
            response.data,
            // numberOfPages: parseInt(response.size / limit) + (response.size % limit ? 1 : 0),
            // offset: flag == false ? 1 : (offset + 1)
          );
          setTotalOrderData({orders: response.data.totalOrders});
          setTotalRecentData({recent: response.data.totalRecent});
          setTotalTasksData({tasks: response.data.totalInfocus});
          setData([
            response.data.totalOrders != undefined
              ? response.data.totalOrders
              : 0,
            response.data.totalRecent != undefined
              ? response.data.totalRecent
              : 0,
            response.data.totalInfocus != undefined
              ? response.data.totalInfocus
              : 0,
          ]);
          setTotalActivities(
            response.data.totalInfocus +
              response.data.totalRecent +
              response.data.totalOrders,
          );
        } else {
          setOrders(!flag ? null : orders);
        }
      },
      error => {
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    setTimeout(() => {
      retrieve(false);
    }, 1000);
    props.navigation.addListener('didfocus', () => {
      this.retrieve();
    });
  }, []);

  const handleScroll = e => {
    if (e.nativeEvent.contentOffset.y === 0) {
      retrieve(false);
    }
    return (
      <View>
        <Spinner mode="overlay" />
      </View>
    );
  };

  console.log('[INFOCUS]', orders?.infocus);
  return (
    <ScrollView
      style={Style.ScrollView}
      onScroll={handleScroll}
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
                  {props?.state?.user?.account_information !== undefined
                    ? props?.state?.user?.account_information?.first_name
                    : props?.state?.user?.username}
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
                          ? totalRecentData.recent
                          : 0}{' '}
                        Recent Event
                      </Text>
                    </View>
                    <View style={[Style.flexRow, Style.graphLabel]}>
                      <YellowCircle style={{marginRight: 10}} />
                      <Text>
                        {totalTasksData ? totalTasksData.tasks : 0} Task in
                        Focus
                      </Text>
                    </View>
                    <View style={[Style.flexRow, Style.graphLabel]}>
                      <BlueCircle style={{marginRight: 10}} />
                      <Text>
                        {totalOrderData ? totalOrderData.orders : 0} Order in
                        Focus
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {orders ? (
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
                              if (idx > 1 && !isExpanded) return;
                              const icon = getIcon('Order');
                              return (
                                <TouchableOpacity
                                  key={idx}
                                  onPress={() => redirectToOrder(obj, props)}>
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
                                          {obj.date_of_delivery}
                                        </Text>
                                        <Text
                                          style={[
                                            Style.eventText,
                                            // Style.overFlowText,
                                          ]}
                                          numberOfLines={1}
                                          ellipsizeMode="tail">
                                          {obj.merchant.name}
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
                               console.log('[OBJECT>>>>>>]', obj);
                              if (idx > 1 && !isExpanded) return;
                              const icon = getIcon('Task');
                              return (
                                <TouchableOpacity
                                  key={idx}
                                  onPress={() => redirectToTask(obj, props)}>
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
                                      ? redirectToOrder(obj, props)
                                      : redirectToTask(obj, props)
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
                                            ? obj.delivered_date
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
  );
};


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
)(Home);

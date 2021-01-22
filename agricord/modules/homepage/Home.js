import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp, faChevronRight, faBars } from '@fortawesome/free-solid-svg-icons';
import Style from './HomeStyle'
import { Routes, Color, Helper, BasicStyles } from 'common';
import Background from 'assets/homescreen/background.svg'
import CircleGraph from 'assets/homescreen/circle_graph.svg'
import Circles from 'assets/homescreen/circles.svg'
import BlueCircle from 'assets/homescreen/blue_circle.svg'
import GreenCircle from 'assets/homescreen/green_circle.svg'
import YellowCircle from 'assets/homescreen/yellow_circle.svg'
import TaskFocusIcon from 'assets/homescreen/focus_task.svg'
import OrderFocusIcon from 'assets/homescreen/focus_order.svg'
import InProgressIcon from 'assets/homescreen/in_progress_icon.svg'
import CompletedEventIcon from 'assets/homescreen/event_complete_icon.svg'
import CompleteIcon from 'assets/homescreen/complete_icon.svg'
import {Spinner} from 'components';
import Api from 'services/api/index.js'
import _ from "lodash"

const getIcon = (type) => {
  switch(type) {
    case 'Task':
      return <TaskFocusIcon />
    case 'Order':
      return <OrderFocusIcon />
  }
}

const redirectToOrder = (obj, props) => {
  console.log(",,,,,,,,,,,,,,,, ,,,,,,,,,,", obj);
  Alert.alert(
    `Redirect to ${Array.isArray(obj) ? 'Tasks' : 'Order'}: ${obj.order_number}`,
    '',
    [
      {text: 'OK', onPress: () => props.parentNav.navigate('orderDetailsStack', {
        details: obj
      })},
    ],
    {cancelable: true},
  );
  const {setSelectedOrder} = props;
  let selectedOrder = obj
  setSelectedOrder(selectedOrder);
}


const Home = (props) => {
  const [isExpanded, setExpand] = useState(false)
  const [data, setData] = useState()
  const [orders, setOrders] = useState([])
  const [totalRecentData, setTotalRecentData] = useState()
  const [totalTasksData, setTotalTasksData] = useState()
  const [totalOrderData, setTotalOrderData] = useState()
  const [totalActivities, setTotalActivities] = useState(0)
  const [loading, setLoading] = useState(false)
  const [allData, setAllData] = useState();
  const [arrayData, setArrayData] = useState([]);
  const [recentCount, setRecentCount] = useState(0);
  const [taskCount, setTaskCount] = useState();

  var offset = 0;
  var limit = 5;
  // const totalRecentData = null

  const retrieve = (flag) => {
    let parameters = {
      condition: [{
          column: 'merchant_id',
          value: props.state.user.sub_account.merchant.id, //temporarily used id of 1 because the current user.sub_account.merchant.id (4) causes API to returns null data
          clause: '=',
        }, {
          column: 'status',
          value: 'completed',
          clause: '!='
        }
      ],
      sort: {
        created_at: 'desc'
      },
      limit: limit,
      offset: flag == true && offset > 0 ? (offset * limit) : offset,
    };
    setLoading(true)
    retrieveData();
    Api.request(Routes.ordersRetrieveByParams, parameters, response => {
      setLoading(false)
      setOrders([])
      if(response.data.length > 0){
        setOrders({
          data: flag == false ? response.data : _.uniqBy([...orders, ...response.data], 'id'),
          numberOfPages: parseInt(response.size / limit) + (response.size % limit ? 1 : 0),
          offset: flag == false ? 1 : (offset + 1)
        })
      }else{
        setOrders({
          data: flag == false ? [] : orders,
          numberOfPages: null,
          offset: flag == false ? 0 : offset
        })
      }
    }, error => {
      setLoading(false);
    });
  };

  const retrieveData = async () => {
    const parameter = {
      merchant_id: props.state.user.sub_account.merchant.id,
  }
    setLoading(true)
    Api.request(Routes.dashboardRetrieve, parameter, res => {
      console.log(res.data);
      setLoading(false)
      setData(res.data)
      setTotalRecentData(_.countBy(res.data.recent, (res) => {
        return ('recent');
      }))
  
      setTotalTasksData(_.countBy(res.data.infocus, (infocus) => {
        return ('Task')
      }))
  
      setTotalOrderData( _.countBy(orders, (infocus) => {
        return ('Order')
      }))

      setTotalActivities(totalTasksData.Task + totalRecentData.recent + totalOrderData.Order)

      let temp = {...data, ...orders.data}
      setAllData({data: temp})
  
    }, error => {
      setLoading(false)
      setData([])
    })

    var array = []
    Object.entries(allData.data).map(([key, values]) => {
      console.log(key,values);
      array.push(values);
    })
    array.pop()
    setArrayData(array);
    
  }

  

  useEffect(() => {
    // setTimeout(() => {
      retrieve(false)
    // }, 1000)
  }, [allData])

  return arrayData.length ?  (
  <ScrollView style={Style.ScrollView}>
      <Spinner mode="overlay" />
      <SafeAreaView>
      <View style={Style.background}>
          <Background style={Style.backgroundImage} />
        </View>
      <ImageBackground source={require('assets/HomePageBackground.png')} style={{ flex: 1, resizeMode: "cover", justifyContent: "center", borderRadius: 10}}>
        <View style={Style.MainContainer}>
          <View style={Style.imageContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -5
              }
            }>
              <TouchableOpacity onPress={() => props.parentNav.toggleDrawer()}>
                <FontAwesomeIcon
                  icon={faBars}
                  size={30}
                  style={[
                    BasicStyles.iconStyle,
                    {
                      color: '#fff',
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
            <Image
              source={require('assets/drawer/profile/profile_pic.png')}
              style={Style.image}
            />
          </View>
          <View>
            <Text style={[Style.username, Style.textWhite]}>
              Hi {props.state.user.account_information !== undefined ? props.state.user.account_information.first_name : props.state.user.username}
            </Text>
            <Text style={Style.textWhite}>
              Welcome to Your Dashboard
            </Text>
          </View>

          {/* OVERVIEW CONTAINER */}

          <View style={Style.overviewChart}>
            <Circles />
            <View style={Style.flexRow}>
              <View style={Style.graphContainer}>
                <CircleGraph />
                <View style={Style.graphTextContainer}>
                  <Text style={Style.graphTextBold}>{totalActivities}</Text>
                  <Text style={Style.graphText}>Activity</Text>
                </View>
              </View>
              <View style={Style.chartDetails}>
                <Text style={{ color: Color.gray }}>
                  Overview Chart
                </Text>
                <View style={[Style.flexRow, Style.graphLabel]}>
                  <GreenCircle style={{ marginRight: 10 }} />
                  <Text>{totalRecentData !== undefined ? totalRecentData.recent : 0} Recent Event</Text>
                </View>
                <View style={[Style.flexRow, Style.graphLabel]}>
                  <YellowCircle style={{ marginRight: 10 }} />
                  <Text>{totalTasksData ? totalTasksData.Task : 0} Task in Focus</Text>
                </View>
                <View style={[Style.flexRow, Style.graphLabel]}>
                  <BlueCircle style={{ marginRight: 10 }} />
                  <Text>{totalOrderData ? totalOrderData.Order : 0} Order in Focus</Text>
                </View>
              </View>
            </View>
          </View>

          {/* IN FOCUS */}
          <View style={Style.InFocusContainer}>
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>In Focus</Text>
            {
              arrayData.length && arrayData.map( (obj, idx) => {
                if(!Array.isArray(obj)){
                  if (idx > 1 && !isExpanded) return
                  const icon = getIcon('Order')
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => redirectToOrder(obj, props)}
                    >
                      <View style={Style.focusTask}>
                        {icon}
                        <View style={Style.focusTaskDetails}>
                          <View style={Style.flexRow}>
                            <InProgressIcon />
                            <Text style={Style.eventText}>
                              {obj.status}
                            </Text>
                            <Text style={[Style.eventText, { color: '#54BAEC' }]}>
                              {obj.date_of_delivery}
                            </Text>
                            <Text style={[Style.eventText, Style.overFlowText]} numberOfLines={1} ellipsizeMode="tail">
                              {obj.merchant.name}
                            </Text>
                          </View>
                          <View style={Style.flexRow}>
                            <Text style={Style.taskPayloadText}>
                              {obj.order_number}
                            </Text>
                            <Text style={Style.taskPayloadText}>
                              {obj.payload_value}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            color={Color.gray}
                            size={45}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }else if(Array.isArray(obj)){
                  return(
                  obj.length && obj.map((el, idx) => {
                    // if (idx > 1 && !isExpanded) return
                    const icon = getIcon('Task')
                    return (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => redirectToOrder(obj, props)}
                      >
                        <View style={Style.focusTask}>
                          {icon}
                          <View style={Style.focusTaskDetails}>
                            <View style={Style.flexRow}>
                              <InProgressIcon />
                              <Text style={Style.eventText}>
                                Task
                              </Text>
                              <Text style={[Style.eventText, { color: '#54BAEC' }]}>
                                {el.created_at_human}
                              </Text>
                              <Text style={Style.eventText}>
                                {obj.order_number}
                              </Text>
                            </View>
                            <View style={Style.flexRow}>
                              <Text style={Style.taskPayloadText}>
                                {obj.order_number}
                              </Text>
                              <Text style={Style.taskPayloadText}>
                                {obj.payload_value}
                              </Text>
                            </View>
                          </View>
                          <View>
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              color={Color.gray}
                              size={45}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  })
                  )
                }
              })
            }
            <TouchableOpacity
              style={Style.chevronDown}
              onPress={() => setExpand(!isExpanded)}
            >
              <FontAwesomeIcon
                icon={isExpanded ? faChevronUp : faChevronDown}
                color={Color.gray}
                size={45}
              />
            </TouchableOpacity>
          </View>

          {/* RECENT EVENTS */}

        <View style={Style.RecentEventsContainer}>
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>Recent Event</Text>
            {
              response.data.recent.length && response.data.recent.map((obj, idx) => {
                return (
                  <View
                    key={idx}
                    style={[
                      Style.flexRow,
                      {
                        position: 'relative',
                        marginLeft: 15
                      }
                    ]}
                  >
                    {
                      idx + 1 === response.data.recent.length ? (
                        <CompleteIcon style={Style.eventIcon} />
                      ) : (
                        <CompletedEventIcon style={Style.eventIcon} />
                      )
                    }
                    <View style={Style.eventDetailsContainer}>
                      <View style={Style.flexRow}>
                        <Text style={Style.eventText}>
                          {obj.type}
                        </Text>
                        <Text style={[Style.eventText, { color: '#54BAEC' }]}>
                          {obj.date}
                        </Text>
                        <Text style={Style.eventText}>
                          {obj.name}
                        </Text>
                      </View>
                      <View style={Style.flexRow}>
                        <Text style={Style.eventPayloadText}>
                          {obj.payload}
                        </Text>
                        <Text style={[Style.eventPayloadText, { marginLeft: 15 }]}>
                          {obj.payload_value}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
        </ImageBackground>
      </SafeAreaView>
    </ScrollView>
    ) : (
      <Spinner mode="overlay"/>
    )
}

const response = {
  data: {
    infocus: [
      {
        type: 'Task',
        status: 'In Progress',
        date: '21 June',
        name: 'Steve',
        payload: 'Paddock A',
        payload_value: 'Fungicide'
      }, {
        type: 'Order',
        status: 'In Progress',
        date: '12 June',
        name: 'Jane',
        payload: 'Paddock A',
        payload_value: 'Fungicide'
      }, {
        type: 'Task',
        status: 'In Progress',
        date: '22 June',
        name: 'Steve',
        payload: 'Paddock A',
        payload_value: 'Fungicide'
      }, {
        type: 'Task',
        status: 'In Progress',
        date: '29 June',
        name: 'Steve',
        payload: 'Paddock B',
        payload_value: '7FA000003'
      }
    ],
    recent: [
      {
        status: 'complete',
        type: 'Task',
        date: '20 May',
        name: 'Yuris',
        payload: 'Paddock A',
        payload_value: 'Fungicide'
      }, {
        status: 'complete',
        type: 'Task',
        date: '17 May',
        name: 'Yuris',
        payload: 'Paddock A',
        payload_value: '7FA000003'
      }, {
        status: 'complete',
        type: 'Task',
        date: '7 May',
        name: 'Yuris',
        payload: 'Paddock A',
        payload_value: 'Fungicide'
      }, {
        status: 'complete',
        type: 'Task',
        date: '2 May',
        name: 'Yuris',
        payload: 'Paddock A',
        payload_value: '7FA000003'
      }, {
        status: 'complete',
        type: 'Task',
        date: '27 April',
        name: 'Yuris',
        payload: 'Paddock B',
        payload_value: 'Fungicide'
      }, {
        status: 'complete',
        type: 'Task',
        date: '20 April',
        name: 'Yuris',
        payload: 'Paddock B',
        payload_value: '7FA000003'
      }
    ]
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setSelectedOrder: selectedOrder => {
      console.log('************************', selectedOrder);
      dispatch(actions.setSelectedOrder(selectedOrder));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);


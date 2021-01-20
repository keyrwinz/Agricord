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
  Alert.alert(
    `Redirect to ${obj.type}: ${obj.payload} ${obj.payload_value}`,
    '',
    [
      {text: 'OK', onPress: () => props.parentNav.navigate('orderDetailsStack')},
    ],
    {cancelable: false},
  );
  // if(Alert.alert(`Redirect to ${obj.type}: ${obj.payload} ${obj.payload_value}`)){
  //   console.log("true");
  //   props.parentNav.navigate('orderDetailsStack', {
  //       details: props,
  //   })
  // }else{
  //   console.log(false);
  // }
}


const Home = (props) => {
  const [isExpanded, setExpand] = useState(false)
  // const [InFocusArray, setInFOcus] = useState(InFocusData)
  // const [RecentEventsArray, setRecentEvents] = useState(RecentEvents)
  const [data, setData] = useState()
  const [totalRecentData, setTotalRecentData] = useState()
  const [totalTasksData, setTotalTasksData] = useState()
  const [totalOrderData, setTotalOrderData] = useState()
  const [totalActivities, setTotalActivities] = useState(0)
  // const totalRecentData = null
  

  useEffect(() => {
    // console.log(props.navigation);
    // console.log(props.parentNav.navigate('orderDetailsStack', {
    //   details: props.details,
    // }));
    const userInfo = props.state.user 
    if(userInfo === null){
      return
    }
    const parameter = {
        merchant_id: props.state.user.sub_account.merchant.id,
    }
    Api.request(Routes.dashboardRetrieve, parameter, res => {
      setData(res.data)
    })

    const recent = _.countBy(response.data.recent, (res) => {
      return ('recent');
    })
    setTotalRecentData(recent)
  
    const tasks = _.countBy(response.data.infocus, (infocus) => {
      return infocus.type == 'Task'
    })
    setTotalTasksData(tasks)
  
    const orders = _.countBy(response.data.infocus, (infocus) => {
      return infocus.type == 'Order'
    })
    setTotalOrderData(orders)
    const activities = recent.recent + tasks.true + orders.true
    setTotalActivities(activities)
    
  }, [])

  return response.data ?  (
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
                  <Text>{totalTasksData ? totalTasksData.true : 0} Task in Focus</Text>
                </View>
                <View style={[Style.flexRow, Style.graphLabel]}>
                  <BlueCircle style={{ marginRight: 10 }} />
                  <Text>{totalOrderData ? totalOrderData.true : 0} Order in Focus</Text>
                </View>
              </View>
            </View>
          </View>

          {/* IN FOCUS */}
          <View style={Style.InFocusContainer}>
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>In Focus</Text>
            {
              response.data.infocus.length && response.data.infocus.map((obj, idx) => {
                if (idx > 1 && !isExpanded) return
                const icon = getIcon(obj.type)
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
                            {obj.type}
                          </Text>
                          <Text style={[Style.eventText, { color: '#54BAEC' }]}>
                            {obj.created_at}
                          </Text>
                          <Text style={Style.eventText}>
                            {obj.name}
                          </Text>
                        </View>
                        <View style={Style.flexRow}>
                          <Text style={Style.taskPayloadText}>
                            {obj.payload}
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);


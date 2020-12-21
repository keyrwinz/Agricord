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

const Home = (props) => {
  const [isExpanded, setExpand] = useState(false)
  const [InFocusArray, setInFOcus] = useState(InFocusData)
  const [RecentEventsArray, setRecentEvents] = useState(RecentEvents)
  const [data, setData] = useState()
  const userDetail = props.state.user
  const [totalRecentData, setTotalRecentData] = useState()
  const [totalTasksData, setTotalTasksData] = useState()
  const [totalOrderData, setTotalOrderData] = useState()
  const [totalActivities, setTotalActivities] = useState()
  // const totalRecentData = null
  

  useEffect(() => {
    const userInfo = props.state.user 
    if(userInfo === null || userDetail == null){
      return
    }
    const parameter = {
        merchant_id: userDetail.sub_account.merchant.id,
    }
    Api.request(Routes.dashboardRetrieve, parameter, res => {
      setData(res.data)
    })

    const recent = _.countBy(RecentEventsArray, (res) => {
      return ('recent');
    })
    setTotalRecentData(recent)
  
    const tasks = _.countBy(InFocusArray, (infocus) => {
      return infocus.type = 'Task'
    })
    setTotalTasksData(tasks)
  
    const orders = _.countBy(InFocusArray, (infocus) => {
      return infocus.type = 'Order'
    })
    setTotalOrderData(orders)
  
    if(totalRecentData !== undefined && totalTasksData !== undefined && totalOrderData !== undefined){
      const activities = totalRecentData.recent + totalTasksData.Task + totalOrderData.Order
      setTotalActivities(activities)
    }

  }, [])

  
  return data ? (
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
              {/* Hi {userDetail.account_information !== null ? userDetail.account_information.first_name : userDetail.username} */}Hi
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
                  <Text style={Style.graphTextBold}>9</Text>
                  <Text style={Style.graphText}>Activity</Text>
                </View>
              </View>
              <View style={Style.chartDetails}>
                <Text style={{ color: Color.gray }}>
                  Overview Chart
                </Text>
                <View style={[Style.flexRow, Style.graphLabel]}>
                  <GreenCircle style={{ marginRight: 10 }} />
                  <Text>5 Recent Event</Text>
                </View>
                <View style={[Style.flexRow, Style.graphLabel]}>
                  <YellowCircle style={{ marginRight: 10 }} />
                  <Text>2 Task in Focus</Text>
                </View>
                <View style={[Style.flexRow, Style.graphLabel]}>
                  <BlueCircle style={{ marginRight: 10 }} />
                  <Text>2 Order in Focus</Text>
                </View>
              </View>
            </View>
          </View>

          {/* IN FOCUS */}
          <View style={Style.InFocusContainer}>
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>In Focus</Text>
            {
              data.length && data['infocus'].map((obj, idx) => {
                if (idx > 1 && !isExpanded) return
                const icon = getIcon(obj.type)
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => Alert.alert(`Redirect to ${obj.type}: ${obj.payload} ${obj.payload_value}`)}
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
                          size={25}
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
                size={25}
              />
            </TouchableOpacity>
          </View>

          {/* RECENT EVENTS */}

        <View style={Style.RecentEventsContainer}>
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>Recent Event</Text>
            {
              data.length && data['recent'].map((obj, idx) => {
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
                      idx + 1 === RecentEventsArray.length ? (
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
  ): 
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
              {/* Hi {userDetail.account_information !== null ? userDetail.account_information.first_name : userDetail.username} */}Hi
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
              InFocusData.length && InFocusData.map((obj, idx) => {
                if (idx > 1 && !isExpanded) return
                const icon = getIcon(obj.type)
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => Alert.alert(`Redirect to ${obj.type}: ${obj.payload} ${obj.payload_value}`)}
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
              RecentEvents.length && RecentEvents.map((obj, idx) => {
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
                      idx + 1 === RecentEventsArray.length ? (
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
}

const InFocusData = [{
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
}]

const RecentEvents = [{
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
}]

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);


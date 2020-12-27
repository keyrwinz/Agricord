import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-native-collapsible';
import styles from './Style';
import { NavigationActions, StackActions } from 'react-navigation';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { Helper, BasicStyles, Color } from 'common';
import Config from 'src/config.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import Pusher from 'services/Pusher.js';
import HouseIcon from '../../assets/drawer/profile/houseIcon.svg';

const TEST_DEV = true

class Slider extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: null,
    }
  }

  toggleExpanded = (route) => {
    if (route === this.state.collapsed) {
      this.setState({ collapsed: null });
      return
    }

    this.setState({ collapsed: route });
  };

  navigateToScreen = (route) => {
    this.props.navigation.toggleDrawer();

    // const navigateAction = NavigationActions.navigate({
    //   routeName: route
    // });
    // this.props.navigation.dispatch(navigateAction);
    // const { setActiveRoute } = this.props;
    // setActiveRoute(null)
    const { setSetting } = this.props;
    if(route == 'AppSettings'){
      setSetting(1)
    }else if(route == 'AccountSettings'){
      setSetting(0)
    }

    console.log('selectedroute', route)

    const navigateAction = NavigationActions.navigate({
      routeName: 'drawerStack',
      action: StackActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({routeName: route}),
        ]
      })
    });

    this.props.navigation.dispatch(navigateAction);
  }

  navigateToStack =(route) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  logoutAction(){
    //clear storage
    const { logout, setActiveRoute } = this.props;

    // unsubscribe pusher
    if (Pusher.pusher) {
      Pusher.pusher.unsubscribe(Helper.pusher.channel);
      Pusher.pusher = null
      Pusher.channel = null
    }

    logout();
    // setActiveRoute(null)
    this.props.navigation.navigate('loginStack');
  }

  footerAction(route){
    switch(route){
      case 'Logout': 
        this.logoutAction();
        break;
      case 'CompleteSprayTask':
        Alert.alert(route)
        break;
    }
  }

  render () {
    const { user, theme } = this.props.state;
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <View style={styles.titleContainer}>
                <View style={styles.topRightBox} />
                <TouchableOpacity onPress={() => this.navigateToScreen('Homepage')} style={styles.imageContainer}>
                  <Image
                    source={require('assets/logo.png')}
                    style={styles.LogoContainer}
                  />
                  <Image
                    source={require('assets/agricordLogo03.png')}
                    style={styles.TitleContainer}
                  />
                </TouchableOpacity>
              </View>
              {
                TEST_DEV ? (
                  <View style={styles.userContainer}>
                    <View style={styles.userContainer2}>
                      <View style={styles.userContainer3}>
                        <View style={styles.userInfoContainer}>
                          <View>
                          {
                            (user && user.account_profile && user.account_profile.url != null) && (
                              <Image
                                source={{uri: Config.BACKEND_URL  + user.account_profile.url}}
                                style={styles.userImage}
                              />
                            )
                          }
                          {
                            (user && (user.account_profile == null || (user.account_profile != null && user.account_profile.url == null))) && (
                              <FontAwesomeIcon
                                icon={faUserCircle}
                                size={80}
                                style={{
                                  color: Color.primary
                                }}
                              />
                            )
                          }
                            
                          </View>
                          <View style={styles.userInfo}>
                          {
                            user && (
                              <View>
                                <Text style={styles.userName}>
                                  {user.username}
                                </Text>
                                <Text style={styles.userEmail}>
                                  {user.email}
                                </Text>
                              </View>
                            )
                          }
                            
                            <View style={styles.extraIcons}>
                              <HouseIcon />
                              {
                                (user && user.sub_account && user.sub_account.merchant) && (
                                  <View style={styles.badgeContainer}>
                                    <Text style={styles.badgeText}>
                                      {user.sub_account.merchant.name}
                                    </Text>
                                  </View>
                                )
                              }
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : 
                /**
                 * IF USER LOGGED IN
                 */
                user != null ? (
                  <View style={[styles.sectionHeadingStyle, {
                    backgroundColor: theme ? theme.primary : Color.primary,
                  }]}>
                    {
                      user.account_profile != null && user.account_profile.url != null && (
                        <Image
                          source={{uri: Config.BACKEND_URL  + user.account_profile.url}}
                          style={[BasicStyles.profileImageSize, {
                            height: 100,
                            width: 100,
                            borderRadius: 50
                          }]}/>
                      )
                    }

                    {
                      (user.account_profile == null || (user.account_profile != null && user.account_profile.url == null)) && (
                        <FontAwesomeIcon
                          icon={faUserCircle}
                          size={100}
                          style={{
                            color: Color.white
                          }}
                        />
                      )
                    }
              
                    <Text 
                      style={{
                      color: Color.white,
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginTop: 10
                      }}
                    >
                      Hi {user.username}!
                    </Text>

                    {/* NOTIFICATION BUTTON */}
                    {/* <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Notification')
                      }}
                      style={{ width: '100%' }}
                    >
                      <View
                        style={{
                          width: '100%',
                          marginTop: 20,
                          marginBottom: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          paddingLeft: 15
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faBell}
                          size={20}
                          style={{ color: Color.white }}
                        />
                        <Text style={{ color: Color.white, marginHorizontal: 5 }}>
                          Notifications
                        </Text>
                      </View>
                    </TouchableOpacity> */}
                  </View>
                ) : (
                  /**
                   * IF NOT LOGGED IN
                   */
                  <View
                    style={[
                      styles.sectionHeadingStyle, {
                      alignItems: 'flex-start',
                      // backgroundColor: theme ? theme.primary : Color.primary
                    }]}
                  >
                    <TouchableOpacity
                      onPress={() => this.navigateToStack('loginStack')}>
                      <Text style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 20
                      }}>
                        Login or register
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              }

              {(user != null && Helper.DrawerMenu.length > 0) &&
                Helper.DrawerMenuLogout.map((item, index) => {
                  const notActiveStyle = this.state.collapsed !== item.route ? {
                    paddingBottom: 15
                  } : {}

                  const minCount = 2
                  let leftSectionCount = Math.ceil(item.subRoutes.length/2)
                  leftSectionCount = leftSectionCount < minCount ? minCount : leftSectionCount

                  const leftSubRoutes = []
                  const rightSubRoutes = []
                  const subRoutes = [...item.subRoutes]
                  subRoutes.map((sub, idx) => {
                    if (idx+1 <= leftSectionCount) {
                      leftSubRoutes.push(sub)
                    } else {
                      rightSubRoutes.push(sub)
                    }
                  })

                  return (
                    <View key={index} style={[styles.navSectionStyleNoBorder, notActiveStyle]}>
                      {
                        this.state.collapsed === item.route && (
                          <LinearGradient
                            colors={['#94D0AB', '#B7DBA1', '#D9E597']}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              height: '100%',
                              width: 15,
                            }}
                          >
                          </LinearGradient>
                        )
                      }
                      <TouchableOpacity
                        onPress={() => this.toggleExpanded(item.route)}
                        style={styles.drawerItem}
                      >
                        <View>
                        {
                          this.state.collapsed === item.route ? (
                            item.activeIcon
                          ) : (
                            item.defaultIcon
                          )
                        }
                        </View>
                        <Text
                          style={[
                            styles.navItemStyle, {
                            fontWeight: this.state.collapsed === item.route ? 'bold' : 'normal'
                          }]}
                        >
                          {item.title}
                        </Text>
                        <FontAwesomeIcon
                          icon={this.state.collapsed === item.route ? faChevronDown : faChevronRight}
                          style={styles.chevronIcon}
                        />
                      </TouchableOpacity>
                      <Collapsible collapsed={this.state.collapsed !== item.route} align="center">
                        <View style={{
                          position: 'relative',
                          width: '100%',
                          paddingHorizontal: 20,
                          paddingBottom: 15,
                          paddingTop: rightSubRoutes.length > 0 ? 15 : 0,
                          flexDirection: 'row',
                        }}>
                          {
                            rightSubRoutes.length > 0 && (
                              <View style={styles.sectionConnector} />
                            )
                          }
                          <View style={{ width: '50%', flexDirection: 'column' }}>
                            {
                              leftSubRoutes.length > 0 ? leftSubRoutes.map(data => (
                                <TouchableOpacity
                                  key={data.title}
                                  onPress={() => this.navigateToScreen(data.route)}
                                  style={styles.subRoutes}
                                >
                                  <View style={[styles.lineVerticalGraph, { height: Platform.OS === 'ios' ? '125%' : '118%' }]} />
                                  <View style={styles.lineHorizontalGraph} />
                                  <View style={[styles.bulletView]} />
                                  <Text style={styles.subRouteText}>
                                    {data.title}
                                  </Text>
                                </TouchableOpacity>
                              )) : null
                            }
                          </View>
                          <View style={{ width: '50%', flexDirection: 'column' }}>
                            {
                              rightSubRoutes.length > 0 ? rightSubRoutes.map((data, idx) => (
                                <TouchableOpacity
                                  key={data.title}
                                  onPress={() => this.navigateToScreen(data.route)}
                                  style={styles.subRoutes}
                                >
                                  <View
                                    style={[styles.lineVerticalGraph, {
                                      marginTop: idx === 0 ? 10 : 0,
                                      height: idx === 0 ? '90%' : Platform.OS === 'ios' ? '125%' : '118%'
                                    }]}
                                  />
                                  <View style={styles.lineHorizontalGraph} />
                                  <View style={styles.bulletView} />
                                  <Text style={styles.subRouteText}>
                                    {data.title}
                                  </Text>
                                </TouchableOpacity>
                              )) : null
                            }
                          </View>
                        </View>
                      </Collapsible>
                    </View>
                  )
                })
              }

              {(user == null && Helper.DrawerMenuLogout.length > 0) &&
                Helper.DrawerMenuLogout.map((item, index) => {
                  const notActiveStyle = this.state.collapsed !== item.route ? {
                    paddingBottom: 15
                  } : {}

                  const minCount = 2
                  let leftSectionCount = Math.ceil(item.subRoutes.length/2)
                  leftSectionCount = leftSectionCount < minCount ? minCount : leftSectionCount

                  const leftSubRoutes = []
                  const rightSubRoutes = []
                  const subRoutes = [...item.subRoutes]
                  subRoutes.map((sub, idx) => {
                    if (idx+1 <= leftSectionCount) {
                      leftSubRoutes.push(sub)
                    } else {
                      rightSubRoutes.push(sub)
                    }
                  })

                  return (
                    <View key={index} style={[styles.navSectionStyleNoBorder, notActiveStyle]}>
                      {
                        this.state.collapsed === item.route && (
                          <LinearGradient
                            colors={['#94D0AB', '#B7DBA1', '#D9E597']}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              height: '100%',
                              width: 15,
                            }}
                          >
                          </LinearGradient>
                        )
                      }
                      <TouchableOpacity
                        onPress={() => this.toggleExpanded(item.route)}
                        style={styles.drawerItem}
                      >
                        <View>
                        {
                          this.state.collapsed === item.route ? (
                            item.activeIcon
                          ) : (
                            item.defaultIcon
                          )
                        }
                        </View>
                        <Text
                          style={[
                            styles.navItemStyle, {
                            fontWeight: this.state.collapsed === item.route ? 'bold' : 'normal'
                          }]}
                        >
                          {item.title}
                        </Text>
                        <FontAwesomeIcon
                          icon={this.state.collapsed === item.route ? faChevronDown : faChevronRight}
                          style={styles.chevronIcon}
                        />
                      </TouchableOpacity>
                      <Collapsible collapsed={this.state.collapsed !== item.route} align="center">
                        <View style={{
                          position: 'relative',
                          width: '100%',
                          paddingHorizontal: 20,
                          paddingBottom: 15,
                          paddingTop: rightSubRoutes.length > 0 ? 15 : 0,
                          flexDirection: 'row',
                        }}>
                          {
                            rightSubRoutes.length > 0 && (
                              <View style={styles.sectionConnector} />
                            )
                          }
                          <View style={{ width: '50%', flexDirection: 'column' }}>
                            {
                              leftSubRoutes.length > 0 ? leftSubRoutes.map(data => (
                                <TouchableOpacity
                                  key={data.title}
                                  onPress={() => this.navigateToScreen(data.route)}
                                  style={styles.subRoutes}
                                >
                                  <View style={[styles.lineVerticalGraph, { height: Platform.OS === 'ios' ? '125%' : '118%' }]} />
                                  <View style={styles.lineHorizontalGraph} />
                                  <View style={[styles.bulletView]} />
                                  <Text style={styles.subRouteText}>
                                    {data.title}
                                  </Text>
                                </TouchableOpacity>
                              )) : null
                            }
                          </View>
                          <View style={{ width: '50%', flexDirection: 'column' }}>
                            {
                              rightSubRoutes.length > 0 ? rightSubRoutes.map((data, idx) => (
                                <TouchableOpacity
                                  key={data.title}
                                  onPress={() => this.navigateToScreen(data.route)}
                                  style={styles.subRoutes}
                                >
                                  <View
                                    style={[styles.lineVerticalGraph, {
                                      marginTop: idx === 0 ? 10 : 0,
                                      height: idx === 0 ? '90%' : Platform.OS === 'ios' ? '125%' : '118%'
                                    }]}
                                  />
                                  <View style={styles.lineHorizontalGraph} />
                                  <View style={styles.bulletView} />
                                  <Text style={styles.subRouteText}>
                                    {data.title}
                                  </Text>
                                </TouchableOpacity>
                              )) : null
                            }
                          </View>
                        </View>
                      </Collapsible>
                    </View>
                  )
                })
              }

              <View style={styles.navSectionStyleBorderTop}>
                {
                  Helper.DrawerMenuBottom.length > 0 && Helper.DrawerMenuBottom.map((item, index) => {
                    return (
                      <View key={index} style={styles.navSectionBottom} >
                        <View>{item.defaultIcon}</View>
                        <Text
                          style={styles.navItemStyle}
                          onPress={() => this.footerAction(item.route)}
                          // onPress={() => this.navigateToScreen(item.route)}
                        >
                          {item.title}
                        </Text>
                      </View>
                    )
                  })
                }
              </View>
            </View>
          </ScrollView>
          {
            /*
              <View style={styles.footerContainer}>
                <Text>A product of {Helper.company}</Text>
              </View> 
            */
          }
        </SafeAreaView>
      </View>
    );
  }
}

Slider.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    logout: () => dispatch(actions.logout()),
    setActiveRoute: (route) => dispatch(actions.setActiveRoute(route)),
    setSetting: (setting) => dispatch(actions.setSetting(setting)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider);

import React, {Component, useState} from 'react';
import Style from './Style.js';
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Spinner} from 'components';
import {connect} from 'react-redux';
import {Color, Routes, BasicStyles} from 'common';
import Api from 'services/api/index.js';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import {Divider} from 'react-native-elements';
import TaskButton from 'modules/generic/TaskButton.js';

class paddockPage extends Component {
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
    // const {data}=this.props.navigation.state.params.data
    // console.log(data)
    this.retrieveData();
  }

  retrieveData = () => {
    const {paddock, user} = this.props.state;
    if (paddock == null || user == null) {
      return;
    }

    this.setState({
      isLoading: true,
    });

    const parameter = {
      id: paddock.paddock_plan_task_id
    };
    console.log({
      paddock,
    });
    console.log(
      '[Paddock Page] parameter>>>>>>>>',
      Routes.paddocksRetrieveWithSprayMix,
      parameter,
    );
    Api.request(
      Routes.paddocksRetrieveWithSprayMix,
      parameter,
      response => {
        console.log('[RESPONSE====>>]', response);
        this.setState({
          isLoading: false,
        });
        if (response.data != null) {
          this.setState({
            data: response.data[0],
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
    const {paddock} = this.props.state;
    const {data} = this.state;
    console.log('[DATAS]:', data);
    console.log('[PADDOCK]:', paddock);
    return (
      <View style={Style.container}>
        {paddock && data && (
          <React.Fragment>
            <View style={Style.imageContainer}>
              {data.crop_name != null ? (
                <Image
                  style={Style.image}
                  source={
                    data.crop_name.toLowerCase() == 'field pea' || data.crop_name.toLowerCase() == 'chick pea' || data.crop_name.toLowerCase() == 'lentil' || data.crop_name.toLowerCase() == 'faba bean'
                      ? require('assets/FieldPea.png')
                      : data.crop_name.toLowerCase() == 'canola'
                      ? require('assets/Canola.png')
                      : data.crop_name.toLowerCase() == 'wheat' || data.crop_name.toLowerCase() == 'barley' || data.crop_name.toLowerCase() == 'oat' || data.crop_name.toLowerCase() == 'triticale'
                      ? require('assets/Wheat.png')
                      : data.crop_name.toLowerCase() == 'fallow' || data.crop_name.toLowerCase() == 'pasture'
                      ? require('assets/Fallow.png')
                      : require('assets/Canola.png')
                  }
                />
              ) : (
                <View />
              )}
            </View>
            <View style={Style.textContainer}>
              {/* <Text style={Style.text}>Field Pea</Text> */}
              <Text style={Style.text}>{data.crop_name}</Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: BasicStyles.standardFontSize,
                  color: Color.gray,
                }}>
                CROP
              </Text>
            </View>
            <Divider
              style={{
                width: '90%',
              }}
            />
            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // justifyContent: 'space-between',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
                <View style={{flexDirection: 'column', marginRight: '10%'}}>
                  <View style={[Style.label, {marginBottom: '10%'}]}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: Color.blue,
                      }}>
                      Status
                    </Text>
                    <Text>
                      {data.status === 'partially_completed'
                        ? 'Partially Complete'
                        : data.status === 'completed'
                        ? 'Complete'
                        : data.status === 'inprogress'
                        ? 'In Progress'
                        : 'Pending'}
                    </Text>
                  </View>
                  <View style={Style.label}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: Color.blue,
                      }}>
                      Task area
                    </Text>
                    <Text>
                      {data.spray_area}
                      {data.units}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <View style={{marginBottom: '10%'}}>
                    <Text style={{fontWeight: 'bold', color: '#5A84EE'}}>
                      Due Date
                    </Text>
                    <Text>{data.due_date}</Text>
                  </View>
                  <View>
                    <Text style={{fontWeight: 'bold', color: '#5A84EE'}}>
                      Paddock plan
                    </Text>
                    <Text>
                      Updated:{' '}
                      {data.last_updated !== null ? data.last_updated : 'N/A'}
                    </Text>
                  </View>
                </View>
            </View>
            {/* <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <View style={Style.label}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Color.blue,
                  }}>
                  Status
                </Text>
                <Text>
                  {data.status === 'partially_completed'
                    ? 'Partially Complete'
                    : data.status === 'completed'
                    ? 'Complete'
                    : data.status === 'inprogress'
                    ? 'In Progress'
                    : 'Pending'}
                </Text>
              </View>
              <View>
                <Text style={{fontWeight: 'bold', color: '#5A84EE'}}>
                  Due Date
                </Text>
                <Text>{data.due_date}</Text>
              </View>
            </View>
            <Divider
              style={[BasicStyles.starndardDivider, {marginBottom: 10}]}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <View style={Style.label}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Color.blue,
                  }}>
                  Task area
                </Text>
                <Text>
                  {data.spray_area}
                  {data.units}
                </Text>
              </View>
              <View>
                <Text style={{fontWeight: 'bold', color: '#5A84EE'}}>
                  Paddock plan
                </Text>
                <Text>
                  Updated:{' '}
                  {data.updated_date !== null ? data.updated_date : 'N/A'}
                </Text>
              </View>
            </View>
            <Divider
              style={[BasicStyles.starndardDivider, {marginBottom: 10}]}
            /> */}
          </React.Fragment>
        )}
      </View>
    );
  };

  renderMixCards = item => {
    const {paddock} = this.props.state;
    return item.spray_mix != null ? (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('mixNameStack', {
            data: item,
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
                Planned Mix
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
              {item.spray_mix.name}
            </Text>
          </View>
        </React.Fragment>
      </TouchableOpacity>
    ) : (
      <View>
        <Text>No Applied Mix Available</Text>
      </View>
    );
  };

  renderTaskData = item => {
    const {paddock} = this.props.state;
    return (
      item && (
        <TouchableOpacity
          // onPress={() => {
          //   this.props.navigation.navigate('detailsStack', {
          //     data: item,
          //   });
          // }}
          style={[Style.paddockContainer]}>
          <React.Fragment>
            <View style={[Style.focusTask]}>
              {/* <TaskFocusIcon /> */}
              <Image
                source={require('assets/focus_orange.png')}
                style={[Style.taskIcon]}
              />
              <View style={[Style.focusTaskDetails, {width: '80%'}]}>
                <View style={[Style.flexRow]}>
                  <Text style={[Style.eventText, {width: '25%'}]}>Due</Text>
                  <Text
                    style={[Style.eventText, {color: '#54BAEC', width: '25%'}]}>
                    {item.due_date_formatted}
                  </Text>
                  <Text
                    style={[
                      Style.eventText,
                      {
                        marginLeft: 20,
                        width: '50%',
                      },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.remaining_spray_area}ha
                  </Text>
                </View>
                <View style={(Style.flexRow, {marginLeft: 2})}>
                  <Text style={[Style.taskPayloadText, {fontSize: 15}]}>
                    {item?.nickname}
                  </Text>
                </View>
              </View>
            </View>
          </React.Fragment>
        </TouchableOpacity>
      )
    );
  };

  renderActualTask = item => {
    const {paddock} = this.props.state;
    console.log('=============', item.actual_tasks);
    return (
      item.actual_tasks.length > 0 &&
      item.actual_tasks.map(el => (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('detailsStack', {
              data: item,
              actuals: el,
            });
          }}
          style={[Style.paddockContainer]}>
          <React.Fragment>
            <View style={[Style.focusTask]}>
              <Image
                source={require('assets/focus_dark.png')}
                style={[Style.taskIcon]}
              />
              <View style={[Style.focusTaskDetails, {width: '85%'}]}>
                <View style={Style.flexRow}>
                  <Text style={[Style.eventText]}>
                    {el.status === 'completed'
                      ? 'Complete'
                      : el.status === 'inprogress'
                      ? 'In Progress'
                      : 'Due'}
                  </Text>
                  <Text
                    style={
                      ([Style.eventText], {color: '#54BAEC', marginLeft: 5})
                    }>
                    {el.date}
                  </Text>
                  <Text
                    style={[
                      Style.eventText,
                      {
                        marginLeft: 20,
                        width:
                          el.status === 'partially_completed' ? '35%' : '50%',
                      },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Session: {el.session}
                  </Text>
                </View>
                <View style={Style.flexRow}>
                  <Text style={[Style.taskPayloadText, {fontSize: 15}]}>
                    {item.name}({el.area}ha)
                  </Text>
                </View>
              </View>
            </View>
          </React.Fragment>
        </TouchableOpacity>
      ))
    );
  };

  render() {
    const {isLoading, data} = this.state;
    return (
      <ImageBackground
        source={require('assets/backgroundlvl1.png')}
        style={Style.BackgroundContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              alignItems: 'center',
              height: '100%',
              width: '90%',
              marginRight: '5%',
              marginLeft: '5%',
              marginBottom: 100,
              marginTop: 15,
            }}>
            {data && this.renderTopCard()}
            {data && this.renderMixCards(data)}
            {data && (data?.status !== 'completed' && data.status !== 'pending') && this.renderTaskData(data)}
            {data && data.actual_tasks.length > 0 && (data.status !== 'pending') && (
              <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: 'bold', marginRight: '70%'}}>
                  TASK ACTUALS
                </Text>
              </View>
            )}
            {data && (data.status !== 'pending') &&  this.renderActualTask(data)}
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
)(paddockPage);

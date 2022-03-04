import React, { Component } from 'react';
import Style from './Style.js';
import { View, Image, TouchableHighlight, TouchableOpacity, Text, ScrollView, TextInput} from 'react-native';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, ImageUpload, DateTime } from 'components';
import Api from 'services/api/index.js';
import Currency from 'services/Currency.js';
import { connect } from 'react-redux';
import Config from 'src/config.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import Picker from '@react-native-community/picker';
const height = Math.round(Dimensions.get('window').height);
const gender = [{
  title: 'Male',
  value: 'male'
}, {
  title: 'Female',
  value: 'female'
}, {
  title: 'Others',
  value: 'others'
}]
class Declaration extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      firstName: null,
      middleName: null,
      lastName: null,
      sex: null,
      cellularNumber: null,
      address: null,
      birthDate: null,
      id: null,
      isImageUpload: false,
      alert: {
        type: null,
        message: ''
      }
    }
  }

  componentDidMount(){
    this.retrieve()
  }

  retrieve = () => {
    const { user } = this.props.state;
    if(user === null){
      return
    }
    let parameter = {
      condition: [{
        value: user.id,
        clause: '=',
        column: 'account_id'
      }]
    }
    this.setState({
      isLoading: true, 
      showDatePicker: false
    })
    Api.request(Routes.accountInformationRetrieve, parameter, response => {
      this.setState({isLoading: false})
      if(response.data.length > 0){
        let data = response.data[0]
        this.setState({
          id: data.id,
          firstName: data.first_name,
          middleName: data.middle_name,
          lastName: data.last_name,
          sex: data.sex,
          cellularNumber: data.cellular_number,
          address: data.address,
          birthDate: data.birth_date
        })
        if(data.birth_date != null){
          this.setState({
            dateFlag: true,
            birthDateLabel: data.birth_date
          })
        }
      }else{
        this.setState({
          id: null,
          firstName: null,
          middleName: null,
          lastName: null,
          sex: null,
          cellularNumber: null,
          address: null,
          birthDate: new Date(),
        })
      }
    });
  }

  validate = () => {
    const { user } = this.props.state;
    if(user === null){
      return
    }
    let parameter = {
      id: this.state.id,
      account_id: user.id,
      first_name: this.state.firstName,
      middle_name: this.state.middleName,
      last_name: this.state.lastName,
      sex: this.state.sex,
      cellular_number: this.state.cellularNumber,
      address: this.state.address,
      birth_date: this.state.birthDate
    }
    this.setState({isLoading: true})
    Api.request(Routes.accountInformationUpdate, parameter, response => {
      this.setState({isLoading: false})
      if(response.data == true){
        this.retrieve()
        this.setState({
          isLoading: false,
          alert: {
            type: 'success',
            message: 'Updated successfully!'
          }
        })
      }
      this.profile_scrollview_ref.scrollTo({ x: 0, y: 0, animated: true })
    }, (error) => {
      this.setState({
        isLoading: false,
        alert: {
          type: 'warning',
          message: 'There is an error updating profile'
        }
      })
      this.profile_scrollview_ref.scrollTo({ x: 0, y: 0, animated: true })
    });
  }

  reloadProfile = () => {
    const { user, token } = this.props.state;
    if(user == null){
      return
    }
    let parameter = {
      condition: [{
        value: user.id,
        clause: '=',
        column: 'id'
      }]
    }
    this.setState({isLoading: true})
    Api.request(Routes.accountRetrieve, parameter, response => {
      this.setState({isLoading: false})
      const { updateUser } = this.props;
      updateUser(response.data[0])
    });
  }

  updateProfile = (url) => {
    const { user } = this.props.state;
    if(user == null){
      return
    }
    let parameter = {
      account_id: user.id,
      url: url
    }
    this.setState({isLoading: true})
    Api.request(Routes.accountProfileCreate, parameter, response => {
      this.reloadProfile()
      this.setState({
        isLoading: false,
        alert: {
          type: 'success',
          message: 'Updated successfully!'
        }
      })
    }, (error) => {
      this.setState({
        isLoading: false,
        alert: {
          type: 'warning',
          message: 'There is an error updating profile'
        }
      })
    });
  }

  _inputs = () => {
    const { userLedger, user, location } = this.props.state;
    const iOSGender = gender.map((item) => {
                        return {
                          label: item.title,
                          value: item.value
                        };
                      });
    return (
      <View>
        <View>
          <Text style={{
          }}>First Name</Text>
          <TextInput
            style={BasicStyles.formControlCreate}
            onChangeText={(firstName) => this.setState({firstName})}
            value={this.state.firstName}
            placeholder={'Enter first name'}
          />
        </View>
        <View>
          <Text style={{
          }}>Middle Name</Text>
          <TextInput
            style={BasicStyles.formControlCreate}
            onChangeText={(middleName) => this.setState({middleName})}
            value={this.state.middleName}
            placeholder={'Enter middle name'}
          />
        </View>
        <View>
          <Text style={{
          }}>Last Name</Text>
          <TextInput
            style={BasicStyles.formControlCreate}
            onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.lastName}
            placeholder={'Enter last name'}
          />
        </View>
        <View style={{
        }}>
          <Text>Gender</Text>
          {
            Platform.OS == 'android' && (
              <Picker selectedValue={this.state.sex}
                onValueChange={(sex) => this.setState({sex})}
                style={BasicStyles.pickerStyleCreate}
                >
                  {
                    gender.map((item, index) => {
                      return (
                        <Picker.Item
                        key={index}
                        label={item.title} 
                        value={item.value}/>
                      );
                    })
                  }
                </Picker>
            )
          }
          {
            Platform.OS == 'ios' && (
              <RNPickerSelect
                onValueChange={(sex) => this.setState({sex})}
                items={iOSGender}
                style={BasicStyles.pickerStyleIOSNoMargin}
                placeholder={{
                  label: 'Click to select',
                  value: null,
                  color: Color.primary
                }}
                />
            )
          }
        </View>
        <View>
          <Text style={{
            paddingTop: 10
          }}>Bith Date</Text>
          <DateTime
            type={'date'}
            placeholder={'Select Date'}
            onFinish={(date) => {
              this.setState({
                birthDate: date.date
              })
            }}
            style={{
              marginTop: 5
            }}
          />
        </View>
        <View>
          <Text style={{
          }}>Cellular Number</Text>
          <TextInput
            style={BasicStyles.formControlCreate}
            onChangeText={(cellularNumber) => this.setState({cellularNumber})}
            value={this.state.cellularNumber}
            placeholder={'Enter cellular number'}
          />
        </View>
        <View>
          <Text style={{
          }}>Address</Text>
          <TextInput
            style={BasicStyles.formControlCreate}
            onChangeText={(address) => this.setState({address})}
            value={this.state.address}
            placeholder={'Enter address'}
          />
        </View>
        <View style={{
          marginBottom: 100,
        }}>
          <TouchableHighlight style={{
                height: 50,
                backgroundColor: Color.primary,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}
              onPress={() => {
                this.validate()
              }}
              underlayColor={Color.gray}
                >
              <Text style={{
                color: Color.white,
                textAlign: 'center',
              }}>Update</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  render() {
    const { user } = this.props.state;
    const { isLoading, isImageUpload } = this.state;
    return (
      <ScrollView
        ref={ref => this.profile_scrollview_ref = ref}
        style={Style.ScrollView}
        onScroll={(event) => {
          if(event.nativeEvent.contentOffset.y <= 0) {
            if(this.state.isLoading == false){
              this.retrieve()
            }
          }
        }}
      >
        <View style={Style.MainContainer}>
          {
            user != null && (
               <View style={Style.sectionHeadingStyle}>
                <TouchableHighlight
                  onPress={() => {
                    this.setState({isImageUpload: true})
                  }}
                  underlayColor={Color.white}>
                  <View>
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
                            color: Color.primary
                          }}
                        />
                      )
                    }
                     {/* 
                      <Text  style={{
                        fontSize: 11,
                        textAlign: 'center'
                      }}>
                        Click to change
                      </Text>
                    */}
                  </View>
                </TouchableHighlight>

                <Text style={{
                  color: Color.primary,
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginTop: 15,
                }}>
                  Hi {user.username}!
                </Text>
                {
                  this.state.alert.type !== null && (
                    <View style={[
                      Style.alertMessage,
                      { backgroundColor: this.state.alert.type === 'success' ? Color.success : Color.warning }
                    ]}>
                      <Text style={{ color: Color.white }}>
                        { this.state.alert.message }
                      </Text>
                      <TouchableOpacity
                        style={{ position: 'absolute', top: 15, right: 10 }}
                        onPress={() => this.setState({ alert: { type: null, message: '' }})}
                      >
                        <FontAwesomeIcon
                          style={{ color: Color.white }}
                          icon={faTimesCircle}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                }
              </View>
            )
          }
          {
            this._inputs()
          }
        </View>
        {isLoading ? <Spinner mode="overlay"/> : null }
        {isImageUpload ? 
          <ImageUpload
            visible={isImageUpload}
            onSelect={(url) => {
              this.setState({isImageUpload: false, isLoading: false})
              this.updateProfile(url)
            }}
            onClose={() => {
              this.setState({isImageUpload: false, isLoading: false})
            }}/> : null}
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    setLedger: (ledger) => dispatch(actions.setLedger(ledger)),
    setUserLedger: (userLedger) => dispatch(actions.setUserLedger(userLedger)),
    updateUser: (user) => dispatch(actions.updateUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Declaration);

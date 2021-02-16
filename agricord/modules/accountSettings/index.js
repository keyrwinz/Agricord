import React, {Component} from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import Style from './Style.js';
import {Divider} from 'react-native-elements';
import Moment from 'moment';
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import FileSvg from 'assets/settings/file.svg';
import HouseSvg from 'assets/settings/house.svg';
import KeySvg from 'assets/settings/key.svg';
import LogoutSvg from 'assets/settings/logout.svg';

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      permissionLevel: '',
    };
  }

  componentDidMount() {
    const {user} = this.props.state;
    if (user != null) {
      this.setState({
        name: `${user.account_information.first_name} ${
          user.account_information.last_name
        }`,
        permissionLevel: user.sub_account.status,
      });
    }
  }

  render() {
    const { user } = this.props.state;
    return (
      <View style={{
        alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: 25
      }}>
        <View style={Style.productInfoContainer}>
          <View style={Style.cardInfo}>
            <View style={Style.HeadingContainer}>
              <FileSvg style={Style.ImageStyle}/>
              <Text style={Style.HeadingTextStyle}>Name</Text>
            </View>
            <View style={Style.DescriptionContainer}>
              {
                (user) && (
                  <Text style={Style.DescriptionTextStyle}>
                    {user.account_information.first_name != null && user.account_information.last_name != null ? `${user.account_information.first_name} ${user.account_information.last_name}` : user.username}
                  </Text>
                )
              }
            </View>
          </View>
          <Divider style={{height: 0.5, marginLeft: 10, marginRight: 10}} />
          <View style={Style.cardInfo}>
            <View style={Style.HeadingContainer}>
              <HouseSvg style={Style.ImageStyle}/>
              <Text style={Style.HeadingTextStyle}>Business Account</Text>
            </View>
            <View style={Style.DescriptionContainer}>
              {
                (user && user.sub_account && user.sub_account.merchant) && (
                  <Text style={Style.DescriptionTextStyle}>
                    {user.sub_account.merchant.name}
                  </Text>
                )
              }
            </View>
          </View>
          <Divider style={{height: 0.5, marginLeft: 10, marginRight: 10}} />
          <View style={Style.cardInfo}>
            <View style={Style.HeadingContainer}>
              <KeySvg style={Style.ImageStyle}/>
              <Text style={Style.HeadingTextStyle}>Permissions Level</Text>
            </View>
            <View style={Style.DescriptionContainer}>
            {
              (user && user.sub_account) && (
                <Text style={Style.DescriptionTextStyle}>
                  {user.sub_account.status}
                </Text>
              )
            }
              
            </View>
          </View>
          <Divider style={{height: 0.5, marginLeft: 10, marginRight: 10}} />
          <View style={Style.cardInfo}>
            <View style={Style.HeadingContainer}>
              <LogoutSvg style={Style.ImageStyle}/>
              <Text style={Style.HeadingTextStyle}>Last Login</Text>
            </View>
            <View style={Style.DescriptionContainer}>
              {
                (user && user.updated_at && (
                  <Text style={Style.DescriptionTextStyle}>{Moment(user.updated_at).format('D MMMM YYYY')}</Text>
                )
                )
              }
            </View>
          </View>
          <Divider style={{height: 0.5, marginLeft: 10, marginRight: 10}} />
        </View>
      </View>
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
)(AccountSettings);

import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import Style from './Style.js';
import Api from 'services/api/index.js'
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner } from 'components';
import TasksList from './TasksList.js'
import TaskButton from 'modules/generic/TaskButton.js';
import SearchIcon from 'assets/inventory/search_icon.svg';
import _ from 'lodash';


export const products = [{}];

class TasksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      limit: 5,
      offset: 0,
      numberOfPages: null,
      searchString: ''
    };   
  }
  

  async componentDidMount(){
    const { user } = this.props.state;
    if (user == null) {
      return
    }
    this.retrieve(true)
  }

  retrieve = (flag) => {
    const { user } = this.props.state;
    const { searchString } = this.state;
    this.setState({
      isLoading: true
    });
    var parameter = {}
    if(searchString != ''){
      parameter = {
        condition: [{
          column: 'session',
          value: '%' + searchString.toLowerCase() + '%',
          clause: 'like'
        }],
        limit: this.state.limit,
        offset: flag == true && this.state.offset > 0 ? (this.state.offset * this.state.limit) : this.state.offset,
        merchant_id: user.sub_account.merchant.id
      };
    }else{
      parameter = {
        condition: [{
          column: '',
          value: null,
          clause: ''
        }],
        limit: this.state.limit,
        offset: flag == true && this.state.offset > 0 ? (this.state.offset * this.state.limit) : this.state.offset,
        merchant_id: user.sub_account.merchant.id
      };
    }
    console.log('parameter', Routes.batchesRetrieveSession, parameter)
    Api.request(Routes.batchesRetrieveSession, parameter, response => {
      console.log('[asdfasdf]', response)
        this.setState({
          isLoading: false
        });
        if(response.data && response.data.length > 0){
          this.setState({
            data:   flag == false ? response.data : _.uniqBy([...this.state.data, ...response.data], 'id'),
            numberOfPages: parseInt(response.size / this.state.limit) + (response.size % this.state.limit ? 1 : 0),
            offset: flag == false ? 1 : (this.state.offset + 1)
          })
        }else{
          this.setState({
            data: flag == false ? [] : this.state.data,
            numberOfPages: null,
            offset: flag == false ? 0 : this.state.offset
          })
        }
      }, error => {
        this.setState({isLoading: false});
        console.log('ERROR HAPPENS', error);
      },
    );
  };
 
  render() {
    const { data, label, isLoading } = this.state;
    return (
      <View style={[Style.MainContainer, {
        backgroundColor: Color.containerBackground
      }]}>
        <View style={{
          marginTop: 25,
          marginLeft: '5%',
          width: '100%'
        }}>
          <Text style={{fontWeight: 'bold'}}>Unallocated Batches</Text>
        </View>
        <View style={[Style.searchbarContainer]}>
          <TextInput
            style={Style.searchbar}
            placeholder="Search by User or Session ID"
            placeholderTextColor={Color.gray}
            onChangeText={(str) => this.setState({searchString: str})}
          />
          <TouchableOpacity
            style={Style.searchIcon}
            onPress={() => {this.retrieve(false)}}
          >
            <SearchIcon height="50" width="52" />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: '5%', marginRight: '5%'}}>
          <TasksList navigation={this.props.navigation} data={data} from={label} loading={isLoading} retrieve={(flag) => this.retrieve(flag)}/>
        </View>
        <TaskButton navigation={this.props.navigation}/>
        {isLoading ? <Spinner mode="overlay" /> : null}
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
)(TasksPage);

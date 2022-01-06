import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {Thumbnail, List, ListItem, Separator} from 'native-base';
import {connect} from 'react-redux';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import Api from 'services/api/index.js';
import {Routes, Color, Helper, BasicStyles} from 'common';
import {Spinner, Empty, SystemNotification} from 'components';
import {
  MainCard,
  Feature,
  Card,
  MainFeature,
  PromoCard,
} from 'components/ProductThumbnail';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import {Divider} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PaddockCard from 'components/Products/thumbnail/PaddockCard.js';
import {products} from './data-test.js';
import TaskIcon from 'components/Products/TaskIcon.js';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class TasksList extends Component {
  constructor(props) {
    super(props);
  }

  getLabelByStatus(status){
    switch(status){
      case 'history': return 'COMPLETED';
      case 'due': return 'DUE DATE';
      case 'inprogress': return 'DUE DATE'
    }
  }
  render() {
    const { data, loading } = this.props;
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>||||||", data);
    return (
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={(event) => {
            let scrollingHeight = event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y
            let totalHeight = event.nativeEvent.contentSize.height
            if(event.nativeEvent.contentOffset.y <= 0) {
              if(loading == false){
                // this.retrieve(false)
              }
            }
            if(scrollingHeight >= (totalHeight)) {
              if(loading == false){
                this.props.retrieve(true)
              }
            }
          }}
          >
          <View style={[
            Style.MainContainer, 
            { 
              minHeight: height,
              marginBottom: 200
            }]}>
            {
              !loading && (
                <View style={{
                  marginTop: 25,
                  width: '100%'
                }}>
                  <Text style={{fontWeight: 'bold'}}>Paddocks</Text>
                </View>
              )
            }
            
            {
              data != null && data.length ? data.map((item, idx) => {
                return (
                  <PaddockCard item={{
                      ...item,
                      from: this.props.from,
                      origStatus: item.batch_status !== null ? item.batch_status : item.task_status,
                      status: this.getLabelByStatus(this.props.from)
                    }}
                    key={item.id}
                    navigation={this.props.navigation}
                  />
                )}) : (
                  <Text style={{ marginTop: 10 }}>{ loading ? '' : 'No paddock found'}</Text>
                )
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setPaddock: (paddock) => dispatch(actions.setPaddock(paddock)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TasksList);

import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import Style from './Style.js';
import SessionCard from 'components/Products/thumbnail/SessionCard.js';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class TasksList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, loading } = this.props;
    return (
      <SafeAreaView>
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
              marginBottom: 300
            }]}>
            
            {
              data != null && data.length ? data.map((item, idx) => {
                return (
                  <SessionCard item={{
                      ...item,
                      from: this.props.from,
                      origStatus: item.batch_status !== null ? item.batch_status : item.task_status
                    }}
                    key={item.id}
                    navigation={this.props.navigation}
                  />
                )}) : (
                  <Text style={{ marginTop: 10 }}>{ loading ? '' : 'No unallocated batches found'}</Text>
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

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Switch from 'react-native-customisable-switch';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Color } from 'common';
import MixCard from './mixCard';
import Style from './Style.js';

const width = Math.round(Dimensions.get('window').width);

const availablePaddocks = [
  {
    id: 1,
    paddock: 'A',
    crop: 'WHEAT',
    area: '52ha',
    remaining_area: '52ha'
  },
  {
    id: 2,
    paddock: 'B',
    crop: 'WHEAT',
    area: '62ha',
    remaining_area: '62ha'
  },
  {
    id: 3,
    paddock: 'C',
    crop: 'WHEAT',
    area: '72ha',
    remaining_area: '72ha'
  },
  {
    id: 4,
    paddock: 'D',
    crop: 'WHEAT',
    area: '82ha',
    remaining_area: '82ha'
  },
  {
    id: 5,
    paddock: 'E',
    crop: 'WHEAT',
    area: '92ha',
    remaining_area: '92ha'
  },
]

const MixPage = (props) => {

  const carouselRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [appRateSwitch, setAppRateSwitch] = useState(false)
  const [availablePaddockIndex, setAvailablePaddockIndex] = useState(0)
  const [selectedPaddockIndex, setSelectedPaddockIndex] = useState(0)

  // THIS IS A FIX FOR NOT RENDERING THE PADDOCK CARDS ONCE THIS COMPONENT IS MOUNTED
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 100)
  }, [])

  if (loading) return null

  return (
    <SafeAreaView style={{ flex: 1, position: 'relative' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={Style.ScrollView}>

        {/* AVAILABLE PADDOCKS */}
        <View>
          <Text style={Style.textHeader}>Available Paddocks</Text>
          <View style={{ alignItems: 'center', position: 'relative' }}>
            <Carousel
              layout={"default"}
              ref={carouselRef}
              data={availablePaddocks}
              sliderWidth={width}
              itemWidth={width * 0.8}
              activeDo
              renderItem={(data) => (
                <MixCard data={data} hasCheck={false} />
              )}
              onSnapToItem = { index => setAvailablePaddockIndex(index) }
            />
            <Text style={{
              position: 'absolute',
              bottom: -20,
              left: '12%',
              fontSize: 10,
              color: '#C0C0C0',
              width: 100
            }}>
              Drag Paddock tile to Appliction Box
            </Text>
            <Pagination
              dotsLength={availablePaddocks.length}
              activeDotIndex={availablePaddockIndex}
              containerStyle={{ 
                width: '50%',
                position: 'absolute',
                bottom: -40,
              }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: -5,
                backgroundColor: '#5A84EE'
              }}
              inactiveDotStyle={{
                backgroundColor: '#C4C4C4'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
        </View>

        {/* SELECTED PADDOCKS */}
        <View style={{ marginTop: 15 }}>
          <Text style={Style.textHeader}>Selected Paddocks</Text>
          <View style={{ alignItems: 'center', position: 'relative' }}>
            <Carousel
              layout={"default"}
              ref={carouselRef}
              data={availablePaddocks}
              sliderWidth={width}
              itemWidth={width * 0.8}
              renderItem={(data) => (
                <MixCard data={data} hasCheck={true} />
              )}
              onSnapToItem = { index => setSelectedPaddockIndex(index) }
            />
            <Pagination
              dotsLength={availablePaddocks.length}
              activeDotIndex={selectedPaddockIndex}
              containerStyle={{ 
                width: '50%',
                position: 'absolute',
                bottom: -40,
              }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: -5,
                backgroundColor: '#5A84EE'
              }}
              inactiveDotStyle={{
                backgroundColor: '#C4C4C4'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
        </View>

        {/* CHECK ICON */}
        <View style={Style.checkBar}>
          <View style={Style.checkBox}>
            <FontAwesomeIcon
              icon={faCheck}
              size={30}
              color={'#fff'}
            />
          </View>
        </View>

        {/* APPLICATION RATE */}
        <View style={[Style.mixCardContainer, { marginVertical: 40, height: 210 }]}>
          <View style={
            [ Style.mixTitle, 
            { borderBottomWidth: 3, borderBottomColor: '#9AD267' }]
          }>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[Style.textBold, { marginRight: 5, fontSize: 15 }]}>
                Application rate
              </Text>
              <FontAwesomeIcon
                size={16}
                icon={faCheckCircle}
                color={'#BBF486'}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: -15 }}>
              <Text style={{ fontSize: 12, marginRight: 3 }}>Last Load?</Text>
              <Switch
                value={appRateSwitch}
                onChangeValue={() => setAppRateSwitch(!appRateSwitch)}
                activeText={'ON'}
                inactiveText={'OFF'}
                fontSize={16}
                activeTextColor={'rgba(255, 255, 255, 1)'}
                inactiveTextColor={'rgba(255, 255, 255, 1)'}
                activeBackgroundColor={'#9AD267'}
                inactiveBackgroundColor={'#C6C6C6'}
                activeButtonBackgroundColor={'rgba(255, 255, 255, 1)'}
                inactiveButtonBackgroundColor={'#F2F2F2'}
                switchHeight={25}
                switchBorderRadius={5}
                buttonWidth={30}
                buttonHeight={20}
                buttonBorderRadius={5}
                animationTime={150}
                padding={true}
              />
            </View>
          </View>
          <View style={[Style.mixDetails, { flexDirection: 'column' }]}>
            <View style={Style.appliedRate}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <LinearGradient
                  colors={['#ABD770', '#D3E584']}
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 7.5,
                    marginRight: 5
                  }}
                />
                <Text>Applied Rate</Text>
              </View>
              <View>
                <Text style={Style.textBold}>65/Ha</Text>
              </View>
            </View>
            <View style={{ width: '100%', flex: 1, alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <View style={Style.totalAreaBox}>
                  <Text>64Ha</Text>
                  <Text style={{ color: '#5A84EE', fontWeight: 'bold' }}>
                    TOTAL AREA
                  </Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <View style={Style.appliedPaddock}>
                    <Text style={Style.appliedPaddockText}>
                      Paddock A
                    </Text>
                    <FontAwesomeIcon size={12} icon={faTimesCircle} color={'#094EFF'} />
                  </View>
                  <View style={Style.appliedPaddock}>
                    <Text style={Style.appliedPaddockText}>
                      Paddock C
                    </Text>
                    <FontAwesomeIcon size={12} icon={faTimesCircle} color={'#094EFF'} />
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: '#5A84EE', fontWeight: 'bold' }}>
                  MAX AREA: 90HA
                </Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
const mapStateToProps = state => ({state: state});
const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MixPage);

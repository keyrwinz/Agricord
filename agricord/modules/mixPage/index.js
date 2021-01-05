import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Switch from 'react-native-customisable-switch';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faCheckCircle, faTimesCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Color, BasicStyles } from 'common';
import MixCard from './mixCard';
import Style from './Style.js';
import SlidingButton from 'modules/generic/SlidingButton';
import MixConfirmationModal from 'modules/modal/MixConfirmation'; 

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
  const [loading, setLoading] = useState(false)
  const [scanProductFlag, setScanProductFlag] = useState(true)
  const [selectedFlag, setSelectedFlag ] = useState(false)
  const [appRateSwitch, setAppRateSwitch] = useState(false)
  const [availablePaddockIndex, setAvailablePaddockIndex] = useState(0)
  const [selectedPaddockIndex, setSelectedPaddockIndex] = useState(0)
  const [mixConfirmation, setMixConfirmation] = useState(false)
  const [selectedPaddock, setSelectedPaddock] = useState([])

  // THIS IS A FIX FOR NOT RENDERING THE PADDOCK CARDS ONCE THIS COMPONENT IS MOUNTED
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 100)
  }, [])

  if (loading) return null

  const redirect = (route) => {
    const { task } = props.state;
    props.setTask({
      ...task,
      data: selectedPaddock,
      params: {
        volume: 120,
        units: 'L',
        area: 64,
        area_units: 'HA'
      }
    })
    setTimeout(() => {
      setMixConfirmation(false)
      props.navigation.navigate(route)
    }, 100)
  }

  return (
    <SafeAreaView style={{ flex: 1, position: 'relative', backgroundColor:  Color.containerBackground}}>
      <ScrollView showsVerticalScrollIndicator={false} style={Style.ScrollView}>

        {/* AVAILABLE PADDOCKS */}
        <View style={{
            marginTop: 15
          }}>
          <Text style={Style.textHeader}>Available Paddocks</Text>
          <View style={{ alignItems: 'center', position: 'relative' }}>
            <Carousel
              layout={"default"}
              ref={carouselRef}
              data={availablePaddocks}
              sliderWidth={width}
              itemWidth={width * 0.9}
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

        {/* APPLICATION RATE */}
        <View style={[
          Style.mixCardContainer,
          {
            marginTop: 40,
            minHeight: 50,
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%'
          }]
        }>
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
          {
            (selectedPaddock.length > 0) && (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  width: '100%',
                  backgroundColor: selectedFlag ? '#676767' : Color.blue,
                  borderBottomLeftRadius: BasicStyles.standardBorderRadius,
                  borderBottomRightRadius: BasicStyles.standardBorderRadius,
                }}
                onPress={() => setSelectedFlag(selectedFlag ? false : true) }
                >
                  <Text style={{
                    fontSize: BasicStyles.standardTitleFontSize,
                    fontWeight: 'bold',
                    paddingTop: 10,
                    paddingBottom: 10,
                    color: Color.white
                  }}>
                    {
                      selectedFlag ? 'Hide paddock details' : 'Show paddock details'
                    }
                  </Text>
              </TouchableOpacity>
            )
          }
        </View>

        {/* SELECTED PADDOCKS */}
        {
          (selectedFlag && selectedPaddock.length > 0 )&& (
            <View style={{
              marginBottom: 100
            }}>
              <Text style={Style.textHeader}>Selected Paddocks</Text>
              <View style={{ alignItems: 'center', position: 'relative' }}>
                <Carousel
                  layout={"default"}
                  ref={carouselRef}
                  data={selectedPaddock}
                  sliderWidth={width}
                  itemWidth={width * 0.9}
                  renderItem={(data) => (
                    <MixCard data={data} hasCheck={true} />
                  )}
                  onSnapToItem = { index => setSelectedPaddockIndex(index) }
                />
                <Pagination
                  dotsLength={selectedPaddock.length}
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
          )
        }

        {
          /*
            <TouchableOpacity
              style={{
                marginBottom: 100,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 25
              }}
              onPress={() => setSelectedFlag(selectedFlag ? false : true)}
              >
              <FontAwesomeIcon
                icon={selectedFlag ? faChevronUp : faChevronDown}
                size={50}
                color={Color.white}
                />
            </TouchableOpacity>
          */
        }



      </ScrollView>
      {
        scanProductFlag && (
          <SlidingButton
            title={'Create Batch'}
            label={'Swipe Right'}
            onSuccess={() => setMixConfirmation(true)}
          />
        )
      }

      {
        (mixConfirmation) && (
          <MixConfirmationModal
            visible={mixConfirmation}
            onClose={() => setMixConfirmation(false)}
            onSuccess={() => redirect('batchStack')}
            data={selectedPaddock}
            volume={'BATCH 64HA 4, 160 L'}
          />
        )
      }
    </SafeAreaView>
  );
}
const mapStateToProps = state => ({state: state});
const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setTask: (task) => dispatch(actions.setPaddock(task)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MixPage);

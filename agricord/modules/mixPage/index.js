import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Button,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Switch from 'react-native-customisable-switch';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faCheckCircle, faTimesCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Color, BasicStyles, Routes  } from 'common';
import MixCard from './mixCard';
import Style from './Style.js';
import SlidingButton from 'modules/generic/SlidingButton';
import MixConfirmationModal from 'modules/modal/MixConfirmation';
import Draggable from 'react-native-draggable';
import { Spinner } from 'components';
import Styles from 'modules/generic/OrderCardStyle';
import Api from 'services/api/index.js';
import Message from 'modules/modal/MessageModal.js';
import _ from 'lodash'
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

const availablePaddocks = [
  {
    id: 1,
    name: 'A5',
    crop: 'WHEAT',
    area: 5,
    unit: 'ha',
    remaining_area: 5,
    partial: false,
    partial_flag: true
  },
  {
    id: 2,
    name: 'B6',
    crop: 'WHEAT',
    area: 6,
    unit: 'ha',
    remaining_area: 6,
    partial: false,
    partial_flag: false
  },
  {
    id: 3,
    name: 'C7',
    crop: 'WHEAT',
    area: 7,
    unit: 'ha',
    remaining_area: 7,
    partial: false,
    partial_flag: false
  },
  {
    id: 4,
    name: 'D8',
    crop: 'WHEAT',
    area: 8,
    unit: 'ha',
    remaining_area: 8,
    partial: false,
    partial_flag: false
  },
  {
    id: 5,
    name: 'E9',
    crop: 'WHEAT',
    area: 9,
    unit: 'ha',
    remaining_area: 9,
    partial: false,
    partial_flag: false
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
  const [totalArea, setTotalArea] = useState(0)
  const [paddocks, setPaddocks] = useState([])
  const [maxArea, setMaxArea] = useState(0)
  const [totalRates, setTotalRate] = useState(0)
  const [appliedRate, setAppliedRate] = useState(0)
  const [message, setMessage] = useState(false)
  const [totalHigher, setTotalHigher] = useState(false)
  const [test, setTest] = useState(0)
  const [avail, setAvail] = useState([])
  const [partialss, setPartial] = useState(true)
  const [checkMard, setCheckMark] = useState(true)
  const [onLastLoad, setOnLastLoad] = useState(false)
  const [maxPartial, setMaxValue] = useState(0)
  const [partialVal, setPartialVal] = useState(0)
  const [appliedArea, setAppliedArea] = useState(0)
  const [mixCount, setMixCount] = useState(0)
  const [counts, setCounts] = useState(0)
  const { task } = props.state;

  // THIS IS A FIX FOR NOT RENDERING THE PADDOCK CARDS ONCE THIS COMPONENT IS MOUNTED
  useEffect(() => {
    setTimeout(() => {
      const { task } = props.state;
      setLoading(false)
      setMaxArea(parseFloat(task.machine.capacity / task.spray_mix.application_rate).toFixed(2))
      retrieve()
      setAppliedRate(Math.round(task.spray_mix.application_rate))
      // setSelectedPaddock(selectedPaddock.filter(el => {
      //   el.remaining_spray_area = el.spray_areas;
      //   return el;
      // }))
    }, 100)
  }, [])

  const newRates = () => {
    setCounts(counts + 1)
    const { task } = props.state;
    if(counts >= 1){
      console.log('[stop]')
    }else{
      const capacity = Math.floor(parseFloat(task.machine.capacity / totalArea).toFixed(2))
      const max = parseFloat(task.spray_mix.maximum_rate).toFixed(2)
      const min = parseFloat(task.spray_mix.minimum_rate).toFixed(2)
      if((Number(capacity) <= Number(max)) && (Number(capacity) >= Number(min))){
        setOnLastLoad(true)
        setMessage(false)
        setSelectedPaddock(selectedPaddock.filter(el => {
          el.spray_areas = el.remaining_spray_area - el.spray_areas;
          return el;
        }))
      }else {
        setMessage(true)
      }
    }
    // if(parseFloat(task.machine.capacity / test).toFixed(2) >= totalArea){
    //   setTotalArea(totalArea)
    //   setMaxArea(parseFloat(task.machine.capacity / test).toFixed(2))
    //   setTotalHigher(false)
    //   setAppRateSwitch(test)
    // }else{
    //   setTotalArea(totalArea)
    //   setMessage(true)
    //   setAppRateSwitch(test)
    //   setMaxArea(parseFloat(task.machine.capacity / test).toFixed(2))
    // }
  }

  const onload = (data) => {
    const { task } = props.state;
    setTimeout(() => {
      setAppRateSwitch(!appRateSwitch)
      if(!appRateSwitch){
        setTimeout(() => {
          setSelectedPaddock(selectedPaddock.filter(el => {
            el.partial_flag = false;
            return el;
          }))
          removePaddock('available', data)
        }, 100)
        // data[data.length - 1].partial_flag = false
        setTotalArea(totalArea)
        setTest(Math.round(parseFloat(task.machine.capacity / totalArea).toFixed(2)))
        setMaxArea(parseFloat(task.machine.capacity / task.spray_mix.minimum_rate).toFixed(2))
        setAppliedRate(Math.floor(parseFloat(task.machine.capacity / Number(totalArea)).toFixed(2)))
        if(test == 0 || test == '' || test == '0'){
          setMaxArea(parseFloat(task.machine.capacity / task.spray_mix.minimum_rate).toFixed(2))
        }else{
          setAppliedRate(Math.floor(parseFloat(task.machine.capacity / Number(totalArea)).toFixed(2)))
          setMaxArea(parseFloat(task.machine.capacity / task.spray_mix.minimum_rate).toFixed(2))
          // setMaxArea(parseFloat(task.machine.capacity / parseInt(test)).toFixed(2))
        }
        // const capacity = Math.round(parseFloat(task.machine.capacity / totalArea).toFixed(2))
        // const max = parseFloat(task.spray_mix.maximum_rate).toFixed(2)
        // const min = parseFloat(task.spray_mix.minimum_rate).toFixed(2)
        // if((Number(capacity) <= Number(max)) && (Number(capacity) >= Number(min))){
        //   setMessage(false)
        // }else {
        //   setMessage(true)
        // }
      }else{
        // data[data.length - 1].partial_flag = true
        setCounts(0)
        setTotalArea(totalArea)
        setMaxArea(parseFloat(task.machine.capacity / task.spray_mix.application_rate).toFixed(2))
        setAppliedRate(Math.round(task.spray_mix.application_rate))
        if(parseFloat(task.machine.capacity / task.spray_mix.application_rate).toFixed(2) > parseFloat(totalArea)){
          setTotalHigher(false)
        }else if((parseFloat(task.machine.capacity / task.spray_mix.application_rate).toFixed(2)) == totalArea){
          setTotalHigher(true)
        }else{
          setSelectedPaddock(selectedPaddock.filter(el => {
            el.partial_flag = true;
            el.spray_areas = el.remaining_spray_area;
            // el.remaining_spray_area = el.spray_area;
            return el;
          }))
          setTotalHigher(true)
        }
      }
    }, 25)
  }

  const closeModal = () =>{
    const { task } = props.state;
    setCounts(0)
    setMessage(false)
    setPartial(partialss == false)
    setAppRateSwitch(!appRateSwitch)
    setTotalArea(totalArea)
    setAppliedRate(Math.round(task.spray_mix.application_rate))
    setMaxArea(parseFloat(task.machine.capacity / task.spray_mix.application_rate).toFixed(2))
    let partVal = _.sumBy(selectedPaddock, function(e){
      return Number(e.remaining_spray_area)
      // return Number(e.spray_area)
    })
    if(partVal > parseFloat(task.machine.capacity / task.spray_mix.application_rate).toFixed(2)){
      setSelectedPaddock(selectedPaddock.filter(el => {
        el.partial_flag = true;
        return el;
      }))
    }else{
      setSelectedPaddock(selectedPaddock.filter(el => {
        el.partial_flag = false;
        return el;
      }))
    }
    if(Number(parseFloat(task.machine.capacity / task.spray_mix.application_rate).toFixed(2)) >= Number(totalArea)){
      setTotalHigher(false)
    }else{
      setTotalHigher(true)
    }
  }

  const closePar = () => {
    setCounts(0)
    setCheckMark(true)
    setMessage(false)
    setPartial(false)
    setTotalHigher(false)
  }
 
  const retrieve = () => {
    const { task, user } = props.state;
    if (user == null || task == null || (task && task.spray_mix == null)) {
      return
    }
    const parameter = {
      merchant_id: user.sub_account.merchant.id,
      spray_mix_id: task.spray_mix.id 
    }
    setLoading(true)
    Api.request(Routes.paddockPlanTasksRetrieveAvailablePaddocks, parameter, response => {
      setLoading(false)
      if(Array.isArray(response) == true){
        setPaddocks(response)
      }else{
        setPaddocks(response.data)
        setAvail(response.data)
      }
      // if(response.data !== null && response.length > 0){
      //   setPaddocks(response.data)
      //   setAvail(response.data)
      //   console.log('[retrieveddd]');
      //   }else{
      //     setPaddocks([])
      //   }
      },
      error => {
        setLoading(false)
        setPaddocks([])
        console.log({error});
      },
    );
  }

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
      props.navigation.navigate(route, {max_area: maxArea, application_rate: appliedRate})
    }, 100)
  }

  const loadSwitch = () => {
    console.log('disabled')
  }

  const removePaddock = (from, item) => {
    const { task } = props.state;
    setCounts(0)
    setCheckMark(true)
    item.partial = false
    // setTotalArea(item.area + totalArea)
    if(from == 'selected'){
      var counter = 0
      selectedPaddock.map(count => {
        if(count.partial === true){
          counter += 1
        }
      })
      setSelectedPaddock(selectedPaddock.filter(el => {
        if(el.partial == false && item.partial == false && appRateSwitch == true){
          setAppliedRate(Math.floor(parseFloat(task.machine.capacity / (Number(totalArea) - parseFloat(item.remaining_spray_area))).toFixed(2)))
          let diff = parseFloat(totalArea - item.remaining_spray_area).toFixed(2)
          setTotalArea(Number(diff))
          if(Number(parseFloat(totalArea - item.remaining_spray_area).toFixed(2)) > maxArea){
            setTotalHigher(true)
          }else{
            setAppRateSwitch(false)
            setMaxArea(parseFloat(task.machine.capacity / task.spray_mix.application_rate).toFixed(2))
            setAppliedRate(task.spray_mix.application_rate)
            if(Number(parseFloat(totalArea - item.remaining_spray_area).toFixed(2)) > parseFloat(task.machine.capacity / task.spray_mix.application_rate).toFixed(2)){
              setTotalHigher(true)
              setSelectedPaddock(selectedPaddock.filter(el => {
                el.partial_flag = true;
                return el;
              }))
            }else{
              setTotalHigher(false)
            }
          }
        }else if(mixCount > 0 && item.partial_flag === true){
          setSelectedPaddock(selectedPaddock.filter(el => {
            if(counter > 0){
              item.partial_flag = false
              item.partial = false
              el.partial_flag = false,
              item.spray_areas = item.remaining_spray_area
              // el.remaining_spray_area = el.spray_areas
              // item.remaining_spray_area = item.spray_area,
              // el.spray_area = el.remaining_spray_area
              return el;
            }else{
              item.partial = false,
              item.partial_flag = false,
              el.partial_flag = false,
              // item.remaining_spray_area = item.spray_areas,
              el.spray_areas = el.remaining_spray_area
              // item.spray_area = item.remaining_spray_area,
              // el.remaining_spray_area = el.spray_area
              return el;
            }
          }))
        }else if(el.partial == false && item.partial == false){
          let diff = parseFloat(totalArea - item.remaining_spray_area).toFixed(2)
          setTotalArea(Number(diff))
          if(Number(parseFloat(totalArea - item.remaining_spray_area).toFixed(2)) > maxArea){
            setTotalHigher(true)
            setSelectedPaddock(selectedPaddock.filter(el => {
              el.partial_flag = true;
              return el;
            }))
          }else{
            setSelectedPaddock(selectedPaddock.filter(el => {
              el.partial_flag = false;
              el.spray_areas = el.remaining_spray_area;
              // el.remaining_spray_area = el.spray_area;
              return el;
            }))
          }
        }else if(el.partial == true && item.partial == false){
          setSelectedPaddock(selectedPaddock.filter(el => {
            el.spray_areas = el.remaining_spray_area;
            // el.remaining_spray_area = el.spray_area;
            return el;
          }))
          let diff = parseFloat(totalArea - item.remaining_spray_area).toFixed(2)
          setTotalArea(Number(diff))
          if(Number(parseFloat(totalArea - item.remaining_spray_area).toFixed(2)) > maxArea){
            setTotalHigher(true)
            setSelectedPaddock(selectedPaddock.filter(el => {
              el.partial_flag = true;
              el.partial = false;
              return el;
            }))
          }else{
            setTotalHigher(false)
            setSelectedPaddock(selectedPaddock.filter(el => {
              el.partial_flag = false;
              el.partial = false;
              return el;
            }))
          }
        }
        return el;
      }))
      // setSelectedPaddock(selectedPaddock.filter(el => {
        //   el.partial_flag = false;
        //   return el;
        // }))
      const newSelectedPaddock = selectedPaddock.filter((paddock, idx) => {
        if(paddock.id != item.id){
          return item
        }
      })
      // let diff = parseFloat(totalArea - item.remaining_spray_area).toFixed(2)
      // setTotalArea(Number(diff))
      // setTotalArea(totalArea - item.area)
      // setTotalArea(totalArea - item.remaining_area)
      if(selectedPaddock.length <= 1 && appRateSwitch){
        setAppRateSwitch(!appRateSwitch)
        setTotalArea(0)
        setMaxArea(parseFloat(task.machine.capacity / task.spray_mix.application_rate).toFixed(2))
      }
      if(selectedPaddock.length <= 1 && checkMard == false){
        setAppRateSwitch(appRateSwitch)
        setTotalArea(0)
        setMaxArea(parseFloat(task.machine.capacity / task.spray_mix.application_rate).toFixed(2))
      }
      // if((totalArea - parseInt(item.remaining_spray_area)) > Number(maxArea)){
        //   setTotalHigher(true)
        // }else {
          //   setTotalHigher(false)
          // }
      setSelectedPaddock(newSelectedPaddock)
      // setPaddocks([...paddocks, ...[item]])
      avail.forEach(el => {
        if(el.id == item.id){
          setPaddocks([...paddocks, ...[item]])
        }
      })
    }else{
      const newPaddocks = paddocks.filter((paddock, idx) => {
        if(paddock.id != item.id){
          return item
        }
      })
      setPaddocks((newPaddocks != null && newPaddocks.length > 0) ? newPaddocks : [])
    }
  }
        
        
  const getTotalArea = () => {
    let total = 0
    for (var i = 0; i < selectedPaddock.length; i++) {
      let item = selectedPaddock[i]
      total = total + item.area
      setTotalArea(total)
    }
  }

  const addToSelected = (item) => {
    const { task } = props.state;
    setCounts(0)
    if(item.remaining_spray_area <= 0){
      Alert.alert(
        'Invalid Selection',
        item.name + ' has 0 remaining area.',
        [
          {text: 'OK', onPress: () => console.log('Okay Pressed')},
        ],
        { cancelable: false }
      )
      return
    }
    if(checkMard == false){
      Alert.alert(
        'Error Message',
        'When partial is selected, you will no longer allowed to add new Paddock.',
        [
          {text: 'OK', onPress: () => console.log('Okay Pressed')},
        ],
        { cancelable: false }
      )
    }else{
      setSelectedFlag(true)
      let status = false
      for (var i = 0; i < selectedPaddock.length; i++) {
        let paddock = selectedPaddock[i]
        if(paddock.id == item.id){
          status = true
          break
        }
      }
      if(status == false){
       if(selectedPaddock.length == 0){
        setTotalRate(item.rate_per_hectar)
        if(parseFloat(item.remaining_spray_area) > Number(maxArea)){
          setTotalHigher(true)
          let newItem = {
            ...item,
            partial_flag: true
          }
          setTotalArea(Number(totalArea) + parseFloat(item.remaining_spray_area))
          setTimeout(() => {
            setSelectedPaddock([...selectedPaddock, ...[newItem]])
            removePaddock('available', item)
          }, 100)
        }else{
          // }else if(Number(maxArea) > (parseFloat(item.spray_area) + totalArea)){
            if(appRateSwitch){
            setTotalArea(totalArea + parseFloat(item.remaining_spray_area))
            setAppliedRate(Math.floor(parseFloat(task.machine.capacity / (Number(totalArea) + parseFloat(item.remaining_spray_area))).toFixed(2)))
            item.partial_flag = false;
            setTimeout(() => {
              setSelectedPaddock([...selectedPaddock, ...[item]])
              removePaddock('available', item)
            }, 100)
          }else{
            setTotalArea(totalArea + parseFloat(item.remaining_spray_area))
            item.partial_flag = false;
            setTimeout(() => {
              setSelectedPaddock([...selectedPaddock, ...[item]])
              removePaddock('available', item)
            }, 100)
          }
        }
      }else if(Number(totalArea) === Number(maxArea)){
        Alert.alert(
          'Error Message',
          'You will no longer allowed to add new Paddock. Remove paddock or Create batch.',
          [
            {text: 'OK', onPress: () => console.log('Okay Pressed')},
          ],
          { cancelable: false }
          )
        }else{
          if(selectedPaddock[selectedPaddock.length -1].partial_flag == true){
            Alert.alert(
              'Error Message',
              'You will no longer allowed to add new Paddock. Please select partial to proceed.',
              [
                {text: 'OK', onPress: () => console.log('Okay Pressed')},
              ],
              { cancelable: false }
              )
            }
            else if((Number(totalArea) + parseFloat(item.remaining_spray_area)) > maxArea){
              if(appRateSwitch === true){
                setTotalHigher(true)
                setTotalArea(parseFloat(Number(totalArea) + parseFloat(item.remaining_spray_area)).toFixed(2))
                setAppliedRate(Math.floor(parseFloat(task.machine.capacity / (Number(totalArea) + parseFloat(item.remaining_spray_area))).toFixed(2)))
                let newItem = {
                  ...item,
                  partial_flag: false
                }
                setTimeout(() => {
                  selectedPaddock.push(newItem)
                  setSelectedPaddock(selectedPaddock.filter(el => {
                    el.partial_flag = false;
                    return el;
                  }))
                  removePaddock('available', item)
                }, 100)
              }else{
                setTotalHigher(true)
                setTotalArea(parseFloat(Number(totalArea) + parseFloat(item.remaining_spray_area)).toFixed(2))
                let newItem = {
                  ...item,
                  partial_flag: true
                }
                setTimeout(() => {
                  selectedPaddock.push(newItem)
                  setSelectedPaddock(selectedPaddock.filter(el => {
                    el.partial_flag = true;
                    return el;
                  }))
                  removePaddock('available', item)
                }, 100)
              }
            }else if((maxArea > (Number(totalArea) + parseFloat(item.remaining_spray_area)))){
              setTotalArea(parseFloat(Number(totalArea) + parseFloat(item.remaining_spray_area)).toFixed(2))
              if(appRateSwitch === true){
                setAppliedRate(Math.floor(parseFloat(task.machine.capacity / (Number(totalArea) + parseFloat(item.remaining_spray_area))).toFixed(2)))
                let newItem = {
                  ...item,
                  partial_flag: false
                }
                setTimeout(() => {
                  setSelectedPaddock([...selectedPaddock, ...[newItem]])
                  removePaddock('available', item)
                }, 100)
              }else{
                let newItem = {
                  ...item,
                  partial_flag: false
                }
                setTimeout(() => {
                  setSelectedPaddock([...selectedPaddock, ...[newItem]])
                  removePaddock('available', item)
                }, 100)
              }
            }else{
              let remainingArea = maxArea - totalArea
              let newItem = {
                ...item,
                remaining_spray_area: remainingArea,
                partial_flag: true
              }
              setTotalArea(totalArea + remainingArea)
              setTimeout(() => {
                setSelectedPaddock([...selectedPaddock, ...[newItem]])
                removePaddock('available', item)
              }, 100)
            }
          }
        }else{
        Alert.alert(
          'Error Message',
          item.name + ' already exist!',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
      }
    }

  }

  const partialChange = (item) => {
    setCheckMark(item.partial)
    if(item.partial == false){
      console.log('hererererererer', item)
      let partVal = _.sumBy(selectedPaddock, function(e){
        return Number(e.remaining_spray_area)
        // return Number(e.spray_area)
      })
      setTotalArea(partVal)
      setSelectedPaddock(selectedPaddock.filter(el => {
        el.spray_areas = el.remaining_spray_area;
        // el.remaining_spray_area = el.spray_area;
        return el;
      }))
      console.log('[fits]', selectedPaddock)
    }
    const newSelectedPaddock = selectedPaddock.map((paddock, index) => {
      if(paddock.id == item.id){
        console.log(paddock, '[itema]', item)
        return {
          ...paddock,
          partial: !paddock.partial,
          spray_areas: paddock.remaining_spray_area
          // remaining_spray_area: paddock.spray_area
        }
      }else{
        if(paddock.partial === true){
          console.log('[asdfasdf]f', paddock, '[itemb]', item)
          return {
            ...paddock,
            partial: false,
            // remaining_spray_area: paddock.remaining_spray_area - paddock.spray_areas
            // remaining_spray_area: paddock.spray_area - paddock.remaining_spray_area
            spray_areas: paddock.remaining_spray_area
          }
        }else {
          console.log('[paddock[', paddock)
          return paddock;
        }
      }
    })
    var counter = 0
    newSelectedPaddock.forEach(el => {
      console.log('[itemc]', item)
      if(el.partial === true){
        counter += 1
      }
      if(el.partial === true){
        console.log('a', item.remaining_spray_area, totalArea, maxArea, totalArea - maxArea, item.remaining_spray_area >= (totalArea - maxArea))
        if(item.remaining_spray_area >= (totalArea - maxArea)){
          console.log('b', parseFloat(item.spray_areas - (totalArea - maxArea)).toFixed(2), '[sadfas', parseFloat(item.spray_areas - (totalArea - maxArea)).toFixed(2), '[', )
          item.remaining_spray_area = parseFloat(item.spray_areas - (totalArea - maxArea)).toFixed(2)
          // item.spray_area = parseFloat(item.remaining_spray_area - (totalArea - maxArea)).toFixed(2)
          setAppliedArea(parseFloat(item.spray_areas - (totalArea - maxArea)).toFixed(2))
          // setAppliedArea(parseFloat(item.remaining_spray_area - (totalArea - maxArea)).toFixed(2))
          let partVal = _.sumBy(selectedPaddock, function(e){
            return Number(e.remaining_spray_area)
            // return Number(e.spray_area)
          })
          setPartialVal(partVal)
          setSelectedPaddock(selectedPaddock.filter(ndx => {
            console.log('[selected]', ndx.spray_areas - ndx.remaining_spray_area, el.spray_areas - el.remaining_spray_area);
            ndx.spray_areas = ndx.spray_areas - ndx.remaining_spray_area;
            // el.remaining_spray_area = el.remaining_spray_area - el.spray_area;
            return ndx;
          }))
        }else{
          console.log('c')
          setPartialVal(totalArea)
          setTotalHigher(true)
          return
        }
      }else{
        console.log('d', item, el)
        if(item.partial_flag === true && item.partial === false && counter === 0){
          console.log('e')
          setSelectedPaddock(selectedPaddock.filter(ndy => {
            ndy.spray_areas = ndy.remaining_spray_area;
            return ndy;
          }))
        }else if(item.partial_flag === true && item.partial === false && counter >= 1){
          console.log('f', el)
          el.partial = false,
          item.partial = false
          // el.spray_areas = el.remaining_spray_area
          // el.spray_areas = el.remaining_spray_area
          return el
        }else{
          console.log('asdfasdf')
          setSelectedPaddock(selectedPaddock.filter(ndz => {
            ndz.spray_areas = ndz.remaining_spray_area;
            // el.remaining_spray_area = el.spray_area;
            return ndz;
          }))
        }
      }
    })
    console.log('[sadfasdf]', newSelectedPaddock)
    return setSelectedPaddock(newSelectedPaddock)
  }
  
  const selectedPaddockView = () => {
    setTimeout(() => {
      const { task } = props.state;
      setMaxValue(parseFloat(task.machine.capacity / task.spray_mix.application_rate).toFixed(2))
    }, 100)
    return(
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
              <MixCard data={data}
              totalRate={totalArea}
              maxRate={maxPartial}
              hasCheck={true}
              confirmationModal={mixConfirmation}
              count={mixCount}
              partialss={partialss}
              addToSelected={() => {}}
              removePaddock={(from, item) => removePaddock(from, item)}
              from={'selected'}
              params={{
                totalArea,
                maxArea
              }}
              onPartialChange={(item) => partialChange(item)}

              />
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
  
  
  const applicationRate = () => {
    const { task } = props.state;
    return (
        <View style={[
          Style.mixCardContainer,
          {
            marginTop: 25,
            minHeight: 50,
            width: '90%',
            marginLeft: '5%',
            marginRight: '5%',
            zIndex: 1,
            marginBottom: (selectedPaddock.length == 0 || (selectedPaddock.length > 0 &&  selectedFlag == false)) ? (height / 2) : 0
          }]
        }>
          <View style={
            [ Style.mixTitle, 
            { borderBottomWidth: 3, borderBottomColor: '#9AD267' }]
          }>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[Style.textBold, { marginRight: 5, fontSize: BasicStyles.standardTitleFontSize }]}>
                Application rate
              </Text>
              <FontAwesomeIcon
                size={16}
                icon={faCheckCircle}
                color={'#BBF486'}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: -15 }}>
              <Text style={{ fontSize: BasicStyles.standardFontSize, marginLeft: 20, marginRight: 5 }}>Last Load?</Text>
              {
                (checkMard === false) ?
                <Switch
                  value={appRateSwitch}
                  onChangeValue={() => loadSwitch()}
                  activeText={'ON'}
                  inactiveText={'OFF'}
                  fontSize={BasicStyles.standardFontSize}
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
                /> :
                <Switch
                  value={appRateSwitch}
                  onChangeValue={() => onload(selectedPaddock)}
                  activeText={'ON'}
                  inactiveText={'OFF'}
                  fontSize={BasicStyles.standardFontSize}
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
              }

              <View style={{ marginLeft: 40 }}
              >
                {message === true ?
                  <Message
                    visible={true}
                    title={'Application volume too low'}
                    message={`This task would require an application volume lower than ${appliedRate} L/ha, which is too low for this spray mix. \n\n Remove paddock or complete a partial application`}
                    onClose={() => closeModal()}
                  /> : null }
              </View>
            </View>
          </View>
          <View style={[Style.mixDetails, { flexDirection: 'column' }]}>
            <View style={Style.appliedRate}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                  (appRateSwitch == true && selectedPaddock.length == 0) ?
                  (
                    <View><Text></Text></View>
                  )
                  :
                  (appRateSwitch == false) ?
                  // { appRateSwitch === false || selectedPaddock.length == 0 ?
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
                    <Text style={{
                      fontSize: BasicStyles.standardFontSize
                    }}>Applied Rate</Text>
                  </View>
                    :
                    <View style={{flexDirection:'row'}}>
                      <TextInput 
                        style={[Style.searchInput, {
                          opacity: 5,
                          borderColor: 'grey',
                          borderWidth: 1,
                          color: 'grey',
                          marginRight: -20,
                          height: 35,
                          borderTopLeftRadius: 10, 
                          borderTopRightRadius: 10,
                          borderBottomRightRadius: 10,
                          borderBottomLeftRadius: 10 }]}
                        keyboardType={'numeric'}
                        onChangeText={(newRate) => setTest(newRate)}
                        value={(test == undefined || test == 'Infinity') ? 0 : test }
                        // value={(selectedPaddock.length > 0) ? test : '0' }
                        editable={false}
                        placeholderTextColor='grey'
                        paddingLeft={12}
                        placeholder={appliedRate.toString()}>
                        {/* placeholder={appliedRate.toString()}> */}
                      </TextInput>
                      <TouchableOpacity
                        style={{
                          borderTopRightRadius: 10,
                          borderBottomRightRadius: 10,
                          backgroundColor: '#5A84EE',
                          paddingLeft: 20
                        }}
                        activeOpacity={.95}
                        onPress={() => newRates()}>
                          <Text style={{
                            marginTop: 7,
                            marginRight: 20,
                            fontSize: 13,
                            color: "#fff",
                            fontWeight: "bold",
                            alignSelf: "center",
                            textTransform: "uppercase"}}
                          >
                          Confirm
                          </Text>
                      </TouchableOpacity>
                    </View>
                }
              </View>
              <View>
                { (task && task.spray_mix && !appRateSwitch) && (
                    <Text style={[Style.textBold, {
                      fontSize: BasicStyles.standardFontSize
                    }]}>{Math.round(task.spray_mix.application_rate)} L</Text>
                  )
                }
              </View>
            </View>
            <View style={{ width: '100%', flex: 1, alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                {/* { totalHigher === true ?
                  <View style={[Style.totalAreaBox, {borderColor: '#FF0000'}]}>
                    <Text style={{
                      fontSize: BasicStyles.standardFontSize, color: '#FF0000'
                    }}>{totalArea} Ha</Text>
                    <Text style={{ color: '#FF0000', fontWeight: 'bold', fontSize: BasicStyles.standardFontSize }}>
                    TOTAL AREA
                    </Text>
                  </View> : */}
                {
                  checkMard == false ?
                  <View style={Style.totalAreaBox}>
                    <Text style={{
                      color: '#5A84EE', 
                      fontSize: BasicStyles.standardFontSize
                    }}>{Number(parseFloat(partialVal).toFixed(2))} Ha</Text>
                    <Text style={{ color: '#5A84EE', fontWeight: 'bold', fontSize: BasicStyles.standardFontSize }}>
                      TOTAL AREA
                    </Text>
                  </View>
                  :
                  <View style={Style.totalAreaBox}>
                    <Text style={{
                      color: '#5A84EE', 
                      fontSize: BasicStyles.standardFontSize
                    }}>{Number(parseFloat(totalArea).toFixed(2))} Ha</Text>
                    <Text style={{ color: '#5A84EE', fontWeight: 'bold', fontSize: BasicStyles.standardFontSize }}>
                      TOTAL AREA
                    </Text>
                  </View>
                }
                {/* } */}
                {
                  (selectedPaddock.length > 0) && (
                    <View style={{
                      flexDirection: 'column',
                      width: '100%',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      marginTop: -5,
                      paddingLeft: 15
                    }}>
                      {
                        selectedPaddock.map((item, index) => (
                          <View 
                          style={[Style.appliedPaddock, {
                            width: '40%',
                            justifyContent: 'space-between',
                          }]}
                          >
                          {
                            item.name && (
                              <Text style={[Style.appliedPaddockText, {
                                fontSize: BasicStyles.standardTitleFontSize
                                }]}>
                                  {item.name}
                                </Text>
                            )
                          }
                        
                          <TouchableOpacity
                            style={{
                              width: 5,
                              alignItems: 'flex-end'
                            }}
                            onPress={() => removePaddock('selected', item)}
                            >
                            <FontAwesomeIcon size={12} icon={faTimesCircle} color={'#094EFF'} />
                          </TouchableOpacity>
                        </View>
                        ))
                      } 
                    </View>
                  )
                }
              </View>
              {
                (task && task.machine) && (
                // (task && task.machine) && (selectedPaddock.length > 0) && (
                  <View style={{ marginTop: 5, paddingLeft: 0 }}>
                    <Text style={{ color: '#5A84EE', fontWeight: 'bold', fontSize: BasicStyles.standardFontSize }}>
                      MAX AREA: {maxArea}HA
                    </Text>
                  </View>    
                )
              }
              {/* {
                (task && task.machine) && (selectedPaddock.length == 0) && (
                  <View style={{ marginTop: 5, paddingLeft: 0 }}>
                    <Text style={{ color: '#5A84EE', fontWeight: 'bold', fontSize: BasicStyles.standardFontSize }}>
                      MAX AREA: {parseFloat(task.machine.capacity / task.spray_mix.application_rate).toFixed(2)}HA
                    </Text>
                  </View>    
                )
              } */}
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
      );
    }
    
    
    
    const availablePaddocksView = () => {
      return(
        <View style={{
          marginTop: 15
        }}>
        <Text style={Style.textHeader}>Available Paddocks</Text>
        <View style={{ alignItems: 'center', position: 'relative' }}>
          <Carousel
              layout={"default"}
              ref={carouselRef}
              data={paddocks}
              sliderWidth={width}
              itemWidth={width * 0.9}
              activeDo
              renderItem={(data) => (
                  <MixCard data={data}
                    hasCheck={false}
                    addToSelected={(item) => addToSelected(item)}
                    from={'available'}
                    removePaddock={(from, item) => removePaddock(from, item)}
                    />
              )}
              onSnapToItem = { index => setAvailablePaddockIndex(index) }
            />
          <Text style={{
            position: 'absolute',
            bottom: -12,
            left: '5%',
            fontSize: 10,
            color: '#C0C0C0',
            // width: 100
          }}>
            Drag Paddock tile to Application Box
          </Text>
          {/* {
            paddocks.length == 0 && (
              <View style={{ alignItems: 'center', position: 'relative' }}>
                <Text style={{
                marginLeft: '5%',
                marginRight: '5%',
                fontSize: 15,
                color: '#C0C0C0'}}>
                  Looks like you have not added a Paddock on this Spray Mix or you don't have enough Area.
                </Text>
              </View>
            )
          } */}
          {
            paddocks.length < 10 && (
              <Pagination
                dotsLength={paddocks.length}
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
            )
          }
          {
            paddocks.length >= 10 && (
              <Text style={{

              }}>
                { (availablePaddockIndex + 1) + ' / ' + paddocks.length}
              </Text>
            )
          }
          </View>
      </View>
    )
  }

  const noAvailablePaddocksView = () => {
    return(
      <View style={{
          marginTop: 15
        }}>
          <View style={{ alignItems: 'center', position: 'relative' }}>
            <Text style={{
            marginLeft: '5%',
            marginRight: '5%',
            fontSize: 15,
            color: '#C0C0C0'}}>
              Looks like you have not added a Paddock on this Spray Mix or you don't have enough Area.
            </Text>
          </View>
      </View>
    )
  }


  return (
    <SafeAreaView style={{ flex: 1, position: 'relative', backgroundColor:  Color.containerBackground}}>
      <ScrollView showsVerticalScrollIndicator={false} style={Style.ScrollView}>

        {(paddocks != null && paddocks.length > 0) && availablePaddocksView()}

        {(paddocks.length == 0 && selectedPaddock.length < 1) && noAvailablePaddocksView()}
        
        {applicationRate()}

        { (selectedFlag && selectedPaddock.length > 0 && scanProductFlag) && ( selectedPaddockView()) }


      </ScrollView>
      {
        totalHigher == true ?
          <Message
            visible={true}
            title={'Area too Large'}
            message={`You've selected too many hectares.\n\n Remove certain paddock or complete partial application on another paddock to continue.`}
            onClose={() => closePar()}
          /> : null
      }
      {
        checkMard == true ?
        ( appRateSwitch == true ?
          ((Number(totalArea) <= Number(maxArea)) && (selectedFlag && selectedPaddock.length > 0) && onLastLoad) && (
          <SlidingButton
            title={'Create Batch'}
            label={'Swipe Right'}
            position={mixConfirmation}
            onSuccess={() => {
              setMixConfirmation(true)
              // setMixCount(1)
            }}
          />
        )
        :
        ((Number(totalArea) <= Number(maxArea)) && (selectedFlag && selectedPaddock.length > 0)) && (
          <SlidingButton
            title={'Create Batch'}
            label={'Swipe Right'}
            position={mixConfirmation}
            onSuccess={() => {
              setMixConfirmation(true)
              // setMixCount(1)
            }}
          />
        ))
        :
        ((Number(partialVal) <= Number(maxArea)) && (selectedFlag && selectedPaddock.length > 0)) && (
          <SlidingButton
            title={'Create Batch'}
            label={'Swipe Right'}
            position={mixConfirmation}
            onSuccess={() => {
              setMixConfirmation(true)
              // setMixCount(1)
            }}
          />
        )
      }
      {/* {
        (selectedPaddock.length > 0) || (
          (totalHigher) && (
            <SlidingButton
              title={'Create Batch'}
              label={'Swipe Right'}
              position={mixConfirmation}
              onSuccess={() => {
                setMixConfirmation(true)
              }}
            />
          )
        )
      } */}

      { checkMard == false ?
        (mixConfirmation) && (checkMard == false) && (
          <MixConfirmationModal
          visible={mixConfirmation}
          onClose={() => {
            setMixConfirmation(false)
            setMixCount(1)
          }}
          onSuccess={() => {
            setMixConfirmation(false)
            props.navigation.navigate('batchStack', {total_volume: parseFloat((appliedRate * partialVal) - (totalRates * partialVal)).toFixed(2), selected_paddock: selectedPaddock, application_rate: appliedRate, appliedArea: appliedArea})
            setMixCount(1)
            // props.navigation.navigate('batchStack', {total_volume: parseFloat(appliedRate * partialVal).toFixed(2), selected_paddock: selectedPaddock, application_rate: appliedRate})
          }}
          data={selectedPaddock}
          value={appliedArea}
          volume={'BATCH ' + partialVal + 'HA ' + Math.round(appliedRate * partialVal) + ' L'}
          />
          ) :
          (mixConfirmation) && (checkMard == true) && (
            <MixConfirmationModal
            visible={mixConfirmation}
            onClose={() => {
              setMixConfirmation(false)
              setMixCount(1)
            }}
            onSuccess={() => {
              setMixConfirmation(false)
              props.navigation.navigate('batchStack', {total_volume: parseFloat((appliedRate * totalArea) - (totalRates * totalArea)).toFixed(2), selected_paddock: selectedPaddock, application_rate: appliedRate})
              setMixCount(1)
              // props.navigation.navigate('batchStack', {total_volume: parseFloat(appliedRate * totalArea).toFixed(2), selected_paddock: selectedPaddock, application_rate: appliedRate})
            }}
            data={selectedPaddock}
            applied={onLastLoad === true ? appliedRate : undefined}
            volume={'BATCH ' + totalArea + 'HA ' + Math.round(appliedRate * totalArea) + ' L'}
          />
        )
      }
      {loading ? <Spinner mode="overlay" /> : null}
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
)(MixPage)
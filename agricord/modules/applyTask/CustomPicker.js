import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {
  faChevronDown,
  faChevronUp,
  faTimes,
  faFlask,
  faTractor,
  faCheck,
  faCaretUp
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {BasicStyles, Color} from 'common';
import styles from 'modules/applyTask/Styles.js';

class CustomPicker extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    let indexItem =  null;
    if(this.props.selected) {
      this.props.data.map((element, index) => {
        if(element.name == this.props.selected.name || element == this.props.selected.name) {
          indexItem = index;
        }
      })
    }
    this.state = {
      isPressed: false,
      selectedItem: indexItem,
    };
  }

  renderButton = () => {
    return (
      <View style={styles.ButtonContainer}>
        <FontAwesomeIcon
          color="#FFFFFF"
          icon={this.checkIfAllowDropdown() ? faChevronUp : faChevronDown}
          size={25}
          style={styles.iconStyle}
        />
      </View>
    );
  };

  checkIfAllowDropdown = () => {
    return this.state.isPressed && this.props.allowOpen;
  };

  renderOptions = () => {
    const { type, select } = this.props;
    const { selectedItem } = this.state;
    return this.checkIfAllowDropdown() && this.props.data.length > 0 ? (
       <View style={[styles.OptionsContainer, {
        zIndex: this.props.zIndex + 30
       }]} onStartShouldSetResponder={() => true}>
          <FontAwesomeIcon
            style={{
              right: 7,
              position: 'absolute',
              top: -20 }}
            color={
            Color.white
            }
            icon={faCaretUp}
            size={30}
          />
        <ScrollView styles={{
          position: 'relative',
          zIndex: this.props.zIndex + 100,
          height: 170,
          width: '100%'
        }}>
          {this.props.data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.OptionContainer, {
                  zIndex: this.props.zIndex + 50,
                  position: 'relative'
                }]}
                onPress={() => {
                  this.handleSelect(item);
                  this.props.handleSelect(item);
                  this.setState({isPressed: false, selectedItem: item});
                }}>
                <View style={styles.OptionIconContainer}>
                  <FontAwesomeIcon
                    color={
                      select && select.id === item.id ? Color.blue : Color.gray
                    }
                    icon={type == 'Machine' ? faTractor : faFlask}
                    size={25}
                    style={styles.iconStyle}
                  />
                </View>
                <View style={styles.OptionTextContainer}>
                  <Text
                    style={[
                      styles.OptionTextStyle,
                      {
                        color:
                         select && select.id === item.id
                            ? '#5A84EE'
                            : '#000000',
                      },
                    ]}>
                    {item.name}
                  </Text>
                </View>
                {select && select.id === item.id && (<View style={{right: 10, position: 'absolute'}}>
                  <FontAwesomeIcon
                    style={{marginTop: 10}}
                    color={
                     Color.blue
                    }
                    icon={faCheck}
                    size={23}
                  />
                </View>)}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
       </View>
    ) : null;
  };

  handleSelect = item => {
    this.setState({
      selectedItem: item,
    });
  };

  handlePress = () => {
    this.setState({
      isPressed: !this.state.isPressed,
    });
    this.props.handleSelectedPicker(this.props.index, !this.state.isPressed);
  };

  handleRemove = () => {
    this.setState({selectedItem: null});
    this.props.handleRemoveItem(this.props.type);
  };

  render() {
    const {selectedItem, isPressed} = this.state;
    const { select } = this.props;
    var spray = null;
    if(select) {
      this.props.data.map((element, index) => {
        if(element.name == select) {
          spray = index;
        }
      })
    }
    // this.props.handleSelect(spray);

    let textColor = '';
    let backgroundColor = '';

    // textColor
    if (isPressed) {
      textColor = '#FFFFFF';
    } else if (select !== null) {
      textColor = '#094EFF';
    } else {
      textColor = '#A1A1A1';
    }

    // backgroundColor
    if (select !== null && isPressed) {
      backgroundColor = '#5A84EE';
    } else if (select !== null) {
      backgroundColor = '#E1EAFF';
    } else if (isPressed) {
      backgroundColor = '#5A84EE';
    } else {
      backgroundColor = '#FFFFFF';
    }

    return (
      <View style={{width: '100%', alignItems: 'center', position: 'relative', zIndex: this.props.zIndex}}>
        <TouchableOpacity
          style={[
            styles.PickerContainer,
            {
              backgroundColor: this.checkIfAllowDropdown()
                ? '#5A84EE'
                : '#FFFFFF',
            },
          ]}
          onPress={this.handlePress}>
          <View
            style={{
              flexDirection: 'row',
              height: 35,
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: 20,
              position: 'relative',
              zIndex: this.props.zIndex + 10
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 3,
                paddingHorizontal: 4,
                borderColor: select !== null ? '#7AA0FF' : '#FFFFFF',
                borderWidth: select !== null ? 1 : 0,
                borderRadius: select !== null ? 7 : 0,
                backgroundColor,
                flexDirection: 'row',
                zIndex: this.props.zIndex + 20,
                position: 'relative'
              }}>
              <Text
                style={{
                  textAlign: 'left',
                  color: this.checkIfAllowDropdown() ? '#FFFFFF' : '#084EFF',
                }}>
                {select !== null
                  ? select.name ? select.name : select
                  : `Selected ${this.props.type}`}
              </Text>
              {select !== null && (
                <TouchableOpacity
                  onPress={() => {
                    this.handleRemove();
                  }}>
                  <FontAwesomeIcon
                    color="#5A84EE"
                    icon={faTimes}
                    size={13}
                    style={styles.iconStyle}
                  />
                </TouchableOpacity>
              )}
            </View>
            {this.renderButton()}
          </View>
        </TouchableOpacity>
        {this.renderOptions()}
      </View>
    );
  }
}

export default CustomPicker;

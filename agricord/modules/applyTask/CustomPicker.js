import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {
  faChevronDown,
  faChevronUp,
  faTimes,
  faFlask,
  faTractor,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {BasicStyles} from 'common';
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
    const { type } = this.props;
    return this.checkIfAllowDropdown() && this.props.data.length > 0 ? (
       <View style={styles.OptionsContainer} onStartShouldSetResponder={() => true}>
        <ScrollView>
          {this.props.data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.OptionContainer}
                onPress={() => {
                  this.handleSelect(index);
                  this.props.handleSelect(index);
                  this.setState({isPressed: false, selectedItem: index});
                }}>
                <View style={styles.OptionIconContainer}>
                  <FontAwesomeIcon
                    color={
                      this.state.selectedItem === index ? '#5A84EE' : '#9F9F9F'
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
                          this.state.selectedItem === index
                            ? '#5A84EE'
                            : '#000000',
                      },
                    ]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
       </View>
    ) : null;
  };

  handleSelect = index => {
    this.setState({
      selectedItem: index,
    });
  };

  handlePress = () => {
    this.setState({
      isPressed: !this.state.isPressed,
    });
    this.props.handleSelectedPicker(this.props.index);
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
      <View style={{width: '100%', alignItems: 'center'}}>
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
              }}>
              <Text
                style={{
                  textAlign: 'left',
                  color: this.checkIfAllowDropdown() ? '#FFFFFF' : '#084EFF',
                }}>
                {select !== null
                  ? (spray ? this.props.data[spray].name : this.props.data[select].name)
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

import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {BasicStyles} from 'common';
import styles from 'modules/applyTask/Styles.js';

class CustomPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
      selectedItem: null,
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
    return this.checkIfAllowDropdown() ? (
      <View
        style={[
          styles.OptionsContainer,
          {...this.props.styles},
          {zIndex: 100},
        ]}>
        <ScrollView overScrollMode="always">
          {this.props.items.map((data, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.OptionContainer}
                onPress={() => {
                  this.handleSelect(index);
                  this.props.handleSelect(index);
                }}>
                <View style={styles.OptionIconContainer}>
                  <FontAwesomeIcon
                    color={
                      this.state.selectedItem === index ? '#5A84EE' : '#9F9F9F'
                    }
                    icon={data.icon}
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
                    {data.type}
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

  render() {
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
                alignItems: 'flex-start',
                paddingVertical: 3,
                paddingHorizontal: 4,
                borderColor:
                  this.state.selectedItem !== null ? '#7AA0FF' : '#FFFFFF',
                borderWidth: this.state.selectedItem !== null ? 1 : 0,
                borderRadius: this.state.selectedItem !== null ? 7 : 0,
              }}>
              <Text
                style={{
                  textAlign: 'left',
                  color: this.checkIfAllowDropdown() ? '#FFFFFF' : '#A1A1A1',
                }}>
                {this.state.selectedItem !== null
                  ? this.props.items[this.state.selectedItem].type
                  : `Selected ${this.props.type}`}
              </Text>
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

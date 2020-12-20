import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  faChevronDown,
  faChevronUp,
  faFlask,
  faTractor,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
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
          icon={this.state.isPressed ? faChevronUp : faChevronDown}
          size={25}
          style={styles.iconStyle}
        />
      </View>
    );
  };

  renderOptions = () => {
    return this.state.isPressed ? (
      <View style={styles.OptionsContainer}>
        <ScrollView overScrollMode="always">
          {this.props.items.map((data, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.OptionContainer}
                onPress={() => {
                  this.props.handleSelect(index);
                  this.setState({ isPressed: false, selectedItem: index })
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
  };

  render() {
    const { selectedItem, isPressed } = this.state
    let textColor = ''
    let backgroundColor = ''

    // textColor
    if (isPressed) {
      textColor = '#FFFFFF'
    } else if (selectedItem !== null) {
      textColor = '#094EFF'
    } else {
      textColor = '#A1A1A1'
    }

    // backgroundColor
    if (selectedItem !== null && isPressed) {
      backgroundColor = '#5A84EE'
    } else if (selectedItem !== null) {
      backgroundColor = '#E1EAFF'
    } else if (isPressed) {
      backgroundColor = '#5A84EE'
    } else {
      backgroundColor = '#FFFFFF'
    }

    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <TouchableOpacity
          style={[
            styles.PickerContainer,
            {backgroundColor: isPressed ? '#5A84EE' : '#FFFFFF'},
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
                borderColor: selectedItem !== null ? '#7AA0FF' : '#FFFFFF',
                borderWidth: selectedItem !== null ? 1 : 0,
                borderRadius: selectedItem !== null ? 7 : 0,
                backgroundColor
              }}>
              {
                selectedItem !== null ? (
                  <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                    onPress={() => this.setState({ selectedItem: null })}
                  >
                    <Text
                      style={{
                        textAlign: 'left',
                        color: textColor
                      }}
                    >
                      {this.props.items[selectedItem].type}
                    </Text>
                    <FontAwesomeIcon
                      color="#000"
                      icon={faTimesCircle}
                      size={15}
                      style={{ marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={{
                      textAlign: 'left',
                      color: textColor
                    }}
                  >
                    {`Selected ${this.props.type}`}
                  </Text>
                )
              }
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

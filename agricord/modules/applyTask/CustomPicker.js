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
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {BasicStyles} from 'common';

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
                  this.handleSelect(index);
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
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <TouchableOpacity
          style={[
            styles.PickerContainer,
            {backgroundColor: this.state.isPressed ? '#5A84EE' : '#FFFFFF'},
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
                  color: this.state.isPressed ? '#FFFFFF' : '#A1A1A1',
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

const styles = StyleSheet.create({
  PickerContainer: {
    marginTop: 20,
    width: '90%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5A84EE',
  },
  ButtonContainer: {
    height: '100%',
    width: 35,
    borderRadius: 6,
    backgroundColor: '#5A84EE',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
    borderWidth: 3,
    borderColor: '#5A84EE',
  },
  OptionsContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '10%',
    justifyContent: 'flex-end',
    height: 105,
    width: '90%',
    borderColor: '#AEAEAE',
    borderWidth: 0.5,
    backgroundColor: 'white',
    paddingLeft: 20,
    elevation: 2,
    marginTop: 60,
  },
  OptionContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  OptionIconContainer: {},
  OptionTextContainer: {
    paddingLeft: 15,
    justifyContent: 'center',
  },
  OptionTextStyle: {
    fontSize: BasicStyles.normalText.fontSize,
  },
});

export default CustomPicker;

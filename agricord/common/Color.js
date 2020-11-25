let primary = '#cae166'
let secondary = '#7575C7'
let tertiary = '#5A84EE'
export default {
  primaryDark: '#cae166',
  primary: primary,
  danger: '#cae166',
  warning: '#ffc107',
  secondary: secondary,
  white: '#ffffff',
  gray: '#cccccc',
  lightGray: '#eeeeee',
  darkGray: '#2b2b2b',
  normalGray: '#999',
  black: '#000',
  success: '#4BB543',
  goldenYellow: '#FFDF00',
  tertiary: tertiary,
  setPrimary(color){
    this.primary = color
  },
  setSecondary(color){
    this.secondary = color
  },
  setTertiary(color){
    this.tertiary = color
  }
}
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {  Color } from 'common';
import Style from './Style.js';
import { Spinner } from 'components';
import { Routes } from 'common';
import Api from 'services/api/index.js'
import { MainCard, Feature, MainFeature, PromoCard } from 'components/ProductThumbnail'
const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

class Featured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadingCoupons: false,
      isError: false,
      data: null,
      coupons: [],
      searchString:'',
      featured: [],
      limit: 10,
      offset: 0,
      number:1,
      monitor:null,
    };
  }

  componentDidMount() {
    const { location } = this.props.state
    console.log(location)
    
    if (location) {
      this.retrieve({ offset: this.state.offset, changedAddress: location })
    }
    console.log(this.props)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const currentLoc = this.props.state.location
    const nextLoc = nextProps.state.location
    const isEqual = _.isEqual(currentLoc, nextLoc)

    if (!isEqual) {
      this.setState({ featured: [], offset: 0 })
      this.retrieve({ offset: 0, changedAddress: nextLoc })
    }
  }

  retrieve = async ({ offset, fetchMore = false, changedAddress = null }) => {
    const { limit } = this.state

    const latitude = changedAddress.latitude
    const longitude = changedAddress.longitude

    const featured_products_parameter = {
      latitude,
      longitude,
      limit,
      offset,
    }

    if (!fetchMore) {
      this.setState({ isLoading: true, isLoadingCoupons: true, isError: false })
    }
    Api.request(Routes.dashboardRetrieveFeaturedProducts, featured_products_parameter, response => {
      if (response.data.length > 0 && response.data[0].length > 0) {
        const joined = _.uniqBy([...this.state.featured, ...response.data[0]], 'id')
        this.setState({
          isLoading: false,
          featured: joined,
          offset
        })        
      } else {
        this.setState({ isLoading: false })        
      }   
    }, (error) => {
      console.log({ errorFeaturedProducts: error })
      this.setState({
        isLoading: false,
        isError: true
      })
    })

    Api.request(Routes.couponsRetrieve, {}, (response) => {
      if (response.data.length) {
        this.setState({ coupons: response.data, isLoadingCoupons: false })
      } else {
        this.setState({ isLoadingCoupons: false })
      }
    }, (error) => {
      console.log({ couponsErr: error })
      this.setState({ isLoadingCoupons: false })
    })
  }

  onPullRefresh = ({ contentOffset }) => {
    const { offset, isLoading } = this.state
    if (contentOffset.y < -30 && !isLoading) {
      this.retrieve({ offset })
    }
  }

  isOnBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const { offset, limit, isLoading } = this.state
    const shouldFetchData = layoutMeasurement.height + contentOffset.y >= contentSize.height;
    if (shouldFetchData && !isLoading) {
      this.retrieve({ offset: offset + limit, fetchMore: true })
    }
  };

  redirect = route => {
    this.props.navigation.navigate(route);
  };

  filterRedirect = () => {
    this.redirect('filterPicker')
  }

  searchedString = (list) => {
    const getValue = value => (typeof value === 'string' ? value.toLowerCase() : value);
    const filteredProducts=this.filterSearch(list,this.props.state.productFilter);

    return filteredProducts.filter(filteredProducts=>getValue(filteredProducts.title).includes(this.state.searchString.toLowerCase())  )
  }

  filterSearch = (products,filters) => {
    const getValue = value => (typeof value === 'string' ? value.toLowerCase() : value);

    let filtered = products.filter( product => {
      if (filters.length==0) {
        return true
      }
      return filters.some(tag => {
        return product.category.includes(tag)})
      }
    )

    return(filtered)
  }

  changeAddress = () => {
    const { user } = this.props.state
    const { navigate } = this.props.navigation

    if (!user) {
      navigate('loginStack')
      return
    }

    navigate('ChangeAddress')
  }

  render() {
    const {
      isLoading,
      isLoadingCoupons,
      coupons,
      featured,
      isError,
    } = this.state;
    const { theme } = this.props.state
    const { navigate } = this.props.navigation
    return (
     <View>
      
     </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setLocation: (location) => dispatch(actions.setLocation(location)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Featured);

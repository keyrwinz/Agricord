import { Color } from 'common';
export default {
  container: {
    flex: 1,
  },
  titleContainer: {
    position: 'relative'
  },
  imageContainer :{
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 15
  },
  LogoContainer: {
    height: 50,
    width: 50,
  },
  TitleContainer: {
    width: '50%',
    height: 30,
  },
  topRightBox: {
    position: 'absolute',
    right: -50,
    backgroundColor: '#81CB9D',
    width: '45%',
    height: 50,
    borderBottomLeftRadius: 20
  },
  navItemStyle: {
    padding: 10,
    marginHorizontal: 20
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  chevronIcon: {
    color: Color.normalGray,
    marginLeft: 'auto'
  },
  navSectionStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: Color.gray,
    borderBottomWidth: 1
  },
  navSectionStyleNoBorder: {
    paddingVertical: 15,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray,
  },
  collapsibleView: {
    width: '90%',
    paddingHorizontal: 20,
    paddingTop: 15
  },
  subRoutes: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1
  },
  lineGraph: {
    width: '7%',
    height: '100%',
    position: 'absolute',
    top: -15,
    left: -3,
    // backgroundColor: 'red',
    borderLeftWidth: 1,
    borderLeftColor: '#AAD76F',
    borderBottomWidth: 1,
    borderBottomColor: '#AAD76F',
  },
  bulletView: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#AAD76F',
    marginLeft: 10,
    marginRight: 10
  },
  subRouteText: {
    flex: 1,
    marginTop: 15
  },
  navSectionStyleBorderTop: {
    marginTop: 10
  },
  navSectionBottom: {
    paddingVertical: 10,
    paddingLeft: 30,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  sectionHeadingStyle: {
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: 'center'
  },
  footerContainer: {
    width: 300,
    padding: 20,
    fontSize: 8
  },
  //
  userContainer: {
    marginVertical: 10,
    backgroundColor: '#8989CE',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: '88%',
    height: 150
  },
  userContainer2: {
    backgroundColor: '#7F7FC8',
    borderBottomRightRadius: 10,
    width: '95%',
    height: '90%'
  },
  userContainer3: {
    justifyContent: 'center',
    backgroundColor: '#7575C7',
    borderBottomRightRadius: 10,
    width: '95%',
    height: '90%'
  },
  userInfoContainer: {
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    color: Color.white,
    fontSize: 20,
    fontWeight: 'bold'
  },
  userEmail: {
    color: Color.white,
    fontSize: 15,
  },
  extraIcons: {
    flexDirection: 'row',
    marginTop: 10
  },
  badgeContainer: {
    backgroundColor: '#C9E265',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 7,
    borderRadius: 10
  },
  badgeText: {
    color: Color.white,
    fontSize: 12,
    fontWeight: 'bold'
  }
};
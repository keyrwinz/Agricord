import { Color, BasicStyles } from 'common';

export default {
  cardContainer: {
    minHeight: 60,
    width: '100%',
    marginTop: 15,
    backgroundColor: Color.white,
    borderRadius: BasicStyles.standardBorderRadius,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    ...BasicStyles.standardShadow,
    padding: 10
  },
  cardInfo:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  labelTitle: {
    fontWeight: 'bold',
    color: '#969696',
    width: '50%',
    fontSize: BasicStyles.standardFontSize
  },
  label: {
    width: '50%',
    fontSize: BasicStyles.standardFontSize
  }
}
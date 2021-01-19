import { Color, BasicStyles } from 'common';
import { Dimensions } from 'react-native';
export default {
  modal: {
    backgroundColor: Color.gray
  },
  MainContainer: {
    flex: 1,
    backgroundColor: Color.white
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 10,
    right: 20
  },
  modalBody: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: BasicStyles.standardBorderRadius,
    padding: 35,
    paddingTop: 40,
    alignItems: 'center',
    ...BasicStyles.standardShadow,
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%'
  },
  modalContent: {
    width: '90%',
  },
  modalContentRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  itemContainer: {
    marginBottom: 20,
    borderRadius: BasicStyles.standardBorderRadius,
    backgroundColor: Color.white,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    ...BasicStyles.standardShadow,
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10
  },
  itemDescription: {
    alignItems: 'center',
  },
  itemDetailsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray,
  },
  itemDetailLabel: {
    fontSize: BasicStyles.standardFontSize,
    color: Color.gray,
    width: '50%',
    fontWeight: 'bold'
  },
  itemDetailValue: {
    fontSize: BasicStyles.standardFontSize,
    width: '50%',
  },
  fileUploaded: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fileUploadedText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  Details: {
    marginTop: 10,
    width: '100%',
    minHeight: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
    ...BasicStyles.standardShadow
  }
}
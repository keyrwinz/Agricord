import { Color } from 'common';
import { Dimensions } from 'react-native';
export default {
  modal: {
    backgroundColor: Color.gray
  },
  MainContainer: {
    flex: 1,
    backgroundColor: Color.white
  },
  sliderContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F1F1F1'
  },
  ScrollView: {
    flex: 1
  },
  circleButton: {
    padding: 5,
    height: 75,
    width: 75,  
    borderRadius:400, 
    backgroundColor:'#FF5B04',
    justifyContent:'center',
  },
  image: {   
    width: '100%',
    height: 80,
    padding: 50,
    borderRadius:5,
    resizeMode:'contain'
  },
  searchbarContainer: {
    position: 'relative',
    backgroundColor: Color.white,
    width: '100%',
    height: 60,
    paddingTop: 0,
    marginTop: -10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.gray,
  },
  searchbar: {
    width: '70%',
    marginLeft: 30,
    paddingLeft: 15,
    height: 35,
    borderRadius: 12,
    borderColor: Color.gray,
    borderWidth: 1,
  },
  searchIcon: {
    position: 'absolute',
    right: '22%',
    top: 4.5
  },
  nfcIcon: {
    position: 'absolute',
    right: 25
  },
  
  // INVENTORY ITEM SCREEN
  modalCloseBtn: {
    position: 'absolute',
    top: 10,
    right: 20
  },
  modalBody: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingTop: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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

  itemDescContainer: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: Color.white,
    borderColor: '#FFFFFF',
    borderWidth:1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
    alignItems: 'center',
  },
  itemDescription: {
    alignItems: 'center',
  },
  itemDetailsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '90%'
  },
  itemDetailRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray
  },
  itemDetailLeft: {
    flex: 1.1,
  },
  itemDetailRight: {
    flex: 0.9,
  },
  itemDetailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.gray
  },
  itemDetailValue: {
    fontSize: 16,
  },
  fileUploaded: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fileUploadedText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
}
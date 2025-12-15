
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    // paddingTop: '30%',
    paddingBottom: '10%',
    paddingHorizontal: '5%'
  },
  loginHeader: {
    width: '100%',
    padding: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginHeaderText: {
    fontSize: 30,
    color: '#ffffff',
    paddingBottom: '5%',
    fontWeight: 'bold',
    lineHeight: 40,

  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: '3%'
  },
  loginLabelContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  loginLabelText: {
    fontSize: 18
  },
  loginInputContainer: {
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    width: '105%'
  },
  loginInputBox: {
    width: '100%',
    backgroundColor: '#3A3B3D',
    color: '#FFFFFF',
    borderRadius: 8,
    fontSize: 18,
    padding: '6%'
  },
  modeSwitchContainer:{
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: '#FFFFFF',
  },
  loginButton: {
    width: '100%',       
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    marginTop: '15%',
    paddingVertical: '6%',
    paddingHorizontal: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '500',
  },
  loginButtonRow: {
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  listContainer: {
    flex: 0.7, 
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
  },
});
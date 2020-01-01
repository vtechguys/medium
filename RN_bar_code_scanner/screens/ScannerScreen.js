

import React from 'react';


import { Container, Spinner, TextH3 } from "../UI";

import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

import {window} from "../constants/Layout";

class ScannerScreen extends React.Component{
  static navigationOptions = {
    header: null
  }
  // Component State
  state = {
    hasCameraPermission: null, // if app has permissions to acess camera
    isScanned: false // scanned
  }
  async componentDidMount() {
    // ask for camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({ hasCameraPermission: status === "granted" ? true : false });
  }


  handleBarCodeScanned = ({ type, data }) => {
      // Do something here
      this.props.navigation.navigate('Decode', {
        data: data 
      });
  }
  render(){
    const { hasCameraPermission, isScanned } = this.state;
    if(hasCameraPermission === null){
      console.log("Requesting permission");
      return (
        <Spinner />
      );
    }

    if(hasCameraPermission === false){
      return ( 
        <Container>
         <TextH3>Please grant Camera permission</TextH3>
        </Container> 
      )
    }
    if(hasCameraPermission === true && !isScanned && this.props.navigation.isFocused() ){
      return <Container style = {{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

      }}>
        <TextH3>Scan code inside window</TextH3>
        <BarCodeScanner
          onBarCodeScanned = { isScanned ? undefined : this.handleBarCodeScanned }
          style = {{
            height:  window.height / 2,
            width: window.height,
          }}
        >
        </BarCodeScanner>
      </Container>
    }
    else{
      return <Spinner />;
    }


  }

}




export default ScannerScreen;
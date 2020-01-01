import React from "react";
import { View, ActivityIndicator, StyleSheet, Text, Platform, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { size } from '../constants/Layout';
import Colors from '../constants/Colors';
export function Item(props) {

    return (
      <TouchableOpacity
        onPress={()=>props.onSelect(props.id)}
        style={[
          styles.item,
          { backgroundColor: props.selected ? '#6e3b6e' : '#f9c2ff' },
        ]}
      >
        <Text size={size.h4}>{props.title}</Text>
      </TouchableOpacity>
    );
  }

export function WhiteBoard(props) {
    return <View style={styles.absoluteContainer}> {props.children}</View>;
}
export function Icon(props) {
    return <Ionicons
        name={Platform.OS === 'ios' ? `ios-${props.name}` : `md-${props.name}`}
        size={props.size || size.s3}
        color={props.color || Colors.defaultIconColor}
        style={{ ...props.style }}
        onPress={props.onPress}
    />
}
export function Input(props){
    return (
        <TextInput 
            onChangeText={props.onChangeText} 
            placeholder={props.placeholder} 
            style={{...styles.input, ...props.style}} 
            value={props.value} 
            placeholderTextColor={Colors.defaultInputPlaceholderColor} 
            onFocus={props.onFocus}
        />
    );
}
export function Container(props) {
    var style = {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    };

    if(props.column){
        style.flexDirection = 'column'

    }
    if(props.column && props.center){
        style.alignItems = 'center';
    }
    const styles = [style];
    if(props.style && typeof props.style === 'object'){
        styles.push(props.style);
    }

    return (
        <View
            style={styles}
            {...props}
        >
            {props.children}
        </View>
    );
}
export function Spinner(props) {

    return (
        <Container column center>
                <ActivityIndicator
                    color={props.color || Colors.defaultSpinnerColor}
                    size={props.size || size.s3 }
                />
        </Container>
    );
}

export function TextItem(props) {
    return <Text {...props}>{props.children}</Text>
}

const styles = StyleSheet.create({
    absoluteContainer: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'white',
        zIndex: 1000

    }, 
    input: {
        color: 'grey',
        fontSize: 20
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }
});
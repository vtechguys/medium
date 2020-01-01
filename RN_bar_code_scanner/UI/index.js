import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { size } from "../constants/Layout";
export function Container(props) {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {props.children}
        </View>
    );
}
export function Spinner(props) {
    return <Container>
        <ActivityIndicator
            color={props.color || "blue"}
            size={props.size || "large"}
            animating={props.isLoading || true}
        />
    </Container>
}

export function TextItem(props) {
    return <Text {...props}>{props.children}</Text>
}

export function TextH1(props) {
    return (
        <TextItem
            style={styles.h1}

        >
            {props.children}
        </TextItem>
    );
}
export function TextH2(props) {
    return (
        <TextItem
            style={styles.h2}

        >
            {props.children}
        </TextItem>
    );
}
export function TextH3(props) {
    return (
        <TextItem
            style={styles.h3}

        >
            {props.children}
        </TextItem>
    );
}
export function TextH4(props) {
    return (
        <TextItem
            style={styles.h4}

        >
            {props.children}
        </TextItem>
    );
}
export function TextH5(props) {
    return (
        <TextItem
            style={styles.h5}

        >
            {props.children}
        </TextItem>
    );
}
export function TextH6(props) {
    return (
        <TextItem
            style={styles.h6}

        >
            {props.children}
        </TextItem>
    );
}
const styles = StyleSheet.create({
    h1: {
        fontSize: size.s1,

    },
    h2: {
        fontSize: size.s2,

    },
    h3: {
        fontSize: size.s3,

    },
    h4: {
        fontSize: size.s4,

    },
    h5: {
        fontSize: size.s5,

    },
    h6: {
        fontSize: size.s6,
    }
});
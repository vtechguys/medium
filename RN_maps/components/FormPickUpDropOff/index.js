import React from 'react';
import { FlatList } from 'react-native';
import { Container, Input, Item } from '../../UI';
import styles from './styles';

export default function Form(props) {

    var containerStyle = [styles.topFloat, styles.container];

    var focusedStyleForInputPickUp = null;
    var focusedStyleForInputDropOff = null;

    if(props.focusedInputBoxId){
        containerStyle.push(
            // styles.containerExpand,
            styles.containerOnFocusedInput    
        );

        if (props.focusedInputBoxId === 'pickUp') {
            focusedStyleForInputPickUp = styles.focusedInputStyle;
        }
        if (props.focusedInputBoxId === 'dropOff') {
            focusedStyleForInputDropOff = styles.focusedInputStyle;
        }
    }

    return (
        <Container style={containerStyle}>
            <Container style={[styles.defaultInput, focusedStyleForInputPickUp]} >
                <Input
                    onChangeText={props.onChangeText}
                    placeholder='Pick up'
                    style={styles.input}
                    onFocus={() => props.onInputBoxFocus('pickUp')}
                />
                <FlatList
                    data={props.searchResults}
                    renderItem={({ item }) => {

                        const title = `${item.street} ${item.city} , ${item.state}, ${item.country}`;
                        return <Item
                            id={item.id}
                            title={title}
                            onSelect={() => props.onLocationSelect(item.id)}
                        />
                    }}
                    keyExtractor={item => item.id}
                />
                

            </Container>
            <Container style={[styles.defaultInput, focusedStyleForInputDropOff]}>
                <Input
                    onChangeText={props.onChangeText}
                    placeholder='Drop Off'
                    style={styles.input}
                    onFocus={() => props.onInputBoxFocus('dropOff')}
                />
                <FlatList
                    data={props.searchResults}
                    renderItem={({ item }) => {

                        const title = `${item.street} ${item.city} , ${item.state}, ${item.country}`;
                        return <Item
                            id={item.id}
                            title={title}
                            onSelect={() => props.onLocationSelect(item.id)}
                        />
                    }}
                    keyExtractor={item => item.id}
                />

            </Container>
            <Container style={[styles.defaultInput]}>
            <Container style={[styles.submitButton]}>
                    {
                        props.children
                    }
            </Container>

            </Container>
            
        </Container >

    );

}
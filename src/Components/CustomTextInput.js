import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class CustomTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
            isValidationErrorExist: this.props.validationError,
        };
    }

    userPressedTextInputHandle = () => {
        this.setState({
            isFocus: true,
        })
    }

    userUnPressedTextInputHandle = () => {
        if (this.props.value == "" || this.props.value == undefined) {
            this.setState({
                isFocus: false,
            })
        }

    }

    render() {
        return (
            <View style={this.props.mainStyles}>
                <View style={[styles.ovalSqure, { borderColor: this.state.isValidationErrorExist ? '#FF9A00' : '#cccccc' }]}>
                    <View style={this.state.isFocus ? styles.labelOnFocusStyles : styles.lableDefaultStyle}>
                        <Text style={this.state.isFocus ? styles.lableOnFocusTextStyles : styles.lableDefaultTextStyles}>{this.props.labelText}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 12, }}>
                            <TextInput
                                value={this.props.value}
                                style={styles.textInputStyle}
                                placeholderTextColor={'#a6a6a6'}
                                underlineColorAndroid="transparent"
                                onFocus={() => { this.userPressedTextInputHandle() }}
                                onBlur={() => { this.userUnPressedTextInputHandle() }}
                                onChangeText={this.props.onChangeText}
                                keyboardType={this.props.keyboardType}
                                secureTextEntry={this.props.secureTextEntry}
                                validationError={this.props.validationError}
                            />
                        </View>
                        {this.state.isValidationErrorExist && <View style={{ flex: 2, }}>
                            <TouchableOpacity>
                                <Ionicons name="ios-alert" size={30} color="#FF9A00" />
                            </TouchableOpacity>
                        </View>}

                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    ovalSqure: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        height: 50,
        width: 300,
        borderRadius: 25,
        borderWidth: 1.5,
        elevation: 8,
    },
    textInputStyle: {
        paddingLeft: 20,
        fontSize: 16,
    },
    lableDefaultStyle: {
        position: 'absolute',
        marginLeft: 20,
    },
    lableDefaultTextStyles: {
        fontSize: 16,
        color: 'gray',
    },
    labelOnFocusStyles: {
        position: 'absolute',
        top: 0,
        marginLeft: 20,
        marginTop: -8,
        backgroundColor: '#ffffff'
    },
    lableOnFocusTextStyles: {
        fontSize: 12,
        color: 'gray',
        paddingHorizontal: 5,
    },
})

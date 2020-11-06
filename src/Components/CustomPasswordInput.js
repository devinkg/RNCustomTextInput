import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class CustomPasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
            isValidationErrorExist: this.props.validationError,
            isSecuredEntry: true,

            progressBarProperties: {
                pbPercentage: '0%',
                pbBorderColor: 'gray',
                pbBackgroundColor: 'gray',
                pbText: 'Empty',
                pbTextColor: 'gray',
                pbIconColor: 'gray',
            },
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.passwordSecureLevel !== prevProps.passwordSecureLevel) {
            this.updatePBWithPasswordSecureLevel();
        }
    }

    updatePBWithPasswordSecureLevel = () => {
        switch (this.props.passwordSecureLevel) {
            case "0":
                this.setState(prevState => ({
                    progressBarProperties: {
                        ...prevState.progressBarProperties,
                        pbPercentage: '0%',
                        pbBorderColor: 'gray',
                        pbBackgroundColor: 'gray',
                        pbText: 'Empty',
                        pbTextColor: 'gray',
                        pbIconColor: 'gray',
                    },
                }))
                break;
            case "1":
                this.setState(prevState => ({
                    progressBarProperties: {
                        ...prevState.progressBarProperties,
                        pbPercentage: '25%',
                        pbBorderColor: '#FF9A00',
                        pbBackgroundColor: '#FF9A00',
                        pbText: 'Weak',
                        pbTextColor: '#FF9A00',
                        pbIconColor: '#FF9A00',
                    },
                }))
                break;
            case "2":
                this.setState(prevState => ({
                    progressBarProperties: {
                        ...prevState.progressBarProperties,
                        pbPercentage: '50%',
                        pbBorderColor: '#222222',
                        pbBackgroundColor: '#222222',
                        pbText: 'So So',
                        pbTextColor: '#222222',
                        pbIconColor: '#222222',
                    },
                }))
                break;
            case "3":
                this.setState(prevState => ({
                    progressBarProperties: {
                        ...prevState.progressBarProperties,
                        pbPercentage: '75%',
                        pbBorderColor: '#00D857',
                        pbBackgroundColor: '#00D857',
                        pbText: 'Good',
                        pbTextColor: '#222222',
                        pbIconColor: '#222222',
                    },
                }))
                break;
            case "4":
                this.setState(prevState => ({
                    progressBarProperties: {
                        ...prevState.progressBarProperties,
                        pbPercentage: '100%',
                        pbBorderColor: '#00D857',
                        pbBackgroundColor: '#00D857',
                        pbText: 'Great',
                        pbTextColor: '#00D857',
                        pbIconColor: '#00D857',
                    },
                }))
                break;
            default:
                this.setState(prevState => ({
                    progressBarProperties: {
                        ...prevState.progressBarProperties,
                        pbPercentage: '0%',
                        pbBorderColor: 'gray',
                        pbBackgroundColor: 'gray',
                        pbText: 'Empty',
                        pbTextColor: 'gray',
                        pbIconColor: 'gray',
                    },
                }))
        }
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

    secureTextEntryChangesHandle = () => {
        this.setState({
            isSecuredEntry: !this.state.isSecuredEntry
        })
    }

    render() {
        return (
            <View style={this.props.mainStyles}>
                <View style={styles.ovalSqure}>
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
                                keyboardType={'default'}
                                secureTextEntry={this.state.isSecuredEntry}
                                validationError={this.props.validationError}
                            />
                        </View>
                        <View style={{ flex: 2, }}>
                            <TouchableOpacity onPress={() => { this.secureTextEntryChangesHandle() }}>
                                <Ionicons name="md-eye" size={32} color={this.state.isSecuredEntry ? 'gray' : '#00D857'} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={styles.progressBarContainerStyles}>
                    <View style={[styles.progressBarStyles, { borderColor: this.state.progressBarProperties.pbBorderColor }]}>
                        <Animated.View
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: this.state.progressBarProperties.pbPercentage,
                                backgroundColor: this.state.progressBarProperties.pbBackgroundColor
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: this.state.progressBarProperties.pbTextColor, paddingLeft: 10, }}>{this.state.progressBarProperties.pbText}</Text>
                        <Ionicons name="ios-alert" size={16} color={this.state.progressBarProperties.pbIconColor} style={{ paddingLeft: 10, }} />
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
        borderColor: '#cccccc'
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
    progressBarContainerStyles: {
        marginHorizontal: 15,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    progressBarStyles: {
        height: 8,
        width: 200,
        borderRadius: 4,
        borderWidth: 1,
    }
})

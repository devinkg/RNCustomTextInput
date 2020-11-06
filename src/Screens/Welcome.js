import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomTextInput from '../Components/CustomTextInput';
import CustomPasswordInput from '../Components/CustomPasswordInput';

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {
                firstName: "",
                lastName: "",
                password: "",
            },
            passwordStrenghLevel: '',
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.userDetails.password != prevState.userDetails.password) {
            this.checkPasswordStrength();
        }
    }

    checkPasswordStrength = () => {
        let userPassword = this.state.userDetails.password;

        //soso password ==> Minimum eight characters, at least one letter and one number
        let sosoPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        //goodPassword ==> Minimum eight characters, at least one letter, one number and one special character
        let goodPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        //greatPassword ==> Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        let greatPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (userPassword.replace(/\s/g, '').length) {//check if string only contains whitespace (ie. spaces, tabs or line breaks)
            if (greatPassword.test(userPassword)) {
                this.setState({
                    passwordStrenghLevel: "4",
                })
            } else if (goodPassword.test(userPassword)) {
                this.setState({
                    passwordStrenghLevel: "3",
                })
            } else if (sosoPassword.test(userPassword)) {
                this.setState({
                    passwordStrenghLevel: "2",
                })
            }
            else {
                this.setState({
                    passwordStrenghLevel: "1",
                })
            }
        } else {
            this.setState({
                passwordStrenghLevel: "0",
            })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CustomTextInput
                    labelText={"First Name"}
                    mainStyles={{ marginBottom: 20, }}
                    value={this.state.userDetails.firstName}
                    onChangeText={value => {
                        this.setState(prevState => ({
                            userDetails: {
                                ...prevState.userDetails,
                                firstName: value
                            }
                        }))
                    }}
                    validationError={true}
                />
                <CustomTextInput
                    labelText={"Last Name"}
                    mainStyles={{ marginBottom: 20, }}
                    value={this.state.userDetails.lastName}
                    onChangeText={value => {
                        this.setState(prevState => ({
                            userDetails: {
                                ...prevState.userDetails,
                                lastName: value
                            }
                        }))
                    }}
                />

                <CustomPasswordInput
                    labelText={"Password"}
                    value={this.state.userDetails.password}
                    passwordSecureLevel={this.state.passwordStrenghLevel}
                    onChangeText={value => {
                        this.setState(prevState => ({
                            userDetails: {
                                ...prevState.userDetails,
                                password: value
                            }
                        }))
                    }}
                />

                <Text>{this.state.userDetails.firstName}</Text>
                <Text>{this.state.userDetails.lastName}</Text>
                <Text>{this.state.userDetails.password}</Text>
            </View>
        );
    }
}

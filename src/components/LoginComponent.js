import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import CheckBox from 'react-native-check-box';

import login from '../fetch/login';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnEnable: true,
            accountID: '',
            password: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => { this.setState({ accountID: text }) }}
                    placeholder={'账号'}
                    clearButtonMode={'while-editing'}/>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => { this.setState({ password: text }) }}
                    placeholder={'密码'}
                    password={true}
                    clearButtonMode={'while-editing'} />
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        leftText={'记住密码'}
                        leftTextStyle={{fontSize: 15}}
                        style={styles.checkBox}
                        isChecked={true}
                        label={'label'}
                        onClick={(checked) => console.log('I am checked', checked)}/>
                    <CheckBox
                        leftText={'自动登录'}
                        leftTextStyle={{fontSize: 15}}
                        style={styles.checkBox}
                        isChecked={true}
                        label={'label'}
                        onClick={(checked) => console.log('I am checked', checked)}/>
                </View>
                <TouchableOpacity
                    style={this.state.btnEnable ? styles.btn : [styles.btn, styles.btnUnabled]}
                    disabled={!this.state.btnEnable}
                    onPress={this.loginBtnHandler.bind(this)}>
                    <Text style={styles.btnText}>login</Text>
                </TouchableOpacity>
            </View>
        );
    }
    loginBtnHandler() {
        this.setState({
            btnEnable: false
        });
        login(this.state.accountID, this.state.password, (data)=>{console.log(data);});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    btn: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#07c',
        borderColor: '#005999',
        height: 50,
        width: 200,
        borderRadius: 5
    },
    btnUnabled: {
        backgroundColor: '#bfbfbf',
    },
    btnText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 20
    },
    textInput: {
        marginTop:10,
        marginBottom: 10,
        paddingLeft: 10,
        height: 40,
        width: 250,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 2
    },
    checkBoxContainer: {
        flexDirection: 'row',
        width: 250,
    },
    checkBox: {
        padding: 10,
        flex: 1
    }
});
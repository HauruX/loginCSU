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
    Alert
} from 'react-native';
import CheckBox from './react-native-check-box';

import login from '../fetch/login';
// import {test} from '../fetch/login';
// import skipToLogin from '../fetch/skipToLogin';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnEnable: true,
            accountID: '',
            password: '',
            rememberPwd: false,
            autoLogin: false
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => { this.setState({ accountID: text }) }}
                    value={this.state.accountID}
                    placeholder={'账号'}
                    clearButtonMode={'while-editing'}/>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => { this.setState({ password: text }) }}
                    value={this.state.password}
                    placeholder={'密码'}
                    password={true}
                    clearButtonMode={'while-editing'} />
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        leftText={'记住密码'}
                        leftTextStyle={{fontSize: 15}}
                        style={styles.checkBox}
                        isChecked={this.state.rememberPwd}
                        onClick={this.rememberPwdHandler.bind(this)}/>
                    <CheckBox
                        leftText={'自动登录'}
                        leftTextStyle={{fontSize: 15}}
                        style={styles.checkBox}
                        isChecked={this.state.autoLogin}
                        onClick={this.autoLoginHandler.bind(this)}/>
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

    componentDidMount() {
        // 登陆账户、密码恢复
        storage.load({
            key: 'userInfo',
            autoSync: true,
            syncInBackground: true,
        }).then(userInfo => {
            console.log(userInfo);
            this.setState({
                accountID: userInfo.accountID && userInfo.accountID,
                password: userInfo.password && userInfo.password,
                rememberPwd: userInfo.rememberPwd && userInfo.rememberPwd,
                autoLogin: userInfo.autoLogin && userInfo.autoLogin
            })
        }).catch(err => {
            console.warn(err.message);
        })
    }    
    loginBtnHandler() {
        // this.setState({
        //     btnEnable: false
        // });
        storage.save({
            key: 'userInfo',
            rawData: {
                accountID: this.state.accountID,
                password: this.state.rememberPwd ? this.state.password : '',
                rememberPwd: this.state.rememberPwd,
                autoLogin: this.state.autoLogin
            },
        });
        login(this.state.accountID, this.state.password, (data)=>{this.props.refreshNetState()});
    }
    rememberPwdHandler() {
        this.setState({
            autoLogin: !this.state.rememberPwd && this.state.autoLogin,
            rememberPwd: !this.state.rememberPwd
        });
    }
    autoLoginHandler() {
        this.setState({
            rememberPwd: !this.state.autoLogin || this.state.rememberPwd,
            autoLogin: !this.state.autoLogin
        });
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
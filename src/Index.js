import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import LoginComponent from './components/LoginComponent';

export default class Index extends Component {
    render() {
        return (
            <View style={styles.container}>
                <LoginComponent></LoginComponent>
            </View>
        );
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
    }
});
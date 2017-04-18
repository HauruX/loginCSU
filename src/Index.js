import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

import logout from './fetch/logout';
import login from './fetch/login';

export default class Index extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.btn, styles.btnUnabled]} disabled={false} onPress={() => { login('013901130508', '306217')}}>
                    <Text style={styles.btnText}>login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnUnabled]} disabled={false} onPress={() => { logout()}}>
                    <Text style={styles.btnText}>logout</Text>
                </TouchableOpacity>
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
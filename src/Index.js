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
import LogoutComponent from './components/LogoutComponent';
import getNetState, {
    JUDGING,
    NOT_IN_CHINANET,
    CHINANET_ONLINE,
    CHINANET_OFFLINE
} from './fetch/netState';

import './utils/configStore'

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            netState: JUDGING,
        }
    }
    render() {
        switch (this.state.netState) {
            case JUDGING:
                return (
                    <View style={styles.container}>
                        <Text>检测网络状态中</Text>
                    </View>
                );
            case NOT_IN_CHINANET:
                return (
                    <View style={styles.container}>
                        <Text>不处于数字中南网络中</Text>
                    </View>
                );
            case CHINANET_ONLINE:
                return (
                    <View style={styles.container}>
                        <LogoutComponent refreshNetState={this.refreshNetState.bind(this)} />    
                    </View>
                );
            case CHINANET_OFFLINE:
                return (
                    <View style={styles.container}>
                        <LoginComponent refreshNetState={this.refreshNetState.bind(this)}></LoginComponent>
                    </View>
                );
        }
    }

    componentDidMount() {
        this.refreshNetState();
    }
    refreshNetState() {
        getNetState().then((function(netState) {
            this.setState({
                netState: netState
            })
        }).bind(this));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
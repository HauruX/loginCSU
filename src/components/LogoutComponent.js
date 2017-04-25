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

import logout from '../fetch/logout';
import getInfo from '../fetch/dataInfo';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            judging: true,
            info: null,
            intranetIP: null
        }
    }
    render() {
        // return (
        //     <View style={styles.container}>
        //         <Text>logout 等待施工🚧</Text>
        //         <TouchableOpacity style={[styles.btn, styles.btnUnabled]} disabled={false} onPress={() => { logout()}}>
        //             <Text style={styles.btnText}>logout</Text>
        //         </TouchableOpacity>
        //     </View>
        // );
        if (this.state.judging) {
            return (
                <View style={styles.container}>
                    <Text>信息获取中</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    {
                        this.state.info
                            ? this.state.info.map(function (value, index) {
                                return <Text key={index}>{value}</Text>
                            })
                            : <Text>无法获取流量信息</Text>
                    }
                    {
                        this.state.intranetIP
                            ? <TouchableOpacity style={styles.btn} disabled={false}
                                onPress={() => {
                                    logout(this.state.intranetIP ,(data)=>{this.props.refreshNetState()});
                                }}>
                                <Text style={styles.btnText}>下线</Text>
                            </TouchableOpacity>
                            : <TouchableOpacity style={[styles.btn, styles.btnUnabled]} disabled={true}>
                                <Text style={styles.btnText}>无法获取网络地址</Text>
                            </TouchableOpacity>
                    }
                </View>
            );
        }
    }
    componentDidMount() {
        getInfo().then(dataInfo => {
            console.log('datainfo', dataInfo);
            if (!dataInfo.error) {
                this.setState({
                    judging: false,
                    info: dataInfo.info,
                    intranetIP: dataInfo.intranetIP
                })
            } else {
                this.setState({
                    judging: false
                })
            }
        })
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
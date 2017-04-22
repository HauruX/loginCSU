import {
    Alert
} from 'react-native';

import timeout from '../utils/timeoutFetch';

const JUDGING = -1;
const NOT_IN_CHINANET = 0;
const CHINANET_ONLINE = 1;
const CHINANET_OFFLINE = 2;
const TIMEOUT = 1000;       // fetch延迟时间 超过该时间视为连接超时

function getNetState() {
    let checkChinanetAddress = 'http://61.137.86.87:8080/';
    let checkInternetAddress = 'http://baidu.com';

    return timeout(TIMEOUT, fetch(checkChinanetAddress, {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache'
        }
    })).then(function(response) {
        return timeout(TIMEOUT, fetch(checkInternetAddress, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'
            }
        })).then(function(response) {
            return response.text();
        }).then(function(text) {
            if (text.indexOf('www.baidu.com') >= 0) {
                return CHINANET_ONLINE;
            } else {
                return CHINANET_OFFLINE;
            }
        }).catch(function(error) {
            return CHINANET_OFFLINE;
        });
    }).catch(function(error) {
        return NOT_IN_CHINANET;
    });

}

export default getNetState;
export {
    JUDGING,
    NOT_IN_CHINANET,
    CHINANET_ONLINE,
    CHINANET_OFFLINE
};
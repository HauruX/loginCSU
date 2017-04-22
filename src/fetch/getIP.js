import timeout, {
    MAX_FETCH_TIME
} from '../utils/timeoutFetch';

function fetchIP192() {
    const validIpAddressRegexp = /(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(25[0-5]|1[0-9]{2}|2[0-4][0-9]|[1-9][0-9]|[0-9])/;

    return timeout(MAX_FETCH_TIME, fetch('http://192.168.1.1', {
        method: 'GET',
        credentials: 'same-origin'
    })).then(function(response) {
        return response.text();
    }).then(function(text) {
        let ipParseResult = validIpAddressRegexp.exec(text);
        if (ipParseResult !== null) {
            return ipParseResult[0];
        } else {
            // Alert.alert('192.168.1.1 连接错误')
            throw new Error();
        }
    }).catch(function(err) {
        Alert.alert('192.168.1.1 连接错误')
    });
}

export {
    fetchIP192
};
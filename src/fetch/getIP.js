import timeout, {
    MAX_FETCH_TIME
} from '../utils/timeoutFetch';

const validIpAddressRegexp = /(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(25[0-5]|1[0-9]{2}|2[0-4][0-9]|[1-9][0-9]|[0-9])/;

function getIntranetIP192() {
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

// ip-api.com 在中国访问速度过慢
// function getInternetIP() {
//     return timeout(MAX_FETCH_TIME, fetch('http://ip-api.com/json').then(function (res) {
//         return res.json();
//     }).then(function (data) {
//         if (validIpAddressRegexp.test(data.query)) {
//             return data.query;
//         } else {
//             return null;
//         }
//     }));
// }

function getInternetIP() {
    return timeout(MAX_FETCH_TIME, fetch('http://1212.ip138.com/ic.asp').then(function (res) {
        return res.text();
    }).then(function (data) {
        if (validIpAddressRegexp.test(data)) {
            return validIpAddressRegexp.exec(data)[0];
        } else {
            return null;
        }
    }));
}



export {
    getIntranetIP192,
    getInternetIP
};
import serializeJSON from '../utils/serializeJSON';
import RSAUtils from '../utils/security';
import timeout, {
    MAX_FETCH_TIME
} from '../utils/timeoutFetch';
import {
    getInternetIP
} from '../fetch/getIP';
import {
    setDataInfo,
    getDataInfo
} from '../fetch/localStore';

function getInfo() {
    const infoURL = 'http://61.137.86.87:8080/portalNat444/main2.jsp';
    const validIpAddressRegexp = /(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(25[0-5]|1[0-9]{2}|2[0-4][0-9]|[1-9][0-9]|[0-9])/;

    return timeout(MAX_FETCH_TIME, fetch(infoURL, {
        method: 'GET',
        credentials: 'same-origin',
    })).then(function(response) {
        return response.text();
    }).then(function(text) {
        let ipParseResult = validIpAddressRegexp.exec(text);
        if (ipParseResult !== null) {
            return getInternetIP().then(function(internetIP) {
                let dataInfo = {
                    intranetIP: ipParseResult[0],
                    internetIP: internetIP,
                    info: parseInfo(text)
                }
                setDataInfo(dataInfo);
                return dataInfo;
            })
        } else {
            return getInternetIP().then(function(internetIP) {
                if (internetIP) {
                    return getDataInfo().then(function(dataInfo) {
                        if (dataInfo && internetIP == dataInfo.internetIP) {
                            return dataInfo;
                        } else {
                            return {
                                error: true
                            }
                        }
                    });
                } else {
                    return {
                        error: true
                    }
                }
            })
        }
    }).catch(function(err) {
        console.log(err);
    });
}

function parseInfo(text) {
    /您的账户本月总流量\(公网\):(\d+)MB/
    return [
        /您的账户本月剩余流量\(公网\):(\d+([.]{1}[0-9]+){0,1})MB/.exec(text)[0],
        /您的账户本月已用流量\(公网\):(\d+([.]{1}[0-9]+){0,1})MB/.exec(text)[0],
        /您的账户本月总流量\(公网\):(\d+)MB/.exec(text)[0],
        /您宽带账户当前剩余金额:(\d+([.]{1}[0-9]+){0,1})元/.exec(text)[0],
    ]
}

export default getInfo;
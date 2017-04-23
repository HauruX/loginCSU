import serializeJSON from '../utils/serializeJSON';
import RSAUtils from '../utils/security';
import timeout, {
    MAX_FETCH_TIME
} from '../utils/timeoutFetch';
import {
    fetchIP192
} from '../fetch/getIP';

import {
    Alert
} from 'react-native';

function login(accountID, password, callback) {
    const loginURL = 'http://61.137.86.87:8080/portalNat444/AccessServices/login';
    const referURL = 'http://61.137.86.87:8080/portalNat444/main.jsp';
    const brasAddress = '59df7586';

    accountID += '@zndx.inter';
    password = encrypt(password);

    fetchIP192().then(function(intranetAddress) {
        let formData = {
            accountID: accountID,
            password: password,
            brasAddress: brasAddress,
            userIntranetAddress: intranetAddress
        }

        timeout(MAX_FETCH_TIME, fetch(loginURL, {
            // 可能需要添加cookie same-origin选项
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Referer': referURL
            },
            body: serializeJSON(formData)
        })).then(function(response) {
            // console.log(response);
            return response.json();
        }).then(function(data) {
            console.log(data);
            if (data.resultCode && data.resultCode == '0') {
                callback(data);
            } else {
                alertErrorCode(data.resultCode, data.resultDescribe);
            }
        }).catch(function(err) {});
    })

}

function encrypt(password) {
    var publickey = RSAUtils.getKeyPair("10001", "", "a8a02b821d52d3d0ca90620c78474b78435423be99da83cc190ab5cb5b9b922a4c8ba6b251e78429757cf11cde119e1eacff46fa3bf3b43ef68ceb29897b7aa6b5b1359fef6f35f32b748dc109fd3d09f3443a2cc3b73e99579f3d0fe6a96ccf6a48bc40056a6cac327d309b93b1d61d6f6e8f4a42fc9540f34f1c4a2e053445");
    var result = RSAUtils.encryptedString(publickey, encodeURIComponent(password));
    return result;
}

function alertErrorCode(resultCode, resultDescribe) {
    let alert = Alert.alert;
    console.log(resultCode);
    switch ('' + resultCode) {
        case '0':
            // window.location = "main2.jsp";
            break;
        case '1':
            if (resultDescribe == null || resultDescribe == "") {
                alert('其他原因认证拒绝');
            } else {
                alert(resultDescribe);
            }
            break;
        case '2':
            alert('用户连接已经存在');
            break;
        case '3':
            alert('接入服器务繁忙，稍后重试');
            break;
        case '4':
            alert('未知错误');
            break;
        case '6':
            alert('认证响应超时');
            break;
        case '7':
            alert('捕获用户网络地址错误');
            break;
        case '8':
            alert('服务器网络连接异常');
            break;
        case '9':
            alert('认证服务脚本执行异常');
            break;
        case '10':
            alert('校验码错误');
            break;
        case '11':
            alert('您的密码相对简单，帐号存在被盗风险，请及时修改成强度高的密码');
            // window.location = "main2.jsp";
            break;
        case '12':
            alert('无法获取您的网络地址,请输入任意其它网站从网关处导航至本认证页面');
            break;
        case '13':
            alert('无法获取您接入点设备地址，请输入任意其它网站从网关处导航至本认证页面');
            break;
        case '14':
            alert('无法获取您套餐信息');
            break;
        case '16':
            alert('请输入任意其它网站导航至本认证页面,并按正常PORTAL正常流程认证');
            break;
        case '17':
            alert('连接已失效，请输入任意其它网站从网关处导航至本认证页面');
            break;
        default:
            alert('未知错误');
            break;
    }
}

export default login;
import serializeJSON from '../utils/serializeJSON';

function logout(intranetAddress, callback) {
    const logoutURL = 'http://61.137.86.87:8080/portalNat444/AccessServices/logout'
    const referURL = 'http://61.137.86.87:8080/portalNat444/main2.jsp'

    // FormData 使用方式暂不清楚
    // let formData = new FormData();
    let formData = {
        brasAddress: '59df7586',
        userIntranetAddress: intranetAddress
    }

    fetch(logoutURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': referURL
        },
        body: serializeJSON(formData)
    }).then(function(response) {
        // console.log(response);
        return response.json();
    }).then(function(data) {
        console.log(data);
        callback();
    }).catch(function(err) {});
}

export default logout;
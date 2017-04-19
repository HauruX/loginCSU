import serializeJSON from '../utils/serializeJSON';
import RSAUtils from '../utils/security';

function login(accountID, password, callback) {
    const louginURL = 'http://61.137.86.87:8080/portalNat444/AccessServices/login';
    const referURL = 'http://61.137.86.87:8080/portalNat444/main.jsp';
    const brasAddress = '59df7586';

    accountID += '@zndx.inter';
    password = encrypt(password);

    ////////tmp
    let intranetAddress = '10.96.37.104'

    let formData = {
        accountID: accountID,
        password: password,
        brasAddress: brasAddress,
        userIntranetAddress: intranetAddress
    }

    fetch(louginURL, {
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
        // console.log(data);
        // return data;
        callback(data);
    }).catch(function(err) {});
}

function encrypt(password) {
    var publickey = RSAUtils.getKeyPair("10001", "", "a8a02b821d52d3d0ca90620c78474b78435423be99da83cc190ab5cb5b9b922a4c8ba6b251e78429757cf11cde119e1eacff46fa3bf3b43ef68ceb29897b7aa6b5b1359fef6f35f32b748dc109fd3d09f3443a2cc3b73e99579f3d0fe6a96ccf6a48bc40056a6cac327d309b93b1d61d6f6e8f4a42fc9540f34f1c4a2e053445");
    var result = RSAUtils.encryptedString(publickey, encodeURIComponent(password));
    return result;
}

export default login;
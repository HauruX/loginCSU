function setUserInfo(userInfo) {
    storage.save({
        key: 'userInfo',
        rawData: userInfo,
    });
}

function getUserInfo(callback) {
    storage.load({
        key: 'userInfo',
        autoSync: true,
        syncInBackground: true,
    }).then(function(userInfo) {
        callback(userInfo)
    }).catch(err => {
        console.warn(err.message);
    })
}

function setJSESSIONID(jsessionid) {
    storage.save({
        key: 'JSESSIONID',
        rawData: jsessionid,
    });
}

function getJSESSIONID(callback) {
    storage.load({
        key: 'JSESSIONID',
        autoSync: true,
        syncInBackground: true,
    }).then(function(jsessionid) {
        callback(jsessionid)
    }).catch(err => {
        console.warn(err.message);
        return null;
    })
}

export {
    setUserInfo,
    getUserInfo,
    setJSESSIONID,
    getJSESSIONID
}
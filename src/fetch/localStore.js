function setUserInfo(userInfo) {
    storage.save({
        key: 'userInfo',
        rawData: userInfo,
    });
}

function getUserInfo() {
    return storage.load({
        key: 'userInfo',
        autoSync: true,
        syncInBackground: true,
    }).catch(err => {
        // console.warn(err.message);
    })
}

function setDataInfo(dataInfo) {
    storage.save({
        key: 'dataInfo',
        rawData: dataInfo,
    });
}

function getDataInfo(callback) {
    return storage.load({
        key: 'dataInfo',
        autoSync: true,
        syncInBackground: true,
    }).catch(err => {
        // console.warn(err.message);
    })
}

export {
    setUserInfo,
    getUserInfo,
    setDataInfo,
    getDataInfo
}
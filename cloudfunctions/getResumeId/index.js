const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

exports.main = async (event, context) => {
    id = '';
    await db.collection('resume').add({
        data: event.msg,
    }).then(res => {
        id = res._id;
    })
    return await id;
}
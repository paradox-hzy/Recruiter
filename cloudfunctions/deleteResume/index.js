const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

exports.main = async (event, context) => {
    await db.collection('resume').where({
        _id: event._id,
    }).remove();
    return await true;
}
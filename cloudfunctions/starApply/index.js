const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

exports.main = async (event, context) => {
    await db.collection('apply').where({
        _id: event.applyid
    }).update({
        data: {
            star: event.state
        },
    });
    return {
        success: true
    };
}
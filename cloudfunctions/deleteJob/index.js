const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

exports.main = async (event, context) => {
    await db.collection('job').where({
        _id: event.jobID,
    }).remove();
    await db.collection('apply').where({
        jobID: event.jobID,
    }).remove();
    await db.collection('resume').where({
        jobID: event.jobID,
    }).remove();
    return await true;
}
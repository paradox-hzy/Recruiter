const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
    let searchCriteria = {};
    if (event.isEnterprise == true || event.isEnterprise == false) {
        searchCriteria['isEnterprise'] = event.isEnterprise;
    }
    if (event.jobtitle !== null && event.jobtitle != '') {
        searchCriteria['jobtitle'] = event.jobtitle;
    }
    if (event.minsalary != null && event.minsalary != NaN && event.minsalary > 0 && event.minsalary % 1 == 0) {
        searchCriteria['salary'] = _.gte(event.minsalary);
    }

    return await db.collection('job').where(searchCriteria).get()
}
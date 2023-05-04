var userArray = [];

function userJoin(id, username, branch) {
    const user = { id, username, branch };
    userArray.push(user);
    return user;
}
function getUser(id) {
    return userArray.find(user => user.id === id);
}

function userLeave(id) {
    const index = userArray.findIndex(user => user.id === id);
    if (index !== -1) {
        return userArray.splice(index, 1)[0];
    }
}

function getBranchUsers(branch) {
    return userArray.filter(user => user.branch === branch);
}

module.exports = {
    userJoin,
    getUser,
    userLeave,
    getBranchUsers
}


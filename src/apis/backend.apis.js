const pathForHomeApi = '/api';

const pathForAdminPrefix = `${pathForHomeApi}/admin`;

const pathForRoomPrefix = `${pathForAdminPrefix}/room`;

const roomApis = {
    listAll: `${pathForRoomPrefix}/listAll`
}

const adminApis = {
    login: `${pathForAdminPrefix}/login`
}

module.exports = {
    roomApis,
    adminApis
}
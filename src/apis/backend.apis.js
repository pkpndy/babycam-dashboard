const pathForHomeApi = '/api';

const pathForAdminPrefix = `${pathForHomeApi}/admin`;

const pathForRoomPrefix = `${pathForAdminPrefix}/room`;

const roomApis = {
    listAll: `${pathForRoomPrefix}/listAll`
}

const adminApis = {
    login: `${pathForAdminPrefix}/login`,
    auth: `${pathForAdminPrefix}/auth`
}

module.exports = {
    roomApis,
    adminApis
}
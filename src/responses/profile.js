"use strict";

function createProfile(url, info, sessionID) {
    profile_f.profileServer.createProfile(info, sessionID);
    return json.stringify({"err": 0, "errmsg": null, "data": {"uid": "pmc" + sessionID}});
}

function getProfileData(url, info, sessionID) {
    let output = {"err": 0, "errmsg": null, "data": []};

    if (!account_f.accountServer.isWiped(sessionID)) {
        output.data.push(profile_f.profileServer.getPmcProfile(sessionID));
        output.data.push(profile_f.profileServer.getScavProfile(sessionID));
    }

    return json.stringify(output);
}

function regenerateScav(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": [profile_f.profileServer.generateScav(sessionID)]});
}

function changeVoice(url, info, sessionID) {
    profile_f.profileServer.changeVoice(info, sessionID);
    return json.stringify({"err":0, "errmsg": null, "data": null});
}

function changeNickname(url, info, sessionID) {
    let output = profile_f.profileServer.changeNickname(info, sessionID);

    if (output.status === 255) {
        return json.stringify({"err": 225, "errmsg": "this nickname is already in use", "data": null});
    }

    return json.stringify({"err":0, "errmsg":null, "data": data});
}

function getReservedNickname(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": account_f.accountServer.getNickname(sessionID)});
}

function validateNickname(url, info, sessionID) {
    let output = profile_f.profileServer.validateNickname(info, sessionID);

    if (output.status === null) {
        return json.stringify({"err": 225, "errmsg": "this nickname is already in use", "data": null});
    }

    return json.stringify({"err": 0, "errmsg": null, "data": output});
}

router.addStaticRoute("/client/game/profile/create", createProfile);
router.addStaticRoute("/client/game/profile/list", getProfileData);
router.addStaticRoute("/client/game/profile/savage/regenerate", regenerateScav);
router.addStaticRoute("/client/game/profile/voice/change", changeVoice);
router.addStaticRoute("/client/game/profile/nickname/change", changeNickname);
router.addStaticRoute("/client/game/profile/nickname/reserved", getReservedNickname);
router.addStaticRoute("/client/game/profile/nickname/validate", validateNickname);

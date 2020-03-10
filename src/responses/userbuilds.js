"use strict";

function getHandbookUserlist(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": weaponBuilds_f.getUserBuilds(sessionID)});
}

router.addStaticRoute("/client/handbook/builds/my/list", getHandbookUserlist);
item_f.itemServer.addRoute("SaveBuild", weaponBuilds_f.saveBuild);
item_f.itemServer.addRoute("RemoveBuild", weaponBuilds_f.removeBuild);
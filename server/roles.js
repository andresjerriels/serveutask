const AccessControl = require("accesscontrol");
const accessControl = new AccessControl();

exports.roles = (function() {
    accessControl.grant("user")
    .readOwn("profile")
    .updateOwn("profile")

    accessControl.grant("admin")
    .extend("user")
    .createAny("profile")
    .readAny("profile")
    .updateAny("profile")
    .deleteAny("profile")

    return accessControl;
})();
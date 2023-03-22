const express = require("express");
const router = express();
const { createCMSOrganizer, createCMSUser, getCMSUsers } = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth");

// yang bisa create users hanya organizer dan yang bisa create organizer hanya owner
router.post("/organizers", authenticateUser, authorizeRoles("owner"), createCMSOrganizer);
router.post("/users", authenticateUser, authorizeRoles("organizer"), createCMSUser);
router.get("/users", authenticateUser, authorizeRoles("owner"), getCMSUsers);

module.exports = router;

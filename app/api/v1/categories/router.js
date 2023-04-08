const express = require("express");
const router = express();
const { index, create, find, update, destroy } = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth"); // authorizeRoles untuk kasih akses buat kategori

// sesuai flow apps kita, hanya Organizer yang bisa mengelola data categories (create, read, update and delete)
// penggunaan middleware authenticate user
router.get("/categories", authenticateUser, authorizeRoles("organizer"), index);
router.get("/categories/:id", authenticateUser, authorizeRoles("organizer"), find);
router.put("/categories/:id", authenticateUser, authorizeRoles("organizer"), update);
router.delete("/categories/:id", authenticateUser, authorizeRoles("organizer"), destroy);
router.post("/categories", authenticateUser, authorizeRoles("organizer"), create); // di create ada middleware autentikasi user karena kita menambahkannya di model untuk di panggil

module.exports = router;

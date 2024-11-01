const express = require('express');
const router = express.Router();

// reroute GET calls to index to /catalog router
router.get('/', function(req, res) {
    res.redirect("/catalog");
});

module.exports = router;
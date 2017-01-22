var express = require('express');
var router = express.Router();

//router.use('/comments', require('./comments'))
//router.use('/users', require('./users'))

router.post('/config', function(req, res) {
	console.log("config request", req);
	res.json({data:"OK"});
});

module.exports = router;

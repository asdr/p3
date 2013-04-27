var express = require('express'),
	app = express(),
	AuthRoute = require('./routes/authroute'),
    AdminRoute = require('./routes/adminroute');

app.configure(function () {
	app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
});

app.get('/signin', AuthRoute.signin);
app.get('/signup', AuthRoute.signup);
app.get('/admin/create', AdminRoute.createAdmin);

app.listen(3000);
console.log('Listening on port 3000...');

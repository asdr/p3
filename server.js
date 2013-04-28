var express = require('express'),
	app = express(),
    AdminRoute = require('./routes/adminroute');

app.configure(function () {
	app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
});

//TODO: methods must be configured RESTfully
app.post('/admin/create', AdminRoute.create);
app.get('/admin/list', AdminRoute.list);
app.delete('/admin/remove/:id', AdminRoute.remove);
app.delete('/admin/removeAll', AdminRoute.removeAll);

app.listen(3000);
console.log('Listening on port 3000...');

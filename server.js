var express = require('express'),
    app = express(),
    ApplicationRoute = require('./routes/ApplicationRoute'),
    AdminRoute = require('./routes/AdminRoute'),
    AuthRoute = require('./routes/AuthRoute'),
    CourseRoute = require('./routes/CourseRoute'),
    DocumentRoute = require('./routes/DocumentRoute');

var API_VERSION = "1.0";

app.configure(function () {
    app.set('view engine', 'ejs');
    app.set('views', __dirname+'/views');
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use('/', express.static(__dirname + '/client'));
    app.use(express.bodyParser());
    app.use(express.cookieParser('this is a secret.!!!!///sssh'));
    app.use(express.session());
});

app.get('/v/index', function(req, res) {
    res.render('index', { 'signedInUser': req.session.user });
});
app.get('/v/signin', function(req, res) {
    res.render('signin', { 'signedInUser': req.session.user });
});
app.get('/v/sidebar', function(req, res) {
    res.render('sidebar', { 'signedInUser': req.session.user });
});
app.get('/v/welcome', function(req, res) {
    res.render('welcome', { 'signedInUser': req.session.user });
});


//TODO: methods must be configured RESTfully
app.get('/api/v' + API_VERSION + '/open', ApplicationRoute.open);
app.post('/api/v' + API_VERSION + '/admin/create', AdminRoute.create);

app.post('/api/v' + API_VERSION + '/auth/signin', AuthRoute.signin);
app.get('/api/v' + API_VERSION + '/auth/signout', AuthRoute.signout);

app.get('/api/v' + API_VERSION + '/course/list', CourseRoute.listCourses);
app.post('/api/v' + API_VERSION + '/course', CourseRoute.createCourse);
app.delete('/api/v' + API_VERSION + '/course', CourseRoute.removeCourse);
app.get('/api/v' + API_VERSION + '/course/:course_name', CourseRoute.listCourses);
app.post('/api/v' + API_VERSION + '/document/upload', DocumentRoute.upload);

// admin CRUD functions is not available over API
// for security reasons
//app.post('/admin/create', AdminRoute.create);
//app.get('/admin/list', AdminRoute.list);
//app.delete('/admin/remove/:id', AdminRoute.remove);
//app.delete('/admin/removeAll', AdminRoute.removeAll);

app.listen(3000);
console.log('Listening on port 3000...');

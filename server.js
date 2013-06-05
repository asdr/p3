var express = require('express'),
    app = express(),
    ApplicationRoute = require('./routes/ApplicationRoute'),
    AdminRoute = require('./routes/AdminRoute'),
    AuthRoute = require('./routes/AuthRoute'),
    CourseRoute = require('./routes/CourseRoute'),
    DocumentRoute = require('./routes/DocumentRoute'),
    InstructorRoute = require('./routes/InstructorRoute'),
    AdminController = require('./controllers/AdminController'),
    InstructorController = require('./controllers/InstructorController'),
    CourseController = require('./controllers/CourseController'),
    ClassListController = require('./controllers/ClassListController');

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

AdminController.getAdmin({}, function(err, admins) {
    if (admins.length == 0) {
        AdminController.createAdmin({
            'email': 'admin'
            ,'firstname': 'admin'
            ,'lastname':'admin'
        }, function(err) {
            ;
        });
    }
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
app.get('/v/adminf', function(req, res) {
    AdminController.getAdmin({}, function(err, admins) {
        res.render('adminf', { 'signedInUser': req.session.user, 'admins': admins });
    });
});
app.get('/v/instructorf', function(req, res) {
    InstructorController.getInstructor({}, function(err, instructors) {
        res.render('instructorf', { 'signedInUser': req.session.user, 'instructors': instructors });
    });
});

app.get('/v/coursef', function(req, res) {
    InstructorController.getInstructor({}, function(err, instructors) {
        if (!err) {
            CourseController.getCourse({}, function(err2, courses) {
                if (!err2) {
                    res.render('coursef', { 'signedInUser': req.session.user, 'instructors': instructors, 'courses': courses });
                }
                else
                {
                    res.render('coursef', { 'signedInUser': req.session.user, 'instructors': instructors, 'courses': []  });
                }
            });
        }
    });
});

app.get('/v/uploadf', function(req, res) {
    ClassListController.hasStudent(req.session.user, function(err, myCourses) {
        if (!err) {
            res.render('uploadf', { 'signedInUser': req.session.user, 'courses': myCourses });
        }
        else {
            res.render('uploadf', { 'signedInUser': req.session.user, 'courses': [] });
        }
    });
});

app.get('/v/displayf', function(req, res) {
    CourseController.getCourse({ 'instructor_email': req.session.user.email }, function(err, courses) {
        if (!err) {
            res.render('displayf', { 'signedInUser': req.session.user, 'courses': courses });
        }
        else {
            res.render('displayf', { 'signedInUser': req.session.user, 'courses': [] });
        }
    });
});

app.get('/v/evaluatef', function(req, res) {
    CourseController.getCourse({ 'instructor_email': req.session.user.email }, function(err, courses) {
        if (!err) {
            res.render('evaluatef', { 'signedInUser': req.session.user, 'courses': courses });
        }
        else {
            res.render('evaluatef', { 'signedInUser': req.session.user, 'courses': [] });
        }
    });
});

app.get('/v/gradesf', function(req, res) {
    ClassListController.hasStudent(req.session.user, function(err, myCourses) {
        if (!err) {
            res.render('gradesf', { 'signedInUser': req.session.user, 'courses': myCourses });
        }
        else {
            res.render('gradesf', { 'signedInUser': req.session.user, 'courses': [] });
        }
    });
});

//TODO: methods must be configured RESTfully
app.get('/api/v' + API_VERSION + '/open', ApplicationRoute.open);
app.post('/api/v' + API_VERSION + '/admin/create', AdminRoute.create);
app.delete('/api/v' + API_VERSION + '/admin/:admin_id', AdminRoute.remove);

app.get('/api/v' + API_VERSION + '/instructor/all', InstructorRoute.list);
app.get('/api/v' + API_VERSION + '/instructor/:instructor_id', InstructorRoute.get);
app.delete('/api/v' + API_VERSION + '/instructor/:instructor_id', InstructorRoute.remove);
app.post('/api/v' + API_VERSION + '/instructor/create', InstructorRoute.create);

app.post('/api/v' + API_VERSION + '/auth/signin', AuthRoute.signin);
app.get('/api/v' + API_VERSION + '/auth/signout', AuthRoute.signout);

app.get('/api/v' + API_VERSION + '/course/list', CourseRoute.listCourses);
app.post('/api/v' + API_VERSION + '/course', CourseRoute.createCourse);
app.get('/api/v' + API_VERSION + '/course/:course_id', CourseRoute.listCourses);
app.post('/api/v' + API_VERSION + '/course/excel', CourseRoute.createByExcelFile);
app.delete('/api/v' + API_VERSION + '/course/:course_id', CourseRoute.removeCourse);
app.post('/api/v' + API_VERSION + '/course/projecttype', CourseRoute.addProjectType);
app.delete('/api/v' + API_VERSION + '/course/projecttype/:course_id', CourseRoute.removeProjectType);
app.post('/api/v' + API_VERSION + '/course/classlist', CourseRoute.createClassList);
app.get('/api/v' + API_VERSION + '/course/classlist/:course_id', CourseRoute.getClassList);


app.post('/api/v' + API_VERSION + '/document', DocumentRoute.getDocument);
app.post('/api/v' + API_VERSION + '/document/name', DocumentRoute.getDocumentName);
app.post('/api/v' + API_VERSION + '/document/upload/:uploader_name', DocumentRoute.upload);
app.post('/api/v' + API_VERSION + '/document/download', DocumentRoute.download);
app.post('/api/v' + API_VERSION + '/document/evaluate', DocumentRoute.evaluate);

// admin CRUD functions is not available over API
// for security reasons
//app.post('/admin/create', AdminRoute.create);
//app.get('/admin/list', AdminRoute.list);
//app.delete('/admin/remove/:id', AdminRoute.remove);
//app.delete('/admin/removeAll', AdminRoute.removeAll);

app.listen(3000);
console.log('Listening on port 3000...');


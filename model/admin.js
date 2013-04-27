var mongo = require('mongodb'),
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    DBConnector = require('../core/dbconnector').getInstance();

var Admin = (function() {
	
    function _create( admin, callback )
    {
        var db = DBConnector.db();
        
        console.log('Admin.create');

        db.collection('admins', function(err, collection) {
            collection.insert( admin, {fsync: true}, callback );
        });
    }

    function _update( key, admin )
    {
                
    }

    function _delete( key )
    {
        var db = DBConnector.db(),
            ret;
        
        console.log('Admin.delete');
        
    }

    function _get( key )
    {
        
    }

    return {
        'create': _create,
        'update': _update,
        'delete': _delete,
        'get': _get   
    };
})();

module.exports = Admin;

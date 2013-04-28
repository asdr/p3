var mongo = require('mongodb'),
    Db = mongo.Db,
    DBConnector = require('../core/dbconnector').getInstance();

var DAO = function( collection_name ) {
    
    function _create( object, callback )
    {
        var db = DBConnector.db();

        console.log('DAO(', collection_name, ').create');

        db.collection(collection_name, function(err, collection) {
            collection.insert( object, {fsync: true}, callback );
        });
    }

    function _update( key, object, callback )
    {
        var db = DBConnector.db();

        console.log('DAO(', collection_name, ').update');
        
        db.collection(collection_name, function(err, collection) {
            collection.update(key, object, callback);
        });
    }

    function _remove( key, callback )
    {
        var db = DBConnector.db();
        
        console.log('DAO(', collection_name, ').delete');

        db.collection(collection_name, function(err, collection) {

            // if key is false, all collection will be removed!!!!!
            collection.remove(key||{}, callback);
        });
    }

    function _get( key, callback)
    {
        var db = DBConnector.db();
        
        console.log('DAO(', collection_name, ').get');
        
        db.collection(collection_name, function(err, collection) {
            collection.find(key||{}).toArray(callback);
        });

    }

    return {
        'create': _create,
        'update': _update,
        'remove': _remove,
        'get': _get   
    };
};

module.exports = DAO;

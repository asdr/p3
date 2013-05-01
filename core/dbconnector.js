var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;

var _default_db_host = 'localhost',
    _default_db_port = 27017,
    _default_db_name = 'p3db',
    _instance = null,

    // actuall, mongodb has an inner pool for concurrent db actions
    // but, i didn't know this before.
    _pool_size = 1;

var DBConnector = function( options ) {
    this.host = options.host || _default_db_host;
    this.port = options.port || _default_db_port;
    this.name = options.name || _default_db_name;
    this.pool = new Array( _pool_size ),
    this.next_db = 0;

    for (var i=0; i<_pool_size; ++i)
    {
        var server = new Server(this.host, this.port, {auto_reconnect: true, poolSize: 5}),
            //safe for single node
            //waits for every write for fsync and journal
            db = new Db(this.name, server, {fsync:true});

        this.pool[i] = { 'server': server, 'db': db };

        db.open(function(err, db) {
            if ( !err ) {
                console.log('connection[' + i + ']');
            }
        });
    }
};

DBConnector.prototype.db = function() {
    this.next_db = (this.next_db + 1) % _pool_size;
    return this.pool[ this.next_db ].db;
};

DBConnector.prototype.close = function() {
    //TODO: close connection
    for (var i=0; i<_pool_size; ++i)
    {
        this.pool[i].db.close(function(err) {
            if ( !err ) {
                console.log('close[' + i + '].');
            }
        });
    }
};

DBConnector.getInstance = function( options ) {
    return _instance || ( _instance = new DBConnector(options||{}) );
}

DBConnector.DEFAULT_DB_HOST = _default_db_host;
DBConnector.DEFAULT_DB_PORT = _default_db_port;
DBConnector.DEFAULT_DB_NAME = _default_db_name;

module.exports = DBConnector;
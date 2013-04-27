var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;

var DBConnector = (function() {

	var _default_db_host = 'localhost',
		_default_db_port = 27017,
		_default_db_name = 'p3db',
		_instance = null,
        _pool_size = 1;

    function _constructor ( options ) {
    	this.host = options.host || _default_db_host;
		this.port = options.port || _default_db_port;
		this.name = options.name || _default_db_name;
		this.pool = new Array( _pool_size ),
        this.next_db = 0;

        for (var i=0; i<_pool_size; ++i)
        {
            this.pool[i] = new Server(this.host, this.port, {auto_reconnect: true});
            this.pool[i] = {
                'server': this.pool[i], 
                //safe for single node
                //waits for every write for fsync and journal
                'db': new Db(this.name, this.pool[i], {fsync:true})
            };

            this.pool[i].db.open(function(err, db) {
                if ( !err ) {
                    console.log('connection[' + i + ']');
                }
            });
        }
        
	}

    _constructor.prototype.db = function() {
        return this.pool[ this.next_db++ % _pool_size ].db;
    };

	_constructor.prototype.close = function() {
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

	function _getInstance( options ) {
		return _instance || ( _instance = new _constructor(options||{}) );
	}

	return {
		DEFAULT_DB_HOST: _default_db_host,
		DEFAULT_DB_PORT: _default_db_port,
		DEFAULT_DB_NAME: _default_db_name,
		getInstance: _getInstance
	};

})();

module.exports = DBConnector;

const fs = require( 'fs' );

class Database {
    constructor ( file ) {
        this.file = file;
        this.obj = undefined;
        this.fetch( );
        return this;
    }
    fetch ( ) {
        console.log( 'Fetching. . .' )
        this.obj = JSON.parse( fs.readFileSync( this.file ) );
    }
    save ( ) {
        console.log( 'Saving. . .' )
        fs.writeFileSync( this.file, JSON.stringify( this.obj ) );
    }
}

const tree = new Database( './database/functions.json' );

module.exports = {
    tree
}
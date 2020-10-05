const fs = require( 'fs' );

class Database {
    constructor ( file ) {
        this.file = file;
        //this.obj = {"open": {"explorer": {"keywords": ["files","arquivos","windows","explorer","explorer","explorar","explorador","documentos","documents","o cara que escreveu o codigo de adicionar caracter é um puta genio, pqp amo ele"],"url": "explorer"},"youtube": {"keywords": ["youtube","yt"],"url": "https://youtube.com"},"twitch": {"keywords": ["twitch"],"url": "https://www.twitch.tv"}}};
        //this.save();
        this.obj = undefined;
        this.fetch( );
        if ( this.obj == undefined ) {
            this.obj = {
                open: {
                    youtube: {
                        keywords: [
                            "yt",
                            "youtube"
                        ],
                        url: "https://youtube.com"
                    }
                }
            }
            this.save( );
        }
        return this;
    }
    fetch ( ) {
        console.log( 'Fetching. . .' )
        this.obj = JSON.parse( fs.readFileSync( this.file ) );
    }
    save ( ) {
        console.log( 'Saving. . .' )
        fs.writeFileSync( this.file, JSON.stringify( this.obj ) );
        this.fetch( );
    }
}

const tree = new Database( './database/functions.json' );

module.exports = {
    tree
}
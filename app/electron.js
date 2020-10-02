const { app, BrowserWindow } = require( 'electron' );
const WINDOWconfig = require( '../config/WINDOW.json' );

module.exports = {
    createWindow: ( view = 'index', config ) => {
        const window = new BrowserWindow( config );
        window.setMenu( null );
        window.loadFile( `views/${ view }.html` ); // Cosiderar o diretório do arquivo que chama a função (app.js), não onde ela é definida (electron.js)
        return window;
    }
}
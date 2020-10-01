const electron      = require('electron')
const app           = electron.app;
const url           = require( 'url' );
const path          = require( 'path' );
const WINDOWconfig  = require( './config/WINDOW.json' );

const { createWindow } = require( './src/electron' );

const logo = path.join( __dirname, 'img/logo2.png' );

let tray = null;

app.whenReady()
.then( ( ) => {

    /* Iniciar Text To Speech */

    app.commandLine.appendSwitch('enable-speech-dispatcher');

    /* Create MainWindow */

    const MainWindow = createWindow( 'index', WINDOWconfig.defaultConfig, { icon: logo } );
    MainWindow.setIcon( logo );

    /* Tray Menu */

    tray = new electron.Tray( logo );
    const contextMenu = electron.Menu.buildFromTemplate([
        { label: 'Show App', click: ( ) => {
            MainWindow.show();
        } },
        { label: 'Quit', click: ( ) => {
            app.isQuiting = true;
            app.quit();
        } }
    ]);
    tray.setContextMenu( contextMenu );

    /* MainWindow Events */

    /*MainWindow.on( 'close', ( event ) => {  // Minimize to tray on close
        if ( !app.isQuiting ){
            event.preventDefault();
            MainWindow.hide();
        }
    } );*/
    
} )
.catch( ( error ) => {
    console.log( error );
} )
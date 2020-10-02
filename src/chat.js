const { ipcRenderer }   = require( 'electron' );
const nodeConsole       = require( 'console' );
const console           = new nodeConsole.Console(process.stdout, process.stderr);

/* Send Message */

document.addEventListener( 'keydown', ( event ) => {
    if ( event.keyCode == 13 ) userSend( );
} )


function userSend ( ) {
    const input = document.getElementById( 'input' );
    if ( input.value.trim( ) == '' ) return;
    const message = new Men( input.value, true );
    message.show( );
    ipcRenderer.send( 'command', message.text );
    input.value = '';
}

/* Event Listeners */

ipcRenderer.on( 'message', ( event, text ) => {
    const message = new Men( text, false );
    message.show( );
    message.talk( );
} )

/* Change Window */

function changeWindow( window ) {
    const windows = [ 'home', 'functions' ];
    windows.forEach( ( win ) => {
        const style = document.getElementById( win ).style;
        if ( window == win ) style.display = 'flex';
        else style.display = 'none';
    } )
}
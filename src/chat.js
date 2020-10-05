const { ipcRenderer }   = require( 'electron' );
const nodeConsole       = require( 'console' );
const console           = new nodeConsole.Console(process.stdout, process.stderr);
const { tree }          = require( './../app/database' );

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

/* Functions Config Scripts */

editor.addEventListener( 'keydown', ( event ) => {
    if ( event.keyCode == 9 ){ 
        event.preventDefault();
        insertAtCaret( 'editor', '\t' );
    }
    else if ( event.key == '\'' ){
        insertAtCaret( 'editor', '\'' );
    }
    else if ( event.key == '\"' ){
        insertAtCaret( 'editor', '\"' );
    }
    else if ( event.key == '{' ){
        event.preventDefault();
        setTimeout( insertAtCaret( 'editor', '{\n\n}' ), 10000 );
    }
    else if ( event.key == '[' ){
        event.preventDefault();
        setTimeout( insertAtCaret( 'editor', '[\n\n]' ), 10000 );
    }
} )

function correctSerialization( data ){
    return data.replace( /\t/g, '' ).replace( /\"/g, '\"' ).replace( /\n/g, '' ).replace( /\\/g, '/' );
}

const backups = [ ];

function loadFunctionsObject ( ) {
    editor.value = JSON.stringify( tree.obj, ( ' ', '\n' ), '\t' );
}

function validateJson ( data ) {
    try {
        JSON.parse( data );
        return true;
    }
    catch ( error) {
        return error;
    }
}

function backupFunctionsObject( data ) {
    backup.save( data );
}

function undoFunctionsObject( ) {
    editor.value = backup.undo( );
}

function saveFunctionsObject( ) {
    const data = correctSerialization( editor.value );
    const validation = validateJson( data );
    if ( validation != true ){ 
        informError( validation );
        return;
    }
    backupFunctionsObject( data );
    tree.obj = JSON.parse( data );
    tree.save( );
}

function informError ( error ) {
    document.getElementById( 'error' ).innerHTML = error;
    document.getElementById( 'errorDiv' ).style.display = 'flex';
}

function closeError ( ) {
    document.getElementById( 'errorDiv' ).style.display = 'none';
}

function pasteUrl( ) {
    const input = document.getElementById( 'findInput' );
    insertAtCaret( 'editor', input.files[ 0 ].path );
    input.files = undefined;
}

// Insert at cursor

function insertAtCaret(areaId, text) {
    var txtarea = document.getElementById(areaId);
    if (!txtarea) {
      return;
    }
  
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
      "ff" : (document.selection ? "ie" : false));
    if (br == "ie") {
      txtarea.focus();
      var range = document.selection.createRange();
      range.moveStart('character', -txtarea.value.length);
      strPos = range.text.length;
    } else if (br == "ff") {
      strPos = txtarea.selectionStart;
    }
  
    var front = (txtarea.value).substring(0, strPos);
    var back = (txtarea.value).substring(strPos, txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;
    if (br == "ie") {
      txtarea.focus();
      var ieRange = document.selection.createRange();
      ieRange.moveStart('character', -txtarea.value.length);
      ieRange.moveStart('character', strPos);
      ieRange.moveEnd('character', 0);
      ieRange.select();
    } else if (br == "ff") {
      txtarea.selectionStart = strPos;
      txtarea.selectionEnd = strPos;
      txtarea.focus();
    }
  
    txtarea.scrollTop = scrollPos;
  }
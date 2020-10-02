const { process } = require( '../app/process' );

class Bridge {
    windows = { }

    constructor ( ipc ) {
        this.ipc = ipc;

        this.ipc.on( 'command', ( event, command ) => {
            this.reply( event, 'message', process( command ) );
        } )

        return this;
    }
    emit ( window, channel, payload ) {
        this.windows[ window ].send( channel, payload );
    }
    reply ( event, channel, payload ) {
        event.reply( channel, payload );
    }
    set_window ( name, window ) {
        this.windows[ name ] = window.webContents;
    }
}

module.exports = {
    Bridge
}
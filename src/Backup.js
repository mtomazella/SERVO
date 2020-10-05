class Backup {
    constructor ( ) {
        this.backup = [ ];
        return this;
    }
    getLastBackup ( ) {
        return this.backup[ this.backup.length - 1 ];
    }
    save ( data ) {
        if ( data != this.getLastBackup() ) JSON.parse( this.backup.push( data ) );
    }
    undo ( ) {
        return JSON.stringify( this.backup.pop( ), ( ' ', '\n' ), '\t' );
    }
}
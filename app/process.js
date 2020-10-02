const { findFunc, functions } = require( './functions' )
const { tree } = require( './database' )


module.exports = {
    process: ( command ) => {
        return findFunc( command.toLowerCase(), functions );
    }
}
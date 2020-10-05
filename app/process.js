const { findFunc, functions } = require( './functions' )

module.exports = {
    process: ( command ) => {
        return findFunc( command.toLowerCase(), functions );
    }
}
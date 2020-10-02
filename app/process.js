const { tree, findFunc } = require( './functions' )

module.exports = {
    process: ( command ) => {
        return findFunc( command.toLowerCase(), tree );
    }
}
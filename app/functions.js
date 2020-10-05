const { execFile, exec } = require( 'child_process' );
const { tree } = require( './database' )

const functions = {
    open: {
        keywords: [ 'open', 'abrir', 'abra', 'abre', 'iniciar', 'inicie', 'start' ],
        func: ( command, branch ) =>{
            tree.fetch( );
            const url = find( command, tree.obj.open );
            if ( url.code != undefined ){
                return 'Não encontrei. Adicione para usar essa função';
            }
            if ( url.indexOf( ':' ) == 1 ) execFile( url );
            else exec( `start ${url}`, ( error ) => {
                if ( error ) { 
                    console.log( error );
                    return error;
                }
            } );
            return 'Beleza fião';
        }
    },
    search: {
        keywords: [ 'pesquisar', 'search', 'pesquisa', 'procura', 'olha' ],
        func: ( command ) => {
            const query = command.split( ' ' ).slice( 1 ).join( '+' );
            const url = 'https://google.com/search?q=' + query;
            exec( `start ${ url }` );
            return `Pesquisando ${ query.split( '+' ).join( ' ' ) } no Guglis`;
        }
    }  
}

module.exports = {
    functions,
    findFunc: ( command, branch ) => {
        const next = { 
            branch: undefined,
            func: undefined,
            matches: 0
        };
        for ( let i in branch ) {
            let points = 0; 
            if ( branch[ i ].keywords === undefined ) continue;
            branch[ i ].keywords.forEach( ( word ) => {
                if ( command.search( word ) !== -1 ) points++;
            });
            if ( points > next.matches && branch[ i ].func !== undefined ) {
                next.branch  = branch[ i ];
                next.matches = points;
                next.func    = branch[ i ].func;
            }
        }
        if ( next.func != undefined ) return next.func( command, next.branch );
        else return 'Não achei nenhum comando'
    }
}

function find ( command, branch ) {
    if ( branch.url != undefined ){
        return branch.url;
    }
    const next = { 
        branch: undefined,
        matches: 0
    };
    for ( let i in branch ) {
        let points = 0; 
        if ( branch[ i ].keywords == undefined ) continue;
        branch[ i ].keywords.forEach( ( word ) => {
            if ( command.search( word ) != -1 ) points++;
        });
        if ( points > next.matches ) {
            next.branch = branch[ i ];
            next.matches = points;
        }
    }
    if ( next.branch != undefined ) return find( command, next.branch );
    else return { code: 'NOT_FOUND' }
}
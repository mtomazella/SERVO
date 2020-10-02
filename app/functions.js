const { exec } = require( 'child_process' );

module.exports = { 
    tree: {
        open: {
            keywords: [ 'open', 'abrir', 'abra', 'abre', 'iniciar', 'inicie', 'start' ],
            func: ( command, branch ) =>{
                const url = find( command, branch );
                if ( url.code != undefined ){
                    return 'Não encontrei. Adicione para usar essa função';
                }
                exec( `start ${url}`, ( error ) => {
                    if ( error ) { 
                        console.log( error );
                        return error;
                    }
                } )
                return 'Beleza fião';
            },
            explorer: {
                keywords: [ 'files', 'arquivos', 'windows', 'explorer', 'explorer', 'explorar', 'explorador', 'documentos', 'documents' ],
                url: 'explorer'
            },
            youtube: {
                keywords: [ 'youtube', 'yt' ],
                url: 'https://youtube.com'
            },
            twitch: {
                keywords: [ 'twitch' ],
                url: 'https://www.twitch.tv'
            }
        },
        search: {
            keywords: [ 'pesquisar', 'search', 'pesquisa', 'procura', 'olha' ],
            func: ( command, branch ) => {
                const query = command.split( ' ' ).slice( 1 ).join( '+' );
                const url = 'https://google.com/search?q=' + query;
                exec( `start ${ url }` );
                return `Pesquisando ${ query.split( '+' ).join( ' ' ) } no Guglis`;
            }
        }  
    },






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
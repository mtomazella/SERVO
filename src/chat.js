
document.addEventListener( 'keydown', ( event ) => {
    if ( event.keyCode == 13 ) userSend( );
} )

class Men {
    constructor ( text = 'Palavras', fromUser = false ) {
        this.text       = text;
        this.fromUser   = fromUser;
        return this;
    }
    show ( ) {
        const screen = document.getElementById( 'screen' );
        screen.innerHTML += 
        `<div class="message ${ ( !this.fromUser ) ? 'servo' : '' }">
            ${ this.text }
        </div>`;
    }
    talk ( ) {
        const synth = window.speechSynthesis;
        const speech = new SpeechSynthesisUtterance( this.text );
        synth.speak( speech );
    }
}

function userSend ( ) {
    const input = document.getElementById( 'input' );
    if ( input.value.trim( ) == '' ) return;
    const message = new Men( input.value, true );
    message.show( );
    input.value = '';
}
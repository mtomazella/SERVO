class Men {
    constructor ( text, fromUser = false ) {
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
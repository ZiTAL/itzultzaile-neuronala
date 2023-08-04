import 'flowbite'
import Editor from './js/Editor'

Editor.diff
(
`EU:
Itzultzeko:
1. Submit botoia jo
2. Ctrl + Enter
3. Saguaren eskumako botoiean click -> translate

ES:
Para Traducir:
1. Pulsad el botón submit
2. Ctrl + Enter
3. Pulsad botón derecho del ratón -> translate

EN:
To translate:
1. Press Submit button
2. Ctrl + Enter
3. Mouse Right button click -> translate

FR:
Pour revenir :
1. Appuyez sur le bouton Envoyer
2. Ctrl + Enter
3. Cliquez sur le bouton droit de la souris -> translate
`,

`EU: Hemen itzulpena agertuko da.
ES: Aquí aparecerá la traducción.
EN: The translation will appear here.
FR: La traduction apparaîtra ici.
`
)

document.querySelector('.header .menu form input[type="submit"]').addEventListener('click', function(e)
{
    e.preventDefault()
    Editor.run()
})

document.querySelector('#staticModal .footer .save').addEventListener('click', function(e)
{
    e.preventDefault()
    console.log('mode', Mode.get())
})

class Mode
{
    static #modes = ['auto', 'text', 'po', 'srt', 'xml', 'xml_attr', 'xml_node']

    static get()
    {
        let mode = document.querySelector('#staticModal form input[name="mode"]:checked').value
        if(!this.isAvailable(mode))
            mode = this.#modes[0]
        return mode
    }
    
    static isAvailable(mode)
    {
        if(this.#modes.indexOf(mode)!==-1)
            return true
        return false
    }    
}

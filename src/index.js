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

document.querySelector('input[type="submit"]').addEventListener('click', function(e)
{
    e.preventDefault()
    Editor.run()
})

document.querySelector('#staticModal .footer .save').addEventListener('click', function(e)
{
    e.preventDefault()
    let mode = document.querySelector('#staticModal form input[name="mode"]').value
    console.log('mode', mode)
})
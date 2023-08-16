import 'flowbite'
import Editor  from './js/Editor'
import Mode    from './js/Mode'
import Server  from './js/Server'
import Process from './js/Process'

let code     = getCode()
let original = `EU:
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
`
let translate = `EU: Hemen itzulpena agertuko da.
ES: Aquí aparecerá la traducción.
EN: The translation will appear here.
FR: La traduction apparaîtra ici.
`
if(!code)
    Editor.diff(original, translate)
else
{
    Server.get(code)
    .then(function(data)
    {
        Editor.diff(data.original, data.translate)
    })
    .catch(function(e)
    {
        console.error(e)
    })
}

document.querySelector('.header .menu form .translate').addEventListener('click', function(e)
{
    e.preventDefault()
    Editor.run()
})

document.querySelector('.header .menu form .save').addEventListener('click', function(e)
{
    e.preventDefault()
    const original  = Editor.getOriginal()
    const translate = Editor.getTranslate()
    if(!code)
    {
        Server.createCode()
        .then(function(data)
        {
            code = data.code
            Server.set(data.code, original, translate)
            .then(function()
            {
                window.location.href = "?code="+code
            })
            .catch(function(e)
            {
                console.error(e)
            })
        })
        .catch(function(e)
        {
            console.error(e)
        })
    }
    else
    {
        Server.set(code, original, translate)
        .then(function()
        {

        })
        .catch(function(e)
        {
            console.error(e)
        })
    }
})

document.querySelector('#translationModal .footer .save').addEventListener('click', function(e)
{
    e.preventDefault()
    const mode = Mode.getFormValue()
    Mode.set(mode)
})

document.querySelector('#processModal button').addEventListener('click', function(e)
{
    e.preventDefault()
    Process.stop()
})


document.querySelector(`${Mode.input}[value="${Mode.get()}"]`).checked = true

function getCode()
{
    try
    {
        const url  = new URL(window.location.href)
        const code = url.searchParams.get('code')
        return code
    }
    catch(e)
    {
        return false
    }
}
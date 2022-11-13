import                              './styles/main.scss'
import Editor               from    './js/Editor'
import ItzultzaileNeuronala from    './js/ItzultzaileNeuronala'

const diff = Editor.diff("Hola ¿qué tal?", "...")

let button = document.querySelector('button')
button.addEventListener('click', function()
{
    const original = diff.getOriginalEditor().getValue()
    ItzultzaileNeuronala.get(original)
    .then(function(modified)
    {
        diff.getModifiedEditor().setValue(modified)
    })
})
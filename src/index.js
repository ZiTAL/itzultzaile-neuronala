import                              './styles/main.scss'
import Editor               from    './js/Editor'
import ItzultzaileNeuronala from    './js/ItzultzaileNeuronala'

const diff = Editor.diff
(
    "Aquí se debe de escribir en español.",
    "Hemen gero bueltan itzulpena ikusi ahal izateko\n Kodea: https://github.com/zital/itzultzaile-neuronala\n Lizentzia: GPL3"
)

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
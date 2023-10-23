import Config  from '../Config'

class Ass
{
    static #elements = []

    static is(str)
    {
        if (typeof str !== 'string')
            return false

//      Dialogue: 0,0:04:37.96,0:04:39.32,Gen_Main,Eve,0,0,0,,Zein dira arauak?

        const regex = /Dialogue:\s*[0-9:\.]*,[0-9:\.]*,[0-9:\.]*,[a-z0-9_]*,[a-z0-9_]*,[0-9:\.]*,[0-9:\.]*,[0-9:\.]*,[0-9:\.]*,/im
        return regex.test(str)
    }

    static getText(input)
    {
        const self  = this
        const lines = input.split(/\n/)
        let r       = []
        
        lines.forEach(function(line)
        {
            let d
            if(line.match(/^\s*Dialogue:\s*[0-9:\.]*,[0-9:\.]*,[0-9:\.]*,[a-z0-9_]*,[a-z0-9_]*,[0-9:\.]*,[0-9:\.]*,[0-9:\.]*,[0-9:\.]*,[^$]+$/i))
            {
                const m = line.match(/^(\s*Dialogue:\s*[0-9:\.]*,[0-9:\.]*,[0-9:\.]*,[a-z0-9_]*,[a-z0-9_]*,[0-9:\.]*,[0-9:\.]*,[0-9:\.]*,[0-9:\.]*,)([^$]+)$/i)
                d =
                {
                    'type': 'dialogue',
                    'part_01':  m[1],
                    'part_02':  m[2]
                }
            }
            else
            {
                d =
                {
                    'type':  'raw',
                    'value': line
                }
            }
            r.push(d)
        })
        
        let text  = ''
        r.forEach(function(line)
        {
            if(line.type === 'dialogue')
                text += line.part_02+Config.sep
        })

        this.#elements = r

        return text
    }

    static replace(text)
    {
        const self = this
        const ta   = text.split(Config.sep)

        let i      = 0
        let result = ''

        this.#elements.forEach(function(e)
        {
            switch(e.type)
            {
                case 'raw':
                    result+= `${e.value}\n`
                    break

                case 'dialogue':
                    result+= `${e.part_01}`
                    result+= (ta[i]!==undefined)?`${ta[i]}\n`:`${e.part_02}\n`
                    i++
                    break
            }
        })
        return result
    }
}

export default Ass
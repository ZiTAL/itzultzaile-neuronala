class Ini
{
    static #elements = []
    static #sep      = '§'

    static is(str)
    {
        if (typeof str !== 'string')
            return false
/*
; This is a sample INI file

[General]
AppName = My Application
Version = 1.0
Author = John Doe
*/
        let lines = str.split(/\n/)
        // ; eta hutsuniek kendu
        lines     = lines.filter((line) =>
        {
            if(line.match(/^\s*;/) || line.trim()==='')
                return false
            return true
        })
        str = lines.join("\n")
        const regex = /\s*\[[^\]]+\]\s*\n\s*[^\s=]+\s*/im
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
            if(line.match(/^\s*[^\s=]+\s*=[^$]+$/))
            {
                const m = line.match(/(^\s*[^\s=]+\s*=)([^$]+)$/)
                d =
                {
                    'type':     'ini',
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
        const sep = `\n${self.#sep}\n`
        r.forEach(function(line)
        {
            if(line.type === 'ini')
                text += line.part_02+sep
        })

        this.#elements = r

        return text
    }

    static replace(text)
    {
        const self = this
        const sep  = `\n${self.#sep}\n`
        const ta   = text.split(sep)

        let i      = 0
        let result = ''

        this.#elements.forEach(function(e)
        {
            switch(e.type)
            {
                case 'raw':
                    result+= `${e.value}\n`
                    break

                case 'ini':
                    result+= `${e.part_01}`
                    result+= (ta[i]!==undefined)?`${ta[i]}\n`:`${e.part_02}\n`
                    i++
                    break
            }
        })
        return result
    }
}

export default Ini
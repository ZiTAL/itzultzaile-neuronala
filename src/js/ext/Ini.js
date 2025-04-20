import Config  from '../Config'

class Ini
{
    static #elements = []

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
        const section_pattern = /^\s*\[([^\]]+)\]\s*$/gm;
        const key_pattern     = /^\s*([^=]+?)\s*=\s*(.*?)\s*$/gm;
        const has_section     = section_pattern.test(str);
        const has_key         = key_pattern.test(str);
        return has_section || has_key;

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
        r.forEach(function(line)
        {
            if(line.type === 'ini')
                text += line.part_02+Config.sep
        })

        this.#elements = r

        return text
    }

    static replace(text)
    {
        const r    = new RegExp(Config.sep+"?", "m")
        const ta   = text.split(r)

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
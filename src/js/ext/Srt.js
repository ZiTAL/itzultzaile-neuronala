import Config  from '../Config'

class Srt
{
    static #elements = []
    
    static is(str)
    {
        if (typeof str !== 'string')
            return false
/*
        1
        00:00:00,000 --> 00:00:01,800
*/
        const regex = /\d+\n\d{2}:\d{2}:\d{2},\d{3}\s-->\s\d{2}:\d{2}:\d{2},\d{3}/
        return regex.test(str)
    }

    static getText(input)
    {
        let self     = this
        let text     = ''
        let pattern  = /(\d+)\n(\d+:\d+:\d+,\d+)\s-->\s(\d+:\d+:\d+,\d+)\n([\s\S]*?)(?=\n\d+\n|$)/g;
        const slices = input.match(pattern)

        slices.forEach(function(slice)
        {
            pattern = /(\d+)\n(\d+:\d+:\d+,\d+)\s-->\s(\d+:\d+:\d+,\d+)\n([\s\S]*?)(?=\n\d+\n|$)/;
            const s = slice.match(pattern)
            const a =
            {
                index: s[1],
                from:  s[2],
                to:    s[3],
                text:  s[4]
            }
            text += a.text+Config.sep
            self.#elements.push(a)
        })
        return text     
    }

    static replace(text)
    {        
        const self = this
        const r    = new RegExp(Config.sep+"?", "m")
        const ta   = text.split(r)

        let result = ''
        self.#elements.forEach(function(element, i)
        {
            result += `${element.index}\n${element.from} --> ${element.to}\n`
            result += (ta[i]!==undefined)?`${ta[i]}\n`:`${element.text}\n`
        })
        self.#elements = []
        return result
    }
}

export default Srt
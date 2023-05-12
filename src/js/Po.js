class Po
{
    static #elements = []
    static #sep      = '§'

    static is(str)
    {
        if (typeof str !== 'string')
            return false

        const regex = /\nmsgid\s+"(.*?)\nmsgstr\s+"/
        return regex.test(str)
    }

    static getText(input)
    {
        const self  = this
        const lines = input.split(/\n/)
        let r       = []
        let i       = 0
        let w       = ''
        let p_w     = ''
        
        lines.forEach(function(line)
        {
            if(line.match(/^\s*msgid/))
            {
                w = 'msgid'
                i++
            }
            else if(line.match(/^\s*msgstr/))
                w = 'msgstr'
    
            else if(line.match(/^\s*"/))
                w = 'multiline'
    
            else
            {
                w = ''
                i++
            }
    
            r[i] = (typeof r[i]==='undefined')?{}:r[i]

            switch(w)
            {
                case 'msgid':
                    line = line.replace(/^\s*msgid\s+"/, '').replace(/"\s*$/, '')
                    r[i]['msgid'] = (typeof r[i]['msgid'] === 'undefined')?[]:r[i]['msgid']
                    r[i]['msgid'].push(line)
                    p_w = 'msgid'
                    break

                case 'msgstr':
                    line = line.replace(/^\s*msgstr\s+"/, '').replace(/"\s*$/, '')
                    r[i]['msgstr'] = (typeof r[i]['msgstr'] === 'undefined')?[]:r[i]['msgstr']
                    r[i]['msgstr'].push(line)
                    p_w = 'msgstr'
                    break

                case 'multiline':
                    line = line.replace(/^\s*"/, '').replace(/"\s*$/, '')
                    switch(p_w)
                    {
                        case 'msgid':
                            r[i]['msgid'].push(line)
                            break

                        case 'msgstr':
                            r[i]['msgstr'].push(line)
                            break
                    }
                    break

                default:
                    r[i]['raw'] = (typeof r[i]['raw'] === 'undefined')?[]:r[i]['raw']
                    r[i]['raw'].push(line)
            }
        })
        
        let text  = ''
        const sep = `\n${self.#sep}\n`
        r.forEach(function(line)
        {
            if(typeof line.msgid !== 'undefined' && typeof line.msgstr !== 'undefined')
            {
                line.msgid.forEach(function(l)
                {
                    text += l+" "
                })
                text += sep
            }
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
            if(typeof e.raw !== 'undefined')
                result += e.raw+"\n"

            else if(typeof e.msgid !== 'undefined' && typeof e.msgstr !== 'undefined')
            {
                // msgid-ak ez dira aldatzen
                if(e.msgid.length===1)
                    result += `msgid "${e.msgid[0]}"\n`

                else
                {
                    result += `msgid ""\n`
                    e.msgid.forEach(function(m, j)
                    {
                        if(j>0)
                            result += `"${m}"\n`
                    })
                }
/*
                msgid-ak lerro 1 baino gehiago baditu, lerro-anitza dela esan nahi du, beraz dauden lerroak kontatuko ditugu,
                berba kopurua kalkulatu eta lerro bakoitzean zenbat doazen sartu
*/                
                if(e.msgid.length>1)
                {
                    const lines      = e.msgid.length-1
                    ta[i]            = self.fix(ta[i])
                    const words      = ta[i].split(/\s+/)
                    let   words_each = words.length / lines

                    if(words.length % lines !== 0)
                        words_each = parseInt(words_each)+1

                    let p = [[]]
                    let j = 0

                    words.forEach(function(word, i)
                    {
                        if(i%words_each === 0 && i>0)
                        {
                            j++
                            p[j] = []
                        }
                        p[j].push(word)
                    })

                    result += `msgstr ""\n`
                    p.forEach(function(pp)
                    {
                        result += `"${pp.join(' ')}"\n`
                    })
                }
                else if(e.msgstr.length===1)
                    result += `msgstr "${self.fix(ta[i])}"\n`

                else
                {
                    result += `msgstr ""\n`
                    e.msgstr.forEach(function(m, j)
                    {
                        if(j>0)
                            result += `"${m}"\n`
                    })
                }
                i++
            }
        })
        return result
    }

/*
    Itzultzaile automatikoak arazoa dauka %-koekin, hutsunea sartzen die, orduan hutsune batzuk moldatu behar dira.
    kasuan: " % s" -> '%s' ( % d /% d) -> (%d/%d) eta abar...
*/
    static fix(input)
    {
        input = input.replace(/\s*%\s+([a-z]{1})/g, '%$1')
        input = input.replace(/"(%[a-z]{1})"/g, "'$1'")
        return input
    }
}

export default Po
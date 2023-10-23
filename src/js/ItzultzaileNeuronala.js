import Config  from './Config'
import Process from './Process'

import Xml     from './ext/Xml'
import Srt     from './ext/Srt'
import Po      from './ext/Po'
import Ass     from './ext/Ass'
import Ini     from './ext/Ini'
import Text    from './ext/Text'

class ItzultzaileNeuronala
{
    static #mode    = ''
    static #limit   = 1000
    static #timeout = 5 * 1000    
    static #mkey    = '8d9016025eb0a44215c7f69c2e10861d'
    static #status  = 'ready'

    static get(input)
    {
        let self = this
        self.setStatus('processing')
        self.setMode(input)

        return new Promise(function(resolve, reject)
        {
            const text  = self.preProccess(input)
            const parts = self.split(text)

            Process.create(parts.length)

            self.serie(parts, 0, '')
            .then(function(response)
            {
                response = self.postProccess(response)
                Process.hide()
                self.setStatus('ready')
                resolve(response)
            })
            .catch(function(e)
            {
                console.error('get', e)
                reject(e)
            })
        })
    }

    static setMode(input)
    {
        let mode = ''
        if(Xml.is(input))
            mode = 'xml'
        else if(Srt.is(input))
            mode = 'srt'
        else if(Po.is(input))
            mode = 'po'
        else if(Ass.is(input))
            mode = 'ass'
        else if(Ini.is(input))
            mode = 'ini'
        else if(Text.is(input))
            mode = 'text'

        console.log('setMode', mode)

        this.#mode = mode
    }

    static getMode()
    {
        return this.#mode
    }

    static getType()
    {
        return document.querySelector('select').value
    }    

    static getUrl()
    {
        const type = this.getType()
        return `https://api.euskadi.eus/itzuli/${type}/translate`
    }

    static getModel()
    {
        const type = this.getType()
        return `generic_`+type
    }

    static split(data)
    {
        let self     = this
        const sepr   = new RegExp(Config.sep)
        const limit  = this.#limit
        let   chunks = data.split(sepr)
        const cl     = chunks.length
        
        let   parts  = ['']
        let   j      = 0
        
        for(let i=0; i<cl; i++)
        {
            chunks[i] = chunks[i]+Config.sep
            if(chunks[i].length+parts[j].length>limit)
            {
                    j++
                    parts[j] = ''
            }
            parts[j] += chunks[i]
        }
        parts = parts.filter(part => part)
        return parts
    }

    static request(text)
    {
        let self = this
        return new Promise(function(resolve, reject)
        {
            fetch(self.getUrl(),
            {
                method: 'POST',
                body:   JSON.stringify(
                {
                    mkey:     self.#mkey,
                    model:    self.getModel(),
                    text:     text,
                })
            })
            .then((response) => response.json())            
            .then(function(r)
            {
                resolve(r.message)
            })
            .catch(function(e)
            {
                console.error('request', e)
                reject(e)
            })
        })
    }

    static serie(parts, i, result, timeout)
    {
        let self = this
        timeout = (i===0)?0:self.#timeout

        Process.setIndex(i)

        return new Promise(function(resolve, reject)
        {
            if(self.getStatus()==='stopped')
                resolve(result)
            else
            {
                window.setTimeout(function()
                {
                    self.request(parts[i])
                    .then(function(response)
                    {
                        result += response
                        i++
                        if(typeof parts[i]!=='undefined')
                            resolve(self.serie(parts, i, result, timeout))
                        else
                            resolve(result)
                    })
                    .catch(function(e)
                    {
                        console.error('serie', e)
                        reject(e)
                    })
                }, timeout)
            }
        })
    }

    static preProccess(input)
    {
        let text = input
        if(Xml.is(input))
            text = Xml.getText(input)

        else if(Srt.is(input))
            text = Srt.getText(input)            

        else if(Po.is(input))
            text = Po.getText(input)

        else if(Ass.is(input))
            text = Ass.getText(input)            

        else if(Ini.is(input))
            text = Ini.getText(input)

        else if(Text.is(input))
            text = Text.getText(input)            

        return text
    }

    static postProccess(response)
    {
        let self = this
        const mode = this.getMode()
        switch(mode)
        {
            case 'xml':
                response = Xml.replace(response)
                break

            case 'srt':
                response = Srt.replace(response)
                break
                
            case 'po':
                response = Po.replace(response)
                break         

            case 'ass':
                response = Ass.replace(response)
                break
                
            case 'ini':
                response = Ini.replace(response)
                break
                
            case 'text':
                response = Text.replace(response)
                break                

            default:
                const sep  = `{Config.sep}$`
                const sepr = new RegExp(sep)
                response = response.replace(sepr, '')
        }
        
        return response
    }

    static setStatus(status)
    {
        this.#status = status
    }

    static getStatus()
    {
        return this.#status
    }
}

export default ItzultzaileNeuronala
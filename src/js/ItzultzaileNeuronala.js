import Xml from './Xml'
import Srt from './Srt'
import Po from './Po'

class ItzultzaileNeuronala
{
    static #mode    = ''
    static #limit   = 2500
    static #timeout = 5 * 1000    
    static #mkey    = '8d9016025eb0a44215c7f69c2e10861d'

    static get(input)
    {
        let self = this
        self.setMode(input)

        return new Promise(function(resolve, reject)
        {
            const text  = self.preProccess(input)
            const parts = self.split(text)
            console.log('parts', parts)

            self.serie(parts, 0, '')
            .then(function(response)
            {
                response = self.postProccess(response)
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

        console.log(mode)

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
        const limit  = this.#limit
        let   chunks = data.split(/\n/)
        const cl     = chunks.length
        
        let   parts  = ['']
        let   j      = 0
        
        for(let i=0; i<cl; i++)
        {
            chunks[i] = chunks[i]+"\n"
            if(chunks[i].length+parts[j].length>limit)
            {
                    j++
                    parts[j] = ''
            }
            parts[j] += chunks[i]
        }
        parts[j] = parts[j].replace(/\n$/, '')
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

        return new Promise(function(resolve, reject)
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
        })
    }

    static preProccess(input)
    {
        let text = input
        if(Xml.is(input))
            text = Xml.getText(input)

        if(Po.is(input))
            text = Po.getText(input)            

        return text
    }

    static postProccess(response)
    {
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
        }
        
        return response
    }
}

export default ItzultzaileNeuronala
import Xml from './Xml'
import Srt from './Srt'

class ItzultzaileNeuronala
{
    static get(input)
    {
        let self        = this

        return new Promise(function(resolve, reject)
        {
            const text  = self.preProccess(input)
            const parts = self.split(text)

            self.serie(parts, 0, '')
            .then(function(response)
            {
                response = self.postProccess(input, response)
                resolve(response)
            })
            .catch(function(e)
            {
                console.error('get', e)
                reject(e)
            })
        })
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
        const limit  = 10000
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
                    mkey:     "8d9016025eb0a44215c7f69c2e10861d",
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
        timeout = (i===0)?0:0.5 * 1000

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

        return text
    }

    static postProccess(input, response)
    {
        if(Xml.is(input))
            response = Xml.replace(response)

        else if(Srt.is(input))
            response = Srt.replace(response)
        
        return response
    }
}

export default ItzultzaileNeuronala
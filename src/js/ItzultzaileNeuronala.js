import Xml from './Xml'

class ItzultzaileNeuronala
{
    static get(text)
    {
        let self        = this
        let mode        = ''
        let xml_prepare

        return new Promise(function(resolve, reject)
        {
            if(Xml.is(text))
            {
                mode        = 'xml'
                xml_prepare = Xml.prepare(text)
                text        = xml_prepare.text
            }
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
                switch(mode)
                {
                    case 'xml':
                        r.message = Xml.replace(xml_prepare, r.message)
                        break;
                }
                resolve(r.message)
            })
            .catch(function(e)
            {
                console.error(e)
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
}

export default ItzultzaileNeuronala
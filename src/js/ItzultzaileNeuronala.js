class ItzultzaileNeuronala
{
    static url = 'https://api.euskadi.eus/itzuli/es2eu/translate'

    static get(text)
    {
        let self = this
        return new Promise(function(resolve, reject)
        {
            fetch(self.url,
            {
                method: 'POST',
                body:   JSON.stringify(
                {
                    mkey:     "8d9016025eb0a44215c7f69c2e10861d",
                    model:    "generic_es2eu",
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
                console.error(e)
                reject(e)
            })
        })
    }
}

export default ItzultzaileNeuronala
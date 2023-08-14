class Server
{
    static #url = 'index.php'

    static get(code)
    {
        let self = this
        return new Promise(function (resolve, reject)
        {
            const url = `${self.#url}?code=${code}`

            fetch(url)
            .then(response =>
            {
                return response.json()
            })
            .then(data =>
            {
                resolve(data)
            })
            .catch(error =>
            {
                reject(error)
            })
        })
    }

    static set(code, original, translate)
    {
        let self = this
        const params =
        {
            code: code,
            original: original,
            translate: translate
        }

        const options =
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }

        return new Promise(function (resolve, reject)
        {
            fetch(self.#url, options)
            .then(response =>
            {
                return response.json()
            })
            .then(data =>
            {
                resolve(data)
            })
            .catch(error =>
            {
                reject(error)
            })
        })
    }

    static createCode()
    {
        const url = `${this.#url}?createCode`

        return new Promise(function (resolve, reject)
        {
            fetch(url)
            .then(response =>
            {
                return response.json()
            })
            .then(data =>
            {
                resolve(data)
            })
            .catch(error =>
            {
                reject(error)
            })            
        })    
    }
}

export default Server
class Mode
{
    static #modes = ['auto', 'text', 'po', 'srt', 'xml', 'xml_attr', 'xml_node']
    static input  = '#staticModal form input[name="mode"]'

    static get()
    {
        let mode = localStorage.getItem('mode')
        if(!this.isAvailable(mode))
            mode = this.getFormValue()
        if(!this.isAvailable(mode))
            mode = this.getDefault()
        return mode
    }

    static getFormValue()
    {
        let mode = document.querySelector(`${this.input}:checked`).value
        if(!this.isAvailable(mode))
            mode = this.getDefault()
        return mode
    }

    static set(mode)
    {
        if(!this.isAvailable(mode))
            mode = this.getDefault()        
        localStorage.setItem("mode", mode);
    }
    
    static isAvailable(mode)
    {
        if(this.#modes.indexOf(mode)!==-1)
            return true
        return false
    }

    static getDefault()
    {
        return this.#modes[0]
    }
}

export default Mode
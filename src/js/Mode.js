class Mode
{
    static #modes = ['xml', 'xml_attr', 'xml_node']
    static input  = '#translationModal form input[name="mode"]'

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
        let mode
        try
        {
            mode = document.querySelector(`${this.input}:checked`).value
            if(!this.isAvailable(mode))
                mode = this.getDefault()            
        }
        catch(e)
        {
            mode = this.getDefault()
        }
        
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
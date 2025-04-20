import Config  from '../Config'

class Text
{
    static is(str)
    {
        if (typeof str !== 'string')
            return false
        return true
    }

    static getText(input)
    {
        const pattern = /\n/gm;
        const text    = input.replace(pattern, Config.sep)
        return text
    }    

    static replace(text)
    {
        const sep_r = new RegExp(Config.sep+"?", 'gm')
        return text.replace(sep_r, "\n")
    }
}

export default Text
class Srt
{
    static is(str)
    {
        if (typeof str !== 'string')
            return false
/*
        1
        00:00:00,000 --> 00:00:01,800
*/
        const regex = /\d+\n\d{2}:\d{2}:\d{2},\d{3}\s-->\s\d{2}:\d{2}:\d{2},\d{3}/
        return regex.test(str)
    }

    static replace(output)
    {
/*
        1
        00:00: 00,000 --> 00:00: 01,800
*/
        const regex = /(\d+\n\d{2}:\d{2}:)\s(\d{2},\d{3}\s-->\s)(\d{2}:\d{2}:)\s(\d{2},\d{3})/g
        return output.replace(regex, '$1$2$3$4')
    }
}

export default Srt
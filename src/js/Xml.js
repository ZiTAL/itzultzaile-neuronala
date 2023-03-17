class Xml
{
    static #dom      = []
    static #elements = []
    static #sep      = '§'

    static is(str)
    {
        if (typeof str !== 'string')
            return false
        
        const parser = new DOMParser()
        
        try
        {
            const xml_doc = parser.parseFromString(str, "application/xml")
            return (xml_doc.getElementsByTagName("parsererror").length>0)?false:true
        }
        catch (error)
        {
            return false
        }
    }

    static getText(input)
    {
        const self     = this
        const parser   = new DOMParser()
        const dom      = parser.parseFromString(input, "text/xml")
        const nodes    = dom.getElementsByTagName("*")
        const sep      = `\n${self.#sep}\n`

        let   str      = ''
        let   elements = []

        for(let i=0; i<nodes.length; i++)
        {
            let node = nodes[i]
            if(node.hasChildNodes())
            {
                for(let j=0; j<node.childNodes.length; j++)
                {
                    const n = node.childNodes[j]
                    if(n.nodeType===3 && n.nodeValue.trim()!=='')      // 3 testua
                    {
                        str+=n.nodeValue+sep
                        elements.push(
                        {
                            type: 'node',
                            node: n.parentNode
                        })
                    }
                    else if(n.nodeType===4 && n.nodeValue.trim()!=='') // 4 CDATA
                    {
                        str+=n.nodeValue+sep
                        elements.push(
                        {
                            type: 'cdata',
                            node: n
                        })                        
                    }
                    else if(n.nodeType===1 && n.hasAttributes())       // 1 nodo normala
                    {
                        const attributes = n.attributes;
                        for (let k = 0; k < attributes.length; k++)
                        {
                            str+=attributes.item(k).value+sep
                            elements.push(
                            {
                                type:      'attribute',
                                attribute: attributes.item(k),
                                node:      n
                            })                    
                        }
                    }
                }
            }
        }

        self.#dom      = dom
        self.#elements = elements
        
        return str
    }

    static replace(text)
    {
        const self = this
        const ele  = self.#elements
        const str  = text.split(/\n/).filter(function(s)
        {
            return (s!==self.#sep)
        })                    
        
        for(let i=0; i<ele.length; i++)
        {
            if(ele[i].type==='node')
            {
                ele[i].node.removeChild(ele[i].node.firstChild)
                ele[i].node.appendChild(self.#dom.createTextNode(str[i]))
            }
            else if(ele[i].type==='cdata')
                ele[i].node.data = str[i]

            else if(ele[i].type==='attribute')
                ele[i].node.setAttribute(ele[i].attribute.name, str[i])
        }    
        const xml = new XMLSerializer().serializeToString(self.#dom)
        return xml
    }
}

export default Xml
class Xml
{
    static #dom      = []
    static #elements = []

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

    static prepare(input)
    {
        let self = this
        const parser = new DOMParser()
        const xml    = parser.parseFromString(input, "text/xml")
        const nodes  = xml.getElementsByTagName("*")

        let   str    = ''
        let   ele    = []
        let   sep    = "\n§\n"

        for(var i=0; i<nodes.length; i++)
        {
            var node = nodes[i]
            if(node.hasChildNodes())
            {
                for(var j=0; j<node.childNodes.length; j++)
                {
                    var n = node.childNodes[j]
                    if(n.nodeType===3 && n.nodeValue.trim()!=='') // 3 testua
                    {
                        str+=n.nodeValue+sep
                        ele.push(
                        {
                            type: 'node',
                            node: n.parentNode
                        })
                    }
                    else if(n.nodeType===4 && n.nodeValue.trim()!=='') // 4 CDATA
                    {
                        str+=n.nodeValue+sep
                        ele.push(
                        {
                            type: 'cdata',
                            node: n
                        })                        
                    }
                    else if(n.nodeType===1 && n.hasAttributes()) // 1 nodo normala
                    {
                        var attributes = n.attributes;
                        for (let k = 0; k < attributes.length; k++)
                        {
                            str+=attributes.item(k).value+sep
                            ele.push(
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

        self.#dom      = xml
        self.#elements = ele
        
        return str
    }

    static replace(text)
    {
        let self  = this
        let str   = text.split(/\n/)
        str       = str.filter(function(s)
        {
            return (s!=='§')
        })                    
        const ele = self.#elements
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
        const serializer = new XMLSerializer()
        const xml_str    = serializer.serializeToString(self.#dom)
        return xml_str
    }
}

export default Xml
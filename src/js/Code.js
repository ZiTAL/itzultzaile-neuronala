class Code
{
  static #code_length = 6
  static #characters  = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789'

  static get()
  {
    let short_code = ''; 
    for (let i = 0; i < this.#code_length; i++)
    {
      const index = Math.floor(Math.random() * this.#characters.length)
      short_code += this.#characters.charAt(index)
    }
    return short_code
  }
}

export default Code
import Code   from './Code'

class Save
{
  static #folder = '../save'

  static get()
  {
    return Code.get()
  }
}

export default Save
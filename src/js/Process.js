import { Modal }            from 'flowbite';
import ItzultzaileNeuronala from './ItzultzaileNeuronala'

class Process
{
  static #len      = 0
  static #selector = '#processModal'
  static #instance = null

  static setLen(len)
  {
    this.#len = len
  }

  static setIndex(i)
  {
    const body = document.querySelector(`${this.#selector} .body`)
    while(body.hasChildNodes())
      body.removeChild(body.firstChild)

    body.appendChild(document.createTextNode(`${i + 1} / ${this.#len}`))
  }

  static show()
  {
    this.#instance.show()
  }  

  static hide()
  {
    this.#instance.hide()
  }

  static create(len)
  {
    this.setLen(len)

    const options =
    {
      placement:       'center-center',
      backdrop:        'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable:        false,
      onHide: () =>
      {
          console.log('modal is hidden');
      },
      onShow: () =>
      {
          console.log('modal is shown');
      },
      onToggle: () =>
      {
          console.log('modal has been toggled');
      }
    }

    const element  = document.querySelector(this.#selector)    
    this.#instance = new Modal(element, options)
    this.show()
  }

  static stop()
  {
    ItzultzaileNeuronala.setStatus('stopped')
    this.hide()
  }
}

export default Process
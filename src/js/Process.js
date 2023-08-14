import { Modal } from 'flowbite';

class Process
{
  static #len = 0
  static #selector = '#processModal'
  static #instance = null

  static setLen(len)
  {
    this.#len = len
  }

  static setIndex(i)
  {
    //document.querySelector(`${this.#selector} .body`).innerHTML = `${i + 1} / ${this.#len}`
  }

  static show()
  {
    this.#instance.show()
  }  

  static hide()
  {
    this.#instance.hide()
  }

  static create()
  {
    const element = document.querySelector(this.#selector);

    const options = {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
          console.log('modal is hidden');
      },
      onShow: () => {
          console.log('modal is shown');
      },
      onToggle: () => {
          console.log('modal has been toggled');
      }
    };
    
    this.#instance = new Modal(element, options);    
  }
}

export default Process
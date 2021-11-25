import {OffsetModel} from './models/OffsetModel'
import {ViewPortModel} from './models/ViewPortModel'
import {ElementStyleUtil} from './_ElementStyleUtil'
import {DataUtil} from './_DataUtil'
import {ElementAnimateUtil} from './ElementAnimateUtil'
import {getObjectPropertyValueByKey, toJSON} from './_TypesHelpers'

function getCSS(el: HTMLElement, styleProp: string) {
  const defaultView = (el.ownerDocument || document).defaultView

  if (!defaultView) {
    return ''
  }


  styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase()

  return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp)
}

function getCSSVariableValue(variableName: string) {
  let hex = getComputedStyle(document.documentElement).getPropertyValue(variableName)
  if (hex && hex.length > 0) {
    hex = hex.trim()
  }

  return hex
}

function getElementActualCss(el: HTMLElement, prop: any, cache: boolean) {
  let css = ''

  if (!el.getAttribute('kt-hidden-' + prop) || cache === false) {
    let value

    css = el.style.cssText
    el.style.cssText = 'position: absolute; visibility: hidden; display: block;'

    if (prop === 'width') {
      value = el.offsetWidth
    } else if (prop === 'height') {
      value = el.offsetHeight
    }

    el.style.cssText = css


    if (value !== undefined) {
      el.setAttribute('kt-hidden-' + prop, value.toString())
      return parseFloat(value.toString())
    }
    return 0
  } else {

    const attributeValue = el.getAttribute('kt-hidden-' + prop)
    if (attributeValue || attributeValue === '0') {
      return parseFloat(attributeValue)
    }
  }
}

function getElementActualHeight(el: HTMLElement) {
  return getElementActualCss(el, 'height', false)
}

function getElementActualWidth(el: HTMLElement, cache?: boolean) {
  return getElementActualCss(el, 'width', false)
}

function getElementIndex(element: HTMLElement) {
  if (element.parentNode) {
    const c = element.parentNode.children
    for (let i = 0; i < c.length; i++) {
      if (c[i] === element) return i
    }
  }
  return -1
}


function getElementMatches(element: HTMLElement, selector: string) {
  const p = Element.prototype
  const f = p.matches || p.webkitMatchesSelector

  if (element && element.tagName) {
    return f.call(element, selector)
  } else {
    return false
  }
}

function getElementOffset(el: HTMLElement): OffsetModel {
 
  if (!el.getClientRects().length) {
    return {top: 0, left: 0}
  }
  
  
  
  const rect = el.getBoundingClientRect()
  const win = el.ownerDocument.defaultView
  if (win) {
    return {
      top: rect.top + win.pageYOffset,
      left: rect.left + win.pageXOffset,
    }
  }

  return rect
}

function getElementParents(element: Element, selector: string) {
  if (!Element.prototype.matches) {
    Element.prototype.matches = function (s) {
      const matches = (document || this.ownerDocument).querySelectorAll(s)
      let i = matches.length
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1
    }
  }

  // Set up a parent array
  const parents: Array<Element> = []

  let el: Element | null = element

  // Push each parent element to the array
  for (; el && el !== document.body; el = el.parentElement) {
    if (selector) {
      if (el.matches(selector)) {
        parents.push(el)
      }
      continue
    }
    parents.push(el)
  }

  // Return our parent array
  return parents
}

function getHighestZindex(el: HTMLElement) {
  let bufferNode: Node | null = el as Node
  let buffer = el
  while (bufferNode && bufferNode !== document) {
    const position = buffer.style.getPropertyValue('position')
    if (position === 'absolute' || position === 'relative' || position === 'fixed') {
      const value = parseInt(buffer.style.getPropertyValue('z-index'))
      if (!isNaN(value) && value !== 0) {
        return value
      }
    }

    bufferNode = bufferNode.parentNode
    buffer = bufferNode as HTMLElement
  }
  return null
}

function getScrollTop(): number {
  return (document.scrollingElement || document.documentElement).scrollTop
}

function getViewPort(): ViewPortModel {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

function insertAfterElement(el: HTMLElement, referenceNode: HTMLElement) {
  return referenceNode.parentNode?.insertBefore(el, referenceNode.nextSibling)
}

function isElementHasClasses(element: HTMLElement, classesStr: string): boolean {
  const classes = classesStr.split(' ')
  for (let i = 0; i < classes.length; i++) {
    if (!element.classList.contains(classes[i])) {
      return false
    }
  }

  return true
}

function isVisibleElement(element: HTMLElement): boolean {
  return !(element.offsetWidth === 0 && element.offsetHeight === 0)
}

function throttle(timer: number | undefined, func: Function, delay?: number) {
  if (timer) {
    return
  }

  timer = window.setTimeout(function () {
    func()

    timer = undefined
  }, delay)
}

function getElementChildren(element: HTMLElement, selector: string): Array<HTMLElement> | null {
  if (!element || !element.childNodes) {
    return null
  }

  const result: Array<HTMLElement> = []
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i]
    if (child.nodeType === 1 && getElementMatches(child as HTMLElement, selector)) {
      result.push(child as HTMLElement)
    }
  }

  return result
}

function getElementChild(element: HTMLElement, selector: string): HTMLElement | null {
  const children = getElementChildren(element, selector)
  return children ? children[0] : null
}

function isMobileDevice(): boolean {
  let test = getViewPort().width < +getBreakpoint('lg') ? true : false

  if (test === false) {
    // For use within normal web clients
    test = navigator.userAgent.match(/iPad/i) != null
  }

  return test
}

function slide(el: HTMLElement, dir: string, speed: number, callback: any) {
  if (
    !el ||
    (dir === 'up' && isVisibleElement(el) === false) ||
    (dir === 'down' && isVisibleElement(el) === true)
  ) {
    return
  }

  speed = speed ? speed : 600
  let calcHeight = getElementActualHeight(el)
  let calcPaddingTop: number = 0
  let calcPaddingBottom: number = 0

  if (ElementStyleUtil.get(el, 'padding-top') && DataUtil.get(el, 'slide-padding-top') !== true) {
    DataUtil.set(el, 'slide-padding-top', ElementStyleUtil.get(el, 'padding-top'))
  }

  if (
    ElementStyleUtil.get(el, 'padding-bottom') &&
    DataUtil.has(el, 'slide-padding-bottom') !== true
  ) {
    DataUtil.set(el, 'slide-padding-bottom', ElementStyleUtil.get(el, 'padding-bottom'))
  }

  if (DataUtil.has(el, 'slide-padding-top')) {
    calcPaddingTop = parseInt(DataUtil.get(el, 'slide-padding-top'))
  }

  if (DataUtil.has(el, 'slide-padding-bottom')) {
    calcPaddingBottom = parseInt(DataUtil.get(el, 'slide-padding-bottom'))
  }

  if (dir === 'up') {
    // up
    el.style.cssText = 'display: block; overflow: hidden;'

    if (calcPaddingTop) {
      ElementAnimateUtil.animate(0, calcPaddingTop, speed, function (value: number) {
        el.style.paddingTop = calcPaddingTop - value + 'px'
      })
    }

    if (calcPaddingBottom) {
      ElementAnimateUtil.animate(0, calcPaddingBottom, speed, function (value: number) {
        el.style.paddingBottom = calcPaddingBottom - value + 'px'
      })
    }

    ElementAnimateUtil.animate(
      0,
      calcHeight || 0,
      speed,
      function (value: number) {
        el.style.height = (calcHeight || 0) - value + 'px'
      },
      function () {
        el.style.height = ''
        el.style.display = 'none'

        if (typeof callback === 'function') {
          callback()
        }
      }
    )
  } else if (dir === 'down') {
    // down
    el.style.cssText = 'display: block; overflow: hidden;'

    if (calcPaddingTop) {
      ElementAnimateUtil.animate(
        0,
        calcPaddingTop,
        speed,
        function (value: number) {
          //
          el.style.paddingTop = value + 'px'
        },
        function () {
          el.style.paddingTop = ''
        }
      )
    }

    if (calcPaddingBottom) {
      ElementAnimateUtil.animate(
        0,
        calcPaddingBottom,
        speed,
        function (value: number) {
          el.style.paddingBottom = value + 'px'
        },
        function () {
          el.style.paddingBottom = ''
        }
      )
    }

    ElementAnimateUtil.animate(
      0,
      calcHeight || 0,
      speed,
      function (value: number) {
        el.style.height = value + 'px'
      },
      function () {
        el.style.height = ''
        el.style.display = ''
        el.style.overflow = ''

        if (typeof callback === 'function') {
          callback()
        }
      }
    )
  }
}

function slideUp(el: HTMLElement, speed: number, callback: any) {
  slide(el, 'up', speed, callback)
}

function slideDown(el: HTMLElement, speed: number, callback: any) {
  slide(el, 'down', speed, callback)
}

function getBreakpoint(breakpoint: string) {
  let value: number | string = getCSSVariableValue('--bs-' + breakpoint)
  if (value) {
    value = parseInt(value.trim())
  }

  return value
}

function getAttributeValueByBreakpoint(incomingAttr: string): string | JSON {
  let value = toJSON(incomingAttr)
  if (typeof value !== 'object') {
    return incomingAttr
  }

  const width = getViewPort().width
  let resultKey
  let resultBreakpoint = -1
  let breakpoint

  for (let key in value) {
    if (key === 'default') {
      breakpoint = 0
    } else {
      breakpoint = getBreakpoint(key) ? +getBreakpoint(key) : parseInt(key)
    }

    if (breakpoint <= width && breakpoint > resultBreakpoint) {
      resultKey = key
      resultBreakpoint = breakpoint
    }
  }

  return resultKey ? getObjectPropertyValueByKey(value, resultKey) : value
}

function colorLighten(color: string, amount: number) {
  const addLight = (_color: string, _amount: number) => {
    const cc = parseInt(_color, 16) + _amount
    const cNum = cc > 255 ? 255 : cc
    const c = cNum.toString(16).length > 1 ? cNum.toString(16) : `0${cNum.toString(16)}`
    return c
  }

  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = parseInt(((255 * amount) / 100).toString())
  return (color = `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`)
}

function colorDarken(color: string, amount: number) {
  const subtractLight = (_color: string, _amount: number) => {
    const cc = parseInt(color, 16) - amount
    const cNum = cc < 0 ? 0 : cc
    const c = cNum.toString(16).length > 1 ? cNum.toString(16) : `0${cNum.toString(16)}`
    return c
  }

  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = parseInt(((255 * amount) / 100).toString())

  return (color = `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(
    color.substring(2, 4),
    amount
  )}${subtractLight(color.substring(4, 6), amount)}`)
}

export {
  getBreakpoint,
  getCSS,
  getCSSVariableValue,
  getElementActualCss,
  getElementActualHeight,
  getElementActualWidth,
  getElementIndex,
  getElementMatches,
  getElementOffset,
  getElementParents,
  getHighestZindex,
  getScrollTop,
  getViewPort,
  insertAfterElement,
  isElementHasClasses,
  isVisibleElement,
  throttle,
  getElementChildren,
  getElementChild,
  isMobileDevice,
  slide,
  slideUp,
  slideDown,
  getAttributeValueByBreakpoint,
  colorLighten,
  colorDarken,
}

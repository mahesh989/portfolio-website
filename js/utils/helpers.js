// Utility Functions
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    return new Promise((resolve, reject) => {
      if (document.execCommand('copy')) {
        resolve();
      } else {
        reject();
      }
      document.body.removeChild(textArea);
    });
  }
}

export function getDeviceType() {
  const userAgent = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
}

export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function getScrollPosition() {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  };
}

export function smoothScrollTo(element, offset = 0) {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

export function createElement(tag, className, textContent) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

export function addClass(element, className) {
  if (element && element.classList) {
    element.classList.add(className);
  }
}

export function removeClass(element, className) {
  if (element && element.classList) {
    element.classList.remove(className);
  }
}

export function toggleClass(element, className) {
  if (element && element.classList) {
    element.classList.toggle(className);
  }
}

export function hasClass(element, className) {
  return element && element.classList && element.classList.contains(className);
}

export function querySelector(selector, parent = document) {
  return parent.querySelector(selector);
}

export function querySelectorAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

export function addEventListener(element, event, handler, options = {}) {
  if (element && element.addEventListener) {
    element.addEventListener(event, handler, options);
  }
}

export function removeEventListener(element, event, handler, options = {}) {
  if (element && element.removeEventListener) {
    element.removeEventListener(event, handler, options);
  }
}

export function getElementById(id) {
  return document.getElementById(id);
}

export function getElementsByClassName(className, parent = document) {
  return parent.getElementsByClassName(className);
}

export function getElementsByTagName(tagName, parent = document) {
  return parent.getElementsByTagName(tagName);
}

export function setAttribute(element, name, value) {
  if (element && element.setAttribute) {
    element.setAttribute(name, value);
  }
}

export function getAttribute(element, name) {
  return element && element.getAttribute ? element.getAttribute(name) : null;
}

export function removeAttribute(element, name) {
  if (element && element.removeAttribute) {
    element.removeAttribute(name);
  }
}

export function setStyle(element, property, value) {
  if (element && element.style) {
    element.style[property] = value;
  }
}

export function getStyle(element, property) {
  if (element && element.style) {
    return element.style[property];
  }
  return null;
}

export function getComputedStyle(element, property) {
  if (element && window.getComputedStyle) {
    return window.getComputedStyle(element)[property];
  }
  return null;
}

export function requestAnimationFrame(callback) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback);
  } else {
    return setTimeout(callback, 16); // 60fps fallback
  }
}

export function cancelAnimationFrame(id) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(id);
  } else {
    clearTimeout(id);
  }
}

export function setTimeout(callback, delay) {
  return window.setTimeout(callback, delay);
}

export function clearTimeout(id) {
  window.clearTimeout(id);
}

export function setInterval(callback, delay) {
  return window.setInterval(callback, delay);
}

export function clearInterval(id) {
  window.clearInterval(id);
}

export function fetch(url, options = {}) {
  return window.fetch(url, options);
}

export function localStorage() {
  return window.localStorage;
}

export function sessionStorage() {
  return window.sessionStorage;
}

export function JSON() {
  return window.JSON;
}

export function Math() {
  return window.Math;
}

export function Date() {
  return window.Date;
}

export function RegExp() {
  return window.RegExp;
}

export function Error() {
  return window.Error;
}

export function Promise() {
  return window.Promise;
}

export function Array() {
  return window.Array;
}

export function Object() {
  return window.Object;
}

export function String() {
  return window.String;
}

export function Number() {
  return window.Number;
}

export function Boolean() {
  return window.Boolean;
}

export function Function() {
  return window.Function;
}

export function Symbol() {
  return window.Symbol;
}

export function Map() {
  return window.Map;
}

export function Set() {
  return window.Set;
}

export function WeakMap() {
  return window.WeakMap;
}

export function WeakSet() {
  return window.WeakSet;
}

export function Proxy() {
  return window.Proxy;
}

export function Reflect() {
  return window.Reflect;
}

export function Generator() {
  return window.Generator;
}

export function GeneratorFunction() {
  return window.GeneratorFunction;
}

export function AsyncFunction() {
  return window.AsyncFunction;
}

export function AsyncGenerator() {
  return window.AsyncGenerator;
}

export function AsyncGeneratorFunction() {
  return window.AsyncGeneratorFunction;
}

export default function (window, document) {

  var html = document.getElementsByTagName('html')[0];
  var body = document.getElementsByTagName('body')[0];
  var ObjectDefineProperty = Object.defineProperty;

  function define(object, property, getter) {
    if (!(property in object)) {
      ObjectDefineProperty(object, property, { get: getter });
    }
  }

  define(window, 'innerWidth', function () { return html.clientWidth; });
  define(window, 'innerHeight', function () { return html.clientHeight; });

  define(window, 'scrollX', function () { return window.pageXOffset || html.scrollLeft; });
  define(window, 'scrollY', function () { return window.pageYOffset || html.scrollTop; });

  // OBSOLETE https://developer.mozilla.org/en-US/docs/Web/API/document.height
  define(document, 'width', function () { return Math.max(body.scrollWidth, html.scrollWidth, body.offsetWidth, html.offsetWidth, body.clientWidth, html.clientWidth); });
  define(document, 'height', function () { return Math.max(body.scrollHeight, html.scrollHeight, body.offsetHeight, html.offsetHeight, body.clientHeight, html.clientHeight); });

  return define;

}

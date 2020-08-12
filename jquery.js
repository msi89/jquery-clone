function getElements(arg) {
  const elements = document.querySelectorAll(arg);

  // css style
  elements.css = function (...cssArgs) {
    if (typeof cssArgs[0] === "string") {
      const [property, value] = cssArgs;
      elements.forEach((el) => {
        el.style[property] = value;
      });
    }
    if (typeof cssArgs[0] === "object") {
      const styles = Object.entries(cssArgs[0]);
      elements.forEach((el) => {
        styles.forEach(([property, value]) => {
          el.style[property] = value;
        });
      });
    }
  };

  // add event handler
  elements.on = function (eventName, eventHandler) {
    elements.forEach((el) => {
      el.addEventListener(eventName, eventHandler);
    });
  };
  // remove event
  elements.off = function (eventName, eventHandler) {
    elements.forEach((el) => {
      el.removeEventListener(eventName, eventHandler);
    });
  };

  // get/set attributes
  elements.attr = function (...attrs) {
    if (typeof attrs[0] === "object") {
      elements.forEach((el) => {
        Object.entries(attrs[0]).forEach(([attr, value]) => {
          el.setAttribute(attr, value);
        });
      });
      return null;
    } else if (typeof attrs[0] === "string") {
      if (attrs[1]) {
        elements.forEach((el) => {
          el.setAttribute(attrs[0], attrs[1]);
        });
        return null;
      } else {
        return elements[0].getAttribute(attrs[0]);
      }
    }
  };

  elements.removeAttr = function (attr) {
    elements.forEach((el) => {
      el.removeAttribute(attr);
    });
  };

  // height
  elements.height = function (h) {
    const height = typeof h === "string" ? h : h + "px";
    elements.forEach((el) => {
      el.style.height = height;
    });
  };

  // width
  elements.width = function (h) {
    const width = typeof h === "string" ? h : h + "px";
    elements.forEach((el) => {
      el.style.width = width;
    });
  };

  // show elements
  elements.show = function () {
    elements.forEach((el) => {
      el.style.display = "";
    });
  };
  // hide elements
  elements.hide = function () {
    elements.forEach((el) => {
      el.style.display = "none";
    });
  };
  // fade in
  elements.fadeIn = function (callback = () => {}) {
    elements.forEach((el) => {
      elements.forEach((el) => {
        el.style.opacity = 0;
        var last = +new Date();
        var tick = function () {
          el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
          last = +new Date();
          if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
              setTimeout(tick, 16);
          }
        };
        tick();
        callback();
      });
    });
  };
  // fade out
  elements.fadeOut = function (callback = () => {}) {
    elements.forEach((el) => {
      var fadeEffect = setInterval(function () {
        if (!el.style.opacity) {
          el.style.opacity = 1;
        }
        if (el.style.opacity > 0) {
          el.style.opacity -= 0.1;
        } else {
          clearInterval(fadeEffect);
          el.style.display = "none";
        }
      }, 30);
      callback();
    });
  };

  elements.addClass = function (className) {
    elements.forEach((el) => {
      el.classList.add(className);
    });
  };

  elements.removeClass = function (className) {
    elements.forEach((el) => {
      el.classList.remove(className);
    });
  };

  elements.append = function (child) {
    elements.forEach((el) => {
      el.appendChild(child);
    });
  };

  elements.remove = function (child) {
    elements.forEach((el) => {
      if (child) {
        el.removeChild(child);
      } else {
        el.parentNode.removeChild(el);
      }
    });
  };

  elements.after = function (target) {
    elements.forEach((el) => {
      el.insertAdjacentElement("afterend", target);
    });
  };

  elements.before = function (target) {
    elements.forEach((el) => {
      el.insertAdjacentElement("beforebegin", target);
    });
  };

  elements.children = function () {
    return elements[0].children();
  };

  elements.html = function (html) {
    if (html) {
      elements.forEach((el) => {
        el.innerHTML = html;
      });
    }
    return elements[0].outerHTML;
  };

  elements.text = function (text) {
    if (text) {
      elements.forEach((el) => {
        el.textContent = text;
      });
    }
    return elements[0].textContent;
  };

  elements.parent = function () {
    return elements[0].parentNode;
  };

  elements.contains = function (target) {
    elements.contains(target);
  };

  elements.each = function (handler) {
    Array.prototype.forEach.call(elements, handler);
  };

  return elements;
}

const $ = (args) => {
  const argsType = typeof args;
  switch (argsType) {
    case "function":
      document.addEventListener("DOMContentLoaded", args);
      return this;
    case "string":
      return getElements(args);
    default:
      this.ready = function (handler) {
        if (document.readyState != "loading") {
          handler();
        } else {
          document.addEventListener("DOMContentLoaded", handler);
        }
      };
      return this;
  }
};

$.now = function () {
  return Date.now();
};

$.json = function (s, stringify = false) {
  if (stringify) {
    return JSON.stringify(s);
  }
  return JSON.parse(s);
};

$.each = function (array, arrayHandler) {
  array.forEach(arrayHandler);
};

$.ajax = function (config) {
  const option = {
    method: "GET",
    url: "",
    data: null,
    headers: {},
    success: () => {},
    error: () => {},
    progress: (event) => {},
    ...config,
  };

  var request = new XMLHttpRequest();
  request.open(option.method, option.url, true);
  Object.entries(option.headers).forEach(([key, value]) => {
    request.setRequestHeader(key, value);
  });

  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      option.success({
        status: request.status,
        data: JSON.parse(request.response),
      });
    } else {
      option.error({
        status: this.status,
        statusText: this.statusText,
      });
    }
  };
  request.onprogress = option.progress;
  request.onerror = function () {
    option.error(request.response);
  };
  request.send(option.data);
};

$.http = function (option) {
  const opt = {
    method: "GET",
    url: "",
    data: null,
    headers: {},
    ...option,
  };

  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(opt.method, opt.url, true);
    Object.entries(opt.headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({
          status: this.status,
          data: JSON.parse(xhr.response),
        });
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send(opt.data);
  });
};

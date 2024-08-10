// ../../../NottinghamWall/uniapp/node_modules/vant/es/utils/basic.mjs
function noop() {
}
var extend = Object.assign;
var inBrowser = typeof window !== "undefined";
var isObject = (val) => val !== null && typeof val === "object";
var isDef = (val) => val !== void 0 && val !== null;
var isFunction = (val) => typeof val === "function";
var isPromise = (val) => isObject(val) && isFunction(val.then) && isFunction(val.catch);
var isDate = (val) => Object.prototype.toString.call(val) === "[object Date]" && !Number.isNaN(val.getTime());
function isMobile(value) {
  value = value.replace(/[^-|\d]/g, "");
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
}
var isNumeric = (val) => typeof val === "number" || /^\d+(\.\d+)?$/.test(val);
var isIOS = () => inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
function get(object, path) {
  const keys = path.split(".");
  let result = object;
  keys.forEach((key) => {
    var _a;
    result = isObject(result) ? (_a = result[key]) != null ? _a : "" : "";
  });
  return result;
}
function pick(obj, keys, ignoreUndefined) {
  return keys.reduce(
    (ret, key) => {
      if (!ignoreUndefined || obj[key] !== void 0) {
        ret[key] = obj[key];
      }
      return ret;
    },
    {}
  );
}
var isSameValue = (newValue, oldValue) => JSON.stringify(newValue) === JSON.stringify(oldValue);
var toArray = (item) => Array.isArray(item) ? item : [item];
var flat = (arr) => arr.reduce((acc, val) => acc.concat(val), []);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/utils/props.mjs
var unknownProp = null;
var numericProp = [Number, String];
var truthProp = {
  type: Boolean,
  default: true
};
var makeRequiredProp = (type) => ({
  type,
  required: true
});
var makeArrayProp = () => ({
  type: Array,
  default: () => []
});
var makeNumberProp = (defaultVal) => ({
  type: Number,
  default: defaultVal
});
var makeNumericProp = (defaultVal) => ({
  type: numericProp,
  default: defaultVal
});
var makeStringProp = (defaultVal) => ({
  type: String,
  default: defaultVal
});

// ../../../NottinghamWall/uniapp/node_modules/@vant/use/dist/index.esm.mjs
import { unref } from "vue";
import { ref } from "vue";
import {
  ref as ref2,
  inject,
  computed,
  onUnmounted,
  getCurrentInstance
} from "vue";
import {
  isVNode,
  provide,
  reactive,
  getCurrentInstance as getCurrentInstance2
} from "vue";
import {
  ref as ref3,
  computed as computed2,
  onActivated,
  onDeactivated,
  onBeforeUnmount
} from "vue";
import { unref as unref3 } from "vue";
import {
  watch,
  isRef,
  unref as unref2,
  onUnmounted as onUnmounted2,
  onDeactivated as onDeactivated2
} from "vue";
import { nextTick, onMounted, onActivated as onActivated2 } from "vue";
import { ref as ref4 } from "vue";
import { ref as ref5, onMounted as onMounted2 } from "vue";
import { ref as ref6 } from "vue";
import { watch as watch2, inject as inject2 } from "vue";
var inBrowser2 = typeof window !== "undefined";
function raf(fn2) {
  return inBrowser2 ? requestAnimationFrame(fn2) : -1;
}
function cancelRaf(id) {
  if (inBrowser2) {
    cancelAnimationFrame(id);
  }
}
function doubleRaf(fn2) {
  raf(() => raf(fn2));
}
var isWindow = (val) => val === window;
var makeDOMRect = (width2, height2) => ({
  top: 0,
  left: 0,
  right: width2,
  bottom: height2,
  width: width2,
  height: height2
});
var useRect = (elementOrRef) => {
  const element = unref(elementOrRef);
  if (isWindow(element)) {
    const width2 = element.innerWidth;
    const height2 = element.innerHeight;
    return makeDOMRect(width2, height2);
  }
  if (element == null ? void 0 : element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }
  return makeDOMRect(0, 0);
};
function useToggle(defaultValue = false) {
  const state = ref(defaultValue);
  const toggle = (value = !state.value) => {
    state.value = value;
  };
  return [state, toggle];
}
function useParent(key) {
  const parent = inject(key, null);
  if (parent) {
    const instance4 = getCurrentInstance();
    const { link, unlink, internalChildren } = parent;
    link(instance4);
    onUnmounted(() => unlink(instance4));
    const index = computed(() => internalChildren.indexOf(instance4));
    return {
      parent,
      index
    };
  }
  return {
    parent: null,
    index: ref2(-1)
  };
}
function flattenVNodes(children) {
  const result = [];
  const traverse = (children2) => {
    if (Array.isArray(children2)) {
      children2.forEach((child) => {
        var _a;
        if (isVNode(child)) {
          result.push(child);
          if ((_a = child.component) == null ? void 0 : _a.subTree) {
            result.push(child.component.subTree);
            traverse(child.component.subTree.children);
          }
          if (child.children) {
            traverse(child.children);
          }
        }
      });
    }
  };
  traverse(children);
  return result;
}
var findVNodeIndex = (vnodes, vnode) => {
  const index = vnodes.indexOf(vnode);
  if (index === -1) {
    return vnodes.findIndex(
      (item) => vnode.key !== void 0 && vnode.key !== null && item.type === vnode.type && item.key === vnode.key
    );
  }
  return index;
};
function sortChildren(parent, publicChildren, internalChildren) {
  const vnodes = flattenVNodes(parent.subTree.children);
  internalChildren.sort(
    (a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode)
  );
  const orderedPublicChildren = internalChildren.map((item) => item.proxy);
  publicChildren.sort((a, b) => {
    const indexA = orderedPublicChildren.indexOf(a);
    const indexB = orderedPublicChildren.indexOf(b);
    return indexA - indexB;
  });
}
function useChildren(key) {
  const publicChildren = reactive([]);
  const internalChildren = reactive([]);
  const parent = getCurrentInstance2();
  const linkChildren = (value) => {
    const link = (child) => {
      if (child.proxy) {
        internalChildren.push(child);
        publicChildren.push(child.proxy);
        sortChildren(parent, publicChildren, internalChildren);
      }
    };
    const unlink = (child) => {
      const index = internalChildren.indexOf(child);
      publicChildren.splice(index, 1);
      internalChildren.splice(index, 1);
    };
    provide(
      key,
      Object.assign(
        {
          link,
          unlink,
          children: publicChildren,
          internalChildren
        },
        value
      )
    );
  };
  return {
    children: publicChildren,
    linkChildren
  };
}
var SECOND = 1e3;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
function parseTime(time) {
  const days = Math.floor(time / DAY);
  const hours = Math.floor(time % DAY / HOUR);
  const minutes = Math.floor(time % HOUR / MINUTE);
  const seconds = Math.floor(time % MINUTE / SECOND);
  const milliseconds = Math.floor(time % SECOND);
  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}
function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1e3) === Math.floor(time2 / 1e3);
}
function useCountDown(options) {
  let rafId;
  let endTime;
  let counting;
  let deactivated;
  const remain = ref3(options.time);
  const current2 = computed2(() => parseTime(remain.value));
  const pause = () => {
    counting = false;
    cancelRaf(rafId);
  };
  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0);
  const setRemain = (value) => {
    var _a, _b;
    remain.value = value;
    (_a = options.onChange) == null ? void 0 : _a.call(options, current2.value);
    if (value === 0) {
      pause();
      (_b = options.onFinish) == null ? void 0 : _b.call(options);
    }
  };
  const microTick = () => {
    rafId = raf(() => {
      if (counting) {
        setRemain(getCurrentRemain());
        if (remain.value > 0) {
          microTick();
        }
      }
    });
  };
  const macroTick = () => {
    rafId = raf(() => {
      if (counting) {
        const remainRemain = getCurrentRemain();
        if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
          setRemain(remainRemain);
        }
        if (remain.value > 0) {
          macroTick();
        }
      }
    });
  };
  const tick = () => {
    if (!inBrowser2) {
      return;
    }
    if (options.millisecond) {
      microTick();
    } else {
      macroTick();
    }
  };
  const start2 = () => {
    if (!counting) {
      endTime = Date.now() + remain.value;
      counting = true;
      tick();
    }
  };
  const reset = (totalTime = options.time) => {
    pause();
    remain.value = totalTime;
  };
  onBeforeUnmount(pause);
  onActivated(() => {
    if (deactivated) {
      counting = true;
      deactivated = false;
      tick();
    }
  });
  onDeactivated(() => {
    if (counting) {
      pause();
      deactivated = true;
    }
  });
  return {
    start: start2,
    pause,
    reset,
    current: current2
  };
}
function onMountedOrActivated(hook) {
  let mounted;
  onMounted(() => {
    hook();
    nextTick(() => {
      mounted = true;
    });
  });
  onActivated2(() => {
    if (mounted) {
      hook();
    }
  });
}
function useEventListener(type, listener, options = {}) {
  if (!inBrowser2) {
    return;
  }
  const { target = window, passive: passive2 = false, capture = false } = options;
  let cleaned = false;
  let attached;
  const add = (target2) => {
    if (cleaned) {
      return;
    }
    const element = unref2(target2);
    if (element && !attached) {
      element.addEventListener(type, listener, {
        capture,
        passive: passive2
      });
      attached = true;
    }
  };
  const remove2 = (target2) => {
    if (cleaned) {
      return;
    }
    const element = unref2(target2);
    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };
  onUnmounted2(() => remove2(target));
  onDeactivated2(() => remove2(target));
  onMountedOrActivated(() => add(target));
  let stopWatch;
  if (isRef(target)) {
    stopWatch = watch(target, (val, oldVal) => {
      remove2(oldVal);
      add(val);
    });
  }
  return () => {
    stopWatch == null ? void 0 : stopWatch();
    remove2(target);
    cleaned = true;
  };
}
function useClickAway(target, listener, options = {}) {
  if (!inBrowser2) {
    return;
  }
  const { eventName = "click" } = options;
  const onClick = (event) => {
    const targets = Array.isArray(target) ? target : [target];
    const isClickAway = targets.every((item) => {
      const element = unref3(item);
      return element && !element.contains(event.target);
    });
    if (isClickAway) {
      listener(event);
    }
  };
  useEventListener(eventName, onClick, { target: document });
}
var width;
var height;
function useWindowSize() {
  if (!width) {
    width = ref4(0);
    height = ref4(0);
    if (inBrowser2) {
      const update = () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
      };
      update();
      window.addEventListener("resize", update, { passive: true });
      window.addEventListener("orientationchange", update, { passive: true });
    }
  }
  return { width, height };
}
var overflowScrollReg = /scroll|auto|overlay/i;
var defaultRoot = inBrowser2 ? window : void 0;
function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === ELEMENT_NODE_TYPE;
}
function getScrollParent(el, root = defaultRoot) {
  let node = el;
  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }
  return root;
}
function useScrollParent(el, root = defaultRoot) {
  const scrollParent = ref5();
  onMounted2(() => {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, root);
    }
  });
  return scrollParent;
}
var visibility;
function usePageVisibility() {
  if (!visibility) {
    visibility = ref6("visible");
    if (inBrowser2) {
      const update = () => {
        visibility.value = document.hidden ? "hidden" : "visible";
      };
      update();
      window.addEventListener("visibilitychange", update);
    }
  }
  return visibility;
}
var CUSTOM_FIELD_INJECTION_KEY = Symbol("van-field");
function useCustomFieldValue(customValue) {
  const field = inject2(CUSTOM_FIELD_INJECTION_KEY, null);
  if (field && !field.customValue.value) {
    field.customValue.value = customValue;
    watch2(customValue, () => {
      field.resetValidation();
      field.validateWithTrigger("onChange");
    });
  }
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/utils/dom.mjs
import { unref as unref4 } from "vue";
function getScrollTop(el) {
  const top2 = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top2, 0);
}
function setScrollTop(el, value) {
  if ("scrollTop" in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}
function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}
function getElementTop(el, scroller) {
  if (el === window) {
    return 0;
  }
  const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return useRect(el).top + scrollTop;
}
var isIOS2 = isIOS();
function resetScroll() {
  if (isIOS2) {
    setRootScrollTop(getRootScrollTop());
  }
}
var stopPropagation = (event) => event.stopPropagation();
function preventDefault(event, isStopPropagation) {
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    event.preventDefault();
  }
  if (isStopPropagation) {
    stopPropagation(event);
  }
}
function isHidden(elementRef) {
  const el = unref4(elementRef);
  if (!el) {
    return false;
  }
  const style = window.getComputedStyle(el);
  const hidden = style.display === "none";
  const parentHidden = el.offsetParent === null && style.position !== "fixed";
  return hidden || parentHidden;
}
var { width: windowWidth, height: windowHeight } = useWindowSize();
function isContainingBlock(el) {
  const css = window.getComputedStyle(el);
  return css.transform !== "none" || css.perspective !== "none" || ["transform", "perspective", "filter"].some(
    (value) => (css.willChange || "").includes(value)
  );
}
function getContainingBlock(el) {
  let node = el.parentElement;
  while (node) {
    if (node && node.tagName !== "HTML" && node.tagName !== "BODY" && isContainingBlock(node)) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/utils/format.mjs
function addUnit(value) {
  if (isDef(value)) {
    return isNumeric(value) ? `${value}px` : String(value);
  }
  return void 0;
}
function getSizeStyle(originSize) {
  if (isDef(originSize)) {
    if (Array.isArray(originSize)) {
      return {
        width: addUnit(originSize[0]),
        height: addUnit(originSize[1])
      };
    }
    const size = addUnit(originSize);
    return {
      width: size,
      height: size
    };
  }
}
function getZIndexStyle(zIndex) {
  const style = {};
  if (zIndex !== void 0) {
    style.zIndex = +zIndex;
  }
  return style;
}
var rootFontSize;
function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }
  return rootFontSize;
}
function convertRem(value) {
  value = value.replace(/rem/g, "");
  return +value * getRootFontSize();
}
function convertVw(value) {
  value = value.replace(/vw/g, "");
  return +value * windowWidth.value / 100;
}
function convertVh(value) {
  value = value.replace(/vh/g, "");
  return +value * windowHeight.value / 100;
}
function unitToPx(value) {
  if (typeof value === "number") {
    return value;
  }
  if (inBrowser) {
    if (value.includes("rem")) {
      return convertRem(value);
    }
    if (value.includes("vw")) {
      return convertVw(value);
    }
    if (value.includes("vh")) {
      return convertVh(value);
    }
  }
  return parseFloat(value);
}
var camelizeRE = /-(\w)/g;
var camelize = (str) => str.replace(camelizeRE, (_, c) => c.toUpperCase());
var kebabCase = (str) => str.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
function padZero(num, targetLength = 2) {
  let str = num + "";
  while (str.length < targetLength) {
    str = "0" + str;
  }
  return str;
}
var clamp = (num, min, max) => Math.min(Math.max(num, min), max);
function trimExtraChar(value, char, regExp) {
  const index = value.indexOf(char);
  if (index === -1) {
    return value;
  }
  if (char === "-" && index !== 0) {
    return value.slice(0, index);
  }
  return value.slice(0, index + 1) + value.slice(index).replace(regExp, "");
}
function formatNumber(value, allowDot = true, allowMinus = true) {
  if (allowDot) {
    value = trimExtraChar(value, ".", /\./g);
  } else {
    value = value.split(".")[0];
  }
  if (allowMinus) {
    value = trimExtraChar(value, "-", /-/g);
  } else {
    value = value.replace(/-/, "");
  }
  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return value.replace(regExp, "");
}
function addNumber(num1, num2) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/locale/index.mjs
import { ref as ref7, reactive as reactive2 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/utils/deep-assign.mjs
var { hasOwnProperty } = Object.prototype;
function assignKey(to, from, key) {
  const val = from[key];
  if (!isDef(val)) {
    return;
  }
  if (!hasOwnProperty.call(to, key) || !isObject(val)) {
    to[key] = val;
  } else {
    to[key] = deepAssign(Object(to[key]), val);
  }
}
function deepAssign(to, from) {
  Object.keys(from).forEach((key) => {
    assignKey(to, from, key);
  });
  return to;
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/locale/lang/zh-CN.mjs
var stdin_default = {
  name: "姓名",
  tel: "电话",
  save: "保存",
  clear: "清空",
  cancel: "取消",
  confirm: "确认",
  delete: "删除",
  loading: "加载中...",
  noCoupon: "暂无优惠券",
  nameEmpty: "请填写姓名",
  addContact: "添加联系人",
  telInvalid: "请填写正确的电话",
  vanCalendar: {
    end: "结束",
    start: "开始",
    title: "日期选择",
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    monthTitle: (year, month) => `${year}年${month}月`,
    rangePrompt: (maxRange) => `最多选择 ${maxRange} 天`
  },
  vanCascader: {
    select: "请选择"
  },
  vanPagination: {
    prev: "上一页",
    next: "下一页"
  },
  vanPullRefresh: {
    pulling: "下拉即可刷新...",
    loosing: "释放即可刷新..."
  },
  vanSubmitBar: {
    label: "合计:"
  },
  vanCoupon: {
    unlimited: "无门槛",
    discount: (discount) => `${discount}折`,
    condition: (condition) => `满${condition}元可用`
  },
  vanCouponCell: {
    title: "优惠券",
    count: (count) => `${count}张可用`
  },
  vanCouponList: {
    exchange: "兑换",
    close: "不使用",
    enable: "可用",
    disabled: "不可用",
    placeholder: "输入优惠码"
  },
  vanAddressEdit: {
    area: "地区",
    areaEmpty: "请选择地区",
    addressEmpty: "请填写详细地址",
    addressDetail: "详细地址",
    defaultAddress: "设为默认收货地址"
  },
  vanAddressList: {
    add: "新增地址"
  }
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/locale/index.mjs
var lang = ref7("zh-CN");
var messages = reactive2({
  "zh-CN": stdin_default
});
var Locale = {
  messages() {
    return messages[lang.value];
  },
  use(newLang, newMessages) {
    lang.value = newLang;
    this.add({ [newLang]: newMessages });
  },
  add(newMessages = {}) {
    deepAssign(messages, newMessages);
  }
};
var useCurrentLang = () => lang;
var stdin_default2 = Locale;

// ../../../NottinghamWall/uniapp/node_modules/vant/es/utils/create.mjs
function createTranslate(name112) {
  const prefix = camelize(name112) + ".";
  return (path, ...args) => {
    const messages2 = stdin_default2.messages();
    const message = get(messages2, prefix + path) || get(messages2, path);
    return isFunction(message) ? message(...args) : message;
  };
}
function genBem(name112, mods) {
  if (!mods) {
    return "";
  }
  if (typeof mods === "string") {
    return ` ${name112}--${mods}`;
  }
  if (Array.isArray(mods)) {
    return mods.reduce(
      (ret, item) => ret + genBem(name112, item),
      ""
    );
  }
  return Object.keys(mods).reduce(
    (ret, key) => ret + (mods[key] ? genBem(name112, key) : ""),
    ""
  );
}
function createBEM(name112) {
  return (el, mods) => {
    if (el && typeof el !== "string") {
      mods = el;
      el = "";
    }
    el = el ? `${name112}__${el}` : name112;
    return `${el}${genBem(el, mods)}`;
  };
}
function createNamespace(name112) {
  const prefixedName = `van-${name112}`;
  return [
    prefixedName,
    createBEM(prefixedName),
    createTranslate(prefixedName)
  ];
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/utils/constant.mjs
var BORDER = "van-hairline";
var BORDER_TOP = `${BORDER}--top`;
var BORDER_LEFT = `${BORDER}--left`;
var BORDER_RIGHT = `${BORDER}--right`;
var BORDER_BOTTOM = `${BORDER}--bottom`;
var BORDER_SURROUND = `${BORDER}--surround`;
var BORDER_TOP_BOTTOM = `${BORDER}--top-bottom`;
var BORDER_UNSET_TOP_BOTTOM = `${BORDER}-unset--top-bottom`;
var HAPTICS_FEEDBACK = "van-haptics-feedback";
var FORM_KEY = Symbol("van-form");
var LONG_PRESS_START_TIME = 500;
var TAP_OFFSET = 5;

// ../../../NottinghamWall/uniapp/node_modules/vant/es/utils/interceptor.mjs
function callInterceptor(interceptor, {
  args = [],
  done,
  canceled,
  error
}) {
  if (interceptor) {
    const returnVal = interceptor.apply(null, args);
    if (isPromise(returnVal)) {
      returnVal.then((value) => {
        if (value) {
          done();
        } else if (canceled) {
          canceled();
        }
      }).catch(error || noop);
    } else if (returnVal) {
      done();
    } else if (canceled) {
      canceled();
    }
  } else {
    done();
  }
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/utils/with-install.mjs
function withInstall(options) {
  options.install = (app) => {
    const { name: name112 } = options;
    if (name112) {
      app.component(name112, options);
      app.component(camelize(`-${name112}`), options);
    }
  };
  return options;
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/utils/closest.mjs
function closest(arr, target) {
  return arr.reduce(
    (pre, cur) => Math.abs(pre - target) < Math.abs(cur - target) ? pre : cur
  );
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/action-bar/ActionBar.mjs
import { createVNode as _createVNode2 } from "vue";
import { defineComponent, ref as ref9 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-placeholder.mjs
import { createVNode as _createVNode } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-height.mjs
import { ref as ref8, onMounted as onMounted3, nextTick as nextTick2, watch as watch4 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/on-popup-reopen.mjs
import { inject as inject3, watch as watch3 } from "vue";
var POPUP_TOGGLE_KEY = Symbol();
function onPopupReopen(callback) {
  const popupToggleStatus = inject3(POPUP_TOGGLE_KEY, null);
  if (popupToggleStatus) {
    watch3(popupToggleStatus, (show) => {
      if (show) {
        callback();
      }
    });
  }
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-height.mjs
var useHeight = (element, withSafeArea) => {
  const height2 = ref8();
  const setHeight = () => {
    height2.value = useRect(element).height;
  };
  onMounted3(() => {
    nextTick2(setHeight);
    if (withSafeArea) {
      for (let i = 1; i <= 3; i++) {
        setTimeout(setHeight, 100 * i);
      }
    }
  });
  onPopupReopen(() => nextTick2(setHeight));
  watch4([windowWidth, windowHeight], setHeight);
  return height2;
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-placeholder.mjs
function usePlaceholder(contentRef, bem107) {
  const height2 = useHeight(contentRef, true);
  return (renderContent) => _createVNode("div", {
    "class": bem107("placeholder"),
    "style": {
      height: height2.value ? `${height2.value}px` : void 0
    }
  }, [renderContent()]);
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/action-bar/ActionBar.mjs
var [name, bem] = createNamespace("action-bar");
var ACTION_BAR_KEY = Symbol(name);
var actionBarProps = {
  placeholder: Boolean,
  safeAreaInsetBottom: truthProp
};
var stdin_default3 = defineComponent({
  name,
  props: actionBarProps,
  setup(props2, {
    slots
  }) {
    const root = ref9();
    const renderPlaceholder = usePlaceholder(root, bem);
    const {
      linkChildren
    } = useChildren(ACTION_BAR_KEY);
    linkChildren();
    const renderActionBar = () => {
      var _a;
      return _createVNode2("div", {
        "ref": root,
        "class": [bem(), {
          "van-safe-area-bottom": props2.safeAreaInsetBottom
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
    return () => {
      if (props2.placeholder) {
        return renderPlaceholder(renderActionBar);
      }
      return renderActionBar();
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/action-bar/index.mjs
var ActionBar = withInstall(stdin_default3);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/action-bar-button/ActionBarButton.mjs
import { createVNode as _createVNode8 } from "vue";
import { computed as computed7, defineComponent as defineComponent7 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-expose.mjs
import { getCurrentInstance as getCurrentInstance3 } from "vue";
function useExpose(apis) {
  const instance4 = getCurrentInstance3();
  if (instance4) {
    extend(instance4.proxy, apis);
  }
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-route.mjs
import {
  getCurrentInstance as getCurrentInstance4
} from "vue";
var routeProps = {
  to: [String, Object],
  url: String,
  replace: Boolean
};
function route({
  to,
  url,
  replace,
  $router: router
}) {
  if (to && router) {
    router[replace ? "replace" : "push"](to);
  } else if (url) {
    replace ? location.replace(url) : location.href = url;
  }
}
function useRoute() {
  const vm = getCurrentInstance4().proxy;
  return () => route(vm);
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/button/Button.mjs
import { createVNode as _createVNode7 } from "vue";
import { defineComponent as defineComponent6 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/icon/Icon.mjs
import { mergeProps as _mergeProps, createVNode as _createVNode5 } from "vue";
import { inject as inject4, computed as computed5, defineComponent as defineComponent4 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/badge/Badge.mjs
import { createVNode as _createVNode3 } from "vue";
import { computed as computed3, defineComponent as defineComponent2 } from "vue";
var [name2, bem2] = createNamespace("badge");
var badgeProps = {
  dot: Boolean,
  max: numericProp,
  tag: makeStringProp("div"),
  color: String,
  offset: Array,
  content: numericProp,
  showZero: truthProp,
  position: makeStringProp("top-right")
};
var stdin_default4 = defineComponent2({
  name: name2,
  props: badgeProps,
  setup(props2, {
    slots
  }) {
    const hasContent = () => {
      if (slots.content) {
        return true;
      }
      const {
        content,
        showZero
      } = props2;
      return isDef(content) && content !== "" && (showZero || content !== 0 && content !== "0");
    };
    const renderContent = () => {
      const {
        dot,
        max,
        content
      } = props2;
      if (!dot && hasContent()) {
        if (slots.content) {
          return slots.content();
        }
        if (isDef(max) && isNumeric(content) && +content > +max) {
          return `${max}+`;
        }
        return content;
      }
    };
    const getOffsetWithMinusString = (val) => val.startsWith("-") ? val.replace("-", "") : `-${val}`;
    const style = computed3(() => {
      const style2 = {
        background: props2.color
      };
      if (props2.offset) {
        const [x, y] = props2.offset;
        const {
          position
        } = props2;
        const [offsetY, offsetX] = position.split("-");
        if (slots.default) {
          if (typeof y === "number") {
            style2[offsetY] = addUnit(offsetY === "top" ? y : -y);
          } else {
            style2[offsetY] = offsetY === "top" ? addUnit(y) : getOffsetWithMinusString(y);
          }
          if (typeof x === "number") {
            style2[offsetX] = addUnit(offsetX === "left" ? x : -x);
          } else {
            style2[offsetX] = offsetX === "left" ? addUnit(x) : getOffsetWithMinusString(x);
          }
        } else {
          style2.marginTop = addUnit(y);
          style2.marginLeft = addUnit(x);
        }
      }
      return style2;
    });
    const renderBadge = () => {
      if (hasContent() || props2.dot) {
        return _createVNode3("div", {
          "class": bem2([props2.position, {
            dot: props2.dot,
            fixed: !!slots.default
          }]),
          "style": style.value
        }, [renderContent()]);
      }
    };
    return () => {
      if (slots.default) {
        const {
          tag
        } = props2;
        return _createVNode3(tag, {
          "class": bem2("wrapper")
        }, {
          default: () => [slots.default(), renderBadge()]
        });
      }
      return renderBadge();
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/badge/index.mjs
var Badge = withInstall(stdin_default4);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/config-provider/ConfigProvider.mjs
import { createVNode as _createVNode4 } from "vue";
import { watch as watch5, provide as provide2, computed as computed4, watchEffect, onActivated as onActivated3, onDeactivated as onDeactivated3, onBeforeUnmount as onBeforeUnmount2, defineComponent as defineComponent3 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-global-z-index.mjs
var globalZIndex = 2e3;
var useGlobalZIndex = () => ++globalZIndex;
var setGlobalZIndex = (val) => {
  globalZIndex = val;
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/config-provider/ConfigProvider.mjs
var [name3, bem3] = createNamespace("config-provider");
var CONFIG_PROVIDER_KEY = Symbol(name3);
var configProviderProps = {
  tag: makeStringProp("div"),
  theme: makeStringProp("light"),
  zIndex: Number,
  themeVars: Object,
  themeVarsDark: Object,
  themeVarsLight: Object,
  themeVarsScope: makeStringProp("local"),
  iconPrefix: String
};
function insertDash(str) {
  return str.replace(/([a-zA-Z])(\d)/g, "$1-$2");
}
function mapThemeVarsToCSSVars(themeVars) {
  const cssVars = {};
  Object.keys(themeVars).forEach((key) => {
    const formattedKey = insertDash(kebabCase(key));
    cssVars[`--van-${formattedKey}`] = themeVars[key];
  });
  return cssVars;
}
function syncThemeVarsOnRoot(newStyle = {}, oldStyle = {}) {
  Object.keys(newStyle).forEach((key) => {
    if (newStyle[key] !== oldStyle[key]) {
      document.documentElement.style.setProperty(key, newStyle[key]);
    }
  });
  Object.keys(oldStyle).forEach((key) => {
    if (!newStyle[key]) {
      document.documentElement.style.removeProperty(key);
    }
  });
}
var stdin_default5 = defineComponent3({
  name: name3,
  props: configProviderProps,
  setup(props2, {
    slots
  }) {
    const style = computed4(() => mapThemeVarsToCSSVars(extend({}, props2.themeVars, props2.theme === "dark" ? props2.themeVarsDark : props2.themeVarsLight)));
    if (inBrowser) {
      const addTheme = () => {
        document.documentElement.classList.add(`van-theme-${props2.theme}`);
      };
      const removeTheme = (theme = props2.theme) => {
        document.documentElement.classList.remove(`van-theme-${theme}`);
      };
      watch5(() => props2.theme, (newVal, oldVal) => {
        if (oldVal) {
          removeTheme(oldVal);
        }
        addTheme();
      }, {
        immediate: true
      });
      onActivated3(addTheme);
      onDeactivated3(removeTheme);
      onBeforeUnmount2(removeTheme);
      watch5(style, (newStyle, oldStyle) => {
        if (props2.themeVarsScope === "global") {
          syncThemeVarsOnRoot(newStyle, oldStyle);
        }
      });
      watch5(() => props2.themeVarsScope, (newScope, oldScope) => {
        if (oldScope === "global") {
          syncThemeVarsOnRoot({}, style.value);
        }
        if (newScope === "global") {
          syncThemeVarsOnRoot(style.value, {});
        }
      });
      if (props2.themeVarsScope === "global") {
        syncThemeVarsOnRoot(style.value, {});
      }
    }
    provide2(CONFIG_PROVIDER_KEY, props2);
    watchEffect(() => {
      if (props2.zIndex !== void 0) {
        setGlobalZIndex(props2.zIndex);
      }
    });
    return () => _createVNode4(props2.tag, {
      "class": bem3(),
      "style": props2.themeVarsScope === "local" ? style.value : void 0
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
      }
    });
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/icon/Icon.mjs
var [name4, bem4] = createNamespace("icon");
var isImage = (name210) => name210 == null ? void 0 : name210.includes("/");
var iconProps = {
  dot: Boolean,
  tag: makeStringProp("i"),
  name: String,
  size: numericProp,
  badge: numericProp,
  color: String,
  badgeProps: Object,
  classPrefix: String
};
var stdin_default6 = defineComponent4({
  name: name4,
  props: iconProps,
  setup(props2, {
    slots
  }) {
    const config = inject4(CONFIG_PROVIDER_KEY, null);
    const classPrefix = computed5(() => props2.classPrefix || (config == null ? void 0 : config.iconPrefix) || bem4());
    return () => {
      const {
        tag,
        dot,
        name: name210,
        size,
        badge,
        color
      } = props2;
      const isImageIcon = isImage(name210);
      return _createVNode5(Badge, _mergeProps({
        "dot": dot,
        "tag": tag,
        "class": [classPrefix.value, isImageIcon ? "" : `${classPrefix.value}-${name210}`],
        "style": {
          color,
          fontSize: addUnit(size)
        },
        "content": badge
      }, props2.badgeProps), {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots), isImageIcon && _createVNode5("img", {
            "class": bem4("image"),
            "src": name210
          }, null)];
        }
      });
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/icon/index.mjs
var Icon = withInstall(stdin_default6);
var stdin_default7 = Icon;

// ../../../NottinghamWall/uniapp/node_modules/vant/es/loading/Loading.mjs
import { createVNode as _createVNode6 } from "vue";
import { computed as computed6, defineComponent as defineComponent5 } from "vue";
var [name5, bem5] = createNamespace("loading");
var SpinIcon = Array(12).fill(null).map((_, index) => _createVNode6("i", {
  "class": bem5("line", String(index + 1))
}, null));
var CircularIcon = _createVNode6("svg", {
  "class": bem5("circular"),
  "viewBox": "25 25 50 50"
}, [_createVNode6("circle", {
  "cx": "50",
  "cy": "50",
  "r": "20",
  "fill": "none"
}, null)]);
var loadingProps = {
  size: numericProp,
  type: makeStringProp("circular"),
  color: String,
  vertical: Boolean,
  textSize: numericProp,
  textColor: String
};
var stdin_default8 = defineComponent5({
  name: name5,
  props: loadingProps,
  setup(props2, {
    slots
  }) {
    const spinnerStyle = computed6(() => extend({
      color: props2.color
    }, getSizeStyle(props2.size)));
    const renderIcon = () => {
      const DefaultIcon = props2.type === "spinner" ? SpinIcon : CircularIcon;
      return _createVNode6("span", {
        "class": bem5("spinner", props2.type),
        "style": spinnerStyle.value
      }, [slots.icon ? slots.icon() : DefaultIcon]);
    };
    const renderText = () => {
      var _a;
      if (slots.default) {
        return _createVNode6("span", {
          "class": bem5("text"),
          "style": {
            fontSize: addUnit(props2.textSize),
            color: (_a = props2.textColor) != null ? _a : props2.color
          }
        }, [slots.default()]);
      }
    };
    return () => {
      const {
        type,
        vertical
      } = props2;
      return _createVNode6("div", {
        "class": bem5([type, {
          vertical
        }]),
        "aria-live": "polite",
        "aria-busy": true
      }, [renderIcon(), renderText()]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/loading/index.mjs
var Loading = withInstall(stdin_default8);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/button/Button.mjs
var [name6, bem6] = createNamespace("button");
var buttonProps = extend({}, routeProps, {
  tag: makeStringProp("button"),
  text: String,
  icon: String,
  type: makeStringProp("default"),
  size: makeStringProp("normal"),
  color: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  iconPrefix: String,
  nativeType: makeStringProp("button"),
  loadingSize: numericProp,
  loadingText: String,
  loadingType: String,
  iconPosition: makeStringProp("left")
});
var stdin_default9 = defineComponent6({
  name: name6,
  props: buttonProps,
  emits: ["click"],
  setup(props2, {
    emit,
    slots
  }) {
    const route2 = useRoute();
    const renderLoadingIcon = () => {
      if (slots.loading) {
        return slots.loading();
      }
      return _createVNode7(Loading, {
        "size": props2.loadingSize,
        "type": props2.loadingType,
        "class": bem6("loading")
      }, null);
    };
    const renderIcon = () => {
      if (props2.loading) {
        return renderLoadingIcon();
      }
      if (slots.icon) {
        return _createVNode7("div", {
          "class": bem6("icon")
        }, [slots.icon()]);
      }
      if (props2.icon) {
        return _createVNode7(Icon, {
          "name": props2.icon,
          "class": bem6("icon"),
          "classPrefix": props2.iconPrefix
        }, null);
      }
    };
    const renderText = () => {
      let text;
      if (props2.loading) {
        text = props2.loadingText;
      } else {
        text = slots.default ? slots.default() : props2.text;
      }
      if (text) {
        return _createVNode7("span", {
          "class": bem6("text")
        }, [text]);
      }
    };
    const getStyle = () => {
      const {
        color,
        plain
      } = props2;
      if (color) {
        const style = {
          color: plain ? color : "white"
        };
        if (!plain) {
          style.background = color;
        }
        if (color.includes("gradient")) {
          style.border = 0;
        } else {
          style.borderColor = color;
        }
        return style;
      }
    };
    const onClick = (event) => {
      if (props2.loading) {
        preventDefault(event);
      } else if (!props2.disabled) {
        emit("click", event);
        route2();
      }
    };
    return () => {
      const {
        tag,
        type,
        size,
        block,
        round: round2,
        plain,
        square,
        loading,
        disabled,
        hairline,
        nativeType,
        iconPosition
      } = props2;
      const classes = [bem6([type, size, {
        plain,
        block,
        round: round2,
        square,
        loading,
        disabled,
        hairline
      }]), {
        [BORDER_SURROUND]: hairline
      }];
      return _createVNode7(tag, {
        "type": nativeType,
        "class": classes,
        "style": getStyle(),
        "disabled": disabled,
        "onClick": onClick
      }, {
        default: () => [_createVNode7("div", {
          "class": bem6("content")
        }, [iconPosition === "left" && renderIcon(), renderText(), iconPosition === "right" && renderIcon()])]
      });
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/button/index.mjs
var Button = withInstall(stdin_default9);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/action-bar-button/ActionBarButton.mjs
var [name7, bem7] = createNamespace("action-bar-button");
var actionBarButtonProps = extend({}, routeProps, {
  type: String,
  text: String,
  icon: String,
  color: String,
  loading: Boolean,
  disabled: Boolean
});
var stdin_default10 = defineComponent7({
  name: name7,
  props: actionBarButtonProps,
  setup(props2, {
    slots
  }) {
    const route2 = useRoute();
    const {
      parent,
      index
    } = useParent(ACTION_BAR_KEY);
    const isFirst = computed7(() => {
      if (parent) {
        const prev = parent.children[index.value - 1];
        return !(prev && "isButton" in prev);
      }
    });
    const isLast = computed7(() => {
      if (parent) {
        const next = parent.children[index.value + 1];
        return !(next && "isButton" in next);
      }
    });
    useExpose({
      isButton: true
    });
    return () => {
      const {
        type,
        icon,
        text,
        color,
        loading,
        disabled
      } = props2;
      return _createVNode8(Button, {
        "class": bem7([type, {
          last: isLast.value,
          first: isFirst.value
        }]),
        "size": "large",
        "type": type,
        "icon": icon,
        "color": color,
        "loading": loading,
        "disabled": disabled,
        "onClick": route2
      }, {
        default: () => [slots.default ? slots.default() : text]
      });
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/action-bar-button/index.mjs
var ActionBarButton = withInstall(stdin_default10);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/action-bar-icon/ActionBarIcon.mjs
import { createVNode as _createVNode9, mergeProps as _mergeProps2 } from "vue";
import { defineComponent as defineComponent8 } from "vue";
var [name8, bem8] = createNamespace("action-bar-icon");
var actionBarIconProps = extend({}, routeProps, {
  dot: Boolean,
  text: String,
  icon: String,
  color: String,
  badge: numericProp,
  iconClass: unknownProp,
  badgeProps: Object,
  iconPrefix: String
});
var stdin_default11 = defineComponent8({
  name: name8,
  props: actionBarIconProps,
  setup(props2, {
    slots
  }) {
    const route2 = useRoute();
    useParent(ACTION_BAR_KEY);
    const renderIcon = () => {
      const {
        dot,
        badge,
        icon,
        color,
        iconClass,
        badgeProps: badgeProps2,
        iconPrefix
      } = props2;
      if (slots.icon) {
        return _createVNode9(Badge, _mergeProps2({
          "dot": dot,
          "class": bem8("icon"),
          "content": badge
        }, badgeProps2), {
          default: slots.icon
        });
      }
      return _createVNode9(Icon, {
        "tag": "div",
        "dot": dot,
        "name": icon,
        "badge": badge,
        "color": color,
        "class": [bem8("icon"), iconClass],
        "badgeProps": badgeProps2,
        "classPrefix": iconPrefix
      }, null);
    };
    return () => _createVNode9("div", {
      "role": "button",
      "class": bem8(),
      "tabindex": 0,
      "onClick": route2
    }, [renderIcon(), slots.default ? slots.default() : props2.text]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/action-bar-icon/index.mjs
var ActionBarIcon = withInstall(stdin_default11);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/action-sheet/ActionSheet.mjs
import { mergeProps as _mergeProps4, createVNode as _createVNode12 } from "vue";
import { nextTick as nextTick4, defineComponent as defineComponent11 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/popup/Popup.mjs
import { Fragment as _Fragment, withDirectives as _withDirectives2, vShow as _vShow2, createVNode as _createVNode11, mergeProps as _mergeProps3 } from "vue";
import { ref as ref13, watch as watch8, provide as provide3, Teleport, nextTick as nextTick3, computed as computed8, onMounted as onMounted4, Transition as Transition2, onActivated as onActivated4, onDeactivated as onDeactivated5, defineComponent as defineComponent10 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/popup/shared.mjs
var popupSharedProps = {
  // whether to show popup
  show: Boolean,
  // z-index
  zIndex: numericProp,
  // whether to show overlay
  overlay: truthProp,
  // transition duration
  duration: numericProp,
  // teleport
  teleport: [String, Object],
  // prevent body scroll
  lockScroll: truthProp,
  // whether to lazy render
  lazyRender: truthProp,
  // callback function before close
  beforeClose: Function,
  // overlay custom style
  overlayStyle: Object,
  // overlay custom class name
  overlayClass: unknownProp,
  // Initial rendering animation
  transitionAppear: Boolean,
  // whether to close popup when overlay is clicked
  closeOnClickOverlay: truthProp
};
var popupSharedPropKeys = Object.keys(
  popupSharedProps
);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-lock-scroll.mjs
import { watch as watch6, onBeforeUnmount as onBeforeUnmount3, onDeactivated as onDeactivated4 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-touch.mjs
import { ref as ref10 } from "vue";
function getDirection(x, y) {
  if (x > y) {
    return "horizontal";
  }
  if (y > x) {
    return "vertical";
  }
  return "";
}
function useTouch() {
  const startX = ref10(0);
  const startY = ref10(0);
  const deltaX = ref10(0);
  const deltaY = ref10(0);
  const offsetX = ref10(0);
  const offsetY = ref10(0);
  const direction = ref10("");
  const isTap = ref10(true);
  const isVertical = () => direction.value === "vertical";
  const isHorizontal = () => direction.value === "horizontal";
  const reset = () => {
    deltaX.value = 0;
    deltaY.value = 0;
    offsetX.value = 0;
    offsetY.value = 0;
    direction.value = "";
    isTap.value = true;
  };
  const start2 = (event) => {
    reset();
    startX.value = event.touches[0].clientX;
    startY.value = event.touches[0].clientY;
  };
  const move = (event) => {
    const touch = event.touches[0];
    deltaX.value = (touch.clientX < 0 ? 0 : touch.clientX) - startX.value;
    deltaY.value = touch.clientY - startY.value;
    offsetX.value = Math.abs(deltaX.value);
    offsetY.value = Math.abs(deltaY.value);
    const LOCK_DIRECTION_DISTANCE = 10;
    if (!direction.value || offsetX.value < LOCK_DIRECTION_DISTANCE && offsetY.value < LOCK_DIRECTION_DISTANCE) {
      direction.value = getDirection(offsetX.value, offsetY.value);
    }
    if (isTap.value && (offsetX.value > TAP_OFFSET || offsetY.value > TAP_OFFSET)) {
      isTap.value = false;
    }
  };
  return {
    move,
    start: start2,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
    isTap
  };
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-lock-scroll.mjs
var totalLockCount = 0;
var BODY_LOCK_CLASS = "van-overflow-hidden";
function useLockScroll(rootRef, shouldLock) {
  const touch = useTouch();
  const DIRECTION_UP = "01";
  const DIRECTION_DOWN = "10";
  const onTouchMove = (event) => {
    touch.move(event);
    const direction = touch.deltaY.value > 0 ? DIRECTION_DOWN : DIRECTION_UP;
    const el = getScrollParent(
      event.target,
      rootRef.value
    );
    const { scrollHeight, offsetHeight, scrollTop } = el;
    let status = "11";
    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? "00" : "01";
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = "10";
    }
    if (status !== "11" && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
      preventDefault(event, true);
    }
  };
  const lock = () => {
    document.addEventListener("touchstart", touch.start);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }
    totalLockCount++;
  };
  const unlock = () => {
    if (totalLockCount) {
      document.removeEventListener("touchstart", touch.start);
      document.removeEventListener("touchmove", onTouchMove);
      totalLockCount--;
      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };
  const init = () => shouldLock() && lock();
  const destroy = () => shouldLock() && unlock();
  onMountedOrActivated(init);
  onDeactivated4(destroy);
  onBeforeUnmount3(destroy);
  watch6(shouldLock, (value) => {
    value ? lock() : unlock();
  });
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-lazy-render.mjs
import { ref as ref11, watch as watch7 } from "vue";
function useLazyRender(show) {
  const inited = ref11(false);
  watch7(
    show,
    (value) => {
      if (value) {
        inited.value = value;
      }
    },
    { immediate: true }
  );
  return (render) => () => inited.value ? render() : null;
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-scope-id.mjs
import { getCurrentInstance as getCurrentInstance5 } from "vue";
var useScopeId = () => {
  var _a;
  const { scopeId } = ((_a = getCurrentInstance5()) == null ? void 0 : _a.vnode) || {};
  return scopeId ? { [scopeId]: "" } : null;
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/overlay/Overlay.mjs
import { withDirectives as _withDirectives, createVNode as _createVNode10, vShow as _vShow } from "vue";
import { ref as ref12, Transition, defineComponent as defineComponent9 } from "vue";
var [name9, bem9] = createNamespace("overlay");
var overlayProps = {
  show: Boolean,
  zIndex: numericProp,
  duration: numericProp,
  className: unknownProp,
  lockScroll: truthProp,
  lazyRender: truthProp,
  customStyle: Object
};
var stdin_default12 = defineComponent9({
  name: name9,
  props: overlayProps,
  setup(props2, {
    slots
  }) {
    const root = ref12();
    const lazyRender = useLazyRender(() => props2.show || !props2.lazyRender);
    const onTouchMove = (event) => {
      if (props2.lockScroll) {
        preventDefault(event, true);
      }
    };
    const renderOverlay = lazyRender(() => {
      var _a;
      const style = extend(getZIndexStyle(props2.zIndex), props2.customStyle);
      if (isDef(props2.duration)) {
        style.animationDuration = `${props2.duration}s`;
      }
      return _withDirectives(_createVNode10("div", {
        "ref": root,
        "style": style,
        "class": [bem9(), props2.className]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), [[_vShow, props2.show]]);
    });
    useEventListener("touchmove", onTouchMove, {
      target: root
    });
    return () => _createVNode10(Transition, {
      "name": "van-fade",
      "appear": true
    }, {
      default: renderOverlay
    });
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/overlay/index.mjs
var Overlay = withInstall(stdin_default12);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/popup/Popup.mjs
var popupProps = extend({}, popupSharedProps, {
  round: Boolean,
  position: makeStringProp("center"),
  closeIcon: makeStringProp("cross"),
  closeable: Boolean,
  transition: String,
  iconPrefix: String,
  closeOnPopstate: Boolean,
  closeIconPosition: makeStringProp("top-right"),
  safeAreaInsetTop: Boolean,
  safeAreaInsetBottom: Boolean
});
var [name10, bem10] = createNamespace("popup");
var stdin_default13 = defineComponent10({
  name: name10,
  inheritAttrs: false,
  props: popupProps,
  emits: ["open", "close", "opened", "closed", "keydown", "update:show", "clickOverlay", "clickCloseIcon"],
  setup(props2, {
    emit,
    attrs,
    slots
  }) {
    let opened;
    let shouldReopen;
    const zIndex = ref13();
    const popupRef = ref13();
    const lazyRender = useLazyRender(() => props2.show || !props2.lazyRender);
    const style = computed8(() => {
      const style2 = {
        zIndex: zIndex.value
      };
      if (isDef(props2.duration)) {
        const key = props2.position === "center" ? "animationDuration" : "transitionDuration";
        style2[key] = `${props2.duration}s`;
      }
      return style2;
    });
    const open = () => {
      if (!opened) {
        opened = true;
        zIndex.value = props2.zIndex !== void 0 ? +props2.zIndex : useGlobalZIndex();
        emit("open");
      }
    };
    const close = () => {
      if (opened) {
        callInterceptor(props2.beforeClose, {
          done() {
            opened = false;
            emit("close");
            emit("update:show", false);
          }
        });
      }
    };
    const onClickOverlay = (event) => {
      emit("clickOverlay", event);
      if (props2.closeOnClickOverlay) {
        close();
      }
    };
    const renderOverlay = () => {
      if (props2.overlay) {
        return _createVNode11(Overlay, _mergeProps3({
          "show": props2.show,
          "class": props2.overlayClass,
          "zIndex": zIndex.value,
          "duration": props2.duration,
          "customStyle": props2.overlayStyle,
          "role": props2.closeOnClickOverlay ? "button" : void 0,
          "tabindex": props2.closeOnClickOverlay ? 0 : void 0
        }, useScopeId(), {
          "onClick": onClickOverlay
        }), {
          default: slots["overlay-content"]
        });
      }
    };
    const onClickCloseIcon = (event) => {
      emit("clickCloseIcon", event);
      close();
    };
    const renderCloseIcon = () => {
      if (props2.closeable) {
        return _createVNode11(Icon, {
          "role": "button",
          "tabindex": 0,
          "name": props2.closeIcon,
          "class": [bem10("close-icon", props2.closeIconPosition), HAPTICS_FEEDBACK],
          "classPrefix": props2.iconPrefix,
          "onClick": onClickCloseIcon
        }, null);
      }
    };
    let timer2;
    const onOpened = () => {
      if (timer2)
        clearTimeout(timer2);
      timer2 = setTimeout(() => {
        emit("opened");
      });
    };
    const onClosed = () => emit("closed");
    const onKeydown = (event) => emit("keydown", event);
    const renderPopup = lazyRender(() => {
      var _a;
      const {
        round: round2,
        position,
        safeAreaInsetTop,
        safeAreaInsetBottom
      } = props2;
      return _withDirectives2(_createVNode11("div", _mergeProps3({
        "ref": popupRef,
        "style": style.value,
        "role": "dialog",
        "tabindex": 0,
        "class": [bem10({
          round: round2,
          [position]: position
        }), {
          "van-safe-area-top": safeAreaInsetTop,
          "van-safe-area-bottom": safeAreaInsetBottom
        }],
        "onKeydown": onKeydown
      }, attrs, useScopeId()), [(_a = slots.default) == null ? void 0 : _a.call(slots), renderCloseIcon()]), [[_vShow2, props2.show]]);
    });
    const renderTransition = () => {
      const {
        position,
        transition,
        transitionAppear
      } = props2;
      const name210 = position === "center" ? "van-fade" : `van-popup-slide-${position}`;
      return _createVNode11(Transition2, {
        "name": transition || name210,
        "appear": transitionAppear,
        "onAfterEnter": onOpened,
        "onAfterLeave": onClosed
      }, {
        default: renderPopup
      });
    };
    watch8(() => props2.show, (show) => {
      if (show && !opened) {
        open();
        if (attrs.tabindex === 0) {
          nextTick3(() => {
            var _a;
            (_a = popupRef.value) == null ? void 0 : _a.focus();
          });
        }
      }
      if (!show && opened) {
        opened = false;
        emit("close");
      }
    });
    useExpose({
      popupRef
    });
    useLockScroll(popupRef, () => props2.show && props2.lockScroll);
    useEventListener("popstate", () => {
      if (props2.closeOnPopstate) {
        close();
        shouldReopen = false;
      }
    });
    onMounted4(() => {
      if (props2.show) {
        open();
      }
    });
    onActivated4(() => {
      if (shouldReopen) {
        emit("update:show", true);
        shouldReopen = false;
      }
    });
    onDeactivated5(() => {
      if (props2.show && props2.teleport) {
        close();
        shouldReopen = true;
      }
    });
    provide3(POPUP_TOGGLE_KEY, () => props2.show);
    return () => {
      if (props2.teleport) {
        return _createVNode11(Teleport, {
          "to": props2.teleport
        }, {
          default: () => [renderOverlay(), renderTransition()]
        });
      }
      return _createVNode11(_Fragment, null, [renderOverlay(), renderTransition()]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/popup/index.mjs
var Popup = withInstall(stdin_default13);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/action-sheet/ActionSheet.mjs
var [name11, bem11] = createNamespace("action-sheet");
var actionSheetProps = extend({}, popupSharedProps, {
  title: String,
  round: truthProp,
  actions: makeArrayProp(),
  closeIcon: makeStringProp("cross"),
  closeable: truthProp,
  cancelText: String,
  description: String,
  closeOnPopstate: truthProp,
  closeOnClickAction: Boolean,
  safeAreaInsetBottom: truthProp
});
var popupInheritKeys = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
var stdin_default14 = defineComponent11({
  name: name11,
  props: actionSheetProps,
  emits: ["select", "cancel", "update:show"],
  setup(props2, {
    slots,
    emit
  }) {
    const updateShow = (show) => emit("update:show", show);
    const onCancel = () => {
      updateShow(false);
      emit("cancel");
    };
    const renderHeader = () => {
      if (props2.title) {
        return _createVNode12("div", {
          "class": bem11("header")
        }, [props2.title, props2.closeable && _createVNode12(Icon, {
          "name": props2.closeIcon,
          "class": [bem11("close"), HAPTICS_FEEDBACK],
          "onClick": onCancel
        }, null)]);
      }
    };
    const renderCancel = () => {
      if (slots.cancel || props2.cancelText) {
        return [_createVNode12("div", {
          "class": bem11("gap")
        }, null), _createVNode12("button", {
          "type": "button",
          "class": bem11("cancel"),
          "onClick": onCancel
        }, [slots.cancel ? slots.cancel() : props2.cancelText])];
      }
    };
    const renderIcon = (action) => {
      if (action.icon) {
        return _createVNode12(Icon, {
          "class": bem11("item-icon"),
          "name": action.icon
        }, null);
      }
    };
    const renderActionContent = (action, index) => {
      if (action.loading) {
        return _createVNode12(Loading, {
          "class": bem11("loading-icon")
        }, null);
      }
      if (slots.action) {
        return slots.action({
          action,
          index
        });
      }
      return [_createVNode12("span", {
        "class": bem11("name")
      }, [action.name]), action.subname && _createVNode12("div", {
        "class": bem11("subname")
      }, [action.subname])];
    };
    const renderAction = (action, index) => {
      const {
        color,
        loading,
        callback,
        disabled,
        className
      } = action;
      const onClick = () => {
        if (disabled || loading) {
          return;
        }
        if (callback) {
          callback(action);
        }
        if (props2.closeOnClickAction) {
          updateShow(false);
        }
        nextTick4(() => emit("select", action, index));
      };
      return _createVNode12("button", {
        "type": "button",
        "style": {
          color
        },
        "class": [bem11("item", {
          loading,
          disabled
        }), className],
        "onClick": onClick
      }, [renderIcon(action), renderActionContent(action, index)]);
    };
    const renderDescription = () => {
      if (props2.description || slots.description) {
        const content = slots.description ? slots.description() : props2.description;
        return _createVNode12("div", {
          "class": bem11("description")
        }, [content]);
      }
    };
    return () => _createVNode12(Popup, _mergeProps4({
      "class": bem11(),
      "position": "bottom",
      "onUpdate:show": updateShow
    }, pick(props2, popupInheritKeys)), {
      default: () => {
        var _a;
        return [renderHeader(), renderDescription(), _createVNode12("div", {
          "class": bem11("content")
        }, [props2.actions.map(renderAction), (_a = slots.default) == null ? void 0 : _a.call(slots)]), renderCancel()];
      }
    });
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/action-sheet/index.mjs
var ActionSheet = withInstall(stdin_default14);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/address-edit/AddressEdit.mjs
import { withDirectives as _withDirectives4, vShow as _vShow4, createVNode as _createVNode32 } from "vue";
import { ref as ref27, watch as watch20, computed as computed19, nextTick as nextTick12, reactive as reactive9, defineComponent as defineComponent30 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/area/Area.mjs
import { createVNode as _createVNode24, mergeProps as _mergeProps7 } from "vue";
import { ref as ref23, watch as watch16, computed as computed17, defineComponent as defineComponent23 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/picker/Picker.mjs
import { mergeProps as _mergeProps6, createVNode as _createVNode23 } from "vue";
import { ref as ref22, watch as watch15, computed as computed16, nextTick as nextTick10, defineComponent as defineComponent22 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/picker/utils.mjs
var [name12, bem12, t] = createNamespace("picker");
var getFirstEnabledOption = (options) => options.find((option) => !option.disabled) || options[0];
function getColumnsType(columns, fields) {
  const firstColumn = columns[0];
  if (firstColumn) {
    if (Array.isArray(firstColumn)) {
      return "multiple";
    }
    if (fields.children in firstColumn) {
      return "cascade";
    }
  }
  return "default";
}
function findIndexOfEnabledOption(options, index) {
  index = clamp(index, 0, options.length);
  for (let i = index; i < options.length; i++) {
    if (!options[i].disabled)
      return i;
  }
  for (let i = index - 1; i >= 0; i--) {
    if (!options[i].disabled)
      return i;
  }
  return 0;
}
var isOptionExist = (options, value, fields) => value !== void 0 && !!options.find((option) => option[fields.value] === value);
function findOptionByValue(options, value, fields) {
  const index = options.findIndex((option) => option[fields.value] === value);
  const enabledIndex = findIndexOfEnabledOption(options, index);
  return options[enabledIndex];
}
function formatCascadeColumns(columns, fields, selectedValues) {
  const formatted = [];
  let cursor = {
    [fields.children]: columns
  };
  let columnIndex = 0;
  while (cursor && cursor[fields.children]) {
    const options = cursor[fields.children];
    const value = selectedValues.value[columnIndex];
    cursor = isDef(value) ? findOptionByValue(options, value, fields) : void 0;
    if (!cursor && options.length) {
      const firstValue = getFirstEnabledOption(options)[fields.value];
      cursor = findOptionByValue(options, firstValue, fields);
    }
    columnIndex++;
    formatted.push(options);
  }
  return formatted;
}
function getElementTranslateY(element) {
  const { transform } = window.getComputedStyle(element);
  const translateY = transform.slice(7, transform.length - 1).split(", ")[5];
  return Number(translateY);
}
function assignDefaultFields(fields) {
  return extend(
    {
      text: "text",
      value: "value",
      children: "children"
    },
    fields
  );
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/picker/PickerColumn.mjs
import { createVNode as _createVNode13 } from "vue";
import { ref as ref14, computed as computed9, watchEffect as watchEffect2, defineComponent as defineComponent12 } from "vue";
var DEFAULT_DURATION = 200;
var MOMENTUM_TIME = 300;
var MOMENTUM_DISTANCE = 15;
var [name13, bem13] = createNamespace("picker-column");
var PICKER_KEY = Symbol(name13);
var stdin_default15 = defineComponent12({
  name: name13,
  props: {
    value: numericProp,
    fields: makeRequiredProp(Object),
    options: makeArrayProp(),
    readonly: Boolean,
    allowHtml: Boolean,
    optionHeight: makeRequiredProp(Number),
    swipeDuration: makeRequiredProp(numericProp),
    visibleOptionNum: makeRequiredProp(numericProp)
  },
  emits: ["change", "clickOption", "scrollInto"],
  setup(props2, {
    emit,
    slots
  }) {
    let moving;
    let startOffset;
    let touchStartTime;
    let momentumOffset;
    let transitionEndTrigger;
    const root = ref14();
    const wrapper = ref14();
    const currentOffset = ref14(0);
    const currentDuration = ref14(0);
    const touch = useTouch();
    const count = () => props2.options.length;
    const baseOffset = () => props2.optionHeight * (+props2.visibleOptionNum - 1) / 2;
    const updateValueByIndex = (index) => {
      let enabledIndex = findIndexOfEnabledOption(props2.options, index);
      const offset2 = -enabledIndex * props2.optionHeight;
      const trigger = () => {
        if (enabledIndex > count() - 1) {
          enabledIndex = findIndexOfEnabledOption(props2.options, index);
        }
        const value = props2.options[enabledIndex][props2.fields.value];
        if (value !== props2.value) {
          emit("change", value);
        }
      };
      if (moving && offset2 !== currentOffset.value) {
        transitionEndTrigger = trigger;
      } else {
        trigger();
      }
      currentOffset.value = offset2;
    };
    const isReadonly = () => props2.readonly || !props2.options.length;
    const onClickOption = (index) => {
      if (moving || isReadonly()) {
        return;
      }
      transitionEndTrigger = null;
      currentDuration.value = DEFAULT_DURATION;
      updateValueByIndex(index);
      emit("clickOption", props2.options[index]);
    };
    const getIndexByOffset = (offset2) => clamp(Math.round(-offset2 / props2.optionHeight), 0, count() - 1);
    const currentIndex = computed9(() => getIndexByOffset(currentOffset.value));
    const momentum = (distance, duration) => {
      const speed = Math.abs(distance / duration);
      distance = currentOffset.value + speed / 3e-3 * (distance < 0 ? -1 : 1);
      const index = getIndexByOffset(distance);
      currentDuration.value = +props2.swipeDuration;
      updateValueByIndex(index);
    };
    const stopMomentum = () => {
      moving = false;
      currentDuration.value = 0;
      if (transitionEndTrigger) {
        transitionEndTrigger();
        transitionEndTrigger = null;
      }
    };
    const onTouchStart = (event) => {
      if (isReadonly()) {
        return;
      }
      touch.start(event);
      if (moving) {
        const translateY = getElementTranslateY(wrapper.value);
        currentOffset.value = Math.min(0, translateY - baseOffset());
      }
      currentDuration.value = 0;
      startOffset = currentOffset.value;
      touchStartTime = Date.now();
      momentumOffset = startOffset;
      transitionEndTrigger = null;
    };
    const onTouchMove = (event) => {
      if (isReadonly()) {
        return;
      }
      touch.move(event);
      if (touch.isVertical()) {
        moving = true;
        preventDefault(event, true);
      }
      const newOffset = clamp(startOffset + touch.deltaY.value, -(count() * props2.optionHeight), props2.optionHeight);
      const newIndex = getIndexByOffset(newOffset);
      if (newIndex !== currentIndex.value) {
        emit("scrollInto", props2.options[newIndex]);
      }
      currentOffset.value = newOffset;
      const now = Date.now();
      if (now - touchStartTime > MOMENTUM_TIME) {
        touchStartTime = now;
        momentumOffset = newOffset;
      }
    };
    const onTouchEnd = () => {
      if (isReadonly()) {
        return;
      }
      const distance = currentOffset.value - momentumOffset;
      const duration = Date.now() - touchStartTime;
      const startMomentum = duration < MOMENTUM_TIME && Math.abs(distance) > MOMENTUM_DISTANCE;
      if (startMomentum) {
        momentum(distance, duration);
        return;
      }
      const index = getIndexByOffset(currentOffset.value);
      currentDuration.value = DEFAULT_DURATION;
      updateValueByIndex(index);
      setTimeout(() => {
        moving = false;
      }, 0);
    };
    const renderOptions = () => {
      const optionStyle = {
        height: `${props2.optionHeight}px`
      };
      return props2.options.map((option, index) => {
        const text = option[props2.fields.text];
        const {
          disabled
        } = option;
        const value = option[props2.fields.value];
        const data = {
          role: "button",
          style: optionStyle,
          tabindex: disabled ? -1 : 0,
          class: [bem13("item", {
            disabled,
            selected: value === props2.value
          }), option.className],
          onClick: () => onClickOption(index)
        };
        const childData = {
          class: "van-ellipsis",
          [props2.allowHtml ? "innerHTML" : "textContent"]: text
        };
        return _createVNode13("li", data, [slots.option ? slots.option(option, index) : _createVNode13("div", childData, null)]);
      });
    };
    useParent(PICKER_KEY);
    useExpose({
      stopMomentum
    });
    watchEffect2(() => {
      const index = moving ? Math.floor(-currentOffset.value / props2.optionHeight) : props2.options.findIndex((option) => option[props2.fields.value] === props2.value);
      const enabledIndex = findIndexOfEnabledOption(props2.options, index);
      const offset2 = -enabledIndex * props2.optionHeight;
      if (moving && enabledIndex < index)
        stopMomentum();
      currentOffset.value = offset2;
    });
    useEventListener("touchmove", onTouchMove, {
      target: root
    });
    return () => _createVNode13("div", {
      "ref": root,
      "class": bem13(),
      "onTouchstartPassive": onTouchStart,
      "onTouchend": onTouchEnd,
      "onTouchcancel": onTouchEnd
    }, [_createVNode13("ul", {
      "ref": wrapper,
      "style": {
        transform: `translate3d(0, ${currentOffset.value + baseOffset()}px, 0)`,
        transitionDuration: `${currentDuration.value}ms`,
        transitionProperty: currentDuration.value ? "all" : "none"
      },
      "class": bem13("wrapper"),
      "onTransitionend": stopMomentum
    }, [renderOptions()])]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/picker/PickerToolbar.mjs
import { createVNode as _createVNode14 } from "vue";
import { defineComponent as defineComponent13 } from "vue";
var [name14] = createNamespace("picker-toolbar");
var pickerToolbarProps = {
  title: String,
  cancelButtonText: String,
  confirmButtonText: String
};
var pickerToolbarSlots = ["cancel", "confirm", "title", "toolbar"];
var pickerToolbarPropKeys = Object.keys(pickerToolbarProps);
var stdin_default16 = defineComponent13({
  name: name14,
  props: pickerToolbarProps,
  emits: ["confirm", "cancel"],
  setup(props2, {
    emit,
    slots
  }) {
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      if (props2.title) {
        return _createVNode14("div", {
          "class": [bem12("title"), "van-ellipsis"]
        }, [props2.title]);
      }
    };
    const onCancel = () => emit("cancel");
    const onConfirm = () => emit("confirm");
    const renderCancel = () => {
      var _a;
      const text = (_a = props2.cancelButtonText) != null ? _a : t("cancel");
      if (!slots.cancel && !text) {
        return;
      }
      return _createVNode14("button", {
        "type": "button",
        "class": [bem12("cancel"), HAPTICS_FEEDBACK],
        "onClick": onCancel
      }, [slots.cancel ? slots.cancel() : text]);
    };
    const renderConfirm = () => {
      var _a;
      const text = (_a = props2.confirmButtonText) != null ? _a : t("confirm");
      if (!slots.confirm && !text) {
        return;
      }
      return _createVNode14("button", {
        "type": "button",
        "class": [bem12("confirm"), HAPTICS_FEEDBACK],
        "onClick": onConfirm
      }, [slots.confirm ? slots.confirm() : text]);
    };
    return () => _createVNode14("div", {
      "class": bem12("toolbar")
    }, [slots.toolbar ? slots.toolbar() : [renderCancel(), renderTitle(), renderConfirm()]]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/picker-group/PickerGroup.mjs
import { createVNode as _createVNode22 } from "vue";
import { defineComponent as defineComponent21, Comment, Fragment } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-sync-prop-ref.mjs
import { ref as ref15, watch as watch9 } from "vue";
var useSyncPropRef = (getProp, setProp) => {
  const propRef = ref15(getProp());
  watch9(getProp, (value) => {
    if (value !== propRef.value) {
      propRef.value = value;
    }
  });
  watch9(propRef, (value) => {
    if (value !== getProp()) {
      setProp(value);
    }
  });
  return propRef;
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tab/Tab.mjs
import { withDirectives as _withDirectives3, vShow as _vShow3, createVNode as _createVNode21, mergeProps as _mergeProps5 } from "vue";
import { ref as ref21, watch as watch14, provide as provide4, computed as computed15, nextTick as nextTick9, watchEffect as watchEffect3, defineComponent as defineComponent20, getCurrentInstance as getCurrentInstance7 } from "vue";
import { normalizeClass, normalizeStyle, stringifyStyle } from "@vue/shared";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tabs/Tabs.mjs
import { createVNode as _createVNode18 } from "vue";
import { ref as ref20, watch as watch13, computed as computed12, reactive as reactive5, nextTick as nextTick7, onActivated as onActivated6, defineComponent as defineComponent17 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tabs/utils.mjs
function scrollLeftTo(scroller, to, duration) {
  let rafId;
  let count = 0;
  const from = scroller.scrollLeft;
  const frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
  let scrollLeft = from;
  function cancel() {
    cancelRaf(rafId);
  }
  function animate() {
    scrollLeft += (to - from) / frames;
    scroller.scrollLeft = scrollLeft;
    if (++count < frames) {
      rafId = raf(animate);
    }
  }
  animate();
  return cancel;
}
function scrollTopTo(scroller, to, duration, callback) {
  let rafId;
  let current2 = getScrollTop(scroller);
  const isDown = current2 < to;
  const frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
  const step = (to - current2) / frames;
  function cancel() {
    cancelRaf(rafId);
  }
  function animate() {
    current2 += step;
    if (isDown && current2 > to || !isDown && current2 < to) {
      current2 = to;
    }
    setScrollTop(scroller, current2);
    if (isDown && current2 < to || !isDown && current2 > to) {
      rafId = raf(animate);
    } else if (callback) {
      rafId = raf(callback);
    }
  }
  animate();
  return cancel;
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-id.mjs
import { getCurrentInstance as getCurrentInstance6 } from "vue";
var current = 0;
function useId() {
  const vm = getCurrentInstance6();
  const { name: name112 = "unknown" } = (vm == null ? void 0 : vm.type) || {};
  if (false) {
    return name112;
  }
  return `${name112}-${++current}`;
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-refs.mjs
import { ref as ref16, onBeforeUpdate } from "vue";
function useRefs() {
  const refs = ref16([]);
  const cache = [];
  onBeforeUpdate(() => {
    refs.value = [];
  });
  const setRefs = (index) => {
    if (!cache[index]) {
      cache[index] = (el) => {
        refs.value[index] = el;
      };
    }
    return cache[index];
  };
  return [refs, setRefs];
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-visibility-change.mjs
import { onDeactivated as onDeactivated6, onBeforeUnmount as onBeforeUnmount4 } from "vue";
function useVisibilityChange(target, onChange) {
  if (!inBrowser || !window.IntersectionObserver) {
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      onChange(entries[0].intersectionRatio > 0);
    },
    { root: document.body }
  );
  const observe = () => {
    if (target.value) {
      observer.observe(target.value);
    }
  };
  const unobserve = () => {
    if (target.value) {
      observer.unobserve(target.value);
    }
  };
  onDeactivated6(unobserve);
  onBeforeUnmount4(unobserve);
  onMountedOrActivated(observe);
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/sticky/Sticky.mjs
import { createVNode as _createVNode15 } from "vue";
import { ref as ref17, watch as watch10, computed as computed10, nextTick as nextTick5, reactive as reactive3, defineComponent as defineComponent14 } from "vue";
var [name15, bem14] = createNamespace("sticky");
var stickyProps = {
  zIndex: numericProp,
  position: makeStringProp("top"),
  container: Object,
  offsetTop: makeNumericProp(0),
  offsetBottom: makeNumericProp(0)
};
var stdin_default17 = defineComponent14({
  name: name15,
  props: stickyProps,
  emits: ["scroll", "change"],
  setup(props2, {
    emit,
    slots
  }) {
    const root = ref17();
    const scrollParent = useScrollParent(root);
    const state = reactive3({
      fixed: false,
      width: 0,
      // root width
      height: 0,
      // root height
      transform: 0
    });
    const isReset = ref17(false);
    const offset2 = computed10(() => unitToPx(props2.position === "top" ? props2.offsetTop : props2.offsetBottom));
    const rootStyle = computed10(() => {
      if (isReset.value) {
        return;
      }
      const {
        fixed,
        height: height2,
        width: width2
      } = state;
      if (fixed) {
        return {
          width: `${width2}px`,
          height: `${height2}px`
        };
      }
    });
    const stickyStyle = computed10(() => {
      if (!state.fixed || isReset.value) {
        return;
      }
      const style = extend(getZIndexStyle(props2.zIndex), {
        width: `${state.width}px`,
        height: `${state.height}px`,
        [props2.position]: `${offset2.value}px`
      });
      if (state.transform) {
        style.transform = `translate3d(0, ${state.transform}px, 0)`;
      }
      return style;
    });
    const emitScroll = (scrollTop) => emit("scroll", {
      scrollTop,
      isFixed: state.fixed
    });
    const onScroll = () => {
      if (!root.value || isHidden(root)) {
        return;
      }
      const {
        container,
        position
      } = props2;
      const rootRect = useRect(root);
      const scrollTop = getScrollTop(window);
      state.width = rootRect.width;
      state.height = rootRect.height;
      if (position === "top") {
        if (container) {
          const containerRect = useRect(container);
          const difference = containerRect.bottom - offset2.value - state.height;
          state.fixed = offset2.value > rootRect.top && containerRect.bottom > 0;
          state.transform = difference < 0 ? difference : 0;
        } else {
          state.fixed = offset2.value > rootRect.top;
        }
      } else {
        const {
          clientHeight
        } = document.documentElement;
        if (container) {
          const containerRect = useRect(container);
          const difference = clientHeight - containerRect.top - offset2.value - state.height;
          state.fixed = clientHeight - offset2.value < rootRect.bottom && clientHeight > containerRect.top;
          state.transform = difference < 0 ? -difference : 0;
        } else {
          state.fixed = clientHeight - offset2.value < rootRect.bottom;
        }
      }
      emitScroll(scrollTop);
    };
    watch10(() => state.fixed, (value) => emit("change", value));
    useEventListener("scroll", onScroll, {
      target: scrollParent,
      passive: true
    });
    useVisibilityChange(root, onScroll);
    watch10([windowWidth, windowHeight], () => {
      if (!root.value || isHidden(root) || !state.fixed) {
        return;
      }
      isReset.value = true;
      nextTick5(() => {
        const rootRect = useRect(root);
        state.width = rootRect.width;
        state.height = rootRect.height;
        isReset.value = false;
      });
    });
    return () => {
      var _a;
      return _createVNode15("div", {
        "ref": root,
        "style": rootStyle.value
      }, [_createVNode15("div", {
        "class": bem14({
          fixed: state.fixed && !isReset.value
        }),
        "style": stickyStyle.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/sticky/index.mjs
var Sticky = withInstall(stdin_default17);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tabs/TabsContent.mjs
import { createVNode as _createVNode17 } from "vue";
import { ref as ref19, watch as watch12, onMounted as onMounted6, defineComponent as defineComponent16 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/swipe/Swipe.mjs
import { createVNode as _createVNode16 } from "vue";
import { ref as ref18, watch as watch11, reactive as reactive4, computed as computed11, onMounted as onMounted5, onActivated as onActivated5, onDeactivated as onDeactivated7, onBeforeUnmount as onBeforeUnmount5, defineComponent as defineComponent15, nextTick as nextTick6 } from "vue";
var [name16, bem15] = createNamespace("swipe");
var swipeProps = {
  loop: truthProp,
  width: numericProp,
  height: numericProp,
  vertical: Boolean,
  autoplay: makeNumericProp(0),
  duration: makeNumericProp(500),
  touchable: truthProp,
  lazyRender: Boolean,
  initialSwipe: makeNumericProp(0),
  indicatorColor: String,
  showIndicators: truthProp,
  stopPropagation: truthProp
};
var SWIPE_KEY = Symbol(name16);
var stdin_default18 = defineComponent15({
  name: name16,
  props: swipeProps,
  emits: ["change", "dragStart", "dragEnd"],
  setup(props2, {
    emit,
    slots
  }) {
    const root = ref18();
    const track = ref18();
    const state = reactive4({
      rect: null,
      width: 0,
      height: 0,
      offset: 0,
      active: 0,
      swiping: false
    });
    let dragging = false;
    const touch = useTouch();
    const {
      children,
      linkChildren
    } = useChildren(SWIPE_KEY);
    const count = computed11(() => children.length);
    const size = computed11(() => state[props2.vertical ? "height" : "width"]);
    const delta = computed11(() => props2.vertical ? touch.deltaY.value : touch.deltaX.value);
    const minOffset = computed11(() => {
      if (state.rect) {
        const base = props2.vertical ? state.rect.height : state.rect.width;
        return base - size.value * count.value;
      }
      return 0;
    });
    const maxCount = computed11(() => size.value ? Math.ceil(Math.abs(minOffset.value) / size.value) : count.value);
    const trackSize = computed11(() => count.value * size.value);
    const activeIndicator = computed11(() => (state.active + count.value) % count.value);
    const isCorrectDirection = computed11(() => {
      const expect = props2.vertical ? "vertical" : "horizontal";
      return touch.direction.value === expect;
    });
    const trackStyle = computed11(() => {
      const style = {
        transitionDuration: `${state.swiping ? 0 : props2.duration}ms`,
        transform: `translate${props2.vertical ? "Y" : "X"}(${+state.offset.toFixed(2)}px)`
      };
      if (size.value) {
        const mainAxis = props2.vertical ? "height" : "width";
        const crossAxis = props2.vertical ? "width" : "height";
        style[mainAxis] = `${trackSize.value}px`;
        style[crossAxis] = props2[crossAxis] ? `${props2[crossAxis]}px` : "";
      }
      return style;
    });
    const getTargetActive = (pace) => {
      const {
        active
      } = state;
      if (pace) {
        if (props2.loop) {
          return clamp(active + pace, -1, count.value);
        }
        return clamp(active + pace, 0, maxCount.value);
      }
      return active;
    };
    const getTargetOffset = (targetActive, offset2 = 0) => {
      let currentPosition = targetActive * size.value;
      if (!props2.loop) {
        currentPosition = Math.min(currentPosition, -minOffset.value);
      }
      let targetOffset = offset2 - currentPosition;
      if (!props2.loop) {
        targetOffset = clamp(targetOffset, minOffset.value, 0);
      }
      return targetOffset;
    };
    const move = ({
      pace = 0,
      offset: offset2 = 0,
      emitChange
    }) => {
      if (count.value <= 1) {
        return;
      }
      const {
        active
      } = state;
      const targetActive = getTargetActive(pace);
      const targetOffset = getTargetOffset(targetActive, offset2);
      if (props2.loop) {
        if (children[0] && targetOffset !== minOffset.value) {
          const outRightBound = targetOffset < minOffset.value;
          children[0].setOffset(outRightBound ? trackSize.value : 0);
        }
        if (children[count.value - 1] && targetOffset !== 0) {
          const outLeftBound = targetOffset > 0;
          children[count.value - 1].setOffset(outLeftBound ? -trackSize.value : 0);
        }
      }
      state.active = targetActive;
      state.offset = targetOffset;
      if (emitChange && targetActive !== active) {
        emit("change", activeIndicator.value);
      }
    };
    const correctPosition = () => {
      state.swiping = true;
      if (state.active <= -1) {
        move({
          pace: count.value
        });
      } else if (state.active >= count.value) {
        move({
          pace: -count.value
        });
      }
    };
    const prev = () => {
      correctPosition();
      touch.reset();
      doubleRaf(() => {
        state.swiping = false;
        move({
          pace: -1,
          emitChange: true
        });
      });
    };
    const next = () => {
      correctPosition();
      touch.reset();
      doubleRaf(() => {
        state.swiping = false;
        move({
          pace: 1,
          emitChange: true
        });
      });
    };
    let autoplayTimer;
    const stopAutoplay = () => clearTimeout(autoplayTimer);
    const autoplay = () => {
      stopAutoplay();
      if (+props2.autoplay > 0 && count.value > 1) {
        autoplayTimer = setTimeout(() => {
          next();
          autoplay();
        }, +props2.autoplay);
      }
    };
    const initialize = (active = +props2.initialSwipe) => {
      if (!root.value) {
        return;
      }
      const cb = () => {
        var _a, _b;
        if (!isHidden(root)) {
          const rect = {
            width: root.value.offsetWidth,
            height: root.value.offsetHeight
          };
          state.rect = rect;
          state.width = +((_a = props2.width) != null ? _a : rect.width);
          state.height = +((_b = props2.height) != null ? _b : rect.height);
        }
        if (count.value) {
          active = Math.min(count.value - 1, active);
          if (active === -1) {
            active = count.value - 1;
          }
        }
        state.active = active;
        state.swiping = true;
        state.offset = getTargetOffset(active);
        children.forEach((swipe) => {
          swipe.setOffset(0);
        });
        autoplay();
      };
      if (isHidden(root)) {
        nextTick6().then(cb);
      } else {
        cb();
      }
    };
    const resize = () => initialize(state.active);
    let touchStartTime;
    const onTouchStart = (event) => {
      if (!props2.touchable || // avoid resetting position on multi-finger touch
      event.touches.length > 1)
        return;
      touch.start(event);
      dragging = false;
      touchStartTime = Date.now();
      stopAutoplay();
      correctPosition();
    };
    const onTouchMove = (event) => {
      if (props2.touchable && state.swiping) {
        touch.move(event);
        if (isCorrectDirection.value) {
          const isEdgeTouch = !props2.loop && (state.active === 0 && delta.value > 0 || state.active === count.value - 1 && delta.value < 0);
          if (!isEdgeTouch) {
            preventDefault(event, props2.stopPropagation);
            move({
              offset: delta.value
            });
            if (!dragging) {
              emit("dragStart", {
                index: activeIndicator.value
              });
              dragging = true;
            }
          }
        }
      }
    };
    const onTouchEnd = () => {
      if (!props2.touchable || !state.swiping) {
        return;
      }
      const duration = Date.now() - touchStartTime;
      const speed = delta.value / duration;
      const shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta.value) > size.value / 2;
      if (shouldSwipe && isCorrectDirection.value) {
        const offset2 = props2.vertical ? touch.offsetY.value : touch.offsetX.value;
        let pace = 0;
        if (props2.loop) {
          pace = offset2 > 0 ? delta.value > 0 ? -1 : 1 : 0;
        } else {
          pace = -Math[delta.value > 0 ? "ceil" : "floor"](delta.value / size.value);
        }
        move({
          pace,
          emitChange: true
        });
      } else if (delta.value) {
        move({
          pace: 0
        });
      }
      dragging = false;
      state.swiping = false;
      emit("dragEnd", {
        index: activeIndicator.value
      });
      autoplay();
    };
    const swipeTo = (index, options = {}) => {
      correctPosition();
      touch.reset();
      doubleRaf(() => {
        let targetIndex;
        if (props2.loop && index === count.value) {
          targetIndex = state.active === 0 ? 0 : index;
        } else {
          targetIndex = index % count.value;
        }
        if (options.immediate) {
          doubleRaf(() => {
            state.swiping = false;
          });
        } else {
          state.swiping = false;
        }
        move({
          pace: targetIndex - state.active,
          emitChange: true
        });
      });
    };
    const renderDot = (_, index) => {
      const active = index === activeIndicator.value;
      const style = active ? {
        backgroundColor: props2.indicatorColor
      } : void 0;
      return _createVNode16("i", {
        "style": style,
        "class": bem15("indicator", {
          active
        })
      }, null);
    };
    const renderIndicator = () => {
      if (slots.indicator) {
        return slots.indicator({
          active: activeIndicator.value,
          total: count.value
        });
      }
      if (props2.showIndicators && count.value > 1) {
        return _createVNode16("div", {
          "class": bem15("indicators", {
            vertical: props2.vertical
          })
        }, [Array(count.value).fill("").map(renderDot)]);
      }
    };
    useExpose({
      prev,
      next,
      state,
      resize,
      swipeTo
    });
    linkChildren({
      size,
      props: props2,
      count,
      activeIndicator
    });
    watch11(() => props2.initialSwipe, (value) => initialize(+value));
    watch11(count, () => initialize(state.active));
    watch11(() => props2.autoplay, autoplay);
    watch11([windowWidth, windowHeight, () => props2.width, () => props2.height], resize);
    watch11(usePageVisibility(), (visible) => {
      if (visible === "visible") {
        autoplay();
      } else {
        stopAutoplay();
      }
    });
    onMounted5(initialize);
    onActivated5(() => initialize(state.active));
    onPopupReopen(() => initialize(state.active));
    onDeactivated7(stopAutoplay);
    onBeforeUnmount5(stopAutoplay);
    useEventListener("touchmove", onTouchMove, {
      target: track
    });
    return () => {
      var _a;
      return _createVNode16("div", {
        "ref": root,
        "class": bem15()
      }, [_createVNode16("div", {
        "ref": track,
        "style": trackStyle.value,
        "class": bem15("track", {
          vertical: props2.vertical
        }),
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), renderIndicator()]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/swipe/index.mjs
var Swipe = withInstall(stdin_default18);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tabs/TabsContent.mjs
var [name17, bem16] = createNamespace("tabs");
var stdin_default19 = defineComponent16({
  name: name17,
  props: {
    count: makeRequiredProp(Number),
    inited: Boolean,
    animated: Boolean,
    duration: makeRequiredProp(numericProp),
    swipeable: Boolean,
    lazyRender: Boolean,
    currentIndex: makeRequiredProp(Number)
  },
  emits: ["change"],
  setup(props2, {
    emit,
    slots
  }) {
    const swipeRef = ref19();
    const onChange = (index) => emit("change", index);
    const renderChildren = () => {
      var _a;
      const Content = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (props2.animated || props2.swipeable) {
        return _createVNode17(Swipe, {
          "ref": swipeRef,
          "loop": false,
          "class": bem16("track"),
          "duration": +props2.duration * 1e3,
          "touchable": props2.swipeable,
          "lazyRender": props2.lazyRender,
          "showIndicators": false,
          "onChange": onChange
        }, {
          default: () => [Content]
        });
      }
      return Content;
    };
    const swipeToCurrentTab = (index) => {
      const swipe = swipeRef.value;
      if (swipe && swipe.state.active !== index) {
        swipe.swipeTo(index, {
          immediate: !props2.inited
        });
      }
    };
    watch12(() => props2.currentIndex, swipeToCurrentTab);
    onMounted6(() => {
      swipeToCurrentTab(props2.currentIndex);
    });
    useExpose({
      swipeRef
    });
    return () => _createVNode17("div", {
      "class": bem16("content", {
        animated: props2.animated || props2.swipeable
      })
    }, [renderChildren()]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tabs/Tabs.mjs
var [name18, bem17] = createNamespace("tabs");
var tabsProps = {
  type: makeStringProp("line"),
  color: String,
  border: Boolean,
  sticky: Boolean,
  shrink: Boolean,
  active: makeNumericProp(0),
  duration: makeNumericProp(0.3),
  animated: Boolean,
  ellipsis: truthProp,
  swipeable: Boolean,
  scrollspy: Boolean,
  offsetTop: makeNumericProp(0),
  background: String,
  lazyRender: truthProp,
  showHeader: truthProp,
  lineWidth: numericProp,
  lineHeight: numericProp,
  beforeChange: Function,
  swipeThreshold: makeNumericProp(5),
  titleActiveColor: String,
  titleInactiveColor: String
};
var TABS_KEY = Symbol(name18);
var stdin_default20 = defineComponent17({
  name: name18,
  props: tabsProps,
  emits: ["change", "scroll", "rendered", "clickTab", "update:active"],
  setup(props2, {
    emit,
    slots
  }) {
    let tabHeight;
    let lockScroll;
    let stickyFixed;
    let cancelScrollLeftToRaf;
    let cancelScrollTopToRaf;
    const root = ref20();
    const navRef = ref20();
    const wrapRef = ref20();
    const contentRef = ref20();
    const id = useId();
    const scroller = useScrollParent(root);
    const [titleRefs, setTitleRefs] = useRefs();
    const {
      children,
      linkChildren
    } = useChildren(TABS_KEY);
    const state = reactive5({
      inited: false,
      position: "",
      lineStyle: {},
      currentIndex: -1
    });
    const scrollable = computed12(() => children.length > +props2.swipeThreshold || !props2.ellipsis || props2.shrink);
    const navStyle = computed12(() => ({
      borderColor: props2.color,
      background: props2.background
    }));
    const getTabName = (tab, index) => {
      var _a;
      return (_a = tab.name) != null ? _a : index;
    };
    const currentName = computed12(() => {
      const activeTab = children[state.currentIndex];
      if (activeTab) {
        return getTabName(activeTab, state.currentIndex);
      }
    });
    const offsetTopPx = computed12(() => unitToPx(props2.offsetTop));
    const scrollOffset = computed12(() => {
      if (props2.sticky) {
        return offsetTopPx.value + tabHeight;
      }
      return 0;
    });
    const scrollIntoView = (immediate) => {
      const nav = navRef.value;
      const titles = titleRefs.value;
      if (!scrollable.value || !nav || !titles || !titles[state.currentIndex]) {
        return;
      }
      const title = titles[state.currentIndex].$el;
      const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
      if (cancelScrollLeftToRaf)
        cancelScrollLeftToRaf();
      cancelScrollLeftToRaf = scrollLeftTo(nav, to, immediate ? 0 : +props2.duration);
    };
    const setLine = () => {
      const shouldAnimate = state.inited;
      nextTick7(() => {
        const titles = titleRefs.value;
        if (!titles || !titles[state.currentIndex] || props2.type !== "line" || isHidden(root.value)) {
          return;
        }
        const title = titles[state.currentIndex].$el;
        const {
          lineWidth,
          lineHeight
        } = props2;
        const left2 = title.offsetLeft + title.offsetWidth / 2;
        const lineStyle = {
          width: addUnit(lineWidth),
          backgroundColor: props2.color,
          transform: `translateX(${left2}px) translateX(-50%)`
        };
        if (shouldAnimate) {
          lineStyle.transitionDuration = `${props2.duration}s`;
        }
        if (isDef(lineHeight)) {
          const height2 = addUnit(lineHeight);
          lineStyle.height = height2;
          lineStyle.borderRadius = height2;
        }
        state.lineStyle = lineStyle;
      });
    };
    const findAvailableTab = (index) => {
      const diff = index < state.currentIndex ? -1 : 1;
      while (index >= 0 && index < children.length) {
        if (!children[index].disabled) {
          return index;
        }
        index += diff;
      }
    };
    const setCurrentIndex = (currentIndex, skipScrollIntoView) => {
      const newIndex = findAvailableTab(currentIndex);
      if (!isDef(newIndex)) {
        return;
      }
      const newTab = children[newIndex];
      const newName = getTabName(newTab, newIndex);
      const shouldEmitChange = state.currentIndex !== null;
      if (state.currentIndex !== newIndex) {
        state.currentIndex = newIndex;
        if (!skipScrollIntoView) {
          scrollIntoView();
        }
        setLine();
      }
      if (newName !== props2.active) {
        emit("update:active", newName);
        if (shouldEmitChange) {
          emit("change", newName, newTab.title);
        }
      }
      if (stickyFixed && !props2.scrollspy) {
        setRootScrollTop(Math.ceil(getElementTop(root.value) - offsetTopPx.value));
      }
    };
    const setCurrentIndexByName = (name210, skipScrollIntoView) => {
      const matched = children.find((tab, index2) => getTabName(tab, index2) === name210);
      const index = matched ? children.indexOf(matched) : 0;
      setCurrentIndex(index, skipScrollIntoView);
    };
    const scrollToCurrentContent = (immediate = false) => {
      if (props2.scrollspy) {
        const target = children[state.currentIndex].$el;
        if (target && scroller.value) {
          const to = getElementTop(target, scroller.value) - scrollOffset.value;
          lockScroll = true;
          if (cancelScrollTopToRaf)
            cancelScrollTopToRaf();
          cancelScrollTopToRaf = scrollTopTo(scroller.value, to, immediate ? 0 : +props2.duration, () => {
            lockScroll = false;
          });
        }
      }
    };
    const onClickTab = (item, index, event) => {
      const {
        title,
        disabled
      } = children[index];
      const name210 = getTabName(children[index], index);
      if (!disabled) {
        callInterceptor(props2.beforeChange, {
          args: [name210],
          done: () => {
            setCurrentIndex(index);
            scrollToCurrentContent();
          }
        });
        route(item);
      }
      emit("clickTab", {
        name: name210,
        title,
        event,
        disabled
      });
    };
    const onStickyScroll = (params) => {
      stickyFixed = params.isFixed;
      emit("scroll", params);
    };
    const scrollTo = (name210) => {
      nextTick7(() => {
        setCurrentIndexByName(name210);
        scrollToCurrentContent(true);
      });
    };
    const getCurrentIndexOnScroll = () => {
      for (let index = 0; index < children.length; index++) {
        const {
          top: top2
        } = useRect(children[index].$el);
        if (top2 > scrollOffset.value) {
          return index === 0 ? 0 : index - 1;
        }
      }
      return children.length - 1;
    };
    const onScroll = () => {
      if (props2.scrollspy && !lockScroll) {
        const index = getCurrentIndexOnScroll();
        setCurrentIndex(index);
      }
    };
    const renderLine = () => {
      if (props2.type === "line" && children.length) {
        return _createVNode18("div", {
          "class": bem17("line"),
          "style": state.lineStyle
        }, null);
      }
    };
    const renderHeader = () => {
      var _a, _b, _c;
      const {
        type,
        border,
        sticky
      } = props2;
      const Header = [_createVNode18("div", {
        "ref": sticky ? void 0 : wrapRef,
        "class": [bem17("wrap"), {
          [BORDER_TOP_BOTTOM]: type === "line" && border
        }]
      }, [_createVNode18("div", {
        "ref": navRef,
        "role": "tablist",
        "class": bem17("nav", [type, {
          shrink: props2.shrink,
          complete: scrollable.value
        }]),
        "style": navStyle.value,
        "aria-orientation": "horizontal"
      }, [(_a = slots["nav-left"]) == null ? void 0 : _a.call(slots), children.map((item) => item.renderTitle(onClickTab)), renderLine(), (_b = slots["nav-right"]) == null ? void 0 : _b.call(slots)])]), (_c = slots["nav-bottom"]) == null ? void 0 : _c.call(slots)];
      if (sticky) {
        return _createVNode18("div", {
          "ref": wrapRef
        }, [Header]);
      }
      return Header;
    };
    const resize = () => {
      setLine();
      nextTick7(() => {
        var _a, _b;
        scrollIntoView(true);
        (_b = (_a = contentRef.value) == null ? void 0 : _a.swipeRef.value) == null ? void 0 : _b.resize();
      });
    };
    watch13(() => [props2.color, props2.duration, props2.lineWidth, props2.lineHeight], setLine);
    watch13(windowWidth, resize);
    watch13(() => props2.active, (value) => {
      if (value !== currentName.value) {
        setCurrentIndexByName(value);
      }
    });
    watch13(() => children.length, () => {
      if (state.inited) {
        setCurrentIndexByName(props2.active);
        setLine();
        nextTick7(() => {
          scrollIntoView(true);
        });
      }
    });
    const init = () => {
      setCurrentIndexByName(props2.active, true);
      nextTick7(() => {
        state.inited = true;
        if (wrapRef.value) {
          tabHeight = useRect(wrapRef.value).height;
        }
        scrollIntoView(true);
      });
    };
    const onRendered = (name210, title) => emit("rendered", name210, title);
    useExpose({
      resize,
      scrollTo
    });
    onActivated6(setLine);
    onPopupReopen(setLine);
    onMountedOrActivated(init);
    useVisibilityChange(root, setLine);
    useEventListener("scroll", onScroll, {
      target: scroller,
      passive: true
    });
    linkChildren({
      id,
      props: props2,
      setLine,
      scrollable,
      onRendered,
      currentName,
      setTitleRefs,
      scrollIntoView
    });
    return () => _createVNode18("div", {
      "ref": root,
      "class": bem17([props2.type])
    }, [props2.showHeader ? props2.sticky ? _createVNode18(Sticky, {
      "container": root.value,
      "offsetTop": offsetTopPx.value,
      "onScroll": onStickyScroll
    }, {
      default: () => [renderHeader()]
    }) : renderHeader() : null, _createVNode18(stdin_default19, {
      "ref": contentRef,
      "count": children.length,
      "inited": state.inited,
      "animated": props2.animated,
      "duration": props2.duration,
      "swipeable": props2.swipeable,
      "lazyRender": props2.lazyRender,
      "currentIndex": state.currentIndex,
      "onChange": setCurrentIndex
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
      }
    })]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/composables/use-tab-status.mjs
import { inject as inject5 } from "vue";
var TAB_STATUS_KEY = Symbol();
var useTabStatus = () => inject5(TAB_STATUS_KEY, null);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tab/TabTitle.mjs
import { createVNode as _createVNode19 } from "vue";
import { computed as computed13, defineComponent as defineComponent18 } from "vue";
var [name19, bem18] = createNamespace("tab");
var TabTitle = defineComponent18({
  name: name19,
  props: {
    id: String,
    dot: Boolean,
    type: String,
    color: String,
    title: String,
    badge: numericProp,
    shrink: Boolean,
    isActive: Boolean,
    disabled: Boolean,
    controls: String,
    scrollable: Boolean,
    activeColor: String,
    inactiveColor: String,
    showZeroBadge: truthProp
  },
  setup(props2, {
    slots
  }) {
    const style = computed13(() => {
      const style2 = {};
      const {
        type,
        color,
        disabled,
        isActive,
        activeColor,
        inactiveColor
      } = props2;
      const isCard = type === "card";
      if (color && isCard) {
        style2.borderColor = color;
        if (!disabled) {
          if (isActive) {
            style2.backgroundColor = color;
          } else {
            style2.color = color;
          }
        }
      }
      const titleColor = isActive ? activeColor : inactiveColor;
      if (titleColor) {
        style2.color = titleColor;
      }
      return style2;
    });
    const renderText = () => {
      const Text2 = _createVNode19("span", {
        "class": bem18("text", {
          ellipsis: !props2.scrollable
        })
      }, [slots.title ? slots.title() : props2.title]);
      if (props2.dot || isDef(props2.badge) && props2.badge !== "") {
        return _createVNode19(Badge, {
          "dot": props2.dot,
          "content": props2.badge,
          "showZero": props2.showZeroBadge
        }, {
          default: () => [Text2]
        });
      }
      return Text2;
    };
    return () => _createVNode19("div", {
      "id": props2.id,
      "role": "tab",
      "class": [bem18([props2.type, {
        grow: props2.scrollable && !props2.shrink,
        shrink: props2.shrink,
        active: props2.isActive,
        disabled: props2.disabled
      }])],
      "style": style.value,
      "tabindex": props2.disabled ? void 0 : props2.isActive ? 0 : -1,
      "aria-selected": props2.isActive,
      "aria-disabled": props2.disabled || void 0,
      "aria-controls": props2.controls
    }, [renderText()]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/swipe-item/SwipeItem.mjs
import { createVNode as _createVNode20 } from "vue";
import { computed as computed14, nextTick as nextTick8, reactive as reactive6, onMounted as onMounted7, defineComponent as defineComponent19 } from "vue";
var [name20, bem19] = createNamespace("swipe-item");
var stdin_default21 = defineComponent19({
  name: name20,
  setup(props2, {
    slots
  }) {
    let rendered;
    const state = reactive6({
      offset: 0,
      inited: false,
      mounted: false
    });
    const {
      parent,
      index
    } = useParent(SWIPE_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <SwipeItem> must be a child component of <Swipe>.");
      }
      return;
    }
    const style = computed14(() => {
      const style2 = {};
      const {
        vertical
      } = parent.props;
      if (parent.size.value) {
        style2[vertical ? "height" : "width"] = `${parent.size.value}px`;
      }
      if (state.offset) {
        style2.transform = `translate${vertical ? "Y" : "X"}(${state.offset}px)`;
      }
      return style2;
    });
    const shouldRender = computed14(() => {
      const {
        loop,
        lazyRender
      } = parent.props;
      if (!lazyRender || rendered) {
        return true;
      }
      if (!state.mounted) {
        return false;
      }
      const active = parent.activeIndicator.value;
      const maxActive = parent.count.value - 1;
      const prevActive = active === 0 && loop ? maxActive : active - 1;
      const nextActive = active === maxActive && loop ? 0 : active + 1;
      rendered = index.value === active || index.value === prevActive || index.value === nextActive;
      return rendered;
    });
    const setOffset = (offset2) => {
      state.offset = offset2;
    };
    onMounted7(() => {
      nextTick8(() => {
        state.mounted = true;
      });
    });
    useExpose({
      setOffset
    });
    return () => {
      var _a;
      return _createVNode20("div", {
        "class": bem19(),
        "style": style.value
      }, [shouldRender.value ? (_a = slots.default) == null ? void 0 : _a.call(slots) : null]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/swipe-item/index.mjs
var SwipeItem = withInstall(stdin_default21);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tab/Tab.mjs
var [name21, bem20] = createNamespace("tab");
var tabProps = extend({}, routeProps, {
  dot: Boolean,
  name: numericProp,
  badge: numericProp,
  title: String,
  disabled: Boolean,
  titleClass: unknownProp,
  titleStyle: [String, Object],
  showZeroBadge: truthProp
});
var stdin_default22 = defineComponent20({
  name: name21,
  props: tabProps,
  setup(props2, {
    slots
  }) {
    const id = useId();
    const inited = ref21(false);
    const instance4 = getCurrentInstance7();
    const {
      parent,
      index
    } = useParent(TABS_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <Tab> must be a child component of <Tabs>.");
      }
      return;
    }
    const getName = () => {
      var _a;
      return (_a = props2.name) != null ? _a : index.value;
    };
    const init = () => {
      inited.value = true;
      if (parent.props.lazyRender) {
        nextTick9(() => {
          parent.onRendered(getName(), props2.title);
        });
      }
    };
    const active = computed15(() => {
      const isActive = getName() === parent.currentName.value;
      if (isActive && !inited.value) {
        init();
      }
      return isActive;
    });
    const parsedClass = ref21("");
    const parsedStyle = ref21("");
    watchEffect3(() => {
      const {
        titleClass,
        titleStyle
      } = props2;
      parsedClass.value = titleClass ? normalizeClass(titleClass) : "";
      parsedStyle.value = titleStyle && typeof titleStyle !== "string" ? stringifyStyle(normalizeStyle(titleStyle)) : titleStyle;
    });
    const renderTitle = (onClickTab) => _createVNode21(TabTitle, _mergeProps5({
      "key": id,
      "id": `${parent.id}-${index.value}`,
      "ref": parent.setTitleRefs(index.value),
      "style": parsedStyle.value,
      "class": parsedClass.value,
      "isActive": active.value,
      "controls": id,
      "scrollable": parent.scrollable.value,
      "activeColor": parent.props.titleActiveColor,
      "inactiveColor": parent.props.titleInactiveColor,
      "onClick": (event) => onClickTab(instance4.proxy, index.value, event)
    }, pick(parent.props, ["type", "color", "shrink"]), pick(props2, ["dot", "badge", "title", "disabled", "showZeroBadge"])), {
      title: slots.title
    });
    const hasInactiveClass = ref21(!active.value);
    watch14(active, (val) => {
      if (val) {
        hasInactiveClass.value = false;
      } else {
        doubleRaf(() => {
          hasInactiveClass.value = true;
        });
      }
    });
    watch14(() => props2.title, () => {
      parent.setLine();
      parent.scrollIntoView();
    });
    provide4(TAB_STATUS_KEY, active);
    useExpose({
      id,
      renderTitle
    });
    return () => {
      var _a;
      const label = `${parent.id}-${index.value}`;
      const {
        animated,
        swipeable,
        scrollspy,
        lazyRender
      } = parent.props;
      if (!slots.default && !animated) {
        return;
      }
      const show = scrollspy || active.value;
      if (animated || swipeable) {
        return _createVNode21(SwipeItem, {
          "id": id,
          "role": "tabpanel",
          "class": bem20("panel-wrapper", {
            inactive: hasInactiveClass.value
          }),
          "tabindex": active.value ? 0 : -1,
          "aria-hidden": !active.value,
          "aria-labelledby": label
        }, {
          default: () => {
            var _a2;
            return [_createVNode21("div", {
              "class": bem20("panel")
            }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])];
          }
        });
      }
      const shouldRender = inited.value || scrollspy || !lazyRender;
      const Content = shouldRender ? (_a = slots.default) == null ? void 0 : _a.call(slots) : null;
      return _withDirectives3(_createVNode21("div", {
        "id": id,
        "role": "tabpanel",
        "class": bem20("panel"),
        "tabindex": show ? 0 : -1,
        "aria-labelledby": label
      }, [Content]), [[_vShow3, show]]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tab/index.mjs
var Tab = withInstall(stdin_default22);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tabs/index.mjs
var Tabs = withInstall(stdin_default20);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/picker-group/PickerGroup.mjs
var [name22, bem21] = createNamespace("picker-group");
var PICKER_GROUP_KEY = Symbol(name22);
var pickerGroupProps = extend({
  tabs: makeArrayProp(),
  activeTab: makeNumericProp(0),
  nextStepText: String,
  showToolbar: truthProp
}, pickerToolbarProps);
var stdin_default23 = defineComponent21({
  name: name22,
  props: pickerGroupProps,
  emits: ["confirm", "cancel", "update:activeTab"],
  setup(props2, {
    emit,
    slots
  }) {
    const activeTab = useSyncPropRef(() => props2.activeTab, (value) => emit("update:activeTab", value));
    const {
      children,
      linkChildren
    } = useChildren(PICKER_GROUP_KEY);
    linkChildren();
    const showNextButton = () => +activeTab.value < props2.tabs.length - 1 && props2.nextStepText;
    const onConfirm = () => {
      if (showNextButton()) {
        activeTab.value = +activeTab.value + 1;
      } else {
        emit("confirm", children.map((item) => item.confirm()));
      }
    };
    const onCancel = () => emit("cancel");
    return () => {
      var _a, _b;
      let childNodes = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b.filter((node) => node.type !== Comment).map((node) => {
        if (node.type === Fragment) {
          return node.children;
        }
        return node;
      });
      if (childNodes) {
        childNodes = flat(childNodes);
      }
      const confirmButtonText = showNextButton() ? props2.nextStepText : props2.confirmButtonText;
      return _createVNode22("div", {
        "class": bem21()
      }, [props2.showToolbar ? _createVNode22(stdin_default16, {
        "title": props2.title,
        "cancelButtonText": props2.cancelButtonText,
        "confirmButtonText": confirmButtonText,
        "onConfirm": onConfirm,
        "onCancel": onCancel
      }, pick(slots, pickerToolbarSlots)) : null, _createVNode22(Tabs, {
        "active": activeTab.value,
        "onUpdate:active": ($event) => activeTab.value = $event,
        "class": bem21("tabs"),
        "shrink": true,
        "animated": true,
        "lazyRender": false
      }, {
        default: () => [props2.tabs.map((title, index) => _createVNode22(Tab, {
          "title": title,
          "titleClass": bem21("tab-title")
        }, {
          default: () => [childNodes == null ? void 0 : childNodes[index]]
        }))]
      })]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/picker/Picker.mjs
var pickerSharedProps = extend({
  loading: Boolean,
  readonly: Boolean,
  allowHtml: Boolean,
  optionHeight: makeNumericProp(44),
  showToolbar: truthProp,
  swipeDuration: makeNumericProp(1e3),
  visibleOptionNum: makeNumericProp(6)
}, pickerToolbarProps);
var pickerProps = extend({}, pickerSharedProps, {
  columns: makeArrayProp(),
  modelValue: makeArrayProp(),
  toolbarPosition: makeStringProp("top"),
  columnsFieldNames: Object
});
var stdin_default24 = defineComponent22({
  name: name12,
  props: pickerProps,
  emits: ["confirm", "cancel", "change", "scrollInto", "clickOption", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const columnsRef = ref22();
    const selectedValues = ref22(props2.modelValue.slice(0));
    const {
      parent
    } = useParent(PICKER_GROUP_KEY);
    const {
      children,
      linkChildren
    } = useChildren(PICKER_KEY);
    linkChildren();
    const fields = computed16(() => assignDefaultFields(props2.columnsFieldNames));
    const optionHeight = computed16(() => unitToPx(props2.optionHeight));
    const columnsType = computed16(() => getColumnsType(props2.columns, fields.value));
    const currentColumns = computed16(() => {
      const {
        columns
      } = props2;
      switch (columnsType.value) {
        case "multiple":
          return columns;
        case "cascade":
          return formatCascadeColumns(columns, fields.value, selectedValues);
        default:
          return [columns];
      }
    });
    const hasOptions = computed16(() => currentColumns.value.some((options) => options.length));
    const selectedOptions = computed16(() => currentColumns.value.map((options, index) => findOptionByValue(options, selectedValues.value[index], fields.value)));
    const selectedIndexes = computed16(() => currentColumns.value.map((options, index) => options.findIndex((option) => option[fields.value.value] === selectedValues.value[index])));
    const setValue = (index, value) => {
      if (selectedValues.value[index] !== value) {
        const newValues = selectedValues.value.slice(0);
        newValues[index] = value;
        selectedValues.value = newValues;
      }
    };
    const getEventParams = () => ({
      selectedValues: selectedValues.value.slice(0),
      selectedOptions: selectedOptions.value,
      selectedIndexes: selectedIndexes.value
    });
    const onChange = (value, columnIndex) => {
      setValue(columnIndex, value);
      if (columnsType.value === "cascade") {
        selectedValues.value.forEach((value2, index) => {
          const options = currentColumns.value[index];
          if (!isOptionExist(options, value2, fields.value)) {
            setValue(index, options.length ? options[0][fields.value.value] : void 0);
          }
        });
      }
      nextTick10(() => {
        emit("change", extend({
          columnIndex
        }, getEventParams()));
      });
    };
    const onClickOption = (currentOption, columnIndex) => {
      const params = {
        columnIndex,
        currentOption
      };
      emit("clickOption", extend(getEventParams(), params));
      emit("scrollInto", params);
    };
    const confirm = () => {
      children.forEach((child) => child.stopMomentum());
      const params = getEventParams();
      nextTick10(() => {
        emit("confirm", params);
      });
      return params;
    };
    const cancel = () => emit("cancel", getEventParams());
    const renderColumnItems = () => currentColumns.value.map((options, columnIndex) => _createVNode23(stdin_default15, {
      "value": selectedValues.value[columnIndex],
      "fields": fields.value,
      "options": options,
      "readonly": props2.readonly,
      "allowHtml": props2.allowHtml,
      "optionHeight": optionHeight.value,
      "swipeDuration": props2.swipeDuration,
      "visibleOptionNum": props2.visibleOptionNum,
      "onChange": (value) => onChange(value, columnIndex),
      "onClickOption": (option) => onClickOption(option, columnIndex),
      "onScrollInto": (option) => {
        emit("scrollInto", {
          currentOption: option,
          columnIndex
        });
      }
    }, {
      option: slots.option
    }));
    const renderMask = (wrapHeight) => {
      if (hasOptions.value) {
        const frameStyle = {
          height: `${optionHeight.value}px`
        };
        const maskStyle = {
          backgroundSize: `100% ${(wrapHeight - optionHeight.value) / 2}px`
        };
        return [_createVNode23("div", {
          "class": bem12("mask"),
          "style": maskStyle
        }, null), _createVNode23("div", {
          "class": [BORDER_UNSET_TOP_BOTTOM, bem12("frame")],
          "style": frameStyle
        }, null)];
      }
    };
    const renderColumns = () => {
      const wrapHeight = optionHeight.value * +props2.visibleOptionNum;
      const columnsStyle = {
        height: `${wrapHeight}px`
      };
      return _createVNode23("div", {
        "ref": columnsRef,
        "class": bem12("columns"),
        "style": columnsStyle
      }, [renderColumnItems(), renderMask(wrapHeight)]);
    };
    const renderToolbar = () => {
      if (props2.showToolbar && !parent) {
        return _createVNode23(stdin_default16, _mergeProps6(pick(props2, pickerToolbarPropKeys), {
          "onConfirm": confirm,
          "onCancel": cancel
        }), pick(slots, pickerToolbarSlots));
      }
    };
    watch15(currentColumns, (columns) => {
      columns.forEach((options, index) => {
        if (options.length && !isOptionExist(options, selectedValues.value[index], fields.value)) {
          setValue(index, getFirstEnabledOption(options)[fields.value.value]);
        }
      });
    }, {
      immediate: true
    });
    let lastEmittedModelValue;
    watch15(() => props2.modelValue, (newValues) => {
      if (!isSameValue(newValues, selectedValues.value) && !isSameValue(newValues, lastEmittedModelValue)) {
        selectedValues.value = newValues.slice(0);
        lastEmittedModelValue = newValues.slice(0);
      }
    }, {
      deep: true
    });
    watch15(selectedValues, (newValues) => {
      if (!isSameValue(newValues, props2.modelValue)) {
        lastEmittedModelValue = newValues.slice(0);
        emit("update:modelValue", lastEmittedModelValue);
      }
    }, {
      immediate: true
    });
    useEventListener("touchmove", preventDefault, {
      target: columnsRef
    });
    const getSelectedOptions = () => selectedOptions.value;
    useExpose({
      confirm,
      getSelectedOptions
    });
    return () => {
      var _a, _b;
      return _createVNode23("div", {
        "class": bem12()
      }, [props2.toolbarPosition === "top" ? renderToolbar() : null, props2.loading ? _createVNode23(Loading, {
        "class": bem12("loading")
      }, null) : null, (_a = slots["columns-top"]) == null ? void 0 : _a.call(slots), renderColumns(), (_b = slots["columns-bottom"]) == null ? void 0 : _b.call(slots), props2.toolbarPosition === "bottom" ? renderToolbar() : null]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/area/utils.mjs
var AREA_EMPTY_CODE = "000000";
var INHERIT_SLOTS = [
  "title",
  "cancel",
  "confirm",
  "toolbar",
  "columns-top",
  "columns-bottom"
];
var INHERIT_PROPS = [
  "title",
  "loading",
  "readonly",
  "optionHeight",
  "swipeDuration",
  "visibleOptionNum",
  "cancelButtonText",
  "confirmButtonText"
];
var makeOption = (text = "", value = AREA_EMPTY_CODE, children = void 0) => ({
  text,
  value,
  children
});
function formatDataForCascade({
  areaList,
  columnsNum,
  columnsPlaceholder: placeholder
}) {
  const {
    city_list: city = {},
    county_list: county = {},
    province_list: province = {}
  } = areaList;
  const showCity = +columnsNum > 1;
  const showCounty = +columnsNum > 2;
  const getProvinceChildren = () => {
    if (showCity) {
      return placeholder.length > 1 ? [
        makeOption(
          placeholder[1],
          AREA_EMPTY_CODE,
          showCounty ? [] : void 0
        )
      ] : [];
    }
  };
  const provinceMap = /* @__PURE__ */ new Map();
  Object.keys(province).forEach((code) => {
    provinceMap.set(
      code.slice(0, 2),
      makeOption(province[code], code, getProvinceChildren())
    );
  });
  const cityMap = /* @__PURE__ */ new Map();
  if (showCity) {
    const getCityChildren = () => {
      if (showCounty) {
        return placeholder.length > 2 ? [makeOption(placeholder[2])] : [];
      }
    };
    Object.keys(city).forEach((code) => {
      const option = makeOption(city[code], code, getCityChildren());
      cityMap.set(code.slice(0, 4), option);
      const province2 = provinceMap.get(code.slice(0, 2));
      if (province2) {
        province2.children.push(option);
      }
    });
  }
  if (showCounty) {
    Object.keys(county).forEach((code) => {
      const city2 = cityMap.get(code.slice(0, 4));
      if (city2) {
        city2.children.push(makeOption(county[code], code));
      }
    });
  }
  const options = Array.from(provinceMap.values());
  if (placeholder.length) {
    const county2 = showCounty ? [makeOption(placeholder[2])] : void 0;
    const city2 = showCity ? [makeOption(placeholder[1], AREA_EMPTY_CODE, county2)] : void 0;
    options.unshift(makeOption(placeholder[0], AREA_EMPTY_CODE, city2));
  }
  return options;
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/picker/index.mjs
var Picker = withInstall(stdin_default24);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/area/Area.mjs
var [name23, bem22] = createNamespace("area");
var areaProps = extend({}, pick(pickerSharedProps, INHERIT_PROPS), {
  modelValue: String,
  columnsNum: makeNumericProp(3),
  columnsPlaceholder: makeArrayProp(),
  areaList: {
    type: Object,
    default: () => ({})
  }
});
var stdin_default25 = defineComponent23({
  name: name23,
  props: areaProps,
  emits: ["change", "confirm", "cancel", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const codes = ref23([]);
    const picker = ref23();
    const columns = computed17(() => formatDataForCascade(props2));
    const onChange = (...args) => emit("change", ...args);
    const onCancel = (...args) => emit("cancel", ...args);
    const onConfirm = (...args) => emit("confirm", ...args);
    watch16(codes, (newCodes) => {
      const lastCode = newCodes.length ? newCodes[newCodes.length - 1] : "";
      if (lastCode && lastCode !== props2.modelValue) {
        emit("update:modelValue", lastCode);
      }
    }, {
      deep: true
    });
    watch16(() => props2.modelValue, (newCode) => {
      if (newCode) {
        const lastCode = codes.value.length ? codes.value[codes.value.length - 1] : "";
        if (newCode !== lastCode) {
          codes.value = [`${newCode.slice(0, 2)}0000`, `${newCode.slice(0, 4)}00`, newCode].slice(0, +props2.columnsNum);
        }
      } else {
        codes.value = [];
      }
    }, {
      immediate: true
    });
    useExpose({
      confirm: () => {
        var _a;
        return (_a = picker.value) == null ? void 0 : _a.confirm();
      },
      getSelectedOptions: () => {
        var _a;
        return ((_a = picker.value) == null ? void 0 : _a.getSelectedOptions()) || [];
      }
    });
    return () => _createVNode24(Picker, _mergeProps7({
      "ref": picker,
      "modelValue": codes.value,
      "onUpdate:modelValue": ($event) => codes.value = $event,
      "class": bem22(),
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props2, INHERIT_PROPS)), pick(slots, INHERIT_SLOTS));
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/area/index.mjs
var Area = withInstall(stdin_default25);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/cell/Cell.mjs
import { createVNode as _createVNode25 } from "vue";
import { defineComponent as defineComponent24 } from "vue";
var [name24, bem23] = createNamespace("cell");
var cellSharedProps = {
  tag: makeStringProp("div"),
  icon: String,
  size: String,
  title: numericProp,
  value: numericProp,
  label: numericProp,
  center: Boolean,
  isLink: Boolean,
  border: truthProp,
  iconPrefix: String,
  valueClass: unknownProp,
  labelClass: unknownProp,
  titleClass: unknownProp,
  titleStyle: null,
  arrowDirection: String,
  required: {
    type: [Boolean, String],
    default: null
  },
  clickable: {
    type: Boolean,
    default: null
  }
};
var cellProps = extend({}, cellSharedProps, routeProps);
var stdin_default26 = defineComponent24({
  name: name24,
  props: cellProps,
  setup(props2, {
    slots
  }) {
    const route2 = useRoute();
    const renderLabel = () => {
      const showLabel = slots.label || isDef(props2.label);
      if (showLabel) {
        return _createVNode25("div", {
          "class": [bem23("label"), props2.labelClass]
        }, [slots.label ? slots.label() : props2.label]);
      }
    };
    const renderTitle = () => {
      var _a;
      if (slots.title || isDef(props2.title)) {
        const titleSlot = (_a = slots.title) == null ? void 0 : _a.call(slots);
        if (Array.isArray(titleSlot) && titleSlot.length === 0) {
          return;
        }
        return _createVNode25("div", {
          "class": [bem23("title"), props2.titleClass],
          "style": props2.titleStyle
        }, [titleSlot || _createVNode25("span", null, [props2.title]), renderLabel()]);
      }
    };
    const renderValue = () => {
      const slot = slots.value || slots.default;
      const hasValue = slot || isDef(props2.value);
      if (hasValue) {
        return _createVNode25("div", {
          "class": [bem23("value"), props2.valueClass]
        }, [slot ? slot() : _createVNode25("span", null, [props2.value])]);
      }
    };
    const renderLeftIcon = () => {
      if (slots.icon) {
        return slots.icon();
      }
      if (props2.icon) {
        return _createVNode25(Icon, {
          "name": props2.icon,
          "class": bem23("left-icon"),
          "classPrefix": props2.iconPrefix
        }, null);
      }
    };
    const renderRightIcon = () => {
      if (slots["right-icon"]) {
        return slots["right-icon"]();
      }
      if (props2.isLink) {
        const name210 = props2.arrowDirection && props2.arrowDirection !== "right" ? `arrow-${props2.arrowDirection}` : "arrow";
        return _createVNode25(Icon, {
          "name": name210,
          "class": bem23("right-icon")
        }, null);
      }
    };
    return () => {
      var _a;
      const {
        tag,
        size,
        center,
        border,
        isLink,
        required
      } = props2;
      const clickable = (_a = props2.clickable) != null ? _a : isLink;
      const classes = {
        center,
        required: !!required,
        clickable,
        borderless: !border
      };
      if (size) {
        classes[size] = !!size;
      }
      return _createVNode25(tag, {
        "class": bem23(classes),
        "role": clickable ? "button" : void 0,
        "tabindex": clickable ? 0 : void 0,
        "onClick": route2
      }, {
        default: () => {
          var _a2;
          return [renderLeftIcon(), renderTitle(), renderValue(), renderRightIcon(), (_a2 = slots.extra) == null ? void 0 : _a2.call(slots)];
        }
      });
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/cell/index.mjs
var Cell = withInstall(stdin_default26);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/form/Form.mjs
import { createVNode as _createVNode26 } from "vue";
import { defineComponent as defineComponent25 } from "vue";
var [name25, bem24] = createNamespace("form");
var formProps = {
  colon: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  required: [Boolean, String],
  showError: Boolean,
  labelWidth: numericProp,
  labelAlign: String,
  inputAlign: String,
  scrollToError: Boolean,
  scrollToErrorPosition: String,
  validateFirst: Boolean,
  submitOnEnter: truthProp,
  showErrorMessage: truthProp,
  errorMessageAlign: String,
  validateTrigger: {
    type: [String, Array],
    default: "onBlur"
  }
};
var stdin_default27 = defineComponent25({
  name: name25,
  props: formProps,
  emits: ["submit", "failed"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      children,
      linkChildren
    } = useChildren(FORM_KEY);
    const getFieldsByNames = (names) => {
      if (names) {
        return children.filter((field) => names.includes(field.name));
      }
      return children;
    };
    const validateSeq = (names) => new Promise((resolve, reject) => {
      const errors = [];
      const fields = getFieldsByNames(names);
      fields.reduce((promise, field) => promise.then(() => {
        if (!errors.length) {
          return field.validate().then((error) => {
            if (error) {
              errors.push(error);
            }
          });
        }
      }), Promise.resolve()).then(() => {
        if (errors.length) {
          reject(errors);
        } else {
          resolve();
        }
      });
    });
    const validateAll = (names) => new Promise((resolve, reject) => {
      const fields = getFieldsByNames(names);
      Promise.all(fields.map((item) => item.validate())).then((errors) => {
        errors = errors.filter(Boolean);
        if (errors.length) {
          reject(errors);
        } else {
          resolve();
        }
      });
    });
    const validateField = (name210) => {
      const matched = children.find((item) => item.name === name210);
      if (matched) {
        return new Promise((resolve, reject) => {
          matched.validate().then((error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }
      return Promise.reject();
    };
    const validate = (name210) => {
      if (typeof name210 === "string") {
        return validateField(name210);
      }
      return props2.validateFirst ? validateSeq(name210) : validateAll(name210);
    };
    const resetValidation = (name210) => {
      if (typeof name210 === "string") {
        name210 = [name210];
      }
      const fields = getFieldsByNames(name210);
      fields.forEach((item) => {
        item.resetValidation();
      });
    };
    const getValidationStatus = () => children.reduce((form, field) => {
      form[field.name] = field.getValidationStatus();
      return form;
    }, {});
    const scrollToField = (name210, options) => {
      children.some((item) => {
        if (item.name === name210) {
          item.$el.scrollIntoView(options);
          return true;
        }
        return false;
      });
    };
    const getValues = () => children.reduce((form, field) => {
      if (field.name !== void 0) {
        form[field.name] = field.formValue.value;
      }
      return form;
    }, {});
    const submit = () => {
      const values = getValues();
      validate().then(() => emit("submit", values)).catch((errors) => {
        emit("failed", {
          values,
          errors
        });
        const {
          scrollToError,
          scrollToErrorPosition
        } = props2;
        if (scrollToError && errors[0].name) {
          scrollToField(errors[0].name, scrollToErrorPosition ? {
            block: scrollToErrorPosition
          } : void 0);
        }
      });
    };
    const onSubmit = (event) => {
      preventDefault(event);
      submit();
    };
    linkChildren({
      props: props2
    });
    useExpose({
      submit,
      validate,
      getValues,
      scrollToField,
      resetValidation,
      getValidationStatus
    });
    return () => {
      var _a;
      return _createVNode26("form", {
        "class": bem24(),
        "onSubmit": onSubmit
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/form/index.mjs
var Form = withInstall(stdin_default27);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/field/Field.mjs
import { createTextVNode as _createTextVNode, mergeProps as _mergeProps8, createVNode as _createVNode27 } from "vue";
import { ref as ref24, watch as watch17, provide as provide5, computed as computed18, nextTick as nextTick11, reactive as reactive7, onMounted as onMounted8, defineComponent as defineComponent26 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/field/utils.mjs
function isEmptyValue(value) {
  if (Array.isArray(value)) {
    return !value.length;
  }
  if (value === 0) {
    return false;
  }
  return !value;
}
function runSyncRule(value, rule) {
  if (isEmptyValue(value)) {
    if (rule.required) {
      return false;
    }
    if (rule.validateEmpty === false) {
      return true;
    }
  }
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return false;
  }
  return true;
}
function runRuleValidator(value, rule) {
  return new Promise((resolve) => {
    const returnVal = rule.validator(value, rule);
    if (isPromise(returnVal)) {
      returnVal.then(resolve);
      return;
    }
    resolve(returnVal);
  });
}
function getRuleMessage(value, rule) {
  const { message } = rule;
  if (isFunction(message)) {
    return message(value, rule);
  }
  return message || "";
}
function startComposing({ target }) {
  target.composing = true;
}
function endComposing({ target }) {
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
function resizeTextarea(input, autosize) {
  const scrollTop = getRootScrollTop();
  input.style.height = "auto";
  let height2 = input.scrollHeight;
  if (isObject(autosize)) {
    const { maxHeight, minHeight } = autosize;
    if (maxHeight !== void 0) {
      height2 = Math.min(height2, maxHeight);
    }
    if (minHeight !== void 0) {
      height2 = Math.max(height2, minHeight);
    }
  }
  if (height2) {
    input.style.height = `${height2}px`;
    setRootScrollTop(scrollTop);
  }
}
function mapInputType(type) {
  if (type === "number") {
    return {
      type: "text",
      inputmode: "decimal"
    };
  }
  if (type === "digit") {
    return {
      type: "tel",
      inputmode: "numeric"
    };
  }
  return { type };
}
function getStringLength(str) {
  return [...str].length;
}
function cutString(str, maxlength) {
  return [...str].slice(0, maxlength).join("");
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/field/Field.mjs
var [name26, bem25] = createNamespace("field");
var fieldSharedProps = {
  id: String,
  name: String,
  leftIcon: String,
  rightIcon: String,
  autofocus: Boolean,
  clearable: Boolean,
  maxlength: numericProp,
  formatter: Function,
  clearIcon: makeStringProp("clear"),
  modelValue: makeNumericProp(""),
  inputAlign: String,
  placeholder: String,
  autocomplete: String,
  autocapitalize: String,
  autocorrect: String,
  errorMessage: String,
  enterkeyhint: String,
  clearTrigger: makeStringProp("focus"),
  formatTrigger: makeStringProp("onChange"),
  spellcheck: {
    type: Boolean,
    default: null
  },
  error: {
    type: Boolean,
    default: null
  },
  disabled: {
    type: Boolean,
    default: null
  },
  readonly: {
    type: Boolean,
    default: null
  }
};
var fieldProps = extend({}, cellSharedProps, fieldSharedProps, {
  rows: numericProp,
  type: makeStringProp("text"),
  rules: Array,
  autosize: [Boolean, Object],
  labelWidth: numericProp,
  labelClass: unknownProp,
  labelAlign: String,
  showWordLimit: Boolean,
  errorMessageAlign: String,
  colon: {
    type: Boolean,
    default: null
  }
});
var stdin_default28 = defineComponent26({
  name: name26,
  props: fieldProps,
  emits: ["blur", "focus", "clear", "keypress", "clickInput", "endValidate", "startValidate", "clickLeftIcon", "clickRightIcon", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const id = useId();
    const state = reactive7({
      status: "unvalidated",
      focused: false,
      validateMessage: ""
    });
    const inputRef = ref24();
    const clearIconRef = ref24();
    const customValue = ref24();
    const {
      parent: form
    } = useParent(FORM_KEY);
    const getModelValue = () => {
      var _a;
      return String((_a = props2.modelValue) != null ? _a : "");
    };
    const getProp = (key) => {
      if (isDef(props2[key])) {
        return props2[key];
      }
      if (form && isDef(form.props[key])) {
        return form.props[key];
      }
    };
    const showClear = computed18(() => {
      const readonly = getProp("readonly");
      if (props2.clearable && !readonly) {
        const hasValue = getModelValue() !== "";
        const trigger = props2.clearTrigger === "always" || props2.clearTrigger === "focus" && state.focused;
        return hasValue && trigger;
      }
      return false;
    });
    const formValue = computed18(() => {
      if (customValue.value && slots.input) {
        return customValue.value();
      }
      return props2.modelValue;
    });
    const showRequiredMark = computed18(() => {
      var _a;
      const required = getProp("required");
      if (required === "auto") {
        return (_a = props2.rules) == null ? void 0 : _a.some((rule) => rule.required);
      }
      return required;
    });
    const runRules = (rules) => rules.reduce((promise, rule) => promise.then(() => {
      if (state.status === "failed") {
        return;
      }
      let {
        value
      } = formValue;
      if (rule.formatter) {
        value = rule.formatter(value, rule);
      }
      if (!runSyncRule(value, rule)) {
        state.status = "failed";
        state.validateMessage = getRuleMessage(value, rule);
        return;
      }
      if (rule.validator) {
        if (isEmptyValue(value) && rule.validateEmpty === false) {
          return;
        }
        return runRuleValidator(value, rule).then((result) => {
          if (result && typeof result === "string") {
            state.status = "failed";
            state.validateMessage = result;
          } else if (result === false) {
            state.status = "failed";
            state.validateMessage = getRuleMessage(value, rule);
          }
        });
      }
    }), Promise.resolve());
    const resetValidation = () => {
      state.status = "unvalidated";
      state.validateMessage = "";
    };
    const endValidate = () => emit("endValidate", {
      status: state.status,
      message: state.validateMessage
    });
    const validate = (rules = props2.rules) => new Promise((resolve) => {
      resetValidation();
      if (rules) {
        emit("startValidate");
        runRules(rules).then(() => {
          if (state.status === "failed") {
            resolve({
              name: props2.name,
              message: state.validateMessage
            });
            endValidate();
          } else {
            state.status = "passed";
            resolve();
            endValidate();
          }
        });
      } else {
        resolve();
      }
    });
    const validateWithTrigger = (trigger) => {
      if (form && props2.rules) {
        const {
          validateTrigger
        } = form.props;
        const defaultTrigger = toArray(validateTrigger).includes(trigger);
        const rules = props2.rules.filter((rule) => {
          if (rule.trigger) {
            return toArray(rule.trigger).includes(trigger);
          }
          return defaultTrigger;
        });
        if (rules.length) {
          validate(rules);
        }
      }
    };
    const limitValueLength = (value) => {
      var _a;
      const {
        maxlength
      } = props2;
      if (isDef(maxlength) && getStringLength(value) > +maxlength) {
        const modelValue = getModelValue();
        if (modelValue && getStringLength(modelValue) === +maxlength) {
          return modelValue;
        }
        const selectionEnd = (_a = inputRef.value) == null ? void 0 : _a.selectionEnd;
        if (state.focused && selectionEnd) {
          const valueArr = [...value];
          const exceededLength = valueArr.length - +maxlength;
          valueArr.splice(selectionEnd - exceededLength, exceededLength);
          return valueArr.join("");
        }
        return cutString(value, +maxlength);
      }
      return value;
    };
    const updateValue = (value, trigger = "onChange") => {
      const originalValue = value;
      value = limitValueLength(value);
      const limitDiffLen = getStringLength(originalValue) - getStringLength(value);
      if (props2.type === "number" || props2.type === "digit") {
        const isNumber = props2.type === "number";
        value = formatNumber(value, isNumber, isNumber);
      }
      let formatterDiffLen = 0;
      if (props2.formatter && trigger === props2.formatTrigger) {
        const {
          formatter,
          maxlength
        } = props2;
        value = formatter(value);
        if (isDef(maxlength) && getStringLength(value) > +maxlength) {
          value = cutString(value, +maxlength);
        }
        if (inputRef.value && state.focused) {
          const {
            selectionEnd
          } = inputRef.value;
          const bcoVal = cutString(originalValue, selectionEnd);
          formatterDiffLen = getStringLength(formatter(bcoVal)) - getStringLength(bcoVal);
        }
      }
      if (inputRef.value && inputRef.value.value !== value) {
        if (state.focused) {
          let {
            selectionStart,
            selectionEnd
          } = inputRef.value;
          inputRef.value.value = value;
          if (isDef(selectionStart) && isDef(selectionEnd)) {
            const valueLen = getStringLength(value);
            if (limitDiffLen) {
              selectionStart -= limitDiffLen;
              selectionEnd -= limitDiffLen;
            } else if (formatterDiffLen) {
              selectionStart += formatterDiffLen;
              selectionEnd += formatterDiffLen;
            }
            inputRef.value.setSelectionRange(Math.min(selectionStart, valueLen), Math.min(selectionEnd, valueLen));
          }
        } else {
          inputRef.value.value = value;
        }
      }
      if (value !== props2.modelValue) {
        emit("update:modelValue", value);
      }
    };
    const onInput = (event) => {
      if (!event.target.composing) {
        updateValue(event.target.value);
      }
    };
    const blur = () => {
      var _a;
      return (_a = inputRef.value) == null ? void 0 : _a.blur();
    };
    const focus = () => {
      var _a;
      return (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const adjustTextareaSize = () => {
      const input = inputRef.value;
      if (props2.type === "textarea" && props2.autosize && input) {
        resizeTextarea(input, props2.autosize);
      }
    };
    const onFocus = (event) => {
      state.focused = true;
      emit("focus", event);
      nextTick11(adjustTextareaSize);
      if (getProp("readonly")) {
        blur();
      }
    };
    const onBlur = (event) => {
      state.focused = false;
      updateValue(getModelValue(), "onBlur");
      emit("blur", event);
      if (getProp("readonly")) {
        return;
      }
      validateWithTrigger("onBlur");
      nextTick11(adjustTextareaSize);
      resetScroll();
    };
    const onClickInput = (event) => emit("clickInput", event);
    const onClickLeftIcon = (event) => emit("clickLeftIcon", event);
    const onClickRightIcon = (event) => emit("clickRightIcon", event);
    const onClear = (event) => {
      preventDefault(event);
      emit("update:modelValue", "");
      emit("clear", event);
    };
    const showError = computed18(() => {
      if (typeof props2.error === "boolean") {
        return props2.error;
      }
      if (form && form.props.showError && state.status === "failed") {
        return true;
      }
    });
    const labelStyle = computed18(() => {
      const labelWidth = getProp("labelWidth");
      const labelAlign = getProp("labelAlign");
      if (labelWidth && labelAlign !== "top") {
        return {
          width: addUnit(labelWidth)
        };
      }
    });
    const onKeypress = (event) => {
      const ENTER_CODE = 13;
      if (event.keyCode === ENTER_CODE) {
        const submitOnEnter = form && form.props.submitOnEnter;
        if (!submitOnEnter && props2.type !== "textarea") {
          preventDefault(event);
        }
        if (props2.type === "search") {
          blur();
        }
      }
      emit("keypress", event);
    };
    const getInputId = () => props2.id || `${id}-input`;
    const getValidationStatus = () => state.status;
    const renderInput = () => {
      const controlClass = bem25("control", [getProp("inputAlign"), {
        error: showError.value,
        custom: !!slots.input,
        "min-height": props2.type === "textarea" && !props2.autosize
      }]);
      if (slots.input) {
        return _createVNode27("div", {
          "class": controlClass,
          "onClick": onClickInput
        }, [slots.input()]);
      }
      const inputAttrs = {
        id: getInputId(),
        ref: inputRef,
        name: props2.name,
        rows: props2.rows !== void 0 ? +props2.rows : void 0,
        class: controlClass,
        disabled: getProp("disabled"),
        readonly: getProp("readonly"),
        autofocus: props2.autofocus,
        placeholder: props2.placeholder,
        autocomplete: props2.autocomplete,
        autocapitalize: props2.autocapitalize,
        autocorrect: props2.autocorrect,
        enterkeyhint: props2.enterkeyhint,
        spellcheck: props2.spellcheck,
        "aria-labelledby": props2.label ? `${id}-label` : void 0,
        onBlur,
        onFocus,
        onInput,
        onClick: onClickInput,
        onChange: endComposing,
        onKeypress,
        onCompositionend: endComposing,
        onCompositionstart: startComposing
      };
      if (props2.type === "textarea") {
        return _createVNode27("textarea", inputAttrs, null);
      }
      return _createVNode27("input", _mergeProps8(mapInputType(props2.type), inputAttrs), null);
    };
    const renderLeftIcon = () => {
      const leftIconSlot = slots["left-icon"];
      if (props2.leftIcon || leftIconSlot) {
        return _createVNode27("div", {
          "class": bem25("left-icon"),
          "onClick": onClickLeftIcon
        }, [leftIconSlot ? leftIconSlot() : _createVNode27(Icon, {
          "name": props2.leftIcon,
          "classPrefix": props2.iconPrefix
        }, null)]);
      }
    };
    const renderRightIcon = () => {
      const rightIconSlot = slots["right-icon"];
      if (props2.rightIcon || rightIconSlot) {
        return _createVNode27("div", {
          "class": bem25("right-icon"),
          "onClick": onClickRightIcon
        }, [rightIconSlot ? rightIconSlot() : _createVNode27(Icon, {
          "name": props2.rightIcon,
          "classPrefix": props2.iconPrefix
        }, null)]);
      }
    };
    const renderWordLimit = () => {
      if (props2.showWordLimit && props2.maxlength) {
        const count = getStringLength(getModelValue());
        return _createVNode27("div", {
          "class": bem25("word-limit")
        }, [_createVNode27("span", {
          "class": bem25("word-num")
        }, [count]), _createTextVNode("/"), props2.maxlength]);
      }
    };
    const renderMessage = () => {
      if (form && form.props.showErrorMessage === false) {
        return;
      }
      const message = props2.errorMessage || state.validateMessage;
      if (message) {
        const slot = slots["error-message"];
        const errorMessageAlign = getProp("errorMessageAlign");
        return _createVNode27("div", {
          "class": bem25("error-message", errorMessageAlign)
        }, [slot ? slot({
          message
        }) : message]);
      }
    };
    const renderLabel = () => {
      const labelWidth = getProp("labelWidth");
      const labelAlign = getProp("labelAlign");
      const colon = getProp("colon") ? ":" : "";
      if (slots.label) {
        return [slots.label(), colon];
      }
      if (props2.label) {
        return _createVNode27("label", {
          "id": `${id}-label`,
          "for": slots.input ? void 0 : getInputId(),
          "onClick": (event) => {
            preventDefault(event);
            focus();
          },
          "style": labelAlign === "top" && labelWidth ? {
            width: addUnit(labelWidth)
          } : void 0
        }, [props2.label + colon]);
      }
    };
    const renderFieldBody = () => [_createVNode27("div", {
      "class": bem25("body")
    }, [renderInput(), showClear.value && _createVNode27(Icon, {
      "ref": clearIconRef,
      "name": props2.clearIcon,
      "class": bem25("clear")
    }, null), renderRightIcon(), slots.button && _createVNode27("div", {
      "class": bem25("button")
    }, [slots.button()])]), renderWordLimit(), renderMessage()];
    useExpose({
      blur,
      focus,
      validate,
      formValue,
      resetValidation,
      getValidationStatus
    });
    provide5(CUSTOM_FIELD_INJECTION_KEY, {
      customValue,
      resetValidation,
      validateWithTrigger
    });
    watch17(() => props2.modelValue, () => {
      updateValue(getModelValue());
      resetValidation();
      validateWithTrigger("onChange");
      nextTick11(adjustTextareaSize);
    });
    onMounted8(() => {
      updateValue(getModelValue(), props2.formatTrigger);
      nextTick11(adjustTextareaSize);
    });
    useEventListener("touchstart", onClear, {
      target: computed18(() => {
        var _a;
        return (_a = clearIconRef.value) == null ? void 0 : _a.$el;
      })
    });
    return () => {
      const disabled = getProp("disabled");
      const labelAlign = getProp("labelAlign");
      const LeftIcon = renderLeftIcon();
      const renderTitle = () => {
        const Label = renderLabel();
        if (labelAlign === "top") {
          return [LeftIcon, Label].filter(Boolean);
        }
        return Label || [];
      };
      return _createVNode27(Cell, {
        "size": props2.size,
        "class": bem25({
          error: showError.value,
          disabled,
          [`label-${labelAlign}`]: labelAlign
        }),
        "center": props2.center,
        "border": props2.border,
        "isLink": props2.isLink,
        "clickable": props2.clickable,
        "titleStyle": labelStyle.value,
        "valueClass": bem25("value"),
        "titleClass": [bem25("label", [labelAlign, {
          required: showRequiredMark.value
        }]), props2.labelClass],
        "arrowDirection": props2.arrowDirection
      }, {
        icon: LeftIcon && labelAlign !== "top" ? () => LeftIcon : null,
        title: renderTitle,
        value: renderFieldBody,
        extra: slots.extra
      });
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/field/index.mjs
var Field = withInstall(stdin_default28);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/toast/Toast.mjs
import { mergeProps as _mergeProps9, createVNode as _createVNode28 } from "vue";
import { watch as watch18, onMounted as onMounted9, onUnmounted as onUnmounted3, defineComponent as defineComponent27 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/toast/lock-click.mjs
var lockCount = 0;
function lockClick(lock) {
  if (lock) {
    if (!lockCount) {
      document.body.classList.add("van-toast--unclickable");
    }
    lockCount++;
  } else if (lockCount) {
    lockCount--;
    if (!lockCount) {
      document.body.classList.remove("van-toast--unclickable");
    }
  }
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/toast/Toast.mjs
var [name27, bem26] = createNamespace("toast");
var popupInheritProps = ["show", "overlay", "teleport", "transition", "overlayClass", "overlayStyle", "closeOnClickOverlay", "zIndex"];
var toastProps = {
  icon: String,
  show: Boolean,
  type: makeStringProp("text"),
  overlay: Boolean,
  message: numericProp,
  iconSize: numericProp,
  duration: makeNumberProp(2e3),
  position: makeStringProp("middle"),
  teleport: [String, Object],
  wordBreak: String,
  className: unknownProp,
  iconPrefix: String,
  transition: makeStringProp("van-fade"),
  loadingType: String,
  forbidClick: Boolean,
  overlayClass: unknownProp,
  overlayStyle: Object,
  closeOnClick: Boolean,
  closeOnClickOverlay: Boolean,
  zIndex: numericProp
};
var stdin_default29 = defineComponent27({
  name: name27,
  props: toastProps,
  emits: ["update:show"],
  setup(props2, {
    emit,
    slots
  }) {
    let timer2;
    let clickable = false;
    const toggleClickable = () => {
      const newValue = props2.show && props2.forbidClick;
      if (clickable !== newValue) {
        clickable = newValue;
        lockClick(clickable);
      }
    };
    const updateShow = (show) => emit("update:show", show);
    const onClick = () => {
      if (props2.closeOnClick) {
        updateShow(false);
      }
    };
    const clearTimer = () => clearTimeout(timer2);
    const renderIcon = () => {
      const {
        icon,
        type,
        iconSize,
        iconPrefix,
        loadingType
      } = props2;
      const hasIcon = icon || type === "success" || type === "fail";
      if (hasIcon) {
        return _createVNode28(Icon, {
          "name": icon || type,
          "size": iconSize,
          "class": bem26("icon"),
          "classPrefix": iconPrefix
        }, null);
      }
      if (type === "loading") {
        return _createVNode28(Loading, {
          "class": bem26("loading"),
          "size": iconSize,
          "type": loadingType
        }, null);
      }
    };
    const renderMessage = () => {
      const {
        type,
        message
      } = props2;
      if (slots.message) {
        return _createVNode28("div", {
          "class": bem26("text")
        }, [slots.message()]);
      }
      if (isDef(message) && message !== "") {
        return type === "html" ? _createVNode28("div", {
          "key": 0,
          "class": bem26("text"),
          "innerHTML": String(message)
        }, null) : _createVNode28("div", {
          "class": bem26("text")
        }, [message]);
      }
    };
    watch18(() => [props2.show, props2.forbidClick], toggleClickable);
    watch18(() => [props2.show, props2.type, props2.message, props2.duration], () => {
      clearTimer();
      if (props2.show && props2.duration > 0) {
        timer2 = setTimeout(() => {
          updateShow(false);
        }, props2.duration);
      }
    });
    onMounted9(toggleClickable);
    onUnmounted3(toggleClickable);
    return () => _createVNode28(Popup, _mergeProps9({
      "class": [bem26([props2.position, props2.wordBreak === "normal" ? "break-normal" : props2.wordBreak, {
        [props2.type]: !props2.icon
      }]), props2.className],
      "lockScroll": false,
      "onClick": onClick,
      "onClosed": clearTimer,
      "onUpdate:show": updateShow
    }, pick(props2, popupInheritProps)), {
      default: () => [renderIcon(), renderMessage()]
    });
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/toast/function-call.mjs
import { createVNode as _createVNode29, mergeProps as _mergeProps10 } from "vue";
import { ref as ref25, watch as watch19, getCurrentInstance as getCurrentInstance8 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/utils/mount-component.mjs
import { createApp, reactive as reactive8 } from "vue";
function usePopupState() {
  const state = reactive8({
    show: false
  });
  const toggle = (show) => {
    state.show = show;
  };
  const open = (props2) => {
    extend(state, props2, { transitionAppear: true });
    toggle(true);
  };
  const close = () => toggle(false);
  useExpose({ open, close, toggle });
  return {
    open,
    close,
    state,
    toggle
  };
}
function mountComponent(RootComponent) {
  const app = createApp(RootComponent);
  const root = document.createElement("div");
  document.body.appendChild(root);
  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    }
  };
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/toast/function-call.mjs
var defaultOptions = {
  icon: "",
  type: "text",
  message: "",
  className: "",
  overlay: false,
  onClose: void 0,
  onOpened: void 0,
  duration: 2e3,
  teleport: "body",
  iconSize: void 0,
  iconPrefix: void 0,
  position: "middle",
  transition: "van-fade",
  forbidClick: false,
  loadingType: void 0,
  overlayClass: "",
  overlayStyle: void 0,
  closeOnClick: false,
  closeOnClickOverlay: false
};
var queue = [];
var allowMultiple = false;
var currentOptions = extend({}, defaultOptions);
var defaultOptionsMap = /* @__PURE__ */ new Map();
function parseOptions(message) {
  if (isObject(message)) {
    return message;
  }
  return {
    message
  };
}
function createInstance() {
  const {
    instance: instance4,
    unmount
  } = mountComponent({
    setup() {
      const message = ref25("");
      const {
        open,
        state,
        close,
        toggle
      } = usePopupState();
      const onClosed = () => {
        if (allowMultiple) {
          queue = queue.filter((item) => item !== instance4);
          unmount();
        }
      };
      const render = () => {
        const attrs = {
          onClosed,
          "onUpdate:show": toggle
        };
        return _createVNode29(stdin_default29, _mergeProps10(state, attrs), null);
      };
      watch19(message, (val) => {
        state.message = val;
      });
      getCurrentInstance8().render = render;
      return {
        open,
        close,
        message
      };
    }
  });
  return instance4;
}
function getInstance() {
  if (!queue.length || allowMultiple) {
    const instance4 = createInstance();
    queue.push(instance4);
  }
  return queue[queue.length - 1];
}
function showToast(options = {}) {
  if (!inBrowser) {
    return {};
  }
  const toast = getInstance();
  const parsedOptions = parseOptions(options);
  toast.open(extend({}, currentOptions, defaultOptionsMap.get(parsedOptions.type || currentOptions.type), parsedOptions));
  return toast;
}
var createMethod = (type) => (options) => showToast(extend({
  type
}, parseOptions(options)));
var showLoadingToast = createMethod("loading");
var showSuccessToast = createMethod("success");
var showFailToast = createMethod("fail");
var closeToast = (all) => {
  var _a;
  if (queue.length) {
    if (all) {
      queue.forEach((toast) => {
        toast.close();
      });
      queue = [];
    } else if (!allowMultiple) {
      queue[0].close();
    } else {
      (_a = queue.shift()) == null ? void 0 : _a.close();
    }
  }
};
function setToastDefaultOptions(type, options) {
  if (typeof type === "string") {
    defaultOptionsMap.set(type, options);
  } else {
    extend(currentOptions, type);
  }
}
var resetToastDefaultOptions = (type) => {
  if (typeof type === "string") {
    defaultOptionsMap.delete(type);
  } else {
    currentOptions = extend({}, defaultOptions);
    defaultOptionsMap.clear();
  }
};
var allowMultipleToast = (value = true) => {
  allowMultiple = value;
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/toast/index.mjs
var Toast = withInstall(stdin_default29);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/switch/Switch.mjs
import { createVNode as _createVNode30 } from "vue";
import { defineComponent as defineComponent28 } from "vue";
var [name28, bem27] = createNamespace("switch");
var switchProps = {
  size: numericProp,
  loading: Boolean,
  disabled: Boolean,
  modelValue: unknownProp,
  activeColor: String,
  inactiveColor: String,
  activeValue: {
    type: unknownProp,
    default: true
  },
  inactiveValue: {
    type: unknownProp,
    default: false
  }
};
var stdin_default30 = defineComponent28({
  name: name28,
  props: switchProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const isChecked = () => props2.modelValue === props2.activeValue;
    const onClick = () => {
      if (!props2.disabled && !props2.loading) {
        const newValue = isChecked() ? props2.inactiveValue : props2.activeValue;
        emit("update:modelValue", newValue);
        emit("change", newValue);
      }
    };
    const renderLoading = () => {
      if (props2.loading) {
        const color = isChecked() ? props2.activeColor : props2.inactiveColor;
        return _createVNode30(Loading, {
          "class": bem27("loading"),
          "color": color
        }, null);
      }
      if (slots.node) {
        return slots.node();
      }
    };
    useCustomFieldValue(() => props2.modelValue);
    return () => {
      var _a;
      const {
        size,
        loading,
        disabled,
        activeColor,
        inactiveColor
      } = props2;
      const checked = isChecked();
      const style = {
        fontSize: addUnit(size),
        backgroundColor: checked ? activeColor : inactiveColor
      };
      return _createVNode30("div", {
        "role": "switch",
        "class": bem27({
          on: checked,
          loading,
          disabled
        }),
        "style": style,
        "tabindex": disabled ? void 0 : 0,
        "aria-checked": checked,
        "onClick": onClick
      }, [_createVNode30("div", {
        "class": bem27("node")
      }, [renderLoading()]), (_a = slots.background) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/switch/index.mjs
var Switch = withInstall(stdin_default30);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/address-edit/AddressEditDetail.mjs
import { Fragment as _Fragment2, createVNode as _createVNode31 } from "vue";
import { ref as ref26, defineComponent as defineComponent29 } from "vue";
var [name29, bem28] = createNamespace("address-edit-detail");
var t2 = createNamespace("address-edit")[2];
var stdin_default31 = defineComponent29({
  name: name29,
  props: {
    show: Boolean,
    rows: numericProp,
    value: String,
    rules: Array,
    focused: Boolean,
    maxlength: numericProp,
    searchResult: Array,
    showSearchResult: Boolean
  },
  emits: ["blur", "focus", "input", "selectSearch"],
  setup(props2, {
    emit
  }) {
    const field = ref26();
    const showSearchResult = () => props2.focused && props2.searchResult && props2.showSearchResult;
    const onSelect = (express) => {
      emit("selectSearch", express);
      emit("input", `${express.address || ""} ${express.name || ""}`.trim());
    };
    const renderSearchResult = () => {
      if (!showSearchResult()) {
        return;
      }
      const {
        searchResult
      } = props2;
      return searchResult.map((express) => _createVNode31(Cell, {
        "clickable": true,
        "key": (express.name || "") + (express.address || ""),
        "icon": "location-o",
        "title": express.name,
        "label": express.address,
        "class": bem28("search-item"),
        "border": false,
        "onClick": () => onSelect(express)
      }, null));
    };
    const onBlur = (event) => emit("blur", event);
    const onFocus = (event) => emit("focus", event);
    const onInput = (value) => emit("input", value);
    return () => {
      if (props2.show) {
        return _createVNode31(_Fragment2, null, [_createVNode31(Field, {
          "autosize": true,
          "clearable": true,
          "ref": field,
          "class": bem28(),
          "rows": props2.rows,
          "type": "textarea",
          "rules": props2.rules,
          "label": t2("addressDetail"),
          "border": !showSearchResult(),
          "maxlength": props2.maxlength,
          "modelValue": props2.value,
          "placeholder": t2("addressDetail"),
          "onBlur": onBlur,
          "onFocus": onFocus,
          "onUpdate:modelValue": onInput
        }, null), renderSearchResult()]);
      }
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/address-edit/AddressEdit.mjs
var [name30, bem29, t3] = createNamespace("address-edit");
var DEFAULT_DATA = {
  name: "",
  tel: "",
  city: "",
  county: "",
  country: "",
  province: "",
  areaCode: "",
  isDefault: false,
  addressDetail: ""
};
var addressEditProps = {
  areaList: Object,
  isSaving: Boolean,
  isDeleting: Boolean,
  validator: Function,
  showArea: truthProp,
  showDetail: truthProp,
  showDelete: Boolean,
  disableArea: Boolean,
  searchResult: Array,
  telMaxlength: numericProp,
  showSetDefault: Boolean,
  saveButtonText: String,
  areaPlaceholder: String,
  deleteButtonText: String,
  showSearchResult: Boolean,
  detailRows: makeNumericProp(1),
  detailMaxlength: makeNumericProp(200),
  areaColumnsPlaceholder: makeArrayProp(),
  addressInfo: {
    type: Object,
    default: () => extend({}, DEFAULT_DATA)
  },
  telValidator: {
    type: Function,
    default: isMobile
  }
};
var stdin_default32 = defineComponent30({
  name: name30,
  props: addressEditProps,
  emits: ["save", "focus", "change", "delete", "clickArea", "changeArea", "changeDetail", "selectSearch", "changeDefault"],
  setup(props2, {
    emit,
    slots
  }) {
    const areaRef = ref27();
    const data = reactive9({});
    const showAreaPopup = ref27(false);
    const detailFocused = ref27(false);
    const areaListLoaded = computed19(() => isObject(props2.areaList) && Object.keys(props2.areaList).length);
    const areaText = computed19(() => {
      const {
        province,
        city,
        county,
        areaCode
      } = data;
      if (areaCode) {
        const arr = [province, city, county];
        if (province && province === city) {
          arr.splice(1, 1);
        }
        return arr.filter(Boolean).join("/");
      }
      return "";
    });
    const hideBottomFields = computed19(() => {
      var _a;
      return ((_a = props2.searchResult) == null ? void 0 : _a.length) && detailFocused.value;
    });
    const onFocus = (key) => {
      detailFocused.value = key === "addressDetail";
      emit("focus", key);
    };
    const onChange = (key, value) => {
      emit("change", {
        key,
        value
      });
    };
    const rules = computed19(() => {
      const {
        validator,
        telValidator
      } = props2;
      const makeRule = (name210, emptyMessage) => ({
        validator: (value) => {
          if (validator) {
            const message = validator(name210, value);
            if (message) {
              return message;
            }
          }
          if (!value) {
            return emptyMessage;
          }
          return true;
        }
      });
      return {
        name: [makeRule("name", t3("nameEmpty"))],
        tel: [makeRule("tel", t3("telInvalid")), {
          validator: telValidator,
          message: t3("telInvalid")
        }],
        areaCode: [makeRule("areaCode", t3("areaEmpty"))],
        addressDetail: [makeRule("addressDetail", t3("addressEmpty"))]
      };
    });
    const onSave = () => emit("save", data);
    const onChangeDetail = (val) => {
      data.addressDetail = val;
      emit("changeDetail", val);
    };
    const assignAreaText = (options) => {
      data.province = options[0].text;
      data.city = options[1].text;
      data.county = options[2].text;
    };
    const onAreaConfirm = ({
      selectedValues,
      selectedOptions
    }) => {
      if (selectedValues.some((value) => value === AREA_EMPTY_CODE)) {
        showToast(t3("areaEmpty"));
      } else {
        showAreaPopup.value = false;
        assignAreaText(selectedOptions);
        emit("changeArea", selectedOptions);
      }
    };
    const onDelete = () => emit("delete", data);
    const setAreaCode = (code) => {
      data.areaCode = code || "";
    };
    const onDetailBlur = () => {
      setTimeout(() => {
        detailFocused.value = false;
      });
    };
    const setAddressDetail = (value) => {
      data.addressDetail = value;
    };
    const renderSetDefaultCell = () => {
      if (props2.showSetDefault) {
        const slots2 = {
          "right-icon": () => _createVNode32(Switch, {
            "modelValue": data.isDefault,
            "onUpdate:modelValue": ($event) => data.isDefault = $event,
            "onChange": (event) => emit("changeDefault", event)
          }, null)
        };
        return _withDirectives4(_createVNode32(Cell, {
          "center": true,
          "border": false,
          "title": t3("defaultAddress"),
          "class": bem29("default")
        }, slots2), [[_vShow4, !hideBottomFields.value]]);
      }
    };
    useExpose({
      setAreaCode,
      setAddressDetail
    });
    watch20(() => props2.addressInfo, (value) => {
      extend(data, DEFAULT_DATA, value);
      nextTick12(() => {
        var _a;
        const options = (_a = areaRef.value) == null ? void 0 : _a.getSelectedOptions();
        if (options && options.every((option) => option && option.value !== AREA_EMPTY_CODE)) {
          assignAreaText(options);
        }
      });
    }, {
      deep: true,
      immediate: true
    });
    return () => {
      const {
        disableArea
      } = props2;
      return _createVNode32(Form, {
        "class": bem29(),
        "onSubmit": onSave
      }, {
        default: () => {
          var _a;
          return [_createVNode32("div", {
            "class": bem29("fields")
          }, [_createVNode32(Field, {
            "modelValue": data.name,
            "onUpdate:modelValue": [($event) => data.name = $event, (val) => onChange("name", val)],
            "clearable": true,
            "label": t3("name"),
            "rules": rules.value.name,
            "placeholder": t3("name"),
            "onFocus": () => onFocus("name")
          }, null), _createVNode32(Field, {
            "modelValue": data.tel,
            "onUpdate:modelValue": [($event) => data.tel = $event, (val) => onChange("tel", val)],
            "clearable": true,
            "type": "tel",
            "label": t3("tel"),
            "rules": rules.value.tel,
            "maxlength": props2.telMaxlength,
            "placeholder": t3("tel"),
            "onFocus": () => onFocus("tel")
          }, null), _withDirectives4(_createVNode32(Field, {
            "readonly": true,
            "label": t3("area"),
            "is-link": !disableArea,
            "modelValue": areaText.value,
            "rules": props2.showArea ? rules.value.areaCode : void 0,
            "placeholder": props2.areaPlaceholder || t3("area"),
            "onFocus": () => onFocus("areaCode"),
            "onClick": () => {
              emit("clickArea");
              showAreaPopup.value = !disableArea;
            }
          }, null), [[_vShow4, props2.showArea]]), _createVNode32(stdin_default31, {
            "show": props2.showDetail,
            "rows": props2.detailRows,
            "rules": rules.value.addressDetail,
            "value": data.addressDetail,
            "focused": detailFocused.value,
            "maxlength": props2.detailMaxlength,
            "searchResult": props2.searchResult,
            "showSearchResult": props2.showSearchResult,
            "onBlur": onDetailBlur,
            "onFocus": () => onFocus("addressDetail"),
            "onInput": onChangeDetail,
            "onSelectSearch": (event) => emit("selectSearch", event)
          }, null), (_a = slots.default) == null ? void 0 : _a.call(slots)]), renderSetDefaultCell(), _withDirectives4(_createVNode32("div", {
            "class": bem29("buttons")
          }, [_createVNode32(Button, {
            "block": true,
            "round": true,
            "type": "primary",
            "text": props2.saveButtonText || t3("save"),
            "class": bem29("button"),
            "loading": props2.isSaving,
            "nativeType": "submit"
          }, null), props2.showDelete && _createVNode32(Button, {
            "block": true,
            "round": true,
            "class": bem29("button"),
            "loading": props2.isDeleting,
            "text": props2.deleteButtonText || t3("delete"),
            "onClick": onDelete
          }, null)]), [[_vShow4, !hideBottomFields.value]]), _createVNode32(Popup, {
            "show": showAreaPopup.value,
            "onUpdate:show": ($event) => showAreaPopup.value = $event,
            "round": true,
            "teleport": "body",
            "position": "bottom",
            "lazyRender": false
          }, {
            default: () => [_createVNode32(Area, {
              "modelValue": data.areaCode,
              "onUpdate:modelValue": ($event) => data.areaCode = $event,
              "ref": areaRef,
              "loading": !areaListLoaded.value,
              "areaList": props2.areaList,
              "columnsPlaceholder": props2.areaColumnsPlaceholder,
              "onConfirm": onAreaConfirm,
              "onCancel": () => {
                showAreaPopup.value = false;
              }
            }, null)]
          })];
        }
      });
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/address-edit/index.mjs
var AddressEdit = withInstall(stdin_default32);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/address-list/AddressList.mjs
import { createVNode as _createVNode40 } from "vue";
import { defineComponent as defineComponent38, computed as computed22 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/radio-group/RadioGroup.mjs
import { createVNode as _createVNode33 } from "vue";
import { watch as watch21, defineComponent as defineComponent31 } from "vue";
var [name31, bem30] = createNamespace("radio-group");
var radioGroupProps = {
  shape: String,
  disabled: Boolean,
  iconSize: numericProp,
  direction: String,
  modelValue: unknownProp,
  checkedColor: String
};
var RADIO_KEY = Symbol(name31);
var stdin_default33 = defineComponent31({
  name: name31,
  props: radioGroupProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      linkChildren
    } = useChildren(RADIO_KEY);
    const updateValue = (value) => emit("update:modelValue", value);
    watch21(() => props2.modelValue, (value) => emit("change", value));
    linkChildren({
      props: props2,
      updateValue
    });
    useCustomFieldValue(() => props2.modelValue);
    return () => {
      var _a;
      return _createVNode33("div", {
        "class": bem30([props2.direction]),
        "role": "radiogroup"
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/radio-group/index.mjs
var RadioGroup = withInstall(stdin_default33);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/checkbox-group/CheckboxGroup.mjs
import { createVNode as _createVNode34 } from "vue";
import { watch as watch22, defineComponent as defineComponent32 } from "vue";
var [name32, bem31] = createNamespace("checkbox-group");
var checkboxGroupProps = {
  max: numericProp,
  shape: makeStringProp("round"),
  disabled: Boolean,
  iconSize: numericProp,
  direction: String,
  modelValue: makeArrayProp(),
  checkedColor: String
};
var CHECKBOX_GROUP_KEY = Symbol(name32);
var stdin_default34 = defineComponent32({
  name: name32,
  props: checkboxGroupProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      children,
      linkChildren
    } = useChildren(CHECKBOX_GROUP_KEY);
    const updateValue = (value) => emit("update:modelValue", value);
    const toggleAll = (options = {}) => {
      if (typeof options === "boolean") {
        options = {
          checked: options
        };
      }
      const {
        checked,
        skipDisabled
      } = options;
      const checkedChildren = children.filter((item) => {
        if (!item.props.bindGroup) {
          return false;
        }
        if (item.props.disabled && skipDisabled) {
          return item.checked.value;
        }
        return checked != null ? checked : !item.checked.value;
      });
      const names = checkedChildren.map((item) => item.name);
      updateValue(names);
    };
    watch22(() => props2.modelValue, (value) => emit("change", value));
    useExpose({
      toggleAll
    });
    useCustomFieldValue(() => props2.modelValue);
    linkChildren({
      props: props2,
      updateValue
    });
    return () => {
      var _a;
      return _createVNode34("div", {
        "class": bem31([props2.direction])
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/checkbox-group/index.mjs
var CheckboxGroup = withInstall(stdin_default34);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/address-list/AddressListItem.mjs
import { createVNode as _createVNode39 } from "vue";
import { defineComponent as defineComponent37 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tag/Tag.mjs
import { createVNode as _createVNode35 } from "vue";
import { Transition as Transition3, defineComponent as defineComponent33 } from "vue";
var [name33, bem32] = createNamespace("tag");
var tagProps = {
  size: String,
  mark: Boolean,
  show: truthProp,
  type: makeStringProp("default"),
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  closeable: Boolean
};
var stdin_default35 = defineComponent33({
  name: name33,
  props: tagProps,
  emits: ["close"],
  setup(props2, {
    slots,
    emit
  }) {
    const onClose = (event) => {
      event.stopPropagation();
      emit("close", event);
    };
    const getStyle = () => {
      if (props2.plain) {
        return {
          color: props2.textColor || props2.color,
          borderColor: props2.color
        };
      }
      return {
        color: props2.textColor,
        background: props2.color
      };
    };
    const renderTag = () => {
      var _a;
      const {
        type,
        mark,
        plain,
        round: round2,
        size,
        closeable
      } = props2;
      const classes = {
        mark,
        plain,
        round: round2
      };
      if (size) {
        classes[size] = size;
      }
      const CloseIcon = closeable && _createVNode35(Icon, {
        "name": "cross",
        "class": [bem32("close"), HAPTICS_FEEDBACK],
        "onClick": onClose
      }, null);
      return _createVNode35("span", {
        "style": getStyle(),
        "class": bem32([classes, type])
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots), CloseIcon]);
    };
    return () => _createVNode35(Transition3, {
      "name": props2.closeable ? "van-fade" : void 0
    }, {
      default: () => [props2.show ? renderTag() : null]
    });
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tag/index.mjs
var Tag = withInstall(stdin_default35);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/radio/Radio.mjs
import { createVNode as _createVNode37, mergeProps as _mergeProps11 } from "vue";
import { defineComponent as defineComponent35 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/checkbox/Checker.mjs
import { createVNode as _createVNode36 } from "vue";
import { ref as ref28, computed as computed20, defineComponent as defineComponent34 } from "vue";
var checkerProps = {
  name: unknownProp,
  disabled: Boolean,
  iconSize: numericProp,
  modelValue: unknownProp,
  checkedColor: String,
  labelPosition: String,
  labelDisabled: Boolean
};
var stdin_default36 = defineComponent34({
  props: extend({}, checkerProps, {
    bem: makeRequiredProp(Function),
    role: String,
    shape: String,
    parent: Object,
    checked: Boolean,
    bindGroup: truthProp,
    indeterminate: {
      type: Boolean,
      default: null
    }
  }),
  emits: ["click", "toggle"],
  setup(props2, {
    emit,
    slots
  }) {
    const iconRef = ref28();
    const getParentProp = (name112) => {
      if (props2.parent && props2.bindGroup) {
        return props2.parent.props[name112];
      }
    };
    const disabled = computed20(() => {
      if (props2.parent && props2.bindGroup) {
        const disabled2 = getParentProp("disabled") || props2.disabled;
        if (props2.role === "checkbox") {
          const checkedCount = getParentProp("modelValue").length;
          const max = getParentProp("max");
          const overlimit = max && checkedCount >= +max;
          return disabled2 || overlimit && !props2.checked;
        }
        return disabled2;
      }
      return props2.disabled;
    });
    const direction = computed20(() => getParentProp("direction"));
    const iconStyle = computed20(() => {
      const checkedColor = props2.checkedColor || getParentProp("checkedColor");
      if (checkedColor && props2.checked && !disabled.value) {
        return {
          borderColor: checkedColor,
          backgroundColor: checkedColor
        };
      }
    });
    const shape = computed20(() => {
      return props2.shape || getParentProp("shape") || "round";
    });
    const onClick = (event) => {
      const {
        target
      } = event;
      const icon = iconRef.value;
      const iconClicked = icon === target || (icon == null ? void 0 : icon.contains(target));
      if (!disabled.value && (iconClicked || !props2.labelDisabled)) {
        emit("toggle");
      }
      emit("click", event);
    };
    const renderIcon = () => {
      var _a, _b;
      const {
        bem: bem107,
        checked,
        indeterminate
      } = props2;
      const iconSize = props2.iconSize || getParentProp("iconSize");
      return _createVNode36("div", {
        "ref": iconRef,
        "class": bem107("icon", [shape.value, {
          disabled: disabled.value,
          checked,
          indeterminate
        }]),
        "style": shape.value !== "dot" ? {
          fontSize: addUnit(iconSize)
        } : {
          width: addUnit(iconSize),
          height: addUnit(iconSize),
          borderColor: (_a = iconStyle.value) == null ? void 0 : _a.borderColor
        }
      }, [slots.icon ? slots.icon({
        checked,
        disabled: disabled.value
      }) : shape.value !== "dot" ? _createVNode36(Icon, {
        "name": indeterminate ? "minus" : "success",
        "style": iconStyle.value
      }, null) : _createVNode36("div", {
        "class": bem107("icon--dot__icon"),
        "style": {
          backgroundColor: (_b = iconStyle.value) == null ? void 0 : _b.backgroundColor
        }
      }, null)]);
    };
    const renderLabel = () => {
      const {
        checked
      } = props2;
      if (slots.default) {
        return _createVNode36("span", {
          "class": props2.bem("label", [props2.labelPosition, {
            disabled: disabled.value
          }])
        }, [slots.default({
          checked,
          disabled: disabled.value
        })]);
      }
    };
    return () => {
      const nodes = props2.labelPosition === "left" ? [renderLabel(), renderIcon()] : [renderIcon(), renderLabel()];
      return _createVNode36("div", {
        "role": props2.role,
        "class": props2.bem([{
          disabled: disabled.value,
          "label-disabled": props2.labelDisabled
        }, direction.value]),
        "tabindex": disabled.value ? void 0 : 0,
        "aria-checked": props2.checked,
        "onClick": onClick
      }, [nodes]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/radio/Radio.mjs
var radioProps = extend({}, checkerProps, {
  shape: String
});
var [name34, bem33] = createNamespace("radio");
var stdin_default37 = defineComponent35({
  name: name34,
  props: radioProps,
  emits: ["update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      parent
    } = useParent(RADIO_KEY);
    const checked = () => {
      const value = parent ? parent.props.modelValue : props2.modelValue;
      return value === props2.name;
    };
    const toggle = () => {
      if (parent) {
        parent.updateValue(props2.name);
      } else {
        emit("update:modelValue", props2.name);
      }
    };
    return () => _createVNode37(stdin_default36, _mergeProps11({
      "bem": bem33,
      "role": "radio",
      "parent": parent,
      "checked": checked(),
      "onToggle": toggle
    }, props2), pick(slots, ["default", "icon"]));
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/radio/index.mjs
var Radio = withInstall(stdin_default37);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/checkbox/Checkbox.mjs
import { createVNode as _createVNode38, mergeProps as _mergeProps12 } from "vue";
import { watch as watch23, computed as computed21, defineComponent as defineComponent36 } from "vue";
var [name35, bem34] = createNamespace("checkbox");
var checkboxProps = extend({}, checkerProps, {
  shape: String,
  bindGroup: truthProp,
  indeterminate: {
    type: Boolean,
    default: null
  }
});
var stdin_default38 = defineComponent36({
  name: name35,
  props: checkboxProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      parent
    } = useParent(CHECKBOX_GROUP_KEY);
    const setParentValue = (checked2) => {
      const {
        name: name210
      } = props2;
      const {
        max,
        modelValue
      } = parent.props;
      const value = modelValue.slice();
      if (checked2) {
        const overlimit = max && value.length >= +max;
        if (!overlimit && !value.includes(name210)) {
          value.push(name210);
          if (props2.bindGroup) {
            parent.updateValue(value);
          }
        }
      } else {
        const index = value.indexOf(name210);
        if (index !== -1) {
          value.splice(index, 1);
          if (props2.bindGroup) {
            parent.updateValue(value);
          }
        }
      }
    };
    const checked = computed21(() => {
      if (parent && props2.bindGroup) {
        return parent.props.modelValue.indexOf(props2.name) !== -1;
      }
      return !!props2.modelValue;
    });
    const toggle = (newValue = !checked.value) => {
      if (parent && props2.bindGroup) {
        setParentValue(newValue);
      } else {
        emit("update:modelValue", newValue);
      }
      if (props2.indeterminate !== null)
        emit("change", newValue);
    };
    watch23(() => props2.modelValue, (value) => {
      if (props2.indeterminate === null)
        emit("change", value);
    });
    useExpose({
      toggle,
      props: props2,
      checked
    });
    useCustomFieldValue(() => props2.modelValue);
    return () => _createVNode38(stdin_default36, _mergeProps12({
      "bem": bem34,
      "role": "checkbox",
      "parent": parent,
      "checked": checked.value,
      "onToggle": toggle
    }, props2), pick(slots, ["default", "icon"]));
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/checkbox/index.mjs
var Checkbox = withInstall(stdin_default38);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/address-list/AddressListItem.mjs
var [name36, bem35] = createNamespace("address-item");
var stdin_default39 = defineComponent37({
  name: name36,
  props: {
    address: makeRequiredProp(Object),
    disabled: Boolean,
    switchable: Boolean,
    singleChoice: Boolean,
    defaultTagText: String,
    rightIcon: makeStringProp("edit")
  },
  emits: ["edit", "click", "select"],
  setup(props2, {
    slots,
    emit
  }) {
    const onClick = (event) => {
      if (props2.switchable) {
        emit("select");
      }
      emit("click", event);
    };
    const renderRightIcon = () => _createVNode39(Icon, {
      "name": props2.rightIcon,
      "class": bem35("edit"),
      "onClick": (event) => {
        event.stopPropagation();
        emit("edit");
        emit("click", event);
      }
    }, null);
    const renderTag = () => {
      if (slots.tag) {
        return slots.tag(props2.address);
      }
      if (props2.address.isDefault && props2.defaultTagText) {
        return _createVNode39(Tag, {
          "type": "primary",
          "round": true,
          "class": bem35("tag")
        }, {
          default: () => [props2.defaultTagText]
        });
      }
    };
    const renderContent = () => {
      const {
        address,
        disabled,
        switchable,
        singleChoice
      } = props2;
      const Info = [_createVNode39("div", {
        "class": bem35("name")
      }, [`${address.name} ${address.tel}`, renderTag()]), _createVNode39("div", {
        "class": bem35("address")
      }, [address.address])];
      if (switchable && !disabled) {
        if (singleChoice) {
          return _createVNode39(Radio, {
            "name": address.id,
            "iconSize": 18
          }, {
            default: () => [Info]
          });
        } else {
          return _createVNode39(Checkbox, {
            "name": address.id,
            "iconSize": 18
          }, {
            default: () => [Info]
          });
        }
      }
      return Info;
    };
    return () => {
      var _a;
      const {
        disabled
      } = props2;
      return _createVNode39("div", {
        "class": bem35({
          disabled
        }),
        "onClick": onClick
      }, [_createVNode39(Cell, {
        "border": false,
        "titleClass": bem35("title")
      }, {
        title: renderContent,
        "right-icon": renderRightIcon
      }), (_a = slots.bottom) == null ? void 0 : _a.call(slots, extend({}, props2.address, {
        disabled
      }))]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/address-list/AddressList.mjs
var [name37, bem36, t4] = createNamespace("address-list");
var addressListProps = {
  list: makeArrayProp(),
  modelValue: [...numericProp, Array],
  switchable: truthProp,
  disabledText: String,
  disabledList: makeArrayProp(),
  showAddButton: truthProp,
  addButtonText: String,
  defaultTagText: String,
  rightIcon: makeStringProp("edit")
};
var stdin_default40 = defineComponent38({
  name: name37,
  props: addressListProps,
  emits: ["add", "edit", "select", "clickItem", "editDisabled", "selectDisabled", "update:modelValue"],
  setup(props2, {
    slots,
    emit
  }) {
    const singleChoice = computed22(() => !Array.isArray(props2.modelValue));
    const renderItem = (item, index, disabled) => {
      const onEdit = () => emit(disabled ? "editDisabled" : "edit", item, index);
      const onClick = (event) => emit("clickItem", item, index, {
        event
      });
      const onSelect = () => {
        emit(disabled ? "selectDisabled" : "select", item, index);
        if (!disabled) {
          if (singleChoice.value) {
            emit("update:modelValue", item.id);
          } else {
            const value = props2.modelValue;
            if (value.includes(item.id)) {
              emit("update:modelValue", value.filter((id) => id !== item.id));
            } else {
              emit("update:modelValue", [...value, item.id]);
            }
          }
        }
      };
      return _createVNode40(stdin_default39, {
        "key": item.id,
        "address": item,
        "disabled": disabled,
        "switchable": props2.switchable,
        "singleChoice": singleChoice.value,
        "defaultTagText": props2.defaultTagText,
        "rightIcon": props2.rightIcon,
        "onEdit": onEdit,
        "onClick": onClick,
        "onSelect": onSelect
      }, {
        bottom: slots["item-bottom"],
        tag: slots.tag
      });
    };
    const renderList = (list, disabled) => {
      if (list) {
        return list.map((item, index) => renderItem(item, index, disabled));
      }
    };
    const renderBottom = () => props2.showAddButton ? _createVNode40("div", {
      "class": [bem36("bottom"), "van-safe-area-bottom"]
    }, [_createVNode40(Button, {
      "round": true,
      "block": true,
      "type": "primary",
      "text": props2.addButtonText || t4("add"),
      "class": bem36("add"),
      "onClick": () => emit("add")
    }, null)]) : void 0;
    return () => {
      var _a, _b;
      const List2 = renderList(props2.list);
      const DisabledList = renderList(props2.disabledList, true);
      const DisabledText = props2.disabledText && _createVNode40("div", {
        "class": bem36("disabled-text")
      }, [props2.disabledText]);
      return _createVNode40("div", {
        "class": bem36()
      }, [(_a = slots.top) == null ? void 0 : _a.call(slots), !singleChoice.value && Array.isArray(props2.modelValue) ? _createVNode40(CheckboxGroup, {
        "modelValue": props2.modelValue
      }, {
        default: () => [List2]
      }) : _createVNode40(RadioGroup, {
        "modelValue": props2.modelValue
      }, {
        default: () => [List2]
      }), DisabledText, DisabledList, (_b = slots.default) == null ? void 0 : _b.call(slots), renderBottom()]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/address-list/index.mjs
var AddressList = withInstall(stdin_default40);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/back-top/BackTop.mjs
import { mergeProps as _mergeProps13, createVNode as _createVNode41 } from "vue";
import { ref as ref29, watch as watch24, computed as computed23, Teleport as Teleport2, nextTick as nextTick13, onMounted as onMounted10, defineComponent as defineComponent39, onDeactivated as onDeactivated8, onActivated as onActivated7 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/lazyload/vue-lazyload/util.mjs
var hasIntersectionObserver = inBrowser2 && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype;
var modeType = {
  event: "event",
  observer: "observer"
};
function remove(arr, item) {
  if (!arr.length)
    return;
  const index = arr.indexOf(item);
  if (index > -1)
    return arr.splice(index, 1);
}
function getBestSelectionFromSrcset(el, scale) {
  if (el.tagName !== "IMG" || !el.getAttribute("data-srcset"))
    return;
  let options = el.getAttribute("data-srcset");
  const container = el.parentNode;
  const containerWidth = container.offsetWidth * scale;
  let spaceIndex;
  let tmpSrc;
  let tmpWidth;
  options = options.trim().split(",");
  const result = options.map((item) => {
    item = item.trim();
    spaceIndex = item.lastIndexOf(" ");
    if (spaceIndex === -1) {
      tmpSrc = item;
      tmpWidth = 999998;
    } else {
      tmpSrc = item.substr(0, spaceIndex);
      tmpWidth = parseInt(
        item.substr(spaceIndex + 1, item.length - spaceIndex - 2),
        10
      );
    }
    return [tmpWidth, tmpSrc];
  });
  result.sort((a, b) => {
    if (a[0] < b[0]) {
      return 1;
    }
    if (a[0] > b[0]) {
      return -1;
    }
    if (a[0] === b[0]) {
      if (b[1].indexOf(".webp", b[1].length - 5) !== -1) {
        return 1;
      }
      if (a[1].indexOf(".webp", a[1].length - 5) !== -1) {
        return -1;
      }
    }
    return 0;
  });
  let bestSelectedSrc = "";
  let tmpOption;
  for (let i = 0; i < result.length; i++) {
    tmpOption = result[i];
    bestSelectedSrc = tmpOption[1];
    const next = result[i + 1];
    if (next && next[0] < containerWidth) {
      bestSelectedSrc = tmpOption[1];
      break;
    } else if (!next) {
      bestSelectedSrc = tmpOption[1];
      break;
    }
  }
  return bestSelectedSrc;
}
var getDPR = (scale = 1) => inBrowser2 ? window.devicePixelRatio || scale : scale;
function supportWebp() {
  if (!inBrowser2)
    return false;
  let support = true;
  try {
    const elem = document.createElement("canvas");
    if (elem.getContext && elem.getContext("2d")) {
      support = elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    }
  } catch (err) {
    support = false;
  }
  return support;
}
function throttle(action, delay) {
  let timeout = null;
  let lastRun = 0;
  return function(...args) {
    if (timeout) {
      return;
    }
    const elapsed = Date.now() - lastRun;
    const runCallback = () => {
      lastRun = Date.now();
      timeout = false;
      action.apply(this, args);
    };
    if (elapsed >= delay) {
      runCallback();
    } else {
      timeout = setTimeout(runCallback, delay);
    }
  };
}
function on(el, type, func) {
  el.addEventListener(type, func, {
    capture: false,
    passive: true
  });
}
function off(el, type, func) {
  el.removeEventListener(type, func, false);
}
var loadImageAsync = (item, resolve, reject) => {
  const image = new Image();
  if (!item || !item.src) {
    return reject(new Error("image src is required"));
  }
  image.src = item.src;
  if (item.cors) {
    image.crossOrigin = item.cors;
  }
  image.onload = () => resolve({
    naturalHeight: image.naturalHeight,
    naturalWidth: image.naturalWidth,
    src: image.src
  });
  image.onerror = (e) => reject(e);
};
var ImageCache = class {
  constructor({ max }) {
    this.options = {
      max: max || 100
    };
    this.caches = [];
  }
  has(key) {
    return this.caches.indexOf(key) > -1;
  }
  add(key) {
    if (this.has(key))
      return;
    this.caches.push(key);
    if (this.caches.length > this.options.max) {
      this.free();
    }
  }
  free() {
    this.caches.shift();
  }
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/back-top/BackTop.mjs
var [name38, bem37] = createNamespace("back-top");
var backTopProps = {
  right: numericProp,
  bottom: numericProp,
  zIndex: numericProp,
  target: [String, Object],
  offset: makeNumericProp(200),
  immediate: Boolean,
  teleport: {
    type: [String, Object],
    default: "body"
  }
};
var stdin_default41 = defineComponent39({
  name: name38,
  inheritAttrs: false,
  props: backTopProps,
  emits: ["click"],
  setup(props2, {
    emit,
    slots,
    attrs
  }) {
    let shouldReshow = false;
    const show = ref29(false);
    const root = ref29();
    const scrollParent = ref29();
    const style = computed23(() => extend(getZIndexStyle(props2.zIndex), {
      right: addUnit(props2.right),
      bottom: addUnit(props2.bottom)
    }));
    const onClick = (event) => {
      var _a;
      emit("click", event);
      (_a = scrollParent.value) == null ? void 0 : _a.scrollTo({
        top: 0,
        behavior: props2.immediate ? "auto" : "smooth"
      });
    };
    const scroll = () => {
      show.value = scrollParent.value ? getScrollTop(scrollParent.value) >= +props2.offset : false;
    };
    const getTarget = () => {
      const {
        target
      } = props2;
      if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          return el;
        }
        if (true) {
          console.error(`[Vant] BackTop: target element "${target}" was not found, the BackTop component will not be rendered.`);
        }
      } else {
        return target;
      }
    };
    const updateTarget = () => {
      if (inBrowser) {
        nextTick13(() => {
          scrollParent.value = props2.target ? getTarget() : getScrollParent(root.value);
          scroll();
        });
      }
    };
    useEventListener("scroll", throttle(scroll, 100), {
      target: scrollParent
    });
    onMounted10(updateTarget);
    onActivated7(() => {
      if (shouldReshow) {
        show.value = true;
        shouldReshow = false;
      }
    });
    onDeactivated8(() => {
      if (show.value && props2.teleport) {
        show.value = false;
        shouldReshow = true;
      }
    });
    watch24(() => props2.target, updateTarget);
    return () => {
      const Content = _createVNode41("div", _mergeProps13({
        "ref": !props2.teleport ? root : void 0,
        "class": bem37({
          active: show.value
        }),
        "style": style.value,
        "onClick": onClick
      }, attrs), [slots.default ? slots.default() : _createVNode41(Icon, {
        "name": "back-top",
        "class": bem37("icon")
      }, null)]);
      if (props2.teleport) {
        return [_createVNode41("div", {
          "ref": root,
          "class": bem37("placeholder")
        }, null), _createVNode41(Teleport2, {
          "to": props2.teleport
        }, {
          default: () => [Content]
        })];
      }
      return Content;
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/back-top/index.mjs
var BackTop = withInstall(stdin_default41);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/barrage/Barrage.mjs
import { createVNode as _createVNode42 } from "vue";
import { defineComponent as defineComponent40, onMounted as onMounted11, ref as ref30, nextTick as nextTick14, watch as watch25 } from "vue";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var barrageProps = {
  top: makeNumericProp(10),
  rows: makeNumericProp(4),
  duration: makeNumericProp(4e3),
  autoPlay: truthProp,
  delay: makeNumberProp(300),
  modelValue: makeArrayProp()
};
var [name39, bem38] = createNamespace("barrage");
var stdin_default42 = defineComponent40({
  name: name39,
  props: barrageProps,
  emits: ["update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const barrageWrapper = ref30();
    const className = bem38("item");
    const total = ref30(0);
    const barrageItems = [];
    const createBarrageItem = (text, delay = props2.delay) => {
      const item = document.createElement("span");
      item.className = className;
      item.innerText = String(text);
      item.style.animationDuration = `${props2.duration}ms`;
      item.style.animationDelay = `${delay}ms`;
      item.style.animationName = "van-barrage";
      item.style.animationTimingFunction = "linear";
      return item;
    };
    const isInitBarrage = ref30(true);
    const isPlay = ref30(props2.autoPlay);
    const appendBarrageItem = ({
      id,
      text
    }, i) => {
      var _a;
      const item = createBarrageItem(text, isInitBarrage.value ? i * props2.delay : void 0);
      if (!props2.autoPlay && isPlay.value === false) {
        item.style.animationPlayState = "paused";
      }
      (_a = barrageWrapper.value) == null ? void 0 : _a.append(item);
      total.value++;
      const top2 = (total.value - 1) % +props2.rows * item.offsetHeight + +props2.top;
      item.style.top = `${top2}px`;
      item.dataset.id = String(id);
      barrageItems.push(item);
      item.addEventListener("animationend", () => {
        emit("update:modelValue", [...props2.modelValue].filter((v) => String(v.id) !== item.dataset.id));
      });
    };
    const updateBarrages = (newValue, oldValue) => {
      const map = new Map(oldValue.map((item) => [item.id, item]));
      newValue.forEach((item, i) => {
        if (map.has(item.id)) {
          map.delete(item.id);
        } else {
          appendBarrageItem(item, i);
        }
      });
      map.forEach((item) => {
        const index = barrageItems.findIndex((span) => span.dataset.id === String(item.id));
        if (index > -1) {
          barrageItems[index].remove();
          barrageItems.splice(index, 1);
        }
      });
      isInitBarrage.value = false;
    };
    watch25(() => props2.modelValue.slice(), (newValue, oldValue) => updateBarrages(newValue != null ? newValue : [], oldValue != null ? oldValue : []), {
      deep: true
    });
    const rootStyle = ref30({});
    onMounted11(() => __async(this, null, function* () {
      var _a;
      rootStyle.value["--move-distance"] = `-${(_a = barrageWrapper.value) == null ? void 0 : _a.offsetWidth}px`;
      yield nextTick14();
      updateBarrages(props2.modelValue, []);
    }));
    const play = () => {
      isPlay.value = true;
      barrageItems.forEach((item) => {
        item.style.animationPlayState = "running";
      });
    };
    const pause = () => {
      isPlay.value = false;
      barrageItems.forEach((item) => {
        item.style.animationPlayState = "paused";
      });
    };
    useExpose({
      play,
      pause
    });
    return () => {
      var _a;
      return _createVNode42("div", {
        "class": bem38(),
        "ref": barrageWrapper,
        "style": rootStyle.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/barrage/index.mjs
var Barrage = withInstall(stdin_default42);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/calendar/Calendar.mjs
import { createVNode as _createVNode46, mergeProps as _mergeProps14 } from "vue";
import { ref as ref32, watch as watch26, computed as computed27, defineComponent as defineComponent44 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/calendar/utils.mjs
var [name40, bem39, t5] = createNamespace("calendar");
var formatMonthTitle = (date) => t5("monthTitle", date.getFullYear(), date.getMonth() + 1);
function compareMonth(date1, date2) {
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();
  if (year1 === year2) {
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }
  return year1 > year2 ? 1 : -1;
}
function compareDay(day1, day2) {
  const compareMonthResult = compareMonth(day1, day2);
  if (compareMonthResult === 0) {
    const date1 = day1.getDate();
    const date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }
  return compareMonthResult;
}
var cloneDate = (date) => new Date(date);
var cloneDates = (dates) => Array.isArray(dates) ? dates.map(cloneDate) : cloneDate(dates);
function getDayByOffset(date, offset2) {
  const cloned = cloneDate(date);
  cloned.setDate(cloned.getDate() + offset2);
  return cloned;
}
function getMonthByOffset(date, offset2) {
  const cloned = cloneDate(date);
  cloned.setMonth(cloned.getMonth() + offset2);
  if (cloned.getDate() !== date.getDate()) {
    cloned.setDate(0);
  }
  return cloned;
}
function getYearByOffset(date, offset2) {
  const cloned = cloneDate(date);
  cloned.setFullYear(cloned.getFullYear() + offset2);
  if (cloned.getDate() !== date.getDate()) {
    cloned.setDate(0);
  }
  return cloned;
}
var getPrevDay = (date) => getDayByOffset(date, -1);
var getNextDay = (date) => getDayByOffset(date, 1);
var getPrevMonth = (date) => getMonthByOffset(date, -1);
var getNextMonth = (date) => getMonthByOffset(date, 1);
var getPrevYear = (date) => getYearByOffset(date, -1);
var getNextYear = (date) => getYearByOffset(date, 1);
var getToday = () => {
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
function calcDateNum(date) {
  const day1 = date[0].getTime();
  const day2 = date[1].getTime();
  return (day2 - day1) / (1e3 * 60 * 60 * 24) + 1;
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/calendar/CalendarMonth.mjs
import { createVNode as _createVNode44 } from "vue";
import { ref as ref31, computed as computed25, defineComponent as defineComponent42 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/date-picker/utils.mjs
var sharedProps = extend({}, pickerSharedProps, {
  modelValue: makeArrayProp(),
  filter: Function,
  formatter: {
    type: Function,
    default: (type, option) => option
  }
});
var pickerInheritKeys = Object.keys(pickerSharedProps);
function times(n, iteratee) {
  if (n < 0) {
    return [];
  }
  const result = Array(n);
  let index = -1;
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var getMonthEndDay = (year, month) => 32 - new Date(year, month - 1, 32).getDate();
var genOptions = (min, max, type, formatter, filter, values) => {
  const options = times(max - min + 1, (index) => {
    const value = padZero(min + index);
    return formatter(type, {
      text: value,
      value
    });
  });
  return filter ? filter(type, options, values) : options;
};
var formatValueRange = (values, columns) => values.map((value, index) => {
  const column = columns[index];
  if (column.length) {
    const minValue = +column[0].value;
    const maxValue = +column[column.length - 1].value;
    return padZero(clamp(+value, minValue, maxValue));
  }
  return value;
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/calendar/CalendarDay.mjs
import { createVNode as _createVNode43 } from "vue";
import { computed as computed24, defineComponent as defineComponent41 } from "vue";
var [name41] = createNamespace("calendar-day");
var stdin_default43 = defineComponent41({
  name: name41,
  props: {
    item: makeRequiredProp(Object),
    color: String,
    index: Number,
    offset: makeNumberProp(0),
    rowHeight: String
  },
  emits: ["click", "clickDisabledDate"],
  setup(props2, {
    emit,
    slots
  }) {
    const style = computed24(() => {
      var _a;
      const {
        item,
        index,
        color,
        offset: offset2,
        rowHeight
      } = props2;
      const style2 = {
        height: rowHeight
      };
      if (item.type === "placeholder") {
        style2.width = "100%";
        return style2;
      }
      if (index === 0) {
        style2.marginLeft = `${100 * offset2 / 7}%`;
      }
      if (color) {
        switch (item.type) {
          case "end":
          case "start":
          case "start-end":
          case "multiple-middle":
          case "multiple-selected":
            style2.background = color;
            break;
          case "middle":
            style2.color = color;
            break;
        }
      }
      if (offset2 + (((_a = item.date) == null ? void 0 : _a.getDate()) || 1) > 28) {
        style2.marginBottom = 0;
      }
      return style2;
    });
    const onClick = () => {
      if (props2.item.type !== "disabled") {
        emit("click", props2.item);
      } else {
        emit("clickDisabledDate", props2.item);
      }
    };
    const renderTopInfo = () => {
      const {
        topInfo
      } = props2.item;
      if (topInfo || slots["top-info"]) {
        return _createVNode43("div", {
          "class": bem39("top-info")
        }, [slots["top-info"] ? slots["top-info"](props2.item) : topInfo]);
      }
    };
    const renderBottomInfo = () => {
      const {
        bottomInfo
      } = props2.item;
      if (bottomInfo || slots["bottom-info"]) {
        return _createVNode43("div", {
          "class": bem39("bottom-info")
        }, [slots["bottom-info"] ? slots["bottom-info"](props2.item) : bottomInfo]);
      }
    };
    const renderContent = () => {
      const {
        item,
        color,
        rowHeight
      } = props2;
      const {
        type,
        text
      } = item;
      const Nodes = [renderTopInfo(), text, renderBottomInfo()];
      if (type === "selected") {
        return _createVNode43("div", {
          "class": bem39("selected-day"),
          "style": {
            width: rowHeight,
            height: rowHeight,
            background: color
          }
        }, [Nodes]);
      }
      return Nodes;
    };
    return () => {
      const {
        type,
        className
      } = props2.item;
      if (type === "placeholder") {
        return _createVNode43("div", {
          "class": bem39("day"),
          "style": style.value
        }, null);
      }
      return _createVNode43("div", {
        "role": "gridcell",
        "style": style.value,
        "class": [bem39("day", type), className],
        "tabindex": type === "disabled" ? void 0 : -1,
        "onClick": onClick
      }, [renderContent()]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/calendar/CalendarMonth.mjs
var [name42] = createNamespace("calendar-month");
var calendarMonthProps = {
  date: makeRequiredProp(Date),
  type: String,
  color: String,
  minDate: Date,
  maxDate: Date,
  showMark: Boolean,
  rowHeight: numericProp,
  formatter: Function,
  lazyRender: Boolean,
  currentDate: [Date, Array],
  allowSameDay: Boolean,
  showSubtitle: Boolean,
  showMonthTitle: Boolean,
  firstDayOfWeek: Number
};
var stdin_default44 = defineComponent42({
  name: name42,
  props: calendarMonthProps,
  emits: ["click", "clickDisabledDate"],
  setup(props2, {
    emit,
    slots
  }) {
    const [visible, setVisible] = useToggle();
    const daysRef = ref31();
    const monthRef = ref31();
    const height2 = useHeight(monthRef);
    const title = computed25(() => formatMonthTitle(props2.date));
    const rowHeight = computed25(() => addUnit(props2.rowHeight));
    const offset2 = computed25(() => {
      const date = props2.date.getDate();
      const day = props2.date.getDay();
      const realDay = (day - date % 7 + 8) % 7;
      if (props2.firstDayOfWeek) {
        return (realDay + 7 - props2.firstDayOfWeek) % 7;
      }
      return realDay;
    });
    const totalDay = computed25(() => getMonthEndDay(props2.date.getFullYear(), props2.date.getMonth() + 1));
    const shouldRender = computed25(() => visible.value || !props2.lazyRender);
    const getTitle = () => title.value;
    const getMultipleDayType = (day) => {
      const isSelected = (date) => props2.currentDate.some((item) => compareDay(item, date) === 0);
      if (isSelected(day)) {
        const prevDay = getPrevDay(day);
        const nextDay = getNextDay(day);
        const prevSelected = isSelected(prevDay);
        const nextSelected = isSelected(nextDay);
        if (prevSelected && nextSelected) {
          return "multiple-middle";
        }
        if (prevSelected) {
          return "end";
        }
        if (nextSelected) {
          return "start";
        }
        return "multiple-selected";
      }
      return "";
    };
    const getRangeDayType = (day) => {
      const [startDay, endDay] = props2.currentDate;
      if (!startDay) {
        return "";
      }
      const compareToStart = compareDay(day, startDay);
      if (!endDay) {
        return compareToStart === 0 ? "start" : "";
      }
      const compareToEnd = compareDay(day, endDay);
      if (props2.allowSameDay && compareToStart === 0 && compareToEnd === 0) {
        return "start-end";
      }
      if (compareToStart === 0) {
        return "start";
      }
      if (compareToEnd === 0) {
        return "end";
      }
      if (compareToStart > 0 && compareToEnd < 0) {
        return "middle";
      }
      return "";
    };
    const getDayType = (day) => {
      const {
        type,
        minDate,
        maxDate,
        currentDate
      } = props2;
      if (minDate && compareDay(day, minDate) < 0 || maxDate && compareDay(day, maxDate) > 0) {
        return "disabled";
      }
      if (currentDate === null) {
        return "";
      }
      if (Array.isArray(currentDate)) {
        if (type === "multiple") {
          return getMultipleDayType(day);
        }
        if (type === "range") {
          return getRangeDayType(day);
        }
      } else if (type === "single") {
        return compareDay(day, currentDate) === 0 ? "selected" : "";
      }
      return "";
    };
    const getBottomInfo = (dayType) => {
      if (props2.type === "range") {
        if (dayType === "start" || dayType === "end") {
          return t5(dayType);
        }
        if (dayType === "start-end") {
          return `${t5("start")}/${t5("end")}`;
        }
      }
    };
    const renderTitle = () => {
      if (props2.showMonthTitle) {
        return _createVNode44("div", {
          "class": bem39("month-title")
        }, [slots["month-title"] ? slots["month-title"]({
          date: props2.date,
          text: title.value
        }) : title.value]);
      }
    };
    const renderMark = () => {
      if (props2.showMark && shouldRender.value) {
        return _createVNode44("div", {
          "class": bem39("month-mark")
        }, [props2.date.getMonth() + 1]);
      }
    };
    const placeholders = computed25(() => {
      const count = Math.ceil((totalDay.value + offset2.value) / 7);
      return Array(count).fill({
        type: "placeholder"
      });
    });
    const days = computed25(() => {
      const days2 = [];
      const year = props2.date.getFullYear();
      const month = props2.date.getMonth();
      for (let day = 1; day <= totalDay.value; day++) {
        const date = new Date(year, month, day);
        const type = getDayType(date);
        let config = {
          date,
          type,
          text: day,
          bottomInfo: getBottomInfo(type)
        };
        if (props2.formatter) {
          config = props2.formatter(config);
        }
        days2.push(config);
      }
      return days2;
    });
    const disabledDays = computed25(() => days.value.filter((day) => day.type === "disabled"));
    const scrollToDate = (body, targetDate) => {
      if (daysRef.value) {
        const daysRect = useRect(daysRef.value);
        const totalRows = placeholders.value.length;
        const currentRow = Math.ceil((targetDate.getDate() + offset2.value) / 7);
        const rowOffset = (currentRow - 1) * daysRect.height / totalRows;
        setScrollTop(body, daysRect.top + rowOffset + body.scrollTop - useRect(body).top);
      }
    };
    const renderDay = (item, index) => _createVNode44(stdin_default43, {
      "item": item,
      "index": index,
      "color": props2.color,
      "offset": offset2.value,
      "rowHeight": rowHeight.value,
      "onClick": (item2) => emit("click", item2),
      "onClickDisabledDate": (item2) => emit("clickDisabledDate", item2)
    }, pick(slots, ["top-info", "bottom-info"]));
    const renderDays = () => _createVNode44("div", {
      "ref": daysRef,
      "role": "grid",
      "class": bem39("days")
    }, [renderMark(), (shouldRender.value ? days : placeholders).value.map(renderDay)]);
    useExpose({
      getTitle,
      getHeight: () => height2.value,
      setVisible,
      scrollToDate,
      disabledDays
    });
    return () => _createVNode44("div", {
      "class": bem39("month"),
      "ref": monthRef
    }, [renderTitle(), renderDays()]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/calendar/CalendarHeader.mjs
import { createVNode as _createVNode45 } from "vue";
import { computed as computed26, defineComponent as defineComponent43 } from "vue";
var [name43] = createNamespace("calendar-header");
var stdin_default45 = defineComponent43({
  name: name43,
  props: {
    date: Date,
    minDate: Date,
    maxDate: Date,
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number,
    switchMode: makeStringProp("none")
  },
  emits: ["clickSubtitle", "panelChange"],
  setup(props2, {
    slots,
    emit
  }) {
    const prevMonthDisabled = computed26(() => props2.date && props2.minDate && compareMonth(getPrevMonth(props2.date), props2.minDate) < 0);
    const prevYearDisabled = computed26(() => props2.date && props2.minDate && compareMonth(getPrevYear(props2.date), props2.minDate) < 0);
    const nextMonthDisabled = computed26(() => props2.date && props2.maxDate && compareMonth(getNextMonth(props2.date), props2.maxDate) > 0);
    const nextYearDisabled = computed26(() => props2.date && props2.maxDate && compareMonth(getNextYear(props2.date), props2.maxDate) > 0);
    const renderTitle = () => {
      if (props2.showTitle) {
        const text = props2.title || t5("title");
        const title = slots.title ? slots.title() : text;
        return _createVNode45("div", {
          "class": bem39("header-title")
        }, [title]);
      }
    };
    const onClickSubtitle = (event) => emit("clickSubtitle", event);
    const onPanelChange = (date) => emit("panelChange", date);
    const renderAction = (isNext) => {
      const showYearAction = props2.switchMode === "year-month";
      const monthSlot = slots[isNext ? "next-month" : "prev-month"];
      const yearSlot = slots[isNext ? "next-year" : "prev-year"];
      const monthDisabled = isNext ? nextMonthDisabled.value : prevMonthDisabled.value;
      const yearDisabled = isNext ? nextYearDisabled.value : prevYearDisabled.value;
      const monthIconName = isNext ? "arrow" : "arrow-left";
      const yearIconName = isNext ? "arrow-double-right" : "arrow-double-left";
      const onMonthChange = () => onPanelChange((isNext ? getNextMonth : getPrevMonth)(props2.date));
      const onYearChange = () => onPanelChange((isNext ? getNextYear : getPrevYear)(props2.date));
      const MonthAction = _createVNode45("view", {
        "class": bem39("header-action", {
          disabled: monthDisabled
        }),
        "onClick": monthDisabled ? void 0 : onMonthChange
      }, [monthSlot ? monthSlot({
        disabled: monthDisabled
      }) : _createVNode45(Icon, {
        "class": {
          [HAPTICS_FEEDBACK]: !monthDisabled
        },
        "name": monthIconName
      }, null)]);
      const YearAction = showYearAction && _createVNode45("view", {
        "class": bem39("header-action", {
          disabled: yearDisabled
        }),
        "onClick": yearDisabled ? void 0 : onYearChange
      }, [yearSlot ? yearSlot({
        disabled: yearDisabled
      }) : _createVNode45(Icon, {
        "class": {
          [HAPTICS_FEEDBACK]: !yearDisabled
        },
        "name": yearIconName
      }, null)]);
      return isNext ? [MonthAction, YearAction] : [YearAction, MonthAction];
    };
    const renderSubtitle = () => {
      if (props2.showSubtitle) {
        const title = slots.subtitle ? slots.subtitle({
          date: props2.date,
          text: props2.subtitle
        }) : props2.subtitle;
        const canSwitch = props2.switchMode !== "none";
        return _createVNode45("div", {
          "class": bem39("header-subtitle", {
            "with-swicth": canSwitch
          }),
          "onClick": onClickSubtitle
        }, [canSwitch ? [renderAction(), _createVNode45("div", {
          "class": bem39("header-subtitle-text")
        }, [title]), renderAction(true)] : title]);
      }
    };
    const renderWeekDays = () => {
      const {
        firstDayOfWeek
      } = props2;
      const weekdays = t5("weekdays");
      const renderWeekDays2 = [...weekdays.slice(firstDayOfWeek, 7), ...weekdays.slice(0, firstDayOfWeek)];
      return _createVNode45("div", {
        "class": bem39("weekdays")
      }, [renderWeekDays2.map((text) => _createVNode45("span", {
        "class": bem39("weekday")
      }, [text]))]);
    };
    return () => _createVNode45("div", {
      "class": bem39("header")
    }, [renderTitle(), renderSubtitle(), renderWeekDays()]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/calendar/Calendar.mjs
var calendarProps = {
  show: Boolean,
  type: makeStringProp("single"),
  switchMode: makeStringProp("none"),
  title: String,
  color: String,
  round: truthProp,
  readonly: Boolean,
  poppable: truthProp,
  maxRange: makeNumericProp(null),
  position: makeStringProp("bottom"),
  teleport: [String, Object],
  showMark: truthProp,
  showTitle: truthProp,
  formatter: Function,
  rowHeight: numericProp,
  confirmText: String,
  rangePrompt: String,
  lazyRender: truthProp,
  showConfirm: truthProp,
  defaultDate: [Date, Array],
  allowSameDay: Boolean,
  showSubtitle: truthProp,
  closeOnPopstate: truthProp,
  showRangePrompt: truthProp,
  confirmDisabledText: String,
  closeOnClickOverlay: truthProp,
  safeAreaInsetTop: Boolean,
  safeAreaInsetBottom: truthProp,
  minDate: {
    type: Date,
    validator: isDate
  },
  maxDate: {
    type: Date,
    validator: isDate
  },
  firstDayOfWeek: {
    type: numericProp,
    default: 0,
    validator: (val) => val >= 0 && val <= 6
  }
};
var stdin_default46 = defineComponent44({
  name: name40,
  props: calendarProps,
  emits: ["select", "confirm", "unselect", "monthShow", "overRange", "update:show", "clickSubtitle", "clickDisabledDate", "panelChange"],
  setup(props2, {
    emit,
    slots
  }) {
    const canSwitch = computed27(() => props2.switchMode !== "none");
    const minDate = computed27(() => {
      if (!props2.minDate && !canSwitch.value) {
        return getToday();
      }
      return props2.minDate;
    });
    const maxDate = computed27(() => {
      if (!props2.maxDate && !canSwitch.value) {
        return getMonthByOffset(getToday(), 6);
      }
      return props2.maxDate;
    });
    const limitDateRange = (date, min = minDate.value, max = maxDate.value) => {
      if (min && compareDay(date, min) === -1) {
        return min;
      }
      if (max && compareDay(date, max) === 1) {
        return max;
      }
      return date;
    };
    const getInitialDate = (defaultDate = props2.defaultDate) => {
      const {
        type,
        allowSameDay
      } = props2;
      if (defaultDate === null) {
        return defaultDate;
      }
      const now = getToday();
      if (type === "range") {
        if (!Array.isArray(defaultDate)) {
          defaultDate = [];
        }
        const min = minDate.value;
        const max = maxDate.value;
        const start2 = limitDateRange(defaultDate[0] || now, min, max ? allowSameDay ? max : getPrevDay(max) : void 0);
        const end2 = limitDateRange(defaultDate[1] || (allowSameDay ? now : getNextDay(now)), min ? allowSameDay ? min : getNextDay(min) : void 0);
        return [start2, end2];
      }
      if (type === "multiple") {
        if (Array.isArray(defaultDate)) {
          return defaultDate.map((date) => limitDateRange(date));
        }
        return [limitDateRange(now)];
      }
      if (!defaultDate || Array.isArray(defaultDate)) {
        defaultDate = now;
      }
      return limitDateRange(defaultDate);
    };
    const getInitialPanelDate = () => {
      const date = Array.isArray(currentDate.value) ? currentDate.value[0] : currentDate.value;
      return date ? date : limitDateRange(getToday());
    };
    let bodyHeight;
    const bodyRef = ref32();
    const currentDate = ref32(getInitialDate());
    const currentPanelDate = ref32(getInitialPanelDate());
    const currentMonthRef = ref32();
    const [monthRefs, setMonthRefs] = useRefs();
    const dayOffset = computed27(() => props2.firstDayOfWeek ? +props2.firstDayOfWeek % 7 : 0);
    const months = computed27(() => {
      const months2 = [];
      if (!minDate.value || !maxDate.value) {
        return months2;
      }
      const cursor = new Date(minDate.value);
      cursor.setDate(1);
      do {
        months2.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      } while (compareMonth(cursor, maxDate.value) !== 1);
      return months2;
    });
    const buttonDisabled = computed27(() => {
      if (currentDate.value) {
        if (props2.type === "range") {
          return !currentDate.value[0] || !currentDate.value[1];
        }
        if (props2.type === "multiple") {
          return !currentDate.value.length;
        }
      }
      return !currentDate.value;
    });
    const getSelectedDate = () => currentDate.value;
    const onScroll = () => {
      const top2 = getScrollTop(bodyRef.value);
      const bottom2 = top2 + bodyHeight;
      const heights = months.value.map((item, index) => monthRefs.value[index].getHeight());
      const heightSum = heights.reduce((a, b) => a + b, 0);
      if (bottom2 > heightSum && top2 > 0) {
        return;
      }
      let height2 = 0;
      let currentMonth;
      const visibleRange = [-1, -1];
      for (let i = 0; i < months.value.length; i++) {
        const month = monthRefs.value[i];
        const visible = height2 <= bottom2 && height2 + heights[i] >= top2;
        if (visible) {
          visibleRange[1] = i;
          if (!currentMonth) {
            currentMonth = month;
            visibleRange[0] = i;
          }
          if (!monthRefs.value[i].showed) {
            monthRefs.value[i].showed = true;
            emit("monthShow", {
              date: month.date,
              title: month.getTitle()
            });
          }
        }
        height2 += heights[i];
      }
      months.value.forEach((month, index) => {
        const visible = index >= visibleRange[0] - 1 && index <= visibleRange[1] + 1;
        monthRefs.value[index].setVisible(visible);
      });
      if (currentMonth) {
        currentMonthRef.value = currentMonth;
      }
    };
    const scrollToDate = (targetDate) => {
      if (canSwitch.value) {
        currentPanelDate.value = targetDate;
      } else {
        raf(() => {
          months.value.some((month, index) => {
            if (compareMonth(month, targetDate) === 0) {
              if (bodyRef.value) {
                monthRefs.value[index].scrollToDate(bodyRef.value, targetDate);
              }
              return true;
            }
            return false;
          });
          onScroll();
        });
      }
    };
    const scrollToCurrentDate = () => {
      if (props2.poppable && !props2.show) {
        return;
      }
      if (currentDate.value) {
        const targetDate = props2.type === "single" ? currentDate.value : currentDate.value[0];
        if (isDate(targetDate)) {
          scrollToDate(targetDate);
        }
      } else if (!canSwitch.value) {
        raf(onScroll);
      }
    };
    const init = () => {
      if (props2.poppable && !props2.show) {
        return;
      }
      if (!canSwitch.value) {
        raf(() => {
          bodyHeight = Math.floor(useRect(bodyRef).height);
        });
      }
      scrollToCurrentDate();
    };
    const reset = (date = getInitialDate()) => {
      currentDate.value = date;
      scrollToCurrentDate();
    };
    const checkRange = (date) => {
      const {
        maxRange,
        rangePrompt,
        showRangePrompt
      } = props2;
      if (maxRange && calcDateNum(date) > +maxRange) {
        if (showRangePrompt) {
          showToast(rangePrompt || t5("rangePrompt", maxRange));
        }
        emit("overRange");
        return false;
      }
      return true;
    };
    const onPanelChange = (date) => {
      currentPanelDate.value = date;
      emit("panelChange", {
        date
      });
    };
    const onConfirm = () => {
      var _a;
      return emit("confirm", (_a = currentDate.value) != null ? _a : cloneDates(currentDate.value));
    };
    const select = (date, complete) => {
      const setCurrentDate = (date2) => {
        currentDate.value = date2;
        emit("select", cloneDates(date2));
      };
      if (complete && props2.type === "range") {
        const valid = checkRange(date);
        if (!valid) {
          setCurrentDate([date[0], getDayByOffset(date[0], +props2.maxRange - 1)]);
          return;
        }
      }
      setCurrentDate(date);
      if (complete && !props2.showConfirm) {
        onConfirm();
      }
    };
    const getDisabledDate = (disabledDays2, startDay, date) => {
      var _a;
      return (_a = disabledDays2.find((day) => compareDay(startDay, day.date) === -1 && compareDay(day.date, date) === -1)) == null ? void 0 : _a.date;
    };
    const disabledDays = computed27(() => monthRefs.value.reduce((arr, ref210) => {
      var _a, _b;
      arr.push(...(_b = (_a = ref210.disabledDays) == null ? void 0 : _a.value) != null ? _b : []);
      return arr;
    }, []));
    const onClickDay = (item) => {
      if (props2.readonly || !item.date) {
        return;
      }
      const {
        date
      } = item;
      const {
        type
      } = props2;
      if (type === "range") {
        if (!currentDate.value) {
          select([date]);
          return;
        }
        const [startDay, endDay] = currentDate.value;
        if (startDay && !endDay) {
          const compareToStart = compareDay(date, startDay);
          if (compareToStart === 1) {
            const disabledDay = getDisabledDate(disabledDays.value, startDay, date);
            if (disabledDay) {
              const endDay2 = getPrevDay(disabledDay);
              if (compareDay(startDay, endDay2) === -1) {
                select([startDay, endDay2]);
              } else {
                select([date]);
              }
            } else {
              select([startDay, date], true);
            }
          } else if (compareToStart === -1) {
            select([date]);
          } else if (props2.allowSameDay) {
            select([date, date], true);
          }
        } else {
          select([date]);
        }
      } else if (type === "multiple") {
        if (!currentDate.value) {
          select([date]);
          return;
        }
        const dates = currentDate.value;
        const selectedIndex = dates.findIndex((dateItem) => compareDay(dateItem, date) === 0);
        if (selectedIndex !== -1) {
          const [unselectedDate] = dates.splice(selectedIndex, 1);
          emit("unselect", cloneDate(unselectedDate));
        } else if (props2.maxRange && dates.length >= +props2.maxRange) {
          showToast(props2.rangePrompt || t5("rangePrompt", props2.maxRange));
        } else {
          select([...dates, date]);
        }
      } else {
        select(date, true);
      }
    };
    const updateShow = (value) => emit("update:show", value);
    const renderMonth = (date, index) => {
      const showMonthTitle = index !== 0 || !props2.showSubtitle;
      return _createVNode46(stdin_default44, _mergeProps14({
        "ref": canSwitch.value ? currentMonthRef : setMonthRefs(index),
        "date": date,
        "currentDate": currentDate.value,
        "showMonthTitle": showMonthTitle,
        "firstDayOfWeek": dayOffset.value,
        "lazyRender": canSwitch.value ? false : props2.lazyRender,
        "maxDate": maxDate.value,
        "minDate": minDate.value
      }, pick(props2, ["type", "color", "showMark", "formatter", "rowHeight", "showSubtitle", "allowSameDay"]), {
        "onClick": onClickDay,
        "onClickDisabledDate": (item) => emit("clickDisabledDate", item)
      }), pick(slots, ["top-info", "bottom-info", "month-title"]));
    };
    const renderFooterButton = () => {
      if (slots.footer) {
        return slots.footer();
      }
      if (props2.showConfirm) {
        const slot = slots["confirm-text"];
        const disabled = buttonDisabled.value;
        const text = disabled ? props2.confirmDisabledText : props2.confirmText;
        return _createVNode46(Button, {
          "round": true,
          "block": true,
          "type": "primary",
          "color": props2.color,
          "class": bem39("confirm"),
          "disabled": disabled,
          "nativeType": "button",
          "onClick": onConfirm
        }, {
          default: () => [slot ? slot({
            disabled
          }) : text || t5("confirm")]
        });
      }
    };
    const renderFooter = () => _createVNode46("div", {
      "class": [bem39("footer"), {
        "van-safe-area-bottom": props2.safeAreaInsetBottom
      }]
    }, [renderFooterButton()]);
    const renderCalendar = () => {
      var _a, _b;
      return _createVNode46("div", {
        "class": bem39()
      }, [_createVNode46(stdin_default45, {
        "date": (_a = currentMonthRef.value) == null ? void 0 : _a.date,
        "maxDate": maxDate.value,
        "minDate": minDate.value,
        "title": props2.title,
        "subtitle": (_b = currentMonthRef.value) == null ? void 0 : _b.getTitle(),
        "showTitle": props2.showTitle,
        "showSubtitle": props2.showSubtitle,
        "switchMode": props2.switchMode,
        "firstDayOfWeek": dayOffset.value,
        "onClickSubtitle": (event) => emit("clickSubtitle", event),
        "onPanelChange": onPanelChange
      }, pick(slots, ["title", "subtitle", "prev-month", "prev-year", "next-month", "next-year"])), _createVNode46("div", {
        "ref": bodyRef,
        "class": bem39("body"),
        "onScroll": canSwitch.value ? void 0 : onScroll
      }, [canSwitch.value ? renderMonth(currentPanelDate.value, 0) : months.value.map(renderMonth)]), renderFooter()]);
    };
    watch26(() => props2.show, init);
    watch26(() => [props2.type, props2.minDate, props2.maxDate, props2.switchMode], () => reset(getInitialDate(currentDate.value)));
    watch26(() => props2.defaultDate, (value = null) => {
      currentDate.value = value;
      scrollToCurrentDate();
    });
    useExpose({
      reset,
      scrollToDate,
      getSelectedDate
    });
    onMountedOrActivated(init);
    return () => {
      if (props2.poppable) {
        return _createVNode46(Popup, {
          "show": props2.show,
          "class": bem39("popup"),
          "round": props2.round,
          "position": props2.position,
          "closeable": props2.showTitle || props2.showSubtitle,
          "teleport": props2.teleport,
          "closeOnPopstate": props2.closeOnPopstate,
          "safeAreaInsetTop": props2.safeAreaInsetTop,
          "closeOnClickOverlay": props2.closeOnClickOverlay,
          "onUpdate:show": updateShow
        }, {
          default: renderCalendar
        });
      }
      return renderCalendar();
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/calendar/index.mjs
var Calendar = withInstall(stdin_default46);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/card/Card.mjs
import { createTextVNode as _createTextVNode2, Fragment as _Fragment3, createVNode as _createVNode48 } from "vue";
import { defineComponent as defineComponent46 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/image/Image.mjs
import { withDirectives as _withDirectives5, mergeProps as _mergeProps15, resolveDirective as _resolveDirective, createVNode as _createVNode47 } from "vue";
import { ref as ref33, watch as watch27, computed as computed28, nextTick as nextTick15, onMounted as onMounted12, onBeforeUnmount as onBeforeUnmount6, defineComponent as defineComponent45, getCurrentInstance as getCurrentInstance9 } from "vue";
var [name44, bem40] = createNamespace("image");
var imageProps = {
  src: String,
  alt: String,
  fit: String,
  position: String,
  round: Boolean,
  block: Boolean,
  width: numericProp,
  height: numericProp,
  radius: numericProp,
  lazyLoad: Boolean,
  iconSize: numericProp,
  showError: truthProp,
  errorIcon: makeStringProp("photo-fail"),
  iconPrefix: String,
  showLoading: truthProp,
  loadingIcon: makeStringProp("photo"),
  crossorigin: String,
  referrerpolicy: String
};
var stdin_default47 = defineComponent45({
  name: name44,
  props: imageProps,
  emits: ["load", "error"],
  setup(props2, {
    emit,
    slots
  }) {
    const error = ref33(false);
    const loading = ref33(true);
    const imageRef = ref33();
    const {
      $Lazyload
    } = getCurrentInstance9().proxy;
    const style = computed28(() => {
      const style2 = {
        width: addUnit(props2.width),
        height: addUnit(props2.height)
      };
      if (isDef(props2.radius)) {
        style2.overflow = "hidden";
        style2.borderRadius = addUnit(props2.radius);
      }
      return style2;
    });
    watch27(() => props2.src, () => {
      error.value = false;
      loading.value = true;
    });
    const onLoad = (event) => {
      if (loading.value) {
        loading.value = false;
        emit("load", event);
      }
    };
    const triggerLoad = () => {
      const loadEvent = new Event("load");
      Object.defineProperty(loadEvent, "target", {
        value: imageRef.value,
        enumerable: true
      });
      onLoad(loadEvent);
    };
    const onError = (event) => {
      error.value = true;
      loading.value = false;
      emit("error", event);
    };
    const renderIcon = (name210, className, slot) => {
      if (slot) {
        return slot();
      }
      return _createVNode47(Icon, {
        "name": name210,
        "size": props2.iconSize,
        "class": className,
        "classPrefix": props2.iconPrefix
      }, null);
    };
    const renderPlaceholder = () => {
      if (loading.value && props2.showLoading) {
        return _createVNode47("div", {
          "class": bem40("loading")
        }, [renderIcon(props2.loadingIcon, bem40("loading-icon"), slots.loading)]);
      }
      if (error.value && props2.showError) {
        return _createVNode47("div", {
          "class": bem40("error")
        }, [renderIcon(props2.errorIcon, bem40("error-icon"), slots.error)]);
      }
    };
    const renderImage = () => {
      if (error.value || !props2.src) {
        return;
      }
      const attrs = {
        alt: props2.alt,
        class: bem40("img"),
        style: {
          objectFit: props2.fit,
          objectPosition: props2.position
        },
        crossorigin: props2.crossorigin,
        referrerpolicy: props2.referrerpolicy
      };
      if (props2.lazyLoad) {
        return _withDirectives5(_createVNode47("img", _mergeProps15({
          "ref": imageRef
        }, attrs), null), [[_resolveDirective("lazy"), props2.src]]);
      }
      return _createVNode47("img", _mergeProps15({
        "ref": imageRef,
        "src": props2.src,
        "onLoad": onLoad,
        "onError": onError
      }, attrs), null);
    };
    const onLazyLoaded = ({
      el
    }) => {
      const check = () => {
        if (el === imageRef.value && loading.value) {
          triggerLoad();
        }
      };
      if (imageRef.value) {
        check();
      } else {
        nextTick15(check);
      }
    };
    const onLazyLoadError = ({
      el
    }) => {
      if (el === imageRef.value && !error.value) {
        onError();
      }
    };
    if ($Lazyload && inBrowser) {
      $Lazyload.$on("loaded", onLazyLoaded);
      $Lazyload.$on("error", onLazyLoadError);
      onBeforeUnmount6(() => {
        $Lazyload.$off("loaded", onLazyLoaded);
        $Lazyload.$off("error", onLazyLoadError);
      });
    }
    onMounted12(() => {
      nextTick15(() => {
        var _a;
        if (((_a = imageRef.value) == null ? void 0 : _a.complete) && !props2.lazyLoad) {
          triggerLoad();
        }
      });
    });
    return () => {
      var _a;
      return _createVNode47("div", {
        "class": bem40({
          round: props2.round,
          block: props2.block
        }),
        "style": style.value
      }, [renderImage(), renderPlaceholder(), (_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/image/index.mjs
var Image2 = withInstall(stdin_default47);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/card/Card.mjs
var [name45, bem41] = createNamespace("card");
var cardProps = {
  tag: String,
  num: numericProp,
  desc: String,
  thumb: String,
  title: String,
  price: numericProp,
  centered: Boolean,
  lazyLoad: Boolean,
  currency: makeStringProp("¥"),
  thumbLink: String,
  originPrice: numericProp
};
var stdin_default48 = defineComponent46({
  name: name45,
  props: cardProps,
  emits: ["clickThumb"],
  setup(props2, {
    slots,
    emit
  }) {
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      if (props2.title) {
        return _createVNode48("div", {
          "class": [bem41("title"), "van-multi-ellipsis--l2"]
        }, [props2.title]);
      }
    };
    const renderThumbTag = () => {
      if (slots.tag || props2.tag) {
        return _createVNode48("div", {
          "class": bem41("tag")
        }, [slots.tag ? slots.tag() : _createVNode48(Tag, {
          "mark": true,
          "type": "primary"
        }, {
          default: () => [props2.tag]
        })]);
      }
    };
    const renderThumbImage = () => {
      if (slots.thumb) {
        return slots.thumb();
      }
      return _createVNode48(Image2, {
        "src": props2.thumb,
        "fit": "cover",
        "width": "100%",
        "height": "100%",
        "lazyLoad": props2.lazyLoad
      }, null);
    };
    const renderThumb = () => {
      if (slots.thumb || props2.thumb) {
        return _createVNode48("a", {
          "href": props2.thumbLink,
          "class": bem41("thumb"),
          "onClick": (event) => emit("clickThumb", event)
        }, [renderThumbImage(), renderThumbTag()]);
      }
    };
    const renderDesc = () => {
      if (slots.desc) {
        return slots.desc();
      }
      if (props2.desc) {
        return _createVNode48("div", {
          "class": [bem41("desc"), "van-ellipsis"]
        }, [props2.desc]);
      }
    };
    const renderPriceText = () => {
      const priceArr = props2.price.toString().split(".");
      return _createVNode48("div", null, [_createVNode48("span", {
        "class": bem41("price-currency")
      }, [props2.currency]), _createVNode48("span", {
        "class": bem41("price-integer")
      }, [priceArr[0]]), priceArr.length > 1 && _createVNode48(_Fragment3, null, [_createTextVNode2("."), _createVNode48("span", {
        "class": bem41("price-decimal")
      }, [priceArr[1]])])]);
    };
    return () => {
      var _a, _b, _c;
      const showNum = slots.num || isDef(props2.num);
      const showPrice = slots.price || isDef(props2.price);
      const showOriginPrice = slots["origin-price"] || isDef(props2.originPrice);
      const showBottom = showNum || showPrice || showOriginPrice || slots.bottom;
      const Price = showPrice && _createVNode48("div", {
        "class": bem41("price")
      }, [slots.price ? slots.price() : renderPriceText()]);
      const OriginPrice = showOriginPrice && _createVNode48("div", {
        "class": bem41("origin-price")
      }, [slots["origin-price"] ? slots["origin-price"]() : `${props2.currency} ${props2.originPrice}`]);
      const Num = showNum && _createVNode48("div", {
        "class": bem41("num")
      }, [slots.num ? slots.num() : `x${props2.num}`]);
      const Footer = slots.footer && _createVNode48("div", {
        "class": bem41("footer")
      }, [slots.footer()]);
      const Bottom = showBottom && _createVNode48("div", {
        "class": bem41("bottom")
      }, [(_a = slots["price-top"]) == null ? void 0 : _a.call(slots), Price, OriginPrice, Num, (_b = slots.bottom) == null ? void 0 : _b.call(slots)]);
      return _createVNode48("div", {
        "class": bem41()
      }, [_createVNode48("div", {
        "class": bem41("header")
      }, [renderThumb(), _createVNode48("div", {
        "class": bem41("content", {
          centered: props2.centered
        })
      }, [_createVNode48("div", null, [renderTitle(), renderDesc(), (_c = slots.tags) == null ? void 0 : _c.call(slots)]), Bottom])]), Footer]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/card/index.mjs
var Card = withInstall(stdin_default48);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/cascader/Cascader.mjs
import { createVNode as _createVNode49 } from "vue";
import { ref as ref34, watch as watch28, nextTick as nextTick16, defineComponent as defineComponent47 } from "vue";
var [name46, bem42, t6] = createNamespace("cascader");
var cascaderProps = {
  title: String,
  options: makeArrayProp(),
  closeable: truthProp,
  swipeable: truthProp,
  closeIcon: makeStringProp("cross"),
  showHeader: truthProp,
  modelValue: numericProp,
  fieldNames: Object,
  placeholder: String,
  activeColor: String
};
var stdin_default49 = defineComponent47({
  name: name46,
  props: cascaderProps,
  emits: ["close", "change", "finish", "clickTab", "update:modelValue"],
  setup(props2, {
    slots,
    emit
  }) {
    const tabs = ref34([]);
    const activeTab = ref34(0);
    const [selectedElementRefs, setSelectedElementRefs] = useRefs();
    const {
      text: textKey,
      value: valueKey,
      children: childrenKey
    } = extend({
      text: "text",
      value: "value",
      children: "children"
    }, props2.fieldNames);
    const getSelectedOptionsByValue = (options, value) => {
      for (const option of options) {
        if (option[valueKey] === value) {
          return [option];
        }
        if (option[childrenKey]) {
          const selectedOptions = getSelectedOptionsByValue(option[childrenKey], value);
          if (selectedOptions) {
            return [option, ...selectedOptions];
          }
        }
      }
    };
    const updateTabs = () => {
      const {
        options,
        modelValue
      } = props2;
      if (modelValue !== void 0) {
        const selectedOptions = getSelectedOptionsByValue(options, modelValue);
        if (selectedOptions) {
          let optionsCursor = options;
          tabs.value = selectedOptions.map((option) => {
            const tab = {
              options: optionsCursor,
              selected: option
            };
            const next = optionsCursor.find((item) => item[valueKey] === option[valueKey]);
            if (next) {
              optionsCursor = next[childrenKey];
            }
            return tab;
          });
          if (optionsCursor) {
            tabs.value.push({
              options: optionsCursor,
              selected: null
            });
          }
          nextTick16(() => {
            activeTab.value = tabs.value.length - 1;
          });
          return;
        }
      }
      tabs.value = [{
        options,
        selected: null
      }];
    };
    const onSelect = (option, tabIndex) => {
      if (option.disabled) {
        return;
      }
      tabs.value[tabIndex].selected = option;
      if (tabs.value.length > tabIndex + 1) {
        tabs.value = tabs.value.slice(0, tabIndex + 1);
      }
      if (option[childrenKey]) {
        const nextTab = {
          options: option[childrenKey],
          selected: null
        };
        if (tabs.value[tabIndex + 1]) {
          tabs.value[tabIndex + 1] = nextTab;
        } else {
          tabs.value.push(nextTab);
        }
        nextTick16(() => {
          activeTab.value++;
        });
      }
      const selectedOptions = tabs.value.map((tab) => tab.selected).filter(Boolean);
      emit("update:modelValue", option[valueKey]);
      const params = {
        value: option[valueKey],
        tabIndex,
        selectedOptions
      };
      emit("change", params);
      if (!option[childrenKey]) {
        emit("finish", params);
      }
    };
    const onClose = () => emit("close");
    const onClickTab = ({
      name: name210,
      title
    }) => emit("clickTab", name210, title);
    const renderHeader = () => props2.showHeader ? _createVNode49("div", {
      "class": bem42("header")
    }, [_createVNode49("h2", {
      "class": bem42("title")
    }, [slots.title ? slots.title() : props2.title]), props2.closeable ? _createVNode49(Icon, {
      "name": props2.closeIcon,
      "class": [bem42("close-icon"), HAPTICS_FEEDBACK],
      "onClick": onClose
    }, null) : null]) : null;
    const renderOption = (option, selectedOption, tabIndex) => {
      const {
        disabled
      } = option;
      const selected = !!(selectedOption && option[valueKey] === selectedOption[valueKey]);
      const color = option.color || (selected ? props2.activeColor : void 0);
      const Text2 = slots.option ? slots.option({
        option,
        selected
      }) : _createVNode49("span", null, [option[textKey]]);
      return _createVNode49("li", {
        "ref": selected ? setSelectedElementRefs(tabIndex) : void 0,
        "role": "menuitemradio",
        "class": [bem42("option", {
          selected,
          disabled
        }), option.className],
        "style": {
          color
        },
        "tabindex": disabled ? void 0 : selected ? 0 : -1,
        "aria-checked": selected,
        "aria-disabled": disabled || void 0,
        "onClick": () => onSelect(option, tabIndex)
      }, [Text2, selected ? _createVNode49(Icon, {
        "name": "success",
        "class": bem42("selected-icon")
      }, null) : null]);
    };
    const renderOptions = (options, selectedOption, tabIndex) => _createVNode49("ul", {
      "role": "menu",
      "class": bem42("options")
    }, [options.map((option) => renderOption(option, selectedOption, tabIndex))]);
    const renderTab = (tab, tabIndex) => {
      const {
        options,
        selected
      } = tab;
      const placeholder = props2.placeholder || t6("select");
      const title = selected ? selected[textKey] : placeholder;
      return _createVNode49(Tab, {
        "title": title,
        "titleClass": bem42("tab", {
          unselected: !selected
        })
      }, {
        default: () => {
          var _a, _b;
          return [(_a = slots["options-top"]) == null ? void 0 : _a.call(slots, {
            tabIndex
          }), renderOptions(options, selected, tabIndex), (_b = slots["options-bottom"]) == null ? void 0 : _b.call(slots, {
            tabIndex
          })];
        }
      });
    };
    const renderTabs = () => _createVNode49(Tabs, {
      "active": activeTab.value,
      "onUpdate:active": ($event) => activeTab.value = $event,
      "shrink": true,
      "animated": true,
      "class": bem42("tabs"),
      "color": props2.activeColor,
      "swipeable": props2.swipeable,
      "onClickTab": onClickTab
    }, {
      default: () => [tabs.value.map(renderTab)]
    });
    const scrollIntoView = (el) => {
      const scrollParent = el.parentElement;
      if (scrollParent) {
        scrollParent.scrollTop = el.offsetTop - (scrollParent.offsetHeight - el.offsetHeight) / 2;
      }
    };
    updateTabs();
    watch28(activeTab, (value) => {
      const el = selectedElementRefs.value[value];
      if (el)
        scrollIntoView(el);
    });
    watch28(() => props2.options, updateTabs, {
      deep: true
    });
    watch28(() => props2.modelValue, (value) => {
      if (value !== void 0) {
        const values = tabs.value.map((tab) => {
          var _a;
          return (_a = tab.selected) == null ? void 0 : _a[valueKey];
        });
        if (values.includes(value)) {
          return;
        }
      }
      updateTabs();
    });
    return () => _createVNode49("div", {
      "class": bem42()
    }, [renderHeader(), renderTabs()]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/cascader/index.mjs
var Cascader = withInstall(stdin_default49);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/cell-group/CellGroup.mjs
import { Fragment as _Fragment4, createVNode as _createVNode50, mergeProps as _mergeProps16 } from "vue";
import { defineComponent as defineComponent48 } from "vue";
var [name47, bem43] = createNamespace("cell-group");
var cellGroupProps = {
  title: String,
  inset: Boolean,
  border: truthProp
};
var stdin_default50 = defineComponent48({
  name: name47,
  inheritAttrs: false,
  props: cellGroupProps,
  setup(props2, {
    slots,
    attrs
  }) {
    const renderGroup = () => {
      var _a;
      return _createVNode50("div", _mergeProps16({
        "class": [bem43({
          inset: props2.inset
        }), {
          [BORDER_TOP_BOTTOM]: props2.border && !props2.inset
        }]
      }, attrs, useScopeId()), [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
    const renderTitle = () => _createVNode50("div", {
      "class": bem43("title", {
        inset: props2.inset
      })
    }, [slots.title ? slots.title() : props2.title]);
    return () => {
      if (props2.title || slots.title) {
        return _createVNode50(_Fragment4, null, [renderTitle(), renderGroup()]);
      }
      return renderGroup();
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/cell-group/index.mjs
var CellGroup = withInstall(stdin_default50);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/circle/Circle.mjs
import { createVNode as _createVNode51 } from "vue";
import { watch as watch29, computed as computed29, defineComponent as defineComponent49 } from "vue";
var [name48, bem44] = createNamespace("circle");
var uid = 0;
var format = (rate) => Math.min(Math.max(+rate, 0), 100);
function getPath(clockwise, viewBoxSize) {
  const sweepFlag = clockwise ? 1 : 0;
  return `M ${viewBoxSize / 2} ${viewBoxSize / 2} m 0, -500 a 500, 500 0 1, ${sweepFlag} 0, 1000 a 500, 500 0 1, ${sweepFlag} 0, -1000`;
}
var circleProps = {
  text: String,
  size: numericProp,
  fill: makeStringProp("none"),
  rate: makeNumericProp(100),
  speed: makeNumericProp(0),
  color: [String, Object],
  clockwise: truthProp,
  layerColor: String,
  currentRate: makeNumberProp(0),
  strokeWidth: makeNumericProp(40),
  strokeLinecap: String,
  startPosition: makeStringProp("top")
};
var stdin_default51 = defineComponent49({
  name: name48,
  props: circleProps,
  emits: ["update:currentRate"],
  setup(props2, {
    emit,
    slots
  }) {
    const id = `van-circle-${uid++}`;
    const viewBoxSize = computed29(() => +props2.strokeWidth + 1e3);
    const path = computed29(() => getPath(props2.clockwise, viewBoxSize.value));
    const svgStyle = computed29(() => {
      const ROTATE_ANGLE_MAP = {
        top: 0,
        right: 90,
        bottom: 180,
        left: 270
      };
      const angleValue = ROTATE_ANGLE_MAP[props2.startPosition];
      if (angleValue) {
        return {
          transform: `rotate(${angleValue}deg)`
        };
      }
    });
    watch29(() => props2.rate, (rate) => {
      let rafId;
      const startTime = Date.now();
      const startRate = props2.currentRate;
      const endRate = format(rate);
      const duration = Math.abs((startRate - endRate) * 1e3 / +props2.speed);
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const rate2 = progress * (endRate - startRate) + startRate;
        emit("update:currentRate", format(parseFloat(rate2.toFixed(1))));
        if (endRate > startRate ? rate2 < endRate : rate2 > endRate) {
          rafId = raf(animate);
        }
      };
      if (props2.speed) {
        if (rafId) {
          cancelRaf(rafId);
        }
        rafId = raf(animate);
      } else {
        emit("update:currentRate", endRate);
      }
    }, {
      immediate: true
    });
    const renderHover = () => {
      const PERIMETER = 3140;
      const {
        strokeWidth,
        currentRate,
        strokeLinecap
      } = props2;
      const offset2 = PERIMETER * currentRate / 100;
      const color = isObject(props2.color) ? `url(#${id})` : props2.color;
      const style = {
        stroke: color,
        strokeWidth: `${+strokeWidth + 1}px`,
        strokeLinecap,
        strokeDasharray: `${offset2}px ${PERIMETER}px`
      };
      return _createVNode51("path", {
        "d": path.value,
        "style": style,
        "class": bem44("hover"),
        "stroke": color
      }, null);
    };
    const renderLayer = () => {
      const style = {
        fill: props2.fill,
        stroke: props2.layerColor,
        strokeWidth: `${props2.strokeWidth}px`
      };
      return _createVNode51("path", {
        "class": bem44("layer"),
        "style": style,
        "d": path.value
      }, null);
    };
    const renderGradient = () => {
      const {
        color
      } = props2;
      if (!isObject(color)) {
        return;
      }
      const Stops = Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b)).map((key, index) => _createVNode51("stop", {
        "key": index,
        "offset": key,
        "stop-color": color[key]
      }, null));
      return _createVNode51("defs", null, [_createVNode51("linearGradient", {
        "id": id,
        "x1": "100%",
        "y1": "0%",
        "x2": "0%",
        "y2": "0%"
      }, [Stops])]);
    };
    const renderText = () => {
      if (slots.default) {
        return slots.default();
      }
      if (props2.text) {
        return _createVNode51("div", {
          "class": bem44("text")
        }, [props2.text]);
      }
    };
    return () => _createVNode51("div", {
      "class": bem44(),
      "style": getSizeStyle(props2.size)
    }, [_createVNode51("svg", {
      "viewBox": `0 0 ${viewBoxSize.value} ${viewBoxSize.value}`,
      "style": svgStyle.value
    }, [renderGradient(), renderLayer(), renderHover()]), renderText()]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/circle/index.mjs
var Circle = withInstall(stdin_default51);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/col/Col.mjs
import { createVNode as _createVNode53 } from "vue";
import { computed as computed31, defineComponent as defineComponent51 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/row/Row.mjs
import { createVNode as _createVNode52 } from "vue";
import { computed as computed30, defineComponent as defineComponent50 } from "vue";
var [name49, bem45] = createNamespace("row");
var ROW_KEY = Symbol(name49);
var rowProps = {
  tag: makeStringProp("div"),
  wrap: truthProp,
  align: String,
  gutter: {
    type: [String, Number, Array],
    default: 0
  },
  justify: String
};
var stdin_default52 = defineComponent50({
  name: name49,
  props: rowProps,
  setup(props2, {
    slots
  }) {
    const {
      children,
      linkChildren
    } = useChildren(ROW_KEY);
    const groups = computed30(() => {
      const groups2 = [[]];
      let totalSpan = 0;
      children.forEach((child, index) => {
        totalSpan += Number(child.span);
        if (totalSpan > 24) {
          groups2.push([index]);
          totalSpan -= 24;
        } else {
          groups2[groups2.length - 1].push(index);
        }
      });
      return groups2;
    });
    const spaces = computed30(() => {
      let gutter = 0;
      if (Array.isArray(props2.gutter)) {
        gutter = Number(props2.gutter[0]) || 0;
      } else {
        gutter = Number(props2.gutter);
      }
      const spaces2 = [];
      if (!gutter) {
        return spaces2;
      }
      groups.value.forEach((group) => {
        const averagePadding = gutter * (group.length - 1) / group.length;
        group.forEach((item, index) => {
          if (index === 0) {
            spaces2.push({
              right: averagePadding
            });
          } else {
            const left2 = gutter - spaces2[item - 1].right;
            const right2 = averagePadding - left2;
            spaces2.push({
              left: left2,
              right: right2
            });
          }
        });
      });
      return spaces2;
    });
    const verticalSpaces = computed30(() => {
      const {
        gutter
      } = props2;
      const spaces2 = [];
      if (Array.isArray(gutter) && gutter.length > 1) {
        const bottom2 = Number(gutter[1]) || 0;
        if (bottom2 <= 0) {
          return spaces2;
        }
        groups.value.forEach((group, index) => {
          if (index === groups.value.length - 1)
            return;
          group.forEach(() => {
            spaces2.push({
              bottom: bottom2
            });
          });
        });
      }
      return spaces2;
    });
    linkChildren({
      spaces,
      verticalSpaces
    });
    return () => {
      const {
        tag,
        wrap,
        align,
        justify
      } = props2;
      return _createVNode52(tag, {
        "class": bem45({
          [`align-${align}`]: align,
          [`justify-${justify}`]: justify,
          nowrap: !wrap
        })
      }, {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      });
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/col/Col.mjs
var [name50, bem46] = createNamespace("col");
var colProps = {
  tag: makeStringProp("div"),
  span: makeNumericProp(0),
  offset: numericProp
};
var stdin_default53 = defineComponent51({
  name: name50,
  props: colProps,
  setup(props2, {
    slots
  }) {
    const {
      parent,
      index
    } = useParent(ROW_KEY);
    const style = computed31(() => {
      if (!parent) {
        return;
      }
      const {
        spaces,
        verticalSpaces
      } = parent;
      let styles = {};
      if (spaces && spaces.value && spaces.value[index.value]) {
        const {
          left: left2,
          right: right2
        } = spaces.value[index.value];
        styles = {
          paddingLeft: left2 ? `${left2}px` : null,
          paddingRight: right2 ? `${right2}px` : null
        };
      }
      const {
        bottom: bottom2
      } = verticalSpaces.value[index.value] || {};
      return extend(styles, {
        marginBottom: bottom2 ? `${bottom2}px` : null
      });
    });
    return () => {
      const {
        tag,
        span,
        offset: offset2
      } = props2;
      return _createVNode53(tag, {
        "style": style.value,
        "class": bem46({
          [span]: span,
          [`offset-${offset2}`]: offset2
        })
      }, {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      });
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/col/index.mjs
var Col = withInstall(stdin_default53);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/collapse/Collapse.mjs
import { createVNode as _createVNode54 } from "vue";
import { defineComponent as defineComponent52 } from "vue";
var [name51, bem47] = createNamespace("collapse");
var COLLAPSE_KEY = Symbol(name51);
var collapseProps = {
  border: truthProp,
  accordion: Boolean,
  modelValue: {
    type: [String, Number, Array],
    default: ""
  }
};
function validateModelValue(modelValue, accordion) {
  if (accordion && Array.isArray(modelValue)) {
    console.error('[Vant] Collapse: "v-model" should not be Array in accordion mode');
    return false;
  }
  if (!accordion && !Array.isArray(modelValue)) {
    console.error('[Vant] Collapse: "v-model" should be Array in non-accordion mode');
    return false;
  }
  return true;
}
var stdin_default54 = defineComponent52({
  name: name51,
  props: collapseProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      linkChildren,
      children
    } = useChildren(COLLAPSE_KEY);
    const updateName = (name210) => {
      emit("change", name210);
      emit("update:modelValue", name210);
    };
    const toggle = (name210, expanded) => {
      const {
        accordion,
        modelValue
      } = props2;
      if (accordion) {
        updateName(name210 === modelValue ? "" : name210);
      } else if (expanded) {
        updateName(modelValue.concat(name210));
      } else {
        updateName(modelValue.filter((activeName) => activeName !== name210));
      }
    };
    const toggleAll = (options = {}) => {
      if (props2.accordion) {
        return;
      }
      if (typeof options === "boolean") {
        options = {
          expanded: options
        };
      }
      const {
        expanded,
        skipDisabled
      } = options;
      const expandedChildren = children.filter((item) => {
        if (item.disabled && skipDisabled) {
          return item.expanded.value;
        }
        return expanded != null ? expanded : !item.expanded.value;
      });
      const names = expandedChildren.map((item) => item.itemName.value);
      updateName(names);
    };
    const isExpanded = (name210) => {
      const {
        accordion,
        modelValue
      } = props2;
      if (!validateModelValue(modelValue, accordion)) {
        return false;
      }
      return accordion ? modelValue === name210 : modelValue.includes(name210);
    };
    useExpose({
      toggleAll
    });
    linkChildren({
      toggle,
      isExpanded
    });
    return () => {
      var _a;
      return _createVNode54("div", {
        "class": [bem47(), {
          [BORDER_TOP_BOTTOM]: props2.border
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/collapse/index.mjs
var Collapse = withInstall(stdin_default54);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/collapse-item/CollapseItem.mjs
import { withDirectives as _withDirectives6, vShow as _vShow5, createVNode as _createVNode55, mergeProps as _mergeProps17 } from "vue";
import { ref as ref35, watch as watch30, computed as computed32, nextTick as nextTick17, defineComponent as defineComponent53 } from "vue";
var [name52, bem48] = createNamespace("collapse-item");
var CELL_SLOTS = ["icon", "title", "value", "label", "right-icon"];
var collapseItemProps = extend({}, cellSharedProps, {
  name: numericProp,
  isLink: truthProp,
  disabled: Boolean,
  readonly: Boolean,
  lazyRender: truthProp
});
var stdin_default55 = defineComponent53({
  name: name52,
  props: collapseItemProps,
  setup(props2, {
    slots
  }) {
    const wrapperRef = ref35();
    const contentRef = ref35();
    const {
      parent,
      index
    } = useParent(COLLAPSE_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <CollapseItem> must be a child component of <Collapse>.");
      }
      return;
    }
    const name210 = computed32(() => {
      var _a;
      return (_a = props2.name) != null ? _a : index.value;
    });
    const expanded = computed32(() => parent.isExpanded(name210.value));
    const show = ref35(expanded.value);
    const lazyRender = useLazyRender(() => show.value || !props2.lazyRender);
    const onTransitionEnd = () => {
      if (!expanded.value) {
        show.value = false;
      } else if (wrapperRef.value) {
        wrapperRef.value.style.height = "";
      }
    };
    watch30(expanded, (value, oldValue) => {
      if (oldValue === null) {
        return;
      }
      if (value) {
        show.value = true;
      }
      const tick = value ? nextTick17 : raf;
      tick(() => {
        if (!contentRef.value || !wrapperRef.value) {
          return;
        }
        const {
          offsetHeight
        } = contentRef.value;
        if (offsetHeight) {
          const contentHeight = `${offsetHeight}px`;
          wrapperRef.value.style.height = value ? "0" : contentHeight;
          doubleRaf(() => {
            if (wrapperRef.value) {
              wrapperRef.value.style.height = value ? contentHeight : "0";
            }
          });
        } else {
          onTransitionEnd();
        }
      });
    });
    const toggle = (newValue = !expanded.value) => {
      parent.toggle(name210.value, newValue);
    };
    const onClickTitle = () => {
      if (!props2.disabled && !props2.readonly) {
        toggle();
      }
    };
    const renderTitle = () => {
      const {
        border,
        disabled,
        readonly
      } = props2;
      const attrs = pick(props2, Object.keys(cellSharedProps));
      if (readonly) {
        attrs.isLink = false;
      }
      if (disabled || readonly) {
        attrs.clickable = false;
      }
      return _createVNode55(Cell, _mergeProps17({
        "role": "button",
        "class": bem48("title", {
          disabled,
          expanded: expanded.value,
          borderless: !border
        }),
        "aria-expanded": String(expanded.value),
        "onClick": onClickTitle
      }, attrs), pick(slots, CELL_SLOTS));
    };
    const renderContent = lazyRender(() => {
      var _a;
      return _withDirectives6(_createVNode55("div", {
        "ref": wrapperRef,
        "class": bem48("wrapper"),
        "onTransitionend": onTransitionEnd
      }, [_createVNode55("div", {
        "ref": contentRef,
        "class": bem48("content")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]), [[_vShow5, show.value]]);
    });
    useExpose({
      toggle,
      expanded,
      itemName: name210
    });
    return () => _createVNode55("div", {
      "class": [bem48({
        border: index.value && props2.border
      })]
    }, [renderTitle(), renderContent()]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/collapse-item/index.mjs
var CollapseItem = withInstall(stdin_default55);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/config-provider/index.mjs
var ConfigProvider = withInstall(stdin_default5);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/contact-card/ContactCard.mjs
import { createVNode as _createVNode56 } from "vue";
import { defineComponent as defineComponent54 } from "vue";
var [name53, bem49, t7] = createNamespace("contact-card");
var contactCardProps = {
  tel: String,
  name: String,
  type: makeStringProp("add"),
  addText: String,
  editable: truthProp
};
var stdin_default56 = defineComponent54({
  name: name53,
  props: contactCardProps,
  emits: ["click"],
  setup(props2, {
    emit
  }) {
    const onClick = (event) => {
      if (props2.editable) {
        emit("click", event);
      }
    };
    const renderContent = () => {
      if (props2.type === "add") {
        return props2.addText || t7("addContact");
      }
      return [_createVNode56("div", null, [`${t7("name")}：${props2.name}`]), _createVNode56("div", null, [`${t7("tel")}：${props2.tel}`])];
    };
    return () => _createVNode56(Cell, {
      "center": true,
      "icon": props2.type === "edit" ? "contact" : "add-square",
      "class": bem49([props2.type]),
      "border": false,
      "isLink": props2.editable,
      "titleClass": bem49("title"),
      "onClick": onClick
    }, {
      title: renderContent
    });
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/contact-card/index.mjs
var ContactCard = withInstall(stdin_default56);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/contact-edit/ContactEdit.mjs
import { createVNode as _createVNode57 } from "vue";
import { watch as watch31, reactive as reactive10, defineComponent as defineComponent55 } from "vue";
var [name54, bem50, t8] = createNamespace("contact-edit");
var DEFAULT_CONTACT = {
  tel: "",
  name: ""
};
var contactEditProps = {
  isEdit: Boolean,
  isSaving: Boolean,
  isDeleting: Boolean,
  showSetDefault: Boolean,
  setDefaultLabel: String,
  contactInfo: {
    type: Object,
    default: () => extend({}, DEFAULT_CONTACT)
  },
  telValidator: {
    type: Function,
    default: isMobile
  }
};
var stdin_default57 = defineComponent55({
  name: name54,
  props: contactEditProps,
  emits: ["save", "delete", "changeDefault"],
  setup(props2, {
    emit
  }) {
    const contact = reactive10(extend({}, DEFAULT_CONTACT, props2.contactInfo));
    const onSave = () => {
      if (!props2.isSaving) {
        emit("save", contact);
      }
    };
    const onDelete = () => emit("delete", contact);
    const renderButtons = () => _createVNode57("div", {
      "class": bem50("buttons")
    }, [_createVNode57(Button, {
      "block": true,
      "round": true,
      "type": "primary",
      "text": t8("save"),
      "class": bem50("button"),
      "loading": props2.isSaving,
      "nativeType": "submit"
    }, null), props2.isEdit && _createVNode57(Button, {
      "block": true,
      "round": true,
      "text": t8("delete"),
      "class": bem50("button"),
      "loading": props2.isDeleting,
      "onClick": onDelete
    }, null)]);
    const renderSwitch = () => _createVNode57(Switch, {
      "modelValue": contact.isDefault,
      "onUpdate:modelValue": ($event) => contact.isDefault = $event,
      "onChange": (checked) => emit("changeDefault", checked)
    }, null);
    const renderSetDefault = () => {
      if (props2.showSetDefault) {
        return _createVNode57(Cell, {
          "title": props2.setDefaultLabel,
          "class": bem50("switch-cell"),
          "border": false
        }, {
          "right-icon": renderSwitch
        });
      }
    };
    watch31(() => props2.contactInfo, (value) => extend(contact, DEFAULT_CONTACT, value));
    return () => _createVNode57(Form, {
      "class": bem50(),
      "onSubmit": onSave
    }, {
      default: () => [_createVNode57("div", {
        "class": bem50("fields")
      }, [_createVNode57(Field, {
        "modelValue": contact.name,
        "onUpdate:modelValue": ($event) => contact.name = $event,
        "clearable": true,
        "label": t8("name"),
        "rules": [{
          required: true,
          message: t8("nameEmpty")
        }],
        "maxlength": "30",
        "placeholder": t8("name")
      }, null), _createVNode57(Field, {
        "modelValue": contact.tel,
        "onUpdate:modelValue": ($event) => contact.tel = $event,
        "clearable": true,
        "type": "tel",
        "label": t8("tel"),
        "rules": [{
          validator: props2.telValidator,
          message: t8("telInvalid")
        }],
        "placeholder": t8("tel")
      }, null)]), renderSetDefault(), renderButtons()]
    });
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/contact-edit/index.mjs
var ContactEdit = withInstall(stdin_default57);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/contact-list/ContactList.mjs
import { createVNode as _createVNode58 } from "vue";
import { defineComponent as defineComponent56 } from "vue";
var [name55, bem51, t9] = createNamespace("contact-list");
var contactListProps = {
  list: Array,
  addText: String,
  modelValue: unknownProp,
  defaultTagText: String
};
var stdin_default58 = defineComponent56({
  name: name55,
  props: contactListProps,
  emits: ["add", "edit", "select", "update:modelValue"],
  setup(props2, {
    emit
  }) {
    const renderItem = (item, index) => {
      const onClick = () => {
        emit("update:modelValue", item.id);
        emit("select", item, index);
      };
      const renderRightIcon = () => _createVNode58(Radio, {
        "class": bem51("radio"),
        "name": item.id,
        "iconSize": 18
      }, null);
      const renderEditIcon = () => _createVNode58(Icon, {
        "name": "edit",
        "class": bem51("edit"),
        "onClick": (event) => {
          event.stopPropagation();
          emit("edit", item, index);
        }
      }, null);
      const renderContent = () => {
        const nodes = [`${item.name}，${item.tel}`];
        if (item.isDefault && props2.defaultTagText) {
          nodes.push(_createVNode58(Tag, {
            "type": "primary",
            "round": true,
            "class": bem51("item-tag")
          }, {
            default: () => [props2.defaultTagText]
          }));
        }
        return nodes;
      };
      return _createVNode58(Cell, {
        "key": item.id,
        "isLink": true,
        "center": true,
        "class": bem51("item"),
        "titleClass": bem51("item-title"),
        "onClick": onClick
      }, {
        icon: renderEditIcon,
        title: renderContent,
        "right-icon": renderRightIcon
      });
    };
    return () => _createVNode58("div", {
      "class": bem51()
    }, [_createVNode58(RadioGroup, {
      "modelValue": props2.modelValue,
      "class": bem51("group")
    }, {
      default: () => [props2.list && props2.list.map(renderItem)]
    }), _createVNode58("div", {
      "class": [bem51("bottom"), "van-safe-area-bottom"]
    }, [_createVNode58(Button, {
      "round": true,
      "block": true,
      "type": "primary",
      "class": bem51("add"),
      "text": props2.addText || t9("addContact"),
      "onClick": () => emit("add")
    }, null)])]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/contact-list/index.mjs
var ContactList = withInstall(stdin_default58);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/count-down/CountDown.mjs
import { createVNode as _createVNode59 } from "vue";
import { watch as watch32, computed as computed33, defineComponent as defineComponent57 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/count-down/utils.mjs
function parseFormat(format3, currentTime) {
  const { days } = currentTime;
  let { hours, minutes, seconds, milliseconds } = currentTime;
  if (format3.includes("DD")) {
    format3 = format3.replace("DD", padZero(days));
  } else {
    hours += days * 24;
  }
  if (format3.includes("HH")) {
    format3 = format3.replace("HH", padZero(hours));
  } else {
    minutes += hours * 60;
  }
  if (format3.includes("mm")) {
    format3 = format3.replace("mm", padZero(minutes));
  } else {
    seconds += minutes * 60;
  }
  if (format3.includes("ss")) {
    format3 = format3.replace("ss", padZero(seconds));
  } else {
    milliseconds += seconds * 1e3;
  }
  if (format3.includes("S")) {
    const ms = padZero(milliseconds, 3);
    if (format3.includes("SSS")) {
      format3 = format3.replace("SSS", ms);
    } else if (format3.includes("SS")) {
      format3 = format3.replace("SS", ms.slice(0, 2));
    } else {
      format3 = format3.replace("S", ms.charAt(0));
    }
  }
  return format3;
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/count-down/CountDown.mjs
var [name56, bem52] = createNamespace("count-down");
var countDownProps = {
  time: makeNumericProp(0),
  format: makeStringProp("HH:mm:ss"),
  autoStart: truthProp,
  millisecond: Boolean
};
var stdin_default59 = defineComponent57({
  name: name56,
  props: countDownProps,
  emits: ["change", "finish"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      start: start2,
      pause,
      reset,
      current: current2
    } = useCountDown({
      time: +props2.time,
      millisecond: props2.millisecond,
      onChange: (current22) => emit("change", current22),
      onFinish: () => emit("finish")
    });
    const timeText = computed33(() => parseFormat(props2.format, current2.value));
    const resetTime = () => {
      reset(+props2.time);
      if (props2.autoStart) {
        start2();
      }
    };
    watch32(() => props2.time, resetTime, {
      immediate: true
    });
    useExpose({
      start: start2,
      pause,
      reset: resetTime
    });
    return () => _createVNode59("div", {
      "role": "timer",
      "class": bem52()
    }, [slots.default ? slots.default(current2.value) : timeText.value]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/count-down/index.mjs
var CountDown = withInstall(stdin_default59);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/coupon/Coupon.mjs
import { createVNode as _createVNode60 } from "vue";
import { computed as computed34, defineComponent as defineComponent58 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/coupon/utils.mjs
function getDate(timeStamp) {
  const date = new Date(timeStamp * 1e3);
  return `${date.getFullYear()}.${padZero(date.getMonth() + 1)}.${padZero(
    date.getDate()
  )}`;
}
var formatDiscount = (discount) => (discount / 10).toFixed(discount % 10 === 0 ? 0 : 1);
var formatAmount = (amount) => (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/coupon/Coupon.mjs
var [name57, bem53, t10] = createNamespace("coupon");
var stdin_default60 = defineComponent58({
  name: name57,
  props: {
    chosen: Boolean,
    coupon: makeRequiredProp(Object),
    disabled: Boolean,
    currency: makeStringProp("¥")
  },
  setup(props2) {
    const validPeriod = computed34(() => {
      const {
        startAt,
        endAt
      } = props2.coupon;
      return `${getDate(startAt)} - ${getDate(endAt)}`;
    });
    const faceAmount = computed34(() => {
      const {
        coupon,
        currency
      } = props2;
      if (coupon.valueDesc) {
        return [coupon.valueDesc, _createVNode60("span", null, [coupon.unitDesc || ""])];
      }
      if (coupon.denominations) {
        const denominations = formatAmount(coupon.denominations);
        return [_createVNode60("span", null, [currency]), ` ${denominations}`];
      }
      if (coupon.discount) {
        return t10("discount", formatDiscount(coupon.discount));
      }
      return "";
    });
    const conditionMessage = computed34(() => {
      const condition = formatAmount(props2.coupon.originCondition || 0);
      return condition === "0" ? t10("unlimited") : t10("condition", condition);
    });
    return () => {
      const {
        chosen,
        coupon,
        disabled
      } = props2;
      const description = disabled && coupon.reason || coupon.description;
      return _createVNode60("div", {
        "class": bem53({
          disabled
        })
      }, [_createVNode60("div", {
        "class": bem53("content")
      }, [_createVNode60("div", {
        "class": bem53("head")
      }, [_createVNode60("h2", {
        "class": bem53("amount")
      }, [faceAmount.value]), _createVNode60("p", {
        "class": bem53("condition")
      }, [coupon.condition || conditionMessage.value])]), _createVNode60("div", {
        "class": bem53("body")
      }, [_createVNode60("p", {
        "class": bem53("name")
      }, [coupon.name]), _createVNode60("p", {
        "class": bem53("valid")
      }, [validPeriod.value]), !disabled && _createVNode60(Checkbox, {
        "class": bem53("corner"),
        "modelValue": chosen
      }, null)])]), description && _createVNode60("p", {
        "class": bem53("description")
      }, [description])]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/coupon/index.mjs
var Coupon = withInstall(stdin_default60);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/coupon-cell/CouponCell.mjs
import { createVNode as _createVNode61 } from "vue";
import { defineComponent as defineComponent59 } from "vue";
var [name58, bem54, t11] = createNamespace("coupon-cell");
var couponCellProps = {
  title: String,
  border: truthProp,
  editable: truthProp,
  coupons: makeArrayProp(),
  currency: makeStringProp("¥"),
  chosenCoupon: {
    type: [Number, Array],
    default: -1
  }
};
var getValue = (coupon) => {
  const {
    value,
    denominations
  } = coupon;
  if (isDef(value)) {
    return value;
  }
  if (isDef(denominations)) {
    return denominations;
  }
  return 0;
};
function formatValue({
  coupons,
  chosenCoupon,
  currency
}) {
  let value = 0;
  let isExist = false;
  (Array.isArray(chosenCoupon) ? chosenCoupon : [chosenCoupon]).forEach((i) => {
    const coupon = coupons[+i];
    if (coupon) {
      isExist = true;
      value += getValue(coupon);
    }
  });
  if (isExist) {
    return `-${currency} ${(value / 100).toFixed(2)}`;
  }
  return coupons.length === 0 ? t11("noCoupon") : t11("count", coupons.length);
}
var stdin_default61 = defineComponent59({
  name: name58,
  props: couponCellProps,
  setup(props2) {
    return () => {
      const selected = Array.isArray(props2.chosenCoupon) ? props2.chosenCoupon.length : props2.coupons[+props2.chosenCoupon];
      return _createVNode61(Cell, {
        "class": bem54(),
        "value": formatValue(props2),
        "title": props2.title || t11("title"),
        "border": props2.border,
        "isLink": props2.editable,
        "valueClass": bem54("value", {
          selected
        })
      }, null);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/coupon-cell/index.mjs
var CouponCell = withInstall(stdin_default61);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/coupon-list/CouponList.mjs
import { withDirectives as _withDirectives7, vShow as _vShow6, createVNode as _createVNode63 } from "vue";
import { ref as ref36, watch as watch33, computed as computed35, nextTick as nextTick18, onMounted as onMounted13, defineComponent as defineComponent61 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/empty/Empty.mjs
import { createVNode as _createVNode62 } from "vue";
import { defineComponent as defineComponent60 } from "vue";
var [name59, bem55] = createNamespace("empty");
var emptyProps = {
  image: makeStringProp("default"),
  imageSize: [Number, String, Array],
  description: String
};
var stdin_default62 = defineComponent60({
  name: name59,
  props: emptyProps,
  setup(props2, {
    slots
  }) {
    const renderDescription = () => {
      const description = slots.description ? slots.description() : props2.description;
      if (description) {
        return _createVNode62("p", {
          "class": bem55("description")
        }, [description]);
      }
    };
    const renderBottom = () => {
      if (slots.default) {
        return _createVNode62("div", {
          "class": bem55("bottom")
        }, [slots.default()]);
      }
    };
    const baseId = useId();
    const getId = (num) => `${baseId}-${num}`;
    const getUrlById = (num) => `url(#${getId(num)})`;
    const renderStop = (color, offset2, opacity) => _createVNode62("stop", {
      "stop-color": color,
      "offset": `${offset2}%`,
      "stop-opacity": opacity
    }, null);
    const renderStops = (fromColor, toColor) => [renderStop(fromColor, 0), renderStop(toColor, 100)];
    const renderShadow = (id) => [_createVNode62("defs", null, [_createVNode62("radialGradient", {
      "id": getId(id),
      "cx": "50%",
      "cy": "54%",
      "fx": "50%",
      "fy": "54%",
      "r": "297%",
      "gradientTransform": "matrix(-.16 0 0 -.33 .58 .72)"
    }, [renderStop("#EBEDF0", 0), renderStop("#F2F3F5", 100, 0.3)])]), _createVNode62("ellipse", {
      "fill": getUrlById(id),
      "opacity": ".8",
      "cx": "80",
      "cy": "140",
      "rx": "46",
      "ry": "8"
    }, null)];
    const renderBuilding = () => [_createVNode62("defs", null, [_createVNode62("linearGradient", {
      "id": getId("a"),
      "x1": "64%",
      "y1": "100%",
      "x2": "64%"
    }, [renderStop("#FFF", 0, 0.5), renderStop("#F2F3F5", 100)])]), _createVNode62("g", {
      "opacity": ".8"
    }, [_createVNode62("path", {
      "d": "M36 131V53H16v20H2v58h34z",
      "fill": getUrlById("a")
    }, null), _createVNode62("path", {
      "d": "M123 15h22v14h9v77h-31V15z",
      "fill": getUrlById("a")
    }, null)])];
    const renderCloud = () => [_createVNode62("defs", null, [_createVNode62("linearGradient", {
      "id": getId("b"),
      "x1": "64%",
      "y1": "97%",
      "x2": "64%",
      "y2": "0%"
    }, [renderStop("#F2F3F5", 0, 0.3), renderStop("#F2F3F5", 100)])]), _createVNode62("g", {
      "opacity": ".8"
    }, [_createVNode62("path", {
      "d": "M87 6c3 0 7 3 8 6a8 8 0 1 1-1 16H80a7 7 0 0 1-8-6c0-4 3-7 6-7 0-5 4-9 9-9Z",
      "fill": getUrlById("b")
    }, null), _createVNode62("path", {
      "d": "M19 23c2 0 3 1 4 3 2 0 4 2 4 4a4 4 0 0 1-4 3v1h-7v-1l-1 1c-2 0-3-2-3-4 0-1 1-3 3-3 0-2 2-4 4-4Z",
      "fill": getUrlById("b")
    }, null)])];
    const renderNetwork = () => _createVNode62("svg", {
      "viewBox": "0 0 160 160"
    }, [_createVNode62("defs", null, [_createVNode62("linearGradient", {
      "id": getId(1),
      "x1": "64%",
      "y1": "100%",
      "x2": "64%"
    }, [renderStop("#FFF", 0, 0.5), renderStop("#F2F3F5", 100)]), _createVNode62("linearGradient", {
      "id": getId(2),
      "x1": "50%",
      "x2": "50%",
      "y2": "84%"
    }, [renderStop("#EBEDF0", 0), renderStop("#DCDEE0", 100, 0)]), _createVNode62("linearGradient", {
      "id": getId(3),
      "x1": "100%",
      "x2": "100%",
      "y2": "100%"
    }, [renderStops("#EAEDF0", "#DCDEE0")]), _createVNode62("radialGradient", {
      "id": getId(4),
      "cx": "50%",
      "cy": "0%",
      "fx": "50%",
      "fy": "0%",
      "r": "100%",
      "gradientTransform": "matrix(0 1 -.54 0 .5 -.5)"
    }, [renderStop("#EBEDF0", 0), renderStop("#FFF", 100, 0)])]), _createVNode62("g", {
      "fill": "none"
    }, [renderBuilding(), _createVNode62("path", {
      "fill": getUrlById(4),
      "d": "M0 139h160v21H0z"
    }, null), _createVNode62("path", {
      "d": "M80 54a7 7 0 0 1 3 13v27l-2 2h-2a2 2 0 0 1-2-2V67a7 7 0 0 1 3-13z",
      "fill": getUrlById(2)
    }, null), _createVNode62("g", {
      "opacity": ".6",
      "stroke-linecap": "round",
      "stroke-width": "7"
    }, [_createVNode62("path", {
      "d": "M64 47a19 19 0 0 0-5 13c0 5 2 10 5 13",
      "stroke": getUrlById(3)
    }, null), _createVNode62("path", {
      "d": "M53 36a34 34 0 0 0 0 48",
      "stroke": getUrlById(3)
    }, null), _createVNode62("path", {
      "d": "M95 73a19 19 0 0 0 6-13c0-5-2-9-6-13",
      "stroke": getUrlById(3)
    }, null), _createVNode62("path", {
      "d": "M106 84a34 34 0 0 0 0-48",
      "stroke": getUrlById(3)
    }, null)]), _createVNode62("g", {
      "transform": "translate(31 105)"
    }, [_createVNode62("rect", {
      "fill": "#EBEDF0",
      "width": "98",
      "height": "34",
      "rx": "2"
    }, null), _createVNode62("rect", {
      "fill": "#FFF",
      "x": "9",
      "y": "8",
      "width": "80",
      "height": "18",
      "rx": "1.1"
    }, null), _createVNode62("rect", {
      "fill": "#EBEDF0",
      "x": "15",
      "y": "12",
      "width": "18",
      "height": "6",
      "rx": "1.1"
    }, null)])])]);
    const renderMaterial = () => _createVNode62("svg", {
      "viewBox": "0 0 160 160"
    }, [_createVNode62("defs", null, [_createVNode62("linearGradient", {
      "x1": "50%",
      "x2": "50%",
      "y2": "100%",
      "id": getId(5)
    }, [renderStops("#F2F3F5", "#DCDEE0")]), _createVNode62("linearGradient", {
      "x1": "95%",
      "y1": "48%",
      "x2": "5.5%",
      "y2": "51%",
      "id": getId(6)
    }, [renderStops("#EAEDF1", "#DCDEE0")]), _createVNode62("linearGradient", {
      "y1": "45%",
      "x2": "100%",
      "y2": "54%",
      "id": getId(7)
    }, [renderStops("#EAEDF1", "#DCDEE0")])]), renderBuilding(), renderCloud(), _createVNode62("g", {
      "transform": "translate(36 50)",
      "fill": "none"
    }, [_createVNode62("g", {
      "transform": "translate(8)"
    }, [_createVNode62("rect", {
      "fill": "#EBEDF0",
      "opacity": ".6",
      "x": "38",
      "y": "13",
      "width": "36",
      "height": "53",
      "rx": "2"
    }, null), _createVNode62("rect", {
      "fill": getUrlById(5),
      "width": "64",
      "height": "66",
      "rx": "2"
    }, null), _createVNode62("rect", {
      "fill": "#FFF",
      "x": "6",
      "y": "6",
      "width": "52",
      "height": "55",
      "rx": "1"
    }, null), _createVNode62("g", {
      "transform": "translate(15 17)",
      "fill": getUrlById(6)
    }, [_createVNode62("rect", {
      "width": "34",
      "height": "6",
      "rx": "1"
    }, null), _createVNode62("path", {
      "d": "M0 14h34v6H0z"
    }, null), _createVNode62("rect", {
      "y": "28",
      "width": "34",
      "height": "6",
      "rx": "1"
    }, null)])]), _createVNode62("rect", {
      "fill": getUrlById(7),
      "y": "61",
      "width": "88",
      "height": "28",
      "rx": "1"
    }, null), _createVNode62("rect", {
      "fill": "#F7F8FA",
      "x": "29",
      "y": "72",
      "width": "30",
      "height": "6",
      "rx": "1"
    }, null)])]);
    const renderError = () => _createVNode62("svg", {
      "viewBox": "0 0 160 160"
    }, [_createVNode62("defs", null, [_createVNode62("linearGradient", {
      "x1": "50%",
      "x2": "50%",
      "y2": "100%",
      "id": getId(8)
    }, [renderStops("#EAEDF1", "#DCDEE0")])]), renderBuilding(), renderCloud(), renderShadow("c"), _createVNode62("path", {
      "d": "m59 60 21 21 21-21h3l9 9v3L92 93l21 21v3l-9 9h-3l-21-21-21 21h-3l-9-9v-3l21-21-21-21v-3l9-9h3Z",
      "fill": getUrlById(8)
    }, null)]);
    const renderSearch = () => _createVNode62("svg", {
      "viewBox": "0 0 160 160"
    }, [_createVNode62("defs", null, [_createVNode62("linearGradient", {
      "x1": "50%",
      "y1": "100%",
      "x2": "50%",
      "id": getId(9)
    }, [renderStops("#EEE", "#D8D8D8")]), _createVNode62("linearGradient", {
      "x1": "100%",
      "y1": "50%",
      "y2": "50%",
      "id": getId(10)
    }, [renderStops("#F2F3F5", "#DCDEE0")]), _createVNode62("linearGradient", {
      "x1": "50%",
      "x2": "50%",
      "y2": "100%",
      "id": getId(11)
    }, [renderStops("#F2F3F5", "#DCDEE0")]), _createVNode62("linearGradient", {
      "x1": "50%",
      "x2": "50%",
      "y2": "100%",
      "id": getId(12)
    }, [renderStops("#FFF", "#F7F8FA")])]), renderBuilding(), renderCloud(), renderShadow("d"), _createVNode62("g", {
      "transform": "rotate(-45 113 -4)",
      "fill": "none"
    }, [_createVNode62("rect", {
      "fill": getUrlById(9),
      "x": "24",
      "y": "52.8",
      "width": "5.8",
      "height": "19",
      "rx": "1"
    }, null), _createVNode62("rect", {
      "fill": getUrlById(10),
      "x": "22.1",
      "y": "67.3",
      "width": "9.9",
      "height": "28",
      "rx": "1"
    }, null), _createVNode62("circle", {
      "stroke": getUrlById(11),
      "stroke-width": "8",
      "cx": "27",
      "cy": "27",
      "r": "27"
    }, null), _createVNode62("circle", {
      "fill": getUrlById(12),
      "cx": "27",
      "cy": "27",
      "r": "16"
    }, null), _createVNode62("path", {
      "d": "M37 7c-8 0-15 5-16 12",
      "stroke": getUrlById(11),
      "stroke-width": "3",
      "opacity": ".5",
      "stroke-linecap": "round",
      "transform": "rotate(45 29 13)"
    }, null)])]);
    const renderImage = () => {
      var _a;
      if (slots.image) {
        return slots.image();
      }
      const PRESET_IMAGES = {
        error: renderError,
        search: renderSearch,
        network: renderNetwork,
        default: renderMaterial
      };
      return ((_a = PRESET_IMAGES[props2.image]) == null ? void 0 : _a.call(PRESET_IMAGES)) || _createVNode62("img", {
        "src": props2.image
      }, null);
    };
    return () => _createVNode62("div", {
      "class": bem55()
    }, [_createVNode62("div", {
      "class": bem55("image"),
      "style": getSizeStyle(props2.imageSize)
    }, [renderImage()]), renderDescription(), renderBottom()]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/empty/index.mjs
var Empty = withInstall(stdin_default62);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/coupon-list/CouponList.mjs
var [name60, bem56, t12] = createNamespace("coupon-list");
var couponListProps = {
  code: makeStringProp(""),
  coupons: makeArrayProp(),
  currency: makeStringProp("¥"),
  showCount: truthProp,
  emptyImage: String,
  enabledTitle: String,
  disabledTitle: String,
  disabledCoupons: makeArrayProp(),
  showExchangeBar: truthProp,
  showCloseButton: truthProp,
  closeButtonText: String,
  inputPlaceholder: String,
  exchangeMinLength: makeNumberProp(1),
  exchangeButtonText: String,
  displayedCouponIndex: makeNumberProp(-1),
  exchangeButtonLoading: Boolean,
  exchangeButtonDisabled: Boolean,
  chosenCoupon: {
    type: [Number, Array],
    default: -1
  }
};
var stdin_default63 = defineComponent61({
  name: name60,
  props: couponListProps,
  emits: ["change", "exchange", "update:code"],
  setup(props2, {
    emit,
    slots
  }) {
    const [couponRefs, setCouponRefs] = useRefs();
    const root = ref36();
    const barRef = ref36();
    const activeTab = ref36(0);
    const listHeight = ref36(0);
    const currentCode = ref36(props2.code);
    const buttonDisabled = computed35(() => !props2.exchangeButtonLoading && (props2.exchangeButtonDisabled || !currentCode.value || currentCode.value.length < props2.exchangeMinLength));
    const updateListHeight = () => {
      const TABS_HEIGHT = 44;
      const rootHeight = useRect(root).height;
      const headerHeight = useRect(barRef).height + TABS_HEIGHT;
      listHeight.value = (rootHeight > headerHeight ? rootHeight : windowHeight.value) - headerHeight;
    };
    const onExchange = () => {
      emit("exchange", currentCode.value);
      if (!props2.code) {
        currentCode.value = "";
      }
    };
    const scrollToCoupon = (index) => {
      nextTick18(() => {
        var _a;
        return (_a = couponRefs.value[index]) == null ? void 0 : _a.scrollIntoView();
      });
    };
    const renderEmpty = () => _createVNode63(Empty, {
      "image": props2.emptyImage
    }, {
      default: () => [_createVNode63("p", {
        "class": bem56("empty-tip")
      }, [t12("noCoupon")])]
    });
    const renderExchangeBar = () => {
      if (props2.showExchangeBar) {
        return _createVNode63("div", {
          "ref": barRef,
          "class": bem56("exchange-bar")
        }, [_createVNode63(Field, {
          "modelValue": currentCode.value,
          "onUpdate:modelValue": ($event) => currentCode.value = $event,
          "clearable": true,
          "border": false,
          "class": bem56("field"),
          "placeholder": props2.inputPlaceholder || t12("placeholder"),
          "maxlength": "20"
        }, null), _createVNode63(Button, {
          "plain": true,
          "type": "primary",
          "class": bem56("exchange"),
          "text": props2.exchangeButtonText || t12("exchange"),
          "loading": props2.exchangeButtonLoading,
          "disabled": buttonDisabled.value,
          "onClick": onExchange
        }, null)]);
      }
    };
    const renderCouponTab = () => {
      const {
        coupons,
        chosenCoupon
      } = props2;
      const count = props2.showCount ? ` (${coupons.length})` : "";
      const title = (props2.enabledTitle || t12("enable")) + count;
      const updateChosenCoupon = (currentValues = [], value = 0) => {
        if (currentValues.includes(value)) {
          return currentValues.filter((item) => item !== value);
        }
        return [...currentValues, value];
      };
      return _createVNode63(Tab, {
        "title": title
      }, {
        default: () => {
          var _a;
          return [_createVNode63("div", {
            "class": bem56("list", {
              "with-bottom": props2.showCloseButton
            }),
            "style": {
              height: `${listHeight.value}px`
            }
          }, [coupons.map((coupon, index) => _createVNode63(Coupon, {
            "key": coupon.id,
            "ref": setCouponRefs(index),
            "coupon": coupon,
            "chosen": Array.isArray(chosenCoupon) ? chosenCoupon.includes(index) : index === chosenCoupon,
            "currency": props2.currency,
            "onClick": () => emit("change", Array.isArray(chosenCoupon) ? updateChosenCoupon(chosenCoupon, index) : index)
          }, null)), !coupons.length && renderEmpty(), (_a = slots["list-footer"]) == null ? void 0 : _a.call(slots)])];
        }
      });
    };
    const renderDisabledTab = () => {
      const {
        disabledCoupons
      } = props2;
      const count = props2.showCount ? ` (${disabledCoupons.length})` : "";
      const title = (props2.disabledTitle || t12("disabled")) + count;
      return _createVNode63(Tab, {
        "title": title
      }, {
        default: () => {
          var _a;
          return [_createVNode63("div", {
            "class": bem56("list", {
              "with-bottom": props2.showCloseButton
            }),
            "style": {
              height: `${listHeight.value}px`
            }
          }, [disabledCoupons.map((coupon) => _createVNode63(Coupon, {
            "disabled": true,
            "key": coupon.id,
            "coupon": coupon,
            "currency": props2.currency
          }, null)), !disabledCoupons.length && renderEmpty(), (_a = slots["disabled-list-footer"]) == null ? void 0 : _a.call(slots)])];
        }
      });
    };
    watch33(() => props2.code, (value) => {
      currentCode.value = value;
    });
    watch33(windowHeight, updateListHeight);
    watch33(currentCode, (value) => emit("update:code", value));
    watch33(() => props2.displayedCouponIndex, scrollToCoupon);
    onMounted13(() => {
      updateListHeight();
      scrollToCoupon(props2.displayedCouponIndex);
    });
    return () => _createVNode63("div", {
      "ref": root,
      "class": bem56()
    }, [renderExchangeBar(), _createVNode63(Tabs, {
      "active": activeTab.value,
      "onUpdate:active": ($event) => activeTab.value = $event,
      "class": bem56("tab")
    }, {
      default: () => [renderCouponTab(), renderDisabledTab()]
    }), _createVNode63("div", {
      "class": bem56("bottom")
    }, [slots["list-button"] ? slots["list-button"]() : _withDirectives7(_createVNode63(Button, {
      "round": true,
      "block": true,
      "type": "primary",
      "class": bem56("close"),
      "text": props2.closeButtonText || t12("close"),
      "onClick": () => emit("change", Array.isArray(props2.chosenCoupon) ? [] : -1)
    }, null), [[_vShow6, props2.showCloseButton]])])]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/coupon-list/index.mjs
var CouponList = withInstall(stdin_default63);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/date-picker/DatePicker.mjs
import { createVNode as _createVNode64, mergeProps as _mergeProps18 } from "vue";
import { ref as ref37, watch as watch34, computed as computed36, defineComponent as defineComponent62 } from "vue";
var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
var [name61] = createNamespace("date-picker");
var datePickerProps = extend({}, sharedProps, {
  columnsType: {
    type: Array,
    default: () => ["year", "month", "day"]
  },
  minDate: {
    type: Date,
    default: () => new Date(currentYear - 10, 0, 1),
    validator: isDate
  },
  maxDate: {
    type: Date,
    default: () => new Date(currentYear + 10, 11, 31),
    validator: isDate
  }
});
var stdin_default64 = defineComponent62({
  name: name61,
  props: datePickerProps,
  emits: ["confirm", "cancel", "change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const currentValues = ref37(props2.modelValue);
    const updatedByExternalSources = ref37(false);
    const pickerRef = ref37();
    const genYearOptions = () => {
      const minYear = props2.minDate.getFullYear();
      const maxYear = props2.maxDate.getFullYear();
      return genOptions(minYear, maxYear, "year", props2.formatter, props2.filter);
    };
    const isMinYear = (year) => year === props2.minDate.getFullYear();
    const isMaxYear = (year) => year === props2.maxDate.getFullYear();
    const isMinMonth = (month) => month === props2.minDate.getMonth() + 1;
    const isMaxMonth = (month) => month === props2.maxDate.getMonth() + 1;
    const getValue2 = (type) => {
      const {
        minDate,
        columnsType
      } = props2;
      const index = columnsType.indexOf(type);
      const value = updatedByExternalSources.value ? props2.modelValue[index] : currentValues.value[index];
      if (value) {
        return +value;
      }
      switch (type) {
        case "year":
          return minDate.getFullYear();
        case "month":
          return minDate.getMonth() + 1;
        case "day":
          return minDate.getDate();
      }
    };
    const genMonthOptions = () => {
      const year = getValue2("year");
      const minMonth = isMinYear(year) ? props2.minDate.getMonth() + 1 : 1;
      const maxMonth = isMaxYear(year) ? props2.maxDate.getMonth() + 1 : 12;
      return genOptions(minMonth, maxMonth, "month", props2.formatter, props2.filter);
    };
    const genDayOptions = () => {
      const year = getValue2("year");
      const month = getValue2("month");
      const minDate = isMinYear(year) && isMinMonth(month) ? props2.minDate.getDate() : 1;
      const maxDate = isMaxYear(year) && isMaxMonth(month) ? props2.maxDate.getDate() : getMonthEndDay(year, month);
      return genOptions(minDate, maxDate, "day", props2.formatter, props2.filter);
    };
    const confirm = () => {
      var _a;
      return (_a = pickerRef.value) == null ? void 0 : _a.confirm();
    };
    const getSelectedDate = () => currentValues.value;
    const columns = computed36(() => props2.columnsType.map((type) => {
      switch (type) {
        case "year":
          return genYearOptions();
        case "month":
          return genMonthOptions();
        case "day":
          return genDayOptions();
        default:
          if (true) {
            throw new Error(`[Vant] DatePicker: unsupported columns type: ${type}`);
          }
          return [];
      }
    }));
    watch34(currentValues, (newValues) => {
      if (!isSameValue(newValues, props2.modelValue)) {
        emit("update:modelValue", newValues);
      }
    });
    watch34(() => props2.modelValue, (newValues, oldValues) => {
      updatedByExternalSources.value = isSameValue(oldValues, currentValues.value);
      newValues = formatValueRange(newValues, columns.value);
      if (!isSameValue(newValues, currentValues.value)) {
        currentValues.value = newValues;
      }
      updatedByExternalSources.value = false;
    }, {
      immediate: true
    });
    const onChange = (...args) => emit("change", ...args);
    const onCancel = (...args) => emit("cancel", ...args);
    const onConfirm = (...args) => emit("confirm", ...args);
    useExpose({
      confirm,
      getSelectedDate
    });
    return () => _createVNode64(Picker, _mergeProps18({
      "ref": pickerRef,
      "modelValue": currentValues.value,
      "onUpdate:modelValue": ($event) => currentValues.value = $event,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props2, pickerInheritKeys)), slots);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/date-picker/index.mjs
var DatePicker = withInstall(stdin_default64);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/dialog/Dialog.mjs
import { mergeProps as _mergeProps19, createVNode as _createVNode65 } from "vue";
import { ref as ref38, reactive as reactive11, withKeys, defineComponent as defineComponent63 } from "vue";
var [name62, bem57, t13] = createNamespace("dialog");
var dialogProps = extend({}, popupSharedProps, {
  title: String,
  theme: String,
  width: numericProp,
  message: [String, Function],
  callback: Function,
  allowHtml: Boolean,
  className: unknownProp,
  transition: makeStringProp("van-dialog-bounce"),
  messageAlign: String,
  closeOnPopstate: truthProp,
  showCancelButton: Boolean,
  cancelButtonText: String,
  cancelButtonColor: String,
  cancelButtonDisabled: Boolean,
  confirmButtonText: String,
  confirmButtonColor: String,
  confirmButtonDisabled: Boolean,
  showConfirmButton: truthProp,
  closeOnClickOverlay: Boolean
});
var popupInheritKeys2 = [...popupSharedPropKeys, "transition", "closeOnPopstate"];
var stdin_default65 = defineComponent63({
  name: name62,
  props: dialogProps,
  emits: ["confirm", "cancel", "keydown", "update:show"],
  setup(props2, {
    emit,
    slots
  }) {
    const root = ref38();
    const loading = reactive11({
      confirm: false,
      cancel: false
    });
    const updateShow = (value) => emit("update:show", value);
    const close = (action) => {
      var _a;
      updateShow(false);
      (_a = props2.callback) == null ? void 0 : _a.call(props2, action);
    };
    const getActionHandler = (action) => () => {
      if (!props2.show) {
        return;
      }
      emit(action);
      if (props2.beforeClose) {
        loading[action] = true;
        callInterceptor(props2.beforeClose, {
          args: [action],
          done() {
            close(action);
            loading[action] = false;
          },
          canceled() {
            loading[action] = false;
          }
        });
      } else {
        close(action);
      }
    };
    const onCancel = getActionHandler("cancel");
    const onConfirm = getActionHandler("confirm");
    const onKeydown = withKeys((event) => {
      var _a, _b;
      if (event.target !== ((_b = (_a = root.value) == null ? void 0 : _a.popupRef) == null ? void 0 : _b.value)) {
        return;
      }
      const onEventType = {
        Enter: props2.showConfirmButton ? onConfirm : noop,
        Escape: props2.showCancelButton ? onCancel : noop
      };
      onEventType[event.key]();
      emit("keydown", event);
    }, ["enter", "esc"]);
    const renderTitle = () => {
      const title = slots.title ? slots.title() : props2.title;
      if (title) {
        return _createVNode65("div", {
          "class": bem57("header", {
            isolated: !props2.message && !slots.default
          })
        }, [title]);
      }
    };
    const renderMessage = (hasTitle) => {
      const {
        message,
        allowHtml,
        messageAlign
      } = props2;
      const classNames = bem57("message", {
        "has-title": hasTitle,
        [messageAlign]: messageAlign
      });
      const content = isFunction(message) ? message() : message;
      if (allowHtml && typeof content === "string") {
        return _createVNode65("div", {
          "class": classNames,
          "innerHTML": content
        }, null);
      }
      return _createVNode65("div", {
        "class": classNames
      }, [content]);
    };
    const renderContent = () => {
      if (slots.default) {
        return _createVNode65("div", {
          "class": bem57("content")
        }, [slots.default()]);
      }
      const {
        title,
        message,
        allowHtml
      } = props2;
      if (message) {
        const hasTitle = !!(title || slots.title);
        return _createVNode65("div", {
          "key": allowHtml ? 1 : 0,
          "class": bem57("content", {
            isolated: !hasTitle
          })
        }, [renderMessage(hasTitle)]);
      }
    };
    const renderButtons = () => _createVNode65("div", {
      "class": [BORDER_TOP, bem57("footer")]
    }, [props2.showCancelButton && _createVNode65(Button, {
      "size": "large",
      "text": props2.cancelButtonText || t13("cancel"),
      "class": bem57("cancel"),
      "style": {
        color: props2.cancelButtonColor
      },
      "loading": loading.cancel,
      "disabled": props2.cancelButtonDisabled,
      "onClick": onCancel
    }, null), props2.showConfirmButton && _createVNode65(Button, {
      "size": "large",
      "text": props2.confirmButtonText || t13("confirm"),
      "class": [bem57("confirm"), {
        [BORDER_LEFT]: props2.showCancelButton
      }],
      "style": {
        color: props2.confirmButtonColor
      },
      "loading": loading.confirm,
      "disabled": props2.confirmButtonDisabled,
      "onClick": onConfirm
    }, null)]);
    const renderRoundButtons = () => _createVNode65(ActionBar, {
      "class": bem57("footer")
    }, {
      default: () => [props2.showCancelButton && _createVNode65(ActionBarButton, {
        "type": "warning",
        "text": props2.cancelButtonText || t13("cancel"),
        "class": bem57("cancel"),
        "color": props2.cancelButtonColor,
        "loading": loading.cancel,
        "disabled": props2.cancelButtonDisabled,
        "onClick": onCancel
      }, null), props2.showConfirmButton && _createVNode65(ActionBarButton, {
        "type": "danger",
        "text": props2.confirmButtonText || t13("confirm"),
        "class": bem57("confirm"),
        "color": props2.confirmButtonColor,
        "loading": loading.confirm,
        "disabled": props2.confirmButtonDisabled,
        "onClick": onConfirm
      }, null)]
    });
    const renderFooter = () => {
      if (slots.footer) {
        return slots.footer();
      }
      return props2.theme === "round-button" ? renderRoundButtons() : renderButtons();
    };
    return () => {
      const {
        width: width2,
        title,
        theme,
        message,
        className
      } = props2;
      return _createVNode65(Popup, _mergeProps19({
        "ref": root,
        "role": "dialog",
        "class": [bem57([theme]), className],
        "style": {
          width: addUnit(width2)
        },
        "tabindex": 0,
        "aria-labelledby": title || message,
        "onKeydown": onKeydown,
        "onUpdate:show": updateShow
      }, pick(props2, popupInheritKeys2)), {
        default: () => [renderTitle(), renderContent(), renderFooter()]
      });
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/dialog/function-call.mjs
import { createVNode as _createVNode66, mergeProps as _mergeProps20 } from "vue";
var instance;
var DEFAULT_OPTIONS = {
  title: "",
  width: "",
  theme: null,
  message: "",
  overlay: true,
  callback: null,
  teleport: "body",
  className: "",
  allowHtml: false,
  lockScroll: true,
  transition: void 0,
  beforeClose: null,
  overlayClass: "",
  overlayStyle: void 0,
  messageAlign: "",
  cancelButtonText: "",
  cancelButtonColor: null,
  cancelButtonDisabled: false,
  confirmButtonText: "",
  confirmButtonColor: null,
  confirmButtonDisabled: false,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false
};
var currentOptions2 = extend({}, DEFAULT_OPTIONS);
function initInstance() {
  const Wrapper = {
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      return () => _createVNode66(stdin_default65, _mergeProps20(state, {
        "onUpdate:show": toggle
      }), null);
    }
  };
  ({
    instance
  } = mountComponent(Wrapper));
}
function showDialog(options) {
  if (!inBrowser) {
    return Promise.resolve(void 0);
  }
  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance();
    }
    instance.open(extend({}, currentOptions2, options, {
      callback: (action) => {
        (action === "confirm" ? resolve : reject)(action);
      }
    }));
  });
}
var setDialogDefaultOptions = (options) => {
  extend(currentOptions2, options);
};
var resetDialogDefaultOptions = () => {
  currentOptions2 = extend({}, DEFAULT_OPTIONS);
};
var showConfirmDialog = (options) => showDialog(extend({
  showCancelButton: true
}, options));
var closeDialog = () => {
  if (instance) {
    instance.toggle(false);
  }
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/dialog/index.mjs
var Dialog = withInstall(stdin_default65);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/divider/Divider.mjs
import { createVNode as _createVNode67 } from "vue";
import { defineComponent as defineComponent64 } from "vue";
var [name63, bem58] = createNamespace("divider");
var dividerProps = {
  dashed: Boolean,
  hairline: truthProp,
  vertical: Boolean,
  contentPosition: makeStringProp("center")
};
var stdin_default66 = defineComponent64({
  name: name63,
  props: dividerProps,
  setup(props2, {
    slots
  }) {
    return () => {
      var _a;
      return _createVNode67("div", {
        "role": "separator",
        "class": bem58({
          dashed: props2.dashed,
          hairline: props2.hairline,
          vertical: props2.vertical,
          [`content-${props2.contentPosition}`]: !!slots.default && !props2.vertical
        })
      }, [!props2.vertical && ((_a = slots.default) == null ? void 0 : _a.call(slots))]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/divider/index.mjs
var Divider = withInstall(stdin_default66);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/dropdown-item/DropdownItem.mjs
import { withDirectives as _withDirectives8, mergeProps as _mergeProps21, vShow as _vShow7, createVNode as _createVNode69 } from "vue";
import { reactive as reactive12, Teleport as Teleport3, defineComponent as defineComponent66, ref as ref40 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/dropdown-menu/DropdownMenu.mjs
import { createVNode as _createVNode68 } from "vue";
import { ref as ref39, computed as computed37, defineComponent as defineComponent65 } from "vue";
var [name64, bem59] = createNamespace("dropdown-menu");
var dropdownMenuProps = {
  overlay: truthProp,
  zIndex: numericProp,
  duration: makeNumericProp(0.2),
  direction: makeStringProp("down"),
  activeColor: String,
  autoLocate: Boolean,
  closeOnClickOutside: truthProp,
  closeOnClickOverlay: truthProp,
  swipeThreshold: numericProp
};
var DROPDOWN_KEY = Symbol(name64);
var stdin_default67 = defineComponent65({
  name: name64,
  props: dropdownMenuProps,
  setup(props2, {
    slots
  }) {
    const id = useId();
    const root = ref39();
    const barRef = ref39();
    const offset2 = ref39(0);
    const {
      children,
      linkChildren
    } = useChildren(DROPDOWN_KEY);
    const scrollParent = useScrollParent(root);
    const opened = computed37(() => children.some((item) => item.state.showWrapper));
    const scrollable = computed37(() => props2.swipeThreshold && children.length > +props2.swipeThreshold);
    const barStyle = computed37(() => {
      if (opened.value && isDef(props2.zIndex)) {
        return {
          zIndex: +props2.zIndex + 1
        };
      }
    });
    const close = () => {
      children.forEach((item) => {
        item.toggle(false);
      });
    };
    const onClickAway = () => {
      if (props2.closeOnClickOutside) {
        close();
      }
    };
    const updateOffset = () => {
      if (barRef.value) {
        const rect = useRect(barRef);
        if (props2.direction === "down") {
          offset2.value = rect.bottom;
        } else {
          offset2.value = windowHeight.value - rect.top;
        }
      }
    };
    const onScroll = () => {
      if (opened.value) {
        updateOffset();
      }
    };
    const toggleItem = (active) => {
      children.forEach((item, index) => {
        if (index === active) {
          item.toggle();
        } else if (item.state.showPopup) {
          item.toggle(false, {
            immediate: true
          });
        }
      });
    };
    const renderTitle = (item, index) => {
      const {
        showPopup
      } = item.state;
      const {
        disabled,
        titleClass
      } = item;
      return _createVNode68("div", {
        "id": `${id}-${index}`,
        "role": "button",
        "tabindex": disabled ? void 0 : 0,
        "class": [bem59("item", {
          disabled,
          grow: scrollable.value
        }), {
          [HAPTICS_FEEDBACK]: !disabled
        }],
        "onClick": () => {
          if (!disabled) {
            toggleItem(index);
          }
        }
      }, [_createVNode68("span", {
        "class": [bem59("title", {
          down: showPopup === (props2.direction === "down"),
          active: showPopup
        }), titleClass],
        "style": {
          color: showPopup ? props2.activeColor : ""
        }
      }, [_createVNode68("div", {
        "class": "van-ellipsis"
      }, [item.renderTitle()])])]);
    };
    useExpose({
      close
    });
    linkChildren({
      id,
      props: props2,
      offset: offset2,
      updateOffset
    });
    useClickAway(root, onClickAway);
    useEventListener("scroll", onScroll, {
      target: scrollParent,
      passive: true
    });
    return () => {
      var _a;
      return _createVNode68("div", {
        "ref": root,
        "class": bem59()
      }, [_createVNode68("div", {
        "ref": barRef,
        "style": barStyle.value,
        "class": bem59("bar", {
          opened: opened.value,
          scrollable: scrollable.value
        })
      }, [children.map(renderTitle)]), (_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/dropdown-item/DropdownItem.mjs
var [name65, bem60] = createNamespace("dropdown-item");
var dropdownItemProps = {
  title: String,
  options: makeArrayProp(),
  disabled: Boolean,
  teleport: [String, Object],
  lazyRender: truthProp,
  modelValue: unknownProp,
  titleClass: unknownProp
};
var stdin_default68 = defineComponent66({
  name: name65,
  inheritAttrs: false,
  props: dropdownItemProps,
  emits: ["open", "opened", "close", "closed", "change", "update:modelValue"],
  setup(props2, {
    emit,
    slots,
    attrs
  }) {
    const state = reactive12({
      showPopup: false,
      transition: true,
      showWrapper: false
    });
    const wrapperRef = ref40();
    const {
      parent,
      index
    } = useParent(DROPDOWN_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <DropdownItem> must be a child component of <DropdownMenu>.");
      }
      return;
    }
    const getEmitter = (name210) => () => emit(name210);
    const onOpen = getEmitter("open");
    const onClose = getEmitter("close");
    const onOpened = getEmitter("opened");
    const onClosed = () => {
      state.showWrapper = false;
      emit("closed");
    };
    const onClickWrapper = (event) => {
      if (props2.teleport) {
        event.stopPropagation();
      }
    };
    const toggle = (show = !state.showPopup, options = {}) => {
      if (show === state.showPopup) {
        return;
      }
      state.showPopup = show;
      state.transition = !options.immediate;
      if (show) {
        parent.updateOffset();
        state.showWrapper = true;
      }
    };
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      if (props2.title) {
        return props2.title;
      }
      const match = props2.options.find((option) => option.value === props2.modelValue);
      return match ? match.text : "";
    };
    const renderOption = (option) => {
      const {
        activeColor
      } = parent.props;
      const {
        disabled
      } = option;
      const active = option.value === props2.modelValue;
      const onClick = () => {
        if (disabled) {
          return;
        }
        state.showPopup = false;
        if (option.value !== props2.modelValue) {
          emit("update:modelValue", option.value);
          emit("change", option.value);
        }
      };
      const renderIcon = () => {
        if (active) {
          return _createVNode69(Icon, {
            "class": bem60("icon"),
            "color": disabled ? void 0 : activeColor,
            "name": "success"
          }, null);
        }
      };
      return _createVNode69(Cell, {
        "role": "menuitem",
        "key": String(option.value),
        "icon": option.icon,
        "title": option.text,
        "class": bem60("option", {
          active,
          disabled
        }),
        "style": {
          color: active ? activeColor : ""
        },
        "tabindex": active ? 0 : -1,
        "clickable": !disabled,
        "onClick": onClick
      }, {
        value: renderIcon
      });
    };
    const renderContent = () => {
      const {
        offset: offset2
      } = parent;
      const {
        autoLocate,
        zIndex,
        overlay,
        duration,
        direction,
        closeOnClickOverlay
      } = parent.props;
      const style = getZIndexStyle(zIndex);
      let offsetValue = offset2.value;
      if (autoLocate && wrapperRef.value) {
        const offsetParent = getContainingBlock(wrapperRef.value);
        if (offsetParent) {
          offsetValue -= useRect(offsetParent).top;
        }
      }
      if (direction === "down") {
        style.top = `${offsetValue}px`;
      } else {
        style.bottom = `${offsetValue}px`;
      }
      return _withDirectives8(_createVNode69("div", _mergeProps21({
        "ref": wrapperRef,
        "style": style,
        "class": bem60([direction]),
        "onClick": onClickWrapper
      }, attrs), [_createVNode69(Popup, {
        "show": state.showPopup,
        "onUpdate:show": ($event) => state.showPopup = $event,
        "role": "menu",
        "class": bem60("content"),
        "overlay": overlay,
        "position": direction === "down" ? "top" : "bottom",
        "duration": state.transition ? duration : 0,
        "lazyRender": props2.lazyRender,
        "overlayStyle": {
          position: "absolute"
        },
        "aria-labelledby": `${parent.id}-${index.value}`,
        "closeOnClickOverlay": closeOnClickOverlay,
        "onOpen": onOpen,
        "onClose": onClose,
        "onOpened": onOpened,
        "onClosed": onClosed
      }, {
        default: () => {
          var _a;
          return [props2.options.map(renderOption), (_a = slots.default) == null ? void 0 : _a.call(slots)];
        }
      })]), [[_vShow7, state.showWrapper]]);
    };
    useExpose({
      state,
      toggle,
      renderTitle
    });
    return () => {
      if (props2.teleport) {
        return _createVNode69(Teleport3, {
          "to": props2.teleport
        }, {
          default: () => [renderContent()]
        });
      }
      return renderContent();
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/dropdown-item/index.mjs
var DropdownItem = withInstall(stdin_default68);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/dropdown-menu/index.mjs
var DropdownMenu = withInstall(stdin_default67);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/floating-bubble/FloatingBubble.mjs
import { withDirectives as _withDirectives9, mergeProps as _mergeProps22, vShow as _vShow8, createVNode as _createVNode70 } from "vue";
import { Teleport as Teleport4, computed as computed38, defineComponent as defineComponent67, nextTick as nextTick19, onMounted as onMounted14, ref as ref41, watch as watch35, onActivated as onActivated8, onDeactivated as onDeactivated9 } from "vue";
var floatingBubbleProps = {
  gap: makeNumberProp(24),
  icon: String,
  axis: makeStringProp("y"),
  magnetic: String,
  offset: {
    type: Object,
    default: () => ({
      x: -1,
      y: -1
    })
  },
  teleport: {
    type: [String, Object],
    default: "body"
  }
};
var [name66, bem61] = createNamespace("floating-bubble");
var stdin_default69 = defineComponent67({
  name: name66,
  inheritAttrs: false,
  props: floatingBubbleProps,
  emits: ["click", "update:offset", "offsetChange"],
  setup(props2, {
    slots,
    emit,
    attrs
  }) {
    const rootRef = ref41();
    const state = ref41({
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });
    const boundary = computed38(() => ({
      top: props2.gap,
      right: windowWidth.value - state.value.width - props2.gap,
      bottom: windowHeight.value - state.value.height - props2.gap,
      left: props2.gap
    }));
    const dragging = ref41(false);
    let initialized = false;
    const rootStyle = computed38(() => {
      const style = {};
      const x = addUnit(state.value.x);
      const y = addUnit(state.value.y);
      style.transform = `translate3d(${x}, ${y}, 0)`;
      if (dragging.value || !initialized) {
        style.transition = "none";
      }
      return style;
    });
    const updateState = () => {
      if (!show.value)
        return;
      const {
        width: width2,
        height: height2
      } = useRect(rootRef.value);
      const {
        offset: offset2
      } = props2;
      state.value = {
        x: offset2.x > -1 ? offset2.x : windowWidth.value - width2 - props2.gap,
        y: offset2.y > -1 ? offset2.y : windowHeight.value - height2 - props2.gap,
        width: width2,
        height: height2
      };
    };
    const touch = useTouch();
    let prevX = 0;
    let prevY = 0;
    const onTouchStart = (e) => {
      touch.start(e);
      dragging.value = true;
      prevX = state.value.x;
      prevY = state.value.y;
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      touch.move(e);
      if (props2.axis === "lock")
        return;
      if (!touch.isTap.value) {
        if (props2.axis === "x" || props2.axis === "xy") {
          let nextX = prevX + touch.deltaX.value;
          if (nextX < boundary.value.left)
            nextX = boundary.value.left;
          if (nextX > boundary.value.right)
            nextX = boundary.value.right;
          state.value.x = nextX;
        }
        if (props2.axis === "y" || props2.axis === "xy") {
          let nextY = prevY + touch.deltaY.value;
          if (nextY < boundary.value.top)
            nextY = boundary.value.top;
          if (nextY > boundary.value.bottom)
            nextY = boundary.value.bottom;
          state.value.y = nextY;
        }
        const offset2 = pick(state.value, ["x", "y"]);
        emit("update:offset", offset2);
      }
    };
    useEventListener("touchmove", onTouchMove, {
      target: rootRef
    });
    const onTouchEnd = () => {
      dragging.value = false;
      nextTick19(() => {
        if (props2.magnetic === "x") {
          const nextX = closest([boundary.value.left, boundary.value.right], state.value.x);
          state.value.x = nextX;
        }
        if (props2.magnetic === "y") {
          const nextY = closest([boundary.value.top, boundary.value.bottom], state.value.y);
          state.value.y = nextY;
        }
        if (!touch.isTap.value) {
          const offset2 = pick(state.value, ["x", "y"]);
          emit("update:offset", offset2);
          if (prevX !== offset2.x || prevY !== offset2.y) {
            emit("offsetChange", offset2);
          }
        }
      });
    };
    const onClick = (e) => {
      if (touch.isTap.value)
        emit("click", e);
      else
        e.stopPropagation();
    };
    onMounted14(() => {
      updateState();
      nextTick19(() => {
        initialized = true;
      });
    });
    watch35([windowWidth, windowHeight, () => props2.gap, () => props2.offset], updateState, {
      deep: true
    });
    const show = ref41(true);
    onActivated8(() => {
      show.value = true;
    });
    onDeactivated9(() => {
      if (props2.teleport) {
        show.value = false;
      }
    });
    return () => {
      const Content = _withDirectives9(_createVNode70("div", _mergeProps22({
        "class": bem61(),
        "ref": rootRef,
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd,
        "onClickCapture": onClick,
        "style": rootStyle.value
      }, attrs), [slots.default ? slots.default() : _createVNode70(stdin_default7, {
        "name": props2.icon,
        "class": bem61("icon")
      }, null)]), [[_vShow8, show.value]]);
      return props2.teleport ? _createVNode70(Teleport4, {
        "to": props2.teleport
      }, {
        default: () => [Content]
      }) : Content;
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/floating-bubble/index.mjs
var FloatingBubble = withInstall(stdin_default69);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/floating-panel/FloatingPanel.mjs
import { createVNode as _createVNode71 } from "vue";
import { ref as ref42, watch as watch36, computed as computed39, defineComponent as defineComponent68 } from "vue";
var floatingPanelProps = {
  height: makeNumericProp(0),
  anchors: makeArrayProp(),
  duration: makeNumericProp(0.3),
  contentDraggable: truthProp,
  lockScroll: Boolean,
  safeAreaInsetBottom: truthProp
};
var [name67, bem62] = createNamespace("floating-panel");
var stdin_default70 = defineComponent68({
  name: name67,
  props: floatingPanelProps,
  emits: ["heightChange", "update:height"],
  setup(props2, {
    emit,
    slots
  }) {
    const DAMP = 0.2;
    const rootRef = ref42();
    const contentRef = ref42();
    const height2 = useSyncPropRef(() => +props2.height, (value) => emit("update:height", value));
    const boundary = computed39(() => {
      var _a, _b;
      return {
        min: (_a = props2.anchors[0]) != null ? _a : 100,
        max: (_b = props2.anchors[props2.anchors.length - 1]) != null ? _b : Math.round(windowHeight.value * 0.6)
      };
    });
    const anchors = computed39(() => props2.anchors.length >= 2 ? props2.anchors : [boundary.value.min, boundary.value.max]);
    const dragging = ref42(false);
    const rootStyle = computed39(() => ({
      height: addUnit(boundary.value.max),
      transform: `translateY(calc(100% + ${addUnit(-height2.value)}))`,
      transition: !dragging.value ? `transform ${props2.duration}s cubic-bezier(0.18, 0.89, 0.32, 1.28)` : "none"
    }));
    const ease = (moveY) => {
      const absDistance = Math.abs(moveY);
      const {
        min,
        max
      } = boundary.value;
      if (absDistance > max) {
        return -(max + (absDistance - max) * DAMP);
      }
      if (absDistance < min) {
        return -(min - (min - absDistance) * DAMP);
      }
      return moveY;
    };
    let startY;
    let maxScroll = -1;
    const touch = useTouch();
    const onTouchstart = (e) => {
      touch.start(e);
      dragging.value = true;
      startY = -height2.value;
      maxScroll = -1;
    };
    const onTouchmove = (e) => {
      var _a;
      touch.move(e);
      const target = e.target;
      if (contentRef.value === target || ((_a = contentRef.value) == null ? void 0 : _a.contains(target))) {
        const {
          scrollTop
        } = contentRef.value;
        maxScroll = Math.max(maxScroll, scrollTop);
        if (!props2.contentDraggable)
          return;
        if (-startY < boundary.value.max) {
          preventDefault(e, true);
        } else if (!(scrollTop <= 0 && touch.deltaY.value > 0) || maxScroll > 0) {
          return;
        }
      }
      const moveY = touch.deltaY.value + startY;
      height2.value = -ease(moveY);
    };
    const onTouchend = () => {
      maxScroll = -1;
      dragging.value = false;
      height2.value = closest(anchors.value, height2.value);
      if (height2.value !== -startY) {
        emit("heightChange", {
          height: height2.value
        });
      }
    };
    watch36(boundary, () => {
      height2.value = closest(anchors.value, height2.value);
    }, {
      immediate: true
    });
    useLockScroll(rootRef, () => props2.lockScroll || dragging.value);
    useEventListener("touchmove", onTouchmove, {
      target: rootRef
    });
    const renderHeader = () => {
      if (slots.header) {
        return slots.header();
      }
      return _createVNode71("div", {
        "class": bem62("header")
      }, [_createVNode71("div", {
        "class": bem62("header-bar")
      }, null)]);
    };
    return () => {
      var _a;
      return _createVNode71("div", {
        "class": [bem62(), {
          "van-safe-area-bottom": props2.safeAreaInsetBottom
        }],
        "ref": rootRef,
        "style": rootStyle.value,
        "onTouchstartPassive": onTouchstart,
        "onTouchend": onTouchend,
        "onTouchcancel": onTouchend
      }, [renderHeader(), _createVNode71("div", {
        "class": bem62("content"),
        "ref": contentRef
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/floating-panel/index.mjs
var FloatingPanel = withInstall(stdin_default70);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/grid/Grid.mjs
import { createVNode as _createVNode72 } from "vue";
import { defineComponent as defineComponent69 } from "vue";
var [name68, bem63] = createNamespace("grid");
var gridProps = {
  square: Boolean,
  center: truthProp,
  border: truthProp,
  gutter: numericProp,
  reverse: Boolean,
  iconSize: numericProp,
  direction: String,
  clickable: Boolean,
  columnNum: makeNumericProp(4)
};
var GRID_KEY = Symbol(name68);
var stdin_default71 = defineComponent69({
  name: name68,
  props: gridProps,
  setup(props2, {
    slots
  }) {
    const {
      linkChildren
    } = useChildren(GRID_KEY);
    linkChildren({
      props: props2
    });
    return () => {
      var _a;
      return _createVNode72("div", {
        "style": {
          paddingLeft: addUnit(props2.gutter)
        },
        "class": [bem63(), {
          [BORDER_TOP]: props2.border && !props2.gutter
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/grid/index.mjs
var Grid = withInstall(stdin_default71);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/grid-item/GridItem.mjs
import { createVNode as _createVNode73, mergeProps as _mergeProps23 } from "vue";
import { computed as computed40, defineComponent as defineComponent70 } from "vue";
var [name69, bem64] = createNamespace("grid-item");
var gridItemProps = extend({}, routeProps, {
  dot: Boolean,
  text: String,
  icon: String,
  badge: numericProp,
  iconColor: String,
  iconPrefix: String,
  badgeProps: Object
});
var stdin_default72 = defineComponent70({
  name: name69,
  props: gridItemProps,
  setup(props2, {
    slots
  }) {
    const {
      parent,
      index
    } = useParent(GRID_KEY);
    const route2 = useRoute();
    if (!parent) {
      if (true) {
        console.error("[Vant] <GridItem> must be a child component of <Grid>.");
      }
      return;
    }
    const rootStyle = computed40(() => {
      const {
        square,
        gutter,
        columnNum
      } = parent.props;
      const percent = `${100 / +columnNum}%`;
      const style = {
        flexBasis: percent
      };
      if (square) {
        style.paddingTop = percent;
      } else if (gutter) {
        const gutterValue = addUnit(gutter);
        style.paddingRight = gutterValue;
        if (index.value >= +columnNum) {
          style.marginTop = gutterValue;
        }
      }
      return style;
    });
    const contentStyle = computed40(() => {
      const {
        square,
        gutter
      } = parent.props;
      if (square && gutter) {
        const gutterValue = addUnit(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: "auto"
        };
      }
    });
    const renderIcon = () => {
      if (slots.icon) {
        return _createVNode73(Badge, _mergeProps23({
          "dot": props2.dot,
          "content": props2.badge
        }, props2.badgeProps), {
          default: slots.icon
        });
      }
      if (props2.icon) {
        return _createVNode73(Icon, {
          "dot": props2.dot,
          "name": props2.icon,
          "size": parent.props.iconSize,
          "badge": props2.badge,
          "class": bem64("icon"),
          "color": props2.iconColor,
          "badgeProps": props2.badgeProps,
          "classPrefix": props2.iconPrefix
        }, null);
      }
    };
    const renderText = () => {
      if (slots.text) {
        return slots.text();
      }
      if (props2.text) {
        return _createVNode73("span", {
          "class": bem64("text")
        }, [props2.text]);
      }
    };
    const renderContent = () => {
      if (slots.default) {
        return slots.default();
      }
      return [renderIcon(), renderText()];
    };
    return () => {
      const {
        center,
        border,
        square,
        gutter,
        reverse,
        direction,
        clickable
      } = parent.props;
      const classes = [bem64("content", [direction, {
        center,
        square,
        reverse,
        clickable,
        surround: border && gutter
      }]), {
        [BORDER]: border
      }];
      return _createVNode73("div", {
        "class": [bem64({
          square
        })],
        "style": rootStyle.value
      }, [_createVNode73("div", {
        "role": clickable ? "button" : void 0,
        "class": classes,
        "style": contentStyle.value,
        "tabindex": clickable ? 0 : void 0,
        "onClick": route2
      }, [renderContent()])]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/grid-item/index.mjs
var GridItem = withInstall(stdin_default72);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/highlight/Highlight.mjs
import { createVNode as _createVNode74 } from "vue";
import { defineComponent as defineComponent71, computed as computed41 } from "vue";
var [name70, bem65] = createNamespace("highlight");
var highlightProps = {
  autoEscape: truthProp,
  caseSensitive: Boolean,
  highlightClass: String,
  highlightTag: makeStringProp("span"),
  keywords: makeRequiredProp([String, Array]),
  sourceString: makeStringProp(""),
  tag: makeStringProp("div"),
  unhighlightClass: String,
  unhighlightTag: makeStringProp("span")
};
var stdin_default73 = defineComponent71({
  name: name70,
  props: highlightProps,
  setup(props2) {
    const highlightChunks = computed41(() => {
      const {
        autoEscape,
        caseSensitive,
        keywords,
        sourceString
      } = props2;
      const flags = caseSensitive ? "g" : "gi";
      const _keywords = Array.isArray(keywords) ? keywords : [keywords];
      let chunks = _keywords.filter((keyword) => keyword).reduce((chunks2, keyword) => {
        if (autoEscape) {
          keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
        const regex = new RegExp(keyword, flags);
        let match;
        while (match = regex.exec(sourceString)) {
          const start2 = match.index;
          const end2 = regex.lastIndex;
          if (start2 >= end2) {
            regex.lastIndex++;
            continue;
          }
          chunks2.push({
            start: start2,
            end: end2,
            highlight: true
          });
        }
        return chunks2;
      }, []);
      chunks = chunks.sort((a, b) => a.start - b.start).reduce((chunks2, currentChunk) => {
        const prevChunk = chunks2[chunks2.length - 1];
        if (!prevChunk || currentChunk.start > prevChunk.end) {
          const unhighlightStart = prevChunk ? prevChunk.end : 0;
          const unhighlightEnd = currentChunk.start;
          if (unhighlightStart !== unhighlightEnd) {
            chunks2.push({
              start: unhighlightStart,
              end: unhighlightEnd,
              highlight: false
            });
          }
          chunks2.push(currentChunk);
        } else {
          prevChunk.end = Math.max(prevChunk.end, currentChunk.end);
        }
        return chunks2;
      }, []);
      const lastChunk = chunks[chunks.length - 1];
      if (!lastChunk) {
        chunks.push({
          start: 0,
          end: sourceString.length,
          highlight: false
        });
      }
      if (lastChunk && lastChunk.end < sourceString.length) {
        chunks.push({
          start: lastChunk.end,
          end: sourceString.length,
          highlight: false
        });
      }
      return chunks;
    });
    const renderContent = () => {
      const {
        sourceString,
        highlightClass,
        unhighlightClass,
        highlightTag,
        unhighlightTag
      } = props2;
      return highlightChunks.value.map((chunk) => {
        const {
          start: start2,
          end: end2,
          highlight
        } = chunk;
        const text = sourceString.slice(start2, end2);
        if (highlight) {
          return _createVNode74(highlightTag, {
            "class": [bem65("tag"), highlightClass]
          }, {
            default: () => [text]
          });
        }
        return _createVNode74(unhighlightTag, {
          "class": unhighlightClass
        }, {
          default: () => [text]
        });
      });
    };
    return () => {
      const {
        tag
      } = props2;
      return _createVNode74(tag, {
        "class": bem65()
      }, {
        default: () => [renderContent()]
      });
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/highlight/index.mjs
var Highlight = withInstall(stdin_default73);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/image-preview/ImagePreview.mjs
import { mergeProps as _mergeProps24, createVNode as _createVNode76 } from "vue";
import { ref as ref44, watch as watch38, nextTick as nextTick20, reactive as reactive14, onMounted as onMounted15, defineComponent as defineComponent73 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/image-preview/ImagePreviewItem.mjs
import { createVNode as _createVNode75 } from "vue";
import { ref as ref43, watch as watch37, computed as computed42, reactive as reactive13, defineComponent as defineComponent72 } from "vue";
var getDistance = (touches) => Math.sqrt((touches[0].clientX - touches[1].clientX) ** 2 + (touches[0].clientY - touches[1].clientY) ** 2);
var getCenter = (touches) => ({
  x: (touches[0].clientX + touches[1].clientX) / 2,
  y: (touches[0].clientY + touches[1].clientY) / 2
});
var bem66 = createNamespace("image-preview")[1];
var longImageRatio = 2.6;
var imagePreviewItemProps = {
  src: String,
  show: Boolean,
  active: Number,
  minZoom: makeRequiredProp(numericProp),
  maxZoom: makeRequiredProp(numericProp),
  rootWidth: makeRequiredProp(Number),
  rootHeight: makeRequiredProp(Number),
  disableZoom: Boolean,
  doubleScale: Boolean,
  closeOnClickImage: Boolean,
  closeOnClickOverlay: Boolean,
  vertical: Boolean
};
var stdin_default74 = defineComponent72({
  props: imagePreviewItemProps,
  emits: ["scale", "close", "longPress"],
  setup(props2, {
    emit,
    slots
  }) {
    const state = reactive13({
      scale: 1,
      moveX: 0,
      moveY: 0,
      moving: false,
      zooming: false,
      initializing: false,
      imageRatio: 0
    });
    const touch = useTouch();
    const imageRef = ref43();
    const swipeItem = ref43();
    const vertical = ref43(false);
    const isLongImage = ref43(false);
    let initialMoveY = 0;
    const imageStyle = computed42(() => {
      const {
        scale,
        moveX,
        moveY,
        moving,
        zooming,
        initializing
      } = state;
      const style = {
        transitionDuration: zooming || moving || initializing ? "0s" : ".3s"
      };
      if (scale !== 1 || isLongImage.value) {
        style.transform = `matrix(${scale}, 0, 0, ${scale}, ${moveX}, ${moveY})`;
      }
      return style;
    });
    const maxMoveX = computed42(() => {
      if (state.imageRatio) {
        const {
          rootWidth,
          rootHeight
        } = props2;
        const displayWidth = vertical.value ? rootHeight / state.imageRatio : rootWidth;
        return Math.max(0, (state.scale * displayWidth - rootWidth) / 2);
      }
      return 0;
    });
    const maxMoveY = computed42(() => {
      if (state.imageRatio) {
        const {
          rootWidth,
          rootHeight
        } = props2;
        const displayHeight = vertical.value ? rootHeight : rootWidth * state.imageRatio;
        return Math.max(0, (state.scale * displayHeight - rootHeight) / 2);
      }
      return 0;
    });
    const setScale = (scale, center) => {
      var _a;
      scale = clamp(scale, +props2.minZoom, +props2.maxZoom + 1);
      if (scale !== state.scale) {
        const ratio = scale / state.scale;
        state.scale = scale;
        if (center) {
          const imageRect = useRect((_a = imageRef.value) == null ? void 0 : _a.$el);
          const origin = {
            x: imageRect.width * 0.5,
            y: imageRect.height * 0.5
          };
          const moveX = state.moveX - (center.x - imageRect.left - origin.x) * (ratio - 1);
          const moveY = state.moveY - (center.y - imageRect.top - origin.y) * (ratio - 1);
          state.moveX = clamp(moveX, -maxMoveX.value, maxMoveX.value);
          state.moveY = clamp(moveY, -maxMoveY.value, maxMoveY.value);
        } else {
          state.moveX = 0;
          state.moveY = isLongImage.value ? initialMoveY : 0;
        }
        emit("scale", {
          scale,
          index: props2.active
        });
      }
    };
    const resetScale = () => {
      setScale(1);
    };
    const toggleScale = () => {
      const scale = state.scale > 1 ? 1 : 2;
      setScale(scale, scale === 2 || isLongImage.value ? {
        x: touch.startX.value,
        y: touch.startY.value
      } : void 0);
    };
    let fingerNum;
    let startMoveX;
    let startMoveY;
    let startScale;
    let startDistance;
    let lastCenter;
    let doubleTapTimer;
    let touchStartTime;
    let isImageMoved = false;
    const onTouchStart = (event) => {
      const {
        touches
      } = event;
      fingerNum = touches.length;
      if (fingerNum === 2 && props2.disableZoom) {
        return;
      }
      const {
        offsetX
      } = touch;
      touch.start(event);
      startMoveX = state.moveX;
      startMoveY = state.moveY;
      touchStartTime = Date.now();
      isImageMoved = false;
      state.moving = fingerNum === 1 && (state.scale !== 1 || isLongImage.value);
      state.zooming = fingerNum === 2 && !offsetX.value;
      if (state.zooming) {
        startScale = state.scale;
        startDistance = getDistance(touches);
      }
    };
    const onTouchMove = (event) => {
      const {
        touches
      } = event;
      touch.move(event);
      if (state.moving) {
        const {
          deltaX,
          deltaY
        } = touch;
        const moveX = deltaX.value + startMoveX;
        const moveY = deltaY.value + startMoveY;
        if ((props2.vertical ? touch.isVertical() && Math.abs(moveY) > maxMoveY.value : touch.isHorizontal() && Math.abs(moveX) > maxMoveX.value) && !isImageMoved) {
          state.moving = false;
          return;
        }
        isImageMoved = true;
        preventDefault(event, true);
        state.moveX = clamp(moveX, -maxMoveX.value, maxMoveX.value);
        state.moveY = clamp(moveY, -maxMoveY.value, maxMoveY.value);
      }
      if (state.zooming) {
        preventDefault(event, true);
        if (touches.length === 2) {
          const distance = getDistance(touches);
          const scale = startScale * distance / startDistance;
          lastCenter = getCenter(touches);
          setScale(scale, lastCenter);
        }
      }
    };
    const checkClose = (event) => {
      var _a;
      const swipeItemEl = (_a = swipeItem.value) == null ? void 0 : _a.$el;
      if (!swipeItemEl)
        return;
      const imageEl = swipeItemEl.firstElementChild;
      const isClickOverlay = event.target === swipeItemEl;
      const isClickImage = imageEl == null ? void 0 : imageEl.contains(event.target);
      if (!props2.closeOnClickImage && isClickImage)
        return;
      if (!props2.closeOnClickOverlay && isClickOverlay)
        return;
      emit("close");
    };
    const checkTap = (event) => {
      if (fingerNum > 1) {
        return;
      }
      const deltaTime = Date.now() - touchStartTime;
      const TAP_TIME = 250;
      if (touch.isTap.value) {
        if (deltaTime < TAP_TIME) {
          if (props2.doubleScale) {
            if (doubleTapTimer) {
              clearTimeout(doubleTapTimer);
              doubleTapTimer = null;
              toggleScale();
            } else {
              doubleTapTimer = setTimeout(() => {
                checkClose(event);
                doubleTapTimer = null;
              }, TAP_TIME);
            }
          } else {
            checkClose(event);
          }
        } else if (deltaTime > LONG_PRESS_START_TIME) {
          emit("longPress");
        }
      }
    };
    const onTouchEnd = (event) => {
      let stopPropagation2 = false;
      if (state.moving || state.zooming) {
        stopPropagation2 = true;
        if (state.moving && startMoveX === state.moveX && startMoveY === state.moveY) {
          stopPropagation2 = false;
        }
        if (!event.touches.length) {
          if (state.zooming) {
            state.moveX = clamp(state.moveX, -maxMoveX.value, maxMoveX.value);
            state.moveY = clamp(state.moveY, -maxMoveY.value, maxMoveY.value);
            state.zooming = false;
          }
          state.moving = false;
          startMoveX = 0;
          startMoveY = 0;
          startScale = 1;
          if (state.scale < 1) {
            resetScale();
          }
          const maxZoom = +props2.maxZoom;
          if (state.scale > maxZoom) {
            setScale(maxZoom, lastCenter);
          }
        }
      }
      preventDefault(event, stopPropagation2);
      checkTap(event);
      touch.reset();
    };
    const resize = () => {
      const {
        rootWidth,
        rootHeight
      } = props2;
      const rootRatio = rootHeight / rootWidth;
      const {
        imageRatio
      } = state;
      vertical.value = state.imageRatio > rootRatio && imageRatio < longImageRatio;
      isLongImage.value = state.imageRatio > rootRatio && imageRatio >= longImageRatio;
      if (isLongImage.value) {
        initialMoveY = (imageRatio * rootWidth - rootHeight) / 2;
        state.moveY = initialMoveY;
        state.initializing = true;
        raf(() => {
          state.initializing = false;
        });
      }
      resetScale();
    };
    const onLoad = (event) => {
      const {
        naturalWidth,
        naturalHeight
      } = event.target;
      state.imageRatio = naturalHeight / naturalWidth;
      resize();
    };
    watch37(() => props2.active, resetScale);
    watch37(() => props2.show, (value) => {
      if (!value) {
        resetScale();
      }
    });
    watch37(() => [props2.rootWidth, props2.rootHeight], resize);
    useEventListener("touchmove", onTouchMove, {
      target: computed42(() => {
        var _a;
        return (_a = swipeItem.value) == null ? void 0 : _a.$el;
      })
    });
    useExpose({
      resetScale
    });
    return () => {
      const imageSlots = {
        loading: () => _createVNode75(Loading, {
          "type": "spinner"
        }, null)
      };
      return _createVNode75(SwipeItem, {
        "ref": swipeItem,
        "class": bem66("swipe-item"),
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, {
        default: () => [slots.image ? _createVNode75("div", {
          "class": bem66("image-wrap")
        }, [slots.image({
          src: props2.src,
          onLoad,
          style: imageStyle.value
        })]) : _createVNode75(Image2, {
          "ref": imageRef,
          "src": props2.src,
          "fit": "contain",
          "class": bem66("image", {
            vertical: vertical.value
          }),
          "style": imageStyle.value,
          "onLoad": onLoad
        }, imageSlots)]
      });
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/image-preview/ImagePreview.mjs
var [name71, bem67] = createNamespace("image-preview");
var popupProps2 = ["show", "teleport", "transition", "overlayStyle", "closeOnPopstate"];
var imagePreviewProps = {
  show: Boolean,
  loop: truthProp,
  images: makeArrayProp(),
  minZoom: makeNumericProp(1 / 3),
  maxZoom: makeNumericProp(3),
  overlay: truthProp,
  vertical: Boolean,
  closeable: Boolean,
  showIndex: truthProp,
  className: unknownProp,
  closeIcon: makeStringProp("clear"),
  transition: String,
  beforeClose: Function,
  doubleScale: truthProp,
  overlayClass: unknownProp,
  overlayStyle: Object,
  swipeDuration: makeNumericProp(300),
  startPosition: makeNumericProp(0),
  showIndicators: Boolean,
  closeOnPopstate: truthProp,
  closeOnClickImage: truthProp,
  closeOnClickOverlay: truthProp,
  closeIconPosition: makeStringProp("top-right"),
  teleport: [String, Object]
};
var stdin_default75 = defineComponent73({
  name: name71,
  props: imagePreviewProps,
  emits: ["scale", "close", "closed", "change", "longPress", "update:show"],
  setup(props2, {
    emit,
    slots
  }) {
    const swipeRef = ref44();
    const activedPreviewItemRef = ref44();
    const state = reactive14({
      active: 0,
      rootWidth: 0,
      rootHeight: 0,
      disableZoom: false
    });
    const resize = () => {
      if (swipeRef.value) {
        const rect = useRect(swipeRef.value.$el);
        state.rootWidth = rect.width;
        state.rootHeight = rect.height;
        swipeRef.value.resize();
      }
    };
    const emitScale = (args) => emit("scale", args);
    const updateShow = (show) => emit("update:show", show);
    const emitClose = () => {
      callInterceptor(props2.beforeClose, {
        args: [state.active],
        done: () => updateShow(false)
      });
    };
    const setActive = (active) => {
      if (active !== state.active) {
        state.active = active;
        emit("change", active);
      }
    };
    const renderIndex = () => {
      if (props2.showIndex) {
        return _createVNode76("div", {
          "class": bem67("index")
        }, [slots.index ? slots.index({
          index: state.active
        }) : `${state.active + 1} / ${props2.images.length}`]);
      }
    };
    const renderCover = () => {
      if (slots.cover) {
        return _createVNode76("div", {
          "class": bem67("cover")
        }, [slots.cover()]);
      }
    };
    const onDragStart = () => {
      state.disableZoom = true;
    };
    const onDragEnd = () => {
      state.disableZoom = false;
    };
    const renderImages = () => _createVNode76(Swipe, {
      "ref": swipeRef,
      "lazyRender": true,
      "loop": props2.loop,
      "class": bem67("swipe"),
      "vertical": props2.vertical,
      "duration": props2.swipeDuration,
      "initialSwipe": props2.startPosition,
      "showIndicators": props2.showIndicators,
      "indicatorColor": "white",
      "onChange": setActive,
      "onDragEnd": onDragEnd,
      "onDragStart": onDragStart
    }, {
      default: () => [props2.images.map((image, index) => _createVNode76(stdin_default74, {
        "ref": (item) => {
          if (index === state.active) {
            activedPreviewItemRef.value = item;
          }
        },
        "src": image,
        "show": props2.show,
        "active": state.active,
        "maxZoom": props2.maxZoom,
        "minZoom": props2.minZoom,
        "rootWidth": state.rootWidth,
        "rootHeight": state.rootHeight,
        "disableZoom": state.disableZoom,
        "doubleScale": props2.doubleScale,
        "closeOnClickImage": props2.closeOnClickImage,
        "closeOnClickOverlay": props2.closeOnClickOverlay,
        "vertical": props2.vertical,
        "onScale": emitScale,
        "onClose": emitClose,
        "onLongPress": () => emit("longPress", {
          index
        })
      }, {
        image: slots.image
      }))]
    });
    const renderClose = () => {
      if (props2.closeable) {
        return _createVNode76(Icon, {
          "role": "button",
          "name": props2.closeIcon,
          "class": [bem67("close-icon", props2.closeIconPosition), HAPTICS_FEEDBACK],
          "onClick": emitClose
        }, null);
      }
    };
    const onClosed = () => emit("closed");
    const swipeTo = (index, options) => {
      var _a;
      return (_a = swipeRef.value) == null ? void 0 : _a.swipeTo(index, options);
    };
    useExpose({
      resetScale: () => {
        var _a;
        (_a = activedPreviewItemRef.value) == null ? void 0 : _a.resetScale();
      },
      swipeTo
    });
    onMounted15(resize);
    watch38([windowWidth, windowHeight], resize);
    watch38(() => props2.startPosition, (value) => setActive(+value));
    watch38(() => props2.show, (value) => {
      const {
        images,
        startPosition
      } = props2;
      if (value) {
        setActive(+startPosition);
        nextTick20(() => {
          resize();
          swipeTo(+startPosition, {
            immediate: true
          });
        });
      } else {
        emit("close", {
          index: state.active,
          url: images[state.active]
        });
      }
    });
    return () => _createVNode76(Popup, _mergeProps24({
      "class": [bem67(), props2.className],
      "overlayClass": [bem67("overlay"), props2.overlayClass],
      "onClosed": onClosed,
      "onUpdate:show": updateShow
    }, pick(props2, popupProps2)), {
      default: () => [renderClose(), renderImages(), renderIndex(), renderCover()]
    });
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/image-preview/function-call.mjs
import { createVNode as _createVNode77, mergeProps as _mergeProps25 } from "vue";
var instance2;
var defaultConfig = {
  loop: true,
  images: [],
  maxZoom: 3,
  minZoom: 1 / 3,
  onScale: void 0,
  onClose: void 0,
  onChange: void 0,
  vertical: false,
  teleport: "body",
  className: "",
  showIndex: true,
  closeable: false,
  closeIcon: "clear",
  transition: void 0,
  beforeClose: void 0,
  doubleScale: true,
  overlayStyle: void 0,
  overlayClass: void 0,
  startPosition: 0,
  swipeDuration: 300,
  showIndicators: false,
  closeOnPopstate: true,
  closeOnClickOverlay: true,
  closeIconPosition: "top-right"
};
function initInstance2() {
  ({
    instance: instance2
  } = mountComponent({
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      const onClosed = () => {
        state.images = [];
      };
      return () => _createVNode77(stdin_default75, _mergeProps25(state, {
        "onClosed": onClosed,
        "onUpdate:show": toggle
      }), null);
    }
  }));
}
var showImagePreview = (options, startPosition = 0) => {
  if (!inBrowser) {
    return;
  }
  if (!instance2) {
    initInstance2();
  }
  options = Array.isArray(options) ? {
    images: options,
    startPosition
  } : options;
  instance2.open(extend({}, defaultConfig, options));
  return instance2;
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/image-preview/index.mjs
var ImagePreview = withInstall(stdin_default75);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/index-anchor/IndexAnchor.mjs
import { createVNode as _createVNode79 } from "vue";
import { ref as ref46, reactive as reactive15, computed as computed44, defineComponent as defineComponent75 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/index-bar/IndexBar.mjs
import { createVNode as _createVNode78 } from "vue";
import { ref as ref45, watch as watch39, computed as computed43, nextTick as nextTick21, Teleport as Teleport5, onMounted as onMounted16, defineComponent as defineComponent74 } from "vue";
function genAlphabet() {
  const charCodeOfA = "A".charCodeAt(0);
  const indexList = Array(26).fill("").map((_, i) => String.fromCharCode(charCodeOfA + i));
  return indexList;
}
var [name72, bem68] = createNamespace("index-bar");
var indexBarProps = {
  sticky: truthProp,
  zIndex: numericProp,
  teleport: [String, Object],
  highlightColor: String,
  stickyOffsetTop: makeNumberProp(0),
  indexList: {
    type: Array,
    default: genAlphabet
  }
};
var INDEX_BAR_KEY = Symbol(name72);
var stdin_default76 = defineComponent74({
  name: name72,
  props: indexBarProps,
  emits: ["select", "change"],
  setup(props2, {
    emit,
    slots
  }) {
    const root = ref45();
    const sidebar = ref45();
    const activeAnchor = ref45("");
    const touch = useTouch();
    const scrollParent = useScrollParent(root);
    const {
      children,
      linkChildren
    } = useChildren(INDEX_BAR_KEY);
    let selectActiveIndex;
    linkChildren({
      props: props2
    });
    const sidebarStyle = computed43(() => {
      if (isDef(props2.zIndex)) {
        return {
          zIndex: +props2.zIndex + 1
        };
      }
    });
    const highlightStyle = computed43(() => {
      if (props2.highlightColor) {
        return {
          color: props2.highlightColor
        };
      }
    });
    const getActiveAnchor = (scrollTop, rects) => {
      for (let i = children.length - 1; i >= 0; i--) {
        const prevHeight = i > 0 ? rects[i - 1].height : 0;
        const reachTop = props2.sticky ? prevHeight + props2.stickyOffsetTop : 0;
        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }
      return -1;
    };
    const getMatchAnchor = (index) => children.find((item) => String(item.index) === index);
    const onScroll = () => {
      if (isHidden(root)) {
        return;
      }
      const {
        sticky,
        indexList
      } = props2;
      const scrollTop = getScrollTop(scrollParent.value);
      const scrollParentRect = useRect(scrollParent);
      const rects = children.map((item) => item.getRect(scrollParent.value, scrollParentRect));
      let active = -1;
      if (selectActiveIndex) {
        const match = getMatchAnchor(selectActiveIndex);
        if (match) {
          const rect = match.getRect(scrollParent.value, scrollParentRect);
          if (props2.sticky && props2.stickyOffsetTop) {
            active = getActiveAnchor(rect.top - props2.stickyOffsetTop, rects);
          } else {
            active = getActiveAnchor(rect.top, rects);
          }
        }
      } else {
        active = getActiveAnchor(scrollTop, rects);
      }
      activeAnchor.value = indexList[active];
      if (sticky) {
        children.forEach((item, index) => {
          const {
            state,
            $el
          } = item;
          if (index === active || index === active - 1) {
            const rect = $el.getBoundingClientRect();
            state.left = rect.left;
            state.width = rect.width;
          } else {
            state.left = null;
            state.width = null;
          }
          if (index === active) {
            state.active = true;
            state.top = Math.max(props2.stickyOffsetTop, rects[index].top - scrollTop) + scrollParentRect.top;
          } else if (index === active - 1 && selectActiveIndex === "") {
            const activeItemTop = rects[active].top - scrollTop;
            state.active = activeItemTop > 0;
            state.top = activeItemTop + scrollParentRect.top - rects[index].height;
          } else {
            state.active = false;
          }
        });
      }
      selectActiveIndex = "";
    };
    const init = () => {
      nextTick21(onScroll);
    };
    useEventListener("scroll", onScroll, {
      target: scrollParent,
      passive: true
    });
    onMounted16(init);
    watch39(() => props2.indexList, init);
    watch39(activeAnchor, (value) => {
      if (value) {
        emit("change", value);
      }
    });
    const renderIndexes = () => props2.indexList.map((index) => {
      const active = index === activeAnchor.value;
      return _createVNode78("span", {
        "class": bem68("index", {
          active
        }),
        "style": active ? highlightStyle.value : void 0,
        "data-index": index
      }, [index]);
    });
    const scrollTo = (index) => {
      selectActiveIndex = String(index);
      const match = getMatchAnchor(selectActiveIndex);
      if (match) {
        const scrollTop = getScrollTop(scrollParent.value);
        const scrollParentRect = useRect(scrollParent);
        const {
          offsetHeight
        } = document.documentElement;
        match.$el.scrollIntoView();
        if (scrollTop === offsetHeight - scrollParentRect.height) {
          onScroll();
          return;
        }
        if (props2.sticky && props2.stickyOffsetTop) {
          if (getRootScrollTop() === offsetHeight - scrollParentRect.height) {
            setRootScrollTop(getRootScrollTop());
          } else {
            setRootScrollTop(getRootScrollTop() - props2.stickyOffsetTop);
          }
        }
        emit("select", match.index);
      }
    };
    const scrollToElement = (element) => {
      const {
        index
      } = element.dataset;
      if (index) {
        scrollTo(index);
      }
    };
    const onClickSidebar = (event) => {
      scrollToElement(event.target);
    };
    let touchActiveIndex;
    const onTouchMove = (event) => {
      touch.move(event);
      if (touch.isVertical()) {
        preventDefault(event);
        const {
          clientX,
          clientY
        } = event.touches[0];
        const target = document.elementFromPoint(clientX, clientY);
        if (target) {
          const {
            index
          } = target.dataset;
          if (index && touchActiveIndex !== index) {
            touchActiveIndex = index;
            scrollToElement(target);
          }
        }
      }
    };
    const renderSidebar = () => _createVNode78("div", {
      "ref": sidebar,
      "class": bem68("sidebar"),
      "style": sidebarStyle.value,
      "onClick": onClickSidebar,
      "onTouchstartPassive": touch.start
    }, [renderIndexes()]);
    useExpose({
      scrollTo
    });
    useEventListener("touchmove", onTouchMove, {
      target: sidebar
    });
    return () => {
      var _a;
      return _createVNode78("div", {
        "ref": root,
        "class": bem68()
      }, [props2.teleport ? _createVNode78(Teleport5, {
        "to": props2.teleport
      }, {
        default: () => [renderSidebar()]
      }) : renderSidebar(), (_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/index-anchor/IndexAnchor.mjs
var [name73, bem69] = createNamespace("index-anchor");
var indexAnchorProps = {
  index: numericProp
};
var stdin_default77 = defineComponent75({
  name: name73,
  props: indexAnchorProps,
  setup(props2, {
    slots
  }) {
    const state = reactive15({
      top: 0,
      left: null,
      rect: {
        top: 0,
        height: 0
      },
      width: null,
      active: false
    });
    const root = ref46();
    const {
      parent
    } = useParent(INDEX_BAR_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <IndexAnchor> must be a child component of <IndexBar>.");
      }
      return;
    }
    const isSticky = () => state.active && parent.props.sticky;
    const anchorStyle = computed44(() => {
      const {
        zIndex,
        highlightColor
      } = parent.props;
      if (isSticky()) {
        return extend(getZIndexStyle(zIndex), {
          left: state.left ? `${state.left}px` : void 0,
          width: state.width ? `${state.width}px` : void 0,
          transform: state.top ? `translate3d(0, ${state.top}px, 0)` : void 0,
          color: highlightColor
        });
      }
    });
    const getRect = (scrollParent, scrollParentRect) => {
      const rootRect = useRect(root);
      state.rect.height = rootRect.height;
      if (scrollParent === window || scrollParent === document.body) {
        state.rect.top = rootRect.top + getRootScrollTop();
      } else {
        state.rect.top = rootRect.top + getScrollTop(scrollParent) - scrollParentRect.top;
      }
      return state.rect;
    };
    useExpose({
      state,
      getRect
    });
    return () => {
      const sticky = isSticky();
      return _createVNode79("div", {
        "ref": root,
        "style": {
          height: sticky ? `${state.rect.height}px` : void 0
        }
      }, [_createVNode79("div", {
        "style": anchorStyle.value,
        "class": [bem69({
          sticky
        }), {
          [BORDER_BOTTOM]: sticky
        }]
      }, [slots.default ? slots.default() : props2.index])]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/index-anchor/index.mjs
var IndexAnchor = withInstall(stdin_default77);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/index-bar/index.mjs
var IndexBar = withInstall(stdin_default76);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/list/List.mjs
import { createVNode as _createVNode80 } from "vue";
import { ref as ref47, watch as watch40, computed as computed45, nextTick as nextTick22, onUpdated, onMounted as onMounted17, defineComponent as defineComponent76 } from "vue";
var [name74, bem70, t14] = createNamespace("list");
var listProps = {
  error: Boolean,
  offset: makeNumericProp(300),
  loading: Boolean,
  disabled: Boolean,
  finished: Boolean,
  scroller: Object,
  errorText: String,
  direction: makeStringProp("down"),
  loadingText: String,
  finishedText: String,
  immediateCheck: truthProp
};
var stdin_default78 = defineComponent76({
  name: name74,
  props: listProps,
  emits: ["load", "update:error", "update:loading"],
  setup(props2, {
    emit,
    slots
  }) {
    const loading = ref47(props2.loading);
    const root = ref47();
    const placeholder = ref47();
    const tabStatus = useTabStatus();
    const scrollParent = useScrollParent(root);
    const scroller = computed45(() => props2.scroller || scrollParent.value);
    const check = () => {
      nextTick22(() => {
        if (loading.value || props2.finished || props2.disabled || props2.error || // skip check when inside an inactive tab
        (tabStatus == null ? void 0 : tabStatus.value) === false) {
          return;
        }
        const {
          direction
        } = props2;
        const offset2 = +props2.offset;
        const scrollParentRect = useRect(scroller);
        if (!scrollParentRect.height || isHidden(root)) {
          return;
        }
        let isReachEdge = false;
        const placeholderRect = useRect(placeholder);
        if (direction === "up") {
          isReachEdge = scrollParentRect.top - placeholderRect.top <= offset2;
        } else {
          isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= offset2;
        }
        if (isReachEdge) {
          loading.value = true;
          emit("update:loading", true);
          emit("load");
        }
      });
    };
    const renderFinishedText = () => {
      if (props2.finished) {
        const text = slots.finished ? slots.finished() : props2.finishedText;
        if (text) {
          return _createVNode80("div", {
            "class": bem70("finished-text")
          }, [text]);
        }
      }
    };
    const clickErrorText = () => {
      emit("update:error", false);
      check();
    };
    const renderErrorText = () => {
      if (props2.error) {
        const text = slots.error ? slots.error() : props2.errorText;
        if (text) {
          return _createVNode80("div", {
            "role": "button",
            "class": bem70("error-text"),
            "tabindex": 0,
            "onClick": clickErrorText
          }, [text]);
        }
      }
    };
    const renderLoading = () => {
      if (loading.value && !props2.finished && !props2.disabled) {
        return _createVNode80("div", {
          "class": bem70("loading")
        }, [slots.loading ? slots.loading() : _createVNode80(Loading, {
          "class": bem70("loading-icon")
        }, {
          default: () => [props2.loadingText || t14("loading")]
        })]);
      }
    };
    watch40(() => [props2.loading, props2.finished, props2.error], check);
    if (tabStatus) {
      watch40(tabStatus, (tabActive) => {
        if (tabActive) {
          check();
        }
      });
    }
    onUpdated(() => {
      loading.value = props2.loading;
    });
    onMounted17(() => {
      if (props2.immediateCheck) {
        check();
      }
    });
    useExpose({
      check
    });
    useEventListener("scroll", check, {
      target: scroller,
      passive: true
    });
    return () => {
      var _a;
      const Content = (_a = slots.default) == null ? void 0 : _a.call(slots);
      const Placeholder = _createVNode80("div", {
        "ref": placeholder,
        "class": bem70("placeholder")
      }, null);
      return _createVNode80("div", {
        "ref": root,
        "role": "feed",
        "class": bem70(),
        "aria-busy": loading.value
      }, [props2.direction === "down" ? Content : Placeholder, renderLoading(), renderFinishedText(), renderErrorText(), props2.direction === "up" ? Content : Placeholder]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/list/index.mjs
var List = withInstall(stdin_default78);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/nav-bar/NavBar.mjs
import { createVNode as _createVNode81 } from "vue";
import { ref as ref48, defineComponent as defineComponent77 } from "vue";
var [name75, bem71] = createNamespace("nav-bar");
var navBarProps = {
  title: String,
  fixed: Boolean,
  zIndex: numericProp,
  border: truthProp,
  leftText: String,
  rightText: String,
  leftDisabled: Boolean,
  rightDisabled: Boolean,
  leftArrow: Boolean,
  placeholder: Boolean,
  safeAreaInsetTop: Boolean,
  clickable: truthProp
};
var stdin_default79 = defineComponent77({
  name: name75,
  props: navBarProps,
  emits: ["clickLeft", "clickRight"],
  setup(props2, {
    emit,
    slots
  }) {
    const navBarRef = ref48();
    const renderPlaceholder = usePlaceholder(navBarRef, bem71);
    const onClickLeft = (event) => {
      if (!props2.leftDisabled) {
        emit("clickLeft", event);
      }
    };
    const onClickRight = (event) => {
      if (!props2.rightDisabled) {
        emit("clickRight", event);
      }
    };
    const renderLeft = () => {
      if (slots.left) {
        return slots.left();
      }
      return [props2.leftArrow && _createVNode81(Icon, {
        "class": bem71("arrow"),
        "name": "arrow-left"
      }, null), props2.leftText && _createVNode81("span", {
        "class": bem71("text")
      }, [props2.leftText])];
    };
    const renderRight = () => {
      if (slots.right) {
        return slots.right();
      }
      return _createVNode81("span", {
        "class": bem71("text")
      }, [props2.rightText]);
    };
    const renderNavBar = () => {
      const {
        title,
        fixed,
        border,
        zIndex
      } = props2;
      const style = getZIndexStyle(zIndex);
      const hasLeft = props2.leftArrow || props2.leftText || slots.left;
      const hasRight = props2.rightText || slots.right;
      return _createVNode81("div", {
        "ref": navBarRef,
        "style": style,
        "class": [bem71({
          fixed
        }), {
          [BORDER_BOTTOM]: border,
          "van-safe-area-top": props2.safeAreaInsetTop
        }]
      }, [_createVNode81("div", {
        "class": bem71("content")
      }, [hasLeft && _createVNode81("div", {
        "class": [bem71("left", {
          disabled: props2.leftDisabled
        }), props2.clickable && !props2.leftDisabled ? HAPTICS_FEEDBACK : ""],
        "onClick": onClickLeft
      }, [renderLeft()]), _createVNode81("div", {
        "class": [bem71("title"), "van-ellipsis"]
      }, [slots.title ? slots.title() : title]), hasRight && _createVNode81("div", {
        "class": [bem71("right", {
          disabled: props2.rightDisabled
        }), props2.clickable && !props2.rightDisabled ? HAPTICS_FEEDBACK : ""],
        "onClick": onClickRight
      }, [renderRight()])])]);
    };
    return () => {
      if (props2.fixed && props2.placeholder) {
        return renderPlaceholder(renderNavBar);
      }
      return renderNavBar();
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/nav-bar/index.mjs
var NavBar = withInstall(stdin_default79);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/notice-bar/NoticeBar.mjs
import { withDirectives as _withDirectives10, vShow as _vShow9, createVNode as _createVNode82 } from "vue";
import { ref as ref49, watch as watch41, reactive as reactive16, defineComponent as defineComponent78 } from "vue";
var [name76, bem72] = createNamespace("notice-bar");
var noticeBarProps = {
  text: String,
  mode: String,
  color: String,
  delay: makeNumericProp(1),
  speed: makeNumericProp(60),
  leftIcon: String,
  wrapable: Boolean,
  background: String,
  scrollable: {
    type: Boolean,
    default: null
  }
};
var stdin_default80 = defineComponent78({
  name: name76,
  props: noticeBarProps,
  emits: ["close", "replay"],
  setup(props2, {
    emit,
    slots
  }) {
    let wrapWidth = 0;
    let contentWidth = 0;
    let startTimer;
    const wrapRef = ref49();
    const contentRef = ref49();
    const state = reactive16({
      show: true,
      offset: 0,
      duration: 0
    });
    const renderLeftIcon = () => {
      if (slots["left-icon"]) {
        return slots["left-icon"]();
      }
      if (props2.leftIcon) {
        return _createVNode82(Icon, {
          "class": bem72("left-icon"),
          "name": props2.leftIcon
        }, null);
      }
    };
    const getRightIconName = () => {
      if (props2.mode === "closeable") {
        return "cross";
      }
      if (props2.mode === "link") {
        return "arrow";
      }
    };
    const onClickRightIcon = (event) => {
      if (props2.mode === "closeable") {
        state.show = false;
        emit("close", event);
      }
    };
    const renderRightIcon = () => {
      if (slots["right-icon"]) {
        return slots["right-icon"]();
      }
      const name210 = getRightIconName();
      if (name210) {
        return _createVNode82(Icon, {
          "name": name210,
          "class": bem72("right-icon"),
          "onClick": onClickRightIcon
        }, null);
      }
    };
    const onTransitionEnd = () => {
      state.offset = wrapWidth;
      state.duration = 0;
      raf(() => {
        doubleRaf(() => {
          state.offset = -contentWidth;
          state.duration = (contentWidth + wrapWidth) / +props2.speed;
          emit("replay");
        });
      });
    };
    const renderMarquee = () => {
      const ellipsis = props2.scrollable === false && !props2.wrapable;
      const style = {
        transform: state.offset ? `translateX(${state.offset}px)` : "",
        transitionDuration: `${state.duration}s`
      };
      return _createVNode82("div", {
        "ref": wrapRef,
        "role": "marquee",
        "class": bem72("wrap")
      }, [_createVNode82("div", {
        "ref": contentRef,
        "style": style,
        "class": [bem72("content"), {
          "van-ellipsis": ellipsis
        }],
        "onTransitionend": onTransitionEnd
      }, [slots.default ? slots.default() : props2.text])]);
    };
    const reset = () => {
      const {
        delay,
        speed,
        scrollable
      } = props2;
      const ms = isDef(delay) ? +delay * 1e3 : 0;
      wrapWidth = 0;
      contentWidth = 0;
      state.offset = 0;
      state.duration = 0;
      clearTimeout(startTimer);
      startTimer = setTimeout(() => {
        if (!wrapRef.value || !contentRef.value || scrollable === false) {
          return;
        }
        const wrapRefWidth = useRect(wrapRef).width;
        const contentRefWidth = useRect(contentRef).width;
        if (scrollable || contentRefWidth > wrapRefWidth) {
          doubleRaf(() => {
            wrapWidth = wrapRefWidth;
            contentWidth = contentRefWidth;
            state.offset = -contentWidth;
            state.duration = contentWidth / +speed;
          });
        }
      }, ms);
    };
    onPopupReopen(reset);
    onMountedOrActivated(reset);
    useEventListener("pageshow", reset);
    useExpose({
      reset
    });
    watch41(() => [props2.text, props2.scrollable], reset);
    return () => {
      const {
        color,
        wrapable,
        background
      } = props2;
      return _withDirectives10(_createVNode82("div", {
        "role": "alert",
        "class": bem72({
          wrapable
        }),
        "style": {
          color,
          background
        }
      }, [renderLeftIcon(), renderMarquee(), renderRightIcon()]), [[_vShow9, state.show]]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/notice-bar/index.mjs
var NoticeBar = withInstall(stdin_default80);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/notify/Notify.mjs
import { createVNode as _createVNode83, mergeProps as _mergeProps26 } from "vue";
import { defineComponent as defineComponent79 } from "vue";
var [name77, bem73] = createNamespace("notify");
var popupInheritProps2 = ["lockScroll", "position", "show", "teleport", "zIndex"];
var notifyProps = extend({}, popupSharedProps, {
  type: makeStringProp("danger"),
  color: String,
  message: numericProp,
  position: makeStringProp("top"),
  className: unknownProp,
  background: String,
  lockScroll: Boolean
});
var stdin_default81 = defineComponent79({
  name: name77,
  props: notifyProps,
  emits: ["update:show"],
  setup(props2, {
    emit,
    slots
  }) {
    const updateShow = (show) => emit("update:show", show);
    return () => _createVNode83(Popup, _mergeProps26({
      "class": [bem73([props2.type]), props2.className],
      "style": {
        color: props2.color,
        background: props2.background
      },
      "overlay": false,
      "duration": 0.2,
      "onUpdate:show": updateShow
    }, pick(props2, popupInheritProps2)), {
      default: () => [slots.default ? slots.default() : props2.message]
    });
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/notify/function-call.mjs
import { createVNode as _createVNode84, mergeProps as _mergeProps27 } from "vue";
var timer;
var instance3;
var parseOptions2 = (message) => isObject(message) ? message : {
  message
};
function initInstance3() {
  ({
    instance: instance3
  } = mountComponent({
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      return () => _createVNode84(stdin_default81, _mergeProps27(state, {
        "onUpdate:show": toggle
      }), null);
    }
  }));
}
var getDefaultOptions = () => ({
  type: "danger",
  color: void 0,
  message: "",
  onClose: void 0,
  onClick: void 0,
  onOpened: void 0,
  duration: 3e3,
  position: void 0,
  className: "",
  lockScroll: false,
  background: void 0
});
var currentOptions3 = getDefaultOptions();
var closeNotify = () => {
  if (instance3) {
    instance3.toggle(false);
  }
};
function showNotify(options) {
  if (!inBrowser) {
    return;
  }
  if (!instance3) {
    initInstance3();
  }
  options = extend({}, currentOptions3, parseOptions2(options));
  instance3.open(options);
  clearTimeout(timer);
  if (options.duration > 0) {
    timer = setTimeout(closeNotify, options.duration);
  }
  return instance3;
}
var setNotifyDefaultOptions = (options) => extend(currentOptions3, options);
var resetNotifyDefaultOptions = () => {
  currentOptions3 = getDefaultOptions();
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/notify/index.mjs
var Notify = withInstall(stdin_default81);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/number-keyboard/NumberKeyboard.mjs
import { withDirectives as _withDirectives11, mergeProps as _mergeProps28, vShow as _vShow10, createVNode as _createVNode86 } from "vue";
import { ref as ref51, watch as watch42, computed as computed46, Teleport as Teleport6, Transition as Transition4, defineComponent as defineComponent81 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/number-keyboard/NumberKeyboardKey.mjs
import { createVNode as _createVNode85 } from "vue";
import { ref as ref50, defineComponent as defineComponent80 } from "vue";
var [name78, bem74] = createNamespace("key");
var CollapseIcon = _createVNode85("svg", {
  "class": bem74("collapse-icon"),
  "viewBox": "0 0 30 24"
}, [_createVNode85("path", {
  "d": "M26 13h-2v2h2v-2zm-8-3h2V8h-2v2zm2-4h2V4h-2v2zm2 4h4V4h-2v4h-2v2zm-7 14 3-3h-6l3 3zM6 13H4v2h2v-2zm16 0H8v2h14v-2zm-12-3h2V8h-2v2zM28 0l1 1 1 1v15l-1 2H1l-1-2V2l1-1 1-1zm0 2H2v15h26V2zM6 4v2H4V4zm10 2h2V4h-2v2zM8 9v1H4V8zm8 0v1h-2V8zm-6-5v2H8V4zm4 0v2h-2V4z",
  "fill": "currentColor"
}, null)]);
var DeleteIcon = _createVNode85("svg", {
  "class": bem74("delete-icon"),
  "viewBox": "0 0 32 22"
}, [_createVNode85("path", {
  "d": "M28 0a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10.4a2 2 0 0 1-1.4-.6L1 13.1c-.6-.5-.9-1.3-.9-2 0-1 .3-1.7.9-2.2L9 .6a2 2 0 0 1 1.4-.6zm0 2H10.4l-8.2 8.3a1 1 0 0 0-.3.7c0 .3.1.5.3.7l8.2 8.4H28a2 2 0 0 0 2-2V4c0-1.1-.9-2-2-2zm-5 4a1 1 0 0 1 .7.3 1 1 0 0 1 0 1.4L20.4 11l3.3 3.3c.2.2.3.5.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3L19 12.4l-3.4 3.3a1 1 0 0 1-.6.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.2.1-.5.3-.7l3.3-3.3-3.3-3.3A1 1 0 0 1 14 7c0-.3.1-.5.3-.7A1 1 0 0 1 15 6a1 1 0 0 1 .6.3L19 9.6l3.3-3.3A1 1 0 0 1 23 6z",
  "fill": "currentColor"
}, null)]);
var stdin_default82 = defineComponent80({
  name: name78,
  props: {
    type: String,
    text: numericProp,
    color: String,
    wider: Boolean,
    large: Boolean,
    loading: Boolean
  },
  emits: ["press"],
  setup(props2, {
    emit,
    slots
  }) {
    const active = ref50(false);
    const touch = useTouch();
    const onTouchStart = (event) => {
      touch.start(event);
      active.value = true;
    };
    const onTouchMove = (event) => {
      touch.move(event);
      if (touch.direction.value) {
        active.value = false;
      }
    };
    const onTouchEnd = (event) => {
      if (active.value) {
        if (!slots.default) {
          preventDefault(event);
        }
        active.value = false;
        emit("press", props2.text, props2.type);
      }
    };
    const renderContent = () => {
      if (props2.loading) {
        return _createVNode85(Loading, {
          "class": bem74("loading-icon")
        }, null);
      }
      const text = slots.default ? slots.default() : props2.text;
      switch (props2.type) {
        case "delete":
          return text || DeleteIcon;
        case "extra":
          return text || CollapseIcon;
        default:
          return text;
      }
    };
    return () => _createVNode85("div", {
      "class": bem74("wrapper", {
        wider: props2.wider
      }),
      "onTouchstartPassive": onTouchStart,
      "onTouchmovePassive": onTouchMove,
      "onTouchend": onTouchEnd,
      "onTouchcancel": onTouchEnd
    }, [_createVNode85("div", {
      "role": "button",
      "tabindex": 0,
      "class": bem74([props2.color, {
        large: props2.large,
        active: active.value,
        delete: props2.type === "delete"
      }])
    }, [renderContent()])]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/number-keyboard/NumberKeyboard.mjs
var [name79, bem75] = createNamespace("number-keyboard");
var numberKeyboardProps = {
  show: Boolean,
  title: String,
  theme: makeStringProp("default"),
  zIndex: numericProp,
  teleport: [String, Object],
  maxlength: makeNumericProp(Infinity),
  modelValue: makeStringProp(""),
  transition: truthProp,
  blurOnClose: truthProp,
  showDeleteKey: truthProp,
  randomKeyOrder: Boolean,
  closeButtonText: String,
  deleteButtonText: String,
  closeButtonLoading: Boolean,
  hideOnClickOutside: truthProp,
  safeAreaInsetBottom: truthProp,
  extraKey: {
    type: [String, Array],
    default: ""
  }
};
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
var stdin_default83 = defineComponent81({
  name: name79,
  inheritAttrs: false,
  props: numberKeyboardProps,
  emits: ["show", "hide", "blur", "input", "close", "delete", "update:modelValue"],
  setup(props2, {
    emit,
    slots,
    attrs
  }) {
    const root = ref51();
    const genBasicKeys = () => {
      const keys2 = Array(9).fill("").map((_, i) => ({
        text: i + 1
      }));
      if (props2.randomKeyOrder) {
        shuffle(keys2);
      }
      return keys2;
    };
    const genDefaultKeys = () => [...genBasicKeys(), {
      text: props2.extraKey,
      type: "extra"
    }, {
      text: 0
    }, {
      text: props2.showDeleteKey ? props2.deleteButtonText : "",
      type: props2.showDeleteKey ? "delete" : ""
    }];
    const genCustomKeys = () => {
      const keys2 = genBasicKeys();
      const {
        extraKey
      } = props2;
      const extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];
      if (extraKeys.length === 1) {
        keys2.push({
          text: 0,
          wider: true
        }, {
          text: extraKeys[0],
          type: "extra"
        });
      } else if (extraKeys.length === 2) {
        keys2.push({
          text: extraKeys[0],
          type: "extra"
        }, {
          text: 0
        }, {
          text: extraKeys[1],
          type: "extra"
        });
      }
      return keys2;
    };
    const keys = computed46(() => props2.theme === "custom" ? genCustomKeys() : genDefaultKeys());
    const onBlur = () => {
      if (props2.show) {
        emit("blur");
      }
    };
    const onClose = () => {
      emit("close");
      if (props2.blurOnClose) {
        onBlur();
      }
    };
    const onAnimationEnd = () => emit(props2.show ? "show" : "hide");
    const onPress = (text, type) => {
      if (text === "") {
        if (type === "extra") {
          onBlur();
        }
        return;
      }
      const value = props2.modelValue;
      if (type === "delete") {
        emit("delete");
        emit("update:modelValue", value.slice(0, value.length - 1));
      } else if (type === "close") {
        onClose();
      } else if (value.length < +props2.maxlength) {
        emit("input", text);
        emit("update:modelValue", value + text);
      }
    };
    const renderTitle = () => {
      const {
        title,
        theme,
        closeButtonText
      } = props2;
      const leftSlot = slots["title-left"];
      const showClose = closeButtonText && theme === "default";
      const showTitle = title || showClose || leftSlot;
      if (!showTitle) {
        return;
      }
      return _createVNode86("div", {
        "class": bem75("header")
      }, [leftSlot && _createVNode86("span", {
        "class": bem75("title-left")
      }, [leftSlot()]), title && _createVNode86("h2", {
        "class": bem75("title")
      }, [title]), showClose && _createVNode86("button", {
        "type": "button",
        "class": [bem75("close"), HAPTICS_FEEDBACK],
        "onClick": onClose
      }, [closeButtonText])]);
    };
    const renderKeys = () => keys.value.map((key) => {
      const keySlots = {};
      if (key.type === "delete") {
        keySlots.default = slots.delete;
      }
      if (key.type === "extra") {
        keySlots.default = slots["extra-key"];
      }
      return _createVNode86(stdin_default82, {
        "key": key.text,
        "text": key.text,
        "type": key.type,
        "wider": key.wider,
        "color": key.color,
        "onPress": onPress
      }, keySlots);
    });
    const renderSidebar = () => {
      if (props2.theme === "custom") {
        return _createVNode86("div", {
          "class": bem75("sidebar")
        }, [props2.showDeleteKey && _createVNode86(stdin_default82, {
          "large": true,
          "text": props2.deleteButtonText,
          "type": "delete",
          "onPress": onPress
        }, {
          default: slots.delete
        }), _createVNode86(stdin_default82, {
          "large": true,
          "text": props2.closeButtonText,
          "type": "close",
          "color": "blue",
          "loading": props2.closeButtonLoading,
          "onPress": onPress
        }, null)]);
      }
    };
    watch42(() => props2.show, (value) => {
      if (!props2.transition) {
        emit(value ? "show" : "hide");
      }
    });
    if (props2.hideOnClickOutside) {
      useClickAway(root, onBlur, {
        eventName: "touchstart"
      });
    }
    return () => {
      const Title = renderTitle();
      const Content = _createVNode86(Transition4, {
        "name": props2.transition ? "van-slide-up" : ""
      }, {
        default: () => [_withDirectives11(_createVNode86("div", _mergeProps28({
          "ref": root,
          "style": getZIndexStyle(props2.zIndex),
          "class": bem75({
            unfit: !props2.safeAreaInsetBottom,
            "with-title": !!Title
          }),
          "onAnimationend": onAnimationEnd,
          "onTouchstartPassive": stopPropagation
        }, attrs), [Title, _createVNode86("div", {
          "class": bem75("body")
        }, [_createVNode86("div", {
          "class": bem75("keys")
        }, [renderKeys()]), renderSidebar()])]), [[_vShow10, props2.show]])]
      });
      if (props2.teleport) {
        return _createVNode86(Teleport6, {
          "to": props2.teleport
        }, {
          default: () => [Content]
        });
      }
      return Content;
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/number-keyboard/index.mjs
var NumberKeyboard = withInstall(stdin_default83);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/pagination/Pagination.mjs
import { createVNode as _createVNode87 } from "vue";
import { computed as computed47, watchEffect as watchEffect4, defineComponent as defineComponent82 } from "vue";
var [name80, bem76, t15] = createNamespace("pagination");
var makePage = (number, text, active) => ({
  number,
  text,
  active
});
var paginationProps = {
  mode: makeStringProp("multi"),
  prevText: String,
  nextText: String,
  pageCount: makeNumericProp(0),
  modelValue: makeNumberProp(0),
  totalItems: makeNumericProp(0),
  showPageSize: makeNumericProp(5),
  itemsPerPage: makeNumericProp(10),
  forceEllipses: Boolean,
  showPrevButton: truthProp,
  showNextButton: truthProp
};
var stdin_default84 = defineComponent82({
  name: name80,
  props: paginationProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const count = computed47(() => {
      const {
        pageCount,
        totalItems,
        itemsPerPage
      } = props2;
      const count2 = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
      return Math.max(1, count2);
    });
    const pages = computed47(() => {
      const items = [];
      const pageCount = count.value;
      const showPageSize = +props2.showPageSize;
      const {
        modelValue,
        forceEllipses
      } = props2;
      let startPage = 1;
      let endPage = pageCount;
      const isMaxSized = showPageSize < pageCount;
      if (isMaxSized) {
        startPage = Math.max(modelValue - Math.floor(showPageSize / 2), 1);
        endPage = startPage + showPageSize - 1;
        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - showPageSize + 1;
        }
      }
      for (let number = startPage; number <= endPage; number++) {
        const page = makePage(number, number, number === modelValue);
        items.push(page);
      }
      if (isMaxSized && showPageSize > 0 && forceEllipses) {
        if (startPage > 1) {
          const prevPages = makePage(startPage - 1, "...");
          items.unshift(prevPages);
        }
        if (endPage < pageCount) {
          const nextPages = makePage(endPage + 1, "...");
          items.push(nextPages);
        }
      }
      return items;
    });
    const updateModelValue = (value, emitChange) => {
      value = clamp(value, 1, count.value);
      if (props2.modelValue !== value) {
        emit("update:modelValue", value);
        if (emitChange) {
          emit("change", value);
        }
      }
    };
    watchEffect4(() => updateModelValue(props2.modelValue));
    const renderDesc = () => _createVNode87("li", {
      "class": bem76("page-desc")
    }, [slots.pageDesc ? slots.pageDesc() : `${props2.modelValue}/${count.value}`]);
    const renderPrevButton = () => {
      const {
        mode,
        modelValue,
        showPrevButton
      } = props2;
      if (!showPrevButton) {
        return;
      }
      const slot = slots["prev-text"];
      const disabled = modelValue === 1;
      return _createVNode87("li", {
        "class": [bem76("item", {
          disabled,
          border: mode === "simple",
          prev: true
        }), BORDER_SURROUND]
      }, [_createVNode87("button", {
        "type": "button",
        "disabled": disabled,
        "onClick": () => updateModelValue(modelValue - 1, true)
      }, [slot ? slot() : props2.prevText || t15("prev")])]);
    };
    const renderNextButton = () => {
      const {
        mode,
        modelValue,
        showNextButton
      } = props2;
      if (!showNextButton) {
        return;
      }
      const slot = slots["next-text"];
      const disabled = modelValue === count.value;
      return _createVNode87("li", {
        "class": [bem76("item", {
          disabled,
          border: mode === "simple",
          next: true
        }), BORDER_SURROUND]
      }, [_createVNode87("button", {
        "type": "button",
        "disabled": disabled,
        "onClick": () => updateModelValue(modelValue + 1, true)
      }, [slot ? slot() : props2.nextText || t15("next")])]);
    };
    const renderPages = () => pages.value.map((page) => _createVNode87("li", {
      "class": [bem76("item", {
        active: page.active,
        page: true
      }), BORDER_SURROUND]
    }, [_createVNode87("button", {
      "type": "button",
      "aria-current": page.active || void 0,
      "onClick": () => updateModelValue(page.number, true)
    }, [slots.page ? slots.page(page) : page.text])]));
    return () => _createVNode87("nav", {
      "role": "navigation",
      "class": bem76()
    }, [_createVNode87("ul", {
      "class": bem76("items")
    }, [renderPrevButton(), props2.mode === "simple" ? renderDesc() : renderPages(), renderNextButton()])]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/pagination/index.mjs
var Pagination = withInstall(stdin_default84);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/password-input/PasswordInput.mjs
import { createVNode as _createVNode88 } from "vue";
import { defineComponent as defineComponent83 } from "vue";
var [name81, bem77] = createNamespace("password-input");
var passwordInputProps = {
  info: String,
  mask: truthProp,
  value: makeStringProp(""),
  gutter: numericProp,
  length: makeNumericProp(6),
  focused: Boolean,
  errorInfo: String
};
var stdin_default85 = defineComponent83({
  name: name81,
  props: passwordInputProps,
  emits: ["focus"],
  setup(props2, {
    emit
  }) {
    const onTouchStart = (event) => {
      event.stopPropagation();
      emit("focus", event);
    };
    const renderPoints = () => {
      const Points = [];
      const {
        mask,
        value,
        gutter,
        focused
      } = props2;
      const length = +props2.length;
      for (let i = 0; i < length; i++) {
        const char = value[i];
        const showBorder = i !== 0 && !gutter;
        const showCursor = focused && i === value.length;
        let style;
        if (i !== 0 && gutter) {
          style = {
            marginLeft: addUnit(gutter)
          };
        }
        Points.push(_createVNode88("li", {
          "class": [{
            [BORDER_LEFT]: showBorder
          }, bem77("item", {
            focus: showCursor
          })],
          "style": style
        }, [mask ? _createVNode88("i", {
          "style": {
            visibility: char ? "visible" : "hidden"
          }
        }, null) : char, showCursor && _createVNode88("div", {
          "class": bem77("cursor")
        }, null)]));
      }
      return Points;
    };
    return () => {
      const info = props2.errorInfo || props2.info;
      return _createVNode88("div", {
        "class": bem77()
      }, [_createVNode88("ul", {
        "class": [bem77("security"), {
          [BORDER_SURROUND]: !props2.gutter
        }],
        "onTouchstartPassive": onTouchStart
      }, [renderPoints()]), info && _createVNode88("div", {
        "class": bem77(props2.errorInfo ? "error-info" : "info")
      }, [info])]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/password-input/index.mjs
var PasswordInput = withInstall(stdin_default85);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/picker-group/index.mjs
var PickerGroup = withInstall(stdin_default23);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/popover/Popover.mjs
import { mergeProps as _mergeProps29, Fragment as _Fragment5, createVNode as _createVNode89 } from "vue";
import { ref as ref52, watch as watch43, nextTick as nextTick23, onMounted as onMounted18, watchEffect as watchEffect5, onBeforeUnmount as onBeforeUnmount7, defineComponent as defineComponent84 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/@vant/popperjs/dist/index.esm.mjs
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement2(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
var round = Math.round;
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement2(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width2 = clientRect.width / scaleX;
  var height2 = clientRect.height / scaleY;
  return {
    width: width2,
    height: height2,
    top: y,
    right: x + width2,
    bottom: y + height2,
    left: x,
    x,
    y
  };
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getDocumentElement(element) {
  return ((isElement2(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width2 = element.offsetWidth;
  var height2 = element.offsetHeight;
  if (Math.abs(clientRect.width - width2) <= 1) {
    width2 = clientRect.width;
  }
  if (Math.abs(clientRect.height - height2) <= 1) {
    height2 = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width2,
    height: height2
  };
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getScrollParent2(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent2(getParentNode(node));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent2(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock2(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock2(element) || window2;
}
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function format2(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p, c) {
    return p.replace(/%s/, c);
  }, str);
}
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format2(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format2(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
            return '"' + s + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format2(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}
function uniqueBy(arr, fn2) {
  var identifiers = /* @__PURE__ */ new Set();
  return arr.filter(function(item) {
    var identifier = fn2(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current2) {
    var existing = merged2[current2.name];
    merged2[current2.name] = existing ? Object.assign({}, existing, current2, {
      options: Object.assign({}, existing.options, current2.options),
      data: Object.assign({}, existing.data, current2.data)
    }) : current2;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
function getVariation(placement) {
  return placement.split("-")[1];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function computeOffsets(_ref) {
  var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}
var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var DEFAULT_OPTIONS2 = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions3 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS2 : _generatorOptions$def2;
  return function createPopper2(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions3;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS2, defaultOptions3),
      modifiersData: {},
      elements: {
        reference,
        popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance4 = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions3, state.options, options2);
        state.scrollParents = {
          reference: isElement2(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        if (true) {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name112 = _ref.name;
            return name112;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name112 = _ref2.name;
              return name112 === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle(popper), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance4.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference2 = _state$elements.reference, popper2 = _state$elements.popper;
        if (!areValidElements(reference2, popper2)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference2, getOffsetParent(popper2), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper2)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name112 = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name: name112,
              instance: instance4
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance4.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance4;
    }
    instance4.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name112 = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect3 = _ref3.effect;
        if (typeof effect3 === "function") {
          var cleanupFn = effect3({
            state,
            name: name112,
            instance: instance4,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance4;
  };
}
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance4 = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance4.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance4.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance4.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance4.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
function popperOffsets(_ref) {
  var state = _ref.state, name112 = _ref.name;
  state.modifiersData[name112] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (true) {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name112) {
    var style = state.styles[name112] || {};
    var attributes = state.attributes[name112] || {};
    var element = state.elements[name112];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name210) {
      var value = attributes[name210];
      if (value === false) {
        element.removeAttribute(name210);
      } else {
        element.setAttribute(name210, value === true ? "" : value);
      }
    });
  });
}
function effect2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name112) {
      var element = state.elements[name112];
      var attributes = state.attributes[name112] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name112) ? state.styles[name112] : initialStyles[name112]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect2,
  requires: ["computeStyles"]
};
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper = popperGenerator({
  defaultModifiers
});
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name112 = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name112] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/popover/Popover.mjs
var [name82, bem78] = createNamespace("popover");
var popupProps3 = ["overlay", "duration", "teleport", "overlayStyle", "overlayClass", "closeOnClickOverlay"];
var popoverProps = {
  show: Boolean,
  theme: makeStringProp("light"),
  overlay: Boolean,
  actions: makeArrayProp(),
  actionsDirection: makeStringProp("vertical"),
  trigger: makeStringProp("click"),
  duration: numericProp,
  showArrow: truthProp,
  placement: makeStringProp("bottom"),
  iconPrefix: String,
  overlayClass: unknownProp,
  overlayStyle: Object,
  closeOnClickAction: truthProp,
  closeOnClickOverlay: truthProp,
  closeOnClickOutside: truthProp,
  offset: {
    type: Array,
    default: () => [0, 8]
  },
  teleport: {
    type: [String, Object],
    default: "body"
  }
};
var stdin_default86 = defineComponent84({
  name: name82,
  props: popoverProps,
  emits: ["select", "touchstart", "update:show"],
  setup(props2, {
    emit,
    slots,
    attrs
  }) {
    let popper;
    const popupRef = ref52();
    const wrapperRef = ref52();
    const popoverRef = ref52();
    const show = useSyncPropRef(() => props2.show, (value) => emit("update:show", value));
    const getPopoverOptions = () => ({
      placement: props2.placement,
      modifiers: [{
        name: "computeStyles",
        options: {
          adaptive: false,
          gpuAcceleration: false
        }
      }, extend({}, offset_default, {
        options: {
          offset: props2.offset
        }
      })]
    });
    const createPopperInstance = () => {
      if (wrapperRef.value && popoverRef.value) {
        return createPopper(wrapperRef.value, popoverRef.value.popupRef.value, getPopoverOptions());
      }
      return null;
    };
    const updateLocation = () => {
      nextTick23(() => {
        if (!show.value) {
          return;
        }
        if (!popper) {
          popper = createPopperInstance();
          if (inBrowser) {
            window.addEventListener("animationend", updateLocation);
            window.addEventListener("transitionend", updateLocation);
          }
        } else {
          popper.setOptions(getPopoverOptions());
        }
      });
    };
    const updateShow = (value) => {
      show.value = value;
    };
    const onClickWrapper = () => {
      if (props2.trigger === "click") {
        show.value = !show.value;
      }
    };
    const onClickAction = (action, index) => {
      if (action.disabled) {
        return;
      }
      emit("select", action, index);
      if (props2.closeOnClickAction) {
        show.value = false;
      }
    };
    const onClickAway = () => {
      if (show.value && props2.closeOnClickOutside && (!props2.overlay || props2.closeOnClickOverlay)) {
        show.value = false;
      }
    };
    const renderActionContent = (action, index) => {
      if (slots.action) {
        return slots.action({
          action,
          index
        });
      }
      return [action.icon && _createVNode89(Icon, {
        "name": action.icon,
        "classPrefix": props2.iconPrefix,
        "class": bem78("action-icon")
      }, null), _createVNode89("div", {
        "class": [bem78("action-text"), {
          [BORDER_BOTTOM]: props2.actionsDirection === "vertical"
        }]
      }, [action.text])];
    };
    const renderAction = (action, index) => {
      const {
        icon,
        color,
        disabled,
        className
      } = action;
      return _createVNode89("div", {
        "role": "menuitem",
        "class": [bem78("action", {
          disabled,
          "with-icon": icon
        }), {
          [BORDER_RIGHT]: props2.actionsDirection === "horizontal"
        }, className],
        "style": {
          color
        },
        "tabindex": disabled ? void 0 : 0,
        "aria-disabled": disabled || void 0,
        "onClick": () => onClickAction(action, index)
      }, [renderActionContent(action, index)]);
    };
    onMounted18(() => {
      updateLocation();
      watchEffect5(() => {
        var _a;
        popupRef.value = (_a = popoverRef.value) == null ? void 0 : _a.popupRef.value;
      });
    });
    onBeforeUnmount7(() => {
      if (popper) {
        if (inBrowser) {
          window.removeEventListener("animationend", updateLocation);
          window.removeEventListener("transitionend", updateLocation);
        }
        popper.destroy();
        popper = null;
      }
    });
    watch43(() => [show.value, props2.offset, props2.placement], updateLocation);
    useClickAway([wrapperRef, popupRef], onClickAway, {
      eventName: "touchstart"
    });
    return () => {
      var _a;
      return _createVNode89(_Fragment5, null, [_createVNode89("span", {
        "ref": wrapperRef,
        "class": bem78("wrapper"),
        "onClick": onClickWrapper
      }, [(_a = slots.reference) == null ? void 0 : _a.call(slots)]), _createVNode89(Popup, _mergeProps29({
        "ref": popoverRef,
        "show": show.value,
        "class": bem78([props2.theme]),
        "position": "",
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "onUpdate:show": updateShow
      }, attrs, useScopeId(), pick(props2, popupProps3)), {
        default: () => [props2.showArrow && _createVNode89("div", {
          "class": bem78("arrow")
        }, null), _createVNode89("div", {
          "role": "menu",
          "class": bem78("content", props2.actionsDirection)
        }, [slots.default ? slots.default() : props2.actions.map(renderAction)])]
      })]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/popover/index.mjs
var Popover = withInstall(stdin_default86);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/progress/Progress.mjs
import { createVNode as _createVNode90 } from "vue";
import { computed as computed48, defineComponent as defineComponent85 } from "vue";
var [name83, bem79] = createNamespace("progress");
var progressProps = {
  color: String,
  inactive: Boolean,
  pivotText: String,
  textColor: String,
  showPivot: truthProp,
  pivotColor: String,
  trackColor: String,
  strokeWidth: numericProp,
  percentage: {
    type: numericProp,
    default: 0,
    validator: (value) => +value >= 0 && +value <= 100
  }
};
var stdin_default87 = defineComponent85({
  name: name83,
  props: progressProps,
  setup(props2) {
    const background = computed48(() => props2.inactive ? void 0 : props2.color);
    const renderPivot = () => {
      const {
        textColor,
        pivotText,
        pivotColor,
        percentage
      } = props2;
      const text = pivotText != null ? pivotText : `${percentage}%`;
      if (props2.showPivot && text) {
        const style = {
          color: textColor,
          left: `${+percentage}%`,
          transform: `translate(-${+percentage}%,-50%)`,
          background: pivotColor || background.value
        };
        return _createVNode90("span", {
          "style": style,
          "class": bem79("pivot", {
            inactive: props2.inactive
          })
        }, [text]);
      }
    };
    return () => {
      const {
        trackColor,
        percentage,
        strokeWidth
      } = props2;
      const rootStyle = {
        background: trackColor,
        height: addUnit(strokeWidth)
      };
      const portionStyle = {
        width: `${percentage}%`,
        background: background.value
      };
      return _createVNode90("div", {
        "class": bem79(),
        "style": rootStyle
      }, [_createVNode90("span", {
        "class": bem79("portion", {
          inactive: props2.inactive
        }),
        "style": portionStyle
      }, null), renderPivot()]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/progress/index.mjs
var Progress = withInstall(stdin_default87);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/pull-refresh/PullRefresh.mjs
import { createVNode as _createVNode91 } from "vue";
import { ref as ref53, watch as watch44, reactive as reactive17, nextTick as nextTick24, defineComponent as defineComponent86 } from "vue";
var [name84, bem80, t16] = createNamespace("pull-refresh");
var DEFAULT_HEAD_HEIGHT = 50;
var TEXT_STATUS = ["pulling", "loosing", "success"];
var pullRefreshProps = {
  disabled: Boolean,
  modelValue: Boolean,
  headHeight: makeNumericProp(DEFAULT_HEAD_HEIGHT),
  successText: String,
  pullingText: String,
  loosingText: String,
  loadingText: String,
  pullDistance: numericProp,
  successDuration: makeNumericProp(500),
  animationDuration: makeNumericProp(300)
};
var stdin_default88 = defineComponent86({
  name: name84,
  props: pullRefreshProps,
  emits: ["change", "refresh", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    let reachTop;
    const root = ref53();
    const track = ref53();
    const scrollParent = useScrollParent(root);
    const state = reactive17({
      status: "normal",
      distance: 0,
      duration: 0
    });
    const touch = useTouch();
    const getHeadStyle = () => {
      if (props2.headHeight !== DEFAULT_HEAD_HEIGHT) {
        return {
          height: `${props2.headHeight}px`
        };
      }
    };
    const isTouchable = () => state.status !== "loading" && state.status !== "success" && !props2.disabled;
    const ease = (distance) => {
      const pullDistance = +(props2.pullDistance || props2.headHeight);
      if (distance > pullDistance) {
        if (distance < pullDistance * 2) {
          distance = pullDistance + (distance - pullDistance) / 2;
        } else {
          distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
        }
      }
      return Math.round(distance);
    };
    const setStatus = (distance, isLoading) => {
      const pullDistance = +(props2.pullDistance || props2.headHeight);
      state.distance = distance;
      if (isLoading) {
        state.status = "loading";
      } else if (distance === 0) {
        state.status = "normal";
      } else if (distance < pullDistance) {
        state.status = "pulling";
      } else {
        state.status = "loosing";
      }
      emit("change", {
        status: state.status,
        distance
      });
    };
    const getStatusText = () => {
      const {
        status
      } = state;
      if (status === "normal") {
        return "";
      }
      return props2[`${status}Text`] || t16(status);
    };
    const renderStatus = () => {
      const {
        status,
        distance
      } = state;
      if (slots[status]) {
        return slots[status]({
          distance
        });
      }
      const nodes = [];
      if (TEXT_STATUS.includes(status)) {
        nodes.push(_createVNode91("div", {
          "class": bem80("text")
        }, [getStatusText()]));
      }
      if (status === "loading") {
        nodes.push(_createVNode91(Loading, {
          "class": bem80("loading")
        }, {
          default: getStatusText
        }));
      }
      return nodes;
    };
    const showSuccessTip = () => {
      state.status = "success";
      setTimeout(() => {
        setStatus(0);
      }, +props2.successDuration);
    };
    const checkPosition = (event) => {
      reachTop = getScrollTop(scrollParent.value) === 0;
      if (reachTop) {
        state.duration = 0;
        touch.start(event);
      }
    };
    const onTouchStart = (event) => {
      if (isTouchable()) {
        checkPosition(event);
      }
    };
    const onTouchMove = (event) => {
      if (isTouchable()) {
        if (!reachTop) {
          checkPosition(event);
        }
        const {
          deltaY
        } = touch;
        touch.move(event);
        if (reachTop && deltaY.value >= 0 && touch.isVertical()) {
          preventDefault(event);
          setStatus(ease(deltaY.value));
        }
      }
    };
    const onTouchEnd = () => {
      if (reachTop && touch.deltaY.value && isTouchable()) {
        state.duration = +props2.animationDuration;
        if (state.status === "loosing") {
          setStatus(+props2.headHeight, true);
          emit("update:modelValue", true);
          nextTick24(() => emit("refresh"));
        } else {
          setStatus(0);
        }
      }
    };
    watch44(() => props2.modelValue, (value) => {
      state.duration = +props2.animationDuration;
      if (value) {
        setStatus(+props2.headHeight, true);
      } else if (slots.success || props2.successText) {
        showSuccessTip();
      } else {
        setStatus(0, false);
      }
    });
    useEventListener("touchmove", onTouchMove, {
      target: track
    });
    return () => {
      var _a;
      const trackStyle = {
        transitionDuration: `${state.duration}ms`,
        transform: state.distance ? `translate3d(0,${state.distance}px, 0)` : ""
      };
      return _createVNode91("div", {
        "ref": root,
        "class": bem80()
      }, [_createVNode91("div", {
        "ref": track,
        "class": bem80("track"),
        "style": trackStyle,
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [_createVNode91("div", {
        "class": bem80("head"),
        "style": getHeadStyle()
      }, [renderStatus()]), (_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/pull-refresh/index.mjs
var PullRefresh = withInstall(stdin_default88);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/rate/Rate.mjs
import { createVNode as _createVNode92 } from "vue";
import { computed as computed49, defineComponent as defineComponent87, ref as ref54 } from "vue";
var [name85, bem81] = createNamespace("rate");
function getRateStatus(value, index, allowHalf, readonly) {
  if (value >= index) {
    return {
      status: "full",
      value: 1
    };
  }
  if (value + 0.5 >= index && allowHalf && !readonly) {
    return {
      status: "half",
      value: 0.5
    };
  }
  if (value + 1 >= index && allowHalf && readonly) {
    const cardinal = 10 ** 10;
    return {
      status: "half",
      value: Math.round((value - index + 1) * cardinal) / cardinal
    };
  }
  return {
    status: "void",
    value: 0
  };
}
var rateProps = {
  size: numericProp,
  icon: makeStringProp("star"),
  color: String,
  count: makeNumericProp(5),
  gutter: numericProp,
  clearable: Boolean,
  readonly: Boolean,
  disabled: Boolean,
  voidIcon: makeStringProp("star-o"),
  allowHalf: Boolean,
  voidColor: String,
  touchable: truthProp,
  iconPrefix: String,
  modelValue: makeNumberProp(0),
  disabledColor: String
};
var stdin_default89 = defineComponent87({
  name: name85,
  props: rateProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit
  }) {
    const touch = useTouch();
    const [itemRefs, setItemRefs] = useRefs();
    const groupRef = ref54();
    const unselectable = computed49(() => props2.readonly || props2.disabled);
    const untouchable = computed49(() => unselectable.value || !props2.touchable);
    const list = computed49(() => Array(+props2.count).fill("").map((_, i) => getRateStatus(props2.modelValue, i + 1, props2.allowHalf, props2.readonly)));
    let ranges;
    let groupRefRect;
    let minRectTop = Number.MAX_SAFE_INTEGER;
    let maxRectTop = Number.MIN_SAFE_INTEGER;
    const updateRanges = () => {
      groupRefRect = useRect(groupRef);
      const rects = itemRefs.value.map(useRect);
      ranges = [];
      rects.forEach((rect, index) => {
        minRectTop = Math.min(rect.top, minRectTop);
        maxRectTop = Math.max(rect.top, maxRectTop);
        if (props2.allowHalf) {
          ranges.push({
            score: index + 0.5,
            left: rect.left,
            top: rect.top,
            height: rect.height
          }, {
            score: index + 1,
            left: rect.left + rect.width / 2,
            top: rect.top,
            height: rect.height
          });
        } else {
          ranges.push({
            score: index + 1,
            left: rect.left,
            top: rect.top,
            height: rect.height
          });
        }
      });
    };
    const getScoreByPosition = (x, y) => {
      for (let i = ranges.length - 1; i > 0; i--) {
        if (y >= groupRefRect.top && y <= groupRefRect.bottom) {
          if (x > ranges[i].left && y >= ranges[i].top && y <= ranges[i].top + ranges[i].height) {
            return ranges[i].score;
          }
        } else {
          const curTop = y < groupRefRect.top ? minRectTop : maxRectTop;
          if (x > ranges[i].left && ranges[i].top === curTop) {
            return ranges[i].score;
          }
        }
      }
      return props2.allowHalf ? 0.5 : 1;
    };
    const select = (value) => {
      if (unselectable.value || value === props2.modelValue)
        return;
      emit("update:modelValue", value);
      emit("change", value);
    };
    const onTouchStart = (event) => {
      if (untouchable.value) {
        return;
      }
      touch.start(event);
      updateRanges();
    };
    const onTouchMove = (event) => {
      if (untouchable.value) {
        return;
      }
      touch.move(event);
      if (touch.isHorizontal() && !touch.isTap.value) {
        const {
          clientX,
          clientY
        } = event.touches[0];
        preventDefault(event);
        select(getScoreByPosition(clientX, clientY));
      }
    };
    const renderStar = (item, index) => {
      const {
        icon,
        size,
        color,
        count,
        gutter,
        voidIcon,
        disabled,
        voidColor,
        allowHalf,
        iconPrefix,
        disabledColor
      } = props2;
      const score = index + 1;
      const isFull = item.status === "full";
      const isVoid = item.status === "void";
      const renderHalf = allowHalf && item.value > 0 && item.value < 1;
      let style;
      if (gutter && score !== +count) {
        style = {
          paddingRight: addUnit(gutter)
        };
      }
      const onClickItem = (event) => {
        updateRanges();
        let value = allowHalf ? getScoreByPosition(event.clientX, event.clientY) : score;
        if (props2.clearable && touch.isTap.value && value === props2.modelValue) {
          value = 0;
        }
        select(value);
      };
      return _createVNode92("div", {
        "key": index,
        "ref": setItemRefs(index),
        "role": "radio",
        "style": style,
        "class": bem81("item"),
        "tabindex": disabled ? void 0 : 0,
        "aria-setsize": count,
        "aria-posinset": score,
        "aria-checked": !isVoid,
        "onClick": onClickItem
      }, [_createVNode92(Icon, {
        "size": size,
        "name": isFull ? icon : voidIcon,
        "class": bem81("icon", {
          disabled,
          full: isFull
        }),
        "color": disabled ? disabledColor : isFull ? color : voidColor,
        "classPrefix": iconPrefix
      }, null), renderHalf && _createVNode92(Icon, {
        "size": size,
        "style": {
          width: item.value + "em"
        },
        "name": isVoid ? voidIcon : icon,
        "class": bem81("icon", ["half", {
          disabled,
          full: !isVoid
        }]),
        "color": disabled ? disabledColor : isVoid ? voidColor : color,
        "classPrefix": iconPrefix
      }, null)]);
    };
    useCustomFieldValue(() => props2.modelValue);
    useEventListener("touchmove", onTouchMove, {
      target: groupRef
    });
    return () => _createVNode92("div", {
      "ref": groupRef,
      "role": "radiogroup",
      "class": bem81({
        readonly: props2.readonly,
        disabled: props2.disabled
      }),
      "tabindex": props2.disabled ? void 0 : 0,
      "aria-disabled": props2.disabled,
      "aria-readonly": props2.readonly,
      "onTouchstartPassive": onTouchStart
    }, [list.value.map(renderStar)]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/rate/index.mjs
var Rate = withInstall(stdin_default89);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/rolling-text/RollingText.mjs
import { createVNode as _createVNode94 } from "vue";
import { ref as ref55, defineComponent as defineComponent89, computed as computed51, watch as watch45 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/rolling-text/RollingTextItem.mjs
import { createVNode as _createVNode93 } from "vue";
import { defineComponent as defineComponent88, computed as computed50 } from "vue";
var props = {
  figureArr: makeArrayProp(),
  delay: Number,
  duration: makeNumberProp(2),
  isStart: Boolean,
  direction: makeStringProp("down"),
  height: makeNumberProp(40)
};
var [name86, bem82] = createNamespace("rolling-text-item");
var stdin_default90 = defineComponent88({
  name: name86,
  props,
  setup(props2) {
    const newFigureArr = computed50(() => props2.direction === "down" ? props2.figureArr.slice().reverse() : props2.figureArr);
    const translatePx = computed50(() => {
      const totalHeight = props2.height * (props2.figureArr.length - 1);
      return `-${totalHeight}px`;
    });
    const itemStyle = computed50(() => ({
      lineHeight: addUnit(props2.height)
    }));
    const rootStyle = computed50(() => ({
      height: addUnit(props2.height),
      "--van-translate": translatePx.value,
      "--van-duration": props2.duration + "s",
      "--van-delay": props2.delay + "s"
    }));
    return () => _createVNode93("div", {
      "class": bem82([props2.direction]),
      "style": rootStyle.value
    }, [_createVNode93("div", {
      "class": bem82("box", {
        animate: props2.isStart
      })
    }, [Array.isArray(newFigureArr.value) && newFigureArr.value.map((figure) => _createVNode93("div", {
      "class": bem82("item"),
      "style": itemStyle.value
    }, [figure]))])]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/rolling-text/RollingText.mjs
var [name87, bem83] = createNamespace("rolling-text");
var rollingTextProps = {
  startNum: makeNumberProp(0),
  targetNum: Number,
  textList: makeArrayProp(),
  duration: makeNumberProp(2),
  autoStart: truthProp,
  direction: makeStringProp("down"),
  stopOrder: makeStringProp("ltr"),
  height: makeNumberProp(40)
};
var CIRCLE_NUM = 2;
var stdin_default91 = defineComponent89({
  name: name87,
  props: rollingTextProps,
  setup(props2) {
    const isCustomType = computed51(() => Array.isArray(props2.textList) && props2.textList.length);
    const itemLength = computed51(() => {
      if (isCustomType.value)
        return props2.textList[0].length;
      return `${Math.max(props2.startNum, props2.targetNum)}`.length;
    });
    const getTextArrByIdx = (idx) => {
      const result = [];
      for (let i = 0; i < props2.textList.length; i++) {
        result.push(props2.textList[i][idx]);
      }
      return result;
    };
    const targetNumArr = computed51(() => {
      if (isCustomType.value)
        return new Array(itemLength.value).fill("");
      return padZero(props2.targetNum, itemLength.value).split("");
    });
    const startNumArr = computed51(() => padZero(props2.startNum, itemLength.value).split(""));
    const getFigureArr = (i) => {
      const start22 = +startNumArr.value[i];
      const target = +targetNumArr.value[i];
      const result = [];
      for (let i2 = start22; i2 <= 9; i2++) {
        result.push(i2);
      }
      for (let i2 = 0; i2 <= CIRCLE_NUM; i2++) {
        for (let j = 0; j <= 9; j++) {
          result.push(j);
        }
      }
      for (let i2 = 0; i2 <= target; i2++) {
        result.push(i2);
      }
      return result;
    };
    const getDelay = (i, len) => {
      if (props2.stopOrder === "ltr")
        return 0.2 * i;
      return 0.2 * (len - 1 - i);
    };
    const rolling = ref55(props2.autoStart);
    const start2 = () => {
      rolling.value = true;
    };
    const reset = () => {
      rolling.value = false;
      if (props2.autoStart) {
        raf(() => start2());
      }
    };
    watch45(() => props2.autoStart, (value) => {
      if (value) {
        start2();
      }
    });
    useExpose({
      start: start2,
      reset
    });
    return () => _createVNode94("div", {
      "class": bem83()
    }, [targetNumArr.value.map((_, i) => _createVNode94(stdin_default90, {
      "figureArr": isCustomType.value ? getTextArrByIdx(i) : getFigureArr(i),
      "duration": props2.duration,
      "direction": props2.direction,
      "isStart": rolling.value,
      "height": props2.height,
      "delay": getDelay(i, itemLength.value)
    }, null))]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/rolling-text/index.mjs
var RollingText = withInstall(stdin_default91);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/row/index.mjs
var Row = withInstall(stdin_default52);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/search/Search.mjs
import { mergeProps as _mergeProps30, createVNode as _createVNode95 } from "vue";
import { ref as ref56, defineComponent as defineComponent90 } from "vue";
var [name88, bem84, t17] = createNamespace("search");
var searchProps = extend({}, fieldSharedProps, {
  label: String,
  shape: makeStringProp("square"),
  leftIcon: makeStringProp("search"),
  clearable: truthProp,
  actionText: String,
  background: String,
  showAction: Boolean
});
var stdin_default92 = defineComponent90({
  name: name88,
  props: searchProps,
  emits: ["blur", "focus", "clear", "search", "cancel", "clickInput", "clickLeftIcon", "clickRightIcon", "update:modelValue"],
  setup(props2, {
    emit,
    slots,
    attrs
  }) {
    const id = useId();
    const fieldRef = ref56();
    const onCancel = () => {
      if (!slots.action) {
        emit("update:modelValue", "");
        emit("cancel");
      }
    };
    const onKeypress = (event) => {
      const ENTER_CODE = 13;
      if (event.keyCode === ENTER_CODE) {
        preventDefault(event);
        emit("search", props2.modelValue);
      }
    };
    const getInputId = () => props2.id || `${id}-input`;
    const renderLabel = () => {
      if (slots.label || props2.label) {
        return _createVNode95("label", {
          "class": bem84("label"),
          "for": getInputId()
        }, [slots.label ? slots.label() : props2.label]);
      }
    };
    const renderAction = () => {
      if (props2.showAction) {
        const text = props2.actionText || t17("cancel");
        return _createVNode95("div", {
          "class": bem84("action"),
          "role": "button",
          "tabindex": 0,
          "onClick": onCancel
        }, [slots.action ? slots.action() : text]);
      }
    };
    const blur = () => {
      var _a;
      return (_a = fieldRef.value) == null ? void 0 : _a.blur();
    };
    const focus = () => {
      var _a;
      return (_a = fieldRef.value) == null ? void 0 : _a.focus();
    };
    const onBlur = (event) => emit("blur", event);
    const onFocus = (event) => emit("focus", event);
    const onClear = (event) => emit("clear", event);
    const onClickInput = (event) => emit("clickInput", event);
    const onClickLeftIcon = (event) => emit("clickLeftIcon", event);
    const onClickRightIcon = (event) => emit("clickRightIcon", event);
    const fieldPropNames = Object.keys(fieldSharedProps);
    const renderField = () => {
      const fieldAttrs = extend({}, attrs, pick(props2, fieldPropNames), {
        id: getInputId()
      });
      const onInput = (value) => emit("update:modelValue", value);
      return _createVNode95(Field, _mergeProps30({
        "ref": fieldRef,
        "type": "search",
        "class": bem84("field", {
          "with-message": fieldAttrs.errorMessage
        }),
        "border": false,
        "onBlur": onBlur,
        "onFocus": onFocus,
        "onClear": onClear,
        "onKeypress": onKeypress,
        "onClickInput": onClickInput,
        "onClickLeftIcon": onClickLeftIcon,
        "onClickRightIcon": onClickRightIcon,
        "onUpdate:modelValue": onInput
      }, fieldAttrs), pick(slots, ["left-icon", "right-icon"]));
    };
    useExpose({
      focus,
      blur
    });
    return () => {
      var _a;
      return _createVNode95("div", {
        "class": bem84({
          "show-action": props2.showAction
        }),
        "style": {
          background: props2.background
        }
      }, [(_a = slots.left) == null ? void 0 : _a.call(slots), _createVNode95("div", {
        "class": bem84("content", props2.shape)
      }, [renderLabel(), renderField()]), renderAction()]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/search/index.mjs
var Search = withInstall(stdin_default92);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/share-sheet/ShareSheet.mjs
import { mergeProps as _mergeProps31, createVNode as _createVNode96 } from "vue";
import { defineComponent as defineComponent91 } from "vue";
var isImage2 = (name210) => name210 == null ? void 0 : name210.includes("/");
var popupInheritKeys3 = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
var iconMap = {
  qq: "qq",
  link: "link-o",
  weibo: "weibo",
  qrcode: "qr",
  poster: "photo-o",
  wechat: "wechat",
  "weapp-qrcode": "miniprogram-o",
  "wechat-moments": "wechat-moments"
};
var [name89, bem85, t18] = createNamespace("share-sheet");
var shareSheetProps = extend({}, popupSharedProps, {
  title: String,
  round: truthProp,
  options: makeArrayProp(),
  cancelText: String,
  description: String,
  closeOnPopstate: truthProp,
  safeAreaInsetBottom: truthProp
});
var stdin_default93 = defineComponent91({
  name: name89,
  props: shareSheetProps,
  emits: ["cancel", "select", "update:show"],
  setup(props2, {
    emit,
    slots
  }) {
    const updateShow = (value) => emit("update:show", value);
    const onCancel = () => {
      updateShow(false);
      emit("cancel");
    };
    const onSelect = (option, index) => emit("select", option, index);
    const renderHeader = () => {
      const title = slots.title ? slots.title() : props2.title;
      const description = slots.description ? slots.description() : props2.description;
      if (title || description) {
        return _createVNode96("div", {
          "class": bem85("header")
        }, [title && _createVNode96("h2", {
          "class": bem85("title")
        }, [title]), description && _createVNode96("span", {
          "class": bem85("description")
        }, [description])]);
      }
    };
    const renderIcon = (icon) => {
      if (isImage2(icon)) {
        return _createVNode96("img", {
          "src": icon,
          "class": bem85("image-icon")
        }, null);
      }
      return _createVNode96("div", {
        "class": bem85("icon", [icon])
      }, [_createVNode96(Icon, {
        "name": iconMap[icon] || icon
      }, null)]);
    };
    const renderOption = (option, index) => {
      const {
        name: name210,
        icon,
        className,
        description
      } = option;
      return _createVNode96("div", {
        "role": "button",
        "tabindex": 0,
        "class": [bem85("option"), className, HAPTICS_FEEDBACK],
        "onClick": () => onSelect(option, index)
      }, [renderIcon(icon), name210 && _createVNode96("span", {
        "class": bem85("name")
      }, [name210]), description && _createVNode96("span", {
        "class": bem85("option-description")
      }, [description])]);
    };
    const renderOptions = (options, border) => _createVNode96("div", {
      "class": bem85("options", {
        border
      })
    }, [options.map(renderOption)]);
    const renderRows = () => {
      const {
        options
      } = props2;
      if (Array.isArray(options[0])) {
        return options.map((item, index) => renderOptions(item, index !== 0));
      }
      return renderOptions(options);
    };
    const renderCancelButton = () => {
      var _a;
      const cancelText = (_a = props2.cancelText) != null ? _a : t18("cancel");
      if (slots.cancel || cancelText) {
        return _createVNode96("button", {
          "type": "button",
          "class": bem85("cancel"),
          "onClick": onCancel
        }, [slots.cancel ? slots.cancel() : cancelText]);
      }
    };
    return () => _createVNode96(Popup, _mergeProps31({
      "class": bem85(),
      "position": "bottom",
      "onUpdate:show": updateShow
    }, pick(props2, popupInheritKeys3)), {
      default: () => [renderHeader(), renderRows(), renderCancelButton()]
    });
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/share-sheet/index.mjs
var ShareSheet = withInstall(stdin_default93);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/sidebar/Sidebar.mjs
import { createVNode as _createVNode97 } from "vue";
import { defineComponent as defineComponent92 } from "vue";
var [name90, bem86] = createNamespace("sidebar");
var SIDEBAR_KEY = Symbol(name90);
var sidebarProps = {
  modelValue: makeNumericProp(0)
};
var stdin_default94 = defineComponent92({
  name: name90,
  props: sidebarProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      linkChildren
    } = useChildren(SIDEBAR_KEY);
    const getActive = () => +props2.modelValue;
    const setActive = (value) => {
      if (value !== getActive()) {
        emit("update:modelValue", value);
        emit("change", value);
      }
    };
    linkChildren({
      getActive,
      setActive
    });
    return () => {
      var _a;
      return _createVNode97("div", {
        "role": "tablist",
        "class": bem86()
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/sidebar/index.mjs
var Sidebar = withInstall(stdin_default94);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/sidebar-item/SidebarItem.mjs
import { createVNode as _createVNode98, mergeProps as _mergeProps32 } from "vue";
import { defineComponent as defineComponent93 } from "vue";
var [name91, bem87] = createNamespace("sidebar-item");
var sidebarItemProps = extend({}, routeProps, {
  dot: Boolean,
  title: String,
  badge: numericProp,
  disabled: Boolean,
  badgeProps: Object
});
var stdin_default95 = defineComponent93({
  name: name91,
  props: sidebarItemProps,
  emits: ["click"],
  setup(props2, {
    emit,
    slots
  }) {
    const route2 = useRoute();
    const {
      parent,
      index
    } = useParent(SIDEBAR_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <SidebarItem> must be a child component of <Sidebar>.");
      }
      return;
    }
    const onClick = () => {
      if (props2.disabled) {
        return;
      }
      emit("click", index.value);
      parent.setActive(index.value);
      route2();
    };
    return () => {
      const {
        dot,
        badge,
        title,
        disabled
      } = props2;
      const selected = index.value === parent.getActive();
      return _createVNode98("div", {
        "role": "tab",
        "class": bem87({
          select: selected,
          disabled
        }),
        "tabindex": disabled ? void 0 : 0,
        "aria-selected": selected,
        "onClick": onClick
      }, [_createVNode98(Badge, _mergeProps32({
        "dot": dot,
        "class": bem87("text"),
        "content": badge
      }, props2.badgeProps), {
        default: () => [slots.title ? slots.title() : title]
      })]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/sidebar-item/index.mjs
var SidebarItem = withInstall(stdin_default95);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/signature/Signature.mjs
import { createVNode as _createVNode99 } from "vue";
import { computed as computed52, ref as ref57, onMounted as onMounted19, defineComponent as defineComponent94, watch as watch46 } from "vue";
var [name92, bem88, t19] = createNamespace("signature");
var signatureProps = {
  tips: String,
  type: makeStringProp("png"),
  penColor: makeStringProp("#000"),
  lineWidth: makeNumberProp(3),
  clearButtonText: String,
  backgroundColor: makeStringProp(""),
  confirmButtonText: String
};
var hasCanvasSupport = () => {
  var _a;
  const canvas = document.createElement("canvas");
  return !!((_a = canvas.getContext) == null ? void 0 : _a.call(canvas, "2d"));
};
var stdin_default96 = defineComponent94({
  name: name92,
  props: signatureProps,
  emits: ["submit", "clear", "start", "end", "signing"],
  setup(props2, {
    emit
  }) {
    const canvasRef = ref57();
    const wrapRef = ref57();
    const ctx = computed52(() => {
      if (!canvasRef.value)
        return null;
      return canvasRef.value.getContext("2d");
    });
    const isRenderCanvas = inBrowser ? hasCanvasSupport() : true;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let canvasRect;
    const touchStart = () => {
      if (!ctx.value) {
        return false;
      }
      ctx.value.beginPath();
      ctx.value.lineWidth = props2.lineWidth;
      ctx.value.strokeStyle = props2.penColor;
      canvasRect = useRect(canvasRef);
      emit("start");
    };
    const touchMove = (event) => {
      if (!ctx.value) {
        return false;
      }
      preventDefault(event);
      const touch = event.touches[0];
      const mouseX = touch.clientX - ((canvasRect == null ? void 0 : canvasRect.left) || 0);
      const mouseY = touch.clientY - ((canvasRect == null ? void 0 : canvasRect.top) || 0);
      ctx.value.lineCap = "round";
      ctx.value.lineJoin = "round";
      ctx.value.lineTo(mouseX, mouseY);
      ctx.value.stroke();
      emit("signing", event);
    };
    const touchEnd = (event) => {
      preventDefault(event);
      emit("end");
    };
    const isCanvasEmpty = (canvas) => {
      const empty = document.createElement("canvas");
      empty.width = canvas.width;
      empty.height = canvas.height;
      if (props2.backgroundColor) {
        const emptyCtx = empty.getContext("2d");
        setCanvasBgColor(emptyCtx);
      }
      return canvas.toDataURL() === empty.toDataURL();
    };
    const setCanvasBgColor = (ctx2) => {
      if (ctx2 && props2.backgroundColor) {
        ctx2.fillStyle = props2.backgroundColor;
        ctx2.fillRect(0, 0, canvasWidth, canvasHeight);
      }
    };
    const submit = () => {
      var _a, _b;
      const canvas = canvasRef.value;
      if (!canvas) {
        return;
      }
      const isEmpty = isCanvasEmpty(canvas);
      const image = isEmpty ? "" : ((_b = (_a = {
        jpg: () => canvas.toDataURL("image/jpeg", 0.8),
        jpeg: () => canvas.toDataURL("image/jpeg", 0.8)
      })[props2.type]) == null ? void 0 : _b.call(_a)) || canvas.toDataURL(`image/${props2.type}`);
      emit("submit", {
        image,
        canvas
      });
    };
    const clear = () => {
      if (ctx.value) {
        ctx.value.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.value.closePath();
        setCanvasBgColor(ctx.value);
      }
      emit("clear");
    };
    const initialize = () => {
      var _a, _b, _c;
      if (isRenderCanvas && canvasRef.value) {
        const canvas = canvasRef.value;
        const dpr = inBrowser ? window.devicePixelRatio : 1;
        canvasWidth = canvas.width = (((_a = wrapRef.value) == null ? void 0 : _a.offsetWidth) || 0) * dpr;
        canvasHeight = canvas.height = (((_b = wrapRef.value) == null ? void 0 : _b.offsetHeight) || 0) * dpr;
        (_c = ctx.value) == null ? void 0 : _c.scale(dpr, dpr);
        setCanvasBgColor(ctx.value);
      }
    };
    const resize = () => {
      if (ctx.value) {
        const data = ctx.value.getImageData(0, 0, canvasWidth, canvasHeight);
        initialize();
        ctx.value.putImageData(data, 0, 0);
      }
    };
    watch46(windowWidth, resize);
    onMounted19(initialize);
    useExpose({
      resize,
      clear,
      submit
    });
    return () => _createVNode99("div", {
      "class": bem88()
    }, [_createVNode99("div", {
      "class": bem88("content"),
      "ref": wrapRef
    }, [isRenderCanvas ? _createVNode99("canvas", {
      "ref": canvasRef,
      "onTouchstartPassive": touchStart,
      "onTouchmove": touchMove,
      "onTouchend": touchEnd
    }, null) : _createVNode99("p", null, [props2.tips])]), _createVNode99("div", {
      "class": bem88("footer")
    }, [_createVNode99(Button, {
      "size": "small",
      "onClick": clear
    }, {
      default: () => [props2.clearButtonText || t19("clear")]
    }), _createVNode99(Button, {
      "type": "primary",
      "size": "small",
      "onClick": submit
    }, {
      default: () => [props2.confirmButtonText || t19("confirm")]
    })])]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/signature/index.mjs
var Signature = withInstall(stdin_default96);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/skeleton/Skeleton.mjs
import { mergeProps as _mergeProps33, Fragment as _Fragment6, createVNode as _createVNode103 } from "vue";
import { defineComponent as defineComponent98 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/skeleton-title/SkeletonTitle.mjs
import { createVNode as _createVNode100 } from "vue";
import { defineComponent as defineComponent95 } from "vue";
var [name93, bem89] = createNamespace("skeleton-title");
var skeletonTitleProps = {
  round: Boolean,
  titleWidth: numericProp
};
var stdin_default97 = defineComponent95({
  name: name93,
  props: skeletonTitleProps,
  setup(props2) {
    return () => _createVNode100("h3", {
      "class": bem89([{
        round: props2.round
      }]),
      "style": {
        width: addUnit(props2.titleWidth)
      }
    }, null);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/skeleton-title/index.mjs
var SkeletonTitle = withInstall(stdin_default97);
var stdin_default98 = SkeletonTitle;

// ../../../NottinghamWall/uniapp/node_modules/vant/es/skeleton-avatar/SkeletonAvatar.mjs
import { createVNode as _createVNode101 } from "vue";
import { defineComponent as defineComponent96 } from "vue";
var [name94, bem90] = createNamespace("skeleton-avatar");
var skeletonAvatarProps = {
  avatarSize: numericProp,
  avatarShape: makeStringProp("round")
};
var stdin_default99 = defineComponent96({
  name: name94,
  props: skeletonAvatarProps,
  setup(props2) {
    return () => _createVNode101("div", {
      "class": bem90([props2.avatarShape]),
      "style": getSizeStyle(props2.avatarSize)
    }, null);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/skeleton-avatar/index.mjs
var SkeletonAvatar = withInstall(stdin_default99);
var stdin_default100 = SkeletonAvatar;

// ../../../NottinghamWall/uniapp/node_modules/vant/es/skeleton-paragraph/SkeletonParagraph.mjs
import { createVNode as _createVNode102 } from "vue";
import { defineComponent as defineComponent97 } from "vue";
var DEFAULT_ROW_WIDTH = "100%";
var skeletonParagraphProps = {
  round: Boolean,
  rowWidth: {
    type: numericProp,
    default: DEFAULT_ROW_WIDTH
  }
};
var [name95, bem91] = createNamespace("skeleton-paragraph");
var stdin_default101 = defineComponent97({
  name: name95,
  props: skeletonParagraphProps,
  setup(props2) {
    return () => _createVNode102("div", {
      "class": bem91([{
        round: props2.round
      }]),
      "style": {
        width: props2.rowWidth
      }
    }, null);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/skeleton-paragraph/index.mjs
var SkeletonParagraph = withInstall(stdin_default101);
var stdin_default102 = SkeletonParagraph;

// ../../../NottinghamWall/uniapp/node_modules/vant/es/skeleton/Skeleton.mjs
var [name96, bem92] = createNamespace("skeleton");
var DEFAULT_LAST_ROW_WIDTH = "60%";
var skeletonProps = {
  row: makeNumericProp(0),
  round: Boolean,
  title: Boolean,
  titleWidth: numericProp,
  avatar: Boolean,
  avatarSize: numericProp,
  avatarShape: makeStringProp("round"),
  loading: truthProp,
  animate: truthProp,
  rowWidth: {
    type: [Number, String, Array],
    default: DEFAULT_ROW_WIDTH
  }
};
var stdin_default103 = defineComponent98({
  name: name96,
  inheritAttrs: false,
  props: skeletonProps,
  setup(props2, {
    slots,
    attrs
  }) {
    const renderAvatar = () => {
      if (props2.avatar) {
        return _createVNode103(stdin_default100, {
          "avatarShape": props2.avatarShape,
          "avatarSize": props2.avatarSize
        }, null);
      }
    };
    const renderTitle = () => {
      if (props2.title) {
        return _createVNode103(stdin_default98, {
          "round": props2.round,
          "titleWidth": props2.titleWidth
        }, null);
      }
    };
    const getRowWidth = (index) => {
      const {
        rowWidth
      } = props2;
      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props2.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }
      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }
      return rowWidth;
    };
    const renderRows = () => Array(+props2.row).fill("").map((_, i) => _createVNode103(stdin_default102, {
      "key": i,
      "round": props2.round,
      "rowWidth": addUnit(getRowWidth(i))
    }, null));
    const renderContents = () => {
      if (slots.template) {
        return slots.template();
      }
      return _createVNode103(_Fragment6, null, [renderAvatar(), _createVNode103("div", {
        "class": bem92("content")
      }, [renderTitle(), renderRows()])]);
    };
    return () => {
      var _a;
      if (!props2.loading) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      return _createVNode103("div", _mergeProps33({
        "class": bem92({
          animate: props2.animate,
          round: props2.round
        })
      }, attrs), [renderContents()]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/skeleton/index.mjs
var Skeleton = withInstall(stdin_default103);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/skeleton-image/SkeletonImage.mjs
import { createVNode as _createVNode104 } from "vue";
import { defineComponent as defineComponent99 } from "vue";
var [name97, bem93] = createNamespace("skeleton-image");
var skeletonImageProps = {
  imageSize: numericProp,
  imageShape: makeStringProp("square")
};
var stdin_default104 = defineComponent99({
  name: name97,
  props: skeletonImageProps,
  setup(props2) {
    return () => _createVNode104("div", {
      "class": bem93([props2.imageShape]),
      "style": getSizeStyle(props2.imageSize)
    }, [_createVNode104(Icon, {
      "name": "photo",
      "class": bem93("icon")
    }, null)]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/skeleton-image/index.mjs
var SkeletonImage = withInstall(stdin_default104);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/slider/Slider.mjs
import { createVNode as _createVNode105 } from "vue";
import { ref as ref58, computed as computed53, defineComponent as defineComponent100 } from "vue";
var [name98, bem94] = createNamespace("slider");
var sliderProps = {
  min: makeNumericProp(0),
  max: makeNumericProp(100),
  step: makeNumericProp(1),
  range: Boolean,
  reverse: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  vertical: Boolean,
  barHeight: numericProp,
  buttonSize: numericProp,
  activeColor: String,
  inactiveColor: String,
  modelValue: {
    type: [Number, Array],
    default: 0
  }
};
var stdin_default105 = defineComponent100({
  name: name98,
  props: sliderProps,
  emits: ["change", "dragEnd", "dragStart", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    let buttonIndex;
    let current2;
    let startValue;
    const root = ref58();
    const slider = [ref58(), ref58()];
    const dragStatus = ref58();
    const touch = useTouch();
    const scope = computed53(() => Number(props2.max) - Number(props2.min));
    const wrapperStyle = computed53(() => {
      const crossAxis = props2.vertical ? "width" : "height";
      return {
        background: props2.inactiveColor,
        [crossAxis]: addUnit(props2.barHeight)
      };
    });
    const isRange = (val) => props2.range && Array.isArray(val);
    const calcMainAxis = () => {
      const {
        modelValue,
        min
      } = props2;
      if (isRange(modelValue)) {
        return `${(modelValue[1] - modelValue[0]) * 100 / scope.value}%`;
      }
      return `${(modelValue - Number(min)) * 100 / scope.value}%`;
    };
    const calcOffset = () => {
      const {
        modelValue,
        min
      } = props2;
      if (isRange(modelValue)) {
        return `${(modelValue[0] - Number(min)) * 100 / scope.value}%`;
      }
      return "0%";
    };
    const barStyle = computed53(() => {
      const mainAxis = props2.vertical ? "height" : "width";
      const style = {
        [mainAxis]: calcMainAxis(),
        background: props2.activeColor
      };
      if (dragStatus.value) {
        style.transition = "none";
      }
      const getPositionKey = () => {
        if (props2.vertical) {
          return props2.reverse ? "bottom" : "top";
        }
        return props2.reverse ? "right" : "left";
      };
      style[getPositionKey()] = calcOffset();
      return style;
    });
    const format3 = (value) => {
      const min = +props2.min;
      const max = +props2.max;
      const step = +props2.step;
      value = clamp(value, min, max);
      const diff = Math.round((value - min) / step) * step;
      return addNumber(min, diff);
    };
    const updateStartValue = () => {
      const current22 = props2.modelValue;
      if (isRange(current22)) {
        startValue = current22.map(format3);
      } else {
        startValue = format3(current22);
      }
    };
    const handleRangeValue = (value) => {
      var _a, _b;
      const left2 = (_a = value[0]) != null ? _a : Number(props2.min);
      const right2 = (_b = value[1]) != null ? _b : Number(props2.max);
      return left2 > right2 ? [right2, left2] : [left2, right2];
    };
    const updateValue = (value, end2) => {
      if (isRange(value)) {
        value = handleRangeValue(value).map(format3);
      } else {
        value = format3(value);
      }
      if (!isSameValue(value, props2.modelValue)) {
        emit("update:modelValue", value);
      }
      if (end2 && !isSameValue(value, startValue)) {
        emit("change", value);
      }
    };
    const onClick = (event) => {
      event.stopPropagation();
      if (props2.disabled || props2.readonly) {
        return;
      }
      updateStartValue();
      const {
        min,
        reverse,
        vertical,
        modelValue
      } = props2;
      const rect = useRect(root);
      const getDelta = () => {
        if (vertical) {
          if (reverse) {
            return rect.bottom - event.clientY;
          }
          return event.clientY - rect.top;
        }
        if (reverse) {
          return rect.right - event.clientX;
        }
        return event.clientX - rect.left;
      };
      const total = vertical ? rect.height : rect.width;
      const value = Number(min) + getDelta() / total * scope.value;
      if (isRange(modelValue)) {
        const [left2, right2] = modelValue;
        const middle = (left2 + right2) / 2;
        if (value <= middle) {
          updateValue([value, right2], true);
        } else {
          updateValue([left2, value], true);
        }
      } else {
        updateValue(value, true);
      }
    };
    const onTouchStart = (event) => {
      if (props2.disabled || props2.readonly) {
        return;
      }
      touch.start(event);
      current2 = props2.modelValue;
      updateStartValue();
      dragStatus.value = "start";
    };
    const onTouchMove = (event) => {
      if (props2.disabled || props2.readonly) {
        return;
      }
      if (dragStatus.value === "start") {
        emit("dragStart", event);
      }
      preventDefault(event, true);
      touch.move(event);
      dragStatus.value = "dragging";
      const rect = useRect(root);
      const delta = props2.vertical ? touch.deltaY.value : touch.deltaX.value;
      const total = props2.vertical ? rect.height : rect.width;
      let diff = delta / total * scope.value;
      if (props2.reverse) {
        diff = -diff;
      }
      if (isRange(startValue)) {
        const index = props2.reverse ? 1 - buttonIndex : buttonIndex;
        current2[index] = startValue[index] + diff;
      } else {
        current2 = startValue + diff;
      }
      updateValue(current2);
    };
    const onTouchEnd = (event) => {
      if (props2.disabled || props2.readonly) {
        return;
      }
      if (dragStatus.value === "dragging") {
        updateValue(current2, true);
        emit("dragEnd", event);
      }
      dragStatus.value = "";
    };
    const getButtonClassName = (index) => {
      if (typeof index === "number") {
        const position = ["left", "right"];
        return bem94(`button-wrapper`, position[index]);
      }
      return bem94("button-wrapper", props2.reverse ? "left" : "right");
    };
    const renderButtonContent = (value, index) => {
      const dragging = dragStatus.value === "dragging";
      if (typeof index === "number") {
        const slot = slots[index === 0 ? "left-button" : "right-button"];
        let dragIndex;
        if (dragging && Array.isArray(current2)) {
          dragIndex = current2[0] > current2[1] ? buttonIndex ^ 1 : buttonIndex;
        }
        if (slot) {
          return slot({
            value,
            dragging,
            dragIndex
          });
        }
      }
      if (slots.button) {
        return slots.button({
          value,
          dragging
        });
      }
      return _createVNode105("div", {
        "class": bem94("button"),
        "style": getSizeStyle(props2.buttonSize)
      }, null);
    };
    const renderButton = (index) => {
      const current22 = typeof index === "number" ? props2.modelValue[index] : props2.modelValue;
      return _createVNode105("div", {
        "ref": slider[index != null ? index : 0],
        "role": "slider",
        "class": getButtonClassName(index),
        "tabindex": props2.disabled ? void 0 : 0,
        "aria-valuemin": props2.min,
        "aria-valuenow": current22,
        "aria-valuemax": props2.max,
        "aria-disabled": props2.disabled || void 0,
        "aria-readonly": props2.readonly || void 0,
        "aria-orientation": props2.vertical ? "vertical" : "horizontal",
        "onTouchstartPassive": (event) => {
          if (typeof index === "number") {
            buttonIndex = index;
          }
          onTouchStart(event);
        },
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd,
        "onClick": stopPropagation
      }, [renderButtonContent(current22, index)]);
    };
    updateValue(props2.modelValue);
    useCustomFieldValue(() => props2.modelValue);
    slider.forEach((item) => {
      useEventListener("touchmove", onTouchMove, {
        target: item
      });
    });
    return () => _createVNode105("div", {
      "ref": root,
      "style": wrapperStyle.value,
      "class": bem94({
        vertical: props2.vertical,
        disabled: props2.disabled
      }),
      "onClick": onClick
    }, [_createVNode105("div", {
      "class": bem94("bar"),
      "style": barStyle.value
    }, [props2.range ? [renderButton(0), renderButton(1)] : renderButton()])]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/slider/index.mjs
var Slider = withInstall(stdin_default105);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/space/Space.mjs
import { createVNode as _createVNode106 } from "vue";
import { computed as computed54, Comment as Comment2, defineComponent as defineComponent101, Fragment as Fragment2, Text } from "vue";
var [name99, bem95] = createNamespace("space");
var spaceProps = {
  align: String,
  direction: {
    type: String,
    default: "horizontal"
  },
  size: {
    type: [Number, String, Array],
    default: 8
  },
  wrap: Boolean,
  fill: Boolean
};
function filterEmpty(children = []) {
  const nodes = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      nodes.push(...child);
    } else if (child.type === Fragment2) {
      nodes.push(...filterEmpty(child.children));
    } else {
      nodes.push(child);
    }
  });
  return nodes.filter((c) => {
    var _a;
    return !(c && (c.type === Comment2 || c.type === Fragment2 && ((_a = c.children) == null ? void 0 : _a.length) === 0 || c.type === Text && c.children.trim() === ""));
  });
}
var stdin_default106 = defineComponent101({
  name: name99,
  props: spaceProps,
  setup(props2, {
    slots
  }) {
    const mergedAlign = computed54(() => {
      var _a;
      return (_a = props2.align) != null ? _a : props2.direction === "horizontal" ? "center" : "";
    });
    const getMargin = (size) => {
      if (typeof size === "number") {
        return size + "px";
      }
      return size;
    };
    const getMarginStyle = (isLast) => {
      const style = {};
      const marginRight = `${getMargin(Array.isArray(props2.size) ? props2.size[0] : props2.size)}`;
      const marginBottom = `${getMargin(Array.isArray(props2.size) ? props2.size[1] : props2.size)}`;
      if (isLast) {
        return props2.wrap ? {
          marginBottom
        } : {};
      }
      if (props2.direction === "horizontal") {
        style.marginRight = marginRight;
      }
      if (props2.direction === "vertical" || props2.wrap) {
        style.marginBottom = marginBottom;
      }
      return style;
    };
    return () => {
      var _a;
      const children = filterEmpty((_a = slots.default) == null ? void 0 : _a.call(slots));
      return _createVNode106("div", {
        "class": [bem95({
          [props2.direction]: props2.direction,
          [`align-${mergedAlign.value}`]: mergedAlign.value,
          wrap: props2.wrap,
          fill: props2.fill
        })]
      }, [children.map((c, i) => _createVNode106("div", {
        "key": `item-${i}`,
        "class": `${name99}-item`,
        "style": getMarginStyle(i === children.length - 1)
      }, [c]))]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/space/index.mjs
var Space = withInstall(stdin_default106);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/step/Step.mjs
import { createVNode as _createVNode108 } from "vue";
import { computed as computed55, defineComponent as defineComponent103 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/steps/Steps.mjs
import { createVNode as _createVNode107 } from "vue";
import { defineComponent as defineComponent102 } from "vue";
var [name100, bem96] = createNamespace("steps");
var stepsProps = {
  active: makeNumericProp(0),
  direction: makeStringProp("horizontal"),
  activeIcon: makeStringProp("checked"),
  iconPrefix: String,
  finishIcon: String,
  activeColor: String,
  inactiveIcon: String,
  inactiveColor: String
};
var STEPS_KEY = Symbol(name100);
var stdin_default107 = defineComponent102({
  name: name100,
  props: stepsProps,
  emits: ["clickStep"],
  setup(props2, {
    emit,
    slots
  }) {
    const {
      linkChildren
    } = useChildren(STEPS_KEY);
    const onClickStep = (index) => emit("clickStep", index);
    linkChildren({
      props: props2,
      onClickStep
    });
    return () => {
      var _a;
      return _createVNode107("div", {
        "class": bem96([props2.direction])
      }, [_createVNode107("div", {
        "class": bem96("items")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/step/Step.mjs
var [name101, bem97] = createNamespace("step");
var stdin_default108 = defineComponent103({
  name: name101,
  setup(props2, {
    slots
  }) {
    const {
      parent,
      index
    } = useParent(STEPS_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <Step> must be a child component of <Steps>.");
      }
      return;
    }
    const parentProps = parent.props;
    const getStatus = () => {
      const active = +parentProps.active;
      if (index.value < active) {
        return "finish";
      }
      return index.value === active ? "process" : "waiting";
    };
    const isActive = () => getStatus() === "process";
    const lineStyle = computed55(() => ({
      background: getStatus() === "finish" ? parentProps.activeColor : parentProps.inactiveColor
    }));
    const titleStyle = computed55(() => {
      if (isActive()) {
        return {
          color: parentProps.activeColor
        };
      }
      if (getStatus() === "waiting") {
        return {
          color: parentProps.inactiveColor
        };
      }
    });
    const onClickStep = () => parent.onClickStep(index.value);
    const renderCircle = () => {
      const {
        iconPrefix,
        finishIcon,
        activeIcon,
        activeColor,
        inactiveIcon
      } = parentProps;
      if (isActive()) {
        if (slots["active-icon"]) {
          return slots["active-icon"]();
        }
        return _createVNode108(Icon, {
          "class": bem97("icon", "active"),
          "name": activeIcon,
          "color": activeColor,
          "classPrefix": iconPrefix
        }, null);
      }
      if (getStatus() === "finish" && (finishIcon || slots["finish-icon"])) {
        if (slots["finish-icon"]) {
          return slots["finish-icon"]();
        }
        return _createVNode108(Icon, {
          "class": bem97("icon", "finish"),
          "name": finishIcon,
          "color": activeColor,
          "classPrefix": iconPrefix
        }, null);
      }
      if (slots["inactive-icon"]) {
        return slots["inactive-icon"]();
      }
      if (inactiveIcon) {
        return _createVNode108(Icon, {
          "class": bem97("icon"),
          "name": inactiveIcon,
          "classPrefix": iconPrefix
        }, null);
      }
      return _createVNode108("i", {
        "class": bem97("circle"),
        "style": lineStyle.value
      }, null);
    };
    return () => {
      var _a;
      const status = getStatus();
      return _createVNode108("div", {
        "class": [BORDER, bem97([parentProps.direction, {
          [status]: status
        }])]
      }, [_createVNode108("div", {
        "class": bem97("title", {
          active: isActive()
        }),
        "style": titleStyle.value,
        "onClick": onClickStep
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), _createVNode108("div", {
        "class": bem97("circle-container"),
        "onClick": onClickStep
      }, [renderCircle()]), _createVNode108("div", {
        "class": bem97("line"),
        "style": lineStyle.value
      }, null)]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/step/index.mjs
var Step = withInstall(stdin_default108);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/stepper/Stepper.mjs
import { withDirectives as _withDirectives12, createVNode as _createVNode109, mergeProps as _mergeProps34, vShow as _vShow11 } from "vue";
import { ref as ref59, watch as watch47, computed as computed56, nextTick as nextTick25, defineComponent as defineComponent104 } from "vue";
var [name102, bem98] = createNamespace("stepper");
var LONG_PRESS_INTERVAL = 200;
var isEqual = (value1, value2) => String(value1) === String(value2);
var stepperProps = {
  min: makeNumericProp(1),
  max: makeNumericProp(Infinity),
  name: makeNumericProp(""),
  step: makeNumericProp(1),
  theme: String,
  integer: Boolean,
  disabled: Boolean,
  showPlus: truthProp,
  showMinus: truthProp,
  showInput: truthProp,
  longPress: truthProp,
  autoFixed: truthProp,
  allowEmpty: Boolean,
  modelValue: numericProp,
  inputWidth: numericProp,
  buttonSize: numericProp,
  placeholder: String,
  disablePlus: Boolean,
  disableMinus: Boolean,
  disableInput: Boolean,
  beforeChange: Function,
  defaultValue: makeNumericProp(1),
  decimalLength: numericProp
};
var stdin_default109 = defineComponent104({
  name: name102,
  props: stepperProps,
  emits: ["plus", "blur", "minus", "focus", "change", "overlimit", "update:modelValue"],
  setup(props2, {
    emit
  }) {
    const format3 = (value, autoFixed = true) => {
      const {
        min,
        max,
        allowEmpty,
        decimalLength
      } = props2;
      if (allowEmpty && value === "") {
        return value;
      }
      value = formatNumber(String(value), !props2.integer);
      value = value === "" ? 0 : +value;
      value = Number.isNaN(value) ? +min : value;
      value = autoFixed ? Math.max(Math.min(+max, value), +min) : value;
      if (isDef(decimalLength)) {
        value = value.toFixed(+decimalLength);
      }
      return value;
    };
    const getInitialValue = () => {
      var _a;
      const defaultValue = (_a = props2.modelValue) != null ? _a : props2.defaultValue;
      const value = format3(defaultValue);
      if (!isEqual(value, props2.modelValue)) {
        emit("update:modelValue", value);
      }
      return value;
    };
    let actionType;
    const inputRef = ref59();
    const current2 = ref59(getInitialValue());
    const minusDisabled = computed56(() => props2.disabled || props2.disableMinus || +current2.value <= +props2.min);
    const plusDisabled = computed56(() => props2.disabled || props2.disablePlus || +current2.value >= +props2.max);
    const inputStyle = computed56(() => ({
      width: addUnit(props2.inputWidth),
      height: addUnit(props2.buttonSize)
    }));
    const buttonStyle = computed56(() => getSizeStyle(props2.buttonSize));
    const check = () => {
      const value = format3(current2.value);
      if (!isEqual(value, current2.value)) {
        current2.value = value;
      }
    };
    const setValue = (value) => {
      if (props2.beforeChange) {
        callInterceptor(props2.beforeChange, {
          args: [value],
          done() {
            current2.value = value;
          }
        });
      } else {
        current2.value = value;
      }
    };
    const onChange = () => {
      if (actionType === "plus" && plusDisabled.value || actionType === "minus" && minusDisabled.value) {
        emit("overlimit", actionType);
        return;
      }
      const diff = actionType === "minus" ? -props2.step : +props2.step;
      const value = format3(addNumber(+current2.value, diff));
      setValue(value);
      emit(actionType);
    };
    const onInput = (event) => {
      const input = event.target;
      const {
        value
      } = input;
      const {
        decimalLength
      } = props2;
      let formatted = formatNumber(String(value), !props2.integer);
      if (isDef(decimalLength) && formatted.includes(".")) {
        const pair = formatted.split(".");
        formatted = `${pair[0]}.${pair[1].slice(0, +decimalLength)}`;
      }
      if (props2.beforeChange) {
        input.value = String(current2.value);
      } else if (!isEqual(value, formatted)) {
        input.value = formatted;
      }
      const isNumeric2 = formatted === String(+formatted);
      setValue(isNumeric2 ? +formatted : formatted);
    };
    const onFocus = (event) => {
      var _a;
      if (props2.disableInput) {
        (_a = inputRef.value) == null ? void 0 : _a.blur();
      } else {
        emit("focus", event);
      }
    };
    const onBlur = (event) => {
      const input = event.target;
      const value = format3(input.value, props2.autoFixed);
      input.value = String(value);
      current2.value = value;
      nextTick25(() => {
        emit("blur", event);
        resetScroll();
      });
    };
    let isLongPress;
    let longPressTimer;
    const longPressStep = () => {
      longPressTimer = setTimeout(() => {
        onChange();
        longPressStep();
      }, LONG_PRESS_INTERVAL);
    };
    const onTouchStart = () => {
      if (props2.longPress) {
        isLongPress = false;
        clearTimeout(longPressTimer);
        longPressTimer = setTimeout(() => {
          isLongPress = true;
          onChange();
          longPressStep();
        }, LONG_PRESS_START_TIME);
      }
    };
    const onTouchEnd = (event) => {
      if (props2.longPress) {
        clearTimeout(longPressTimer);
        if (isLongPress) {
          preventDefault(event);
        }
      }
    };
    const onMousedown = (event) => {
      if (props2.disableInput) {
        preventDefault(event);
      }
    };
    const createListeners = (type) => ({
      onClick: (event) => {
        preventDefault(event);
        actionType = type;
        onChange();
      },
      onTouchstartPassive: () => {
        actionType = type;
        onTouchStart();
      },
      onTouchend: onTouchEnd,
      onTouchcancel: onTouchEnd
    });
    watch47(() => [props2.max, props2.min, props2.integer, props2.decimalLength], check);
    watch47(() => props2.modelValue, (value) => {
      if (!isEqual(value, current2.value)) {
        current2.value = format3(value);
      }
    });
    watch47(current2, (value) => {
      emit("update:modelValue", value);
      emit("change", value, {
        name: props2.name
      });
    });
    useCustomFieldValue(() => props2.modelValue);
    return () => _createVNode109("div", {
      "role": "group",
      "class": bem98([props2.theme])
    }, [_withDirectives12(_createVNode109("button", _mergeProps34({
      "type": "button",
      "style": buttonStyle.value,
      "class": [bem98("minus", {
        disabled: minusDisabled.value
      }), {
        [HAPTICS_FEEDBACK]: !minusDisabled.value
      }],
      "aria-disabled": minusDisabled.value || void 0
    }, createListeners("minus")), null), [[_vShow11, props2.showMinus]]), _withDirectives12(_createVNode109("input", {
      "ref": inputRef,
      "type": props2.integer ? "tel" : "text",
      "role": "spinbutton",
      "class": bem98("input"),
      "value": current2.value,
      "style": inputStyle.value,
      "disabled": props2.disabled,
      "readonly": props2.disableInput,
      "inputmode": props2.integer ? "numeric" : "decimal",
      "placeholder": props2.placeholder,
      "autocomplete": "off",
      "aria-valuemax": props2.max,
      "aria-valuemin": props2.min,
      "aria-valuenow": current2.value,
      "onBlur": onBlur,
      "onInput": onInput,
      "onFocus": onFocus,
      "onMousedown": onMousedown
    }, null), [[_vShow11, props2.showInput]]), _withDirectives12(_createVNode109("button", _mergeProps34({
      "type": "button",
      "style": buttonStyle.value,
      "class": [bem98("plus", {
        disabled: plusDisabled.value
      }), {
        [HAPTICS_FEEDBACK]: !plusDisabled.value
      }],
      "aria-disabled": plusDisabled.value || void 0
    }, createListeners("plus")), null), [[_vShow11, props2.showPlus]])]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/stepper/index.mjs
var Stepper = withInstall(stdin_default109);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/steps/index.mjs
var Steps = withInstall(stdin_default107);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/submit-bar/SubmitBar.mjs
import { createVNode as _createVNode110 } from "vue";
import { ref as ref60, defineComponent as defineComponent105 } from "vue";
var [name103, bem99, t20] = createNamespace("submit-bar");
var submitBarProps = {
  tip: String,
  label: String,
  price: Number,
  tipIcon: String,
  loading: Boolean,
  currency: makeStringProp("¥"),
  disabled: Boolean,
  textAlign: String,
  buttonText: String,
  buttonType: makeStringProp("danger"),
  buttonColor: String,
  suffixLabel: String,
  placeholder: Boolean,
  decimalLength: makeNumericProp(2),
  safeAreaInsetBottom: truthProp
};
var stdin_default110 = defineComponent105({
  name: name103,
  props: submitBarProps,
  emits: ["submit"],
  setup(props2, {
    emit,
    slots
  }) {
    const root = ref60();
    const renderPlaceholder = usePlaceholder(root, bem99);
    const renderText = () => {
      const {
        price,
        label,
        currency,
        textAlign,
        suffixLabel,
        decimalLength
      } = props2;
      if (typeof price === "number") {
        const pricePair = (price / 100).toFixed(+decimalLength).split(".");
        const decimal = decimalLength ? `.${pricePair[1]}` : "";
        return _createVNode110("div", {
          "class": bem99("text"),
          "style": {
            textAlign
          }
        }, [_createVNode110("span", null, [label || t20("label")]), _createVNode110("span", {
          "class": bem99("price")
        }, [currency, _createVNode110("span", {
          "class": bem99("price-integer")
        }, [pricePair[0]]), decimal]), suffixLabel && _createVNode110("span", {
          "class": bem99("suffix-label")
        }, [suffixLabel])]);
      }
    };
    const renderTip = () => {
      var _a;
      const {
        tip,
        tipIcon
      } = props2;
      if (slots.tip || tip) {
        return _createVNode110("div", {
          "class": bem99("tip")
        }, [tipIcon && _createVNode110(Icon, {
          "class": bem99("tip-icon"),
          "name": tipIcon
        }, null), tip && _createVNode110("span", {
          "class": bem99("tip-text")
        }, [tip]), (_a = slots.tip) == null ? void 0 : _a.call(slots)]);
      }
    };
    const onClickButton = () => emit("submit");
    const renderButton = () => {
      if (slots.button) {
        return slots.button();
      }
      return _createVNode110(Button, {
        "round": true,
        "type": props2.buttonType,
        "text": props2.buttonText,
        "class": bem99("button", props2.buttonType),
        "color": props2.buttonColor,
        "loading": props2.loading,
        "disabled": props2.disabled,
        "onClick": onClickButton
      }, null);
    };
    const renderSubmitBar = () => {
      var _a, _b;
      return _createVNode110("div", {
        "ref": root,
        "class": [bem99(), {
          "van-safe-area-bottom": props2.safeAreaInsetBottom
        }]
      }, [(_a = slots.top) == null ? void 0 : _a.call(slots), renderTip(), _createVNode110("div", {
        "class": bem99("bar")
      }, [(_b = slots.default) == null ? void 0 : _b.call(slots), renderText(), renderButton()])]);
    };
    return () => {
      if (props2.placeholder) {
        return renderPlaceholder(renderSubmitBar);
      }
      return renderSubmitBar();
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/submit-bar/index.mjs
var SubmitBar = withInstall(stdin_default110);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/swipe-cell/SwipeCell.mjs
import { createVNode as _createVNode111 } from "vue";
import { ref as ref61, reactive as reactive18, computed as computed57, defineComponent as defineComponent106 } from "vue";
var [name104, bem100] = createNamespace("swipe-cell");
var swipeCellProps = {
  name: makeNumericProp(""),
  disabled: Boolean,
  leftWidth: numericProp,
  rightWidth: numericProp,
  beforeClose: Function,
  stopPropagation: Boolean
};
var stdin_default111 = defineComponent106({
  name: name104,
  props: swipeCellProps,
  emits: ["open", "close", "click"],
  setup(props2, {
    emit,
    slots
  }) {
    let opened;
    let lockClick2;
    let startOffset;
    let isInBeforeClosing;
    const root = ref61();
    const leftRef = ref61();
    const rightRef = ref61();
    const state = reactive18({
      offset: 0,
      dragging: false
    });
    const touch = useTouch();
    const getWidthByRef = (ref210) => ref210.value ? useRect(ref210).width : 0;
    const leftWidth = computed57(() => isDef(props2.leftWidth) ? +props2.leftWidth : getWidthByRef(leftRef));
    const rightWidth = computed57(() => isDef(props2.rightWidth) ? +props2.rightWidth : getWidthByRef(rightRef));
    const open = (side) => {
      state.offset = side === "left" ? leftWidth.value : -rightWidth.value;
      if (!opened) {
        opened = true;
        emit("open", {
          name: props2.name,
          position: side
        });
      }
    };
    const close = (position) => {
      state.offset = 0;
      if (opened) {
        opened = false;
        emit("close", {
          name: props2.name,
          position
        });
      }
    };
    const toggle = (side) => {
      const offset2 = Math.abs(state.offset);
      const THRESHOLD = 0.15;
      const threshold = opened ? 1 - THRESHOLD : THRESHOLD;
      const width2 = side === "left" ? leftWidth.value : rightWidth.value;
      if (width2 && offset2 > width2 * threshold) {
        open(side);
      } else {
        close(side);
      }
    };
    const onTouchStart = (event) => {
      if (!props2.disabled) {
        startOffset = state.offset;
        touch.start(event);
      }
    };
    const onTouchMove = (event) => {
      if (props2.disabled) {
        return;
      }
      const {
        deltaX
      } = touch;
      touch.move(event);
      if (touch.isHorizontal()) {
        lockClick2 = true;
        state.dragging = true;
        const isEdge = !opened || deltaX.value * startOffset < 0;
        if (isEdge) {
          preventDefault(event, props2.stopPropagation);
        }
        state.offset = clamp(deltaX.value + startOffset, -rightWidth.value, leftWidth.value);
      }
    };
    const onTouchEnd = () => {
      if (state.dragging) {
        state.dragging = false;
        toggle(state.offset > 0 ? "left" : "right");
        setTimeout(() => {
          lockClick2 = false;
        }, 0);
      }
    };
    const onClick = (position = "outside", event) => {
      if (isInBeforeClosing)
        return;
      emit("click", position);
      if (opened && !lockClick2) {
        isInBeforeClosing = true;
        callInterceptor(props2.beforeClose, {
          args: [{
            event,
            name: props2.name,
            position
          }],
          done: () => {
            isInBeforeClosing = false;
            close(position);
          },
          canceled: () => isInBeforeClosing = false,
          error: () => isInBeforeClosing = false
        });
      }
    };
    const getClickHandler = (position, stop) => (event) => {
      if (stop) {
        event.stopPropagation();
      }
      if (lockClick2) {
        return;
      }
      onClick(position, event);
    };
    const renderSideContent = (side, ref210) => {
      const contentSlot = slots[side];
      if (contentSlot) {
        return _createVNode111("div", {
          "ref": ref210,
          "class": bem100(side),
          "onClick": getClickHandler(side, true)
        }, [contentSlot()]);
      }
    };
    useExpose({
      open,
      close
    });
    useClickAway(root, (event) => onClick("outside", event), {
      eventName: "touchstart"
    });
    useEventListener("touchmove", onTouchMove, {
      target: root
    });
    return () => {
      var _a;
      const wrapperStyle = {
        transform: `translate3d(${state.offset}px, 0, 0)`,
        transitionDuration: state.dragging ? "0s" : ".6s"
      };
      return _createVNode111("div", {
        "ref": root,
        "class": bem100(),
        "onClick": getClickHandler("cell", lockClick2),
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [_createVNode111("div", {
        "class": bem100("wrapper"),
        "style": wrapperStyle
      }, [renderSideContent("left", leftRef), (_a = slots.default) == null ? void 0 : _a.call(slots), renderSideContent("right", rightRef)])]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/swipe-cell/index.mjs
var SwipeCell = withInstall(stdin_default111);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tabbar/Tabbar.mjs
import { createVNode as _createVNode112 } from "vue";
import { ref as ref62, defineComponent as defineComponent107 } from "vue";
var [name105, bem101] = createNamespace("tabbar");
var tabbarProps = {
  route: Boolean,
  fixed: truthProp,
  border: truthProp,
  zIndex: numericProp,
  placeholder: Boolean,
  activeColor: String,
  beforeChange: Function,
  inactiveColor: String,
  modelValue: makeNumericProp(0),
  safeAreaInsetBottom: {
    type: Boolean,
    default: null
  }
};
var TABBAR_KEY = Symbol(name105);
var stdin_default112 = defineComponent107({
  name: name105,
  props: tabbarProps,
  emits: ["change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const root = ref62();
    const {
      linkChildren
    } = useChildren(TABBAR_KEY);
    const renderPlaceholder = usePlaceholder(root, bem101);
    const enableSafeArea = () => {
      var _a;
      return (_a = props2.safeAreaInsetBottom) != null ? _a : props2.fixed;
    };
    const renderTabbar = () => {
      var _a;
      const {
        fixed,
        zIndex,
        border
      } = props2;
      return _createVNode112("div", {
        "ref": root,
        "role": "tablist",
        "style": getZIndexStyle(zIndex),
        "class": [bem101({
          fixed
        }), {
          [BORDER_TOP_BOTTOM]: border,
          "van-safe-area-bottom": enableSafeArea()
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
    const setActive = (active, afterChange) => {
      callInterceptor(props2.beforeChange, {
        args: [active],
        done() {
          emit("update:modelValue", active);
          emit("change", active);
          afterChange();
        }
      });
    };
    linkChildren({
      props: props2,
      setActive
    });
    return () => {
      if (props2.fixed && props2.placeholder) {
        return renderPlaceholder(renderTabbar);
      }
      return renderTabbar();
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tabbar/index.mjs
var Tabbar = withInstall(stdin_default112);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tabbar-item/TabbarItem.mjs
import { mergeProps as _mergeProps35, createVNode as _createVNode113 } from "vue";
import { computed as computed58, defineComponent as defineComponent108, getCurrentInstance as getCurrentInstance10 } from "vue";
var [name106, bem102] = createNamespace("tabbar-item");
var tabbarItemProps = extend({}, routeProps, {
  dot: Boolean,
  icon: String,
  name: numericProp,
  badge: numericProp,
  badgeProps: Object,
  iconPrefix: String
});
var stdin_default113 = defineComponent108({
  name: name106,
  props: tabbarItemProps,
  emits: ["click"],
  setup(props2, {
    emit,
    slots
  }) {
    const route2 = useRoute();
    const vm = getCurrentInstance10().proxy;
    const {
      parent,
      index
    } = useParent(TABBAR_KEY);
    if (!parent) {
      if (true) {
        console.error("[Vant] <TabbarItem> must be a child component of <Tabbar>.");
      }
      return;
    }
    const active = computed58(() => {
      var _a;
      const {
        route: route22,
        modelValue
      } = parent.props;
      if (route22 && "$route" in vm) {
        const {
          $route
        } = vm;
        const {
          to
        } = props2;
        const config = isObject(to) ? to : {
          path: to
        };
        return !!$route.matched.find((val) => {
          const pathMatched = "path" in config && config.path === val.path;
          const nameMatched = "name" in config && config.name === val.name;
          return pathMatched || nameMatched;
        });
      }
      return ((_a = props2.name) != null ? _a : index.value) === modelValue;
    });
    const onClick = (event) => {
      var _a;
      if (!active.value) {
        parent.setActive((_a = props2.name) != null ? _a : index.value, route2);
      }
      emit("click", event);
    };
    const renderIcon = () => {
      if (slots.icon) {
        return slots.icon({
          active: active.value
        });
      }
      if (props2.icon) {
        return _createVNode113(Icon, {
          "name": props2.icon,
          "classPrefix": props2.iconPrefix
        }, null);
      }
    };
    return () => {
      var _a;
      const {
        dot,
        badge
      } = props2;
      const {
        activeColor,
        inactiveColor
      } = parent.props;
      const color = active.value ? activeColor : inactiveColor;
      return _createVNode113("div", {
        "role": "tab",
        "class": bem102({
          active: active.value
        }),
        "style": {
          color
        },
        "tabindex": 0,
        "aria-selected": active.value,
        "onClick": onClick
      }, [_createVNode113(Badge, _mergeProps35({
        "dot": dot,
        "class": bem102("icon"),
        "content": badge
      }, props2.badgeProps), {
        default: renderIcon
      }), _createVNode113("div", {
        "class": bem102("text")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
        active: active.value
      })])]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tabbar-item/index.mjs
var TabbarItem = withInstall(stdin_default113);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/text-ellipsis/TextEllipsis.mjs
import { createVNode as _createVNode114 } from "vue";
import { ref as ref63, watch as watch48, computed as computed59, onActivated as onActivated9, onMounted as onMounted20, defineComponent as defineComponent109, nextTick as nextTick26 } from "vue";
var [name107, bem103] = createNamespace("text-ellipsis");
var textEllipsisProps = {
  rows: makeNumericProp(1),
  dots: makeStringProp("..."),
  content: makeStringProp(""),
  expandText: makeStringProp(""),
  collapseText: makeStringProp(""),
  position: makeStringProp("end")
};
var stdin_default114 = defineComponent109({
  name: name107,
  props: textEllipsisProps,
  emits: ["clickAction"],
  setup(props2, {
    emit,
    slots
  }) {
    const text = ref63(props2.content);
    const expanded = ref63(false);
    const hasAction = ref63(false);
    const root = ref63();
    const actionRef = ref63();
    let needRecalculate = false;
    const actionText = computed59(() => expanded.value ? props2.collapseText : props2.expandText);
    const pxToNum = (value) => {
      if (!value)
        return 0;
      const match = value.match(/^\d*(\.\d*)?/);
      return match ? Number(match[0]) : 0;
    };
    const cloneContainer = () => {
      if (!root.value || !root.value.isConnected)
        return;
      const originStyle = window.getComputedStyle(root.value);
      const container = document.createElement("div");
      const styleNames = Array.prototype.slice.apply(originStyle);
      styleNames.forEach((name210) => {
        container.style.setProperty(name210, originStyle.getPropertyValue(name210));
      });
      container.style.position = "fixed";
      container.style.zIndex = "-9999";
      container.style.top = "-9999px";
      container.style.height = "auto";
      container.style.minHeight = "auto";
      container.style.maxHeight = "auto";
      container.innerText = props2.content;
      document.body.appendChild(container);
      return container;
    };
    const calcEllipsisText = (container, maxHeight) => {
      var _a, _b;
      const {
        content,
        position,
        dots
      } = props2;
      const end2 = content.length;
      const middle = 0 + end2 >> 1;
      const actionHTML = slots.action ? (_b = (_a = actionRef.value) == null ? void 0 : _a.outerHTML) != null ? _b : "" : props2.expandText;
      const calcEllipse = () => {
        const tail = (left2, right2) => {
          if (right2 - left2 <= 1) {
            if (position === "end") {
              return content.slice(0, left2) + dots;
            }
            return dots + content.slice(right2, end2);
          }
          const middle2 = Math.round((left2 + right2) / 2);
          if (position === "end") {
            container.innerText = content.slice(0, middle2) + dots;
          } else {
            container.innerText = dots + content.slice(middle2, end2);
          }
          container.innerHTML += actionHTML;
          if (container.offsetHeight > maxHeight) {
            if (position === "end") {
              return tail(left2, middle2);
            }
            return tail(middle2, right2);
          }
          if (position === "end") {
            return tail(middle2, right2);
          }
          return tail(left2, middle2);
        };
        return tail(0, end2);
      };
      const middleTail = (leftPart, rightPart) => {
        if (leftPart[1] - leftPart[0] <= 1 && rightPart[1] - rightPart[0] <= 1) {
          return content.slice(0, leftPart[0]) + dots + content.slice(rightPart[1], end2);
        }
        const leftMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2);
        const rightMiddle = Math.ceil((rightPart[0] + rightPart[1]) / 2);
        container.innerText = props2.content.slice(0, leftMiddle) + props2.dots + props2.content.slice(rightMiddle, end2);
        container.innerHTML += actionHTML;
        if (container.offsetHeight >= maxHeight) {
          return middleTail([leftPart[0], leftMiddle], [rightMiddle, rightPart[1]]);
        }
        return middleTail([leftMiddle, leftPart[1]], [rightPart[0], rightMiddle]);
      };
      return props2.position === "middle" ? middleTail([0, middle], [middle, end2]) : calcEllipse();
    };
    const calcEllipsised = () => {
      const container = cloneContainer();
      if (!container) {
        needRecalculate = true;
        return;
      }
      const {
        paddingBottom,
        paddingTop,
        lineHeight
      } = container.style;
      const maxHeight = Math.ceil((Number(props2.rows) + 0.5) * pxToNum(lineHeight) + pxToNum(paddingTop) + pxToNum(paddingBottom));
      if (maxHeight < container.offsetHeight) {
        hasAction.value = true;
        text.value = calcEllipsisText(container, maxHeight);
      } else {
        hasAction.value = false;
        text.value = props2.content;
      }
      document.body.removeChild(container);
    };
    const toggle = (isExpanded = !expanded.value) => {
      expanded.value = isExpanded;
    };
    const onClickAction = (event) => {
      toggle();
      emit("clickAction", event);
    };
    const renderAction = () => {
      const action = slots.action ? slots.action({
        expanded: expanded.value
      }) : actionText.value;
      return _createVNode114("span", {
        "ref": actionRef,
        "class": bem103("action"),
        "onClick": onClickAction
      }, [action]);
    };
    onMounted20(() => {
      calcEllipsised();
      if (slots.action) {
        nextTick26(calcEllipsised);
      }
    });
    onActivated9(() => {
      if (needRecalculate) {
        needRecalculate = false;
        calcEllipsised();
      }
    });
    watch48([windowWidth, () => [props2.content, props2.rows, props2.position]], calcEllipsised);
    useExpose({
      toggle
    });
    return () => _createVNode114("div", {
      "ref": root,
      "class": bem103()
    }, [expanded.value ? props2.content : text.value, hasAction.value ? renderAction() : null]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/text-ellipsis/index.mjs
var TextEllipsis = withInstall(stdin_default114);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/time-picker/TimePicker.mjs
import { createVNode as _createVNode115, mergeProps as _mergeProps36 } from "vue";
import { computed as computed60, defineComponent as defineComponent110, ref as ref64, watch as watch49 } from "vue";
var [name108] = createNamespace("time-picker");
var validateTime = (val) => /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(val);
var fullColumns = ["hour", "minute", "second"];
var timePickerProps = extend({}, sharedProps, {
  minHour: makeNumericProp(0),
  maxHour: makeNumericProp(23),
  minMinute: makeNumericProp(0),
  maxMinute: makeNumericProp(59),
  minSecond: makeNumericProp(0),
  maxSecond: makeNumericProp(59),
  minTime: {
    type: String,
    validator: validateTime
  },
  maxTime: {
    type: String,
    validator: validateTime
  },
  columnsType: {
    type: Array,
    default: () => ["hour", "minute"]
  },
  filter: Function
});
var stdin_default115 = defineComponent110({
  name: name108,
  props: timePickerProps,
  emits: ["confirm", "cancel", "change", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const currentValues = ref64(props2.modelValue);
    const pickerRef = ref64();
    const getValidTime = (time) => {
      const timeLimitArr = time.split(":");
      return fullColumns.map((col, i) => props2.columnsType.includes(col) ? timeLimitArr[i] : "00");
    };
    const confirm = () => {
      var _a;
      return (_a = pickerRef.value) == null ? void 0 : _a.confirm();
    };
    const getSelectedTime = () => currentValues.value;
    const columns = computed60(() => {
      let {
        minHour,
        maxHour,
        minMinute,
        maxMinute,
        minSecond,
        maxSecond
      } = props2;
      if (props2.minTime || props2.maxTime) {
        const fullTime = {
          hour: 0,
          minute: 0,
          second: 0
        };
        props2.columnsType.forEach((col, i) => {
          var _a;
          fullTime[col] = (_a = currentValues.value[i]) != null ? _a : 0;
        });
        const {
          hour,
          minute
        } = fullTime;
        if (props2.minTime) {
          const [minH, minM, minS] = getValidTime(props2.minTime);
          minHour = minH;
          minMinute = +hour <= +minHour ? minM : "00";
          minSecond = +hour <= +minHour && +minute <= +minMinute ? minS : "00";
        }
        if (props2.maxTime) {
          const [maxH, maxM, maxS] = getValidTime(props2.maxTime);
          maxHour = maxH;
          maxMinute = +hour >= +maxHour ? maxM : "59";
          maxSecond = +hour >= +maxHour && +minute >= +maxMinute ? maxS : "59";
        }
      }
      return props2.columnsType.map((type) => {
        const {
          filter,
          formatter
        } = props2;
        switch (type) {
          case "hour":
            return genOptions(+minHour, +maxHour, type, formatter, filter, currentValues.value);
          case "minute":
            return genOptions(+minMinute, +maxMinute, type, formatter, filter, currentValues.value);
          case "second":
            return genOptions(+minSecond, +maxSecond, type, formatter, filter, currentValues.value);
          default:
            if (true) {
              throw new Error(`[Vant] DatePicker: unsupported columns type: ${type}`);
            }
            return [];
        }
      });
    });
    watch49(currentValues, (newValues) => {
      if (!isSameValue(newValues, props2.modelValue)) {
        emit("update:modelValue", newValues);
      }
    });
    watch49(() => props2.modelValue, (newValues) => {
      newValues = formatValueRange(newValues, columns.value);
      if (!isSameValue(newValues, currentValues.value)) {
        currentValues.value = newValues;
      }
    }, {
      immediate: true
    });
    const onChange = (...args) => emit("change", ...args);
    const onCancel = (...args) => emit("cancel", ...args);
    const onConfirm = (...args) => emit("confirm", ...args);
    useExpose({
      confirm,
      getSelectedTime
    });
    return () => _createVNode115(Picker, _mergeProps36({
      "ref": pickerRef,
      "modelValue": currentValues.value,
      "onUpdate:modelValue": ($event) => currentValues.value = $event,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props2, pickerInheritKeys)), slots);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/time-picker/index.mjs
var TimePicker = withInstall(stdin_default115);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tree-select/TreeSelect.mjs
import { createVNode as _createVNode116 } from "vue";
import { defineComponent as defineComponent111 } from "vue";
var [name109, bem104] = createNamespace("tree-select");
var treeSelectProps = {
  max: makeNumericProp(Infinity),
  items: makeArrayProp(),
  height: makeNumericProp(300),
  selectedIcon: makeStringProp("success"),
  mainActiveIndex: makeNumericProp(0),
  activeId: {
    type: [Number, String, Array],
    default: 0
  }
};
var stdin_default116 = defineComponent111({
  name: name109,
  props: treeSelectProps,
  emits: ["clickNav", "clickItem", "update:activeId", "update:mainActiveIndex"],
  setup(props2, {
    emit,
    slots
  }) {
    const isActiveItem = (id) => Array.isArray(props2.activeId) ? props2.activeId.includes(id) : props2.activeId === id;
    const renderSubItem = (item) => {
      const onClick = () => {
        if (item.disabled) {
          return;
        }
        let activeId;
        if (Array.isArray(props2.activeId)) {
          activeId = props2.activeId.slice();
          const index = activeId.indexOf(item.id);
          if (index !== -1) {
            activeId.splice(index, 1);
          } else if (activeId.length < +props2.max) {
            activeId.push(item.id);
          }
        } else {
          activeId = item.id;
        }
        emit("update:activeId", activeId);
        emit("clickItem", item);
      };
      return _createVNode116("div", {
        "key": item.id,
        "class": ["van-ellipsis", bem104("item", {
          active: isActiveItem(item.id),
          disabled: item.disabled
        })],
        "onClick": onClick
      }, [item.text, isActiveItem(item.id) && _createVNode116(Icon, {
        "name": props2.selectedIcon,
        "class": bem104("selected")
      }, null)]);
    };
    const onSidebarChange = (index) => {
      emit("update:mainActiveIndex", index);
    };
    const onClickSidebarItem = (index) => emit("clickNav", index);
    const renderSidebar = () => {
      const Items = props2.items.map((item) => _createVNode116(SidebarItem, {
        "dot": item.dot,
        "badge": item.badge,
        "class": [bem104("nav-item"), item.className],
        "disabled": item.disabled,
        "onClick": onClickSidebarItem
      }, {
        title: () => slots["nav-text"] ? slots["nav-text"](item) : item.text
      }));
      return _createVNode116(Sidebar, {
        "class": bem104("nav"),
        "modelValue": props2.mainActiveIndex,
        "onChange": onSidebarChange
      }, {
        default: () => [Items]
      });
    };
    const renderContent = () => {
      if (slots.content) {
        return slots.content();
      }
      const selected = props2.items[+props2.mainActiveIndex] || {};
      if (selected.children) {
        return selected.children.map(renderSubItem);
      }
    };
    return () => _createVNode116("div", {
      "class": bem104(),
      "style": {
        height: addUnit(props2.height)
      }
    }, [renderSidebar(), _createVNode116("div", {
      "class": bem104("content")
    }, [renderContent()])]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/tree-select/index.mjs
var TreeSelect = withInstall(stdin_default116);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/uploader/Uploader.mjs
import { withDirectives as _withDirectives13, vShow as _vShow12, createVNode as _createVNode118, mergeProps as _mergeProps37 } from "vue";
import { ref as ref65, reactive as reactive19, defineComponent as defineComponent113, onBeforeUnmount as onBeforeUnmount8, nextTick as nextTick27 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/uploader/utils.mjs
var [name110, bem105, t21] = createNamespace("uploader");
function readFileContent(file, resultType) {
  return new Promise((resolve) => {
    if (resultType === "file") {
      resolve();
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    if (resultType === "dataUrl") {
      reader.readAsDataURL(file);
    } else if (resultType === "text") {
      reader.readAsText(file);
    }
  });
}
function isOversize(items, maxSize) {
  return toArray(items).some((item) => {
    if (item.file) {
      if (isFunction(maxSize)) {
        return maxSize(item.file);
      }
      return item.file.size > +maxSize;
    }
    return false;
  });
}
function filterFiles(items, maxSize) {
  const valid = [];
  const invalid = [];
  items.forEach((item) => {
    if (isOversize(item, maxSize)) {
      invalid.push(item);
    } else {
      valid.push(item);
    }
  });
  return { valid, invalid };
}
var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|avif)/i;
var isImageUrl = (url) => IMAGE_REGEXP.test(url);
function isImageFile(item) {
  if (item.isImage) {
    return true;
  }
  if (item.file && item.file.type) {
    return item.file.type.indexOf("image") === 0;
  }
  if (item.url) {
    return isImageUrl(item.url);
  }
  if (typeof item.content === "string") {
    return item.content.indexOf("data:image") === 0;
  }
  return false;
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/uploader/UploaderPreviewItem.mjs
import { createVNode as _createVNode117 } from "vue";
import { defineComponent as defineComponent112 } from "vue";
var stdin_default117 = defineComponent112({
  props: {
    name: numericProp,
    item: makeRequiredProp(Object),
    index: Number,
    imageFit: String,
    lazyLoad: Boolean,
    deletable: Boolean,
    reupload: Boolean,
    previewSize: [Number, String, Array],
    beforeDelete: Function
  },
  emits: ["delete", "preview", "reupload"],
  setup(props2, {
    emit,
    slots
  }) {
    const renderMask = () => {
      const {
        status,
        message
      } = props2.item;
      if (status === "uploading" || status === "failed") {
        const MaskIcon = status === "failed" ? _createVNode117(Icon, {
          "name": "close",
          "class": bem105("mask-icon")
        }, null) : _createVNode117(Loading, {
          "class": bem105("loading")
        }, null);
        const showMessage = isDef(message) && message !== "";
        return _createVNode117("div", {
          "class": bem105("mask")
        }, [MaskIcon, showMessage && _createVNode117("div", {
          "class": bem105("mask-message")
        }, [message])]);
      }
    };
    const onDelete = (event) => {
      const {
        name: name112,
        item,
        index,
        beforeDelete
      } = props2;
      event.stopPropagation();
      callInterceptor(beforeDelete, {
        args: [item, {
          name: name112,
          index
        }],
        done: () => emit("delete")
      });
    };
    const onPreview = () => emit("preview");
    const onReupload = () => emit("reupload");
    const renderDeleteIcon = () => {
      if (props2.deletable && props2.item.status !== "uploading") {
        const slot = slots["preview-delete"];
        return _createVNode117("div", {
          "role": "button",
          "class": bem105("preview-delete", {
            shadow: !slot
          }),
          "tabindex": 0,
          "aria-label": t21("delete"),
          "onClick": onDelete
        }, [slot ? slot() : _createVNode117(Icon, {
          "name": "cross",
          "class": bem105("preview-delete-icon")
        }, null)]);
      }
    };
    const renderCover = () => {
      if (slots["preview-cover"]) {
        const {
          index,
          item
        } = props2;
        return _createVNode117("div", {
          "class": bem105("preview-cover")
        }, [slots["preview-cover"](extend({
          index
        }, item))]);
      }
    };
    const renderPreview = () => {
      const {
        item,
        lazyLoad,
        imageFit,
        previewSize,
        reupload
      } = props2;
      if (isImageFile(item)) {
        return _createVNode117(Image2, {
          "fit": imageFit,
          "src": item.objectUrl || item.content || item.url,
          "class": bem105("preview-image"),
          "width": Array.isArray(previewSize) ? previewSize[0] : previewSize,
          "height": Array.isArray(previewSize) ? previewSize[1] : previewSize,
          "lazyLoad": lazyLoad,
          "onClick": reupload ? onReupload : onPreview
        }, {
          default: renderCover
        });
      }
      return _createVNode117("div", {
        "class": bem105("file"),
        "style": getSizeStyle(props2.previewSize)
      }, [_createVNode117(Icon, {
        "class": bem105("file-icon"),
        "name": "description"
      }, null), _createVNode117("div", {
        "class": [bem105("file-name"), "van-ellipsis"]
      }, [item.file ? item.file.name : item.url]), renderCover()]);
    };
    return () => _createVNode117("div", {
      "class": bem105("preview")
    }, [renderPreview(), renderMask(), renderDeleteIcon()]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/uploader/Uploader.mjs
var uploaderProps = {
  name: makeNumericProp(""),
  accept: makeStringProp("image/*"),
  capture: String,
  multiple: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  lazyLoad: Boolean,
  maxCount: makeNumericProp(Infinity),
  imageFit: makeStringProp("cover"),
  resultType: makeStringProp("dataUrl"),
  uploadIcon: makeStringProp("photograph"),
  uploadText: String,
  deletable: truthProp,
  reupload: Boolean,
  afterRead: Function,
  showUpload: truthProp,
  modelValue: makeArrayProp(),
  beforeRead: Function,
  beforeDelete: Function,
  previewSize: [Number, String, Array],
  previewImage: truthProp,
  previewOptions: Object,
  previewFullImage: truthProp,
  maxSize: {
    type: [Number, String, Function],
    default: Infinity
  }
};
var stdin_default118 = defineComponent113({
  name: name110,
  props: uploaderProps,
  emits: ["delete", "oversize", "clickUpload", "closePreview", "clickPreview", "clickReupload", "update:modelValue"],
  setup(props2, {
    emit,
    slots
  }) {
    const inputRef = ref65();
    const urls = [];
    const reuploadIndex = ref65(-1);
    const isReuploading = ref65(false);
    const getDetail = (index = props2.modelValue.length) => ({
      name: props2.name,
      index
    });
    const resetInput = () => {
      if (inputRef.value) {
        inputRef.value.value = "";
      }
    };
    const onAfterRead = (items) => {
      resetInput();
      if (isOversize(items, props2.maxSize)) {
        if (Array.isArray(items)) {
          const result = filterFiles(items, props2.maxSize);
          items = result.valid;
          emit("oversize", result.invalid, getDetail());
          if (!items.length) {
            return;
          }
        } else {
          emit("oversize", items, getDetail());
          return;
        }
      }
      items = reactive19(items);
      if (reuploadIndex.value > -1) {
        const arr = [...props2.modelValue];
        arr.splice(reuploadIndex.value, 1, items);
        emit("update:modelValue", arr);
        reuploadIndex.value = -1;
      } else {
        emit("update:modelValue", [...props2.modelValue, ...toArray(items)]);
      }
      if (props2.afterRead) {
        props2.afterRead(items, getDetail());
      }
    };
    const readFile = (files) => {
      const {
        maxCount,
        modelValue,
        resultType
      } = props2;
      if (Array.isArray(files)) {
        const remainCount = +maxCount - modelValue.length;
        if (files.length > remainCount) {
          files = files.slice(0, remainCount);
        }
        Promise.all(files.map((file) => readFileContent(file, resultType))).then((contents) => {
          const fileList = files.map((file, index) => {
            const result = {
              file,
              status: "",
              message: "",
              objectUrl: URL.createObjectURL(file)
            };
            if (contents[index]) {
              result.content = contents[index];
            }
            return result;
          });
          onAfterRead(fileList);
        });
      } else {
        readFileContent(files, resultType).then((content) => {
          const result = {
            file: files,
            status: "",
            message: "",
            objectUrl: URL.createObjectURL(files)
          };
          if (content) {
            result.content = content;
          }
          onAfterRead(result);
        });
      }
    };
    const onChange = (event) => {
      const {
        files
      } = event.target;
      if (props2.disabled || !files || !files.length) {
        return;
      }
      const file = files.length === 1 ? files[0] : [].slice.call(files);
      if (props2.beforeRead) {
        const response = props2.beforeRead(file, getDetail());
        if (!response) {
          resetInput();
          return;
        }
        if (isPromise(response)) {
          response.then((data) => {
            if (data) {
              readFile(data);
            } else {
              readFile(file);
            }
          }).catch(resetInput);
          return;
        }
      }
      readFile(file);
    };
    let imagePreview;
    const onClosePreview = () => emit("closePreview");
    const previewImage = (item) => {
      if (props2.previewFullImage) {
        const imageFiles = props2.modelValue.filter(isImageFile);
        const images = imageFiles.map((item2) => {
          if (item2.objectUrl && !item2.url && item2.status !== "failed") {
            item2.url = item2.objectUrl;
            urls.push(item2.url);
          }
          return item2.url;
        }).filter(Boolean);
        imagePreview = showImagePreview(extend({
          images,
          startPosition: imageFiles.indexOf(item),
          onClose: onClosePreview
        }, props2.previewOptions));
      }
    };
    const closeImagePreview = () => {
      if (imagePreview) {
        imagePreview.close();
      }
    };
    const deleteFile = (item, index) => {
      const fileList = props2.modelValue.slice(0);
      fileList.splice(index, 1);
      emit("update:modelValue", fileList);
      emit("delete", item, getDetail(index));
    };
    const reuploadFile = (index) => {
      isReuploading.value = true;
      reuploadIndex.value = index;
      nextTick27(() => chooseFile());
    };
    const onInputClick = () => {
      if (!isReuploading.value) {
        reuploadIndex.value = -1;
      }
      isReuploading.value = false;
    };
    const renderPreviewItem = (item, index) => {
      const needPickData = ["imageFit", "deletable", "reupload", "previewSize", "beforeDelete"];
      const previewData = extend(pick(props2, needPickData), pick(item, needPickData, true));
      return _createVNode118(stdin_default117, _mergeProps37({
        "item": item,
        "index": index,
        "onClick": () => emit(props2.reupload ? "clickReupload" : "clickPreview", item, getDetail(index)),
        "onDelete": () => deleteFile(item, index),
        "onPreview": () => previewImage(item),
        "onReupload": () => reuploadFile(index)
      }, pick(props2, ["name", "lazyLoad"]), previewData), pick(slots, ["preview-cover", "preview-delete"]));
    };
    const renderPreviewList = () => {
      if (props2.previewImage) {
        return props2.modelValue.map(renderPreviewItem);
      }
    };
    const onClickUpload = (event) => emit("clickUpload", event);
    const renderUpload = () => {
      const lessThanMax = props2.modelValue.length < +props2.maxCount;
      const Input = props2.readonly ? null : _createVNode118("input", {
        "ref": inputRef,
        "type": "file",
        "class": bem105("input"),
        "accept": props2.accept,
        "capture": props2.capture,
        "multiple": props2.multiple && reuploadIndex.value === -1,
        "disabled": props2.disabled,
        "onChange": onChange,
        "onClick": onInputClick
      }, null);
      if (slots.default) {
        return _withDirectives13(_createVNode118("div", {
          "class": bem105("input-wrapper"),
          "onClick": onClickUpload
        }, [slots.default(), Input]), [[_vShow12, lessThanMax]]);
      }
      return _withDirectives13(_createVNode118("div", {
        "class": bem105("upload", {
          readonly: props2.readonly
        }),
        "style": getSizeStyle(props2.previewSize),
        "onClick": onClickUpload
      }, [_createVNode118(Icon, {
        "name": props2.uploadIcon,
        "class": bem105("upload-icon")
      }, null), props2.uploadText && _createVNode118("span", {
        "class": bem105("upload-text")
      }, [props2.uploadText]), Input]), [[_vShow12, props2.showUpload && lessThanMax]]);
    };
    const chooseFile = () => {
      if (inputRef.value && !props2.disabled) {
        inputRef.value.click();
      }
    };
    onBeforeUnmount8(() => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    });
    useExpose({
      chooseFile,
      reuploadFile,
      closeImagePreview
    });
    useCustomFieldValue(() => props2.modelValue);
    return () => _createVNode118("div", {
      "class": bem105()
    }, [_createVNode118("div", {
      "class": bem105("wrapper", {
        disabled: props2.disabled
      })
    }, [renderPreviewList(), renderUpload()])]);
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/uploader/index.mjs
var Uploader = withInstall(stdin_default118);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/watermark/Watermark.mjs
import { createVNode as _createVNode119 } from "vue";
import { defineComponent as defineComponent114, nextTick as nextTick28, onUnmounted as onUnmounted4, ref as ref66, watch as watch50, watchEffect as watchEffect6 } from "vue";
var [name111, bem106] = createNamespace("watermark");
var watermarkProps = {
  gapX: makeNumberProp(0),
  gapY: makeNumberProp(0),
  image: String,
  width: makeNumberProp(100),
  height: makeNumberProp(100),
  rotate: makeNumericProp(-22),
  zIndex: numericProp,
  content: String,
  opacity: numericProp,
  fullPage: truthProp,
  textColor: makeStringProp("#dcdee0")
};
var stdin_default119 = defineComponent114({
  name: name111,
  props: watermarkProps,
  setup(props2, {
    slots
  }) {
    const svgElRef = ref66();
    const watermarkUrl = ref66("");
    const imageBase64 = ref66("");
    const renderWatermark = () => {
      const rotateStyle = {
        transformOrigin: "center",
        transform: `rotate(${props2.rotate}deg)`
      };
      const svgInner = () => {
        if (props2.image && !slots.content) {
          return _createVNode119("image", {
            "href": imageBase64.value,
            "xlink:href": imageBase64.value,
            "x": "0",
            "y": "0",
            "width": props2.width,
            "height": props2.height,
            "style": rotateStyle
          }, null);
        }
        return _createVNode119("foreignObject", {
          "x": "0",
          "y": "0",
          "width": props2.width,
          "height": props2.height
        }, [_createVNode119("div", {
          "xmlns": "http://www.w3.org/1999/xhtml",
          "style": rotateStyle
        }, [slots.content ? slots.content() : _createVNode119("span", {
          "style": {
            color: props2.textColor
          }
        }, [props2.content])])]);
      };
      const svgWidth = props2.width + props2.gapX;
      const svgHeight = props2.height + props2.gapY;
      return _createVNode119("svg", {
        "viewBox": `0 0 ${svgWidth} ${svgHeight}`,
        "width": svgWidth,
        "height": svgHeight,
        "xmlns": "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        "style": {
          padding: `0 ${props2.gapX}px ${props2.gapY}px 0`,
          opacity: props2.opacity
        }
      }, [svgInner()]);
    };
    const makeImageToBase64 = (url) => {
      const canvas = document.createElement("canvas");
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.referrerPolicy = "no-referrer";
      image.onload = () => {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx == null ? void 0 : ctx.drawImage(image, 0, 0);
        imageBase64.value = canvas.toDataURL();
      };
      image.src = url;
    };
    const makeSvgToBlobUrl = (svgStr) => {
      const svgBlob = new Blob([svgStr], {
        type: "image/svg+xml"
      });
      return URL.createObjectURL(svgBlob);
    };
    watchEffect6(() => {
      if (props2.image) {
        makeImageToBase64(props2.image);
      }
    });
    watch50(() => [imageBase64.value, props2.content, props2.textColor, props2.height, props2.width, props2.rotate, props2.gapX, props2.gapY], () => {
      nextTick28(() => {
        if (svgElRef.value) {
          if (watermarkUrl.value) {
            URL.revokeObjectURL(watermarkUrl.value);
          }
          watermarkUrl.value = makeSvgToBlobUrl(svgElRef.value.innerHTML);
        }
      });
    }, {
      immediate: true
    });
    onUnmounted4(() => {
      if (watermarkUrl.value) {
        URL.revokeObjectURL(watermarkUrl.value);
      }
    });
    return () => {
      const style = extend({
        backgroundImage: `url(${watermarkUrl.value})`
      }, getZIndexStyle(props2.zIndex));
      return _createVNode119("div", {
        "class": bem106({
          full: props2.fullPage
        }),
        "style": style
      }, [_createVNode119("div", {
        "class": bem106("wrapper"),
        "ref": svgElRef
      }, [renderWatermark()])]);
    };
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/watermark/index.mjs
var Watermark = withInstall(stdin_default119);

// ../../../NottinghamWall/uniapp/node_modules/vant/es/lazyload/vue-lazyload/lazy.mjs
import { nextTick as nextTick29 } from "vue";

// ../../../NottinghamWall/uniapp/node_modules/vant/es/lazyload/vue-lazyload/listener.mjs
var ReactiveListener = class {
  constructor({
    el,
    src,
    error,
    loading,
    bindType,
    $parent,
    options,
    cors,
    elRenderer,
    imageCache
  }) {
    this.el = el;
    this.src = src;
    this.error = error;
    this.loading = loading;
    this.bindType = bindType;
    this.attempt = 0;
    this.cors = cors;
    this.naturalHeight = 0;
    this.naturalWidth = 0;
    this.options = options;
    this.$parent = $parent;
    this.elRenderer = elRenderer;
    this.imageCache = imageCache;
    this.performanceData = {
      loadStart: 0,
      loadEnd: 0
    };
    this.filter();
    this.initState();
    this.render("loading", false);
  }
  /*
   * init listener state
   * @return
   */
  initState() {
    if ("dataset" in this.el) {
      this.el.dataset.src = this.src;
    } else {
      this.el.setAttribute("data-src", this.src);
    }
    this.state = {
      loading: false,
      error: false,
      loaded: false,
      rendered: false
    };
  }
  /*
   * record performance
   * @return
   */
  record(event) {
    this.performanceData[event] = Date.now();
  }
  /*
   * update image listener data
   * @param  {String} image uri
   * @param  {String} loading image uri
   * @param  {String} error image uri
   * @return
   */
  update({ src, loading, error }) {
    const oldSrc = this.src;
    this.src = src;
    this.loading = loading;
    this.error = error;
    this.filter();
    if (oldSrc !== this.src) {
      this.attempt = 0;
      this.initState();
    }
  }
  /*
   *  check el is in view
   * @return {Boolean} el is in view
   */
  checkInView() {
    const rect = useRect(this.el);
    return rect.top < window.innerHeight * this.options.preLoad && rect.bottom > this.options.preLoadTop && rect.left < window.innerWidth * this.options.preLoad && rect.right > 0;
  }
  /*
   * listener filter
   */
  filter() {
    Object.keys(this.options.filter).forEach((key) => {
      this.options.filter[key](this, this.options);
    });
  }
  /*
   * render loading first
   * @params cb:Function
   * @return
   */
  renderLoading(cb) {
    this.state.loading = true;
    loadImageAsync(
      {
        src: this.loading,
        cors: this.cors
      },
      () => {
        this.render("loading", false);
        this.state.loading = false;
        cb();
      },
      () => {
        cb();
        this.state.loading = false;
        if (!this.options.silent)
          console.warn(
            `[@vant/lazyload] load failed with loading image(${this.loading})`
          );
      }
    );
  }
  /*
   * try load image and  render it
   * @return
   */
  load(onFinish = noop) {
    if (this.attempt > this.options.attempt - 1 && this.state.error) {
      if (!this.options.silent) {
        console.log(
          `[@vant/lazyload] ${this.src} tried too more than ${this.options.attempt} times`
        );
      }
      onFinish();
      return;
    }
    if (this.state.rendered && this.state.loaded)
      return;
    if (this.imageCache.has(this.src)) {
      this.state.loaded = true;
      this.render("loaded", true);
      this.state.rendered = true;
      return onFinish();
    }
    this.renderLoading(() => {
      var _a, _b;
      this.attempt++;
      (_b = (_a = this.options.adapter).beforeLoad) == null ? void 0 : _b.call(_a, this, this.options);
      this.record("loadStart");
      loadImageAsync(
        {
          src: this.src,
          cors: this.cors
        },
        (data) => {
          this.naturalHeight = data.naturalHeight;
          this.naturalWidth = data.naturalWidth;
          this.state.loaded = true;
          this.state.error = false;
          this.record("loadEnd");
          this.render("loaded", false);
          this.state.rendered = true;
          this.imageCache.add(this.src);
          onFinish();
        },
        (err) => {
          !this.options.silent && console.error(err);
          this.state.error = true;
          this.state.loaded = false;
          this.render("error", false);
        }
      );
    });
  }
  /*
   * render image
   * @param  {String} state to render // ['loading', 'src', 'error']
   * @param  {String} is form cache
   * @return
   */
  render(state, cache) {
    this.elRenderer(this, state, cache);
  }
  /*
   * output performance data
   * @return {Object} performance data
   */
  performance() {
    let state = "loading";
    let time = 0;
    if (this.state.loaded) {
      state = "loaded";
      time = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1e3;
    }
    if (this.state.error)
      state = "error";
    return {
      src: this.src,
      state,
      time
    };
  }
  /*
   * $destroy
   * @return
   */
  $destroy() {
    this.el = null;
    this.src = null;
    this.error = null;
    this.loading = null;
    this.bindType = null;
    this.attempt = 0;
  }
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/lazyload/vue-lazyload/lazy.mjs
var DEFAULT_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var DEFAULT_EVENTS = [
  "scroll",
  "wheel",
  "mousewheel",
  "resize",
  "animationend",
  "transitionend",
  "touchmove"
];
var DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: "0px",
  threshold: 0
};
function stdin_default120() {
  return class Lazy {
    constructor({
      preLoad,
      error,
      throttleWait,
      preLoadTop,
      dispatchEvent,
      loading,
      attempt,
      silent = true,
      scale,
      listenEvents,
      filter,
      adapter,
      observer,
      observerOptions
    }) {
      this.mode = modeType.event;
      this.listeners = [];
      this.targetIndex = 0;
      this.targets = [];
      this.options = {
        silent,
        dispatchEvent: !!dispatchEvent,
        throttleWait: throttleWait || 200,
        preLoad: preLoad || 1.3,
        preLoadTop: preLoadTop || 0,
        error: error || DEFAULT_URL,
        loading: loading || DEFAULT_URL,
        attempt: attempt || 3,
        scale: scale || getDPR(scale),
        ListenEvents: listenEvents || DEFAULT_EVENTS,
        supportWebp: supportWebp(),
        filter: filter || {},
        adapter: adapter || {},
        observer: !!observer,
        observerOptions: observerOptions || DEFAULT_OBSERVER_OPTIONS
      };
      this.initEvent();
      this.imageCache = new ImageCache({ max: 200 });
      this.lazyLoadHandler = throttle(
        this.lazyLoadHandler.bind(this),
        this.options.throttleWait
      );
      this.setMode(this.options.observer ? modeType.observer : modeType.event);
    }
    /**
     * update config
     * @param  {Object} config params
     * @return
     */
    config(options = {}) {
      Object.assign(this.options, options);
    }
    /**
     * output listener's load performance
     * @return {Array}
     */
    performance() {
      return this.listeners.map((item) => item.performance());
    }
    /*
     * add lazy component to queue
     * @param  {Vue} vm lazy component instance
     * @return
     */
    addLazyBox(vm) {
      this.listeners.push(vm);
      if (inBrowser2) {
        this.addListenerTarget(window);
        this.observer && this.observer.observe(vm.el);
        if (vm.$el && vm.$el.parentNode) {
          this.addListenerTarget(vm.$el.parentNode);
        }
      }
    }
    /*
     * add image listener to queue
     * @param  {DOM} el
     * @param  {object} binding vue directive binding
     * @param  {vnode} vnode vue directive vnode
     * @return
     */
    add(el, binding, vnode) {
      if (this.listeners.some((item) => item.el === el)) {
        this.update(el, binding);
        return nextTick29(this.lazyLoadHandler);
      }
      const value = this.valueFormatter(binding.value);
      let { src } = value;
      nextTick29(() => {
        src = getBestSelectionFromSrcset(el, this.options.scale) || src;
        this.observer && this.observer.observe(el);
        const container = Object.keys(binding.modifiers)[0];
        let $parent;
        if (container) {
          $parent = vnode.context.$refs[container];
          $parent = $parent ? $parent.$el || $parent : document.getElementById(container);
        }
        if (!$parent) {
          $parent = getScrollParent(el);
        }
        const newListener = new ReactiveListener({
          bindType: binding.arg,
          $parent,
          el,
          src,
          loading: value.loading,
          error: value.error,
          cors: value.cors,
          elRenderer: this.elRenderer.bind(this),
          options: this.options,
          imageCache: this.imageCache
        });
        this.listeners.push(newListener);
        if (inBrowser2) {
          this.addListenerTarget(window);
          this.addListenerTarget($parent);
        }
        this.lazyLoadHandler();
        nextTick29(() => this.lazyLoadHandler());
      });
    }
    /**
     * update image src
     * @param  {DOM} el
     * @param  {object} vue directive binding
     * @return
     */
    update(el, binding, vnode) {
      const value = this.valueFormatter(binding.value);
      let { src } = value;
      src = getBestSelectionFromSrcset(el, this.options.scale) || src;
      const exist = this.listeners.find((item) => item.el === el);
      if (!exist) {
        this.add(el, binding, vnode);
      } else {
        exist.update({
          src,
          error: value.error,
          loading: value.loading
        });
      }
      if (this.observer) {
        this.observer.unobserve(el);
        this.observer.observe(el);
      }
      this.lazyLoadHandler();
      nextTick29(() => this.lazyLoadHandler());
    }
    /**
     * remove listener form list
     * @param  {DOM} el
     * @return
     */
    remove(el) {
      if (!el)
        return;
      this.observer && this.observer.unobserve(el);
      const existItem = this.listeners.find((item) => item.el === el);
      if (existItem) {
        this.removeListenerTarget(existItem.$parent);
        this.removeListenerTarget(window);
        remove(this.listeners, existItem);
        existItem.$destroy();
      }
    }
    /*
     * remove lazy components form list
     * @param  {Vue} vm Vue instance
     * @return
     */
    removeComponent(vm) {
      if (!vm)
        return;
      remove(this.listeners, vm);
      this.observer && this.observer.unobserve(vm.el);
      if (vm.$parent && vm.$el.parentNode) {
        this.removeListenerTarget(vm.$el.parentNode);
      }
      this.removeListenerTarget(window);
    }
    setMode(mode) {
      if (!hasIntersectionObserver && mode === modeType.observer) {
        mode = modeType.event;
      }
      this.mode = mode;
      if (mode === modeType.event) {
        if (this.observer) {
          this.listeners.forEach((listener) => {
            this.observer.unobserve(listener.el);
          });
          this.observer = null;
        }
        this.targets.forEach((target) => {
          this.initListen(target.el, true);
        });
      } else {
        this.targets.forEach((target) => {
          this.initListen(target.el, false);
        });
        this.initIntersectionObserver();
      }
    }
    /*
     *** Private functions ***
     */
    /*
     * add listener target
     * @param  {DOM} el listener target
     * @return
     */
    addListenerTarget(el) {
      if (!el)
        return;
      let target = this.targets.find((target2) => target2.el === el);
      if (!target) {
        target = {
          el,
          id: ++this.targetIndex,
          childrenCount: 1,
          listened: true
        };
        this.mode === modeType.event && this.initListen(target.el, true);
        this.targets.push(target);
      } else {
        target.childrenCount++;
      }
      return this.targetIndex;
    }
    /*
     * remove listener target or reduce target childrenCount
     * @param  {DOM} el or window
     * @return
     */
    removeListenerTarget(el) {
      this.targets.forEach((target, index) => {
        if (target.el === el) {
          target.childrenCount--;
          if (!target.childrenCount) {
            this.initListen(target.el, false);
            this.targets.splice(index, 1);
            target = null;
          }
        }
      });
    }
    /*
     * add or remove eventlistener
     * @param  {DOM} el DOM or Window
     * @param  {boolean} start flag
     * @return
     */
    initListen(el, start2) {
      this.options.ListenEvents.forEach(
        (evt) => (start2 ? on : off)(el, evt, this.lazyLoadHandler)
      );
    }
    initEvent() {
      this.Event = {
        listeners: {
          loading: [],
          loaded: [],
          error: []
        }
      };
      this.$on = (event, func) => {
        if (!this.Event.listeners[event])
          this.Event.listeners[event] = [];
        this.Event.listeners[event].push(func);
      };
      this.$once = (event, func) => {
        const on2 = (...args) => {
          this.$off(event, on2);
          func.apply(this, args);
        };
        this.$on(event, on2);
      };
      this.$off = (event, func) => {
        if (!func) {
          if (!this.Event.listeners[event])
            return;
          this.Event.listeners[event].length = 0;
          return;
        }
        remove(this.Event.listeners[event], func);
      };
      this.$emit = (event, context, inCache) => {
        if (!this.Event.listeners[event])
          return;
        this.Event.listeners[event].forEach((func) => func(context, inCache));
      };
    }
    /**
     * find nodes which in viewport and trigger load
     * @return
     */
    lazyLoadHandler() {
      const freeList = [];
      this.listeners.forEach((listener) => {
        if (!listener.el || !listener.el.parentNode) {
          freeList.push(listener);
        }
        const catIn = listener.checkInView();
        if (!catIn)
          return;
        listener.load();
      });
      freeList.forEach((item) => {
        remove(this.listeners, item);
        item.$destroy();
      });
    }
    /**
     * init IntersectionObserver
     * set mode to observer
     * @return
     */
    initIntersectionObserver() {
      if (!hasIntersectionObserver) {
        return;
      }
      this.observer = new IntersectionObserver(
        this.observerHandler.bind(this),
        this.options.observerOptions
      );
      if (this.listeners.length) {
        this.listeners.forEach((listener) => {
          this.observer.observe(listener.el);
        });
      }
    }
    /**
     * init IntersectionObserver
     * @return
     */
    observerHandler(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.listeners.forEach((listener) => {
            if (listener.el === entry.target) {
              if (listener.state.loaded)
                return this.observer.unobserve(listener.el);
              listener.load();
            }
          });
        }
      });
    }
    /**
     * set element attribute with image'url and state
     * @param  {object} lazyload listener object
     * @param  {string} state will be rendered
     * @param  {bool} inCache  is rendered from cache
     * @return
     */
    elRenderer(listener, state, cache) {
      if (!listener.el)
        return;
      const { el, bindType } = listener;
      let src;
      switch (state) {
        case "loading":
          src = listener.loading;
          break;
        case "error":
          src = listener.error;
          break;
        default:
          ({ src } = listener);
          break;
      }
      if (bindType) {
        el.style[bindType] = 'url("' + src + '")';
      } else if (el.getAttribute("src") !== src) {
        el.setAttribute("src", src);
      }
      el.setAttribute("lazy", state);
      this.$emit(state, listener, cache);
      this.options.adapter[state] && this.options.adapter[state](listener, this.options);
      if (this.options.dispatchEvent) {
        const event = new CustomEvent(state, {
          detail: listener
        });
        el.dispatchEvent(event);
      }
    }
    /**
     * generate loading loaded error image url
     * @param {string} image's src
     * @return {object} image's loading, loaded, error url
     */
    valueFormatter(value) {
      let src = value;
      let { loading, error } = this.options;
      if (isObject(value)) {
        if (!value.src && !this.options.silent) {
          console.error("[@vant/lazyload] miss src with " + value);
        }
        ({ src } = value);
        loading = value.loading || this.options.loading;
        error = value.error || this.options.error;
      }
      return {
        src,
        loading,
        error
      };
    }
  };
}

// ../../../NottinghamWall/uniapp/node_modules/vant/es/lazyload/vue-lazyload/lazy-component.mjs
import { h } from "vue";
var stdin_default121 = (lazy) => ({
  props: {
    tag: {
      type: String,
      default: "div"
    }
  },
  emits: ["show"],
  render() {
    return h(
      this.tag,
      this.show && this.$slots.default ? this.$slots.default() : null
    );
  },
  data() {
    return {
      el: null,
      state: {
        loaded: false
      },
      show: false
    };
  },
  mounted() {
    this.el = this.$el;
    lazy.addLazyBox(this);
    lazy.lazyLoadHandler();
  },
  beforeUnmount() {
    lazy.removeComponent(this);
  },
  methods: {
    checkInView() {
      const rect = useRect(this.$el);
      return inBrowser2 && rect.top < window.innerHeight * lazy.options.preLoad && rect.bottom > 0 && rect.left < window.innerWidth * lazy.options.preLoad && rect.right > 0;
    },
    load() {
      this.show = true;
      this.state.loaded = true;
      this.$emit("show", this);
    },
    destroy() {
      return this.$destroy;
    }
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/lazyload/vue-lazyload/lazy-container.mjs
var defaultOptions2 = {
  selector: "img"
};
var LazyContainer = class {
  constructor({ el, binding, vnode, lazy }) {
    this.el = null;
    this.vnode = vnode;
    this.binding = binding;
    this.options = {};
    this.lazy = lazy;
    this.queue = [];
    this.update({ el, binding });
  }
  update({ el, binding }) {
    this.el = el;
    this.options = Object.assign({}, defaultOptions2, binding.value);
    const imgs = this.getImgs();
    imgs.forEach((el2) => {
      this.lazy.add(
        el2,
        Object.assign({}, this.binding, {
          value: {
            src: "dataset" in el2 ? el2.dataset.src : el2.getAttribute("data-src"),
            error: ("dataset" in el2 ? el2.dataset.error : el2.getAttribute("data-error")) || this.options.error,
            loading: ("dataset" in el2 ? el2.dataset.loading : el2.getAttribute("data-loading")) || this.options.loading
          }
        }),
        this.vnode
      );
    });
  }
  getImgs() {
    return Array.from(this.el.querySelectorAll(this.options.selector));
  }
  clear() {
    const imgs = this.getImgs();
    imgs.forEach((el) => this.lazy.remove(el));
    this.vnode = null;
    this.binding = null;
    this.lazy = null;
  }
};
var LazyContainerManager = class {
  constructor({ lazy }) {
    this.lazy = lazy;
    this.queue = [];
  }
  bind(el, binding, vnode) {
    const container = new LazyContainer({
      el,
      binding,
      vnode,
      lazy: this.lazy
    });
    this.queue.push(container);
  }
  update(el, binding, vnode) {
    const container = this.queue.find((item) => item.el === el);
    if (!container)
      return;
    container.update({ el, binding, vnode });
  }
  unbind(el) {
    const container = this.queue.find((item) => item.el === el);
    if (!container)
      return;
    container.clear();
    remove(this.queue, container);
  }
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/lazyload/vue-lazyload/lazy-image.mjs
import { h as h2 } from "vue";
var stdin_default122 = (lazyManager) => ({
  props: {
    src: [String, Object],
    tag: {
      type: String,
      default: "img"
    }
  },
  render() {
    var _a, _b;
    return h2(
      this.tag,
      {
        src: this.renderSrc
      },
      (_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)
    );
  },
  data() {
    return {
      el: null,
      options: {
        src: "",
        error: "",
        loading: "",
        attempt: lazyManager.options.attempt
      },
      state: {
        loaded: false,
        error: false,
        attempt: 0
      },
      renderSrc: ""
    };
  },
  watch: {
    src() {
      this.init();
      lazyManager.addLazyBox(this);
      lazyManager.lazyLoadHandler();
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.el = this.$el;
    lazyManager.addLazyBox(this);
    lazyManager.lazyLoadHandler();
  },
  beforeUnmount() {
    lazyManager.removeComponent(this);
  },
  methods: {
    init() {
      const { src, loading, error } = lazyManager.valueFormatter(this.src);
      this.state.loaded = false;
      this.options.src = src;
      this.options.error = error;
      this.options.loading = loading;
      this.renderSrc = this.options.loading;
    },
    checkInView() {
      const rect = useRect(this.$el);
      return rect.top < window.innerHeight * lazyManager.options.preLoad && rect.bottom > 0 && rect.left < window.innerWidth * lazyManager.options.preLoad && rect.right > 0;
    },
    load(onFinish = noop) {
      if (this.state.attempt > this.options.attempt - 1 && this.state.error) {
        if (!lazyManager.options.silent) {
          console.log(
            `[@vant/lazyload] ${this.options.src} tried too more than ${this.options.attempt} times`
          );
        }
        onFinish();
        return;
      }
      const { src } = this.options;
      loadImageAsync(
        { src },
        ({ src: src2 }) => {
          this.renderSrc = src2;
          this.state.loaded = true;
        },
        () => {
          this.state.attempt++;
          this.renderSrc = this.options.error;
          this.state.error = true;
        }
      );
    }
  }
});

// ../../../NottinghamWall/uniapp/node_modules/vant/es/lazyload/vue-lazyload/index.mjs
var Lazyload = {
  /*
   * install function
   * @param  {App} app
   * @param  {object} options lazyload options
   */
  install(app, options = {}) {
    const LazyClass = stdin_default120();
    const lazy = new LazyClass(options);
    const lazyContainer = new LazyContainerManager({ lazy });
    app.config.globalProperties.$Lazyload = lazy;
    if (options.lazyComponent) {
      app.component("LazyComponent", stdin_default121(lazy));
    }
    if (options.lazyImage) {
      app.component("LazyImage", stdin_default122(lazy));
    }
    app.directive("lazy", {
      beforeMount: lazy.add.bind(lazy),
      updated: lazy.update.bind(lazy),
      unmounted: lazy.remove.bind(lazy)
    });
    app.directive("lazy-container", {
      beforeMount: lazyContainer.bind.bind(lazyContainer),
      updated: lazyContainer.update.bind(lazyContainer),
      unmounted: lazyContainer.unbind.bind(lazyContainer)
    });
  }
};

// ../../../NottinghamWall/uniapp/node_modules/vant/es/index.mjs
var version = "4.9.4";
function install(app) {
  const components = [
    ActionBar,
    ActionBarButton,
    ActionBarIcon,
    ActionSheet,
    AddressEdit,
    AddressList,
    Area,
    BackTop,
    Badge,
    Barrage,
    Button,
    Calendar,
    Card,
    Cascader,
    Cell,
    CellGroup,
    Checkbox,
    CheckboxGroup,
    Circle,
    Col,
    Collapse,
    CollapseItem,
    ConfigProvider,
    ContactCard,
    ContactEdit,
    ContactList,
    CountDown,
    Coupon,
    CouponCell,
    CouponList,
    DatePicker,
    Dialog,
    Divider,
    DropdownItem,
    DropdownMenu,
    Empty,
    Field,
    FloatingBubble,
    FloatingPanel,
    Form,
    Grid,
    GridItem,
    Highlight,
    Icon,
    Image2,
    ImagePreview,
    IndexAnchor,
    IndexBar,
    List,
    Loading,
    Locale,
    NavBar,
    NoticeBar,
    Notify,
    NumberKeyboard,
    Overlay,
    Pagination,
    PasswordInput,
    Picker,
    PickerGroup,
    Popover,
    Popup,
    Progress,
    PullRefresh,
    Radio,
    RadioGroup,
    Rate,
    RollingText,
    Row,
    Search,
    ShareSheet,
    Sidebar,
    SidebarItem,
    Signature,
    Skeleton,
    SkeletonAvatar,
    SkeletonImage,
    SkeletonParagraph,
    SkeletonTitle,
    Slider,
    Space,
    Step,
    Stepper,
    Steps,
    Sticky,
    SubmitBar,
    Swipe,
    SwipeCell,
    SwipeItem,
    Switch,
    Tab,
    Tabbar,
    TabbarItem,
    Tabs,
    Tag,
    TextEllipsis,
    TimePicker,
    Toast,
    TreeSelect,
    Uploader,
    Watermark
  ];
  components.forEach((item) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
var stdin_default123 = {
  install,
  version
};
export {
  ActionBar,
  ActionBarButton,
  ActionBarIcon,
  ActionSheet,
  AddressEdit,
  AddressList,
  Area,
  BackTop,
  Badge,
  Barrage,
  Button,
  Calendar,
  Card,
  Cascader,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Circle,
  Col,
  Collapse,
  CollapseItem,
  ConfigProvider,
  ContactCard,
  ContactEdit,
  ContactList,
  CountDown,
  Coupon,
  CouponCell,
  CouponList,
  DEFAULT_ROW_WIDTH,
  DatePicker,
  Dialog,
  Divider,
  DropdownItem,
  DropdownMenu,
  Empty,
  Field,
  FloatingBubble,
  FloatingPanel,
  Form,
  Grid,
  GridItem,
  Highlight,
  Icon,
  Image2 as Image,
  ImagePreview,
  IndexAnchor,
  IndexBar,
  Lazyload,
  List,
  Loading,
  Locale,
  NavBar,
  NoticeBar,
  Notify,
  NumberKeyboard,
  Overlay,
  Pagination,
  PasswordInput,
  Picker,
  PickerGroup,
  Popover,
  Popup,
  Progress,
  PullRefresh,
  Radio,
  RadioGroup,
  Rate,
  RollingText,
  Row,
  Search,
  ShareSheet,
  Sidebar,
  SidebarItem,
  Signature,
  Skeleton,
  SkeletonAvatar,
  SkeletonImage,
  SkeletonParagraph,
  SkeletonTitle,
  Slider,
  Space,
  Step,
  Stepper,
  Steps,
  Sticky,
  SubmitBar,
  Swipe,
  SwipeCell,
  SwipeItem,
  Switch,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  Tag,
  TextEllipsis,
  TimePicker,
  Toast,
  TreeSelect,
  Uploader,
  Watermark,
  actionBarButtonProps,
  actionBarIconProps,
  actionBarProps,
  actionSheetProps,
  addressEditProps,
  addressListProps,
  allowMultipleToast,
  areaProps,
  backTopProps,
  badgeProps,
  barrageProps,
  buttonProps,
  calendarProps,
  cardProps,
  cascaderProps,
  cellGroupProps,
  cellProps,
  checkboxGroupProps,
  checkboxProps,
  circleProps,
  closeDialog,
  closeNotify,
  closeToast,
  colProps,
  collapseItemProps,
  collapseProps,
  configProviderProps,
  contactCardProps,
  contactEditProps,
  contactListProps,
  countDownProps,
  couponCellProps,
  couponListProps,
  datePickerProps,
  stdin_default123 as default,
  dialogProps,
  dividerProps,
  dropdownItemProps,
  dropdownMenuProps,
  emptyProps,
  fieldProps,
  floatingBubbleProps,
  floatingPanelProps,
  formProps,
  gridItemProps,
  gridProps,
  highlightProps,
  iconProps,
  imagePreviewProps,
  imageProps,
  indexAnchorProps,
  indexBarProps,
  install,
  listProps,
  loadingProps,
  navBarProps,
  noticeBarProps,
  notifyProps,
  numberKeyboardProps,
  overlayProps,
  paginationProps,
  passwordInputProps,
  pickerGroupProps,
  pickerProps,
  popoverProps,
  popupProps,
  progressProps,
  pullRefreshProps,
  radioGroupProps,
  radioProps,
  rateProps,
  resetDialogDefaultOptions,
  resetNotifyDefaultOptions,
  resetToastDefaultOptions,
  rollingTextProps,
  rowProps,
  searchProps,
  setDialogDefaultOptions,
  setNotifyDefaultOptions,
  setToastDefaultOptions,
  shareSheetProps,
  showConfirmDialog,
  showDialog,
  showFailToast,
  showImagePreview,
  showLoadingToast,
  showNotify,
  showSuccessToast,
  showToast,
  sidebarItemProps,
  sidebarProps,
  skeletonAvatarProps,
  skeletonImageProps,
  skeletonParagraphProps,
  skeletonProps,
  skeletonTitleProps,
  sliderProps,
  spaceProps,
  stepperProps,
  stepsProps,
  stickyProps,
  submitBarProps,
  swipeCellProps,
  swipeProps,
  switchProps,
  tabProps,
  tabbarItemProps,
  tabbarProps,
  tabsProps,
  tagProps,
  textEllipsisProps,
  timePickerProps,
  toastProps,
  treeSelectProps,
  uploaderProps,
  useCurrentLang,
  version,
  watermarkProps
};
//# sourceMappingURL=vant.js.map

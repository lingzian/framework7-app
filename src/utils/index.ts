import animateScrollTo from 'animated-scroll-to';
import { f7 } from 'framework7-react';


export const isLink = (str: string) => {
  //以http/https开头并且文本不存在中文
  if((/^(http|https):\/\/([\w.]+\/?)\S*/.test(str))&&!(/.*[\u4e00-\u9fa5]+.*$/.test(str))){
    return true;
  }else{
    return false;
  }

};
export const loadScript = async (url: string) => {
  return new Promise((resolve) => {
    const hm = document.createElement('script');
    hm.src = url;
    hm.onload = resolve;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode!.insertBefore(hm, s);
  });
};


export const wait = (ttl = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ttl);
  });
};
export const waitForReLaunch = (limit = true, min = 3000) => {
  return new Promise((resolve, reject) => {
    const startTime = new Date().getTime();
    const eventName = 'visibilitychange';
    const handle = () => {
      if (document.visibilityState === 'visible') {
        window.removeEventListener(eventName, handle);
        const finishTime = new Date().getTime();
        if (limit && finishTime - startTime < min) {
          return reject();
        }
        resolve();
      }
    };
    window.addEventListener(eventName, handle);
  });
};

export const initFontSize = (baseFontSize?: number) => {
  const _baseFontSize = baseFontSize || 12;
  const ua = navigator.userAgent;
  // const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  // const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  // let dpr = window.devicePixelRatio || 1;
  // if (!isIos && !(matches && Number(matches[1]) > 534)) {
  //   // 如果非iOS, 非Android4.3以上, dpr设为1;
  //   dpr = 1;
  // }
  // const scale = 1 / dpr;
  // let metaEl = document.querySelector('meta[name="viewport"]');
  // if (!metaEl) {
  //   metaEl = document.createElement('meta');
  //   metaEl.setAttribute('name', 'viewport');
  //   window.document.head.appendChild(metaEl);
  // }
  // metaEl.setAttribute(
  //   'content',
  //   'width=device-width,user-scalable=no,initial-scale=' +
  //     scale +
  //     ',maximum-scale=' +
  //     scale +
  //     ',minimum-scale=' +
  //     scale,
  // );

  document.documentElement.style.fontSize =
    document.documentElement.clientWidth / (320 / _baseFontSize) + 'px';
};



// 强制保留2位小数，如：2，会在2后面补上00.即2.00
export const toDecimal2 = (x) => {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
};


// menu滑动运动
export const scrollMenu = (menuId: string) => {
  setTimeout((): any => {
    const menuBox: HTMLElement = document.getElementById(menuId) as HTMLElement;
    if (!menuBox) return false;
    const activeNode = menuBox.getElementsByClassName('tab-link-active')[0];
    const windowWidth = document.body.clientWidth;
    const activeWidth = activeNode.offsetWidth;
    const activeNode_p = activeNode.offsetLeft;
    const activeNode_maxP = activeNode_p + activeNode.offsetWidth;
    let distent = 0;
    if (activeNode_p > windowWidth / 2)
      distent = activeNode_maxP - windowWidth / 2 - activeWidth / 2;
    animateScrollTo([distent, null], {
      elementToScroll: menuBox.getElementsByClassName('toolbar-inner')[0],
    });
  }, 100);
};

// 销毁弹窗
export const destoryPopup = () => {
  if (document.getElementsByClassName('tentADvoide')[0]) return;
  if (document.getElementsByClassName('mouseGameCountDown')[0]) return;
  if (document.getElementsByClassName('sethint')[0]) return;

  if (document.querySelectorAll('[id^="am-modal-container"]').length) {
    const popup = document.querySelectorAll('[id^="am-modal-container"]')[0];
    const popupMounteEL = f7.$(popup).prev()[0];
    // popupMounteEL && ReactDOM.unmountComponentAtNode(popupMounteEL);
    if (popupMounteEL && popupMounteEL.parentNode) {
      popupMounteEL.parentNode.removeChild(popupMounteEL);
    }
    if (popup && popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
  }
};


//获取url参数
export const getQueryVariable = (variable: any) => {
  if (window.location.href.includes('?')) {
    let query = window.location.href.split('?')[1];
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=');
      if (pair[0] == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    return false;
  } else {
    return false;
  }
};
//获取getQueryAuthorization
export const getQueryAuthorization= (variable: any) => {
  if (window.location.href.includes('?')) {
    let query = window.location.href.split('?')[1];
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=');
      if (pair[0] == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    return '';
  } else {
    return '';
  }
};

// import { EventEmitter } from 'events';
// window.Events = new EventEmitter();
export interface EventsType {
  emit: (
    eventName: string,
    options?: { bubbles?: boolean; cancelable?: boolean; composed?: boolean },
    el?: HTMLElement | (Window & typeof globalThis),
  ) => void;
  on: (
    eventName: string,
    callback: EventListener,
    el?: HTMLElement | (Window & typeof globalThis),
  ) => void;
  once: (
    eventName: string,
    callback: EventListener,
    el?: HTMLElement | (Window & typeof globalThis),
  ) => void;
  off: (
    eventName: string,
    callback: EventListener,
    el?: HTMLElement | (Window & typeof globalThis),
  ) => void;
  after: (eventName: string) => Promise<unknown>;
}
window.Events = {
  emit: (
    eventName: string,
    options: {
      bubbles?: boolean;
      cancelable?: boolean;
      composed?: boolean;
    } = {},
    el: HTMLElement | (Window & typeof globalThis) = window,
  ) => el.dispatchEvent(new Event(eventName, options)),
  on: (
    eventName: string,
    callback: EventListener,
    el: HTMLElement | (Window & typeof globalThis) = window,
  ) => el.addEventListener(eventName, callback),
  once: (
    eventName: string,
    callback: EventListener,
    el: HTMLElement | (Window & typeof globalThis) = window,
  ) => {
    const cbFn = (e: any) => {
      callback(e);
      el.removeEventListener(eventName, cbFn);
    };
    el.addEventListener(eventName, cbFn);
  },
  off: (
    eventName: string,
    callback: EventListener,
    el: HTMLElement | (Window & typeof globalThis) = window,
  ) => el.removeEventListener(eventName, callback),
  after: (eventName: string) =>
    new Promise((resolve) => window.Events.once(eventName, resolve)),
};
export const init = () => {
  // window.plus?.globalEvent.addEventListener('pause', function(){
  //   console.log('uniapp plus h5+ 监听pause')
  // });
  if(window.plus){
    document.addEventListener("pause", ()=>{ //从前台切换到后台
      console.log('pause');
      window.Events.emit('pause');
    }, false);
    document.addEventListener("resume", ()=>{ //从后台切换到前台
      console.log('onresume');
      window.Events.emit('resume');
    }, false);
  }

  if(isCordova()){
    document.addEventListener("pause", ()=>{ //从前台切换到后台
      console.log('pause');
      window.Events.emit('pause');
    }, false);
    document.addEventListener("resume", ()=>{ //从后台切换到前台
      console.log('onresume');
      window.Events.emit('resume');
    }, false);
  }
  
  // TODO 判断web下的事件监听
  if (window.api) {
    window.api.addEventListener(
      {
        name: 'appintent',
      },
      (ret: any, err: any) => {
        console.log('appintent', ret, err);
      },
    );
    window.api.addEventListener(
      {
        name: 'viewappear',
      },
      (ret: any, err: any) => {
        console.log('viewappear', ret, err);
      },
    );
    window.api.addEventListener(
      {
        name: 'viewdisappear',
      },
      (ret: any, err: any) => {
        console.log('viewdisappear', JSON.stringify(ret), err);
      },
    );
    window.api.addEventListener(
      {
        name: 'appidle',
        extra: {
          timeout: 30, //设置经过多长时间不操作屏幕时触发，单位秒，数字类型
        },
      },
      (ret: any, err: any) => {
        console.log('appidle', ret, err);
      },
    );
    window.api.addEventListener(
      {
        name: 'pause',
      },
      (ret: any, err: any) => {
        console.log('pause');
        window.Events.emit('pause');
      },
    );
    
    window.api.addEventListener(
      {
        name: 'resume',
      },
      (ret: any, err: any) => {
        console.log('onresume');
        window.Events.emit('resume');
      },
    );
    window.api.addEventListener(
      {
        name: 'noticeclicked',
      },
      (ret: any, err: any) => {
        console.log('noticeclicked');
        window.Events.emit('noticeclicked');
      },
    );
    window.api.addEventListener(
      {
        name: 'keyback',
      },
      (ret: any, err: any) => {
        console.log('keyback');
        window.Events.emit('keyback', { bubbles: true }, window.document.body);
      },
    );
  }
};

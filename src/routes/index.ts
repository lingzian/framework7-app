import { Router } from 'framework7/types/modules/router/router';
import { f7 } from 'framework7-react';

// 注册页面路由
export default [
  '/home',
  '/user',
  // '/activity/rules/[id]',   [id].tsx  如果页面需要带参
  '(.*)',
].flatMap(
  (path): Router.RouteParameters => ({
    path: path
      .split('/')
      .map((p) => p.replace(/^\[(.+?)\]/, ':$1')) // 把 [id] => :id
      .join('/'), // 生成动态路由
      async: async ({ app, to, from, resolve, reject, router, direction }) => {
        // 进入页面前
        try {
          f7.preloader.show();
          const { default: page, beforeLoad } = await import(
            '@/pages' + path
          ).catch(async (e) => {
            if (e?.message && /^Loading[\s\S]*failed\.[\s\S]*/.test(e.message)) {
              f7.toast.show({
                text: '网络异常请稍后重试',
                position: 'center',
              });
              throw e;
            }
            // 跳到404页面
            return await import('@/pages/404');
          });
          beforeLoad && (await beforeLoad());
          f7.preloader.hide();
          resolve({
            component: page,
            context: to.params,
          });
        } catch (error) {
          console.log(`路由${path}加载失败`, error);
          f7.preloader.hide();
          reject(error);
        }
      },
  }),
);
// 注册需要登录的页面,在跳转时拦截
export const authRequire = [
  // '/user/bind',
];
export const history = {
  /**
   * 在当前view上刷新
   *
   */
  replace(url: string, options?: Router.RouteOptions) {
    if (!options) options = {};
    options.reloadCurrent = true;
    window.history.replaceState({}, '', '#' + url);
    f7.views.current.router.navigate(url, options);
  },
  /**
   * 在当前view上前进
   *
   * @param {string} url
   * @param {Router.RouteOptions} [options]
   */
  push(url: string, options?: Router.RouteOptions) {
    window.history.pushState({}, '', '#' + url);
    f7.views.current.router.navigate(url, options);
  },
  /**
   * 在当前view上后退
   *
   */
  goBack() {
    const iosGoBackAnimate = true;
    // const iosGoBackAnimate =
    //   getState().global.platform.isWeapp &&
    //   getState().global.platform.isIos
    //     ? false
    //     : true;
    f7.views.current.router.back('', { animate: iosGoBackAnimate });
  },
};
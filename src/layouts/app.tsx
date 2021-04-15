import React, { useState, useEffect } from "react";

import { f7, f7ready, App } from "framework7-react";
import { Framework7Parameters } from 'framework7/types';

import routes, { authRequire, history } from "../routes";
import View from './views'

const MyApp = () => {

  // Framework7 Parameters
  const f7params: Framework7Parameters = {
    name: "f7-test",
    theme: "auto",

    // App store
    // store: store,
    routes: routes,
    view: {
      // 如果为true，导航链中的所有先前页面都不会从DOM中删除。
      stackPages: true,
      routesBeforeEnter({to, from, resolve, reject}) {
        let needAuth = false;
        authRequire.forEach((path) => {
          to.path.includes(path) && (needAuth = true);
        });
        resolve();
        setTimeout(() => {
          f7.lazy.create('.view.tab-active .page-current');
        }, 500);
      },
      routesBeforeLeave({to, from, resolve}) {
        console.log('routesBeforeLeave', from.path);
        resolve();
      },
      // transition: 'f7-dive',
    },
    lazy: {
      placeholder:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2P49evXfwAJzgPuMtDh2wAAAABJRU5ErkJggg==',
    },
    toast: {
      closeTimeout: 3000,
    },
    touch: {
      // fastClicks: true,
      iosTouchRipple: true,
    },
  };

  f7ready(() => {
    // Call F7 APIs here
  });

  return (
    <App {...f7params}>
      <View></View>
    </App>
  );
};
export default MyApp;

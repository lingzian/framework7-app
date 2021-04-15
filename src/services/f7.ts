import animateScrollTo from 'animated-scroll-to';
import { View } from 'framework7/types';
import { f7 } from 'framework7-react';

export const reloadLazy = () => {
  setTimeout(() => {
    f7.lazy.create('.view.tab-active .page-current');
  }, 500);
};
export const resetPageScroll = (distance: number = 0) => {
  animateScrollTo(distance, {
    elementToScroll: f7.$(
      '.view.tab-active .page-current .page-content',
    )[0],
  });
  // window.f7
  //   ?.$('.view.tab-active .page-current .page-content')[0]
  //   .scrollTo(0, 0);
};
export const goHome = () => {
  const event = new Event('goHome');
  document.dispatchEvent(event);
};
export const isCurrentView = (view: View.View) => {
  return f7.views.current.name === view.name;
};
export const switchView = (name: string) => {
  f7.$(`a[data-tab="#view-${name}"]`).click();
  showToolbar();
  reloadLazy();
};
export const showToolbar = () => {
  f7.toolbar.show('#mainToolbar');
};
export const hideToolbar = () => {
  f7.toolbar.hide('#mainToolbar');
};

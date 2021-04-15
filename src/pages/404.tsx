import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';

export default () => (
  <Page noToolbar>
    <Navbar title="页面不存在" backLink />
    <Block strong>
      <p>对不起</p>
      <p>您所拨打的页面不存在</p>
    </Block>
  </Page>
);

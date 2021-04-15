import React, { useState, useEffect } from "react";
import { f7, Views, View, Toolbar, Link } from "framework7-react";
import "./view.less";
// import useViewModel from '../models/view';
// import useVersionModel from '@/models/version';
// import moment from 'moment';
import { history } from "@/routes/index";
import { hideToolbar } from "@/services/f7";
import { wait } from "@/utils";
export default () => {
  const [views, setViews] = useState([
    {
      path: "/home",
      name: "首页",
      active: true,
      imgName: "weather",
      tabbarIcon: "icon-find",
    },
    {
      path: "/user",
      name: "我的",
      tabbarIcon: "icon-user",
      imgName: "user",
      active: false,
    },
  ]);


  const initViews = () => {
    // 初始化打开的view
    let activeHash = "/" + location.hash.split("/")[1], // 192/.168.2.168/#/home/detail   (#/home/detail)
      // 初始化打开view里面的子页面
      initialPage = "";
    //如果没有指定页面就默认首页
    console.log("默认首页", activeHash);
    if (views.filter((item) => item.path === activeHash).length) {
      // 默认首页
      activeHash = "/home";
    }
    if (
      location.hash.split("/")[2] ||
      !views.filter((item) => item.path === activeHash).length
    ) {
      initialPage = location.hash.split("#")[1];
    }
    window.Events.once("loaded", async () => {
      await wait(100);
      if (initialPage) {
        history.push(initialPage);
        await window.Events.after("page:afterin");
        hideToolbar();
      }
      await wait(500);
      document.getElementById("init_loading")?.remove();
    });
    // 防止没有view被初始化时报错
    if (!views.filter((item) => item.active)[0]) {
      views[0].active = true;
    }

    setViews((v) =>
      v.flatMap((item) => ({
        ...item,
        active: item.path === activeHash,
      }))
    );

    let initialPageCount = 0;
    window.Events.on("page:afterin", () => {
      initialPageCount++;
      if (initialPageCount === views.length) {
        window.Events.emit("loaded");
      }
    });
  };

  return (
    <Views tabs className="safe-areas">
      <Toolbar id="mainToolbar" tabbar labels bottom>
        {views.map((item) => (
          <Link
            key={item.path}
            tabLink={`#view-${item.name}`}
            // icon={item.tabbarIcon}
            // text={item.name}
            tabLinkActive={item.active}
            className="justify-content-space-evenly"
          >
            <div className={`toolbar-img-container ${item.imgName}`}>
              {item.imgName === "activity" && (
                <div
                  className={`toolbar-img-container activity-container`}
                ></div>
              )}
            </div>
            <p className="tabbar-label">{item.name}</p>
          </Link>
        ))}
      </Toolbar>

      {views.map((item) => (
        <View
          onTabShow={(index) => {
            setTimeout(() => {
              f7.lazy.create(".view.tab-active .page-current");
            }, 500);
          }}
          name={item.name}
          key={item.path}
          id={`view-${item.name}`}
          main={item.active}
          url={`${item.path}`}
          tab
          tabActive={item.active}
        />
      ))}
    </Views>
  );
};

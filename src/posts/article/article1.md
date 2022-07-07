---
title: 主题新增心知天气插件
date: 2022-04-15 19:48:07
tags: [hexo, 魔改]
description: 主题新增心知天气插件方法
category: [hexo]
keywords:
cover:
index_img:
---

# 主题新增心知天气插件

本人采用的主题为fulid主题，其他主题建议参照官方文档进行修改

首先要去心知天气的官网，获取插件代码，具体方式可以参见[获取插件代码 | 心知天气文档 (seniverse.com)](https://docs.seniverse.com/widget/start/get.html)。

我选择添加天气信息的位置为导航处，找到主题的`navigation.ejs`文件，具体文件位置为

```
├─blog
   └─themes
       └─fluid
         └─layout
             └─_partials
                  └─header
					  └─navigation.ejs
```

在文件的适当位置添加代码，我选择在`title`的右侧添加，具体位置为

{% asset_img 1.png '"具体添加代码位置" "alt text"' %}

插件代码如下

```html
  <div class="weather">
  <!-- 《添加“心知天气”-->
    <div id="tp-weather-widget"></div>
  <script>
    (function(a,h,g,f,e,d,c,b){b=function(){d=h.createElement(g);c=h.getElementsByTagName(g)[0];d.src=e;d.charset="utf-8";d.async=1;c.parentNode.insertBefore(d,c)};a["SeniverseWeatherWidgetObject"]=f;a[f]||(a[f]=function(){(a[f].q=a[f].q||[]).push(arguments)});a[f].l=+new Date();if(a.attachEvent){a.attachEvent("onload",b)}else{a.addEventListener("load",b,false)}}(window,document,"script","SeniverseWeatherWidget","//cdn.sencdn.com/widget2/static/js/bundle.js?t="+parseInt((new Date().getTime() / 100000000).toString(),10)));
    window.SeniverseWeatherWidget('show', {
      flavor: "slim",
      location: "WX4FBXXFKE4F",
      geolocation: true,
      language: "zh-Hans",
      unit: "c",
      theme: "auto",
      token: "efb760e3-5326-4f08-839b-122738249a17",
      hover: "enabled",
      container: "tp-weather-widget"
    })
  </script>
  <!-- 添加“心知天气”》-->
  </div>

```

如果你希望控制天气是否显示，则代码为

```html
    <div class="weather">
      <!-- 添加心知天气-->
      <% if (theme.xinzhi_weather) {%>
      <div id="tp-weather-widget"></div>
      <script>
        (function (a, h, g, f, e, d, c, b) { b = function () { d = h.createElement(g); c = h.getElementsByTagName(g)[0]; d.src = e; d.charset = "utf-8"; d.async = 1; c.parentNode.insertBefore(d, c) }; a["SeniverseWeatherWidgetObject"] = f; a[f] || (a[f] = function () { (a[f].q = a[f].q || []).push(arguments) }); a[f].l = +new Date(); if (a.attachEvent) { a.attachEvent("onload", b) } else { a.addEventListener("load", b, false) } }(window, document, "script", "SeniverseWeatherWidget", "//cdn.sencdn.com/widget2/static/js/bundle.js?t=" + parseInt((new Date().getTime() / 100000000).toString(), 10)));
        window.SeniverseWeatherWidget('show', {
          flavor: "slim",
          location: "WX4FBXXFKE4F",
          geolocation: true,
          language: "zh-Hans",
          unit: "c",
          theme: "auto",
          token: "efb760e3-5326-4f08-839b-122738249a17",
          hover: "enabled",
          container: "tp-weather-widget"
        })
      </script>
      <% } %>
    </div>
```

新增了一个if条件语句。同时也要在`主题配置文件中`，添加如下配置：

```yml
# 心知天气插件配置
xinzhi_weather: true
```

修改展示样式文件路径：

```
├─blog
   └─themes
       └─fluid
         └─source
             └─css
                └─_pages
					 └─_base
					     └─_widget
					          └─header.styl
```

代码示例

```css
.sw-typography{
  color: var(--navbar-text-color) !important;
}
```


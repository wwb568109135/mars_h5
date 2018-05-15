# mars_h5

    # 无痕埋点h5的简单demo的使用-v1

    ## 步骤 1

    页面上先引入jquery的类库

    ## 步骤 2

    工程项目上再引入mars_h5.js 或者调用的时候接入类库的cdn地址既可：http://you-cdn-url.com/html/js/mars_h5.js?t=1521186655083


    ## 步骤 3

    在html的闭合标签下面，接入下面的js代码即可：


    ```javascript
      var hxs_config_maq = hxs_config_maq || [];  

      hxs_config_maq.push([ 'page_mars_sign_'+( (new Date()).getTime() ), 'JsonString-uuid' ]);
      
      (function () {  
        var ma = document.createElement('script');  
        ma.type = 'text/javascript';  
        ma.id = "hxs_config_maq"
        ma.async = true;  
        ma.src = "/html/js/mars_h5.js?"+( (new Date()).getTime() );  
        var s = document.getElementsByTagName('script')[0];  
        s.parentNode.insertBefore(ma, s);  
      })(); 
    ```

    ## 步骤 4

    * 如果接入的系统是前端开发js类库是SPA框架的话，注意在页面路由离开的时候
        *  删除window对象的hxs_config_maq
        *  删除mars_h5.js文件的dmo上id＝hxs_config_maq


    * hxs_config_maq 是配置当前页面的初始化埋点数据的自定义变量字段


    ##有问题反馈
    在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

    ## h5无痕埋点原理

    h5无痕埋点原理是：在Dom页面（文档对象模型） 已经加载完毕之后，利用js动态构造img标签，指定src 为访问统计服务器的地址，带上业务组装构造的参数, img  标签向统计程序发出请求,实现统计的原理。

    （1）对于页面型的埋点：
    在页面加载完毕的时候，且利用js动态构造img标签，来发送一次通用或个性化定制的数据，发送请求到统计服务器端。

    （2）对于事件型的埋点：
    在页面加载完毕的时候，利用jquery库，全局动态绑定约定的html标签，目前只是开发了a和button的标签的自动绑定绑定的处理，对于其他标签如果配置了mars_sign自定义属性键值，埋点程序也识别出来，且利用js动态构造img标签，来发送定制的数据请求到统计服务器端，实现数据统计。

    ## H5端实现埋点的方案：

    （1）优先兼容app 好享瘦的埋点业务

    （2）支持页面进入之后的，页面个性定制字段的埋点处理

    （3）支持处理业务上任何a标签和button的标签默认埋点的处理

    （4）支持任何标签上含有属性 mars_sign 标签 默认埋点的处理

    （5）内嵌到业务代码里JsApi函数  Mar.Request.diySeed(埋点字段对象) 调用的埋点





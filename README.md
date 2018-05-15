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

    * wiki的文档待完善


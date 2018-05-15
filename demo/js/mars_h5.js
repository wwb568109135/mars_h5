
(function () {  


  if(!window.Mar){
    window.Mar = function () {};
    // 全局配置对象
    __marConfig = {
      // 初始化定义的字段处理
      signPrefix:"pages_init_",

      // 埋点请求的mars服务器地址
      seedImgSrc:"https://mars.hxsapp.com/h5",

      // 埋点基础字段
      baseMars:null,

      // 埋点基础字段的初始化方法
      baseMarsInit:function(){
        var __this = this;
        
        var platform_str = "";

        if(Mar.Util.isPc){
          platform_str = "PC"
        }else if(Mar.Util.isWeiXin){
          platform_str = "WeiXin"
        }else if(Mar.Util.isQQBrowser){
          platform_str = "QQBrowser"
        }else if(Mar.Util.isWeiBo){
          platform_str = "WeiBo"
        }else{
          platform_str = "Other"
        }

        __this.baseMars = {
          ua_info:navigator.userAgent,
          platform: "HxsApp",
          platform_type:"H5_" + platform_str,
          statistical_type : "page",
          notrace:1,//运维要求
          client_system : Mar.Util.client_system(),
          system_resolution : Mar.Util.system_resolution(),
          channel_number: Mar.Util.hxsAppMarConfig.channel_number(),
          version_number: Mar.Util.hxsAppMarConfig.version_number(),
          user_id: Mar.Util.hxsAppMarConfig.user_id(),
          conversation_id : Mar.Util.conversation_id(),
          open_time : Mar.Util.getNowFormatDate()
        }

      },
      // 绑定事情的html标签名
      htmlTagName:[
        "a",
        "button",
        "div",
        "span",
        "p",
        "em",
        "i",
        "b",
        "strong",
        "ul",
        "li",
        "ol",
        "dd",
        "dt",
        "dl",
        "table",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "input",
        "textarea",
        "video",
        "audio",
        "canvas",
        "article",
        "aside",
        "bdi",
        "details",
        "dialog",
        "figcaption",
        "figure",
        "footer",
        "header",
        "main",
        "mark",
        "menuitem",
        "meter",
        "nav",
        "progress",
        "rp",
        "rt",
        "ruby",
        "section",
        "summary",
        "time",
        "wbr"
      ]
    }
    
    // 工具函数对象
    Mar.Util = {
      // 是否在好享瘦App里，判断userAgent里面的版本号
      isHxsApp:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.indexOf("hxsapp-version-") >= 0){
          return true;
        }else{
          return false;
        }
      },
      // 解析好享瘦app 的userAgent数据结构
      getHxsAppUaParam:function(key){
        var p = window.navigator.userAgent;
        var v = '';
        p = p.split('&');
        p.map(function(item){
            var temp = item.split('-');
            if( temp[0] == key ){
                if (temp.length > 2) {
                    for (var i in temp) {
                        if (i > 0) {
                            if (i > 1) {
                                v += ('-' + temp[i]);
                            }else{
                                v += temp[i];
                            }
                        }
                    }
                }else{
                    v = temp[1];
                }
            }
        });
        return v;
      },

      // 获取Url上的参数
      getUrlParam:function (key){
          var p = window.location.href.split('?'),
              v = '';
          if (p.length < 2) {
            return false;
          }

          p = p[1].split('&');
          p.map(function(item){
            var temp = item.split('=');
            if( temp[0] == key ){
              if (temp.length > 2) {
                for (var i in temp) {
                  if (i > 0) {
                    if (i > 1) {
                      v += ('=' + temp[i]);
                    }else{
                      v += temp[i];
                    }
                  }
                }
              }else{
                v = temp[1];
              }
            }
          });
          return v;
      },

      // 好享瘦App的埋点数据的获取配置对象
      hxsAppMarConfig:{
        channel_number:function(){
          if (Mar.Util.isHxsApp) {
            return Mar.Util.getHxsAppUaParam("channel_number")
          }else{
            return ""
          }
        },
        version_number:function(){
          if (Mar.Util.isHxsApp) {
            return Mar.Util.getHxsAppUaParam("version_number")
          }else{
            return ""
          }
        },
        user_id:function(){
          if (Mar.Util.isHxsApp) {
            return Mar.Util.getHxsAppUaParam("user_id")
          }else{
            return ""
          }
        }
        
      },
      // 获取当前日期的格式函数。输出格式  2018-01-11 10:30:50
      getNowFormatDate:function(){
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
      },

      // 是否在微博里
      isWeiBo:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/WeiBo/i) == 'weibo'){
          return true;
        }else{
          return false;
        }
      },

      // 是否在qq浏览器里
      isQQBrowser:function(){
        var ua = window.navigator.userAgent;
        if(ua.match(/QQBrowser/i) == 'QQBrowser'){
          return true;
        }else{
          return false;
        }
      },

      // 是否在微信里
      isWeiXin:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
        }else{
          return false;
        }
      },

      // 是否为pc客户端－排除移动端的做法
      isPc:function(){
        var u = navigator.userAgent;
        //移动终端浏览器版本信息   
        var versions = {
            trident: u.indexOf('Trident') > -1, //IE内核  
            presto: u.indexOf('Presto') > -1, //opera内核  
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器  
            iPad: u.indexOf('iPad') > -1, //是否iPad    
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
        };

        if(versions.mobile || versions.ios || versions.android || versions.iPhone || versions.iPad){
          return true;
        }else{
          return false;
        }
      },

      // 埋点类型 赋值 两种 page／event
      statistical_type:function(str){
        return str ? str : "page";
      },

      // 埋点来源手机系统的浏览器信息
      client_system:function(){
        // IE7:"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
        // IE8:"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)"
        // IE9:"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)"
        // IE10:"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)"
        // Edge:"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; GWX:RESERVED; rv:11.0) like Gecko"
        // Firefox:"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0"
        // Chrome:"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"

        var ua = navigator.userAgent;

        if( ua.indexOf("MSIE 7.0") >= 0 ){
          return "IE7"
        }else if( ua.indexOf("MSIE 8.0") >= 0 ){
          return "IE8"
        }else if( ua.indexOf("MSIE 9.0") >= 0 ){
          return "IE9"
        }else if( ua.indexOf("MSIE 10.0") >= 0 ){
          return "IE10"
        }else if( ua.indexOf("MSIE") >= 0 ){
          return "IE"
        }else if( ua.indexOf("rv:11.0") >= 0 ){
          return "Edge"
        }else if( ua.indexOf("Firefox") >= 0 ){
          return "Firefox"
        }else if( ua.indexOf("Chrome") >= 0 ){
          return "Chrome"
        }else{
          return "other"
        }

      },

      // 埋点来源手机系统分辨率(格式例如:1080*1920)
      system_resolution:function(){
        var sw = window.screen.width || 0; 
        var sh = window.screen.height || 0;    
        return sw + "*" + sh
      },

      // 取唯一的conversation_id js取唯一id既可
      conversation_id:function(){
        function S4() {
          // 十六进制数0x10000转成十进制数是65536

          return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        var __guid = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        // var myID = "static" + __guid;
        var myID = __guid;
        return myID
      },

      // 判断是否为js对象
      isObject: function (obj) {
        return Object.prototype.toString.call(obj)=== "[object Object]"
      },

      // 判断是否为string
      isString: function (string) {
        return Object.prototype.toString.call(string)=== "[object String]"
      },

      //拼接参数串  
      setArgs:function(objParams){
        // debugger

        //拼接参数串  
        var args = '';  
        var __this = this;
        
        if( !__this.isObject(objParams) ){
          return args;
        }
        for (var i in objParams) {  
          // alert(i);  
          if (args != '') {  
            args += '&';  
          }  
          args += i + '=' + objParams[i];           //将所有获取到的信息进行拼接  
        }
        return args;  
      },

      // 获取点击元素的xpath路径
      getXPath(elm){
        let allNodes = document.getElementsByTagName('*')
        for(var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode){
            if(elm.hasAttribute('id')){
                let uniqueIdCount = 0
                for(var n=0;n < allNodes.length;n++){
                    if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++;
                    if (uniqueIdCount > 1) break;
                }
                if(uniqueIdCount == 1){
                    segs.unshift('//*[@id="' + elm.getAttribute('id') + '"]');
                    return segs.join('/');
                }else{
                    return false
                }
            }else{
                for(var i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling){
                    if (sib.localName == elm.localName)  i++;
                }
                if(i == 1){
                    if(elm.nextElementSibling){
                        if(elm.nextElementSibling.localName != elm.localName){
                            segs.unshift(elm.localName.toLowerCase())
                        }else{
                            segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
                        }
                    }else{
                        segs.unshift(elm.localName.toLowerCase())
                    }
                }else{
                    segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
                }
            }
        }
        return segs.length ? '/' + segs.join('/') : null
      },

      // 根据xpath的路径返回选择器的元素
      getElem(xpath){
        try{
          var evaluator = new XPathEvaluator();
          var result = evaluator.evaluate(xpath, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          return  result.singleNodeValue || '';
        }catch(e){
          return ''
        }
      }
    };

    // 请求函数的对象
    Mar.Request = {
      // 自定义字段取去发送 暂时只支持对象健名为：businessMars 的js对象方式
      diySeed:function( diyData ){
        var __this = this;
        if(diyData){
          if(diyData.businessMars){
            // debugger
            if( Mar.Util.isObject(diyData) ){

              var __diyData = JSON.stringify(diyData.businessMars);

              var __args = Mar.Util.setArgs( $.extend({}, __marConfig.baseMars , {
                "businessMars":__diyData
              }) );

              __this.send({
                args:__args
              })
            }else{
              console.log("设置的businessMars数据不是js对象格式")
            }

          }else{
            console.log("设置的businessMars数据异常")
          }
        }else{
          console.log("没有设置数据diyData")
        }
      },
      // 发送请求方法
      send: function (obj) {
        
        var testargs = {};

        // debugger
        for (let index = 0; index < obj.args.split("&").length; index++) {
          const element = obj.args.split("&")[index];
          testargs[index] = element
        }
        console.log("发送请求的埋点数据打印：")
        console.table(testargs)
        
        var img = new Image(1, 1);
        var seedImgSrc = obj.seedImgSrc ? obj.seedImgSrc : __marConfig.seedImgSrc;
        var src = seedImgSrc + '?' + obj.args;  
        // debugger
        // var src = seedImgSrc + '?args=' + encodeURIComponent(obj.args);  
        console.log("请求到后端脚本的图片路径为:\n" + src);  

        // if (src.length <= 6144) {
        var img = new Image(1, 1);
        img.onload = img.onerror = img.onabort = function () {
          img.onload = img.onerror = img.onabort = null, img = null
        },
        img.src = src;
        // }else{
        //   console.log("超出url的字节数－error提示")
        // }
        return Mar
      }
    }

    // 页面初始化的埋点业务函数
    function pageInitSeedMars(){

      var params = {};  
      //Document对象数据  
      if (document) {  
        //获取域名  
        params.domain = document.domain || ''; 
        
        //当前Url地址  
        params.url = document.URL || '';       
        
        params.title = encodeURIComponent(document.title) || '';  
        

        //上一跳路径  
        params.referrer = document.referrer || '';  
        
        //cookie  
        // params.cookie = document.cookie || '';  

      }  
      //Window对象数据  
      if (window && window.screen) {  
        //获取显示屏信息  
        // params.sh = window.screen.height || 0;    
        // params.sw = window.screen.width || 0;  
        // params.cd = window.screen.colorDepth || 0;  
      }  
      //navigator对象数据  
      if (navigator) {  
        //获取所用语言种类  
        // params.lang = navigator.language || '';    
      }  

      console.table(__marConfig.baseMars)
      if ( __marConfig.baseMars ){
        // params.baseMars = JSON.stringify(__marConfig.baseMars)
        params = $.extend({}, params , __marConfig.baseMars)
      }

      console.table(params)



      //解析_maq配置  
      if (window.hxs_config_maq) {  
        
        //获取埋点阶段，传递过来的用户行为  
        for (var i in hxs_config_maq) {                      
          
          if(hxs_config_maq[i][0]){
            if( hxs_config_maq[i][0].indexOf( __marConfig.signPrefix ) >= 0 ){

              if (Mar.Util.isObject(hxs_config_maq[i][1])) {
                params.pagesInit = JSON.stringify(hxs_config_maq[i][1]);
              }  else {
                params.pagesInit = hxs_config_maq[i][1];
              } 
            }
            // else{
            //   params.pagesInit_no = hxs_config_maq[i][1]; 
            // }
          }
        }  


        // 做业务的处理
        __marConfig.baseMars = $.extend({}, __marConfig.baseMars,params);

        // debugger

        //拼接参数串  
        var args = '';  
        for (var i in params) {  
          // alert(i);  
          if (args != '') {  
              args += '&';  
          }  
          args += i + '=' + params[i];           //将所有获取到的信息进行拼接  
        } 



        //通过伪装成Image对象，请求后端脚本  
        Mar.Request.send({
          args:args
        })
        
      }  

      
    }
    
    // 立即dom标签的绑定执行的执行
    $(document).ready(function(){

      // 初始化埋点基础字段的调用
      __marConfig.baseMarsInit();

      // 页面初始化的埋点调用     
      pageInitSeedMars();

      // 在下面这些html标签上绑定事件
      var __htmlTagName = __marConfig.htmlTagName;
    
      $("body").on("click", __htmlTagName.join(), function (event) {

        __marConfig.baseMars.statistical_type = "event";

        // event.stopPropagation()
        console.log(event)
        // console.log("innerHTML:"+event.currentTarget.innerHTML)
        // console.log("innerText:"+event.currentTarget.innerText)
        console.log("outerHTML:"+event.currentTarget.outerHTML)
        // console.log("outerText:"+event.currentTarget.outerText)

        var __outerHTML = event.currentTarget.outerHTML
        var __innerHTML = event.currentTarget.innerHTML
        var __innerText = event.currentTarget.innerText
        var __outerText = event.currentTarget.outerText

        var pattern = /<("[^"]*"|'[^']*'|[^'">])*>/;
        var outerHTMLpatternValue = pattern.exec(__outerHTML)
        // var exec2 = pattern.exec(__innerHTML)
        // var exec3 = pattern.exec(__innerText)
        // var exec4 = pattern.exec(__outerText)
        
        // debugger

        console.log("标签名称："+event.target.nodeName.toLowerCase())
        var __this = $(this);
        
        var __clickNodeName = event.target.nodeName.toLowerCase();
        var __pageUrl = event.currentTarget.baseURI;
        var __clickInnerHTML = event.srcElement.innerHTML;

        var __clickInnerText = event.srcElement.innerHTML;
        
        // 在指定的html标签上组装发送埋点的数据方法
        function __defaultHtmlTabMar(mars_sign){
          
          var isMarsSignTag = mars_sign && Mar.Util.isString(mars_sign) ? true : false;

          var __args;
          
          var __seedData = $.extend({}, __marConfig.baseMars,{
            // pageUrl:__pageUrl,
            clickNodeName:__clickNodeName,
            // containerOuterHTML:__outerHTML,
            // clickInnerHTML:__clickInnerHTML,
            // clickInnerText:__clickInnerText,
            clickInnerText:encodeURIComponent(__clickInnerText),
            // xPath: Mar.Util.getXPath( __this[0] )
            xPath: encodeURIComponent(Mar.Util.getXPath( __this[0] ))
          })

          // console.log(Mar.Util.getElem( Mar.Util.getXPath( __this[0] ) ))
          // if( Mar.Util.getElem( Mar.Util.getXPath( __this[0] ) )  == __this[0] ){
          //   alert("true")
            
          // }else{
          //   alert("false")
          // }
          
          if( isMarsSignTag ){
            __seedData = $.extend(__seedData ,{
              marsSign : mars_sign
            })
          }

          var __isSeed = false;

          if(__clickNodeName == "a"){
            event.preventDefault(); 
            // __clickInnerHTML = ""
            __seedData = $.extend(__seedData,{
              href : __this.attr("href"),
            })
            Mar.Util.setArgs(__seedData)
            __isSeed = true;
          }else if(__clickNodeName == "button"){


            Mar.Util.setArgs(__seedData)
            // debugger
            __isSeed = true;

          }else{
            
            // __clickInnerHTML = __outerHTML;
            if(outerHTMLpatternValue[0].indexOf("<a") == 0){
              var reg1 = /href=\"(.+)\"/g;
              var reg2 = /href=\'(.+)\'/g;
    
              var __hrefValue = reg1.exec(outerHTMLpatternValue[0]) || reg2.exec(outerHTMLpatternValue[0]);
              var __href = __hrefValue && __hrefValue[1] ? __hrefValue[1] : "";
              console.log("__href="+__hrefValue[1])

              __seedData = $.extend(__seedData,{
                href : __href
              })
              // debugger
              __isSeed = true;
            }
          }
          
          console.log("基础字段－__marConfig.baseMars:")
          console.table( __marConfig.baseMars )

          if( isMarsSignTag ){
            // debugger
            __isSeed = __htmlTagName.indexOf(__clickNodeName) >= 0;
          }
          
          if( __isSeed ){
            console.table(__seedData)
            __args = Mar.Util.setArgs(__seedData)
            Mar.Request.send({
              args:__args
            })
          }
          
        }

        if( $(this).attr("mars_sign") ){
          var data = $(this).attr("mars_sign");
          // debugger
          console.log("mars_sign:",data)
          __defaultHtmlTabMar(data)
        }else{
          // debugger
          __defaultHtmlTabMar()
        }
        
      })

    });


  }else{
    console.log("window.Mar是存在的，需要单独处理命名空间的问题，具体业务，实地对待！")
  } 

})();

  

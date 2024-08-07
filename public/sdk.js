// Tạo một object SDK của plugin của bạn
var MyPluginSDK = {
    // Hàm khởi tạo SDK
    init: function(options) {
        var sdkVersion = options && options.sdkVersion ? options.sdkVersion : "v1.0";
        (function(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "http://localhost:3000/plugin.js";
            fjs.parentNode.insertBefore(js, fjs);

            var cssLink = d.createElement("link");
            cssLink.rel = "stylesheet";
            cssLink.type = "text/css";
            cssLink.href = "http://localhost:3000/plugin.css"; 
            d.getElementsByTagName("head")[0].appendChild(cssLink); 
            
        })(document, "script", "chat_ai_SDK");

        window.myPluginAsyncInit = function() {
            if(options.callback) {
                options.callback();
                return;
            }
            console.log(document.getElementById(options.idElement))
        };

        window.onload = function() {
            window.myPluginAsyncInit();
        };
    }
};

MyPluginSDK.init();
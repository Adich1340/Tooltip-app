var OUTER_DIV = '<div  class="sttip"><div class="tooltip in"><div class="tooltip-arrow"></div><div class="tooltip-arrow second-arrow"></div><div class="popover-inner"></div></div></div>'

  var tool = function(param) {
          let steps = param.data.structure.steps;
          let tiplates = param.data.tiplates;
          let style = param.data.css;
          
//           filter actions only
          let actions = steps.map(element => element.action);

//           filter tips only
          let tips = actions.filter((action) => action.type === 'tip');

          addTip(actions, tips, tiplates, style, tipNumber = 0);

      }
    
         
       function addTip(actions, tips, tiplates, style, tipNumber){
                
//                parsing tip, hover and style from text to array
                var outerDiv = $(OUTER_DIV);
                var tipDiv = $.parseHTML(tiplates.tip);
                var hoverTipDiv = $.parseHTML(tiplates.hoverTip);
                
//                 add tip css
                $("head").append('<style>'+style+'</style>');
                
//                 add div tip 
                $(tips[tipNumber].selector).after(outerDiv);

//                 add tipDiv array to html
                $(".popover-inner").append(tipDiv)
              
//                 add tooltip's #step and content 
                $(".popover-content > div").html(tips[tipNumber].contents['#content'])
                $(".steps-count > span").html(tipNumber)
                $(".steps-count span:last-child").html(tips.length - 1)

//                 tooltip "x" onclick and tooltip "next" onclick
                $(".popover-title button").click(function() {
                    $(".sttip").remove();
                })

                $(".next-btn").click(function() {
                       $(".sttip").remove();
                       ++tipNumber < 4 ? addTip(actions, tips, tiplates, style, tipNumber) : console.log("FINISH TO LOAD");                
                })                    
        }


function waitForInitialScriptLoad() {
        const src = "https://code.jquery.com/jquery-3.5.1.min.js";
        const script = document.createElement("script");
        const styleCss = document.createElement('link'); 
        const bootstrapStyle = document.createElement('link');
      
//         set attributes to styleCss
        styleCss.setAttribute('href', 'https://guidedlearning.oracle.com/player/latest/static/css/stTip.css');
        styleCss.setAttribute('rel', 'stylesheet');
        styleCss.setAttribute('type', 'text/css');

        script.src = src;
        document.head.appendChild(script);
        document.head.appendChild(styleCss);

        return new Promise((res) => {
          script.addEventListener("load", () => {
            window.$ = window.jQuery;
            res(true);
          });
        });
}


(async function () {
    
    await waitForInitialScriptLoad();
    const $ = window.jQuery;

    function jsScript() {
        $(document).ready(function(){  
            $.getScript("https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=tool&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867");

        })
    }

    function inject(fn) {
      const script = document.createElement('script')
      script.text = `(${fn.toString()})();`
      document.documentElement.appendChild(script)
    }
  
    inject(jsScript);
  })();





/**
 * Created by bear on 2017/7/18.
 */
indexBarFn = {
    run: function(){
        var _this = this;
        _this.elementRun();
        _this.sytleFn();
        _this.BindindexTouch();
    },
    elementRun: function(){
        var _this = this;
        _this.indexCurrent = $("#index-current");
        _this.indexWrap = $("#index-wrap");
        _this.indexBar = $("#index-bar");
        _this.indexContentBox = $("#index-content-box");
        _this.indexTableView = $("#index-table-view");
        _this.indexTableViewItem = _this.indexTableView.find("li");
        _this.windowHeight =  $(window).height();
        _this.indexBarLetter = _this.indexBar.find("a");
        _this.letterAraaylenght = _this.indexBarLetter.length;
        _this.letterBoxHeight = _this.windowHeight/_this.letterAraaylenght;
    },
    sytleFn: function(){
        var _this = this;
        _this.indexWrap.css({
            height:_this.windowHeight
        })

        _this.indexBar.css({
            height:_this.windowHeight
        })
        _this.indexBarLetter.css({
            lineHeight:_this.letterBoxHeight+"px",
            height:_this.letterBoxHeight+"px"
        })
        _this.indexContentBox.css({
            height:_this.windowHeight
        })
    },
    BindindexTouch: function(){
        var _this = this;
        var pointElement = null;
        var indexStart = function(e){
            if (pointElement) {
                $(pointElement).removeClass('active');
                pointElement = null;
            }
            var curPoint = e.changedTouches ? e.changedTouches[0] : event;
            pointElement = document.elementFromPoint(curPoint.pageX, curPoint.pageY);
            if(pointElement){
                var group = pointElement.innerText;
                myScrollTo(group);
                msgLetter(group);
                $(pointElement).addClass("active");
                _this.indexBar.addClass("active");
            }
        }

        var indexEnd = function(event){
            _this.indexCurrent.removeClass("active");
            _this.indexBarLetter.removeClass("active");
            _this.indexBar.removeClass("active");
        };

        // 滚动到指定位置
        var myScrollTo = function(_group){
            _group = $('[data-group="'+ _group +'"]');

            if(_group.length != 0){
                _this.indexContentBox.scrollTop(_group.position().top);
            }
        };

        // 当前索引提示信息
        var msgLetter = function(_tempLetter){
            if(_tempLetter && _tempLetter.length == 1){
                _this.indexCurrent.html(_tempLetter);
                _this.indexCurrent.addClass("active");
            }

        };

        _this.indexBar.bind('touchstart',function() {
            indexStart(event);
        });

        _this.indexBar.bind('touchmove',function() {
            indexStart(event);

        });


        $(document.body).bind('touchend', function() {
            indexEnd(event);
        });

        $(document.body).bind('touchcancel', function() {
            indexEnd(event);
        });
    }

}
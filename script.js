// Moveable div: http://jsfiddle.net/wUAGP/440/

$(document).ready(function() {
    //
    // Declarations and definitions.
    //
    
    var cursorDelta = 5

    var mouseIsDown = false;
    var divIds = [];
    var currentDiv;
    var dY;
    var dX;
    
    function newDiv() {
        var id = $('#id').val();
        
        if ((id == '') || (divIds.indexOf(id) >= 0)) {
            return;
        }
        
        var newDivStr = '<div id="' + id + '" class="moveAble"></div>';
        var $newDiv = $(newDivStr);
        
        $newDiv.hover(function(e) {
            currentDiv = this;
        }, function() {
            currentDiv = null;
        });
        
        $('body').append($newDiv);
        divIds.push(id);
        
        // https://jsfiddle.net/winstonchang/dfqtt/
        $($newDiv).resizable({
            helper: "ui-resizable-helper",
            grid: [10, 10]
        });
    }
    
    function moveDiv(div, y, x) {
        $(div).css({'top': y,'left': x});
    }
    
    function resizeDiv(div, h, w) {
        $(div).css({'height': h,'width': w});
    }
    
    //
    // Initialization.
    //
    
    $('#newDivBtn').click(newDiv);
    
    $(document).mousemove(function(e) {
        if (mouseIsDown && currentDiv) {
            moveDiv(currentDiv, e.pageY - dY, e.pageX - dX);
        }
    });
    
    $(document).mousedown(function(e) {
        mouseIsDown = true;
        
        if (currentDiv) {
            dY = e.pageY - parseInt($(currentDiv).css('top'));
            dX = e.pageX - parseInt($(currentDiv).css('left'));
        }
    });
    
    $(document).mouseup(function(e) {
        mouseIsDown = false;
    });
});

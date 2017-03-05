// Moveable div: http://jsfiddle.net/wUAGP/440/

$(document).ready(function() {
    //
    // Declarations and definitions.
    //
    
    var canResize = false;
    var mouseIsDown = false;
    var divIds = [];
    var currentDiv;
    var dY;
    var dX;
    var cursorDelta = 5
    var trackCursor = false;
    
    function newDiv() {
        var id = $('#id').val();
        
        if ((id == '') || (divIds.indexOf(id) >= 0)) {
            return;
        }
        
        var newDivStr = '<div id="' + id + '" class="moveAble"></div>';
        var $newDiv = $(newDivStr);
        
        $newDiv.hover(function(e) {
            trackCursor = true;
            currentDiv = this;
        }, function() {
            trackCursor = false;
            currentDiv = null;
            $('body').css('cursor', 'auto');
        });
        
        $('body').append($newDiv);
        divIds.push(id);
    }
    
    function moveDiv(div, y, x) {
        $(div).css({'top': y,'left': x});
    }
    
    function resizeDiv(div, h, w) {
        $(div).css({'height': h,'width': w});
    }
    
    function selectCursor(div, e) {
        if (!div) {
            return;
        }
        
        var top = parseInt($(div).css('top'));
        var height = parseInt($(div).css('height'));
        var left = parseInt($(div).css('left'));
        var width = parseInt($(div).css('width'));
        
        var ns = (e.pageY >= (top + height - cursorDelta)) && (e.pageY <= (top + height));
        var ew = (e.pageX >= (left + width - cursorDelta)) && (e.pageX <= (left + width));
        
        if (ns && ew) {
            $(div).css('cursor', 'nw-resize');
        }
        else if (ns) {
            $(div).css('cursor', 'ns-resize');
        }
        else if (ew) {
            $(div).css('cursor', 'ew-resize');
        }
        else {
            $(div).css('cursor', 'auto');
        }
    }
    
    //
    // Initialization.
    //
    
    $('#newDivBtn').click(newDiv);
    
    $(document).mousemove(function(e) {
        if (trackCursor) {
            selectCursor(currentDiv, e);
        }
        
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

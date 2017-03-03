// Moveable div: http://jsfiddle.net/wUAGP/440/

$(document).ready(function() {
    //
    // Declarations and definitions.
    //
    
    var canMove = true;
    var mouseIsDown = false;
    var divIds = [];
    var currentDiv;
    var dY;
    var dX;
    
    function newDiv() {
        var id = $('#id').val();
        
        if (id == '') {
            return;
        }
        
        if (divIds.indexOf(id) >= 0) {
            return;
        }
        
        var newDivStr = '<div id="' + id + '" class="moveAble"></div>';
        var $newDiv = $(newDivStr);
        $newDiv.hover(function() {
            currentDiv = this;
        });
        
        $('body').append($newDiv);
        divIds.push(id);
    }
    
    function moveDiv(div, y, x) {
        $(div).css({'top': y,'left': x});
    }
    
    function setNonMovableRegion(el) {
            $(el).hover(
            function() {
                canMove = false;
            },
            function() {
                canMove = true;
            }
        );
    }

    //
    // Initialization.
    //
    
    $('#newDivBtn').click(newDiv);
    
    $(document).mousemove(function(e) {
        if (mouseIsDown && canMove && currentDiv) {
            moveDiv(currentDiv, e.pageY + dY, e.pageX + dX);
        }
    });
    
    $(document).mousedown(function(e) {
        mouseIsDown = true;
        if (canMove && currentDiv) {
            dY = parseInt($(currentDiv).css('top')) - e.pageY;
            dX = parseInt($(currentDiv).css('left')) - e.pageX;

            moveDiv(currentDiv, e.pageY + dY, e.pageX + dX);
        }
    });
    
    $(document).mouseup(function(e) {
        mouseIsDown = false;
    });
    
    setNonMovableRegion('#creator');
});

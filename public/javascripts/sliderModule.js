/**
 * Created by Tomas Nagy on 16/02/2015.
 */
var ProjectSlider = (function() {
    var maxLength = 3,
        currentPos = 0,
        data,

        init = function(d) {
            data = d;

            // create first items
            return createItems(currentPos);
        }

        createItems = function(startPos) {
            var htmlBuilder = '',
                j = startPos,
                l;

            if(getLength() > 3)
            {
                l = startPos + 3;
            } else {
               l = getLength() + startPos;
            }

            for(j; j < l; j++) {
                var item = '<div class="project-item"><img src="';
                item += data[j].img;
                item += '"/>';
                item +='<div class="description"><h3>';
                item += data[j].title;
                item += '</h3><p class="hidden">';
                item += data[j].id;
                item += '</p></div></div>';
                htmlBuilder += item;
            }

            return htmlBuilder;
        },

        createNextItems = function() {
            currentPos += 3;
            return createItems(currentPos);
        },

        createPreviousItems = function() {
            currentPos -= 3;
            return createItems(currentPos);
        },

        getLength = function() {
            console.log(data.length);
            console.log(currentPos);
          return (data.length) - currentPos;
        },

        isStart = function() {
            return currentPos <= 0;
        },

        isEnd = function() {
            return (currentPos + 3)>=(data.length );
        };

    return {
        init: init,
        createNextItems: createNextItems,
        createPreviousItem: createPreviousItems,
        getLength: getLength,
        isStart: isStart,
        isEnd: isEnd
    };
})();
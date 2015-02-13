/**
 * Created by Tomas Nagy on 22/01/2015.
 */
(function() {
    var request;

    request = new XMLHttpRequest();
    request.open('GET', window.location.host + 'javascripts/data/data.json', true);
    request.addEventListener('load', function () {
        if (request.status >= 200 && request.status <= 400) {
            var data = JSON.parse(request.responseText);
            startAnimations(data);
        }
    });

    request.send();
})();
/**
 * Created by Tomas Nagy on 21/01/2015.
 */
(function() {
    var whoami = document.querySelector('#box-up > a'),
        projects = document.querySelector('#box-down > a'),
        boxUp = document.getElementById('box-up'),
        boxDown = document.getElementById('box-down'),
        containerDown = document.querySelector('#box-down > .container'),
        descriptions = document.getElementsByClassName('description'),
        all = [whoami, projects, boxUp, boxDown, containerDown, descriptions],
        isDown = true;


    // clicks
    whoami.addEventListener('click', function(e) {
        e.preventDefault();
        if(!isDown) {
            Velocity(all, 'stop');
            Velocity(boxDown, {height: '33.33%'}, 1000);
            Velocity(boxUp, {height: '66.66%'}, 1000);
            Velocity(projects, {opacity: 0.2}, 1000);
            Velocity(whoami, {opacity: 1}, 1000);
            Velocity(containerDown, {opacity: 0}, 1000);
            Velocity(descriptions, {marginTop: '66.66%'}, 1000);

            isDown = true;
        }
    });

    projects.addEventListener('click', function(e) {
        e.preventDefault();
        if(isDown) {
            Velocity(all, 'stop');
            Velocity(boxUp, {height: '33.33%'}, 1000);
            Velocity(boxDown, {height: '66.66%'}, 1000);
            Velocity(whoami, {opacity: 0.05}, 1000);
            Velocity(projects, {opacity: 1}, 1000);
            Velocity(containerDown, {opacity: 1}, {duration: 1000, delay: 900});
            Velocity(descriptions, {marginTop: '43.66%'}, {duration: 500, delay: 1600});
            isDown = false;
        }
    });

    // hovers
    whoami.addEventListener('mouseenter', function() {
        if(!isDown) {
            Velocity(whoami, 'stop');
            Velocity(whoami, {opacity: 1}, 200);
        }
    });

    whoami.addEventListener('mouseleave', function() {
        if(!isDown) {
            Velocity(whoami, 'stop');
            Velocity(whoami, {opacity: 0.05}, 200);
        }
    });

    projects.addEventListener('mouseenter', function() {
        if(isDown) {
            Velocity(projects, 'stop');
            Velocity(projects, {opacity: 1}, 200);
        }
    });

    projects.addEventListener('mouseleave', function() {
        if(isDown) {
            Velocity(projects, 'stop');
            Velocity(projects, {opacity: 0.2}, 200);
        }
    });
})();
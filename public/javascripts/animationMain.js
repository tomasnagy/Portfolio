/**
 * Created by Tomas Nagy on 21/01/2015.
 */
var startAnimations = function (data) {
    var whoami = document.querySelector('#box-up > a'),
        projects = document.querySelector('#box-down > a'),
        boxUp = document.getElementById('box-up'),
        boxDown = document.getElementById('box-down'),
        containerDown = document.querySelector('#box-down > .container'),
        containerUp = document.querySelector('#box-up > .container'),
        descriptions = document.getElementsByClassName('description'),
        projectDetail = document.getElementById('project-detail'),
        profile = document.getElementById('profile'),
        next = document.getElementById('next'),
        back = document.getElementById('back'),
        all = [whoami, projects, boxUp, boxDown, containerDown, descriptions, containerUp, containerDown, back, next],
        isDown = true;

    // create project items
    containerDown.innerHTML = ProjectSlider.init(data);
    addAnimationsToItems();

    // clicks
    whoami.addEventListener('click', function (e) {
        e.preventDefault();
        if (!isDown) {
            Velocity(all, 'stop');
            Velocity(boxDown, {height: '33.33%'}, 500);
            Velocity(boxUp, {height: '66.66%'}, 500);
            Velocity(projects, {opacity: 0.2}, 500);
            Velocity(whoami, {opacity: 1}, 500);
            Velocity(containerDown, {opacity: 0}, 500);
            Velocity(containerUp, {opacity: 1}, {duration: 400, delay: 200});
            Velocity(descriptions, {height: '0'}, 500);
            Velocity([back, next], {opacity: 0}, 200);

            isDown = true;
        }
    });

    projects.addEventListener('click', function (e) {
        e.preventDefault();
        if (isDown) {
            Velocity(all, 'stop');
            Velocity(boxUp, {height: '33.33%'}, 500);
            Velocity(boxDown, {height: '66.66%'}, 500);
            Velocity(whoami, {opacity: 0.05}, 500);
            Velocity(projects, {opacity: 1}, 500);
            Velocity(containerDown, {opacity: 1}, {duration: 500, delay: 250});
            Velocity(containerUp, {opacity: 0}, 500);
            Velocity(descriptions, {height: '33.33%'}, {duration: 250, delay: 450, queue: false});
            Velocity([back, next], {opacity: 0.2}, 200);
            isDown = false;
        }

        if (projects.textContent === 'BACK') {
            Velocity(all, 'stop');
            Velocity(boxUp, {height: '33.33%'}, 500);
            Velocity(boxDown, {height: '66.66%'}, 500);
            Velocity(whoami, {opacity: 0.05}, 500);
            Velocity(projects, {opacity: 0}, 250);
            Velocity(containerDown, {opacity: 1}, {duration: 500, delay: 250});
            Velocity(containerUp, {opacity: 0}, 500);
            Velocity(descriptions, {height: '33.33%'}, {duration: 250, delay: 450, queue: false});
            Velocity(profile, {opacity: 1}, {duration: 0, delay: 500});
            Velocity(projectDetail, {opacity: 0}, {duration: 0, delay: 500});
            Velocity([back, next], {opacity: 0.2}, 200);

            setTimeout(function () {
                projects.textContent = 'PROJECTS';
                Velocity(projects, {opacity: 1}, 250);
                whoami.style.display = 'block';
            }, 500);
        }
    });

    // hovers
    whoami.addEventListener('mouseenter', function () {
        if (!isDown) {
            Velocity(whoami, 'stop');
            Velocity(whoami, {opacity: 1}, 200);
        }
    });

    whoami.addEventListener('mouseleave', function () {
        if (!isDown) {
            Velocity(whoami, 'stop');
            Velocity(whoami, {opacity: 0.05}, 200);
        }
    });

    projects.addEventListener('mouseenter', function () {
        if (isDown) {
            Velocity(projects, 'stop');
            Velocity(projects, {opacity: 1}, 200);
        }
    });

    projects.addEventListener('mouseleave', function () {
        if (isDown) {
            Velocity(projects, 'stop');
            Velocity(projects, {opacity: 0.2}, 200);
        }
    });


    next.addEventListener('click', function () {
        if(!ProjectSlider.isEnd())
            containerDown.innerHTML = ProjectSlider.createNextItems();
        showOrHideScrollButtons();
        addAnimationsToItems();
    });

    back.addEventListener('click', function() {
        if(!ProjectSlider.isStart())
            containerDown.innerHTML = ProjectSlider.createPreviousItem();
        showOrHideScrollButtons();
        addAnimationsToItems();
    });

    function showOrHideScrollButtons() {
        if(ProjectSlider.isStart()) {
            Velocity(back, {opacity: 0}, 100);
            setTimeout(function() {
                back.classList.add('hidden');
            }, 200);
        } else {
            back.classList.remove('hidden');
            Velocity(back, {opacity: 1}, 100);
        }

        if(ProjectSlider.isEnd()) {
            Velocity(next, {opacity: 0}, 100);
            setTimeout(function() {
                next.classList.add('hidden');
            }, 200);
        } else {
            next.classList.remove('hidden');
            Velocity(next, {opacity: 1}, 100);
        }
    }

    function addAnimationsToItems() {
        var i = ProjectSlider.getLength() - 1,
            projectItems = document.getElementsByClassName('project-item');

        if(i > 2) {
            i = 2;
        }

        // project details
        for (i; i >= 0; i--) {
            projectItems[i].addEventListener('click', function (e) {
                if (!isDown) {
                    // fill project with details
                    var id = Number(e.currentTarget.children[1].children[1].textContent);
                    projectDetail.children[0].children[0].src = data[id].img;
                    projectDetail.children[1].textContent = data[id].title;
                    projectDetail.children[2].textContent = data[id].description;

                    // animations
                    Velocity(all, 'stop');
                    Velocity(boxDown, {height: '33.33%'}, 500);
                    Velocity(whoami, {opacity: 0}, 100);
                    Velocity(boxUp, {height: '66.66%'}, 500);
                    Velocity(containerDown, {opacity: 0}, 500);
                    Velocity(projects, {opacity: 0}, 250);
                    Velocity(projectDetail, {opacity: 1}, 0);
                    Velocity(profile, {opacity: 0}, 0);
                    Velocity(containerUp, {opacity: 1}, {duration: 400, delay: 200});
                    Velocity([back, next], {opacity: 0}, 200);

                    setTimeout(function () {
                        projects.textContent = 'BACK';
                        Velocity(projects, {opacity: 1}, 250);
                        whoami.style.display = 'none';
                    }, 500);
                }
            });
        }
    }
}
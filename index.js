 // index.js

var game = document.querySelector(".game");
var student = document.querySelector(".student");
var tasks = document.querySelector(".tasks");

var studentLeft = parseInt(window.getComputedStyle(student).getPropertyValue("left"));
var studentBottom = parseInt(window.getComputedStyle(student).getPropertyValue("bottom"));
var score = 0; 

function moveStudentLeft(){
    if(studentLeft > 0){
        studentLeft -= 50;
        student.style.left = studentLeft + 'px';
    }
}

function moveStudentRight(){
    if(studentLeft < 620) {
        studentLeft += 50;
        student.style.left = studentLeft + 'px';
    }
}

function control(e){
    if (e.key == "ArrowLeft"){
        moveStudentLeft();
    }
    if (e.key == "ArrowRight"){
        moveStudentRight();
    }
}

function generateTasks(){
    var taskBottom = 470;
    var taskLeft = Math.floor(Math.random()*620);
    var task = document.createElement('div');
    task.setAttribute("class", "task");
    tasks.appendChild(task);

    function fallDowntask(){

        studentLeft = parseInt(window.getComputedStyle(student).getPropertyValue("left"));
        studentBottom = parseInt(window.getComputedStyle(student).getPropertyValue("bottom"));

        if (taskBottom < studentBottom+ 50 && taskBottom > studentBottom && taskLeft > studentLeft - 30 && taskLeft < studentLeft+80){
            tasks.removeChild(task);
            clearInterval(fallInterval);
            score++;
        }
        if (taskBottom < studentBottom){
            alert("Game over! Your score is: " + score);
            clearInterval(fallInterval);
            clearTimeout(taskTimeout);
            location.reload();
        }
        taskBottom -= 5;
        task.style.bottom = taskBottom +'px';
        task.style.left = taskLeft +'px';
    }

    var fallInterval = setInterval(fallDowntask, 20);
    var taskTimeout = setTimeout(generateTasks, 2000);
}

generateTasks();

document.addEventListener("keydown",control);

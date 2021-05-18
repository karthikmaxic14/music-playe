var obj, x, y, prev_x, prev_y, max,
    slider, icon, progress,
    files, counter, title,
    forward, bakward,
    endtime, ctime,
    audio, plays, audioClass, playList,
    slideInput,
    playsBtn, images ;

forward = sl('.forward');
bakward = sl('.backward');
ctime = sl("#ctime");
endtime = sl("#endtime");
audio = sl("audio");
plays = sl("#play");
slideInput = sl("#myRange");
playsBtn = sl(".play-btn-list");
icon = sl(".icon");
slider = sl(".slider");
progress = sl(".slider-progres");
audioClass = sl(".audio-player");
title = sl(".title");
playList = sl(".play-list");
counter = 0;


files = [{
    "title": "Crowander - Folksy Dance",
    "scr": "assets/songs/Crowander - Folksy Dance.mp3",
    "Imagescr": "assets/images/4.jpg",

},
{
    "title": "happy-ukulele-and-bells-4349",
    "scr": "assets/songs/happy-ukulele-and-bells-4349.mp3",
    "Imagescr": "assets/images/2.jpg",
},
{
    "title": "Minions Banana Song Full Song",
    "scr": "assets/songs/Minions Banana Song Full Song.mp3",
    "Imagescr": "assets/images/3.jpg",
},
{
    "title": "Wheels on the Bus Kindergarten Nursery Rhymes for Babies Cartoon Songs by Little Treehouse",
    "scr": "assets/songs/Wheels on the Bus.mp3",
    "Imagescr": "assets/images/1.jpg",
},
{
    "title": "happy-ukulele-and-bells-4349",
    "scr": "assets/songs/happy-ukulele-and-bells-4349.mp3",
    "Imagescr": "assets/images/5.jpg",
},
{
    "title": "happy-ukulele-and-bells-4349",
    "scr": "assets/songs/happy-ukulele-and-bells-4349.mp3",
    "Imagescr": "assets/images/2.jpg",
},
{
    "title": "Minions Banana Song Full Song",
    "scr": "assets/songs/Minions Banana Song Full Song.mp3",
    "Imagescr": "assets/images/3.jpg",
},
{
    "title": "Wheels on the Bus Kindergarten Nursery Rhymes for Babies Cartoon Songs by Little Treehouse",
    "scr": "assets/songs/Wheels on the Bus.mp3",
    "Imagescr": "assets/images/4.jpg",
},
{
    "title": "happy-ukulele-and-bells-4349",
    "scr": "assets/songs/happy-ukulele-and-bells-4349.mp3",
    "Imagescr": "assets/images/5.jpg",
}
];

var baseUrl = "http://localhost/music-box/";
audio.setAttribute("src", files[counter].scr);
title.textContent = files[counter].title;
images = sl(".album-image");
images.style.backgroundImage =  "url('"+baseUrl+""+files[counter].Imagescr+"')";


icon.onmousedown = drag;
document.onmousemove = move;
document.onmouseup = drop;




for (var i in files) {
    var lis = document.createElement("li");
    lis.innerHTML = " <div class='image'><img src='"+files[i].Imagescr+"' ></div><div class='conten'><h4>" + files[i].title + "</h4></div>";
    lis.setAttribute("count", i);
    playList.appendChild(lis);
}

audio.addEventListener("loadeddata", () => {
    endtime.innerHTML = `${timeFormat(audio.duration)}`;
    slideInput.setAttribute("max", audio.duration);
    slideInput.value = audio.currentTime;
});


audio.addEventListener("loadedmetadata", () => {
    endtime.innerHTML = `${timeFormat(audio.duration)}`;
    slideInput.setAttribute("max", audio.duration);
});
audio.addEventListener("timeupdate", function (e) {
    ctime.innerHTML = timeFormat(this.currentTime);
    slideInput.value = this.currentTime;

    var width = calPer(timeFormats(this.duration), timeFormats(this.currentTime));

    progress.style.width = width + "%";
    icon.style.left = (progress.clientWidth - 3) + "px";

    endtime.innerHTML = timeFormat(this.duration);
});

slider.addEventListener("click", function (e) {
    var tar = e.target;
    var width = e.pageX - audioClass.offsetLeft;

    progress.style.width = calPer(tar.parentNode.clientWidth, width) + "%";
    icon.style.left = width + "px";
    max = slideInput.getAttribute("max");
    slideInput.value = (max / 100) * (parseFloat(progress.style.width));
});


slideInput.oninput = function () {
    audio.currentTime = slideInput.value;
};

slideInput.addEventListener("change", function () {
     audio.currentTime = slideInput.value;
});

forward.addEventListener("click", function (e) {
    counter++;
    playSong(counter);
});

bakward.addEventListener("click",  function (e) {
    counter--;
    playSong(counter);
});

playList.addEventListener("click", function(e){
    counter =  e.target.closest("li").getAttribute("count");
    playSong(counter);
});

function playSong(counter){
    plays.children[0].setAttribute("src", plays.children[0].getAttribute("play"));
    audio.pause();
    audio.setAttribute("src", files[counter].scr);
    title.textContent = files[counter].title;
    images.style.backgroundImage =  "url('"+baseUrl+""+files[counter].Imagescr+"')";
    plays.click();
}
plays.addEventListener("click", function () {
    if (audio.paused) {
        plays.children[0].setAttribute("src", plays.children[0].getAttribute("pause"));
        audio.play();
    } else {
        plays.children[0].setAttribute("src", plays.children[0].getAttribute("play"));
        audio.pause();
    }
});


playsBtn.addEventListener("click", function (e) {
    if(playList.classList.contains("show")){
        this.classList.remove('rotate');
        playList.classList.remove("show");
    } else {
        this.classList.add('rotate');
        playList.classList.add("show");
    }
});



function sl(val) {
    return document.querySelector(val);
}

function drag(e) {
    // Yep, use the object I just clicked on.
    obj = e.target;
    // Set current X coordinate minus distance left from offsetParent node.
    prev_x = x - obj.offsetLeft;
    // Set current Y coordinate minus distance top from offsetParent node.
    prev_y = y - obj.offsetTop;
    // Change the object's color so it looks like it's usable/moveable.
    // obj.style.background = '#00ff00';
}

function move(e) {
    var max = slider;
    if (max != null) {

        if (max) {
            max = max.clientWidth;
        }

        if (e.pageX) {
            x = e.pageX; // X coordinate based on page, not viewport.
            y = e.pageY; // Y coordinate based on page, not viewport.
        }

        if (obj) {
            left = (x - prev_x);
            if ((left > 0) && (left <= max)) {

                obj.style.left = (x - prev_x) + 'px';
                progress.style.width = calPer(max, left) + "%";
                max = slideInput.getAttribute("max");
                audio.currentTime = slideInput.value = (max / 100) * (parseFloat(progress.style.width));

            }

        }
    }

}

function drop() {
    obj = false;
}
// Calculate number to percentage
function calPer(val, val2) {
    return (100 - (((val - val2) / val) * 100)).toFixed(2);
}


function timeFormat(time) {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
}


function timeFormats(time) {
    return Math.floor(time / 60) + "." + ("0" + Math.floor(time % 60)).slice(-2);
}
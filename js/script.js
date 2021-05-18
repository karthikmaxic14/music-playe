

var Home = function(){
    return ( '<div>  Home</div>');
};



var Abouts = function(){
    return ( `<div> Abouts</div>`)
};

var routeUrl = [
    {
        path: '/',
        title : "Home",
        view: "Home"

    },
    {
        path: '/about',
        title : "About us",
        view: "Abouts"

    },
    {
        path: '/contact-us',
        title: "Contac Us",
        view: "Abouts"

    },
    {
        path: '/sample',
        title: "Sample",
        view: "Abouts"

    },
];


window.baseUrl = "http://localhost/music-box"

Init(window.baseUrl, routeUrl);

var ctime = document.getElementById("ctime");
var endtime = document.getElementById("endtime");

var audio = document.querySelector("audio");

var plays = document.querySelector("#play");


audio.addEventListener("timeupdate", function(e){
    ctime.innerHTML = timeFormat(this.currentTime);
    document.querySelector("#myRange").value =this.currentTime;

    var width = calPer(  timeFormats(this.duration), timeFormats(this.currentTime))
    document.querySelector(".slider-progres").style.width = width+"%";

    // =this.currentTime;


    endtime.innerHTML = timeFormat( this.duration);


})
range = document.querySelector("#myRange");

range.oninput = function() {

    audio.currentTime = range.value;

}


plays.onclick = function(){
    audio = document.querySelector("audio");
        if(audio.paused){
            plays.textContent= "Pause";
            audio.play();
        } else  {
            plays.textContent= "Paly";
            audio.pause();
        }
};
audio.addEventListener("loadedmetadata", () => {
    const endTime = document.querySelector("#endtime");
    range = document.querySelector("#myRange");


    endTime.innerHTML = `${timeFormat(audio.duration)}`;
    document.querySelector("#myRange").setAttribute("max", audio.duration);

  });


function timeFormat(time) {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
}


function timeFormats(time) {
    return Math.floor(time / 60) + "." + ("0" + Math.floor(time % 60)).slice(-2);
}


function calPer(val, val2){
    return    (100 - ((( val- val2)/val)*100)  ).toFixed(2) ;
}



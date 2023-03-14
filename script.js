console.log("welcome to spotify");
//initialize the variables
let songindex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songs = [
  { songName: "Let Me Love You", filePath: "1.mp3", coverPath: "1.jpg" },
  { songName: "Dhoom", filePath: "2.mp3", coverPath: "2.jpg" },
  { songName: "Dhoom machale", filePath: "3.mp3", coverPath: "3.jpg" },
  { songName: "Dhoom Dhoom", filePath: "4.mp3", coverPath: "4.jpg" },
  { songName: "I love you", filePath: "5.mp3", coverPath: "5.jpg" },
];

//handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});
//listen to events
audioElement.addEventListener("timeupdate", () => {
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songitemplay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};
Array.from(document.getElementsByClassName("songitemplay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
    if(audioElement.paused) {
      makeAllPlays();
      songindex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      masterPlay.classList.add("fa-pause-circle");
      masterSongName.innerText = songs[songindex-1].songName;
      audioElement.src = `${songindex}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
    }
    else{
        makeAllPlays();
        songindex = parseInt(e.target.id);
        // e.target.classList.remove("fa-pause-circle");
        // e.target.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        masterSongName.innerText = songs[songindex-1].songName;
        audioElement.pause();
        audioElement.src = `${songindex}.mp3`;
        audioElement.currentTime = 0;
        gif.style.opacity = 0;
    }
    });
  }
);
document.getElementById("prev").addEventListener("click", () => {
  if (songindex <= 1) {
    songindex = 5;
  } else {
    songindex -= 1;
  }
  masterPlay.classList.add("fa-pause-circle");
  masterSongName.innerText = songs[songindex-1].songName;
  audioElement.src = `${songindex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
});
document.getElementById("next").addEventListener("click", () => {
  if (songindex >= 5) {
    songindex = 1;
  } else {
    songindex += 1;
  }
  masterPlay.classList.add("fa-pause-circle");
  masterSongName.innerText = songs[songindex-1].songName;
  audioElement.src = `${songindex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
});

const search = document.querySelector(".search");
const musicList = document.querySelector(".music-list");
const musicPlayName = document.querySelector(".music-play-name");
const musicIcon = document.querySelector(".music-icon");
const musicRange = document.querySelector(".music-range");
const soundIcon = document.querySelector(".sound-icon");
const soundRange = document.querySelector(".sound-range");
const doobl = document.querySelector(".doobl");
const audio = document.querySelector("audio");
const overlay=document.querySelector(".overlay");
const modal=document.querySelector(".modal");
const yes=document.querySelector(".yes")
const no=document.querySelector(".no")

let intervalID;

const first=()=>{
  const links = JSON.parse(localStorage.getItem("links"));
  const name = links[0][0];
  const link = links[1][0];
  musicPlayName.innerHTML = name;
  audio.setAttribute("src", link);
  pauseiconhanler()
  intervalID=setInterval(() => {
    musicRange.value=audio.currentTime*10000/audio.duration;
  }, 50);
}

const playiconhanler = () => {
  musicIcon.className = "music-icon play";
};
const pauseiconhanler = () => {
  musicIcon.className = "music-icon pause";
};
const muteiconhanler = () => {
  soundIcon.className = "music-icon mute";
};
const openiconhanler = () => {
  soundIcon.className = "music-icon open";
};

const getlink = () => {
  
    const links = [
      [
        "can u hear the music",
        "a reckoning in blood",
        "day one dark",
        "istade dar ghobar",
        "no time for caution",
        "three kingdoms sad",
        "three kingdoms",
        "The Interstellar Experience",
        "conquest of paradise",
        "for the love",
        "babel",
        "experince",
        "gladiator",
        "nature of daulight",
      ],
      [
        "./canu.mp3",
        "./46AReckoninginBlood.mp3",
        "./dayonedark.mp3",
        "./HabibKhazaeifar-IstadehDarGhobar.mp3",
        "./notimeforcaution.mp3",
        "./THREEKINGDOMSSAD.mp3",
        "./THREEKINGDOMS.mp3",
        "./TonyAnnTonyAnn-TheInterstellarExperience.mp3",
        "./Vangelis-ConquestOfParadise.mp3",
        "./11_for_the_love_of_a_princess-std.mp3",
        "./babel-music.mp3",
        "./12_-_experience.mp3",
        "./hans-zimmer-the-battle-320.mp3",
        "./max_richter_-_on_the_nature_of_daylight_-_musicgeek.ir_.mp3",
      ],
    ];

    localStorage.setItem("links", JSON.stringify(links));
  
  const links = JSON.parse(localStorage.getItem("links"));
  showlist(links);
};
const showlist = (links) => {
  musicList.innerHTML = "";
  for (let i = 0; i <= links[0].length - 1; i++) {
    musicList.insertAdjacentHTML(
      "beforeend",
      `
        <div class="music">
            <div data-link=${links[1][i]} data-index=${i} class="music-list-name">${links[0][i]}</div>
            <div data-index=${i} class="music-list-icon"></div>
        </div>
        `
    );
  }
  addevent();
};
const addevent = () => {
  const musicNames = document.querySelectorAll(".music-list-name");
  const musicIcons = document.querySelectorAll(".music-list-icon");
  musicNames.forEach((x) => {
    x.addEventListener("click", play);
  });
  musicIcons.forEach((x) => {
    x.addEventListener("click", remove);
  });
};
const play = (event) => {
  const name = event.target.innerHTML;
  const link = event.target.dataset.link;
  musicPlayName.innerHTML = name;
  audio.setAttribute("src", link);
  playiconhanler();
  audio.play();
  if(intervalID)clearInterval(intervalID)
  intervalID=setInterval(() => {
    musicRange.value=audio.currentTime*10000/audio.duration;
  }, 50);
};
  let deleteIndex = null;
  let flag=false;

const remove = (event) => {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");

  deleteIndex = event.target.dataset.index;
};
yes.addEventListener("click",()=>{
  if(deleteIndex){
    const links= JSON.parse(localStorage.getItem("links"));
    if(audio.getAttribute("src")==links[1][deleteIndex])
    flag=true;
    links[0].splice(deleteIndex,1)
    links[1].splice(deleteIndex,1)
    localStorage.setItem("links",JSON.stringify(links))
    getlink()
    if(flag){
      first()
      flag=false
    }
    overlay.classList.add("hidden");
  modal.classList.add("hidden");
  }
})
no.addEventListener('click',()=>{
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
})



window.addEventListener("load", getlink);
musicIcon.addEventListener("click",()=>{
  if(musicIcon.className=="music-icon play"){
    pauseiconhanler();
    audio.pause();
  }
  else if(musicIcon.className=="music-icon pause"){
    playiconhanler();
    audio.play();
  }
})
musicRange.addEventListener("change",()=>{
  audio.currentTime=musicRange.value*audio.duration/10000;
  
  if(intervalID)clearInterval(intervalID)
  intervalID=setInterval(() => {
    musicRange.value=audio.currentTime*10000/audio.duration;
  }, 50);
})
musicRange.addEventListener("input",()=>{
  if(intervalID)clearInterval(intervalID)
})
soundIcon.addEventListener("click",()=>{
  if(soundIcon.className=="sound-icon open"){
    soundIcon.className="sound-icon mute";
    audio.volume=0;
  }else if(soundIcon.className=="sound-icon mute"){
    soundIcon.className="sound-icon open";
    audio.volume=soundRange.value/100;
  }
})
soundRange.addEventListener("input",()=>{
  audio.volume=soundRange.value/100;
})
doobl.addEventListener("click",()=>{
  if(doobl.innerHTML=="1x"){
    doobl.innerHTML="2x";
    audio.playbackRate=2;
  }else if(doobl.innerHTML=="2x"){
    doobl.innerHTML="4x";
    audio.playbackRate=4;
  }else{
    doobl.innerHTML="1x";
    audio.playbackRate=1;
  }
})


setTimeout(() => {
  first()

}, 100);



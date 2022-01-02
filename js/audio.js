function audipPlay(search) {
  const audio = new Audio();
  audio.preload = "auto";

  audio.src = search;

  audio.autoplay = true;
  audio.play();
}

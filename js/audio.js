function audipPlay(search) {
  const audio = new Audio();
  audio.preload = "metadata";
  audio.src = search;
  audio.play();
}

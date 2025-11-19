export type SoundType = "spin" | "lose" | "bonus" | "task" | "finishGame" | "click" | "ding";

export function playSound(type: SoundType) {
  if (type === "finishGame") {
    if (window.__victoryAudio && typeof window.__victoryAudio.pause === "function") {
      window.__victoryAudio.pause();
      window.__victoryAudio.currentTime = 0;
    }
    window.__victoryAudio = new Audio(`/sounds/${type}.mp3`);
    window.__victoryAudio.play();
  } else if (type === "spin") {
    if (window.__spinAudio && typeof window.__spinAudio.pause === "function") {
      window.__spinAudio.pause();
      window.__spinAudio.currentTime = 0;
    }
    window.__spinAudio = new Audio(`/sounds/${type}.mp3`);
    window.__spinAudio.loop = true;
    window.__spinAudio.play();
  } else {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play();
  }
}

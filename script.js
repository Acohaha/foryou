const intro = document.getElementById("intro");
const container = document.querySelector(".container");
const messageEl = document.getElementById("message");
const bgMusic = document.getElementById("bgMusic");
const volumeSlider = document.getElementById("volume");

// Show intro with fade-in
window.onload = () => {
  setTimeout(() => {
    intro.classList.add("show");
  }, 500);
};

// Long letter split into paragraphs
const messages = [
  "Uhh I made this program for you because I know this time that it will be the last message that I will be sending you because I don’t want to bother you na, and I know na you’re in college studying.\n\ ",

  "Hello my baby, I know it’s crazy that I am still calling you baby, but I just can’t call you by your real name.\n\ Because bumibigat pakiramdam ko pag bina banggit ko pangalan mo and it is because of everything that I have done to you which I deeply regret.\n\ By the way, this isn’t a another apology letter it's just i wanted to tell you something, but I think this is my last message so i that can stop bothering you na.\n\ ",

  "But yeah, in the last letter I’ve sent you, I said that I will be sending you the notes that I have written to you once I get my phone fixed.\n\ But the thing is, I’ve forgotten that I deleted it because nakita ni mama yung cut ko and she demanded to see my phone and asked me kung bakit ko nagawa yon.\n\ Pero di ko sinabi kung bakit and kung anong reason.\n\ And to be honest, I think dahil sa nagawa ko sayo.\n\ I don’t know, but that time it came back haunting me and all, so that’s why I did the one and only coping mechanism that I knew of, which is to cut.\n\ But never mind the cutting part, the real reason that I sent you this email is the contents of the notes that I had written for you in the past months na we ended things.\n\ ",

  "The contents on the letters are already in what I have sent you before, apologizing for what I have done and all.\n\ But at some point, I wrote a letter when I suddenly woke up crying and wrote that I miss you, and nagpakita ka sa panaginip ko.\n\ Honestly, until now you still show up in my dreams. Hahaha.\n\ I want to tell you honestly this now, that I still miss you, I miss us and all.\n\ But I know for a fact na you have moved on.\n\ But me, I didn’t move on and I waited for you to move on from me, which I regret.\n\ ",

  "Thinking… what if I texted you and asked if we could try again?\n\ Maybe until now we’re still together, which makes my heart ache thinking about it.\n\ Honestly, I don’t think I can easily move on since you were my greatest love, and you will ever be forever.\n\ Also, I’m sorry if I gave up so easily.\n\ I know for myself that I could have done something to fix it, but I didn’t.\n\ It was not because I did not love you anymore, but I thought that it was for the best.\n\ I’m really, really sorry.\n\ ",

  "Today I have seen a TikTok post that reminded me of us, especially you, saying that:\n\n\ ‘Get ur girl back, idc if it ended on horrible terms, you know she loves you very much, y’all are young it won’t be perfect, but what you all had was beautiful.\n\ Don’t ruin it over immaturity.\n\ Remember, you looked her in her eyes and promised it would last forever.\n\ Keep that promise.\n\ GOD put y’all in each other’s life for a reason, to heal and love each other.\n\ So follow through with GOD’s plan.\n\ Go get your girl back.’\n\ ",

  "That video reminded me of you and made me question myself on how I didn’t stay and only thought for myself.\n\ And now, I’m here feeling what you have been feeling the past months when I left you and you tirelessly waited for me to come back into your arms.\n\ And now, the roles have switched.\n\ I’m really sorry for how I treated you in the past.\n\ I still love you and will always love you.\n\ If things ever get heavy, you can still come to me.\n\ I’m one chat or email away.\n\ And I did unblock you on my FB and Messenger so you can reach me out there if you need help.\n\ I am always here.\n\ I guess this is it for my last message and email.\n\ ",

  "THANK YOU AND GOODLUCK MY FUTURE NURSE.",

  "I LOVE YOU SO MUCH!!"
];

let msgIndex = 0;
let charIndex = 0;

// Typewriter effect
function typeWriter() {
  if (charIndex < messages[msgIndex].length) {
    messageEl.innerHTML += messages[msgIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 50); // typing speed
  } else {
    // Fade out current message before next
    setTimeout(() => {
      messageEl.style.opacity = 0; // fade out
      setTimeout(() => {
        msgIndex++;
        charIndex = 0;
        messageEl.innerHTML = "";
        if (msgIndex < messages.length) {
          messageEl.style.opacity = 1; // fade in next message
          typeWriter();
        }
      }, 1200); // duration matches CSS transition
    }, 2000); // pause to read message before fade
  }
}

// Fade audio
function fadeAudio(targetVolume, duration, callback) {
  let start = bgMusic.volume;
  let step = (targetVolume - start) / (duration / 100);
  let i = 0;
  let fade = setInterval(() => {
    i++;
    bgMusic.volume = Math.min(Math.max(start + step * i, 0), 1);
    if ((step > 0 && bgMusic.volume >= targetVolume) ||
        (step < 0 && bgMusic.volume <= targetVolume)) {
      clearInterval(fade);
      if (callback) callback();
    }
  }, 100);
}

// First click starts everything
let started = false;
document.body.addEventListener("click", () => {
  if (!started) {
    started = true;
    intro.classList.add("hidden");
    setTimeout(() => {
      intro.style.display = "none";
      container.style.opacity = 1;
      messageEl.innerHTML = "";
      msgIndex = 0;
      charIndex = 0;
      typeWriter();
    }, 1500);

    bgMusic.volume = 0;
    bgMusic.play().then(() => {
      fadeAudio(volumeSlider.value, 2000);
    });
  }
});

// Volume control
volumeSlider.addEventListener("input", (e) => {
  bgMusic.volume = e.target.value;
});


// ==UserScript==
// @name         Enhanced Dolby Surround Algorithm for YouTube
// @version      1
// @description  Optimized for improved music listening experience
// @author       Xettri Aleen
// @match        https://www.youtube.com/*
// @match        https://music.youtube.com/*
// @match        https://m.youtube.com/*
// @match        https://www.youtube-nocookie.com/*
// @license MIT
// @icon         none
// @grant        none
// ==/UserScript==

class EnhancedSoundSlider {
    constructor() {
        this.context = new AudioContext();
        this.video = document.querySelector("#movie_player > div.html5-video-container > video");
        this.source = this.context.createMediaElementSource(this.video);

        this.splitter = this.context.createChannelSplitter(2);
        this.merger = this.context.createChannelMerger(2);

        this.leftDelay = this.context.createDelay();
        this.rightDelay = this.context.createDelay();

        // Initial delay values
        this.leftDelay.delayTime.value = 0;
        this.rightDelay.delayTime.value = 0.01;

        this.source.connect(this.splitter);

        this.splitter.connect(this.leftDelay, 0);
        this.splitter.connect(this.rightDelay, 1);

        this.leftDelay.connect(this.merger, 0, 0);
        this.rightDelay.connect(this.merger, 0, 1);

        this.merger.connect(this.context.destination);

        // Create and append a styled delay slider element
        this.delaySlider = document.createElement('input');
        this.delaySlider.type = 'range';
        this.delaySlider.min = '0';
        this.delaySlider.max = '0.1'; // You can adjust the max delay time as needed
        this.delaySlider.step = '0.001';
        this.delaySlider.value = this.rightDelay.delayTime.value.toString();

        // Apply styles to the slider
        this.delaySlider.style.position = 'fixed';
        this.delaySlider.style.top = '10px';
        this.delaySlider.style.left = '10px';
        this.delaySlider.style.width = '150px'; // Adjust the width as needed
        this.delaySlider.style.zIndex = '9999';

        // Additional styling using CSS
        this.delaySlider.style.background = 'linear-gradient(to right, #FF8C00, #FFD700)';
        this.delaySlider.style.border = 'none';
        this.delaySlider.style.borderRadius = '5px';
        this.delaySlider.style.padding = '5px';
        this.delaySlider.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
        this.delaySlider.style.cursor = 'pointer';

    
        this.updateDelayTime = this.updateDelayTime.bind(this);

       
        this.delaySlider.addEventListener('input', this.updateDelayTime);

      
        document.body.appendChild(this.delaySlider);
    }

    updateDelayTime() {
        this.rightDelay.delayTime.value = parseFloat(this.delaySlider.value);
    }
}

// Instantiate the class
const enhancedSoundSlider = new EnhancedSoundSlider();

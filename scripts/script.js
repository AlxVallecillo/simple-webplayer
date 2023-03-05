
const $ = document;
const vid = $.querySelector('video');


/**
 *  we will be creatig the sections that will caontain the buttons of the player.
 * it must have the following buttons ::
 * 
 * PLAY
 * PAUSE
 * VOLUME
 * Speed Up\Down Video (.5, 1.0, 1.5, 2.0);
 * Skip 10 secs 
 */

// Create the main section that wil contain the control buttons
const controlsSection = $.createElement('section');
controlsSection.style.textAlign = 'center';

/**
 *  In this section we will create a
 * - PROGRESS BAR
 */
const progressBar = $.createElement('progress');
progressBar.setAttribute('max', 1);
progressBar.setAttribute('value', 0);
vid.addEventListener('timeupdate', function () {
    progressBar.value = vid.currentTime.toFixed(2) / vid.duration.toFixed(2);
});
vid.onclick = checkVideo;
$.addEventListener('keypress', (ev) => {
    if (ev.code == 'Space')
        checkVideo();
})

/** ChECK IF THE VIDEO IS IN A PAUSED STATE 
 * AND IF NOT PLAY THE VIDEO 
 */

function checkVideo() {
    if (vid.paused) {
        vid.play();
    } else vid.pause();
}

// Create the PAUSE and PLAY button

const playBtn = $.createElement('button');
playBtn.appendChild(
    $.createTextNode('Play')
);
playBtn.classList.add('round');
playBtn.addEventListener('click', () => {
    vid.play();
});

const pauseBtn = $.createElement('button');
pauseBtn.appendChild(
    $.createTextNode('Pause')
);
pauseBtn.classList.add('round');
pauseBtn.addEventListener('click', () => {
    vid.pause();
});


/** CREATE THE VOLUME ELEMENTS
 * -LABELS
 * -PROGRESS ELEM
*/

const volLabelDn = $.createElement('label');
volLabelDn.appendChild(
    $.createTextNode('Vol-'));

const volumeBar = $.createElement('input');
volumeBar.setAttribute('type', 'range');
volumeBar.setAttribute('value', 100);
volumeBar.setAttribute('max', 100);
volumeBar.setAttribute('min', 0);

const volLableUp = $.createElement('label');
volLableUp.appendChild(
    $.createTextNode('Vol+')
);

volumeBar.addEventListener('input', function (ev) {
    vid.volume = ev.target.valueAsNumber / 100;
    // console.log(volumeBar.valueAsNumber);
});

/** Create the volume progress bar container. */

const volumeContainer = $.createElement('div');
volumeContainer.classList.add('vol-container');
volumeContainer.append(
    volLabelDn,
    volumeBar,
    volLableUp
);

/** CREATE THE PLAYBACK SPEED BUTTONS. 
 * X0.5 SPEED
 * 1.0 SPEED
 * X1.5 SPEED 
 * X2 SPEED
*/

/**
 * before doing looping to add multiple elems the container must first exist 
    like the one we have below 
 */

const speedsBtnDiv = $.createElement('div');
const speeds = [.5, 1, 1.5, 2];
speeds.map(function (elem) {
    const speedBtn = $.createElement('button');
    speedBtn.appendChild(
        $.createTextNode(`x${elem}`)
    )
    speedBtn.addEventListener('click', () => {
        vid.playbackRate = `${elem}`;
    })

    /**
     * Using the MAP() method we create 4 buttons 
     * 
     * and then below add them to the DOM
     */
    speedsBtnDiv.appendChild(speedBtn)
});

/** CREATE THE 
 * -rewind and 
 * -forwardRewind Buttons  */


const rewindBtn = $.createElement('button');
rewindBtn.style.transform = 'rotate(-.25turn)';
rewindBtn.innerHTML = '<span>&#8634</span>'
rewindBtn.addEventListener('click', () => {
    vid.currentTime -= 5;        // add functionality to the rewinds
})
rewindBtn.classList.add('skip');

const forwardRewindBtn = $.createElement('button');
forwardRewindBtn.style.transform = 'rotate(.25turn)';
forwardRewindBtn.innerHTML = '<span>&#8635</span>'
forwardRewindBtn.addEventListener('click', () => {
    vid.currentTime += 5;    // add functionality to the rewinds
})
forwardRewindBtn.classList.add('skip');

const rewBtnContainer = $.createElement('div');
rewBtnContainer.append(
    rewindBtn,
    forwardRewindBtn
)

/** ADDING CHILD ELEMS TO BODY */

controlsSection.append(
    progressBar,
    playBtn,
    pauseBtn,
    volumeContainer,
    speedsBtnDiv,
    rewBtnContainer
);


$.body.appendChild(controlsSection);

/** */
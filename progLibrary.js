const NUM_MAJOR_PROG = 32;
const NUM_MINOR_PROG = 40;

var pianoA = new Audio();
pianoA.src = "audio/A.wav";

// songKeysMajor
const songKeysMajor = {
    songKeyA: ['A','Bm','C','D','E','Fm'],
    songKeyBb: ['Bb','Cm','Dm','Eb','F','Gm'],
    songKeyB: ['B','C#m','D#m','E','F#','G#m'],
    songKeyC: ['C','Dm','Em','F','G','Am'],
    songKeyCs: ['C#','D#m','E#m','F#','G#','A#m'],
    songKeyD: ['D','Em','F#m','G','A','Bm'],
    songKeyEb: ['Eb','Fm','Gm','Ab','Bb','Cm'],
    songKeyE: ['E','F#m','G#m','A','B','C#m'],
    songKeyF: ['F','Gm','Am','Bb','C','Dm'],
    songKeyFs: ['F#','G#','A#m','B','C#','D#m'],
    songKeyG: ['G','Am','Bm','C','D','Em'],
    songKeyGs: ['G#','A#m','B#m','C#','D#','E#m']
};

// Object songKeysMinor
// Contains objects of each minor Key and their chords
const songKeysMinor = {
    songKeyA: ['Am','Bdim','C','Dm','Em','F','G'],
    songKeyB: ['Bm','Cdim','D','Em','Fm','G','A'],
    songKeyC: ['Cm','Ddim','Eb','Fm','Gm','Ab','Bb'],
    songKeyCs: ['C#m','D#dim','E','F#m','G#m','A','B'],
    songKeyD: ['Dm','Edim','F','Gm','Am','Bb','C'],
    songKeyE: ['Em','F#dim','G','Am','Bm','C','D'],
    songKeyF: ['Fm','Gdim','Ab','Bbm','Cm','Db','Eb'],
    songKeyG: ['Gm','Adim','Bb','Cm','Dm','Eb','F']
}
// majorProgs
// Library of major chord progressions
const majorProgs =
[
    [1,4,5,4],[1,5,1,5],[1,4,1,4],[2,5,1,4],
    [1,5,6,4],[1,4,5,5],[1,1,4,5],[1,4,5,6],
    [1,6,4,5],[6,4,1,5],[1,4,6,5],[1,2,3,2],
    [1,2,4,2],[1,2,5,2],[1,2,3,4],[1,2,5,2],
    [1,6,1,6],[1,2,6,6],[1,1,2,1],[1,3,2,1],
    [1,4,4,1],[1,1,5,6],[1,1,4,1],[1,2,5,5],
    [1,3,2,3],[1,1,3,1],[1,5,3,5],[1,2,5,3],
    [1,5,1,4],[1,3,5,1],[1,2,5,5],[1,1,2,5]
]

// minorProgs
const minorProgs =
[
    [1,6,7,1],[1,6,7,6],[1,6,7,7],[1,4,7,1],
    [1,4,7,4],[1,4,7,7],[1,4,5,1],[1,4,5,4],
    [1,4,5,5],[1,6,3,7],[1,5,1,1],[1,7,3,1],
    [1,7,7,1],[1,1,7,1],[1,7,5,1],[1,5,7,1],
    [1,3,4,5],[1,5,7,7],[1,1,7,5],[1,1,5,7],
    [1,1,3,3],[1,3,1,1],[1,1,3,1],[1,1,5,1],
    [1,1,5,5],[1,1,5,5],[1,5,1,5],[1,3,5,7],
    [1,5,3,7],[1,7,5,3],[1,7,7,5],[1,7,5,5],
    [1,6,6,1],[1,6,5,3],[1,5,6,3],[1,5,5,6],
    [1,3,5,6],[1,6,3,5],[1,1,6,3],[1,1,5,3]
]

var currentKey = "songKeyA";
var currentNumProg1 = [1,1,1,1];
var currentNumProg2 = [1,1,1,1];
var currentNumProg3 = [1,1,1,1];
var chordProg1 = ['','','',''];
var chordProg2 = ['','','',''];
var chordProg3 = ['','','',''];
var majorMinor = "Major";
var selector = 0;
var style;

// set style to an initial 'AAAA'
document.getElementById("StyleSelector").selectedIndex = 1;
style = 'AAAA';


// get inital progression
GetNumProg();

// setSongKey
// sets currentKey variable
function setSongKey (newKey) {
    currentKey = newKey;
    GetChordProg(currentKey);
}
// upon change of selector, change majorMinor variable
function setMajorMinor(tempMajor){
    majorMinor = tempMajor;
    GetNumProg();
}

// Uses the mood selector to change the values in MajorMinor and Style
function setSongMood (newMood) {
    switch(newMood) {
    case 'Happy':
    document.getElementById("MajorMinorSelector").selectedIndex = "0";
    document.getElementById("StyleSelector").selectedIndex = "2";
    setMajorMinor('Major');
        break;
    case 'Sad':
    document.getElementById("MajorMinorSelector").selectedIndex = "1";
    document.getElementById("StyleSelector").selectedIndex = "4";
    setMajorMinor('Minor');
        break;
    case 'Angry':
    document.getElementById("MajorMinorSelector").selectedIndex = "1";
    document.getElementById("StyleSelector").selectedIndex = "1";
    setMajorMinor('Minor');
        break;
    case 'Lovely':
    document.getElementById("MajorMinorSelector").selectedIndex = "0";
    document.getElementById("StyleSelector").selectedIndex = "3";
    setMajorMinor('Major');
        break;
    case 'Fearful':
    document.getElementById("MajorMinorSelector").selectedIndex = "1";
    document.getElementById("StyleSelector").selectedIndex = "4";
    setMajorMinor('Minor');
        break;
    default:
        //code block
    }
    GetChordProg(currentKey);
} 

function setStyle(newStyle){
    style = newStyle;
    /* this was intended to be a substitute for playing the chord progression audio, but we're doing that now.
    switch (newStyle){
        case 'AAAA' :
            window.alert("The simplest style of playing. Play the whole chord all at once without any alteration.");
            break;

        case 'ABAB' :
            window.alert("Switch between hitting just the root of the chord and the rest of it's notes back and forth.");
            break;

        case 'ABBB' :
            window.alert("Hit the root of the chord once, then for the rest of it's play time, play all notes of the chord.");
            break;

        case 'ABCD' :
            window.alert("Play the notes of each chord in an arpeggiated (one note at a time) fashion.");
            break;
    } */
}


// GetNumProg
// Takes in a number progression and changes it to a number progression
// randomly pulled from library
function GetNumProg() {
    switch(majorMinor){
        case 'Major' :
            currentNumProg1 = majorProgs[Math.floor((Math.random() * NUM_MAJOR_PROG))];
            currentNumProg2 = majorProgs[Math.floor((Math.random() * NUM_MAJOR_PROG))];
            currentNumProg3 = majorProgs[Math.floor((Math.random() * NUM_MAJOR_PROG))];
            break;
        case 'Minor' :
            currentNumProg1 = minorProgs[Math.floor((Math.random() * NUM_MINOR_PROG))];
            currentNumProg2 = minorProgs[Math.floor((Math.random() * NUM_MINOR_PROG))];
            currentNumProg3 = minorProgs[Math.floor((Math.random() * NUM_MINOR_PROG))];
            break;
    }
    GetChordProg(currentKey);
}

// GetChordProg
// Converts a number prog to a chord prog based on current key
function GetChordProg (currentKey) {
        switch(majorMinor){
            case 'Major' :

                for (i=0;i<4;i++) {
                    chordProg1[i] = songKeysMajor[currentKey][currentNumProg1[i]-1];
                    chordProg2[i] = songKeysMajor[currentKey][currentNumProg2[i]-1];
                    chordProg3[i] = songKeysMajor[currentKey][currentNumProg3[i]-1];
                }
                break;
            
            case 'Minor':
                for (i=0;i<4;i++) {
                    chordProg1[i] = songKeysMinor[currentKey][currentNumProg1[i]-1];
                    chordProg2[i] = songKeysMinor[currentKey][currentNumProg2[i]-1];
                    chordProg3[i] = songKeysMinor[currentKey][currentNumProg3[i]-1];
                }
                break;
        }
        displayProgression(chordProg1, chordProg2, chordProg3);
}

// displayProgression
// displays the calculated progression
function displayProgression (chordProg1, chordProg2, chordProg3) {
    
    document.getElementById('progression1').innerHTML = chordProg1[0];
    document.getElementById('progression2').innerHTML = chordProg1[1];
    document.getElementById('progression3').innerHTML = chordProg1[2];
    document.getElementById('progression4').innerHTML = chordProg1[3];

    document.getElementById('progression5').innerHTML = chordProg2[0];
    document.getElementById('progression6').innerHTML = chordProg2[1];
    document.getElementById('progression7').innerHTML = chordProg2[2];
    document.getElementById('progression8').innerHTML = chordProg2[3];

    document.getElementById('progression9').innerHTML = chordProg3[0];
    document.getElementById('progression10').innerHTML = chordProg3[1];
    document.getElementById('progression11').innerHTML = chordProg3[2];
    document.getElementById('progression12').innerHTML = chordProg3[3];

    updateDiagrams(chordProg1, chordProg2, chordProg3)
}

// updates chord diagrams and the chord name displayed next to them
function updateDiagrams (chordProg1, chordProg2, chordProg3) {
    switch(selector){
        case(0):
        chordProg1 = convertSharps(chordProg1);   
            document.getElementById('chord1name').innerHTML = chordProg1[0];
            document.getElementById('chord2name').innerHTML = chordProg1[1];
            document.getElementById('chord3name').innerHTML = chordProg1[2];
            document.getElementById('chord4name').innerHTML = chordProg1[3];

            document.getElementById('chord1').src = "diagrams/" + chordProg1[0] + ".jpg";
            document.getElementById('chord2').src = "diagrams/" + chordProg1[1] + ".jpg";
            document.getElementById('chord3').src = "diagrams/" + chordProg1[2] + ".jpg";
            document.getElementById('chord4').src = "diagrams/" + chordProg1[3] + ".jpg";
            break;
        case(1):
        chordProg2 = convertSharps(chordProg2);
            document.getElementById('chord1name').innerHTML = chordProg2[0];
            document.getElementById('chord2name').innerHTML = chordProg2[1];
            document.getElementById('chord3name').innerHTML = chordProg2[2];
            document.getElementById('chord4name').innerHTML = chordProg2[3];

            document.getElementById('chord1').src = "diagrams/" + chordProg2[0] + ".jpg";
            document.getElementById('chord2').src = "diagrams/" + chordProg2[1] + ".jpg";
            document.getElementById('chord3').src = "diagrams/" + chordProg2[2] + ".jpg";
            document.getElementById('chord4').src = "diagrams/" + chordProg2[3] + ".jpg";
            break;

        case(2):
        chordProg3 = convertSharps(chordProg3);
            document.getElementById('chord1name').innerHTML = chordProg3[0];
            document.getElementById('chord2name').innerHTML = chordProg3[1];
            document.getElementById('chord3name').innerHTML = chordProg3[2];
            document.getElementById('chord4name').innerHTML = chordProg3[3];

            document.getElementById('chord1').src = "diagrams/" + chordProg3[0] + ".jpg";
            document.getElementById('chord2').src = "diagrams/" + chordProg3[1] + ".jpg";
            document.getElementById('chord3').src = "diagrams/" + chordProg3[2] + ".jpg";
            document.getElementById('chord4').src = "diagrams/" + chordProg3[3] + ".jpg";
            break;
    }
}

function clickAlertMessage() {
    window.alert("Alert!");
}

// convertSharps
// converts sharp characters (#) to an (s) for file readability.
function convertSharps (prog) {
    var newProg = ['','','',''];
    for(i = 0; i < 4; ++i) {
        newProg[i] = prog[i].replace(/#/, "s");
    }
    return newProg;
}

function clickOnProg(integer) {
    selector = integer;
    displayProgression(chordProg1, chordProg2, chordProg3);

}

function playChord(index) {
    var prog;
    switch(selector) {
        case(0): prog = chordProg1;
        break;
        case(1): prog = chordProg2;
        break;
        case(2): prog = chordProg3;
        break;
    }

    var audio = new Audio();
    audio.src = "audio/" + style + "/" + prog[index] + ".wav";
    audio.play();
}

function playProgression() {
    var prog;
    switch(selector) {
        case(0): prog = chordProg1;
        break;
        case(1): prog = chordProg2;
        break;
        case(2): prog = chordProg3;
        break;
    }

    var index = 1;
    var audio = new Audio();
    audio.src="audio/" + style + "/" + prog[0] + ".wav";
    audio.play();
    document.getElementById('chord' + index).className = "highlight";
    audio.onended = function() {
        if(index < 4) {
            audio.src="audio/" + style + "/" + prog[index] + ".wav";
            document.getElementById('chord' + (index+1)).className = "highlight";
            document.getElementById('chord' + (index)).className = "resize";
            audio.play();
            index++;
        }
    }
    document.getElementById('chord4').className = "resize";
}


// https://www.w3schools.com/js/tryit.asp?filename=tryjs_intro_lightbulb  was used to understand updating the pictures 
// playing audio files sequentially: https://pro9ram.wordpress.com/2013/02/21/playing-html-5-audio-sequentially-via-javascript/
// cont.: https://stackoverflow.com/questions/27363891/javascript-play-audio-one-after-another-html5/27364285#27364285
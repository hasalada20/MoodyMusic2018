
const NUM_MAJOR_PROG = 11;
const NUM_MINOR_PROG = 11;

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
    songKeyAm: ['Am','Bdim','C','Dm','Em','F','G'],
    songKeyBm: ['Bm','Cdim','D','Em','Fm','G','A'],
    songKeyCm: ['Cm','Ddim','Eb','Fm','Gm','Ab','Bb'],
    songKeyCsm: ['C#m','D#dim','E','F#m','G#m','A','B'],
    songKeyDm: ['Dm','Edim','F','Gm','Am','Bb','C'],
    songKeyEm: ['Em','F#dim','G','Am','Bm','C','D'],
    songKeyFm: ['Fm','Gdim','Ab','Bbm','Cm','Db','Eb'],
    songKeyGm: ['Gm','Adim','Bb','Cm','Dm','Eb','F']
}
// majorProgs
// Library of major chord progressions
const majorProgs =
[
  [1,4,5,4],[1,5,1,5],[1,4,1,4],[2,5,1,4],
  [1,5,6,4],[1,4,5,5],[1,1,4,5],[1,4,5,6],
  [1,6,4,5],[6,4,1,5],[1,4,6,5]
]

// minorProgs
const minorProgs =
[
[1,6,7,1],[1,6,7,6],[1,6,7,7],[1,4,7,1],
[1,4,7,4],[1,4,7,7],[1,4,5,1],[1,4,5,4],
[1,4,5,5],[1,6,3,7],[2,5,1,1]
]

var currentKey = 'songKeyA';
var currentNumProg = [1,1,1,1];
GetNumProg();
// setSongKey
// sets currentKey variable
function setSongKey (newKey) {
    currentKey = newKey;
    GetChordProg(currentKey);
}

function setSongMood (newMood) {
    switch(newMood) {
    case 'Happy':
    document.getElementById("MajorMinorSelector").selectedIndex = "0";
    document.getElementById("StyleSelector").selectedIndex = "2";
        break;
    case 'Sad':
    document.getElementById("MajorMinorSelector").selectedIndex = "1";
    document.getElementById("StyleSelector").selectedIndex = "4";
        break;
    case 'Angry':
    document.getElementById("MajorMinorSelector").selectedIndex = "1";
    document.getElementById("StyleSelector").selectedIndex = "1";
        break;
    case 'Lovely':
    document.getElementById("MajorMinorSelector").selectedIndex = "0";
    document.getElementById("StyleSelector").selectedIndex = "3";
        break;
    case 'Fearful':
    document.getElementById("MajorMinorSelector").selectedIndex = "1";
    document.getElementById("StyleSelector").selectedIndex = "4";
        break;
    default:
        //code block
    }
    GetChordProg(currentKey);
} 

// GetNumProg
// Takes in a number progression and changes it to a number progression
// randomly pulled from library
function GetNumProg() {
    currentNumProg = majorProgs[Math.floor((Math.random() * NUM_MAJOR_PROG))];
    GetChordProg(currentKey);
}

// GetChordProg
// Converts a number prog to a chord prog based on current key
function GetChordProg (currentKey) {
    var chordProg = ['','','',''];
        for (i=0;i<4;i++) {
            chordProg[i] = songKeysMajor[currentKey][currentNumProg[i]-1];
        }
    displayProgression(chordProg);
}
function displayProgression (chordProg) {
    document.getElementById('progression').innerHTML = chordProg;
}
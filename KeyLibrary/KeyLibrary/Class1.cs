namespace KeyLibrary
{
    public class KeyLibrary { 

        public static string[,] SongKeys = new string[7, 7] { 
            {"A","Bm","C","D","E","Fm","Gdim"},
            {"B","C#m","D#m","E","F#","G#m","Adim"},
            {"C","Dm","Em","F","G","Am","Bdim"},
            {"D","Em","F#m","G","A","Bm","Cdim"},
            {"E","F#m","G#m","A","B","C#m","Ddim"},
            {"F","G#m","A#m","B","C","D#m","Edim"},
            {"G","Am","Bm","C","D","Em","Fdim"}
        };
    
    // takes in a numbered progression and returns a progression with chords based on the key
    public static string[] GetChordProgression(int[] arr, int keyVal) {
            string[] ChordProgression = { "","","","" };
            ChordProgression[0] = SongKeys[keyVal, arr[0]];
            ChordProgression[1] = SongKeys[keyVal, arr[1]];
            ChordProgression[2] = SongKeys[keyVal, arr[2]];
            ChordProgression[3] = SongKeys[keyVal, arr[3]];
            return ChordProgression;
        }
}

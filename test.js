

const fs = require('fs');

fs.writeFile('./logs.log', "Hello World", (err) => {
  console.log("err");
});

// class Letter {
//   constructor(letter, hasBeenGuessed) {
//     this.letter = letter;
//     this.hasBeenGuessed = hasBeenGuessed;
//   }

//   isGuessed() {
//     if (this.hasBeenGuessed) {
//       return this.letter;
//     }

//     return '_';
//   }

//   guess(char) {
//     if (char === this.letter) {
//       this.hasBeenGuessed = true;
//     }
//   }
// }


// class Word {
//   constructor(letters) {
//     this.letters = letters;
//   }


//   guess(guessedLetter) {
//     for (const obj of this.letters) {
//       if (guessedLetter === obj.letter) {
//         obj.guess(guessedLetter);
//       }
//     }
//   }
// }



// const f = new Letter('f', false);
// const a = new Letter('a', false);
// const g = new Letter('g', false);

// const newWord = new Word([f, a, g]);
// newWord.guess('f');
// newWord.guess('g');
// console.log(newWord);



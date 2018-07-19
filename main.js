
	// Here are the 100 most popular words in English, as totally
// stolen from here: https://gist.github.com/gravitymonkey/2406023
var commonWords = [
  "the","of","and","a","to","in","is","you","that","it","he",
  "was","for","on","are","as","with","his","they","I","at","be",
  "this","have","from","or","one","had","by","word","but","not",
  "what","all","were","we","when","your","can","said","there",
  "use","an","each","which","she","do","how","their","if","will",
  "up","other","about","out","many","then","them","these","so",
  "some","her","would","make","like","him","into","time","has",
  "look","two","more","write","go","see","number","no","way",
  "could","people","my","than","first","water","been","call",
  "who","oil","its","now","find","long","down","day","did","get",
  "come","made","may","part"
];



var maxTry = 7 // number of available guesses
var guessedLetters = [] //store the guessed letters to prevent multiple guesses of same letters
var ranWord = 0 // word chosen randomly from array
var guessingWord = [] // holds letters that have been properly guessed
var remainingGuesses = 0 // how many attempts remaining
var finished = true // flag to reset the game
var wins = 0 //keeping track of score


function reset() {
	remainingGuesses = maxTry //since beginning of game
	


ranWord = commonWords[Math.floor(Math.random()*commonWords.length)]  //choosing the word to start the game
// console.log(ranWord)
guessedLetters=[] //empty the guessed letters array
guessingWord=[] //empty our built word array

for (var i=0; i<ranWord.length; i++) {
	guessingWord.push(" _ ") //creates underscores of length equal to your random word
}
document.getElementById("tryagain").style.cssText="display: none;" //change css to match this string
document.getElementById("loser").style.cssText="display: none;"
document.getElementById("winner").style.cssText="display: none;"
updateDisplay()

}

function updateDisplay() {
	document.getElementById("wins").innerText = "Number of victories: " + wins //update number of wins

	var guessingWordText = ""
	for (let i=0; i<guessingWord.length; i++) {
		guessingWordText += guessingWord[i] //displays how much of the word has been correctly guessed
	}
	// console.log(guessingWordText)
	document.getElementById("start").style.cssText="display: none;" //remove initial startup message
	document.getElementById("currentWord").innerText = guessingWordText //update the word
	document.getElementById("remainingGuesses").innerText = remainingGuesses //update number of guesses
	document.getElementById("guessedLetters").innerText = guessedLetters //update the pile of guessed letters
}

function evaluateGuess(letter) {
	var positions = [] //store positions of letters during the guessing
	for (var i=0; i<ranWord.length; i++) {
		if (ranWord[i] === letter) {
			positions.push(i) //add the guessed letter to any position in the word that matches that letter
		}
	}
	if (positions.length <= 0) {
		remainingGuesses-- //remove one guess if no instances of guessed letter are in positions array
	} else {
		for (var i=0; i < positions.length; i++) {
			guessingWord[positions[i]] = letter //replace the "_" in the guessingWord with the letter if matching
		}
	} 
	// console.log(letter)
}


function winner() {
	if(guessingWord.indexOf(" _ ") === -1) {
		document.getElementById("winner").style.cssText = "display: block;" //reveal the winner text if no more "_" to be found in the guessingWord array
		document.getElementById("tryagain").style.cssText = "display: block;" //reveal the reset button upon completion of game
		wins++ //advance your number of wins
		finished = true //game is over
	} 
}

function loser() {
	if(remainingGuesses <= 0) {
		document.getElementById("loser").style.cssText = "display: block;" //reveal loser text if remaining guesses reaches zero
		document.getElementById("tryagain").style.cssText = "display: block;" //reveal reset button upon completion of game
		finished = true
	}
}

function guess(letter) {
	if (remainingGuesses > 0) {
		if (guessedLetters.indexOf(letter) === -1) {
			guessedLetters.push(letter) //add to guessed letter pile if not already there
			evaluateGuess(letter) //run the evaluateGuess function to check for matches in our word
		}
	}

}

document.onkeydown = function(event) {
	if(finished) {
		reset()
		finished = false // if finished is true reset game and reset "finished" to false upon keystroke
	} else {
		if(event.keyCode >= 65 && event.keyCode <= 90) {
			guess(event.key.toLowerCase()) //change letter to upper case
			updateDisplay() //update wins, letters and guesses
			winner() // check if winner
			loser() // check if loser
		}
	}
}





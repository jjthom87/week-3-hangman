$(document).ready(function(){
      var thePic = [];

      var words = [{
        word: 'meatloaf', pic: '../images/meatloaf.jpg', sound: '../sounds/meatloaf.m4a'
      },{
        word: 'bacon', pic: '../images/bacon.png', sound: '../sounds/bacon.m4a'
      },{ 
        word: 'salad', pic: '../images/salad.jpg', sound: '../sounds/salad.m4a'
      },{ 
        word: 'corn', pic: '../images/corn.jpg', sound: '../sounds/corn.m4a'
      },{
        word: 'broccoli', pic: '../images/broccoli.jpg', sound: '../sounds/broccoli.m4a'}];

        for (var i = 0; i < words.length; i++){
          thePic.push(words[i]);
        }

      var random = thePic[Math.floor(Math.random() * thePic.length)];
      var split = random.word.split('');
  		var blankWord = [];
  		var guessedLetters = [];
      var wrongLetters = [];
  		var guessesLeft = 5;
  		var wins = 0
  		var losses = 0;
      var audio;
      var audioLoser;
      var ansPhoto;

 
  			function boardGame(){

          blankWord = [];
          guessedLetters = [];
          wrongLetters = [];
          guessesLeft = 5;
          random = thePic[Math.floor(Math.random() * thePic.length)];
          split = random.word.split('');
          for (var i=0; i < random.word.length; i++){
            blankWord.push("_")
          }
          audio = new Audio(random.sound);
          audioLoser = new Audio('../sounds/loser.m4a');


          $('#word').text("Word: " + blankWord.join(' '));
          $('#guessesLeft').text("Guesses left: " + guessesLeft);
          $('#guesses').text("Guesses: " + guessedLetters);
          $('#wins').text("Wins: " + wins);
          $('#losses').text("Losses: " + losses);

        }
  			boardGame();
  		
  document.onkeyup = function(event) { 
  	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    if ((guessedLetters.indexOf(userGuess) > -1) || (wrongLetters.indexOf(userGuess) > -1)){
        return alert("Letter Already Guessed");
        } else if (userGuess < 'a' || userGuess > 'z'){
        return alert("That's not a letter");
      } else if (split.indexOf(userGuess) > -1){
  		for (var i = 0; i < random.word.length; i++){
  			if (random.word[i] == userGuess){
          $('#message').text("Yea Brah!")
  				blankWord[i] = userGuess;
          $('#word').text("Word: " + blankWord.join(" "));
          guessedLetters.push(userGuess);
        }
  		}
    } else {
      guessesLeft--;
      wrongLetters.push(userGuess);
      $('#guesses').text("Guesses: " + wrongLetters);
      $('#message').text("Wrong! Guess Again.");
    }
    if (random.word === blankWord.join('')) {
      $('#dynImg').remove();
      $('#wins').text("Wins: " + wins++);
      $('#message').text("You're a Winner!")
      ansPhoto = $('<img id="dynImg">');
      ansPhoto.attr('src', random.pic).height(300).width(300);
      $('#picture').append(ansPhoto).fadeIn(2500).fadeOut(2500);
      audio.play();
      boardGame();
    };
    if (guessesLeft <= 0) {
      $('#dynImg').remove();
      $('#losses').text("Losses: " + losses++);
      $('#message').text("You're a total fucking loser");
      ansPhoto = $('<img id="dynImg">');
      ansPhoto.attr('src', '../images/loser.jpg').height(300).width(300);
      $('#picture').append(ansPhoto).fadeIn(2500).fadeOut(2500);
      audioLoser.play();
      boardGame();
    } 
    $('#guessesLeft').text("Guesses left: " + guessesLeft);
  };
});
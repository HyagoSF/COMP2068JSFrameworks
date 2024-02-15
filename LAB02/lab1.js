
// Calling the library
const prompt = require('prompt');

// Stating it
prompt.start();

// calling the prompt.get method, the first parameter is the object with the property name userChoice, and the second parameter is the callback function with two parameters e(error) and r(result).
prompt.get(['userChoice'], function (e, r) {
  if (e) {
    console.error('Error getting user input:', e);
    return;
  }

  // To generate a random number to use as the computer selection
  const randomValue = Math.random();
  let ComputerChoice;

  // this is the logic that was asked in the lab to generate the computer choice
  if (randomValue < 0.34) {
    ComputerChoice = 'PAPER';
  } else if (randomValue < 0.67) {
    ComputerChoice = 'SCISSORS';
  } else {
    ComputerChoice = 'ROCK';
  }

  // Display both choices
  console.log('User selected:', r.userChoice);
  console.log('Computer selected:', ComputerChoice);

  // Console.log the winner
  if (r.userChoice === ComputerChoice) {
    console.log("It's a tie!");
  } else if (
    (r.userChoice === 'ROCK' && ComputerChoice === 'SCISSORS') ||
    (r.userChoice === 'PAPER' && ComputerChoice === 'ROCK') ||
    (r.userChoice === 'SCISSORS' && ComputerChoice === 'PAPER')
  ) {
    console.log('User Wins!');
  } else {
    console.log('Computer Wins!');
  }
});

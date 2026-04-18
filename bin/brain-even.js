#!/usr/bin/env node

function isEven(number) {
  return number % 2 === 0;
}

function playGame() {
  import('readline').then(rl => {
    const readline = rl.default;
    const rlInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log('brain-even');
    console.log();
    console.log('Welcome to the Brain Games!');

    rlInterface.question('May I have your name? ', (name) => {
      name = name || 'Player';
      console.log(`Hello, ${name}!`);
      console.log('Answer "yes" if the number is even, otherwise answer "no".');

      let correctAnswers = 0;
      const quantityCorrectAnswers = 3;

      function askQuestion() {
        const number = Math.floor(Math.random() * 100) + 1;
        console.log(`Question: ${number}`);

        rlInterface.question('Your answer: ', (userAnswer) => {
          const processedAnswer = (userAnswer || '').trim().toLowerCase();

          if (processedAnswer !== 'yes' && processedAnswer !== 'no') {
            const correctAnswer = isEven(number) ? 'yes' : 'no';
            console.log(`'${processedAnswer}' is wrong answer ;(. Correct answer was '${correctAnswer}'.`);
            console.log(`Let's try again, ${name}!`);
            rlInterface.close();
            return;
          }

          const expectedAnswer = isEven(number) ? 'yes' : 'no';

          if (processedAnswer === expectedAnswer) {
            console.log('Correct!');
            correctAnswers++;

            if (correctAnswers === quantityCorrectAnswers) {
              console.log(`Congratulations, ${name}!`);
              rlInterface.close();
            } else {
              askQuestion();
            }
          } else {
            const correctAnswer = isEven(number) ? 'yes' : 'no';
            console.log(`'${processedAnswer}' is wrong answer ;(. Correct answer was '${correctAnswer}'.`);
            console.log(`Let's try again, ${name}!`);
            rlInterface.close();
          }
        });
      }

      askQuestion();
    });
  });
}

playGame();

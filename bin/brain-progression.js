#!/usr/bin/env node

function generateProgression(start, step, length) {
  const progression = [];
  for (let i = 0; i < length; i++) {
    progression.push(start + i * step);
  }
  return progression;
}

function createQuestion() {
  const start = Math.floor(Math.random() * 20) + 1;
  const step = Math.floor(Math.random() * 10) + 1;
  const length = Math.floor(Math.random() * 6) + 5;

  const progression = generateProgression(start, step, length);

  const hiddenIndex = Math.floor(Math.random() * length);
  const correctAnswer = progression[hiddenIndex];

  const questionProgression = [...progression];
  questionProgression[hiddenIndex] = '..';

  return {
    question: questionProgression.join(' '),
    correctAnswer: correctAnswer
  };
}

function playGame() {
  import('readline').then(rl => {
    const readline = rl.default;
    const rlInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log('brain-progression');
    console.log();
    console.log('Welcome to the Brain Games!');

    rlInterface.question('May I have your name? ', (name) => {
      name = name || 'Player';
      console.log(`Hello, ${name}!`);
      console.log('What number is missing in the progression?');

      let correctAnswers = 0;
      const quantityCorrectAnswers = 3;

      function askQuestion() {
        const { question, correctAnswer } = createQuestion();

        console.log(`Question: ${question}`);

        rlInterface.question('Your answer: ', (userAnswer) => {
          const processedAnswer = (userAnswer || '').trim();

          if (!/^-?\d+$/.test(processedAnswer)) {
            console.log(`'${processedAnswer}' is wrong answer ;(. Correct answer was '${correctAnswer}'.`);
            console.log(`Let's try again, ${name}!`);
            rlInterface.close();
            return;
          }

          const userNumber = parseInt(processedAnswer, 10);

          if (userNumber === correctAnswer) {
            console.log('Correct!');
            correctAnswers++;

            if (correctAnswers === quantityCorrectAnswers) {
              console.log(`Congratulations, ${name}!`);
              rlInterface.close();
            } else {
              askQuestion();
            }
          } else {
            console.log(`'${userNumber}' is wrong answer ;(. Correct answer was '${correctAnswer}'.`);
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

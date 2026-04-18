#!/usr/bin/env node

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function generateRandomNumber(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playGame() {
    import('readline').then(rl => {
        const readline = rl.default;
        const rlInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('brain-gcd');
        console.log();
        console.log('Welcome to the Brain Games!');

        rlInterface.question('May I have your name? ', (name) => {
            name = name || 'Player';
            console.log(`Hello, ${name}!`);
            console.log('Find the greatest common divisor of given numbers.');

            let correctAnswers = 0;
            const quantityCorrectAnswers = 3;

            function askQuestion() {
                const num1 = generateRandomNumber();
                const num2 = generateRandomNumber();

                const correctAnswer = gcd(num1, num2);

                console.log(`Question: ${num1} ${num2}`);

                rlInterface.question('Your answer: ', (userAnswer) => {
                    const processedAnswer = (userAnswer || '').trim();

                    if (!/^\d+$/.test(processedAnswer)) {
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

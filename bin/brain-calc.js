#!/usr/bin/env node

function generateRandomNumber(min = 1, max = 50) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomOperation() {
    const operations = ['+', '-', '*'];
    const randomIndex = Math.floor(Math.random() * operations.length);
    return operations[randomIndex];
}

function calculateExpression(num1, operation, num2) {
    switch (operation) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;

    }
}

function playGame() {
    import('readline').then(rl => {
        const readline = rl.default;
        const rlInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('brain-calc');
        console.log();
        console.log('Welcome to the Brain Games!');

        rlInterface.question('May I have your name? ', (name) => {
            name = name || 'Player';
            console.log(`Hello, ${name}!`);
            console.log('What is the result of the expression?');

            let correctAnswers = 0;
            const quantityCorrectAnswers = 3;

            function askQuestion() {
                const num1 = generateRandomNumber();
                const num2 = generateRandomNumber();

                const operation = generateRandomOperation();

                
                const expression = `${num1} ${operation} ${num2}`;
                const correctAnswer = calculateExpression(num1, operation, num2);

                console.log(`Question: ${expression}`);

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

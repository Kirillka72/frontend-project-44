#!/usr/bin/env node

function isPrime(num) {
  if (num <= 1) {
    return false
  }
  if (num === 2) {
    return true
  }
  if (num % 2 === 0) {
    return false
  }

  const sqrt = Math.floor(Math.sqrt(num))
  for (let i = 3; i <= sqrt; i += 2) {
    if (num % i === 0) {
      return false
    }
  }
  return true
}

function generateRandomNumber(min = 2, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function playGame() {
  import('readline').then((rl) => {
    const readline = rl.default
    const rlInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    console.log('brain-prime')
    console.log()
    console.log('Welcome to the Brain Games!')

    rlInterface.question('May I have your name? ', (name) => {
      name = name || 'Player'
      console.log(`Hello, ${name}!`)
      console.log('Answer "yes" if given number is prime. Otherwise answer "no".')

      let correctAnswers = 0
      const quantityCorrectAnswers = 3

      function askQuestion() {
        const number = generateRandomNumber()

        console.log(`Question: ${number}`)

        rlInterface.question('Your answer: ', (userAnswer) => {
          const processedAnswer = (userAnswer || '').trim().toLowerCase()

          if (processedAnswer !== 'yes' && processedAnswer !== 'no') {
            const correctAnswer = isPrime(number) ? 'yes' : 'no'
            console.log(`'${processedAnswer}' is wrong answer ;(. Correct answer was '${correctAnswer}'.`)
            console.log(`Let's try again, ${name}!`)
            rlInterface.close()
            return
          }

          const expectedAnswer = isPrime(number) ? 'yes' : 'no'

          if (processedAnswer === expectedAnswer) {
            console.log('Correct!')
            correctAnswers++

            if (correctAnswers === quantityCorrectAnswers) {
              console.log(`Congratulations, ${name}!`)
              rlInterface.close()
            }
            else {
              askQuestion()
            }
          }
          else {
            const correctAnswer = isPrime(number) ? 'yes' : 'no'
            console.log(`'${processedAnswer}' is wrong answer ;(. Correct answer was '${correctAnswer}'.`)
            console.log(`Let's try again, ${name}!`)
            rlInterface.close()
          }
        })
      }

      askQuestion()
    })
  })
}

playGame()

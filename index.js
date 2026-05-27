const prompt = require("prompt-sync")();
const maxAttempts = 6;

// BANCO DE PALAVRAS
const category = {
    Cores: [
        "Azul",
        "Vermelho",
        "Verde",
        "Amarelo",
        "Roxo",
        "Laranja",
        "Preto",
        "Branco",
        "Cinza",
        "Rosa",
    ],
    Animais: [
        "Cachorro",
        "Gato",
        "Elefante",
        "Leao",
        "Tigre",
        "Macaco",
        "Girafa",
        "Coelho",
        "Cavalo",
        "Zebra",
    ],
    Frutas: [
        "Banana",
        "Maca",
        "Laranja",
        "Uva",
        "Morango",
        "Abacaxi",
        "Melancia",
        "Pera",
        "Manga",
        "Kiwi",
    ],
};

// DESENHOS DA FORCA
const hangman = [
    `
    +----+
    |    |
    |
    |
    |
    |
    ==============
    `,

    `
    +----+
    |    |
    |    O
    |
    |
    |
    ==============
    `,

    `
    +----+
    |    |
    |    O
    |    |
    |
    |
    ==============
    `,

    `
    +----+
    |    |
    |    O
    |   /|
    |
    |
    ==============
    `,

    `
    +----+
    |    |
    |    O
    |   /|\\
    |
    |
    ==============
    `,

    `
    +----+
    |    |
    |    O
    |   /|\\
    |   /
    |
    ==============
    `,

    `
    +----+
    |    |
    |    O
    |   /|\\
    |   / \\
    |
    ==============
    `
];

// FUNÇÕES
function drawGame( randomCategory, wrongGuesses, answerArray, usedLetters, gameMessage){
    console.clear();
    console.log(`🎯 Categoria: ${randomCategory}\n`);
    console.log(hangman[wrongGuesses]);
    console.log(answerArray.join(" "));
    console.log("\n📝 Letras usadas:", usedLetters.join(", "));
    console.log(`\n❤️ Tentativas restantes: ${ maxAttempts - wrongGuesses }\n`);
    if (gameMessage !== "")
        console.log("\n" + gameMessage + "\n");
    
}

function validGuess(guess){
    return guess != null && guess.length === 1;
}

function gameProgress(guess, word, array){
    let correctGuess = 0;
    guess = guess.toLowerCase()
    for (let i = 0; i < word.length; i++){
        if (word[i].toLowerCase() === guess.toLowerCase()){
            if (array[i] === "_") {
                array[i] = word[i];
                correctGuess++;
            }
        }
    }
    return correctGuess;
}

// FUNÇÃO PRINCIPAL
function startGame(){

    // Nome do jogador
    const name = prompt("Digite seu nome: ");
    console.clear();
    console.log(`🎮 Olá, ${name}! Bem-vindo ao jogo da forca! 🎮`);
    console.log(
    "Tente adivinhar a palavra antes que a forca seja completada! Boa sorte! 🍀"
    );
    console.log("\nDigite 0 se quiser sair do jogo.\n");

    // Sorteio da categoria
    const categories = Object.keys(category);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    // Sorteio da palavra
    const words = category[randomCategory];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    // Cria o array de resposta
    let answerArray = Array(randomWord.length).fill("_");
    let remainingLetters = randomWord.length;
    let wrongGuesses = 0;
    let usedLetters = [];
    let gameMessage = "";

    // LOOP PRINCIPAL
    while ( remainingLetters > 0 && wrongGuesses < maxAttempts){
        drawGame( randomCategory, wrongGuesses, answerArray, usedLetters, gameMessage);
        let guess = prompt("Digite uma letra: ");

        // sair do jogo
        if (guess === "0") {
            console.log("\nJogo encerrado!");
            return;
        }
        guess = guess.toLowerCase();
        // validação
        if (!validGuess(guess)){
            gameMessage = "❌ Por favor, digite apenas UMA letra!";
            continue;
        }
        // letra repetida
        if (usedLetters.includes(guess)){
            gameMessage = "⚠️ Você já tentou essa letra!";
            continue;
        }
        usedLetters.push(guess);
        // atualiza progresso
        let correctLetter = gameProgress(guess, randomWord, answerArray);
        // erro
        if (correctLetter === 0) {
            wrongGuesses++;
            gameMessage = "❌ Letra incorreta!";
        }else{
            remainingLetters -= correctLetter;
        }
    }
    // PONTUAÇÃO
    let score = 0;
    score = correctLetter * 10;

    // RESULTADO FINAL
    drawGame( randomCategory, wrongGuesses, answerArray, usedLetters, gameMessage);
    console.log("\n==============================");
    console.log(`👤 Jogador: ${name}`);
    if (remainingLetters === 0) {
        console.log("🏆 Resultado: Vitória!");
    }else{
        console.log("💀 Resultado: Derrota!");
    }
    console.log(`🔤 Palavra correta: ${randomWord}`);
    console.log(`⭐ Pontuação: ${score}`);
    console.log("==============================\n");
    // JOGAR NOVAMENTE
    let playAgain =
    prompt("Deseja jogar novamente? (s/n): ");

    if (playAgain.toLowerCase() === "s") {
        console.clear();
        startGame();
    }else
        console.log("\n🎮 Obrigado por jogar!");
}
// INICIA O JOGO
startGame();
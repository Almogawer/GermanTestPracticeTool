
let totalNotes = 0; // Variable to track total notes
let bad = 0;
let total = 0;
let word = "Limonade";
let currentPosition = 0; // Variable global per fer el seguiment de la posició actual
let order = 0;

let words = {
    "Limonade": ["die", "lemonade"],
    "Wurst": ["die", "sausage"],
    "Kirsche": ["die", "cherry"],
    "Apfel": ["der", "apple"],
    "Karrotte": ["die", "carrot"],
    "Banane": ["die", "banana"],
    "Orange": ["die", "orange"],
    "Käse": ["der", "cheese"],
    "Gurke": ["die", "cucumber"],
    "Birne": ["die", "pear"],
    "Brot": ["das", "bread"],
    "Huhn": ["das", "chicken"],
    "Ei": ["das", "egg"],
    "Reis": ["der", "rice"],
    "Erdbeere": ["die", "strawberry"],
    "Milch": ["die", "milk"],
    "Zucker": ["der", "sugar"],
    "Keks": ["der", "das", "biscuit"],
    "Paprika": ["der", "pepper"],
    "Fleisch": ["das", "meat"],
    "Zwiebel": ["die", "onion"],
    "Erdapfer": ["der", "potato"],
    "Kartoffel": ["die", "potato"],
    "Schocolade": ["die", "chocolate"],
    "Bier": ["das", "beer"],
    "Kaffe": ["der", "coffee"],
    "Suppe": ["die", "soup"],
    "Ketchup": ["das", "ketchup"],
    "Knoblauch": ["der", "garlic"],
    "Wasser": ["das", "water"],
    "Zitrone": ["die", "lemon"],
    "Kürbis": ["der", "pumpkin"],
    "Sauce": ["die", "sauce"],
    "Tee": ["der", "tea"],
    "Avocado": ["die", "avocado"],
    "Pizza": ["die", "pizza"],
    "Saft": ["der", "juice"],
    "Wein": ["der", "wine"],
    "Mehl": ["das", "flour"],
    "Joghurt": ["das", "der", "yogurt"],
    "Butter": ["die", "butter"],
    "Kuchen": ["der", "cake"],
    "Essig": ["der", "vinegar"],
    "Öl": ["das", "oil"],
    "Torte": ["die", "gateau"],
    "Nudel": ["die", "noodle"],
    "Cola": ["die", "cola"],
    "Tomaten": ["die", "tomato"],
    "Paradeiser": ["der", "tomato"],
    "Eis": ["das", "ice cream"],
    "Energydrink": ["der", "energy drink"],
    "Gemüse": ["das", "vegetables"],
    "Obst": ["das", "fruit"],
    "Kaugummi": ["der", "chewing gum"],
    "Gugelhupf": ["der", "ring cake"],
    "Salat": ["der", "salad"],
    "Hafer": ["der", "oats"],
    "Semmel": ["die", "bread roll"],
    "Pommes frites": ["die", "french fries"]
};

function getRandomWord() {
    let keys = Object.keys(words);
    let randomIndex = Math.floor(Math.random() * keys.length);
    let randomKey = keys[randomIndex];
    return {
        word: randomKey,
        details: words[randomKey]
    };
}


function getOrderWord() {
    let keys = Object.keys(words);
    let randomKey = keys[currentPosition];
    currentPosition++; // Incrementa la posició per al proper ús
    return {
        word: randomKey,
        details: words[randomKey]
    };
}



function startQuiz() {
    document.getElementById("startPage").classList.add("hidden"); // Hide the start page
    document.getElementById("quizPage").classList.remove("hidden"); // Show the quiz page
    updateTotalNotes();
    order = 0;
    displayQuestion();
    
}

function startQuiznormal() {
    document.getElementById("startPage").classList.add("hidden"); // Hide the start page
    document.getElementById("quizPage").classList.remove("hidden"); // Show the quiz page
    updateTotalNotes();
    order = 1;
    displayQuestionOrder();
    
}

function displayQuestionOrder() {
    let randomWord = getOrderWord();
    word = randomWord.word;
    let details = randomWord.details;
    let article = details[0];
    let translation = details[1];
    let questionDiv = document.getElementById("question");
    questionDiv.innerHTML = `
        <p>Guess the article and the translation of this german word:</p>
        <p>${word}</p>
        <input type="text" id="userArticle" placeholder="Article (die, der, das)">
        <input type="text" id="userTranslation" placeholder="English translation">
        <p><button onclick="checkAnswer('${word}')">Check answer</button><\p>
    `;

}


function updateTotalNotes() {
    document.getElementById("good").textContent = `Well done: ${totalNotes}`;
    document.getElementById("bad").textContent = `Errors: ${bad}`;
    document.getElementById("total").textContent = `Total Tries: ${total}`;
}

function displayQuestion() {
    let randomWord = getRandomWord();
    word = randomWord.word;
    let details = randomWord.details;
    let article = details[0];
    let translation = details[1];
    let questionDiv = document.getElementById("question");
    questionDiv.innerHTML = `
        <p>Guess the article and the translation of this german word:</p>
        <p>${word}</p>
        <input type="text" id="userArticle" placeholder="Article (die, der, das)">
        <input type="text" id="userTranslation" placeholder="English translation">
        <p><button onclick="checkAnswer('${word}')">Check answer</button><\p>
    `;
}

function checkAnswer(word) {
    let userArticle = document.getElementById("userArticle").value.trim().toLowerCase();
    let userTranslation = document.getElementById("userTranslation").value.trim().toLowerCase();
    let answer = words[word];

    let isArticleCorrect = answer.includes(userArticle);
    let isTranslationCorrect = answer.includes(userTranslation);

    if (isArticleCorrect && isTranslationCorrect) {
        showFeedback("Correct!", "success", userArticle, userTranslation, word);
        totalNotes++; // Increment total notes on correct answer
    } else if (isArticleCorrect && !isTranslationCorrect) {
        showFeedback(`Partially incorrect. The article for '${word}' is '${userArticle}' correct! But the translation is incorrect. The correct is '${answer[answer.length-1]}'`, "warning", userArticle, userTranslation, word);
        totalNotes += 0.5;
        bad += 0.5;
    } else if (!isArticleCorrect && isTranslationCorrect) {
        showFeedback(`Partially incorrect. The article for '${word}' is not '${userArticle}' its '${answer[0]}'! But the translation is correct.`, "warning", userArticle, userTranslation, word);
        totalNotes += 0.5;
        bad += 0.5;
    } else {
        bad++;
        showFeedback(`Incorrect. The article for '${word}' is '${answer[0]}' and the translation is '${answer[answer.length-1]}'.`, "error", userArticle, userTranslation, word);
    }
    total++;
    updateTotalNotes();

    // Clear fields and display another question
    document.getElementById("userArticle").value = "";
    document.getElementById("userTranslation").value = "";
    if(order===1) displayQuestionOrder();
    else displayQuestion();
}

function showFeedback(message, type, userArticle, userTranslation, word) {
    let popupMessage = document.getElementById("popupMessage");
    popupMessage.innerHTML = `<p>${message}</p><p>Your response: '${userArticle} '${word}' -> '${userTranslation}'</p>`;
    let popup = document.getElementById("customPopup");
    popup.classList.remove("success", "warning", "error");
    popup.classList.add(type);
    displayPopup();
}

function displayPopup() {
    let popup = document.getElementById("customPopup");
    popup.style.display = "block";
}

function closePopup() {
    let popup = document.getElementById("customPopup");
    popup.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for Enter key press
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            if (document.getElementById("customPopup").style.display === "block") {
                closePopup();
            } else {
                checkAnswer(word);
            }
        }
    });

    displayQuestion();
});

displayQuestion();

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
    "das Keks": ["der/das", "biscuit"],
    "Paprika": ["der", "pepper"],
    "Fleisch": ["das", "meat"],
    "Zwiebel": ["die", "onion"],
    "Erdapfer": ["der", "potatoe"],
    "Kartoffel": ["die", "potatoe"],
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
    "Joghurt": ["das", "der", "yoghurt"],
    "Butter": ["die", "butter"],
    "Kuchen": ["der", "cake"],
    "Essig": ["der", "vinegar"],
    "Öl": ["das", "oil"],
    "Torte": ["die", "gateau"],
    "Nudel": ["die", "noodle"],
    "Cola": ["die", "cola"],
    "Tomate = der Paradeiser": ["die", "tomato"],
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

let totalNotes = 0; // Variable to track total notes
let bad = 0;
let total = 0;

function startQuiz() {
    document.getElementById("startPage").classList.add("hidden"); // Hide the start page
    document.getElementById("quizPage").classList.remove("hidden"); // Show the quiz page
    updateTotalNotes();
    displayQuestion();
    
}


function updateTotalNotes() {
    document.getElementById("good").textContent = `Well done: ${totalNotes}`;
    document.getElementById("bad").textContent = `Errors: ${bad}`;
    document.getElementById("total").textContent = `Total Tries: ${total}`;
}

function displayQuestion() {
    let randomWord = getRandomWord();
    let word = randomWord.word;
    let details = randomWord.details;
    let article = details[0];
    let translation = details[1];
    let questionDiv = document.getElementById("question");
    questionDiv.innerHTML = `
        <p>Guess the article and the translation of this german word:</p>
        <p>${word}</p>
        <input type="text" id="userArticle" placeholder="Article (die, der, das, der/das)">
        <input type="text" id="userTranslation" placeholder="English translation (without caps)">
        <button onclick="checkAnswerJaume('${word}')">Check answer</button>
    `;
}

function checkAnswerJaume(word) {
    let userArticle = document.getElementById("userArticle").value.trim().toLowerCase();
    let userTranslation = document.getElementById("userTranslation").value.trim().toLowerCase();
    let answer = words[word];

    let isArticleCorrect = answer.includes(userArticle);
    let isTranslationCorrect = answer.includes(userTranslation);

    if (isArticleCorrect && isTranslationCorrect) {
        showFeedback("Correct!", "success", userArticle, userTranslation, word);
        totalNotes++; // Increment total notes on correct answer
    } else if (isArticleCorrect && !isTranslationCorrect) {
        showFeedback(`Partially incorrect. The article for '${word}' is '${userArticle}' correct! But the translation is incorrect.`, "warning", userArticle, userTranslation, word);
        totalNotes += 0.5;
        bad += 0.5;
    } else if (!isArticleCorrect && isTranslationCorrect) {
        showFeedback(`Partially incorrect. The article for '${word}' is not '${userArticle}' its '${answer[0]}'! But the translation is correct.`, "warning", userArticle, userTranslation, word);
        totalNotes += 0.5;
        bad += 0.5;
    } else {
        bad++;
        showFeedback(`Incorrect. The article for '${word}' is '${answer[0]}' and the translation is '${answer[1]}'.`, "error", userArticle, userTranslation, word);
    }
    total++;
    updateTotalNotes();

    // Clear fields and display another question
    document.getElementById("userArticle").value = "";
    document.getElementById("userTranslation").value = "";
    displayQuestion();
}


function checkAnswer(word) {
    let userArticle = document.getElementById("userArticle").value.trim().toLowerCase();
    let userTranslation = document.getElementById("userTranslation").value.trim().toLowerCase();
    let answer = words[word];
    if (userArticle === answer[0] && userTranslation === answer[1]) {
        showFeedback("Correct!", "success", userArticle, userTranslation, word);
        totalNotes++; // Increment total notes on correct answer
        
    } else if (userArticle === answer[0] && userTranslation !== answer[1]) {
        showFeedback(`Partially incorrect. The article for '${word}' is '${answer[0]}' correct! But the translation is ${answer[1]}`, "warning", userArticle, userTranslation,word);
        totalNotes+= 0.5;
        bad+= 0.5;
    } else if (userArticle !== answer[0] && userTranslation === answer[1]) {
        showFeedback(`Partially incorrect. The article for '${word}' is not '${userArticle}' its '${answer[0]}'! But the translation is correct.`, "warning", userArticle, userTranslation,word);
        totalNotes+=0.5;
        bad+=0.5;
    } else {
        bad++;
        showFeedback(`Incorrect. The article for '${word}' is '${answer[0]}' and the translation is '${answer[1]}'.`, "error", userArticle, userTranslation,word);
    }
    total++;
    updateTotalNotes();

    // Clear fields and display another question
    document.getElementById("userArticle").value = "";
    document.getElementById("userTranslation").value = "";
    displayQuestion();
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

displayQuestion();
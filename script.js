// Light and Dark Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
}

// Personalized Greeting Message
function displayGreeting() {
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) {
        greeting = "Good morning! Today is a great day to connect.";
    } else if (hour < 18) {
        greeting = "Good afternoon! Remember, you are never alone.";
    } else {
        greeting = "Good evening! Reflect on the positives today.";
    }
    document.getElementById('greetingMessage').innerText = greeting;

    // Random motivational message
    const motivationalMessages = [
        "You are stronger than you think.",
        "Keep pushing forward, one day at a time.",
        "You are doing an amazing job, don't forget to smile.",
        "Every step you take makes a difference.",
        "Your feelings are valid, and you are not alone."
    ];
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    document.getElementById('motivationalMessage').innerText = randomMessage;
}

// Save Reflection
function saveReflection() {
    const reflection = document.getElementById('reflectionInput').value;
    if (reflection) {
        alert("Reflection saved. Thank you for sharing your feelings! You are taking a great step towards self-awareness.");
        document.getElementById('reflectionInput').value = '';
    } else {
        alert("Please enter your reflection before saving.");
    }
}

// Save Mood and Update Chart
let moodData = [];
function saveMood() {
    const mood = document.getElementById('moodSlider').value;
    moodData.push({ date: new Date().toLocaleDateString(), mood: parseInt(mood) });
    updateMoodChart();
    updateProgressDashboard();
}

function updateMoodChart() {
    const ctx = document.getElementById('moodChart').getContext('2d');
    const dates = moodData.map(entry => entry.date);
    const moods = moodData.map(entry => entry.mood);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Mood Over Time',
                data: moods,
                borderColor: 'rgba(90, 109, 228, 0.7)',
                fill: false
            }]
        }
    });
}

// Save Social Goal
function saveGoal() {
    const goal = document.getElementById('goalSelector').value;
    if (goal) {
        document.getElementById('goalMessage').innerText = `You've set the goal: "${goal}". Great step forward! Remember, each small action counts!`;
    } else {
        alert("Please select a goal before saving.");
    }
}

// Post to Community Forum
let forumPosts = [];
function postToForum() {
    const post = document.getElementById('forumPost').value;
    if (post) {
        forumPosts.push({ post, likes: 0 });
        document.getElementById('forumPost').value = '';
        updateForum();
    } else {
        alert("Please write something before posting.");
    }
}

function updateForum() {
    const forumDiv = document.getElementById('forumPosts');
    forumDiv.innerHTML = '';
    forumPosts.forEach((item, index) => {
        forumDiv.innerHTML += `
            <div class="forumPost">
                <p>${item.post}</p>
                <button onclick="likePost(${index})">❤️ ${item.likes}</button>
            </div>`;
    });
}

function likePost(index) {
    forumPosts[index].likes += 1;
    updateForum();
}

// Virtual Companion Chatbot
function sendMessage() {
    const userMessage = document.getElementById('userInput').value;
    if (userMessage) {
        addMessageToChat('You', userMessage);
        generateResponse(userMessage);
        document.getElementById('userInput').value = '';
    }
}

function addMessageToChat(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateResponse(userMessage) {
    const responses = [
        "I'm here for you. Let's take it one day at a time.",
        "I understand. Have you tried writing down how you're feeling?",
        "Remember, you are never alone. Would you like a suggestion on what to do today?",
        "You're doing great. Let's focus on something positive."
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    setTimeout(() => {
        addMessageToChat('Companion', response);
    }, 1000);
}

// Update Progress Dashboard
function updateProgressDashboard() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    const moodCount = [0, 0, 0, 0, 0];

    moodData.forEach((entry) => {
        moodCount[entry.mood - 1]++;
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'],
            datasets: [{
                label: 'Mood Frequency',
                data: moodCount,
                backgroundColor: 'rgba(90, 109, 228, 0.7)'
            }]
        }
    });
}

// Display Greeting on Load
window.onload = displayGreeting;

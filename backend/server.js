require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/progress', require('./routes/progress'));
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    if (!message) return res.json({ reply: "I didn't quite catch that. How are you feeling right now?" });

    const msg = message.toLowerCase();
    let reply = "";

    if (msg.includes("craving") || msg.includes("urge") || msg.includes("smoke") || msg.includes("drink")) {
        reply = "I know these cravings feel overwhelming right now, but remember they are temporary. They usually pass in 10-15 minutes. Use the red emergency button to practice your breathing—you can outlast this!";
    } else if (msg.includes("relapse") || msg.includes("give up") || msg.includes("fail")) {
        reply = "Please don't be too hard on yourself. A setback is just that—a setback, not the end of your journey. Forgive yourself, reset your mindset, and let's try again today.";
    } else if (msg.includes("sad") || msg.includes("depress") || msg.includes("alone")) {
        reply = "You are absolutely not alone in this fight. Recovery can feel isolating, but you are taking incredibly brave steps to heal your mind and body. I'm right here with you.";
    } else if (msg.includes("stress") || msg.includes("anxious") || msg.includes("panic")) {
        reply = "Stress is one of the hardest triggers to fight. Close your eyes, relax your shoulders, and try the 4-7-8 breathing method. Focus purely on the air entering your lungs.";
    } else if (msg.includes("happy") || msg.includes("good") || msg.includes("great") || msg.includes("proud")) {
        reply = "This is wonderful to hear! Celebrate this feeling. These moments of clarity and happiness are exactly why you started this journey.";
    } else if (msg.includes("bored") || msg.includes("tired")) {
        reply = "Boredom is a tricky trigger. Keep your hands and mind busy right now. Call a friend, go for a quick 10-minute walk, or listen to a podcast.";
    } else {
        const fallbacks = [
            "You are doing incredibly well. Keep taking it one day at a time.",
            "I believe in your strength. Remember why you decided to break free in the first place.",
            "Your future self is so incredibly thankful for the hard work you are putting in today.",
            "Even when it's hard, every hour you stay clean is a massive victory for your mind and body."
        ];
        reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    setTimeout(() => {
        res.json({ reply });
    }, 1000); // 1-second delay for realistic "AI thinking" effect
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

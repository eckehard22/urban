document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".card");
    let flippedCards = [];
    let lockBoard = false;

    // Karten mischen
    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    })();

    // Klick-Event
    cards.forEach(card => {
        card.addEventListener("click", () => flipCard(card));
    });

    function flipCard(card) {
        if (lockBoard || card.classList.contains("flipped")) return;

        card.classList.add("flipped");

        const imgSrc = card.getAttribute("data-image");
        const img = document.createElement("img");
        img.src = imgSrc;
        card.appendChild(img);

        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }

    function checkMatch() {
        lockBoard = true;

        const [card1, card2] = flippedCards;
        const match = card1.getAttribute("data-image") === card2.getAttribute("data-image");

        if (match) {
            flippedCards = [];
            lockBoard = false;

            checkWin();   // ⭐ Sieg prüfen

        } else {
            setTimeout(() => {
                flippedCards.forEach(card => {
                    card.classList.remove("flipped");
                    card.innerHTML = "";
                });
                flippedCards = [];
                lockBoard = false;
            }, 1000);
        }
    }

    // ⭐ Gewinner-Sound abspielen
    function playWinSound() {
        const sound = document.getElementById("win-sound");
        if (sound) {
            sound.play();
        }
    }

    // ⭐ Prüfen, ob alle Karten offen sind + Glow-Effekt
    function checkWin() {
        const flipped = document.querySelectorAll(".card.flipped");
        if (flipped.length === 12) {

            // Glow-Effekt hinzufügen
            flipped.forEach(card => card.classList.add("win-glow"));

            // Sound abspielen
            playWinSound();
        }
    }

});

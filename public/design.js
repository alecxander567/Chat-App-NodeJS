function createRandomCircles() {
    const colors = ['circle-green', 'circle-blue', 'circle-red', 'circle-yellow', 'circle-purple'];
    const container = document.querySelector('.background-container');
    const circles = [];
    const maxAttempts = 100; // Limit retries to avoid infinite loops

    for (let i = 0; i < 20; i++) {
        let circle, positionValid;
        let attempts = 0;
        
        do {
            positionValid = true; // Assume the position is valid
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomSize = Math.floor(Math.random() * (70 - 30 + 1)) + 30; // Size between 30px and 70px
            const randomTop = Math.floor(Math.random() * (container.offsetHeight - randomSize));
            const randomLeft = Math.floor(Math.random() * (container.offsetWidth - randomSize));

            // Check if the new position overlaps with any existing circles
            for (const existingCircle of circles) {
                const dx = randomLeft - existingCircle.left;
                const dy = randomTop - existingCircle.top;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < (randomSize / 2 + existingCircle.size / 2)) {
                    positionValid = false; // Overlapping, retry placement
                    break;
                }
            }

            if (positionValid) {
                circle = document.createElement('div');
                circle.classList.add('circle-design', randomColor);
                circle.style.width = `${randomSize}px`;
                circle.style.height = `${randomSize}px`;
                circle.style.top = `${randomTop}px`;
                circle.style.left = `${randomLeft}px`;
                container.appendChild(circle);

                circles.push({ top: randomTop, left: randomLeft, size: randomSize }); // Store position
            }

            attempts++;
        } while (!positionValid && attempts < maxAttempts);
    }
}

// Call function to add random circles
createRandomCircles();

console.log('Confetti Canvas:', confettiCanvas);

// Configuration
var popupBackgroundColor = '#6247aa'; // Replace with your desired color code
var confettiRibbonCount = 11;
var ribbonPaperCount = 30;
var ribbonPaperDist = 8.0;
var ribbonPaperThick = 8.0;
var confettiPaperCount = 95;
var confettiDuration = 0.1;

// Function to create Confetti Ribbons
function createConfettiRibbons() {
    var confettiRibbons = [];
    for (var i = 0; i < confettiRibbonCount; i++) {
        confettiRibbons[i] = new confetti.ConfettiRibbon(
            Math.random() * window.innerWidth,
            -Math.random() * window.innerHeight * 2,
            ribbonPaperCount,
            ribbonPaperDist,
            ribbonPaperThick,
            45,
            1,
            0.05
        );
    }
    return confettiRibbons;
}

// Function to create Confetti Papers
function createConfettiPapers() {
    var confettiPapers = [];
    for (var i = 0; i < confettiPaperCount; i++) {
        confettiPapers[i] = new confetti.ConfettiPaper(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        );
    }
    return confettiPapers;
}


var confettiCanvas = null;
// Ensure the document is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    var confettiRibbons = [];
    var confettiPapers = [];

    // Select the popup card element
    var popupCard = document.getElementById('popup-card');

    // Set initial styles for the popup card (backmost layer and zero opacity)
    popupCard.style.opacity = '0';
    popupCard.style.zIndex = '-1';  // backmost layer
    popupCard.style.display = 'none';  // Initially hide the popup card

    // Function to show the popup card
    function showPopupCard() {
        // Set initial styles (backmost layer and zero opacity)
        popupCard.style.opacity = '0';
        popupCard.style.zIndex = '9999';  // 2nd topmost layer
        popupCard.style.display = 'block';  // Set display to block when showing

        // Smoothly transition opacity to 100%
        setTimeout(function () {
            popupCard.style.opacity = '1';
            popupCard.style.zIndex = '9999';  // 2nd topmost layer
        }, 100);

        // Start confetti animation
        if (confettiCanvas) {
            confettiCanvas.start();
        }

        // Hide popup card after a delay
        setTimeout(function () {
            // Smoothly transition opacity to 0%
            popupCard.style.opacity = '0';
            // Set back to the backmost layer after the transition
            setTimeout(function () {
                popupCard.style.zIndex = '-1';  // backmost layer
                popupCard.style.display = 'none';  // Set display to none when hiding
                // Stop confetti animation
                confettiCanvas.stop();
            }, 1000); // Adjust the delay as needed
        }, 5000); // Adjust the delay as needed
    }

    // Add event listener for the "Yes" button click
    document.getElementById('yesButton').addEventListener('click', function () {
        // Show confetti popup card
        showPopupCard();
    });

    // Add event listener for the "No" button hover
    document.getElementById('noButton').addEventListener('mouseover', function () {
        // Function to calculate a random position within a specific area
        function calculateRandomPosition() {
            var areaLeft = 100;
            var areaTop = 100;
            var areaRight = 500;
            var areaBottom = 500;

            var maxX = areaRight - areaLeft - this.offsetWidth;
            var maxY = areaBottom - areaTop - this.offsetHeight;

            var newX = Math.floor(Math.random() * maxX) + areaLeft;
            var newY = Math.floor(Math.random() * maxY) + areaTop;

            return { newX, newY };
        }

        // Function to set the new position with a time delay
        function setNewPosition() {
            var { newX, newY } = calculateRandomPosition.call(this);
            this.style.position = 'absolute';
            this.style.left = newX + 'px';
            this.style.top = newY + 'px';
            this.style.zIndex = '999'; // Set a high z-index to bring the button to the top
        }

        // Initial positioning
        setNewPosition.call(this);

        // Set the new position with a slower transition
        this.style.transition = 'left 0.2s, top 0.2s';
        setNewPosition.call(this);
    });
});

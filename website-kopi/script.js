// Smooth scrolling with slower animation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop;
            const duration = 1500; // Increased duration to 1.5 seconds
            const startPosition = window.pageYOffset;
            const distance = offsetTop - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const easeInOutCubic = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                window.scrollTo(0, startPosition + (distance * easeInOutCubic));
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
            
            // Add active state to navbar item
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Modal functionality with improved error handling
const modal = document.getElementById('coffee-modal');
const modalDetails = document.getElementById('modal-details');
const closeModal = document.querySelector('.close-modal');

export function showModal(coffeeType) {
    const coffeeDetails = {
        espresso: {
            title: 'Espresso',
            description: 'Our signature espresso is crafted from carefully selected coffee beans, roasted to perfection to bring out rich flavors and intense aroma.',
            price: 'Rp 25.000',
            image: 'images/espresso.jpg',
            recipe: 'Ground coffee beans: 18-21g\nWater temperature: 90-96°C\nBrewing time: 25-30 seconds\nPressure: 9 bars',
            taste: 'Strong, bold, and intense with a rich crema layer. Notes of dark chocolate and caramel with a slightly bitter finish.'
        },
        latte: {
            title: 'Latte',
            description: 'Smooth espresso combined with steamed milk and a light layer of foam creates this coffee house classic.',
            price: 'Rp 35.000',
            image: 'images/latte.jpg',
            recipe: 'Espresso shot: 30ml\nSteamed milk: 150-180ml\nMilk foam: 1cm layer\nTemperature: 65-70°C',
            taste: 'Creamy and smooth with a balanced coffee flavor. Subtle sweetness from the steamed milk with a velvety texture.'
        },
        americano: {
            title: 'Americano',
            description: 'Hot water poured over our premium espresso creates a light layer of crema in true European style.',
            price: 'Rp 30.000',
            image: 'images/americano.jpg',
            recipe: 'Espresso shot: 30ml\nHot water: 90-120ml\nWater temperature: 90-96°C\nServing temperature: 85°C',
            taste: 'Clean and bright with the full flavor of espresso but lighter body. Maintains the complexity of espresso with less intensity.'
        }
    };

    const coffee = coffeeDetails[coffeeType];
    if (!coffee) {
        console.error('Coffee type not found:', coffeeType);
        return;
    }

    modalDetails.innerHTML = `
        <img src="${coffee.image}" alt="${coffee.title}" style="max-width: 100%; height: auto; margin-bottom: 1rem;">
        <h2>${coffee.title}</h2>
        <p>${coffee.description}</p>
        <div class="coffee-details">
            <div class="detail-section">
                <h3>Recipe</h3>
                <pre>${coffee.recipe}</pre>
            </div>
            <div class="detail-section">
                <h3>Taste Profile</h3>
                <p>${coffee.taste}</p>
            </div>
        </div>
        <p class="price">${coffee.price}</p>
        <div class="modal-buttons">
            <button onclick="closeModal()">Close</button>
            <button onclick="orderCoffee('${coffeeType}')">Order Now</button>
        </div>
    `;
    modal.style.display = 'block';
}

// Added new function for handling orders
export function orderCoffee(coffeeType) {
    alert(`Thank you for ordering ${coffeeType}! This feature will be available soon.`);
    modal.style.display = 'none';
}

// Improved modal closing functionality
function closeModalHandler() {
    modal.style.display = 'none';
}

closeModal.onclick = closeModalHandler;

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === modal) {
        closeModalHandler();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModalHandler();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // State
    let selectedTime = '';
    let selectedDate = '';
    let selectedFood = '';
    
    // Elements
    const steps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3'),
        document.getElementById('step-4'),
        document.getElementById('step-5'),
        document.getElementById('step-no')
    ];
    
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const btnBack = document.getElementById('btn-back');
    const btnNext2 = document.getElementById('btn-next-2');
    const btnNext3 = document.getElementById('btn-next-3');
    const btnNext4 = document.getElementById('btn-next-4');
    
    const btnShareInvite = document.getElementById('btn-share-invite');
    
    const datePicker = document.getElementById('date-picker');
    const timePicker = document.getElementById('time-picker');
    const errorMsg = document.getElementById('error-msg');
    
    const foodCards = document.querySelectorAll('.food-card');
    const finalHeading = document.getElementById('final-heading');
    
    const btnEmail = document.getElementById('btn-email');
    const btnWhatsapp = document.getElementById('btn-whatsapp');
    
    // Navigation Function
    function goToStep(currentStepIndex, nextStepIndex) {
        const current = steps[currentStepIndex];
        const next = steps[nextStepIndex];
        
        current.classList.add('fade-out');
        
        setTimeout(() => {
            current.classList.remove('active');
            current.classList.remove('fade-out');
            current.classList.add('hidden');
            
            next.classList.remove('hidden');
            // small delay to allow display:block to apply before animating opacity
            setTimeout(() => {
                next.classList.add('active');
            }, 50);
        }, 400); // matches css transition
    }

    // Normal NO Button
    btnNo.addEventListener('click', () => {
        goToStep(0, 5); // go to step-no
    });

    btnBack.addEventListener('click', () => {
        goToStep(5, 0); // go back to step 1
    });

    // Share Invitation Button
    btnShareInvite.addEventListener('click', () => {
        const publicUrl = "https://MilanPatel2810.github.io/my-date-invitation-app/";
        const subject = encodeURIComponent('I made something for you 🌸');
        const body = encodeURIComponent(`Hey ❤️\n\nI made this little website for you.\n\nOpen it here:\n${publicUrl}\n\n🌸`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });

    // Step 1 -> 2
    btnYes.addEventListener('click', () => {
        goToStep(0, 1);
        spawnConfetti();
    });

    // Step 2 -> 3
    btnNext2.addEventListener('click', () => {
        goToStep(1, 2);
    });

    // Step 3 -> 4
    btnNext3.addEventListener('click', () => {
        if (!datePicker.value || !timePicker.value) {
            errorMsg.classList.remove('hidden');
            return;
        }
        errorMsg.classList.add('hidden');
        selectedDate = datePicker.value;
        selectedTime = timePicker.value; // Store the raw time (e.g. "18:30")
        goToStep(2, 3);
    });

    // Step 4 Food Selection
    foodCards.forEach(card => {
        card.addEventListener('click', () => {
            // Deselect all
            foodCards.forEach(c => c.classList.remove('selected'));
            // Select clicked
            card.classList.add('selected');
            selectedFood = card.getAttribute('data-food');
            // Enable button
            btnNext4.classList.remove('disabled');
        });
    });

    // Formatting Helpers
    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
    }

    function formatTime(timeStr) {
        let [hours, minutes] = timeStr.split(':');
        hours = parseInt(hours);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes} ${ampm}`;
    }

    // Step 4 -> 5
    btnNext4.addEventListener('click', () => {
        if (btnNext4.classList.contains('disabled')) return;
        
        // Update final text
        if (selectedTime) {
            finalHeading.innerHTML = `glad you didn't say no. be ready by ${formatTime(selectedTime)}, I'm coming to get you 🚗`;
            document.getElementById('summary-date').innerText = `📅 Date: ${formatDate(selectedDate)}`;
            document.getElementById('summary-time').innerText = `⏰ Time: ${formatTime(selectedTime)}`;
            document.getElementById('summary-food').innerText = `🍽️ Food/Drink: ${selectedFood}`;
        }
        
        goToStep(3, 4);
    });

    // Share Buttons Logic
    function getEmailMessage() {
        return `Our date is confirmed ❤️\n\nDate: ${formatDate(selectedDate)}\nTime: ${formatTime(selectedTime)}\nFood/Drink: ${selectedFood}\n\nSee you there! 💕`;
    }

    function getWhatsappMessage() {
        return `She said YES! ❤️\nOur date is confirmed 🌸\n\n📅 Date: ${formatDate(selectedDate)}\n⏰ Time: ${formatTime(selectedTime)}\n🍽️ Food/Drink: ${selectedFood}\n\nSee you there! 💕`;
    }

    btnEmail.addEventListener('click', () => {
        const subject = encodeURIComponent('Our Date ❤️');
        const body = encodeURIComponent(getEmailMessage());
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });

    btnWhatsapp.addEventListener('click', () => {
        const text = encodeURIComponent(getWhatsappMessage());
        window.open(`https://wa.me/?text=${text}`, '_blank');
    });

    // Floating Flowers Animation
    function createFlower() {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.innerText = '🌸';
        
        // Randomize properties
        const startPosX = Math.random() * 100;
        const duration = Math.random() * 10 + 10; // 10-20s
        const size = Math.random() * 1.5 + 0.5; // 0.5rem - 2rem
        const delay = Math.random() * 5;
        
        flower.style.left = `${startPosX}vw`;
        flower.style.animationDuration = `${duration}s`;
        flower.style.animationDelay = `${delay}s`;
        flower.style.fontSize = `${size}rem`;
        
        document.getElementById('flower-container').appendChild(flower);
        
        // Remove after animation completes to avoid DOM bloat
        setTimeout(() => {
            flower.remove();
        }, (duration + delay) * 1000);
    }

    // Start flower loop
    setInterval(createFlower, 800);
    // Initial flowers
    for(let i=0; i<10; i++) {
        setTimeout(createFlower, Math.random() * 2000);
    }

    // Confetti Animation (for Step 2)
    function spawnConfetti() {
        const container = document.getElementById('confetti-container');
        const colors = ['#ee8fa5', '#f3a8b9', '#ffccd5', '#ffb3c6', '#ff8fa3'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                
                const startPosX = Math.random() * 100;
                const duration = Math.random() * 3 + 2; // 2-5s
                const bg = colors[Math.floor(Math.random() * colors.length)];
                
                confetti.style.left = `${startPosX}vw`;
                confetti.style.backgroundColor = bg;
                confetti.style.animation = `confettiFall ${duration}s ease-in forwards`;
                
                // Random shapes
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                }
                
                container.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, duration * 1000);
            }, Math.random() * 1000);
        }
    }
});

const stickFigure = document.querySelector('.stick-figure');
const armRight = stickFigure.querySelector('.arm.right');
const armLeft = stickFigure.querySelector('.arm.left');
const box = stickFigure.querySelector('.box');
const legRight = stickFigure.querySelector('.leg.right');
const legLeft = stickFigure.querySelector('.leg.left');
const head = stickFigure.querySelector('.head');
const body = stickFigure.querySelector('.torso');
const ground = document.querySelector('.ground'); // Assuming you have an element with class 'ground'
const moon = document.createElement('div'); // Create a div for the moon
const cloud = document.querySelector('.img');

let walkAnimationEnded = false;
let timeoutId;

// Style the moon element
moon.style.width = '50px';
moon.style.height = '50px';
moon.style.borderRadius = '50%';
moon.style.backgroundColor = 'white';
moon.style.position = 'absolute';
moon.style.top = '-60px';
moon.style.left = '50%';
moon.style.transform = 'translateX(-50%)';
moon.style.opacity = '0';
moon.style.transition = 'top 2s ease-in-out, opacity 2s ease-in-out';

document.body.appendChild(moon);

stickFigure.addEventListener('animationend', function(event) {
    if (event.animationName === 'walkAcross') {
        walkAnimationEnded = true;

        // Pause animations
        stickFigure.style.animationPlayState = 'paused';
        armRight.style.animationPlayState = 'paused';
        armLeft.style.animationPlayState = 'paused';
        legRight.style.animationPlayState = 'paused';
        legLeft.style.animationPlayState = 'paused';
        box.style.animation = 'paused';

        // Get box position before dropping
        const rect = box.getBoundingClientRect();
        const boxPosition = {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };

        // Add simple drop effect
        box.style.transform = 'translateY(53px)';
        box.style.transition = 'transform 0.3s ease-out';

        timeoutId = setTimeout(() => {
            // Remove the box from the stick figure and add it to the body
            document.body.appendChild(box);

            // Fix its position so it stays in place
            box.style.position = 'absolute';
            box.style.top = `${boxPosition.top + 53}px`; // Account for drop distance
            box.style.left = `${boxPosition.left}px`;
            box.style.transform = 'none'; // Clear transform after moving
            box.style.transition = 'none'; // Optional, removes further transitions
            cloud.style.opacity='1'
            cloud.style.animation = 'cloudcome 2s ease-in-out forwards';


            // Resume walking animation
            stickFigure.style.animation = 'walkfull 10s linear forwards';
            armRight.style.animationPlayState = 'running';
            legRight.style.animationPlayState = 'running';
            legLeft.style.animationPlayState = 'running';

            // Change background
            document.body.style.backgroundColor = 'darkgray';
            if (ground) {
                ground.style.backgroundColor = '#333';
            }

            // Show the moon
            moon.style.top = '50px';
            moon.style.opacity = '1';
        }, 500);
    }
});

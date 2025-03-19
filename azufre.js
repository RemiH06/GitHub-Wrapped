// script.js
import { main } from './sulfur.js';

export function displayColors(colors, colorContainer) {
    colorContainer.innerHTML = "";
    colors.forEach((color) => {
        const colorBox = document.createElement("div");
        colorBox.style.width = "50px";
        colorBox.style.height = "50px";
        colorBox.style.backgroundColor = `#${color}`;
        colorBox.title = `#${color}`;
        colorContainer.appendChild(colorBox);
    });
}

export function initialize() {
    const button = document.getElementById("processButton");
    const usernameInput = document.getElementById("usernameInput");
    const colorContainer = document.getElementById("colorContainer");

    button.addEventListener("click", (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim();
        if (username) {
            const tempInput = document.createElement("input");
            const tempOutput = document.createElement("div");
            tempInput.id = "passwordInput";
            tempOutput.id = "output";
            tempInput.value = username;
            document.body.appendChild(tempInput);
            document.body.appendChild(tempOutput);

            main(); // Usamos la función importada

            const outputText = tempOutput.textContent;
            const match = outputText.match(/Valores Finales: (.+)/);
            const colors = match ? match[1].split(", ") : [];

            tempInput.remove();
            tempOutput.remove();

            displayColors(colors, colorContainer);
        } else {
            alert("Por favor, ingresa un nombre de usuario.");
        }
    });
}

document.addEventListener("DOMContentLoaded", initialize);
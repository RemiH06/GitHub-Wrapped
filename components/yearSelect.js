
class YearSelect extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const currentYear = new Date().getFullYear();
        const yearsToShow = this.getAttribute("years") || 6; //Si no le pasas un numero en especifico, muestra los ultimos 5

        const select = document.createElement("select");

        for (let i = 0; i < yearsToShow; i++) {
            const year = currentYear - i;
            const option = document.createElement("option");
            option.value = year;
            option.textContent = year;
            select.appendChild(option);
        }

        const style = document.createElement("style");
        style.textContent = `
            select {
                padding: 10px;
                border: none;
                border-radius: 5px;
                margin: 5px;
                font-size: 16px;
                cursor: pointer;
            }
        `;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(select);
    }
}

// Registrar el Web Component
customElements.define("year-select", YearSelect);
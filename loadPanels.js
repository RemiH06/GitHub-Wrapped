export async function loadPanels(totalPanels) {
    for (let i = 1; i <= totalPanels; i++) {
        try {
            console.log("Intentando loader panel", i)
            const response = await fetch(`iframes/panel${i}.html`);
            const panelHTML = await response.text();
            document.body.insertAdjacentHTML('beforeend', panelHTML);
        } catch (error) {
            console.error(`Error cargando panel${i}.html`, error);
        }
    }
}
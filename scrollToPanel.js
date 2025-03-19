export function scrollToPanel(panelNumber) {
    const targetPanel = document.getElementById(`panel${panelNumber}`);
    if (targetPanel) {
        targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
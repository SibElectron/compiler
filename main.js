const divider = document.getElementById('divider');
const inputContainer = document.getElementById('input-container');
const outputContainer = document.getElementById('output-container');

let isResizing = false;

divider.addEventListener('mousedown', (event) => {
    isResizing = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
    });
});

function handleMouseMove(event) {
    if (isResizing) {
        const mouseX = event.pageX;
        const containerWidth = window.innerWidth;
        const percentage = (mouseX / containerWidth) * 100;

        inputContainer.style.flex = percentage + '%';
        outputContainer.style.flex = 100 - percentage + '%';
    }
}

function updateOutput() {
    const inputCode = document.getElementById('input-code').value;
    const outputFrame = document.getElementById('output-frame').contentDocument;

    outputFrame.open();
    outputFrame.write(inputCode);
    outputFrame.close();
}

function clearCode() {
    document.getElementById('input-code').value = '';
    updateOutput();
}

function pasteCode() {
    navigator.clipboard.readText().then((text) => {
        document.getElementById('input-code').value = text;
        updateOutput();
    });
}

function compileCode() {
    updateOutput();
}

document.getElementById("html-code").addEventListener("input", updateOutput);
document.getElementById("css-code").addEventListener("input", updateOutput);

function updateOutput() {
    var htmlCode = document.getElementById("html-code").value;
    var cssCode = "<style>" + document.getElementById("css-code").value + "</style>";
    var outputFrame = document.getElementById("output-frame").contentDocument;
    outputFrame.open();
    outputFrame.write(htmlCode + cssCode);
    outputFrame.close();
}

window.onload = updateOutput;


document.getElementById('input-code').addEventListener('input', updateOutput);

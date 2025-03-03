let pdfDoc = null, pageNum = 1, scale = 1.2;
const canvas = document.getElementById("pdfCanvas");
const ctx = canvas.getContext("2d");

function loadPDF(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const typedarray = new Uint8Array(this.result);
            pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                pdfDoc = pdf;
                renderPage(pageNum);
            });
        };
        reader.readAsArrayBuffer(file);
    }
}

function renderPage(num) {
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height / 1.5;
        canvas.width = viewport.width / 1.5;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        page.render(renderContext);
    });
}

function applyFilter(filter) {
    canvas.style.filter = filter;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function editPDF() {
    alert("Edit feature is under development!");
}

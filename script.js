function convertToIco() {
    const input = document.getElementById('pngInput');
    if (!input.files.length) {
        alert('Please select a PNG file.');
        return;
    }

    const file = input.files[0];
    const fileNameWithoutExtension = file.name.replace(/\\.png$/i, '');
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const size = 64;
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, size, size);

            canvas.toBlob(function (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileNameWithoutExtension + '.ico';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 'image/x-icon');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

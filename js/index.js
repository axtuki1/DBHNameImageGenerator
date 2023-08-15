
// ちょ～適当

let currentFontFace = null;

const colorCodeToCSS = (colorCode, alpha) => {
    const red = colorCode.slice(1, 3), green = colorCode.slice(3, 5), blue = colorCode.slice(5, 7);
    return "rgba(" + parseInt(red, 16) + "," + parseInt(green, 16) + "," + parseInt(blue, 16) + "," + alpha + ")";
}

const imageGen = (fileName, name, fontSize, rightOffset, builtinFont) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1025;
    canvas.height = 104;
    const context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.textAlign = "right";
    context.font = fontSize + "px CurrentFont,'"+builtinFont+"'";
    let text = context.measureText(name);
    
    let textWidth = text.width;
    let textHeight = text.actualBoundingBoxAscent + text.actualBoundingBoxDescent;

    context.fillText(name, canvas.width - rightOffset, (canvas.height / 2) + (textHeight / 2.75));

    document.querySelector("#debug").innerHTML = "";
    document.querySelector("#debug").append(canvas);

    let link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = fileName + ".png";
    link.click();
}

const gen = () => {
    imageGen(
        document.querySelector("#fileName").value.replace(/\.png/g, ''),
        document.querySelector("#name").value,
        document.querySelector("#fontSize").value,
        document.querySelector("#borderRight").value,
        document.querySelector("#fontName").value
    );
}

const update = () => {
    document.querySelector(".name-text").innerHTML = document.querySelector("#name").value;
    document.querySelector(".draw-area").setAttribute("style",
        "border: 0px solid rgba(255,0,255,0.4);" +
        "border-top-width: " + document.querySelector("#borderUp").value + "px;" +
        "border-right-width: " + document.querySelector("#borderRight").value + "px;" +
        "border-bottom-width: " + document.querySelector("#borderDown").value + "px;" +
        "border-left-width: " + document.querySelector("#borderLeft").value + "px;" + "font-size: " + document.querySelector("#fontSize").value + "px;" +
        "font-family: CurrentFont,'"+document.querySelector("#fontName").value+"'"
    );
}

const fontLoader = (event) => {
    let reader = new FileReader();
    reader.onload = () => {
        currentFontFace = new FontFace(
            "CurrentFont",
            "url(" + reader.result + ")",
            { style: "normal", weight: "normal" }
        );
        currentFontFace.load().then(function (loadedFace) {
            document.fonts.add(loadedFace);
        }).catch(function (e) {
            console.error('font load failed...');
        });
    };

    reader.readAsDataURL(event.target.files[0]);
}

document.querySelector("#fontFile").addEventListener("input", fontLoader);

document.querySelectorAll("input").forEach(e => {
    e.addEventListener("input", update);
});

update();
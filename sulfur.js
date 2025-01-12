function main() {
    const inputElement = document.getElementById("passwordInput");
    const outputElement = document.getElementById("output");
    const password = inputElement.value;

    if (password) {
        let asciiArray = Array.from(password)
            .map(char => char.charCodeAt(0))
            .filter(val => val >= 32 && val <= 126)
            .map(val => val + 64);

        let hexArray = asciiArray.map(val => val.toString(16));

        let colorArray = hexArray.map((hexValue, index) => {
            const position = (index + 1) % 3;
            if (position === 1) return `${hexValue}YYZZ`;
            if (position === 2) return `XX${hexValue}ZZ`;
            return `XXYY${hexValue}`;
        });

        let modifiedColorArray = colorArray.map((colorValue, index) => {
            const phi = calculateFibonacci(index, hexArray.length);
            if (colorValue.includes("XX")) {
                return colorValue.replace("XX", hexArray[phi]);
            } else if (colorValue.includes("YY")) {
                return colorValue.replace("YY", hexArray[phi]);
            } else {
                return colorValue.replace("ZZ", hexArray[phi]);
            }
        });

        const eulerDecimals = "71828182845904523536028747135266249775724709369995957496696762772407663035354759457138217852516642742746639193200305992181741359662904357290033429526059563073813232862794349076323382988075319525101901157383418793070215408914993488416750924476146066808226";

        let finalArray = modifiedColorArray.map((colorValue, index) => {
            return colorValue
                .replace(/YY|ZZ/g, placeholder => {
                    const asciiValue = asciiArray[index % asciiArray.length];
                    return getEulerValue(asciiValue, eulerDecimals).toString(16).padStart(2, '0');
                });
        });

        outputElement.textContent = `Valores ASCII: ${asciiArray.join(", ")}\nValores Hexadecimales: ${hexArray.join(", ")}\nValores de Color: ${colorArray.join(", ")}\nValores Modificados: ${modifiedColorArray.join(", ")}\nValores Finales: ${finalArray.join(", ")}`;
    } else {
        outputElement.textContent = "La entrada de contraseña es nula.";
    }
}

function getEulerValue(asciiValue, eulerDecimals) {
    const position = asciiValue - 1;
    let result = "";

    for (let i = position; i < eulerDecimals.length; i++) {
        result += eulerDecimals[i];
        const numericValue = parseInt(result, 10);
        if (numericValue > 0 && numericValue < 256) {
            const inverted = parseInt(result.split("").reverse().join("") + "0", 10);
            return inverted < 256 ? inverted : numericValue;
        }
    }

    return 1;
}

function calculateFibonacci(n, arraySize) {
    if (n === 0 || n === 1) {
        return 1;
    }
    let a = 1, b = 1, result = 0;
    for (let i = 0; i < n - 1; i++) {
        result = (a + b) % arraySize;
        a = b;
        b = result;
    }
    return result;
}
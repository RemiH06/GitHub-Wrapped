function main() {
    const password = "contrasena123";

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

        const euler = generateEuler(255);
        let finalArray = modifiedColorArray.map((colorValue, index) => {
            const somePlace = Math.min(
                asciiArray[Math.max(0, index - 1)],
                asciiArray[Math.min(index, asciiArray.length - 1)]
            );
            let decimalResult = parseInt(euler.slice(somePlace, somePlace + 2), 10);
            if (decimalResult + parseInt(euler[somePlace + 1], 10) < 24) {
                decimalResult = parseInt(euler.slice(somePlace, somePlace + 3), 10);
            }
            const replacementValue = decimalResult.toString(16);
            if (colorValue.includes("ZZ")) {
                return colorValue.replace("ZZ", replacementValue);
            } else if (colorValue.includes("YY")) {
                return colorValue.replace("YY", replacementValue);
            } else {
                return colorValue.replace("XX", replacementValue);
            }
        });

        console.log("Valores ASCII de la contraseña:\n" + asciiArray.join(", "));
        console.log("Valores hexadecimales de la contraseña:\n" + hexArray.join(", "));
        console.log("Valores de color:\n" + colorArray.join(", "));
        console.log("Valores de color pero con phi:\n" + modifiedColorArray.join(", "));
        console.log("Valores de color con reemplazo final:\n" + finalArray.join(", "));
    } else {
        console.log("La entrada de contraseña es nula.");
    }
}

function hexToDecimal(hexStr) {
    return parseInt(hexStr, 16);
}

function generateEuler(decimal) {
    let euler = 1;
    let factorial = 1;
    let increment = 7;
    let decrement = 13;
    let currentDecimal = decimal;

    while (true) {
        euler = 1;
        factorial = 1;

        for (let i = 1; i <= currentDecimal; i++) {
            factorial *= i;
            euler += 1 / factorial;
        }

        if (Math.floor(euler) > 255) {
            currentDecimal -= decrement;

            if (currentDecimal <= 0) {
                currentDecimal = 7;
                increment += 7;
                decrement += 13;
            }
        } else {
            break;
        }
    }

    return euler.toFixed(100); // Adjust precision as needed
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

main();

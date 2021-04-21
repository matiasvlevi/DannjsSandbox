function request(url,c) {
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {

        c(Http.responseText)


    }
}
request('https://api.github.com/repos/matiasvlevi/dann/releases/latest',(data)=>{
    let version = JSON.parse(data).name;
    if (document.getElementById('version').textContent == "Dannjs") {
        let curr = document.getElementById('version').textContent;
        document.getElementById('version').textContent = curr + " " + version;
    }

})

function startEditor(text) {
    if (text !== undefined) {
        document.querySelector("#editor > textarea").value = text;
        let prevEditor = document.querySelector("#editor > div:nth-child(2)");
        prevEditor.parentNode.removeChild(prevEditor);
    }

    var editor = CodeMirror.fromTextArea(document.getElementById("editorText"), {
      lineNumbers: true,
      mode: "javascript",
      theme:"material-darker",
      matchBrackets: true
    });

    //runCode(getCode(editor))

    return editor;

}
function mnist() {
    const code = ""
    + "//Create the model\n"
    + "const nn = new Dann(784,10);\n"
    + "\n"
    + "// Add layers\n"
    + "nn.addHiddenLayer(256,'leakyReLU');\n"
    + "nn.addHiddenLayer(128,'leakyReLU');\n"
    + "nn.addHiddenLayer(64,'leakyReLU');\n"
    + "\n"
    + "nn.outputActivation('sigmoid');\n"
    + "nn.makeWeights();\n"
    + "\n"
    + "// Set other values\n"
    + "nn.lr = 0.001;\n"
    + "nn.setLossFunction('bce');\n"
    + "\n"
    + "// Neural Network's info\n"
    + "nn.log();\n"
    + "\n"

    + "// See an MNIST model in action: \n"
    + "//   https://github.com/matiasvlevi/MnistDannjs"

    editor = startEditor(code);
}
function dotprod(){
    const code = ""
    + "// Matrix A\n"
    + "const a = new Matrix(3,4);\n"
    + "a.set([\n"
    + "  [1,0,1,0],\n"
    + "  [0,1,0,0],\n"
    + "  [0,1,1,1]\n"
    + "])\n"
    + "console.log('a matrix:')\n"
    + "a.log({table:true})\n"
    + "\n"
    + "// Matrix B\n"
    + "const b = new Matrix(4,3);\n"
    + "b.set([\n"
    + "  [1,0,1],\n"
    + "  [0,1,0],\n"
    + "  [0,1,1],\n"
    + "  [1,0,0],\n"
    + "])\n"
    + "console.log('b matrix:')\n"
    + "b.log({table:true})\n"
    + "\n"
    + "// Dot product\n"
    + "const c = Matrix.multiply(a,b);\n"
    + "console.log('a*b matrix:')\n"
    + "c.log({table:true})\n"

    editor = startEditor(code);
}

function sampleCode() {
    const code = ""
    + "//Create model\n"
    + "const nn = new Dann(4,4);\n"
    + "//Add Layers\n"
    + "nn.addHiddenLayer(16,'leakyReLU');\n"
    + "//Log\n"
    + "nn.log();\n"

    editor = startEditor(code);
}
function XORtemplate() {
    const code = ""
    + "//Load dataset\n"
    + "const dataset = XOR;\n"
    + "\n"
    + "//Create th model\n"
    + "const nn = new Dann(2,1); \n"
    + "nn.addHiddenLayer(6,'tanH'); \n"
    + "nn.outputActivation('sigmoid'); \n"
    + "nn.makeWeights(); \n"
    + "nn.lr = 0.1; \n"
    + "nn.log(); \n"
    + "\n"
    + "//Testing before training\n"
    + "console.log('Before Training');\n"
    + "for (data of dataset) { \n"
    + "  nn.feedForward(data.input,{log:true,decimals:3});\n"
    + "}\n"
    + "\n"
    + "//Training for 10 000 epochs\n"
    + "const epoch = 10000;\n"
    + "for (let e = 0; e < epoch; e++) {\n"
    + "  for (data of dataset) {\n"
    + "    nn.backpropagate(data.input,data.output);\n"
    + "  }\n"
    + "}\n"
    + "\n"
    + "//Testing after training \n"
    + "console.log('');\n"
    + "console.log('After Training');\n"
    + "for (data of dataset) {\n"
    + "  nn.feedForward(data.input,{log:true,decimals:3});\n"
    + "}\n"

    editor = startEditor(code);
}

function blank() {
    editor = startEditor("");
}

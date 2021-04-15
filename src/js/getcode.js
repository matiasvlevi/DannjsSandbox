
const func = "(" + (function () {
    if (!console) {
        console = {};
    }
    var old = console.log;
    var logger = document.getElementById('log');

    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
        } else {
            if (typeof messgae == 'array') {
                logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
            } else {
                if (message.length <= 1) {
                    logger.innerHTML += '<br />';
                } else {
                    logger.innerHTML += "<p class='logtext'>"+ message + '</p>';
                }

            }
        }

        logger.scrollTo(0,logger.scrollHeight);

    }

    console.error = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
        } else {
            logger.innerHTML += "<p class='errtext'>"+ message + '</p>';
        }
        logger.scrollTo(0,logger.scrollHeight);
    }

}).toString() + ")();";


function getCode(editor) {
    document.getElementById('log').innerHTML = "";
    let lines = editor.display.view;
    let code = func + "\n";

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].line.text;
        if (line.search("document") !== -1) {
            //Dont allow document functions
            console.error('You do not have access to "document" commands');
        } else {
            code += line + '\n';
        }
    }
    return code;
}

function runCode(code) {
    try {
        eval(code);
    } catch (e) {
        console.error(e.toString());
    }
}

function tabMargin(tabs) {
    return tabs*16;
}
const func = "(" + (function () {
    if (!console) {
        console = {};
    }
    var old = console.log;
    var logger = document.getElementById('log');

    console.log = function (message) {
        if (typeof message == 'object') {
            let list = prettify(message);
            for (let i = 0; i < list.length; i++) {
                let numTabs = countChar(list[i],"\t")

                let style = "style='margin-left:"+tabMargin(numTabs)+"px;margin-bottom:0px;margin-top:0px;'";

                logger.innerHTML += "<p " + style + ">"+list[i] + "</p>"
            }
            //logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
        } else {
            if (typeof messgae == 'array') {
                logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
            } else {
                if (message.length <= 1) {
                    logger.innerHTML += '<br />';
                } else {


                    // let numTabs = countChar(message," ");
                    // old(numTabs)
                    // old(message)
                    // let style = "style='margin-left:"+tabMargin(numTabs)+"px;margin-bottom:0px;margin-top:0px;'";
                    //
                    // logger.innerHTML += "<p class='logtext' " + style + ">"+message + "</p>"

                    logger.innerHTML += "<p class='logtext'>"+ message + '</p>';
                }

            }
        }

        logger.scrollTo(0,logger.scrollHeight);

    }

    console.table = function (message) {


        let htmlcode = "";
        htmlcode += "<table style='margin-left:10px;margin-top:5px;padding:0px;border-collapse:collapse;'>"
        for (let i = 0 ; i < message.length;i++) {
            htmlcode += "<tr style='padding:0px;margin:0px'>"
            for (let j = 0; j < message[0].length;j++) {
                htmlcode += "<td style='margin-left:3px;padding:1px;border:solid white 1px'>"+message[i][j]+"</td>";
            }
            htmlcode += "<tr>"
        }
        htmlcode += "</table><br/>"
        logger.innerHTML += htmlcode;

        // logger.scrollTo(0,logger.scrollHeight);
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

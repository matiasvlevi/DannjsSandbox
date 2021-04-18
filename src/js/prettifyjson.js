function countChar(str,char) {
    let tabs = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == char) {
            tabs++;
        }
    }

    return tabs;
}
function prettify(json) {
    let lines = JSON.stringify(json,null,"\t").split("\n");
    return lines;
}

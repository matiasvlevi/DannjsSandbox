function countTabs(str) {
    let tabs = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == "\t") {
            tabs++;
        }
    }
    return tabs;
}
function prettify(json) {
    let lines = JSON.stringify(json,null,"\t").split("\n");
    return lines;
}

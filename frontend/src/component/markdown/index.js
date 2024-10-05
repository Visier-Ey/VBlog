import {marked} from "marked";
function loadMarkdownFile(path, target) {
    fetch(path)
        .then((response) => response.text())
        .then((text) => {
            document.getElementById(target).innerHTML = marked(text);
        });
}

export {loadMarkdownFile}

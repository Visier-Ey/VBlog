import {marked} from "marked";
function loadMarkdownFile(path, target) {
    fetch(path)
        .then((response) => response.text())
        .then((text) => {
            target.value.innerHTML = marked(text);
        });
}

export {loadMarkdownFile}

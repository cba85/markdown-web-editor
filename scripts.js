// Config
const filename = "./example.txt";

// Markdown
const md = markdownit({ breaks: true });

// Web editor

const editButton = document.querySelector("#edit");
const saveButton = document.querySelector("#save");
const cancelButton = document.querySelector("#cancel");

const errorElement = document.querySelector(".error");
const notificationElement = document.querySelector(".notification");

const viewerElement = document.querySelector("#viewer");
const editorContainer = document.querySelector("#editor-container");
const editorElement = document.querySelector("#editor");

// Functions (save, cancel)

function cancel() {
    saveButton.style.display = "none";
    cancelButton.style.display = "none";
    editButton.style.display = "inline";

    viewerElement.style.display = "block";
    editorContainer.style.display = "none";
}

async function save() {
    saveButton.style.display = "none";
    cancelButton.style.display = "none";
    editButton.style.display = "inline";

    viewerElement.style.display = "block";
    editorContainer.style.display = "none";

    const updatedContent = document.querySelector("#editor").value;

    const updatedHtml = md.render(updatedContent);
    viewerElement.innerHTML = updatedHtml;

    notificationElement.style.display = "inline";
    setTimeout(() => { notificationElement.style.display = "none"; }, 400);
}

// Viewer (get example text file)

(async () => {
    const response = await fetch(filename);

    if (response.ok) {
        const text = await response.text();
        const html = md.render(text);
        viewerElement.innerHTML = html;
    } else {
        errorElement.textContent = "Error: example.txt not found";
        errorElement.style.display = "block";
    }
})();

// Events

editButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const response = await fetch(filename);

    if (response.ok) {
        const text = await response.text();

        editButton.style.display = "none";
        saveButton.style.display = "inline";
        cancelButton.style.display = "inline";

        editorElement.textContent = text;

        viewerElement.style.display = "none";
        editorContainer.style.display = "block";
    } else {
        errorElement.textContent = "Error: example.txt not found";
        errorElement.style.display = "block";
    }
});

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    cancel();
});

saveButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await save();
});
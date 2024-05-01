const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'snippets.json');

const initializeDataFile = () => {
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, '[]', 'utf8');
    }
};

const addSnippet = (title, description, language, codeContent) => {
    const snippets = loadSnippets();
    const duplicateSnippet = snippets.find((snippet) => snippet.title === title);

    if (!duplicateSnippet) {
        snippets.push({
            title: title,
            description: description,
            language: language,
            codeContent: codeContent
        });c

        saveSnippets(snippets);
        console.log('Snippet added successfully!');
    } else {
        console.log('Snippet with this title already exists!');
    }
};

const deleteSnippet = (title) => {
    const snippets = loadSnippets();
    const remainingSnippets = snippets.filter((snippet) => snippet.title !== title);

    if (snippets.length > remainingSnippets.length) {
        console.log('Snippet deleted successfully!');
        saveSnippets(remainingSnippets);
    } else {
        console.log('No snippet found with this title!');
    }
};

const listSnippets = () => {
    return loadSnippets();
};

const viewSnippet = (title) => {
    const snippets = loadSnippets();
    const snippet = snippets.find((s) => s.title === title);

    if (snippet) {
        console.log("Snippet details:");
        console.log("Title:", snippet.title);
        console.log("Language:", snippet.language);
        console.log("Description:", snippet.description);
        console.log("Code Content:", snippet.codeContent);
        return snippet;
    } else {
        throw new Error("Snippet not found with this title!");
    }
};

const searchSnippets = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
};

const loadSnippets = () => {
    return searchSnippets();
};

const saveSnippets = (snippets) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(snippets, null, 2), 'utf8');
};

module.exports = {
    addSnippet: addSnippet,
    listSnippets: listSnippets,
    searchSnippets: searchSnippets,
    
    deleteSnippet: deleteSnippet
};

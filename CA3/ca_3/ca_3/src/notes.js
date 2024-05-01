const fs = require  ('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'BookshelfBorrowers.json');

const initializeDataFile = () => {
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, '[]', 'utf8');
    }
};

const saveBorrowers = (Borrowers) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(Borrowers, null, 2), 'utf8');
};

const loadBorrowers = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
};

const ReadBookshelf = (BookName, Genres, AuthorName, Rating) => {
    const Borrowers = loadBorrowers();
    const duplicateBorrower = Borrowers.find((Borrower) => Borrower.BookName === BookName);

    if (!duplicateBorrower) {
        Borrowers.push({
            BookName: BookName,
            Genres: Genres,
            AuthorName: AuthorName,
            Rating: Rating 
        });

        saveBorrowers(Borrowers);
        console.log('Book Borrowed Done!');
    } else {
        console.log('Book Borrowed already exists for this Book Name!');
    }
};

const cancelBookshelf = (BookName) => {
    const Borrowers = loadBorrowers();
    const remainingBorrowers = Borrowers.filter((Borrower) => Borrower.BookName !== BookName);

    if (Borrowers.length > remainingBorrowers.length) {
        console.log('Book Borrowing canceled!');
        saveBorrowers(remainingBorrowers);
    } else {
        console.log('No Borrowed found for this Book Name!');
    }
};

const listBorrowers = () => {
    return loadBorrowers();
};

const viewBorrowers = (BookName) => {
    const Borrowers = loadBorrowers();
    const Borrower = Borrowers.find((Borrower) => Borrower.BookName === BookName);

    if (Borrower) {
        console.log('Book shelf Borrowers details');
        console.log('Book Name:', Borrower.BookName);
        console.log('Genres:', Borrower.Genres);
        console.log('Author Name:', Borrower.AuthorName);
        console.log('Rating of the Book:', Borrower.Rating);
        return Borrower;
    } else {
        throw new Error('Borrowed not found for this Book Name!');
    }
};


module.exports = {
    ReadBookshelf: ReadBookshelf,
    cancelBookshelf: cancelBookshelf,
    listBorrowers: listBorrowers,
    viewBorrowers: viewBorrowers,
    initializeDataFile: initializeDataFile,
    saveBorrowers: saveBorrowers,
    loadBorrowers: loadBorrowers
};

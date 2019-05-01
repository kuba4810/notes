const path = require('path');
module.exports = (app) => {

    // Logowanie 
    app.get('/logowanie', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../' ,'client', 'notes', 'build', 'index.html'));
    });

    // Rejestracja
    app.get('/rejestracja', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../' ,'client', 'notes', 'build', 'index.html'));
    });

    // Reset
    app.get('/reset', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../' ,'client', 'notes', 'build', 'index.html'));
    });

    // Nowe hasło
    app.get('/nowe-haslo/:code', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../' ,'client', 'notes', 'build', 'index.html'));
    });

    // Notatki
    // -----------------------------------------------------------
    app.get('/notatki', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../' ,'client', 'notes', 'build', 'index.html'));
    });

    app.get('/notatki/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../' ,'client', 'notes', 'build', 'index.html'));
    });

    // Hamonogram
    // ------------------------------------------------------------
    app.get('/harmonogram', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../' ,'client', 'notes', 'build', 'index.html'));
    });

    app.get('/harmonogram/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../' ,'client', 'notes', 'build', 'index.html'));
    });

    // Profil
    // ------------------------------------------------------------
    app.get('/profil', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../' ,'client', 'notes', 'build', 'index.html'));
    });

    app.get('/profil/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../' ,'client', 'notes', 'build', 'index.html'));
    });
}
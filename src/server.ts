import express from 'express';
import path from 'path';
import app from './app';

app.use(express.static(path.join(__dirname, '../pages')));

const port = 5000;
const host = 'localhost';

function main() {
    app.listen(port, host, () => {
        console.log(`Servidor rodando em http://${host}:${port}`);
    });
}

main()
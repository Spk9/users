const express = require('express');
const fs = require('fs');
const app = express();

app.get('/api/users', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) throw err;

        const users = JSON.parse(data);

        const numberOfBackups = users.reduce((total, value) => {
            return (value.hasOwnProperty('backups')) ? total + value.backups.length : total;
        },0);

        const numberOfTickets = users.reduce((total, value) => {
            return (value.hasOwnProperty('ticketsCreated')) ? total + value.ticketsCreated.length : total;
        },0);

        res.send({"users": users, "avgTickets":(numberOfTickets/users.length).toFixed(2), "avgBackups":(numberOfBackups/users.length).toFixed(2)});
    });
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
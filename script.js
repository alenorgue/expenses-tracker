// Happy coding

// Primeros pasos: carga el fichero JSON y muestra su contenido en la consola. Luego, ya puedes implementar la iteración 1. Para mostrar la fecha legible, puedes buscar por Chat GPT o por Google como convertir un timestamp 

const fs = require('fs');

if (process.argv.includes('--list')) {
    // Leer y parsear el archivo JSON
    const data = fs.readFileSync('expenses.json', 'utf-8');
    const expenses = JSON.parse(data);

    expenses.forEach(expenses => {
        const fecha = new Date(expenses.timestamp * 1000).toLocaleDateString();
        console.log(`${expenses.id} ${fecha} - ${expenses.concept} [${expenses.category}] - ${expenses.amount}€ `);
      });
    }
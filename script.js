// Happy coding

// Primeros pasos: carga el fichero JSON y muestra su contenido en la consola. Luego, ya puedes implementar la iteración 1. Para mostrar la fecha legible, puedes buscar por Chat GPT o por Google como convertir un timestamp 

// Leer y parsear el archivo JSON
const fs = require('fs');
const data = fs.readFileSync('expenses.json', 'utf-8');
const expenses = JSON.parse(data);

if (process.argv.includes('--list')) {
  for (const expense of expenses) {
    const fecha = new Date(expense.timestamp * 1000).toLocaleDateString();
    console.log(`${expense.id} ${fecha} - ${expense.concept} - ${expense.category} - ${expense.amount}€`);
  };
}

if (process.argv.includes('--summary')) {
  let totalExpenses = 0;
  for (const expense of expenses) {
    totalExpenses += expense.amount;
  }
  console.log(`Total expenses: ${totalExpenses}€`);
}


let selectedCategory = null;


for (const arg of process.argv) {
  if (arg.startsWith('--filter-category=')) {
    selectedCategory = arg.split('=')[1];
    break;
  }
}

if (selectedCategory) {
  for (const expense of expenses) {
    if (expense.category === selectedCategory) {
      const fecha = new Date(expense.timestamp * 1000).toLocaleDateString();
      console.log(`${expense.id} ${fecha} - ${expense.concept} - ${expense.category} - ${expense.amount}€`);
    }
  }
}


const findIndex = process.argv.indexOf('--find');

if (findIndex !== -1 && process.argv[findIndex + 1]) {
  const idToFind = Number(process.argv[findIndex + 1]);
  let found = false;

  for (const expense of expenses) {
    if (expense.id === idToFind) {
      const fecha = new Date(expense.timestamp * 1000).toLocaleDateString();
      console.log(`${expense.id} ${fecha} - ${expense.concept} [${expense.category}] - ${expense.amount}€`);
      found = true;
      break; // Terminamos el bucle porque ya lo encontramos
    }
  }

  if (!found) {
    console.log(`No expenses found with id = ${idToFind}`);
  }
}
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
}

if (process.argv[2] === '--add') {
  const concept = process.argv[3];
  const category = process.argv[4];
  const amount = parseFloat(process.argv[5]);
  


  let expenses = [];
const data = fs.readFileSync('expenses.json', 'utf-8');
  expenses = JSON.parse(data);
 
  const newExpense = {
    id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
    timestamp: Math.floor(Date.now() / 1000),
    concept: concept,
    category: category,
    amount: amount
  };

  // Añadir y guardar
  expenses.push(newExpense);
  fs.writeFileSync('expenses.json', JSON.stringify(expenses, null, 2));

  console.log(' Gasto añadido con éxito:');
  for (const expense of expenses) {
    const fecha = new Date(expense.timestamp * 1000).toLocaleDateString();
    console.log(`${expense.id} ${fecha} - ${expense.concept} - ${expense.category} - ${expense.amount}€`);
  };
}
    
if (process.argv[2] === '--delete') {
  const idToDelete = parseInt(process.argv[3]);

  let expenses = [];
  const data = fs.readFileSync('expenses.json', 'utf-8');
  expenses = JSON.parse(data);

  const filteredExpenses = expenses.filter(expense => expense.id !== idToDelete);

  fs.writeFileSync('expenses.json', JSON.stringify(filteredExpenses, null, 2));
  console.log(`Expense with id = ${idToDelete} deleted.`);
  for (const expense of filteredExpenses) {
    const fecha = new Date(expense.timestamp * 1000).toLocaleDateString();
    console.log(`${expense.id} ${fecha} - ${expense.concept} - ${expense.category} - ${expense.amount}€`);
  }
}

if (process.argv[2] === '--sort') {
  const sortOrder = process.argv[3]; // 'ASC' o 'DESC'

  let expenses = [];
  const data = fs.readFileSync('expenses.json', 'utf-8');
  expenses = JSON.parse(data);

  // Ordenar los gastos según el criterio
  expenses.sort((a, b) => {
    if (sortOrder === 'ASC') {
      return a.amount - b.amount; // Orden ascendente por amount
    } 
    if (sortOrder === 'DESC') {
      return b.amount - a.amount; // Orden descendente por amount
    } 
  });

  console.log(`Sorted expenses (${sortOrder}):`);
  for (const expense of expenses) {
    const fecha = new Date(expense.timestamp * 1000).toLocaleDateString();
    console.log(`${expense.id} ${fecha} - ${expense.concept} - ${expense.category} - ${expense.amount}€`);
  }
}


// Verificamos si el comando es --export-file
if (process.argv[2] === '--export-file') {
  const fileName = process.argv[3] || 'expenses.csv'; // Nombre del archivo, por defecto 'expenses.csv'

  // Leer el archivo expenses.json
  let expenses = [];
  const data = fs.readFileSync('expenses.json', 'utf-8');
  expenses = JSON.parse(data);

  if (expenses.length === 0) {
    console.log('⚠️ No hay gastos para exportar.');
    process.exit(1);
  }

  // Crear las cabeceras del CSV
  const headers = ['id', 'timestamp', 'concept', 'category', 'amount'];
  
  // Convertir los datos de expenses a formato CSV
  const csvRows = [];
  csvRows.push(headers.join(',')); // Añadir las cabeceras

  for (const expense of expenses) {
    const fecha = new Date(expense.timestamp * 1000).toLocaleDateString(); // Convertir timestamp a fecha legible
    const row = [
      expense.id,
      fecha,
      expense.concept,
      expense.category,
      expense.amount
    ];
    csvRows.push(row.join(','));
  }

  // Unir todo el contenido en un string
  const csvContent = csvRows.join('\n');

  // Escribir el archivo CSV
  fs.writeFileSync(fileName, csvContent, 'utf-8');
  console.log(`✅ Archivo CSV exportado con éxito: ${fileName}`);
}

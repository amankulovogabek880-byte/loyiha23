const { readJson, writeJson, createId } = require('../services/fileDb');

exports.getExpenses = async (req, res) => {
  const expenses = await readJson('expenses.json');
  const { category = '' } = req.query;
  let result = [...expenses];
  if (category) {
    result = result.filter(
      (e) => e.category.toLowerCase() === String(category).trim().toLowerCase()
    );
  }
  result.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(result);
};

exports.createExpense = async (req, res) => {
  const expenses = await readJson('expenses.json');
  const { title, amount, category, date, note } = req.body;

  if (!title || !amount || !category || !date) {
    return res.status(400).json({ message: 'Majburiy maydonlar to‘ldirilmagan' });
  }

  const newExpense = {
    id: createId(expenses),
    title: String(title).trim(),
    amount: Number(amount),
    category: String(category).trim(),
    date,
    note: String(note || '').trim(),
    createdAt: new Date().toISOString(),
  };

  expenses.push(newExpense);
  await writeJson('expenses.json', expenses);
  res.status(201).json(newExpense);
};

exports.deleteExpense = async (req, res) => {
  const expenses = await readJson('expenses.json');
  const index = expenses.findIndex((item) => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Xarajat topilmadi' });
  const [deleted] = expenses.splice(index, 1);
  await writeJson('expenses.json', expenses);
  res.json({ message: 'Xarajat o‘chirildi', expense: deleted });
};

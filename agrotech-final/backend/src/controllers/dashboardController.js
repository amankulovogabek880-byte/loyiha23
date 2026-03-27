const { readJson } = require('../services/fileDb');

exports.getDashboard = async (_req, res) => {
  const products = await readJson('products.json');
  const expenses = await readJson('expenses.json');
  const leads = await readJson('leads.json');

  const totalExpenseAmount = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const averageProductPrice = products.length
    ? Math.round(products.reduce((sum, item) => sum + Number(item.price || 0), 0) / products.length)
    : 0;

  res.json({
    stats: {
      totalProducts: products.length,
      totalExpenses: expenses.length,
      totalLeads: leads.length,
      totalExpenseAmount,
      averageProductPrice,
    },
    recentProducts: [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
    recentExpenses: [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5),
    recentLeads: [...leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
  });
};

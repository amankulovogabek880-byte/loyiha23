const { readJson, writeJson, createId } = require('../services/fileDb');

exports.createLead = async (req, res) => {
  const leads = await readJson('leads.json');
  const products = await readJson('products.json');
  const { productId, buyerName, buyerPhone } = req.body;

  const product = products.find((p) => p.id === Number(productId));
  if (!product) return res.status(404).json({ message: 'Mahsulot topilmadi' });
  if (!buyerName || !buyerPhone) {
    return res.status(400).json({ message: 'Xaridor ma’lumotlari kerak' });
  }

  const newLead = {
    id: createId(leads),
    productId: product.id,
    productTitle: product.title,
    sellerPhone: product.phone,
    buyerName: String(buyerName).trim(),
    buyerPhone: String(buyerPhone).trim(),
    createdAt: new Date().toISOString(),
  };

  leads.push(newLead);
  await writeJson('leads.json', leads);
  res.status(201).json(newLead);
};

exports.getLeads = async (req, res) => {
  const leads = await readJson('leads.json');
  leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(leads);
};

const { readJson, writeJson, createId } = require('../services/fileDb');

function normalizeText(value = '') {
  return String(value).trim().toLowerCase();
}

exports.getProducts = async (req, res) => {
  const products = await readJson('products.json');
  const { search = '', category = '', region = '', sort = 'newest' } = req.query;

  let result = [...products];

  if (search) {
    const q = normalizeText(search);
    result = result.filter((p) =>
      [p.title, p.description, p.farmerName].some((v) => normalizeText(v).includes(q))
    );
  }

  if (category) {
    result = result.filter((p) => normalizeText(p.category) === normalizeText(category));
  }

  if (region) {
    result = result.filter((p) => normalizeText(p.region) === normalizeText(region));
  }

  if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
  else if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
  else result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(result);
};

exports.getProductById = async (req, res) => {
  const products = await readJson('products.json');
  const product = products.find((item) => item.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: 'Mahsulot topilmadi' });
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const products = await readJson('products.json');
  const {
    farmerName,
    title,
    category,
    description,
    quantity,
    price,
    region,
    phone,
    image,
  } = req.body;

  if (!farmerName || !title || !category || !quantity || !price || !region || !phone) {
    return res.status(400).json({ message: 'Majburiy maydonlar to‘ldirilmagan' });
  }

  const newProduct = {
    id: createId(products),
    farmerName: String(farmerName).trim(),
    title: String(title).trim(),
    category: String(category).trim(),
    description: String(description || '').trim(),
    quantity: Number(quantity),
    price: Number(price),
    region: String(region).trim(),
    phone: String(phone).trim(),
    image: image?.trim() || '',
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);
  await writeJson('products.json', products);
  res.status(201).json(newProduct);
};

exports.deleteProduct = async (req, res) => {
  const products = await readJson('products.json');
  const index = products.findIndex((item) => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Mahsulot topilmadi' });
  const [deleted] = products.splice(index, 1);
  await writeJson('products.json', products);
  res.json({ message: 'Mahsulot o‘chirildi', product: deleted });
};

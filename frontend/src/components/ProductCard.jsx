export default function ProductCard({ product, onConnect, onDelete }) {
  return (
    <article className="card product-card">
      <div className="product-image">
        {product.image ? <img src={product.image} alt={product.title} /> : <span>{product.title[0]}</span>}
      </div>
      <div className="product-body">
        <div className="product-meta-row">
          <span className="tag">{product.category}</span>
          <span className="muted">{product.region}</span>
        </div>
        <h3>{product.title}</h3>
        <p>{product.description || 'Tavsif kiritilmagan'}</p>
        <div className="product-grid">
          <div><small>Narx</small><strong>{product.price.toLocaleString()} so‘m</strong></div>
          <div><small>Miqdor</small><strong>{product.quantity} kg</strong></div>
          <div><small>Dehqon</small><strong>{product.farmerName}</strong></div>
          <div><small>Telefon</small><strong>{product.phone}</strong></div>
        </div>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={() => onConnect(product)}>Bog‘lanish</button>
          {onDelete && <button className="btn btn-danger" onClick={() => onDelete(product.id)}>O‘chirish</button>}
        </div>
      </div>
    </article>
  );
}

export default function ExpenseCard({ expense, onDelete }) {
  return (
    <article className="card expense-card">
      <div>
        <span className="tag">{expense.category}</span>
        <h3>{expense.title}</h3>
        <p>{expense.note || 'Izoh kiritilmagan'}</p>
      </div>
      <div className="expense-right">
        <strong>{expense.amount.toLocaleString()} so‘m</strong>
        <small>{expense.date}</small>
        <button className="btn btn-danger small-btn" onClick={() => onDelete(expense.id)}>O‘chirish</button>
      </div>
    </article>
  );
}

import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';

const features = [
  { title: 'Marketplace', text: 'Dehqon mahsulotini tez joylaydi, xaridor esa filter orqali tez topadi.' },
  { title: 'Xarajat hisoblovchi', text: 'Urug‘, yoqilg‘i, ishchi kuchi va boshqa xarajatlarni boshqaring.' },
  { title: 'Dashboard', text: 'Mahsulotlar, leadlar va xarajatlarni bitta joyda kuzating.' },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Afzalliklar"
            title="Nega aynan Agrotech?"
            text="Bu platforma dehqon uchun sodda, xaridor uchun qulay va investor uchun tushunarli ko‘rsatkichlar bilan qurilgan."
          />
          <div className="grid-three">
            {features.map((item) => (
              <div className="card feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="container">
          <SectionTitle
            eyebrow="Qanday ishlaydi"
            title="3 qadamda ishga tushadi"
            text="Murakkab emas. Hozirning o‘zida foydalanishni boshlasa bo‘ladi."
          />
          <div className="steps">
            <div className="card"><b>1.</b><h3>Mahsulot joylash</h3><p>Dehqon nomi, narx, miqdor va hududni kiritadi.</p></div>
            <div className="card"><b>2.</b><h3>Xaridor topish</h3><p>Xaridor marketplace orqali izlaydi va bog‘lanish so‘rovini yuboradi.</p></div>
            <div className="card"><b>3.</b><h3>Xarajatni nazorat</h3><p>Platformada xarajatlar yozilib, dashboardda ko‘rinadi.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}

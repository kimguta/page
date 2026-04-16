export default function Contact() {
  return (
    <section className="card section" id="contact">
      <p className="eyebrow">Contact</p>
      <h2 className="section-title">Let’s build the next section together</h2>
      <p className="description">
        필요한 섹션이나 데이터 구조가 있으면 바로 쪼개서 붙일 수 있습니다.
      </p>

      <form className="contact-form">
        <input type="text" placeholder="Your name" aria-label="Your name" />
        <input type="email" placeholder="Email address" aria-label="Email address" />
        <button type="submit">Send message</button>
      </form>
    </section>
  );
}

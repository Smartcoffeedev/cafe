import ContactForm from './contactForm'
import ContactAddress from './contactAddress'

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <ContactForm />
          </div>
          <div className="col-lg-6">
            <ContactAddress />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 
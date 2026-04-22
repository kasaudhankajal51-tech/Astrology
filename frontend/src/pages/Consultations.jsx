import { useState } from 'react';

function Consultations() {
  const [formData, setFormData] = useState({
    countryCode: '',
    mobile: '',
    name: '',
    email: '',
    dob: '',
    tob: '',
    location: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Booking submitted successfully!');
        setFormData({ countryCode: '', mobile: '', name: '', email: '', dob: '', tob: '', location: '' });
      } else {
        setMessage(data.error || 'Error submitting booking');
      }
    } catch (error) {
      setMessage('Error submitting booking');
    }
  };

  const openModal = () => {
    const modal = document.getElementById('bookingModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  };

  const closeModal = () => {
    const modal = document.getElementById('bookingModal');
    if (modal) {
      modal.style.display = 'none';
    }
    setMessage('');
  };

  const openPopup = (title, desc) => {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupDesc = document.getElementById('popup-desc');
    if (popup && popupTitle && popupDesc) {
      popupTitle.textContent = title;
      popupDesc.textContent = desc;
      popup.style.display = 'flex';
    }
  };

  const closePopup = () => {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'none';
    }
  };

  return (
    <>
      <section className="consultation-section">
        <h2 className="main-title">CONSULTATION</h2>

        <div className="category-bar">Marriage/Relationship</div>
        <div className="card-grid">
          <div className="card">
            <div className="card-img">
              <img src="https://images.unsplash.com/photo-1516589091380-5d8e87df6999" alt="Marriage" />
              <div className="badge purple">Consultation<br />for Married Life<br />issues</div>
            </div>
            <p>Marriage timing</p>
            <div className="btns">
              <button className="read" onClick={() => openPopup('Marriage Timing', 'Detailed consultation about your marriage timing based on birth chart analysis.')}>Read more</button>
              <button className="book" onClick={openModal}>Book Now</button>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d" alt="Manglik" />
              <div className="badge pink">Consultation<br />for Manglik<br />Dosh</div>
            </div>
            <p>Love vs arranged marriage</p>
            <div className="btns">
              <button className="read" onClick={() => openPopup('Love vs Arranged Marriage', 'Understanding your marriage prospects and compatibility.')}>Read more</button>
              <button className="book" onClick={openModal}>Book Now</button>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552" alt="Love Marriage" />
              <div className="badge pink">Consultation<br />for Love Marriage<br />Issues</div>
            </div>
            <p>Delay in marriage</p>
            <div className="btns">
              <button className="read" onClick={() => openPopup('Delay in Marriage', 'Astrological reasons and remedies for marriage delays.')}>Read more</button>
              <button className="book" onClick={openModal}>Book Now</button>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src="https://images.unsplash.com/photo-1526045612212-70caf35c14df" alt="Future Partner" />
              <div className="badge orange">Consultation<br />for Future Life<br />Partner</div>
            </div>
            <p>Relationship problems</p>
            <div className="btns">
              <button className="read" onClick={() => openPopup('Relationship Problems', 'Solutions for relationship issues through astrology.')}>Read more</button>
              <button className="book" onClick={openModal}>Book Now</button>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src="https://images.unsplash.com/photo-1526045612212-70caf35c14df" alt="Married Life" />
              <div className="badge orange">Consultation<br />for Future Life<br />Partner</div>
            </div>
            <p>Married life stability</p>
            <div className="btns">
              <button className="read" onClick={() => openPopup('Married Life Stability', 'Analysis of married life and stability factors.')}>Read more</button>
              <button className="book" onClick={openModal}>Book Now</button>
            </div>
          </div>
        </div>

        <div className="category-bar">Personal Horoscope</div>
        <div className="card-grid">
          <div className="card">
            <div className="card-img">
              <img src="https://images.unsplash.com/photo-1516589091380-5d8e87df6999" alt="Personal" />
              <div className="badge purple">Consultation<br />for Married Life<br />issues</div>
            </div>
            <p>Astrology Consultation for Married Life issues</p>
            <div className="btns">
              <button className="read" onClick={() => openPopup('Personal Horoscope', 'Complete personal horoscope analysis.')}>Read more</button>
              <button className="book" onClick={openModal}>Book Now</button>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d" alt="Mangal Dosha" />
              <div className="badge pink">Consultation<br />for Manglik<br />Dosh</div>
            </div>
            <p>Astrology Consultation for Mangal Dosha</p>
            <div className="btns">
              <button className="read" onClick={() => openPopup('Mangal Dosha', 'Analysis and remedies for Mangal Dosha.')}>Read more</button>
              <button className="book" onClick={openModal}>Book Now</button>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src="https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2" alt="Pre-Marriage" />
              <div className="badge red">Consultation<br />for Pre Marriage<br />Counselling</div>
            </div>
            <p>Consultation for Pre-Marriage Counselling</p>
            <div className="btns">
              <button className="read" onClick={() => openPopup('Pre-Marriage Counselling', 'Counselling before marriage for better understanding.')}>Read more</button>
              <button className="book" onClick={openModal}>Book Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <div id="bookingModal" className="modal" style={{ display: 'none' }}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h3>Book Consultation</h3>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input type="text" name="name" className="form-control" placeholder="Your Name *" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3 d-flex gap-2">
              <input type="text" name="countryCode" className="form-control w-25" placeholder="+91" value={formData.countryCode} onChange={handleChange} />
              <input type="text" name="mobile" className="form-control" placeholder="Mobile Number *" value={formData.mobile} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <input type="email" name="email" className="form-control" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group mb-3">
              <input type="text" name="dob" className="form-control" placeholder="Date of Birth (DD/MM/YYYY)" value={formData.dob} onChange={handleChange} />
            </div>
            <div className="form-group mb-3">
              <input type="text" name="tob" className="form-control" placeholder="Time of Birth" value={formData.tob} onChange={handleChange} />
            </div>
            <div className="form-group mb-3">
              <input type="text" name="location" className="form-control" placeholder="Birth Location" value={formData.location} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit Booking</button>
          </form>
        </div>
      </div>

      {/* Popup */}
      <div id="popup" className="popup">
        <div className="popup-content">
          <span className="close" onClick={closePopup}>&times;</span>
          <h3 id="popup-title"></h3>
          <p id="popup-desc"></p>
        </div>
      </div>

      <style>{`
        .consultation-section {
          padding: 40px 20px;
          border-radius: 12px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .main-title {
          text-align: center;
          background: linear-gradient(90deg, #0b1220, #0d1b3a);
          color: #fff;
          padding: 20px;
          border-radius: 12px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .category-bar {
          margin: 20px 0;
          background: #2f55d4;
          color: #fff;
          padding: 12px 20px;
          font-weight: 600;
          border-radius: 5px;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .card {
          background: #e6d3b3;
          padding: 10px;
          border-radius: 6px;
          transition: 0.3s;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .card-img {
          position: relative;
          overflow: hidden;
        }
        .card-img img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }
        .badge {
          position: absolute;
          bottom: -20px;
          left: 60px;
          width: 80%;
          padding: 20px;
          color: yellow;
          font-weight: bold;
          text-align: center;
          border-top-left-radius: 250px;
          border-top-right-radius: 50px;
          height: 100px;
        }
        .purple { background: #6a2c91; }
        .pink { background: #e6007e; }
        .red { background: #d4145a; }
        .orange { background: #f25c2a; }
        .card p {
          margin-top: 30px;
          font-size: 14px;
          color: #000;
        }
        .btns {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        .read {
          background: #f6b26b;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
        }
        .book {
          background: #ff6a00;
          color: #fff;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .main-title { font-size: 18px; }
          .consultation-section { padding: 80px 15px !important; }
          .category-bar { font-size: 14px; padding: 10px; }
          .card-grid { grid-template-columns: 1fr; gap: 15px; }
          .card { border-radius: 10px; padding: 12px; }
          .card-img img { height: 200px; }
        }

        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .modal-content {
          background: #fff;
          padding: 25px;
          width: 90%;
          max-width: 500px;
          border-radius: 10px;
          text-align: center;
          animation: modalFade 0.3s ease;
        }
        @keyframes modalFade {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .popup {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
        .popup-content {
          background: #fff;
          padding: 25px;
          width: 90%;
          max-width: 500px;
          border-radius: 10px;
          text-align: center;
          animation: popupFade 0.3s ease;
        }
        @keyframes popupFade {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .close {
          float: right;
          font-size: 22px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

export default Consultations;

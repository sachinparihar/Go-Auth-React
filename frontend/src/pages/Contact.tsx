import React from 'react';

const Contact: React.FC = () => {
  return (
    <body className='bodyClass'>
      <section className="sattalogo">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <a title="satta" href="/" className="blink" style={{ display: 'inline', opacity: 0.877126 }}>
                <h1 style={{ fontWeight: 700 }}>SATA</h1>
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="container py-4">
        <div className="row justify-content-center" style={{ marginBottom: 70 }}>
          <div className="col-md-7 col-lg-5 card">
            <h1 style={{ textAlign: 'center' }}>Contact Page</h1>
          </div></div>
      </div>
      <section className="somelinks" style={{ overflow: "hidden" }}>
        <a className="yellow-link mx-4" href="/legal/privacy-policy">Privacy Policy</a>
        <a className="yellow-link" href="/legal/terms-and-conditions">Terms &amp; Conditions</a>
        <br />
      </section>
      <section className="somelinks2">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <strong>@ 2022 SATA All Rights Reserved</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="somelinks">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <ul>
                <li>
                  <p style={{ color: "rgb(255, 216, 0)", fontWeight: 700 }}>
                    !! DISCLAIMER:- thesata.com is a non-commercial website. Viewing This Website Is Your Own Risk, All The Information Shown On Website Is Sponsored And We Warn You That Matka Gambling/Satta May Be Banned Or Illegal In Your Country..., We Are Not Responsible For Any Issues Or Scam..., We Respect All Country Rules/Laws... If You Not Agree With Our Site Disclaimer... Please Quit Our Site Right Now. Thank You.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}

export default Contact;
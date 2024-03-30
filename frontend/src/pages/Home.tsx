// Home.tsx
import React, { useEffect, useState } from 'react';
import VijayLaxmiForm from './VijayLaxmi';
import DubaiKingForm from './DubaiKing'; // Import DubaiKingForm
import HimachalForm from './Himachal'; // Import HimachalForm
import DelhiKingsForm from './DelhiKings';



const Home = (props: {

  numberDates: { number: number; date: string; }[];
  setNumberDates: React.Dispatch<React.SetStateAction<{ number: number; date: string; }[]>>;
  delhiKingsNumbers: { number: number; date: string; }[];
  setDelhiKingsNumbers: React.Dispatch<React.SetStateAction<{ number: number; date: string; }[]>>;
  vijayLaxmiNumbers: { number: number; date: string; }[];
  setVijayLaxmiNumbers: React.Dispatch<React.SetStateAction<{ number: number; date: string; }[]>>;
  dubaiKingNumbers: { number: number; date: string; }[]; // Add dubaiKingNumbers prop
  setDubaiKingNumbers: React.Dispatch<React.SetStateAction<{ number: number; date: string; }[]>>; // Add setDubaiKingNumbers prop
  himachalDates: any[];
  setHimachalDates: React.Dispatch<React.SetStateAction<any[]>>;

  name: string,
  justLoggedOut: boolean
}) => {

  const isLoggedIn = props.name !== '' && !props.justLoggedOut;
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);


  if (!isLoggedIn) {
  } else {
  }

  return (

    <body className='bodyClass'>
      <section className="sattalogo">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <a title="satta" href="/" className="blink" style={{ display: 'inline', opacity: 0.877126 }}>
                <h1 style={{ fontWeight: 700, animation: 'blinker 1s linear infinite' }}>SATA</h1>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="circlebox" style={{ flex: 1 }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="liveresult" id='clockbox'>
                <div style={{ display: "block" }} className="blur ">
                  {currentDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}          </div>
                <p style={{ padding: "0" }} className="hintext ">हा भाई यही आती हे सबसे पहले खबर रूको और देखो</p>
              </div>
              <div style={{ padding: "0" }} className="sattaname ">

              </div>
            </div>
          </div>


        </div>
      </section>

      <div className="row" style={{ margin: 0 }}>
        <div className="card-body" style={{ flex: "1 1 auto", minHeight: "1px", padding: "1.25rem", border: "1px dashed red", background: "rgb(255, 216, 0)", borderRadius: "20px", fontWeight: "bold", textAlign: "center", textTransform: "uppercase" }}>
          <h3>SATA ( Sata King ) updates all satta games on real time.</h3>
        </div>
      </div>

      <div className='center-table'>
        <table className="table-style">
          <thead className="table-header">
            <tr>
              <th>सट्टा का नाम</th>
              <th>कल आया था</th>
              <th>आज का रिज़ल्ट</th>
            </tr>
          </thead>
          <tbody>

            <tr className='table-delhi colored-cell'>
              <DelhiKingsForm isLoggedIn={isLoggedIn} delhiKingsData={props.delhiKingsNumbers} setDelhiKingsData={props.setDelhiKingsNumbers} />            </tr>
            <tr className='table-vijay colored-cell'>
              <VijayLaxmiForm isLoggedIn={isLoggedIn} vijayLaxmiData={props.vijayLaxmiNumbers} setVijayLaxmiData={props.setVijayLaxmiNumbers} />
            </tr>
            <tr className='table-dubai colored-cell'>
              <DubaiKingForm isLoggedIn={isLoggedIn} dubaiKingDates={props.dubaiKingNumbers} setDubaiKingDates={props.setDubaiKingNumbers} />
            </tr>
            <tr className='table-himachal colored-cell'>
              <HimachalForm isLoggedIn={isLoggedIn} himachalData={props.himachalDates} setHimachalData={props.setHimachalDates} />
            </tr>

          </tbody>
        </table>
      </div>
      <section className="ads-container">
        <div className="column-ad">
          <div className="card-body" style={{ boxSizing: 'border-box', flex: '1 1 auto', minHeight: '1px', paddingLeft: '0.5rem', paddingRight: '0.5rem', paddingTop: '1rem', paddingBottom: '1rem', border: 'dashed red', background: 'linear-gradient(to bottom, #ffd800, #ffffff)', borderRadius: '20px', fontWeight: 'bold', marginTop: '5px', marginBottom: '5px' }}>
            <p><strong>--सीधे सट्टा कंपनी का No 1 खाईवाल--</strong></p>
            <p><strong>♕♕&nbsp;MONU&nbsp;BHAI&nbsp;KHAIWAL ♕♕</strong></p>
            <p><strong>⏰ दिल्ली किंग्स ------------ 7:30 PM</strong></p>
            <p><strong>⏰ हिमाचल --------------- 3:50 PM</strong></p>
            <p><strong>⏰ विजय लक्ष्मी ----------- 12:40 PM</strong></p>
            <p><strong>⏰ दुबई किंग्स --------------- 5:15  PM</strong></p>
            <p><a href="https://wa.me/+917015441836"><img loading="lazy" src="https://res.cloudinary.com/dnxbhtahw/image/upload/v1670936612/api7-assets/whatsapp-footer_1_o02ejp.png" width="200px" height="69px" alt="Whatsapp to show game on this website" /></a></p>
          </div>
        </div>
      </section>

      {/* <section className="octoberresultchart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h5>SATTA KING RESULT CHART 2022</h5>
            </div>
          </div>
        </div>
      </section> */}

      <section className="octoberresultchart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1>MARCH 2024 RESULT CHART</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="newtable">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 nopadding">
              <div style={{ overflowX: 'auto' }} className="table-responsive marginBottom">
                <table className="table table-bordered table-extra">
                  <thead>
                    <tr>
                      <td className="table_chart_section_01 forfirtcolor date col-md-2 text-center"><strong className="fon">Date</strong></td>
                      <td style={{ textTransform: 'uppercase' }} className="table_chart_section forfirtcolor text-center">DELHI KING</td>
                      <td style={{ textTransform: 'uppercase' }} className="table_chart_section forfirtcolor text-center">VIJAY LAXMI</td>
                      <td style={{ textTransform: 'uppercase' }} className="table_chart_section forfirtcolor text-center">DUBAI KING</td>
                      <td style={{ textTransform: 'uppercase' }} className="table_chart_section forfirtcolor text-center">HIMACHAL</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">01-03</span></td>
                      <td><span className="table_chart_section_02">31</span></td>
                      <td><span className="table_chart_section_02">30</span></td>
                      <td><span className="table_chart_section_02">71</span></td>
                      <td><span className="table_chart_section_02">21</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">02-03</span></td>
                      <td><span className="table_chart_section_02">07</span></td>
                      <td><span className="table_chart_section_02">63</span></td>
                      <td><span className="table_chart_section_02">52</span></td>
                      <td><span className="table_chart_section_02">21</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">03-03</span></td>
                      <td><span className="table_chart_section_02">32</span></td>
                      <td><span className="table_chart_section_02">17</span></td>
                      <td><span className="table_chart_section_02">55</span></td>
                      <td><span className="table_chart_section_02">85</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">04-03</span></td>
                      <td><span className="table_chart_section_02">53</span></td>
                      <td><span className="table_chart_section_02">93</span></td>
                      <td><span className="table_chart_section_02">14</span></td>
                      <td><span className="table_chart_section_02">17</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">05-03</span></td>
                      <td><span className="table_chart_section_02">32</span></td>
                      <td><span className="table_chart_section_02">77</span></td>
                      <td><span className="table_chart_section_02">35</span></td>
                      <td><span className="table_chart_section_02">78</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">06-03</span></td>
                      <td><span className="table_chart_section_02">62</span></td>
                      <td><span className="table_chart_section_02">91</span></td>
                      <td><span className="table_chart_section_02">99</span></td>
                      <td><span className="table_chart_section_02">83</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">07-03</span></td>
                      <td><span className="table_chart_section_02">43</span></td>
                      <td><span className="table_chart_section_02">59</span></td>
                      <td><span className="table_chart_section_02">78</span></td>
                      <td><span className="table_chart_section_02">02</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">08-03</span></td>
                      <td><span className="table_chart_section_02">47</span></td>
                      <td><span className="table_chart_section_02">52</span></td>
                      <td><span className="table_chart_section_02">58</span></td>
                      <td><span className="table_chart_section_02">90</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">09-03</span></td>
                      <td><span className="table_chart_section_02">53</span></td>
                      <td><span className="table_chart_section_02">83</span></td>
                      <td><span className="table_chart_section_02">13</span></td>
                      <td><span className="table_chart_section_02">68</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">10-03</span></td>
                      <td><span className="table_chart_section_02">05</span></td>
                      <td><span className="table_chart_section_02">94</span></td>
                      <td><span className="table_chart_section_02">52</span></td>
                      <td><span className="table_chart_section_02">20</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">11-03</span></td>
                      <td><span className="table_chart_section_02">25</span></td>
                      <td><span className="table_chart_section_02">91</span></td>
                      <td><span className="table_chart_section_02">19</span></td>
                      <td><span className="table_chart_section_02">17</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">12-03</span></td>
                      <td><span className="table_chart_section_02">42</span></td>
                      <td><span className="table_chart_section_02">50</span></td>
                      <td><span className="table_chart_section_02">94</span></td>
                      <td><span className="table_chart_section_02">04</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">13-03</span></td>
                      <td><span className="table_chart_section_02">07</span></td>
                      <td><span className="table_chart_section_02">17</span></td>
                      <td><span className="table_chart_section_02">18</span></td>
                      <td><span className="table_chart_section_02">57</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">14-03</span></td>
                      <td><span className="table_chart_section_02">67</span></td>
                      <td><span className="table_chart_section_02">25</span></td>
                      <td><span className="table_chart_section_02">77</span></td>
                      <td><span className="table_chart_section_02">39</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">15-03</span></td>
                      <td><span className="table_chart_section_02">08</span></td>
                      <td><span className="table_chart_section_02">47</span></td>
                      <td><span className="table_chart_section_02">73</span></td>
                      <td><span className="table_chart_section_02">37</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">16-03</span></td>
                      <td><span className="table_chart_section_02">25</span></td>
                      <td><span className="table_chart_section_02">31</span></td>
                      <td><span className="table_chart_section_02">41</span></td>
                      <td><span className="table_chart_section_02">99</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">17-03</span></td>
                      <td><span className="table_chart_section_02">12</span></td>
                      <td><span className="table_chart_section_02">58</span></td>
                      <td><span className="table_chart_section_02">77</span></td>
                      <td><span className="table_chart_section_02">57</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">18-03</span></td>
                      <td><span className="table_chart_section_02">98</span></td>
                      <td><span className="table_chart_section_02">01</span></td>
                      <td><span className="table_chart_section_02">96</span></td>
                      <td><span className="table_chart_section_02">22</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">19-03</span></td>
                      <td><span className="table_chart_section_02">42</span></td>
                      <td><span className="table_chart_section_02">55</span></td>
                      <td><span className="table_chart_section_02">22</span></td>
                      <td><span className="table_chart_section_02">95</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">20-03</span></td>
                      <td><span className="table_chart_section_02">40</span></td>
                      <td><span className="table_chart_section_02">34</span></td>
                      <td><span className="table_chart_section_02">36</span></td>
                      <td><span className="table_chart_section_02">83</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">21-03</span></td>
                      <td><span className="table_chart_section_02">36</span></td>
                      <td><span className="table_chart_section_02">75</span></td>
                      <td><span className="table_chart_section_02">90</span></td>
                      <td><span className="table_chart_section_02">83</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">22-03</span></td>
                      <td><span className="table_chart_section_02">00</span></td>
                      <td><span className="table_chart_section_02">30</span></td>
                      <td><span className="table_chart_section_02">14</span></td>
                      <td><span className="table_chart_section_02">75</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">23-03</span></td>
                      <td><span className="table_chart_section_02">24</span></td>
                      <td><span className="table_chart_section_02">47</span></td>
                      <td><span className="table_chart_section_02">34</span></td>
                      <td><span className="table_chart_section_02">36</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">24-03</span></td>
                      <td><span className="table_chart_section_02">46</span></td>
                      <td><span className="table_chart_section_02">21</span></td>
                      <td><span className="table_chart_section_02">42</span></td>
                      <td><span className="table_chart_section_02">63</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">25-03</span></td>
                      <td><span className="table_chart_section_02">71</span></td>
                      <td><span className="table_chart_section_02">39</span></td>
                      <td><span className="table_chart_section_02">66</span></td>
                      <td><span className="table_chart_section_02">29</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">26-03</span></td>
                      <td><span className="table_chart_section_02">50</span></td>
                      <td><span className="table_chart_section_02">27</span></td>
                      <td><span className="table_chart_section_02">98</span></td>
                      <td><span className="table_chart_section_02">01</span></td>
                    </tr>
                    <tr>
                      <td className="forfirtcolor text-center"><span className="fon">27-03</span></td>
                      <td><span className="table_chart_section_02">-</span></td>
                      <td><span className="table_chart_section_02">-</span></td>
                      <td><span className="table_chart_section_02">-</span></td>
                      <td><span className="table_chart_section_02">19</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="forChart">
        <section className="octoberresultchart"><div className="container"><div className="row"><div className="col-md-12 text-center"><h5>What is Sata ?</h5></div></div></div></section>
        <h6 className="forChart">thesata.com is a web platform which provides real time results for different kind of satta king games results . Previously satta king results were broadcasted by people to people. Now in social media era , thesata.com is a place where thousands of satta king players visits sata web portal everyday which made it popular platform among satta players.</h6>
        <section className="octoberresultchart"><div className="container"><div className="row"><div className="col-md-12 text-center"><h5>Why there are numerous Sata websites ? whom to trust ?</h5></div></div></div></section>  <p>There are many games which results are published every day which are delhi king satta king , himachal satta king , dubai king satta king and vijay laxmi satta. These games monthly chart can be seen on thesata.com home page .</p>
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
};

export default Home;
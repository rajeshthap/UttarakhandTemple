import React, { useState, useEffect, forwardRef } from "react";
import { InputGroup, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Accordion, Button, Col, Container, Row, Form } from "react-bootstrap";
import Select from "react-select";
import { FaCheck, FaUsersLine } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
//import Kedarnath from "../assets/images/Kedarnath-Temple.png";
//import Gangotri from "../assets/images/Gangotri-Temple.png";
//import Yamunotri from "../assets/images/yamunotri-temple.jpg";
import Ceremony from "../assets/images/Ceremony_image.png";
import Engagement from "../assets/images/Engagement.png";
import Ganesh from "../assets/images/Ganesh.png";
import Rudrabhishek from "../assets/images/Rudrabhishek.png";
import Yagnopavit from "../assets/images/Yagnopavit.png";
import Vishwakarma from "../assets/images/Vishwakarma.png";
import NewOffice from "../assets/images/NewOffice.png";
import Vivah from "../assets/images/Vivah.png";
import Annaprashan from "../assets/images/Annaprashan.png";
import Satyanarayan from "../assets/images/Satyanarayan.png";
import Bhoomi from "../assets/images/Bhoomi.png";
import Griha from "../assets/images/Griha.png";
import { useAuth } from "../../src/Component/GlobleAuth/AuthContext";
import PagingNation from "./paging/PagingNation";
import { BsInfoCircleFill } from "react-icons/bs";
import { BASE_URLL } from "./BaseURL";
import axios from "axios";
import { FaCalendar } from "react-icons/fa";
import Vehicle from "../../src/assets/images/vahana-pooja.webp";
import Mumndan from "../../src/assets/images/Mundan-Sanskar.jpg";
import DurgaPooja from "../../src/assets/images/durga-pooja.jpg";
import Brihaspati from "../../src/assets/images/Brihaspati.png";
import Ekadashi from "../../src/assets/images/ekadashi-vrat.webp";
import GodhBharai from "../../src/assets/images/maxresdefault.jpg";
import Haldi from "../../src/assets/images/Haldi-Ceremony.webp";
import Birthday from "../../src/assets/images/birthday-janamdin-puja.jpeg"
import Mahalakshmi from "../../src/assets/images/Mahalakshmi.jpg";
import Vastu from "../../src/assets/images/Vishnu-Sahasranamam.webp";
import Vishnu from "../../src/assets/images/Vishnu-Sahasranamam-Pooja.webp"
import KaalSarpDosh from "../../src/assets/images/kaal-sarp-dosh.webp";
import Namakarana from "../../src/assets/images/Namakarana.jpg";
import hartalika from "../../src/assets/images/hartalika.webp";
import Karwachat from "../../src/assets/images/KarwaChauth.jpg";
import DiwaliLakshmi from "../../src/assets/images/DiwaliLakshmi.jpg";
import Dhantrayodashi from "../../src/assets/images/Dhantrayodashi.webp";
import Dhanteras from "../../src/assets/images/laxmi.avif";
import Loard from "../../src/assets/images/lord-kuber.webp"
import VarahiDeviPujadevi from "../../src/assets/images/Varahi-Devi-Puja-devi.webp";
import ChhotiDiwali from "../../src/assets/images/ChhotiDiwali.avif";
import KaliPuja from "../../src/assets/images/kalipuja.webp";
import Ganeshpuja from "../../src/assets/images/ganeshpuja.webp";
import Govardhan from "../../src/assets/images/ganeshpuja.webp";
import AnnakutPuja from "../../src/assets/images/Annakut.webp";
import BhaiDuj from "../../src/assets/images/bhai-dooj.webp";
import ChhopdaPuja from "../../src/assets/images/chhopdapuja.jpg"


const cardData = [
  // ------------------ Puja / Sanskar ------------------
  
  {
    id: "0",
    title: "Annaprashan Sanskar Puja",
    text: "अन्नप्राशन संस्कार पूजा",
    img: Annaprashan,
  },
  {
    id: "1",
    title: "Satyanarayan Puja",
    text: "सत्यनारायण व्रत कथा एवं पूजा",
    img: Satyanarayan,
  },
  { id: "2", title: "Bhoomi Puja", text: "भूमि पूजन", img: Bhoomi },
  { id: "3", title: "Griha Pravesh Puja", text: "गृह प्रवेश पूजा", img: Griha },
  {
    id: "4",
    title: "New Office Opening Puja",
    text: "नए कार्यालय उद्घाटन पूजा",
    img: NewOffice,
  },
  { id: "5", title: "Vivah (Marriage) Puja", text: "विवाह पूजा", img: Vivah },
  {
    id: "6",
    title: "Vishwakarma Puja",
    text: "विश्वकर्मा पूजा",
    img: Vishwakarma,
  },
  {
    id: "7",
    title: "Yagnopavit Sanskar",
    text: "यज्ञोपवीत संस्कार",
    img: Yagnopavit,
  },
  {
    id: "8",
    title: "Rudrabhishek Puja",
    text: "रुद्राभिषेक पूजा",
    img: Rudrabhishek,
  },
  {
    id: "9",
    title: "Engagement Ceremony (Sagai)",
    text: "सगाई समारोह",
    img: Engagement,
  },
  { id: "10", title: "Naming Ceremony", text: "नामकरण समारोह", img: Ceremony },
  {
    id: "11",
    title: "Ganesh Chaturthi Puja",
    text: "गणेश चतुर्थी पूजा",
    img: Ganesh,
  },
  { id: "12", title: "Vehicle / Vahan Puja", text: "वाहन पूजा", img: Vehicle, },
  {
    id: "13",
    title: "Mundan Sanskar Puja",
    text: "मुण्डन संस्कार पूजा",
    img: Mumndan,
  },
  {
    id: "14",
    title: "Navratri Durga Puja",
    text: "नवरात्रि दुर्गा पूजा",
    img: DurgaPooja,
  },
  {
    id: "15",
    title: "Brihaspati Vrat Udyapan Puja",
    text: "बृहस्पति व्रत उद्यापन पूजा",
    img: Brihaspati,
  },
  {
    id: "16",
    title: "Ekadashi Vrat Udyapan Puja",
    text: "एकादशी व्रत उद्यापन पूजा",
    img: Ekadashi,
  },
  {
    id: "17",
    title: "Godh Bharai Puja (Baby Shower)",
    text: "गोद भराई पूजा",
    img: GodhBharai,
  },
  { id: "18", title: "Haldi Ceremony", text: "हल्दी समारोह", img: Haldi, },
  {
    id: "19",
    title: "Janamdin / Birthday Puja",
    text: "जन्मदिन पूजा",
    img: Birthday,
  },
  { id: "20", title: "Mahalakshmi Puja", text: "महालक्ष्मी पूजा", img: Mahalakshmi, },
  { id: "21", title: "Vastu Shanti Puja", text: "वास्तु शांति पूजा", img: Vastu, },
  {
    id: "22",
    title: "Vishnu Sahastranam Path Puja",
    text: "विष्णु सहस्रनाम पाठ पूजा",
    img: Vishnu,
  },
  {
    id: "23",
    title: "Kaal Sarp Dosh Nivaran Puja",
    text: "कालसर्प दोष निवारण पूजा",
    img: KaalSarpDosh,
  },
  {
    id: "24",
    title: "Office / Business Puja",
    text: "कार्यालय / व्यापार पूजा",
    img: NewOffice,
  },
  { id: "25", title: "Namakarana Puja", text: "नामकरण पूजा", img: Namakarana, },
  {
    id: "26",
    title: "Hartalika Teej Puja",
    text: "हरतालिका तीज पूजा",
    img: hartalika,
  },
  { id: "27", title: "Karwa Chauth Puja", text: "करवा चौथ पूजा", img: Karwachat, },
  {
    id: "28",
    title: "Diwali Lakshmi Puja",
    text: "दीवाली लक्ष्मी पूजा",
    img: DiwaliLakshmi,
  },
  { id: "29", title: "Dhanteras Puja", text: "धनतेरस पूजा", img: Dhanteras, },
  {
    id: "30",
    title: "Vara Mahalakshmi Puja",
    text: "वरा महालक्ष्मी पूजा",
    img: Dhantrayodashi,
  },
  { id: "31", title: "Devi Poojan", text: "देवी पूजन", img: VarahiDeviPujadevi},
  { id: "32", title: "Kuber Puja", text: "कुबेर पूजा", img: Loard, },
  {
    id: "33",
    title: "Narak Chaturdashi Puja",
    text: "नरक चतुर्दशी पूजा",
    img: ChhotiDiwali,
  },
  { id: "34", title: "Kali Puja", text: "काली पूजा", img: KaliPuja, },
  {
    id: "35",
    title: "Ganesh Lakshmi Puja",
    text: "गणेश लक्ष्मी पूजा",
    img: Ganeshpuja,
  },
  { id: "36", title: "Govardhan Puja", text: "गोवर्धन पूजा", img: Govardhan, },
  { id: "37", title: "Annakut Puja", text: "अन्नकूट पूजा", img: AnnakutPuja, },
  { id: "38", title: "Bhai Dooj Puja", text: "भाई दूज पूजा", img: BhaiDuj, },
  { id: "39", title: "Chopda Pooja", text: "चोपड़ा पूजा", img: ChhopdaPuja, },

  // ------------------ Havans ------------------
  { id: "40", title: "Ayush Havan", text: "आयुष हवन", img: "" },
  { id: "41", title: "Chandi Path Havan", text: "चंडी पाठ हवन", img: "" },
  {
    id: "42",
    title: "Lakshmi Kubera Havan",
    text: "लक्ष्मी कुबेर हवन",
    img: "",
  },
  { id: "43", title: "Navagraha Havan", text: "नवग्रह हवन", img: "" },
  {
    id: "44",
    title: "Shuddhikaran Puja and Havan",
    text: "शुद्धिकरण पूजा एवं हवन",
    img: "",
  },
  { id: "45", title: "Maha Ganapati Homa", text: "महागणपति होम", img: "" },
  { id: "46", title: "Dhanvantari Homa", text: "धन्वंतरि होम", img: "" },
  { id: "47", title: "Bhagavathi Homa", text: "भगवती होम", img: "" },
  { id: "48", title: "Navmi Havan", text: "नवमी हवन", img: "" },
  { id: "49", title: "Drishti Durga Homa", text: "दृष्टि दुर्गा होम", img: "" },
  { id: "50", title: "Mahalaxmi Havan", text: "महालक्ष्मी हवन", img: "" },

  // ------------------ Jaaps / Paths ------------------
  {
    id: "51",
    title: "Maha Mrityunjaya Jaap Puja",
    text: "महामृत्युंजय जाप पूजा",
    img: "",
  },
  {
    id: "52",
    title: "Gayatri Mantra Jaap Puja",
    text: "गायत्री मंत्र जाप पूजा",
    img: "",
  },
  {
    id: "53",
    title: "Santan Gopal Mantra Jaap",
    text: "संतान गोपाल मंत्र जाप",
    img: "",
  },
  {
    id: "54",
    title: "Shani Dosh Nivaran Jaap",
    text: "शनि दोष निवारण जाप",
    img: "",
  },
  {
    id: "55",
    title: "Rahu Graha Shanti Mantra Jaap",
    text: "राहु ग्रह शांति मंत्र जाप",
    img: "",
  },
  {
    id: "56",
    title: "Sampoorna Sunderkand Paath",
    text: "सम्पूर्ण सुंदरकांड पाठ",
    img: "",
  },
  { id: "57", title: "Akhand Ramayana Path", text: "अखंड रामायण पाठ", img: "" },
  {
    id: "58",
    title: "Hanuman Chalisa Paath",
    text: "हनुमान चालीसा पाठ",
    img: "",
  },
  { id: "59", title: "Bajrang Baan Path", text: "बजरंग बाण पाठ", img: "" },
  { id: "60", title: "Navchandi Paath", text: "नवचंडी पाठ", img: "" },
  {
    id: "61",
    title: "Durga Saptashati Path",
    text: "दुर्गा सप्तशती पाठ",
    img: "",
  },
  { id: "62", title: "Kanak Dhara Path", text: "कनकधारा पाठ", img: "" },
  { id: "63", title: "Shri Sukt Paath", text: "श्री सूक्त पाठ", img: "" },
  {
    id: "64",
    title: "Lalita Sahasranama Path",
    text: "ललिता सहस्रनाम पाठ",
    img: "",
  },
  {
    id: "65",
    title: "Kanakadhara Stotram Path",
    text: "कनकधारा स्तोत्र पाठ",
    img: "",
  },

  // ------------------ Pitru Paksha / Shradh ------------------
  {
    id: "66",
    title: "Pitru Dosh Nivaran Puja",
    text: "पितृ दोष निवारण पूजा",
    img: "",
  },
  {
    id: "67",
    title: "Shradh Puja & Karma for Ancestors Peace",
    text: "श्राद्ध पूजा एवं कर्म",
    img: "",
  },
  { id: "68", title: "Barsi Puja", text: "बरसी पूजा", img: "" },
  {
    id: "69",
    title: "Bharani Shradh Pitru Paksha",
    text: "भरनी श्राद्ध पितृ पक्ष",
    img: "",
  },
  {
    id: "70",
    title: "Tripindi Shradha Puja",
    text: "त्रिपिंडी श्राद्ध पूजा",
    img: "",
  },
  { id: "71", title: "Garud Puran Path", text: "गरुड़ पुराण पाठ", img: "" },
  {
    id: "72",
    title: "Tarpan Shradh Puja",
    text: "तर्पण श्राद्ध पूजा",
    img: "",
  },

  {
    id: "73",
    title: "Pind Daan Shradh Puja",
    text: "पिंड दान श्राद्ध पूजा",
    img: "",
  },
];
const CustomDatePickerInput = forwardRef(
  ({ value, onClick, placeholder }, ref) => (
    <InputGroup>
      <Form.Control
        ref={ref}
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        className="temp-form-control-option"
        readOnly
      />
      <InputGroup.Text onClick={onClick} style={{ cursor: "pointer" }}>
        <FaCalendar />
      </InputGroup.Text>
    </InputGroup>
  )
);
const PanditBooking = () => {
 

  // Move selectedDateTime useState to the top before any logic uses it
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  // Helper to round up to next 30 min interval
  const getNextInterval = (date = new Date()) => {
    let minutes = date.getMinutes();
    let nextMinutes = minutes <= 30 ? 30 : 0;
    let nextHour = nextMinutes === 0 ? date.getHours() + 1 : date.getHours();
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      nextHour,
      nextMinutes
    );
  };

  const today = new Date();
  const isToday =
    selectedDateTime &&
    selectedDateTime.getDate() === today.getDate() &&
    selectedDateTime.getMonth() === today.getMonth() &&
    selectedDateTime.getFullYear() === today.getFullYear();

  // 6:00 AM
  const minTime = isToday
    ? getNextInterval(today)
    : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0);
  // 11:30 PM
  const maxTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    30
  );

  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  const [, setShow] = useState(false);
  const { uniqueId } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [apiPandits, setApiPandits] = useState([]);
  const [panditOptions, setPanditOptions] = useState([]);
  const [, setIsLoggedIn] = useState(false);
  const normalize = (s = "") =>
    String(s).toLowerCase().replace(/\s+/g, " ").trim();

  // pagination states
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = cardData.slice(indexOfFirstItem, indexOfLastItem);

  const handleShow = () => setShow(true);
  const handleLoginRegister = () => setIsLoggedIn(true);
  // Default select the first ceremony on mount
  useEffect(() => {
    if (cardData.length > 0) {
      setSelectedCard(cardData[0]);
    }
  }, []);

  
  const buildPanditOptionsForPooja = (poojaName, source = apiPandits) => {
    if (!poojaName || !Array.isArray(source)) return [];
    const n = normalize(poojaName);
    const opts = [];
    source.forEach((pd, idx) => {
      const panditName =
        pd.pandit_name || pd.name || pd.devotee_name || `Pandit ${idx + 1}`;
      const poojas = Array.isArray(pd.poojas) ? pd.poojas : [];
      const match = poojas.find((p) => normalize(p.pooja_name) === n);
      if (match) {
        const price = Number(
          match.pooja_price || match.pooja_price === 0 ? match.pooja_price : 0
        );
        opts.push({
          value: `${panditName}-${idx}`,
          label: `${panditName} — ₹${price}`,
          meta: { pandit: pd, price },
        });
      }
    });
    return opts;
  };
  useEffect(() => {
    const fetchPanditPoojas = async () => {
      try {
        const res = await axios.get(`${BASE_URLL}api/get-pandit-poojas-list/`);
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.results || [];
        setApiPandits(data);
        // if first card selected, populate options for it
        if (cardData.length > 0) {
          const first = cardData[0];
          const opts = buildPanditOptionsForPooja(first.title, data);
          setPanditOptions(opts);
        }
      } catch (err) {
        console.error("Error fetching pandit poojas list:", err);
      }
    };
    fetchPanditPoojas();
  }, []);

  // Total should depend only on pandit selection
  const totalAmount =
    selectedOptions.length > 0
      ? selectedOptions.reduce(
          (sum, opt) => sum + Number(opt.meta?.price || 0),
          0
        )
      : 0;

   

  return (
    <>
      <div className="temp-donate">
        <Container className="temp-container temp-container-details">
          <h1>Pandit Booking</h1>
          <p>Experienced Pandit Ji for every Puja, just a click away</p>

          <Row>
            {/* Left Side Cards */}
            <Col lg={7} md={7} sm={12} className="">
              <div className="text-center p-4 my-4 temp-regis desktop-mobile ">
                <h5>
                  <BsInfoCircleFill className="temp-info-icon" />
                  To continue with your Puja booking, please{" "}
                  <strong>login</strong> or create an account.
                </h5>
                <p>
                  Kindly click on the <strong>Login</strong> or{" "}
                  <strong>Register</strong> button below to continue.
                </p>
                <Row className="mb-3">
                  <Col xs={12} md={6} className="mb-2 mb-md-0">
                    <Link to="/Login">
                      <Button
                        className="w-100 temp-login-btn"
                        onClick={handleLoginRegister}
                      >
                        Login
                      </Button>
                    </Link>
                  </Col>
                  <Col xs={12} md={6}>
                    <Link to="/DevoteeRegistration">
                      <Button
                        className="w-100 temp-regis-btn"
                        onClick={handleLoginRegister}
                      >
                        Register
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </div>
              <Row className="g-4">
                {currentCards.map((item) => (
                  <Col
                    lg={3}
                    md={6}
                    sm={6}
                    xs={6}
                    key={item.id}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className={`card-item-page ${
                        selectedCard?.id === item.id ? "active-card" : ""
                      }`}
                      onClick={() => {
                        if (!uniqueId) {
                          setShowPopup(true);
                          return;
                        }

                        setSelectedCard(item);
                        const opts = buildPanditOptionsForPooja(
                          item.title,
                          apiPandits
                        );
                        setPanditOptions(opts);

                        setSelectedCard(item);
                        setPanditOptions(opts);
                      }}
                    >
                      <div className="card-image-wrapper-temple-page">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="card-image"
                          onClick={() => {
                            if (!uniqueId) {
                              setShowPopup(true);
                              return;
                            }
                            setSelectedCard(item);
                          }}
                        />
                      </div>
                      <div className="card-text-temp">
                        <h5>{item.title}</h5>
                        <h6>{item.text}</h6>
                      </div>
                    </div>
                    {/* Popup Modal for Register/Login message */}

                    <Modal
                      show={showPopup}
                      onHide={() => setShowPopup(false)}
                      centered
                    >
                      <Modal.Header closeButton />
                      <Modal.Body>
                        <div className="text-center p-4 my-4 temp-regis">
                          <h5>
                            <BsInfoCircleFill className="temp-info-icon" />
                            To continue with your Puja booking, please{" "}
                            <strong>login</strong> or create an account.
                          </h5>
                          <p>
                            Kindly click on the <strong>Login</strong> or{" "}
                            <strong>Register</strong> button below to continue.
                          </p>
                          <Row className="mb-3">
                            <Col xs={12} md={6} className="mb-2 mb-md-0">
                              <Link to="/Login">
                                <Button className="w-100 temp-login-btn">
                                  Login
                                </Button>
                              </Link>
                            </Col>
                            <Col xs={12} md={6}>
                              <Link to="/DevoteeRegistration">
                                <Button className="w-100 temp-regis-btn">
                                  Register
                                </Button>
                              </Link>
                            </Col>
                          </Row>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={() => setShowPopup(false)}
                        >
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              <PagingNation
                totalItems={cardData.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </Col>

            {/* Right Side – Ceremony Details */}
            <Col
              lg={5}
              md={5}
              sm={12}
              className="mt-2 temp-right-side rhs-gob-mob  "
            >
              {!uniqueId && (
                <div className="text-center p-4 my-4 temp-regis">
                  <h5>
                    <BsInfoCircleFill className="temp-info-icon" />
                    To continue with your Puja booking, please{" "}
                    <strong>login </strong>or create an account.
                  </h5>
                  <p>
                    Kindly click on the <strong>Login</strong> or{" "}
                    <strong>Register</strong> button below to continue.
                  </p>
                  <Row className="mb-3">
                    <Col xs={12} md={6} className="mb-2 mb-md-0">
                      <Link to="/Login">
                        <Button
                          className="w-100 temp-login-btn"
                          onClick={handleLoginRegister}
                        >
                          Login
                        </Button>
                      </Link>
                    </Col>
                    <Col xs={12} md={6}>
                      <Link to="/DevoteeRegistration">
                        <Button
                          className="w-100 temp-regis-btn"
                          onClick={handleLoginRegister}
                        >
                          Register
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </div>
              )}

              <div
                className="tem-rhs-info pandit-right-side-style"
                style={{
                  opacity: uniqueId ? 1 : 0.5,
                  pointerEvents: uniqueId ? "auto" : "none",
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                <h1>Online Pandit Booking</h1>

                {selectedCard ? (
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header className="accordion-header-title">
                        {selectedCard.title}{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <Form.Group className="mb-3">
                          <Form.Label className="temp-label">
                            Required Pandit{" "}
                            <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Select
                            isMulti
                            options={panditOptions}
                            placeholder="Select Available Pandits"
                            closeMenuOnSelect={false}
                            className="temp-form-control-input basic-multi-select "
                            classNamePrefix="basic-multi-select"
                            value={selectedOptions}
                            onChange={setSelectedOptions}
                          />

                          {/* Time */}
                          <Form.Group className="mb-3 mt-3">
                            <Form.Label className="temp-label mb-2">
                              Pooja Date & Time{" "}
                              <span className="temp-span-star">*</span>
                            </Form.Label>
                            <div>
                              <DatePicker
                                selected={selectedDateTime}
                                onChange={setSelectedDateTime}
                                showTimeSelect
                                timeFormat="hh:mm aa"
                                timeIntervals={30}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                placeholderText="Select Date and time"
                                customInput={
                                  <CustomDatePickerInput placeholder="Select Date and Time" />
                                }
                                className="form-control temp-form-control-option w-100"
                                minDate={today}
                                minTime={minTime}
                                maxTime={maxTime}
                                required
                              />
                            </div>
                          </Form.Group>

                          {/* Date */}
                          {/* <Form.Group className="mb-3 mt-3">
                          <Form.Label className="temp-label mb-2">
                            Puja Date <span className="temp-span-star">*</span>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            className="temp-form-control"
                          />
                        </Form.Group> */}

                          {/* Info */}
                          <div className="mt-3">
                            <p>
                              <MdOutlineDateRange className="temple-icon" />{" "}
                              {formattedDate}
                            </p>
                            <p>
                              <FaUsersLine className="temple-icon" />{" "}
                              {selectedOptions.length || 1}, Charges ₹
                              {selectedCard.price} Per Person
                            </p>
                          </div>

                          {/* Amount */}
                          <div className="text-end mt-2">
                            <p>
                              Applicable Amount:{" "}
                              <span className="amount-span">
                                ₹ {totalAmount}/-
                              </span>
                            </p>
                          </div>

                          {/* Cart */}
                          <h2>Cart Total</h2>
                          <p className="border-temp">{selectedCard.title}</p>
                          <div className="d-flex justify-content-between">
                            <p>Grand Total</p>
                            <span className="amount-span">
                              ₹ {totalAmount}/-
                            </span>
                          </div>

                          {/* Button */}
                          <div className="gap-3 mt-3 mb-3 Temp-btn-submit">
                            <Link
                              to="/OnlineHirePandit"
                              state={{
                                pooja_type: selectedCard?.title || "",
                                number_of_pandits: selectedOptions?.length || 0,
                                selected_pandits: (selectedOptions || []).map(
                                  (opt) => ({
                                    id: opt.value,
                                    name:
                                      // label is "Pandit Name — ₹price" so split if string, otherwise try meta
                                      typeof opt.label === "string"
                                        ? opt.label.split("—")[0].trim()
                                        : opt.meta?.pandit?.pandit_name ||
                                          opt.meta?.pandit?.name ||
                                          opt.value,
                                    price: Number(
                                      opt.meta?.price ||
                                        selectedCard?.price ||
                                        0
                                    ),
                                    raw: opt.meta?.pandit || null,
                                  })
                                ),
                                grand_total: totalAmount,
                                date_and_time: selectedDateTime
                                  ? selectedDateTime.toISOString()
                                  : null,
                              }}
                            >
                              <Button
                                variant="temp-submit-btn"
                                className="temp-submit-btn mx-3"
                                type="button"
                                onClick={handleShow}
                              >
                                <FaCheck /> Proceed for devotee details
                              </Button>
                            </Link>
                          </div>
                        </Form.Group>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ) : (
                  <p className="text-muted">
                    👉 Select a ceremony from the left to view details here.
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PanditBooking;

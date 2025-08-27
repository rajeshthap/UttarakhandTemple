import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../CustomCss/custom.css";
import TopNavBar from '../Component/Navigation/TopNavBar';
import InfoBar from '../Component/Navigation/InfoBar';
import CarouselSlider from '../Component/CarouselSlider';
import OnlineBooking from '../Component/OnlineBooking';
import Aboutus from '../Component/Aboutus';
import AllTempleInfo from '../Component/AllTempleInfo';
import Testimonials from '../Component/Testimonials';
import Footer from '../Component/Footer';



const Home = () => {
    return (
        <div>
            <div className='fluid'>
                <InfoBar />
                <TopNavBar />
                <CarouselSlider />
                <OnlineBooking />
                <Aboutus />
                <AllTempleInfo />
                <Testimonials />
                <Footer />
            </div>
        </div>
    )
}

export default Home

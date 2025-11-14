import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../CustomCss/custom.css";
import CarouselSlider from '../Component/CarouselSlider';
import OnlineBooking from '../Component/OnlineBooking';
import Aboutus from '../Component/Aboutus';
import AllTempleInfo from '../Component/AllTempleInfo';
import Testimonials from '../Component/Testimonials';
import Footer from '../Component/Footer';
import AllPanditInfo from '../Component/AllPanditInfo';


const Home = () => {
    return (
        <div>
            <div className='fluid'>
             
                <CarouselSlider />
                <OnlineBooking />
                <Aboutus />
                <AllTempleInfo />
                <AllPanditInfo/>
                <Testimonials />
                <Footer />
            </div>
        </div>
    )
}

export default Home

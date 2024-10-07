import Banner from "../../components/Banner/Banner";
import ContactUs from "../../components/ContactUs/ContactUs";
import ReviewSection from "../../components/ReviewSection/ReviewSection";

import Container from "../../components/Shared/Container/Container";
import WhatWeAreOffering from "../../components/WhatWeAreOfferingSection/WhatWeAreOffering";
import WhoWeareSection from "../../components/WhoWeareSection/WhoWeareSection";

const Home = () => {
  return (
    <>
  
    <Banner/>
      <Container>
        <WhoWeareSection />
      </Container>
      <WhatWeAreOffering />
      <ReviewSection/>
   <Container>
   <ContactUs/>
   </Container>
    </>
  );
};

export default Home;

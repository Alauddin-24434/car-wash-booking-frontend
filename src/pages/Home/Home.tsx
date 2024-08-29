import Banner from "../../components/Banner/Banner";
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
    </>
  );
};

export default Home;

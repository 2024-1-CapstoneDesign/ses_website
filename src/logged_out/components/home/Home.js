import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import axios from "axios";

function Home(props) {
  const { selectHome } = props;
  useEffect(() => {
    selectHome();
  }, [selectHome]);

  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.search);
    const code = parsedHash.get("code");
    console.dir(code);
  }, []);
  return (
    <Fragment>
      <HeadSection />
      <FeatureSection />
      {/*<PricingSection />*/}
    </Fragment>
  );
}

Home.propTypes = {
  selectHome: PropTypes.func.isRequired
};

export default Home;

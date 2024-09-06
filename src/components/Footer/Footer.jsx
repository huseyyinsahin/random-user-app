import "./Footer.css";
import designSvg from "../../assets/design.svg";

const Footer = () => {
  return (
    <div className="footer-div">
      <img
        src={designSvg}
        alt="design"
        style={{ width: "40px", margin: "0  25px 0 10px" }}
      />
      <p>
        Random User App 2024 | Coded by{" "}
        <a style={{ color: "inherit" }} href="https://github.com/huseyyinsahin">
          Huseyin
        </a>
      </p>
    </div>
  );
};

export default Footer;

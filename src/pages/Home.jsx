import { useEffect, useState } from "react";
import axios from "axios";
import { CiCircleRemove } from "react-icons/ci";
import Footer from "../components/Footer/Footer";
import LoadingSpinner from "../components/Loading/LoadingSpinner";

import mailSvg from "../assets/mail.svg";
import manSvg from "../assets/man.svg";
import womanSvg from "../assets/woman.svg";
import manAgeSvg from "../assets/growing-up-man.svg";
import womanAgeSvg from "../assets/growing-up-woman.svg";
import mapSvg from "../assets/map.svg";
import phoneSvg from "../assets/phone.svg";
import padlockSvg from "../assets/padlock.svg";

function Home() {
  const url = "https://randomuser.me/api/";
  const [people, setPeople] = useState(null);

  const [refresh, setRefresh] = useState(0);

  const [userTitle, setUserTitle] = useState("name");
  const [userValue, setUserValue] = useState("");

  const [save, setSave] = useState([
    {
      first: "Hüseyin",
      email: "xxxxx@example.com",
      phone: "xxxx-xxx-xx-xx",
      age: "xx",
    },
  ]);

  const [gender, setGender] = useState(manSvg);
  const [age, setAge] = useState(manAgeSvg);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (people?.gender == "female") {
      setGender(womanSvg);
      setAge(womanAgeSvg);
      setUserTitle("name");
    } else {
      setGender(manSvg);
      setAge(manAgeSvg);
      setUserTitle("name");
    }
  }, [people]);

  useEffect(() => {
    const savedLocalStorage = JSON.parse(localStorage.getItem("userData"));
    if (savedLocalStorage) {
      setSave(savedLocalStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(save));
  }, [save]);

  const handleSave = () => {
    if (!people) {
      alert("Wait!...");
    } else {
      const person = {
        first: people?.name.first,
        email: people?.email,
        phone: people?.cell,
        age: people?.dob.age,
      };

      const control = save.some(({ phone }) => phone === people?.cell);

      if (control) {
        alert("This user is already added.");
      } else {
        setSave([...save, person]);
      }
    }
  };

  const handleDelete = (phoneNumber) => {
    const del = save.filter(({ phone }) => phone != phoneNumber);
    setSave(del);
  };

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        const person = res.data.results[0];
        setPeople(res.data.results[0]);
        setUserValue(`${person.name.first} ${person.name.last}`);
        setLoading(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  return (
    <>
      {loading ? (
        <main>
          <div className="block bcg-orange"></div>
          <div className="block">
            <div className="container">
              <img
                src={people?.picture.large}
                alt="random user"
                className="user-img"
              />
              <p className="user-title">My {userTitle} is</p>
              <p className="user-value">{userValue}</p>
              <div className="values-list">
                <button
                  onMouseOver={() => {
                    if (people) {
                      setUserTitle("name");
                      setUserValue(
                        `${people?.name.first} ${people?.name.last}`
                      );
                    }
                  }}
                  className="icon"
                  data-label="name"
                >
                  <img src={gender} alt="user" id="iconImg" />
                </button>
                <button
                  onMouseOver={() => {
                    setUserTitle("email");
                    setUserValue(people?.email);
                  }}
                  className="icon"
                  data-label="email"
                >
                  <img src={mailSvg} alt="mail" id="iconImg" />
                </button>
                <button
                  onMouseOver={() => {
                    setUserTitle("age");
                    setUserValue(people?.dob.age);
                  }}
                  className="icon"
                  data-label="age"
                >
                  <img src={age} alt="age" id="iconImg" />
                </button>
                <button
                  onMouseOver={() => {
                    setUserTitle("street");
                    setUserValue(people?.location.street.name);
                  }}
                  className="icon"
                  data-label="street"
                >
                  <img src={mapSvg} alt="map" id="iconImg" />
                </button>
                <button
                  onMouseOver={() => {
                    setUserTitle("phone");
                    setUserValue(people?.cell);
                  }}
                  className="icon"
                  data-label="phone"
                >
                  <img src={phoneSvg} alt="phone" id="iconImg" />
                </button>
                <button
                  onMouseOver={() => {
                    setUserTitle("password");
                    setUserValue(people?.login.password);
                  }}
                  className="icon"
                  data-label="password"
                >
                  <img src={padlockSvg} alt="lock" id="iconImg" />
                </button>
              </div>
              <div className="btn-group">
                <button
                  onClick={() => {
                    setRefresh(refresh + 1);
                  }}
                  className="btn"
                  type="button"
                >
                  new user
                </button>
                <button
                  onClick={() => handleSave()}
                  className="btn"
                  type="button"
                >
                  add user
                </button>
              </div>

              <table className="table">
                <thead>
                  <tr className="head-tr">
                    <th className="th">Firstname</th>
                    <th className="th">Email</th>
                    <th className="th">Phone</th>
                    <th className="th">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {save.map(({ first, email, phone, age }, index) => (
                    <tr key={index} className="body-tr">
                      <td>{first}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>{age}</td>
                      <td
                        style={{
                          color: "red",
                          fontSize: "1.6rem",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(phone)}
                      >
                        <CiCircleRemove />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Footer />
          </div>
        </main>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default Home;

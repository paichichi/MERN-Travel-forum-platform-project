import styles from "./MainProfile.module.css";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../service/contexts/context";
import WeatherView from "../../travel/WeatherView/WeatherView";
import axios from "axios";

const MainProfile = ({
  editable,
  targetUser,
  settargetUser,
  match,
  followed,
  unFollow,
  follow,
  updateInfo,
  convertEditable,
  targetusername,
  flist,
  sending,
  setsending,
}) => {
  const { user, token, msgSend } = useContext(AppContext);
  const [msg, setmsg] = useState("");
  const [plans, setplans] = useState([]);


  useEffect(() => {

    axios
      .get(`http://localhost:8080/plans?uid=${targetUser.id}`)
      .then((res) => {
        setplans(res.data);
      })
      .catch((err) => (err.response.status === 401 ? null : console.log(err)));

  }, [targetUser.id, setplans]);

  //the function was meant to be local to prevent re-get on other parts of profile after delete a plan
  //if declare a function in context provider and then pass to here, a refresh will be necessary to make deleted plan disappear right away
  //which will result a total re-get of all parts of profile page
  async function deleteplan(planid) {

    await axios.delete(`http://localhost:8080/plans/${planid}`);
    await axios.get(`http://localhost:8080/plans?uid=${targetUser.id}`)
      .then((res) => {
        setplans(res.data)
      })
      .catch((err) => (err.response.status === 401 ? null : console.log(err)));
  };

  async function sendmsg() {
    if(msg.trim().length===0){
      alert("message cannot be empty")
      return;
    }
    msgSend(user, targetUser, msg, token);
    setmsg("");
    setsending(false);
  }

  function cancel() {
    setmsg("");
    setsending(false);
  }

  function redirect(e, id) {
    e.preventDefault();
    window.location.href = `/profile/${id}`;
  }

  //   reuse weatherView
  const cities = plans.map((plan) => {
    return plan.destination;
  });
  const cities_weather = cities.filter((item, index) => {
    return cities.indexOf(item) === index;
  });
  function Weather(props) {
    const cities = props.cities;
    return cities.map((city, index) => {
      return (
        <div key={index} className={styles.wdiv}>
          <span>Weather in {city.trim()}</span>
          <WeatherView city={city.trim()} height="50%" width="88%" />
        </div>
      );
    });
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2>{match ? `Hi! @${targetusername}` : `@${targetusername}`}</h2>
        <p>Refreshed @{new Date().toLocaleString()}</p>
      </div>
      <div className={styles.plan}>
        <h3 className={styles.plantitle}>Plans</h3>
        {plans.length === 0 && <h2>No saved plans at the moment</h2>}
        {plans.map((each, index) => {
          return (
            <div key={index} className={styles.plandiv}>
              <h4>#{index + 1}</h4>
              <div className={styles.detail}>
                <h3>{each.destination} |</h3>
                {each.accomodation.length <= 20 ? (<h3>{each.accomodation} |</h3>) : (<h3>{each.accomodation.substring(0, 19) + "..."} |</h3>)}
                <h3>{each.checkIn}</h3>
                <p>~</p>
                <h3>{each.checkOut}</h3>
                {match && <button onClick={() => { deleteplan(each._id) }} className={styles.delbtn}>Delete</button>}
              </div>
              <p className={styles.price}>Total: {each.price}$</p>
            </div>
          );
        })}
      </div>
      <div className={styles.weather}>
        {/* reuse weather view component */}
        <div className={styles.wTitle}>
          <h3>Weather</h3>
        </div>
        <Weather cities={cities_weather} />
      </div>

      <div className={styles.follow}>
        <h3 className={styles.ftitle}>
          {match ? "who I follow" : `${targetusername}'s follows`}
        </h3>
        <div className={styles.list}>
          {flist.length === 0 && <h2>No follows in the list yet</h2>}
          {flist.map((each, index) => {
            return (
              <div key={index} className={styles.fdiv}>
                <a
                  href="/"
                  onClick={(e) => {
                    redirect(e, each.id);
                  }}
                >
                  {each.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.profile}>
        <div className={styles.Ptitle}>
          <h3>Profile</h3>
        </div>
        <label>
          Fullname:
          {editable ? (
            <input
              type="text"
              name="fullname"
              value={targetUser.fullname}
              onChange={(event) =>
                settargetUser({ ...targetUser, fullname: event.target.value })
              }
            />
          ) : (
            <p>{targetUser.fullname ? targetUser.fullname : "Not yet given"}</p>
          )}
        </label>
        <br />
        <label>
          Email:
          {editable ? (
            <input
              type="text"
              name="email"
              value={targetUser.email}
              onChange={(event) =>
                settargetUser({ ...targetUser, email: event.target.value })
              }
            />
          ) : (
            <p>{targetUser.email ? targetUser.email : "Not yet given"}</p>
          )}
        </label>
        <br />
        <label>
          Phone Number:
          {editable ? (
            <input
              type="text"
              name="phone"
              value={targetUser.phone}
              onChange={(event) =>
                settargetUser({ ...targetUser, phone: event.target.value })
              }
            />
          ) : (
            <p>{targetUser.phone ? targetUser.phone : "Not yet given"}</p>
          )}
        </label>
        <br />
        <label>
          Mobile Number:
          {editable ? (
            <input
              type="text"
              name="mobile"
              value={targetUser.mobile}
              onChange={(event) =>
                settargetUser({ ...targetUser, mobile: event.target.value })
              }
            />
          ) : (
            <p>{targetUser.mobile ? targetUser.mobile : "Not yet given"}</p>
          )}
        </label>
        <br />
        <label>
          Address:
          {editable ? (
            <input
              type="text"
              name="address"
              value={targetUser.address}
              onChange={(e) =>
                settargetUser({ ...targetUser, address: e.target.value })
              }
            />
          ) : (
            <p>{targetUser.address ? targetUser.address : "Not yet given"}</p>
          )}
        </label>
        <br />
        <label>
          Personal Web Link:
          {editable ? (
            <input
              type="text"
              name="web"
              value={targetUser.web}
              onChange={(e) =>
                settargetUser({ ...targetUser, web: e.target.value })
              }
            />
          ) : (
            <p>{targetUser.web ? targetUser.web : "Not yet given"}</p>
          )}
        </label>
        <br />
        <label>
          Facebook Link:
          {editable ? (
            <input
              type="text"
              name="fb"
              value={targetUser.fb}
              onChange={(e) =>
                settargetUser({ ...targetUser, fb: e.target.value })
              }
            />
          ) : (
            <p>{targetUser.fb ? targetUser.fb : "Not yet given"}</p>
          )}
        </label>
        <br />
        <label>
          Twitter Link:
          {editable ? (
            <input
              type="text"
              name="twit"
              value={targetUser.twit}
              onChange={(e) =>
                settargetUser({ ...targetUser, twit: e.target.value })
              }
            />
          ) : (
            <p>{targetUser.twit ? targetUser.twit : "Not yet given"}</p>
          )}
        </label>
        <br />
        <label>
          Instagram Link:
          {editable ? (
            <input
              type="text"
              name="ins"
              value={targetUser.ins}
              onChange={(e) =>
                settargetUser({ ...targetUser, ins: e.target.value })
              }
            />
          ) : (
            <p>{targetUser.ins ? targetUser.ins : "Not yet given"}</p>
          )}
        </label>
        <br />
        <label>
          LinkedIn Link:
          {editable ? (
            <input
              type="text"
              name="li"
              value={targetUser.li}
              onChange={(e) =>
                settargetUser({ ...targetUser, li: e.target.value })
              }
            />
          ) : (
            <p>{targetUser.li ? targetUser.li : "Not yet given"}</p>
          )}
        </label>
        <br />
        <div className={styles.btnarea}>
          {!match && (
            <button
              onClick={() => {
                setsending(!sending);
              }}
            >
              Message
            </button>
          )}
          {!match &&
            (followed ? (
              <button onClick={unFollow}>Unfollow</button>
            ) : (
              <button onClick={follow}>Follow</button>
            ))}
          {match &&
            (editable ? (
              <button onClick={updateInfo}>Save</button>
            ) : (
              <button onClick={convertEditable}>Edit</button>
            ))}
        </div>
        {sending ? (
          <div className={styles.msgarea}>
            <textarea
              value={msg}
              onChange={(e) => {
                setmsg(e.target.value);
              }}
              className={styles.msgtext}
            />
            <div className={styles.msgbtnarea}>
              <button onClick={sendmsg}>Send</button>
              <button onClick={cancel}>Cancel</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MainProfile;

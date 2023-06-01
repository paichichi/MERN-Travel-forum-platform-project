import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "../../../pages/Travel/Travel.module.css";
import BasicMap from "../../3-party-map/map";
import axios from "axios";
import axiosRetry from "axios-retry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faStar,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Base64 from "crypto-js/enc-base64";

var SHA256 = require("crypto-js/sha256");

axiosRetry(axios, { retries: 1 });

export default function AccomodationView() {
  const api_key = "40d155dc59msh20827cf3523ae05p1b5a11jsnafcbe84a378b";
  // potential keys:
  // f8d0da600amsh3b7d88a2d39eb6ep1c7721jsn6f60e8b7c70f
  // b667de8d5dmshc0077ecc8019428p184ea9jsn0901f72018df
  // 388959b71emsh3442b730f141289p17186djsncbc465f52253
  // 2daf1c3a5emshe859f11aec63661p1a2991jsne0d2e8d52c95 * this one might have used 80% limits

  // cache for hotel api call, maybe extend to other calls
  const cacheReq = localStorage.getItem("cache")
    ? new Map(JSON.parse(localStorage.getItem("cache")))
    : new Map();

  const location = useLocation();

  let dest_list;
  if (location.state !== null) {
    dest_list = location.state.dest_list ? location.state.dest_list : null;
  } else {
    dest_list =
      Cookies.get("destData") !== null && Cookies.get("destData")
        ? JSON.parse(Cookies.get("destData")).dest_list.map((item) => {
            return JSON.parse(item);
          })
        : null;
  }

  const [data, setData] = useState(null);

  const [expanded, setExpanded] = useState(
    Cookies.get("expanded") ? Cookies.get("expanded") : null
  );

  const [foundValues, setFoundValues] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  let encodedHashedDataList = localStorage.getItem("hashedID");

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`http://localhost:8080/plans?uid=${user.id}`)
        .then((response) => {
          if (encodedHashedDataList === null) {
            encodedHashedDataList = [];
          } else {
            encodedHashedDataList = JSON.parse(encodedHashedDataList);
          }
          dest_list.map((item, index) => {
            const found = response.data.some(
              (userDataItem) =>
                userDataItem._id === encodedHashedDataList[index]
            );
            foundValues[index] = found;
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const [dest, setDest] = useState(
    expanded != "null" && !!expanded
      ? expanded < dest_list.length
        ? !!dest_list
          ? dest_list[expanded].dest
          : null
        : null
      : null
  );

  const [duration, setDuration] = useState(
    expanded != "null" && !!expanded
      ? expanded < dest_list.length
        ? !!dest_list
          ? dest_list[expanded].duration
          : null
        : null
      : null
  );

  const [num_guest, setNum] = useState(
    expanded != "null" && !!expanded
      ? expanded < dest_list.length
        ? !!dest_list
          ? dest_list[expanded].num_guest
          : null
        : null
      : null
  );

  const handlePlanSummy = (e) => {
    window.location.href = "/travel/plan";
  };

  // accos means accomodations
  const [accoDisplays, setAccoDisplays] = useState(null);

  // listen on change in data, data is nothing else but hotel list returned by API
  useEffect(() => {
    setAccoDisplays(
      data
        ? data.map((a) => ({
            name: a.name,
            id: a.id,
            score: a.reviews.score,
            total_Review: a.reviews.total,
            // in case there is no image
            image: a.propertyImage
              ? a.propertyImage.image.url
              : "Image not available",
            price: a.price.lead.amount,
            latitude: a.mapMarker.latLong.latitude,
            longitude: a.mapMarker.latLong.longitude,
            roomLeft: a.availability.minRoomsLeft,
            address: a.destinationInfo.distanceFromMessaging,
            num_Guest: parseInt(num_guest.num),
          }))
        : null
    );
  }, [data]);

  // listen on change in expand, dest, etc
  useEffect(() => {
    const getHotels = async (url, dest, duration, num_guest) => {
      const maxRetries = 3;
      let retries = 0;

      if (!!!dest || !!!duration || !!!num_guest) {
        console.log("no data yet");
      } else {
        // check if the request has been made before, by hash value
        try {
          const hashReq = Base64.stringify(
            SHA256(
              dest.cr +
                dest.city +
                duration.checkIn +
                duration.checkOut +
                num_guest.num
            )
          );
          if (cacheReq.has(hashReq)) {
            // cached, return result without calling api
            setData(cacheReq.get(hashReq));
          } else {
            // not cached, make the request, and cache the result
            axios
              .request({
                method: "GET",
                url: "https://hotels4.p.rapidapi.com/locations/v3/search",
                params: {
                  q: dest.cr + dest.city,
                },
                headers: {
                  "content-type": "application/octet-stream",
                  "X-RapidAPI-Key": api_key,
                  "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
                },
              })
              .then((res) => {
                res.data.sr.forEach((i) => {
                  const options_hotel = {
                    method: "POST",
                    url: url,
                    headers: {
                      "content-type": "application/json",
                      "X-RapidAPI-Key": api_key,
                      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
                    },
                    data: {
                      currency: "USD",
                      eapid: 1,
                      locale: "en_US",
                      siteId: 300000001,
                      destination: {
                        regionId: i.gaiaId,
                      },
                      checkInDate: {
                        day: parseInt(duration.checkIn.slice(8)),
                        month: parseInt(duration.checkIn.slice(5, 7)),
                        year: parseInt(duration.checkIn.slice(0, 4)),
                      },
                      checkOutDate: {
                        day: parseInt(duration.checkOut.slice(8)),
                        month: parseInt(duration.checkOut.slice(5, 7)),
                        year: parseInt(duration.checkOut.slice(0, 4)),
                      },
                      rooms: [
                        {
                          adults: parseInt(num_guest.num),
                        },
                      ],
                      resultsStartingIndex: 0,
                      resultsSize: 200,
                      sort: "PRICE_LOW_TO_HIGH",
                      filters: {
                        price: {
                          max: 150,
                          min: 100,
                        },
                      },
                    },
                  };
                  axios
                    .request(options_hotel)
                    .then((res) => {
                      const temp = res.data.data.propertySearch.properties;
                      setData(temp);
                      cacheReq.set(hashReq, temp);
                      localStorage.setItem(
                        "cache",
                        JSON.stringify(Array.from(cacheReq.entries()))
                      );
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                });
              });
          }
        } catch (e) {
          console.log(e);
        }
      }
    };
    // set cookies
    Cookies.set("city", dest?.city);
    Cookies.set("expanded", expanded);
    if (expanded !== null && dest && duration && num_guest) {
      getHotels(
        "https://hotels4.p.rapidapi.com/properties/v2/list",
        dest,
        duration,
        num_guest
      );
    }
  }, [expanded, dest, duration, num_guest]);

  // change expanded index
  const handleExpand = (e, index) => {
    // empty the accoDisplays so that map could be reload
    setAccoDisplays(null);
    setExpanded(parseInt(expanded) === parseInt(index) ? "null" : index);
    setDest(dest_list[index].dest);
    setDuration(dest_list[index].duration);
    setNum(dest_list[index].num_guest);
  };

  return dest_list
    ? dest_list.map((item, index) => {
        return (
          <div key={index} className={styles.tripContainer}>
            <div className={styles.tripHeader}>
              <span>
                Destination {index + 1} | {item.dest.city} |{" "}
                {item.duration.checkIn} ~ {item.duration.checkOut}{" "}
              </span>
              <button
                className={styles.expandedBnt}
                onClick={(e) => handleExpand(e, index)}
              >
                <FontAwesomeIcon
                  icon={
                    parseInt(expanded) === parseInt(index)
                      ? faChevronUp
                      : faChevronDown
                  }
                />
              </button>
              <FontAwesomeIcon
                icon={foundValues[index] ? faCheck : faXmark}
                style={{ color: foundValues[index] ? "#95df58" : "#e84f4f" }}
                className={styles.checkIcon}
              />
              {foundValues[index] ? (
                <button
                  className={styles.checkOutBnt}
                  onClick={() => handlePlanSummy()}
                >
                  Check out
                </button>
              ) : null}
            </div>
            {parseInt(expanded) === parseInt(index) ? (
              <>
                {dest && duration && num_guest ? (
                  <div className={styles.AM_container}>
                    {" "}
                    {/* a container for two elements */}
                    <div className={styles.AM_column}>
                      {" "}
                      {/* left column for AccomodationView */}
                      <div
                        className={styles.search_Container}
                        // height of hotel list column better be equal to map's
                        style={{ height: "63vh", overflowY: "scroll" }}
                      >
                        {accoDisplays ? (
                          accoDisplays.map((result, index) => (
                            <Link
                              key={index}
                              to="/details"
                              state={{
                                accoData: { result },
                                dest: { dest },
                                duration: { duration },
                                indexNum: { index },
                              }}
                              className={styles.search_Card}
                            >
                              <div className={styles.search_Card_Img}>
                                <img
                                  src={result.image}
                                  className={styles.search_img}
                                  alt={result.name}
                                />
                              </div>
                              <div className={styles.search_Card_Info}>
                                <p className={styles.search_Card_welcome_info}>
                                  Entire home in {item.dest.city}
                                </p>
                                <h2 className={styles.search_Title}>
                                  {result.name}
                                </h2>
                                <p>---</p>
                                <p className={styles.search_Card_welcome_info}>
                                  {result.roomLeft ? result.roomLeft : 0} rooms
                                  left · {item.num_guest.num} guests · Entire
                                  Home
                                </p>
                                <p className={styles.search_Card_welcome_info}>
                                  Wifi · Kitchen · Free Parking
                                </p>
                                <p>---</p>
                                <p className={styles.search_rate}>
                                  <FontAwesomeIcon
                                    className={styles.search_rate_star}
                                    icon={faStar}
                                  />
                                  {result.total_Review} peoples give{" "}
                                  {result.score}
                                  /10
                                </p>
                                <p className={styles.search_price}>
                                  ${result.price} USD
                                </p>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className={styles.loader} />
                        )}
                      </div>
                    </div>
                    <div className={styles.AM_column}>
                      {" "}
                      {/* right column for MapView */}
                      {accoDisplays ? (
                        <BasicMap data={accoDisplays} zoom={12} />
                      ) : (
                        <div className={styles.loader} />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={styles.loader} />
                )}
              </>
            ) : null}
          </div>
        );
      })
    : "No trips or data missing";
}

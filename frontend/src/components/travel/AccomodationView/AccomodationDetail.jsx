import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "../../../pages/Travel/Travel.module.css";
// Import images from assets
import garden from "../../../assets/images/garden.png";
import kitchenView from "../../../assets/images/kitchen-set.png";
import wifi from "../../../assets/images/wifi.png";
import paw from "../../../assets/images/paw.png";
import laundry from "../../../assets/images/laundry.png";
import dryer from "../../../assets/images/hair-dryer.png";
import airConditioner from "../../../assets/images/air-conditioner.png";
import camera from "../../../assets/images/video-camera.png";
import fridge from "../../../assets/images/fridge.png";
import bicyle from "../../../assets/images/track-bicycle.png";
import phone from "../../../assets/images/telephone.png";
// mui dialog box
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// alert
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

import { AppContext } from "../../../service/contexts/context.js";
import { useContext } from "react";

import Base64 from "crypto-js/enc-base64";

var SHA256 = require("crypto-js/sha256");

export default function AccommodationDetails() {
  const { postDetail } = useContext(AppContext);
  const location = useLocation();
  const { accoData, dest, duration, indexNum } = location.state
    ? location.state
    : "";

  // open the dialog confirming checkin/ou dates
  const [open, setOpen] = useState(false);

  // alert informing successful adding to plan
  const [success, setSuccess] = useState(false);

  // const [hashedIdList, setHashedIdList] = useState([]);

  // automatically close the alert after displaying
  useEffect(() => {
    setTimeout(function () {
      setSuccess(false);
    }, 5000);
  }, [success]);

  const [checkIn, setCheckIn] = useState(
    duration ? Object.values(duration)[0].checkIn : null
  );
  const [checkOut, setCheckOut] = useState(
    duration ? Object.values(duration)[0].checkOut : null
  );

  if (!accoData || !dest || !duration) {
    return (
      <span>
        Please do not open me in a new tag, back to{" "}
        <Link to="/travel/accomodations">
          <button>previous page</button>
        </Link>
      </span>
    );
  } else {
    const accoDetails = Object.values(accoData);
    const DurationTime = Object.values(duration);
    const numIndex = parseInt(Object.values(indexNum));

    const city = Cookies.get("city");
    const firstLetter = city.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remaining = city.slice(1);
    const capCity = firstLetterCap + remaining;

    let difference = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

    let priceWithDays = (accoDetails[0].price * TotalDays).toFixed(2);
    let priceWithDiscount = (priceWithDays * 0.1).toFixed(2);
    let priceWithCleanFee = (priceWithDays * 0.13).toFixed(2);
    let priceWithServiceFee = (priceWithDays * 0.15).toFixed(2);
    let priceWithTax = (priceWithDays * 0.05).toFixed(2);
    let totalPrice = (
      parseFloat(priceWithDays) -
      parseFloat(priceWithDiscount) +
      parseFloat(priceWithCleanFee) +
      parseFloat(priceWithServiceFee) +
      parseFloat(priceWithTax)
    ).toFixed(2);

    // close, open a dialog to confirm the checkin and checkout dates
    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      console.log("adding", accoDetails[0].id);
      setOpen(true);
    };
    const user = JSON.parse(localStorage.getItem("user"));
    const handleConfirm = () => {
      setOpen(false);

      const randomNumber = Math.floor(Math.random() * 1000000);
      const dataToHash = `${user.id}${capCity}${checkIn}${checkOut}${randomNumber}`;
      const hashedData = SHA256(dataToHash);
      const encodedHashedData = Base64.stringify(hashedData).slice(0, 8).replace(/\//g, '_');

      let encodedHashedDataList = localStorage.getItem("hashedID");

      if (encodedHashedDataList === null) {
        encodedHashedDataList = [];
      } else {
        encodedHashedDataList = JSON.parse(encodedHashedDataList);
      }

      encodedHashedDataList.push(encodedHashedData);
      localStorage.setItem("hashedID", JSON.stringify(encodedHashedDataList));

      postDetail(
        user,
        capCity,
        accoDetails,
        checkIn,
        checkOut,
        totalPrice,
        encodedHashedData
      );
      setSuccess(true);
      window.location.href = "/travel/accomodations";
    };

    return accoData && dest && duration ? (
      <div className={styles.hotel_container}>
        <div className={styles.hotel_info}>
          <div className={styles.hotel_header}>
            <p>
              Destination {numIndex + 1} | {capCity} | {checkIn} - {checkOut}
            </p>
          </div>
          <p className={styles.hotel_name}>{accoDetails[0].name}</p>
          <div className={styles.rating_container}>
            <div className={styles.rating_stars} />
            <p className={styles.rating_value}>{accoDetails[0].score}/10</p>
            <p className={styles.rating_count}>
              It have {accoDetails[0].total_Review} people reviewed
            </p>
          </div>
          <p className={styles.hotel_guests}>
            {accoDetails[0].num_Guest} guests · {accoDetails[0].num_Guest}{" "}
            bedroom · {accoDetails[0].num_Guest} bed · 1 bath
          </p>

          <div className={styles.hotel_image}>
            <img
              src={accoDetails[0].image}
              alt="Hotel image"
              className={styles.img_card}
            />
          </div>
          {/* This is a container of hotel_message including the price container */}
          <div className={styles.hotel_message_container}>
            {/* this is a sub-container of hotel message & facilities */}
            <div className={styles.hotel_message}>
              <p className={styles.hotel_describtion}>
                Come and stay in this superb duplex T2, in the heart of the
                historic center of Bordeaux. Spacious and bright, in a real
                Bordeaux building in exposed stone, you will enjoy all the
                charms of the city thanks to its ideal location. Close to many
                shops, bars and restaurants, you can access the apartment by
                tram A and C and bus routes 27 and 44....
              </p>

              <h2>What this place offers</h2>
              <div className={styles.hotel_availabilty}>
                <div className={styles.hotel_availabilty_item}>
                  <img src={garden} alt="Hotel image" />
                  <p>Garden View</p>
                </div>
                <div className={styles.hotel_availabilty_item}>
                  <img src={kitchenView} alt="Hotel image" />
                  <p>Kitchen</p>
                </div>
                <div className={styles.hotel_availabilty_item}>
                  <img src={wifi} alt="Hotel image" />
                  <p>Wifi</p>
                </div>
                <div className={styles.hotel_availabilty_item}>
                  <img src={paw} alt="Hotel image" />
                  <p>Pet allowed</p>
                </div>
                <div className={styles.hotel_availabilty_item}>
                  <img src={laundry} alt="Hotel image" />
                  <p>Free washer - in builiding</p>
                </div>
                <div className={styles.hotel_availabilty_item}>
                  <img src={dryer} alt="Hotel image" />
                  <p>Dryer</p>
                </div>
                <div className={styles.hotel_availabilty_item}>
                  <img src={airConditioner} alt="Hotel image" />
                  <p>Central air conditioning</p>
                </div>
                <div className={styles.hotel_availabilty_item}>
                  <img src={camera} alt="Hotel image" />
                  <p>Security cameras on property</p>
                </div>
                <div className={styles.hotel_availabilty_item}>
                  <img src={fridge} alt="Hotel image" />
                  <p>Refrigerator</p>
                </div>
                <div className={styles.hotel_availabilty_item}>
                  <img src={bicyle} alt="Hotel image" />
                  <p>Bicycles</p>
                </div>
              </div>
            </div>
            {/* This is a container of price label */}
            <div className={styles.price_container}>
              <p className={styles.totalPrice}>${totalPrice}</p>
              <p className={styles.durationTime}>
                {DurationTime[0].checkIn} - {DurationTime[0].checkOut}
              </p>
              <hr />
              <div className={styles.hotel_price_card}>
                <div className={styles.hotel_price_card_info}>
                  <span>
                    ${accoDetails[0].price.toFixed(2)} × {TotalDays} nights
                  </span>
                  <p>${priceWithDays}</p>
                </div>
                <div className={styles.hotel_price_card_info}>
                  <span>Booking Discount</span>
                  <p>${priceWithDiscount}</p>
                </div>
                <div className={styles.hotel_price_card_info}>
                  <span>Cleaning fee</span>
                  <p>${priceWithCleanFee}</p>
                </div>
                <div className={styles.hotel_price_card_info}>
                  <span>Service fee</span>
                  <p>${priceWithServiceFee}</p>
                </div>
                <div className={styles.hotel_price_card_info}>
                  <span>Occupancy taxes and fees</span>
                  <p>${priceWithTax}</p>
                </div>
                <button className={styles.saveButton} onClick={handleOpen}>
                  Add to plan
                </button>
                <div className={styles.contactDetail}>
                  <img
                    className={styles.contact_Detail_Img}
                    src={phone}
                    alt="Hotel image"
                  />
                  <p>Contact Host</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* source: https://mui.com/material-ui/react-alert/ */}
        <Collapse in={success}>
          <Alert severity="success">Successfully added to plan</Alert>
        </Collapse>
        {/* <button onClick={handleOpen}>Add to plan</button> */}
        {/* The following dialog component is derived from material UI: https://mui.com/material-ui/react-dialog/#FormDialog.tsx */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add accomodation to plan</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please confirm your check in and check out dates
            </DialogContentText>
            <TextField
              autoFocus
              id="checkIn"
              label="checkin"
              type="date"
              variant="standard"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
            />
            <TextField
              autoFocus
              label="checkout"
              id="checkOut"
              type="date"
              variant="standard"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
            />
            <br />
            <br />
            <p>Current total price: ${totalPrice}</p>
            <br />
            <p>
              {checkIn} - {checkOut}
            </p>
            <div className={styles.hotel_price_card}>
              <div className={styles.hotel_price_card_info}>
                <span>
                  ${accoDetails[0].price.toFixed(2)} × {TotalDays} nights
                </span>
                <p>${priceWithDays}</p>
              </div>
              <div className={styles.hotel_price_card_info}>
                <span>Booking Discount</span>
                <p>${priceWithDiscount}</p>
              </div>
              <div className={styles.hotel_price_card_info}>
                <span>Cleaning fee</span>
                <p>${priceWithCleanFee}</p>
              </div>
              <div className={styles.hotel_price_card_info}>
                <span>Service fee</span>
                <p>${priceWithServiceFee}</p>
              </div>
              <div className={styles.hotel_price_card_info}>
                <span>Occupancy taxes and fees</span>
                <p>${priceWithTax}</p>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : (
      <span>
        Please do not open me in a new tag, back to{" "}
        <a href="/travel/accomodations">previous page</a>
      </span>
    );
  }
}

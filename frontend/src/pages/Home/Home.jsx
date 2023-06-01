import { Player } from '@lottiefiles/react-lottie-player';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker } from 'antd';
import moment from 'moment';
import {
  faGlobe,
  faCity,
  faCalendarAlt,
  faUsers,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { AppContext } from '../../service/contexts/context';

export default function Home(props) {
  // everything including the user input, which will be brought to the accomodation view
  const [destinations, setDestinations] = useState([
    {
      dest: { cr: '', city: '' },
      duration: { checkIn: '', checkOut: '' },
      num_guest: { num: 1 },
      saved: false,
      savedDB: false,
    },
  ]);

  // check the booking times
  const [numBooking, setNumBooking] = useState(1);
  const [isFormComplete, setIsFormComplete] = useState([true]);
  const [isAllSaved, setIsAllSaved] = useState(true);

  // read the user info from the context
  const { user } = useContext(AppContext);

  const { RangePicker } = DatePicker;

  const addBooking = () => {
    setNumBooking(numBooking + 1);
    isFormComplete[destinations.length] = true;

    setDestinations([
      ...destinations,
      {
        dest: { cr: '', city: '' },
        duration: { checkIn: '', checkOut: '' },
        num_guest: { num: 1 },
        saved: false,
        savedDB: false,
      },
    ]);
  };

  const removeBooking = (e, index) => {
    if (numBooking > 1) {
      setNumBooking(numBooking - 1);
      setDestinations(
        destinations.filter((item) => destinations.indexOf(item) !== index)
      );
    }
    const check = destinations.every(({ saved }) => saved);
    if (numBooking === 1 && check === true) {
      setIsAllSaved(false);
    } else if (numBooking > 1 && check === true) {
      setIsAllSaved(false);
    } else {
      setIsAllSaved(true);
    }
  };

  const handleFormUpdate = (e, index_dest, param) => {
    let temp = [...destinations];
    switch (param) {
      case 'cr':
        temp[index_dest].dest.cr = e.target.value;
        break;
      case 'city':
        temp[index_dest].dest.city = e.target.value;
        break;
      case 'checkin':
        temp[index_dest].duration.checkIn = e.target.value;
        break;
      case 'checkout':
        temp[index_dest].duration.checkOut = e.target.value;
        break;
      case 'people':
        temp[index_dest].num_guest.num = e.target.value;
        break;
      case 'save':
        temp[index_dest].saved = true;
        break;
      case 'unsave':
        temp[index_dest].saved = false;
        break;
      default:
        break;
    }
    setDestinations(temp);
  };

  const handleInputChange = (e) => {
    destinations.map((_, index) => {
      if (
        destinations[index].dest.city !== '' &&
        destinations[index].duration.checkIn !== '' &&
        destinations[index].duration.checkOut !== ''
      ) {
        isFormComplete[index] = false;
      } else {
        isFormComplete[index] = true;
      }
    });
  };

  const handleSaveChange = () => {
    const check = destinations.every(({ saved }) => saved);
    if (numBooking === 1 && check === true) {
      setIsAllSaved(false);
    } else if (numBooking > 1 && check === true) {
      setIsAllSaved(false);
    } else {
      setIsAllSaved(true);
    }

    if (isFormComplete[numBooking] === true) {
      setIsAllSaved(true);
    }
    Cookies.set(
      'destData',
      JSON.stringify({
        dest_list: destinations
          .filter((item) => item.saved === true)
          .map((item) => {
            return JSON.stringify(item);
          }),
      })
    );
  };

  return (
    <>
      <div className={styles.page}>
        {user ? (
          <div className={styles.WelcomeHeader}>
            <h1>Hello {user.username}</h1>
            <h1>Welcome back! How about your trip?</h1>
          </div>
        ) : (
          <div className={styles.WelcomeHeader}>
            <h1>Hello Traveler, Happy to see you!</h1>
          </div>
        )}
        <div className={styles.MainPage}>
          <div className={styles.LeftBox}>
            <div className={styles.WelcomeText}>
              <p>
                Enjoy your tour here <br></br> with
              </p>
            </div>
            <div className={styles.Title}>
              <p>Travel_Funny</p>
            </div>

            <div className={styles.Introduction}>
              <p>
                Our travel site provides the best travel information for those
                who love to travel. We introduce various information about
                travel destinations, recommended accommodations, restaurants,
                tourist attractions, and provide a variety of tips and tricks
                that are necessary for your travels. Our site provides
                everything related to travel in one place, offering convenient
                information for those who are planning their trips, and striving
                to help you plan an even more enjoyable trip.
              </p>
            </div>
          </div>

          <div className={styles.RightBox}>
            <Player
              src="https://assets3.lottiefiles.com/packages/lf20_WAMQ5G.json"
              loop
              autoplay
              style={{ height: '500px', width: '500px' }}
            />
          </div>
        </div>
        <div className={styles.Booking}>
          {Array.from({ length: numBooking }).map((_, index) => (
            <form
              key={index}
              className={styles.bookingContent}
              onSubmit={(e) => {
                e.preventDefault();
              }}
              onChange={(e) => handleFormUpdate(e, index, 'unsave')}
            >
              <div className={styles.formGroup}>
                <label htmlFor="country">
                  <FontAwesomeIcon icon={faGlobe} />
                  <span>Country/Region:</span>
                </label>
                <input
                  type="text"
                  id="country"
                  value={destinations[index].dest.cr}
                  onChange={(e) => handleFormUpdate(e, index, 'cr')}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="city">
                  <FontAwesomeIcon icon={faCity} />
                  <span>City:</span>
                </label>
                <input
                  type="text"
                  id="city"
                  value={destinations[index].dest.city}
                  onChange={(e) => {
                    handleFormUpdate(e, index, 'city');
                    handleInputChange(e);
                  }}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>Dates:</span>
                </label>
                <RangePicker
                  className={styles.antdRangePicker}
                  size="middle"
                  value={[
                    moment(destinations[index].duration.checkIn).isValid()
                      ? moment(destinations[index].duration.checkIn)
                      : null,
                    moment(destinations[index].duration.checkOut).isValid()
                      ? moment(destinations[index].duration.checkOut)
                      : null,
                  ]}
                  onChange={(dates, dateStrings) => {
                    handleFormUpdate(
                      { target: { value: dateStrings[0] } },
                      index,
                      'checkin'
                    );
                    handleFormUpdate(
                      { target: { value: dateStrings[1] } },
                      index,
                      'checkout'
                    );
                    handleInputChange();
                  }}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="people">
                  <FontAwesomeIcon icon={faUsers} />
                </label>
                <select
                  id="people"
                  value={destinations[index].num_guest.num}
                  onChange={(e) => {
                    handleFormUpdate(e, index, 'people');
                    handleInputChange(e);
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                {destinations[index].saved ? (
                  <button
                    type="button"
                    id={index}
                    disabled={true}
                    className={styles.saveBookingBtn}
                  >
                    {' '}
                    Saved!
                  </button>
                ) : (
                  <button
                    type="button"
                    id={index}
                    disabled={isFormComplete[index]}
                    className={styles.saveBookingBtn}
                    onClick={(e) => {
                      handleFormUpdate(e, index, 'save');
                      handleSaveChange(e);
                    }}
                  >
                    {' '}
                    Save Plan
                  </button>
                )}
                {index !== 0 && numBooking > 1 && (
                  <button
                    type="button"
                    className={styles.deleteBookingBtn}
                    disabled={!destinations[index].saved}
                    onClick={(e) => removeBooking(e, index)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
              </div>
              <div className={styles.submitGroup}>
                {index + 1 === numBooking && (
                  <Link
                    // disable the link if not logged in
                    onClick={(e) => {
                      if (!user) {
                        e.preventDefault();
                      }
                    }}
                    to="travel/accomodations"
                    state={{
                      dest_list: destinations.filter(
                        (item) => item.saved === true
                      ),
                    }}
                  >
                    <button
                      type="submit"
                      disabled={isAllSaved}
                      // save user input data into cookies
                      onClick={() => {
                        {
                          if (user) {
                            Cookies.set(
                              'destData',
                              JSON.stringify({
                                dest_list: destinations
                                  .filter((item) => item.saved === true)
                                  .map((item) => {
                                    return JSON.stringify(item);
                                  }),
                              })
                            );
                          } else {
                            alert('Please login first!');
                            window.location.href = '/login';
                          }
                        }
                      }}
                    >
                      Search
                    </button>
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    addBooking();
                    handleSaveChange();
                  }}
                  disabled={isAllSaved}
                  className={styles.addBookingBtn}
                >
                  Add Plan
                </button>
              </div>
              {index < numBooking - 1 && <hr />}
            </form>
          ))}
        </div>
      </div>
    </>
  );
}

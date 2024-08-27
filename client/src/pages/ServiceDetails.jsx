import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "../components/StarRating";
import { useAuth } from "../context/AuthContext";
import AddRating from "../components/AddRating";
const ServiceDetails = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [rating,setRating]=useState(0);
  const {user}=useAuth();
  //const userID = '66b8653ad29ca4b7fac22393';
  const userID=user._id;
  const serviceID=id;
  const handleRatingSelect=(rating)=>{
    setRating(rating);
  }
  //Save the newly added comment
  const handleSaveComment = () => {
    //alert(comment);
    const data = {
      userID,
      serviceID,
      rating,
      comment,
    };
    console.log(data);
    axios
      .post("http://localhost:5200/review", data)
      .then(() => {
        alert("Comment added successfully");
      })
      .catch((error) => {
        alert("Error happened");
        console.log(error);
      });
  };

    // Fetch the service details from the server
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5200/service/${id}`)
            .then((res) => {
                setService(res.data);
                setMainImage(res.data.images[0]);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        const fetchLists = () => {
            setLoading(true);
            axios.get(`http://localhost:5200/list/${user._id}`)
                .then((res) => {
                    setLists(res.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        };
        if (user) {
            fetchLists();
        }
    }, [user]);

    //fetch the reviews for the service
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5200/review/service/${id}`)
            .then((res) => {
                setReviews(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    // Handle adding service to a list
    const handleAddList = (listID, serviceID, event) => {
        event.stopPropagation();
        // setLoading(true);
        axios.post(`http://localhost:5200/list/${user._id}/list/${listID}`, { serviceID })
            .then((res) => {
                console.log(res.data.message);
                setOpenMenuId(null);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const toggleMenu = (id, event) => {
        event.stopPropagation(); // Prevent event propagation
        event.preventDefault(); // Prevent default action

        if (!user) {
            alert('Please log in to add services to a list');
            return;
        }

        setOpenMenuId(openMenuId === id ? null : id);
    };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!service) {
    return <p>Service not found.</p>;
  }

    return (
        <div className="container mx-auto p-8">
            <div className="relative shadow-lg bg-gray-100 rounded-lg p-6">
                <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img id="mainImage" className="h-auto max-w-full rounded-lg" src={mainImage} alt="Main" />
                    </div>
                    <div className="space-y-4">
                        <p className="text-lg">{service.description}</p>
                        <p className="text-lg"><strong>Posted by:</strong> {user.firstName} {user.lastName}</p>
                        <p className="text-lg"><strong>Category:</strong> {service.category.name}</p>
                        <p className="text-lg"><strong>Type:</strong> {service.type.name}</p>
                        <p className="text-lg"><strong>Location:</strong> {service.city}</p>
                        <p className="text-lg"><strong>Price:</strong> {service.price}</p>
                        <div className="grid grid-cols-5 gap-4">
                            {service.images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        className="h-auto max-w-full rounded-lg cursor-pointer"
                                        src={image}
                                        alt={`post ${index + 1}`}
                                        onClick={() => setMainImage(image)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    onClick={(e) => toggleMenu(service._id, e)}
                    className="absolute z-20 top-2 right-4 text-gray-600 hover:text-gray-900"
                >
                    <p className="text-2xl font-bold">+</p>
                </button>
                {openMenuId === service._id && user && (
                    <div ref={menuRef} className="absolute top-7 right-2 mt-2 w-auto bg-white rounded-md shadow-lg z-20">
                        <ul>
                            <li className="px-4 py-2">Add to List</li>
                            {lists.map((list) => (
                                <li
                                    onClick={(e) => handleAddList(list._id, service._id, e)}
                                    className="px-4 py-2 hover:bg-gray-100 hover:rounded-md cursor-pointer"
                                    key={list._id}
                                >
                                    {list.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
            <div className="mt-5">
            <h2 className="text-2xl font-bold mb-4 mt-5">Reviews</h2>
            {reviews.map((review, index) => (
              <div
                className="mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <ol className="divide-y divider-gray-200 dark:divide-gray-700">
                  <li>
                    <a
                      href="#"
                      className="items-center block p-3 sm:flex hover:bg-gray-100 hover:rounded-lg dark:hover:bg-gray-700"
                    >
                      <img
                        className="w-16 mb-3 me-3 rounded-full sm:mb-0"
                        src={`http://localhost:5200/${review.userID.profilePhoto}`}
                        alt=""
                      />
                      <div className="text-gray-600 dark:text-gray-400">
                        <div className="text-base font-normal">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {review.userID.firstName} {review.userID.lastName}
                          </span>{" "}
                        </div>
                        <div className="text-sm font-normal">
                          " {review.comment} "
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                    </a>
                  </li>
                </ol>
              </div>
            ))}
            <div>
              <form>
                <label className="sr-only">
                  Your message
                </label>
                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <textarea
                    id="chat"
                    rows="1"
                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border 
        border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-green-800 dark:border-green-600
         dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="Your Comment..."
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  {/* <button type="submit" className="inline-flex justify-center p-2 text-green-600 rounded-full cursor-pointer hover:bg-green-100 dark:text-green-500 dark:hover:bg-gray-600">
            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"
        onClick={handleSaveComment}
        
        /> */}
            {/* </svg> */}
            {/* <span className="sr-only" >Send message</span>
        
        </button> */}
                  <button onClick={handleSaveComment}>Save Comment</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    
    );
};

export default ServiceDetails;

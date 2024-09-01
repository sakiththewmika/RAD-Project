import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";

const Editor = ({ value, onChange }) => {
    return (
        <div className="container">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                className="border-2 w-full focus:ring-[#139086] focus:border-[#139086] border-[#0F766E]"
            />
        </div>
    );
};

const AddService = () => {
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [typeID, setTypeID] = useState("");
    const [typeName, setTypeName] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [phone, setPhone] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [CategoryError, setCategoryError] = useState("");
    const [typeError, setTypeError] = useState("");
    const [cityError, setCityError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [imagesError, setImagesError] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5200/category")
            .then((res) => {
                setCategories(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5200/type")
            .then((res) => {
                setTypes(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        setTitleError(value ? "" : "Title is required");
    };

    const handleDescriptionChange = (content) => {
        setDescription(content);
        setDescriptionError(content ? "" : "Description is required");
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategoryID(value);
        const category = categories.find((category) => category._id === value);
        setCategoryName(category.name);
        setCategoryError(value ? "" : "Category is required");
    };

    const handleTypeChange = (e) => {
        const value = e.target.value;
        setTypeID(value);
        const type = types.find((type) => type._id === value);
        setTypeName(type.name);
        setTypeError(value ? "" : "Type is required");
    };

    const handleCityChange = (e) => {
        const value = e.target.value;
        setCity(value);
        setCityError(value ? "" : "City is required");
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPrice(value);
        setPriceError(value ? "" : "Price is required");
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(validateEmail(value) ? "" : "Invalid email address");
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^07[0-9]\d{7}$/;
        return mobileRegex.test(mobile);
    };    

    const handleMobileChange = (e) => {
        const value = e.target.value;
        setMobile(value);
        setMobileError(validateMobile(value) ? "" : "Invalid mobile number");
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
        setPhoneError(validatePhone(value) ? "" : "Invalid phone number");
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const validTypes = ["image/jpeg", "image/png"];
        let isValid = true;

        files.forEach((file) => {
            if (!validTypes.includes(file.type)) {
                isValid = false;
            }
        });

        if (!isValid) {
            setImagesError("Please select only JPEG or PNG image files");
        } else {
            setImages([...images, ...files]); // Combine the new files with existing ones
            setImagesPreview([...imagesPreview, ...files]); // Update the preview array
            setImagesError("");
        }
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index)); // Remove image from the files list
        setImagesPreview(imagesPreview.filter((_, i) => i !== index)); // Update the preview list
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            setTitleError("Title is required");
        }
        if (!description) {
            setDescriptionError("Description is required");
        }
        if (!categoryID) {
            setCategoryError("Category is required");
        }
        if (!typeID) {
            setTypeError("Type is required");
        }
        if (!city) {
            setCityError("City is required");
        }
        if (!price) {
            setPriceError("Price is required");
        }
        if (!email) {
            setEmailError("Email is required");
        }
        if (!mobile) {
            setMobileError("Mobile is required");
        }
        if (!phone) {
            setPhoneError("Phone is required");
        }
        if (images.length === 0) {
            setImagesError("Images are required");
        }

        if (
            title &&
            description &&
            categoryID &&
            typeID &&
            city &&
            price &&
            email &&
            mobile &&
            phone &&
            images.length > 0
        ) {
            const formData = new FormData();
            formData.append("userID", user._id);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("categoryID", categoryID);
            formData.append("categoryName", categoryName);
            formData.append("typeID", typeID);
            formData.append("typeName", typeName);
            formData.append("city", city);
            formData.append("price", price);
            formData.append("email", email);
            formData.append("mobile", mobile);
            formData.append("phone", phone);

            images.forEach((image) => {
                formData.append("images", image);
            });

            try {
                await axios.post("http://localhost:5200/service", formData);
                navigate("/provider");
            } catch (error) {
                console.error(error);
                setError("Something went wrong");
            }
        }
    }


    return (
        <div className="bg-white m-6 p-8">
            <h1 className="text-2xl font-semibold mb-4">Add Service</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {/* First Column */}
                <div className="grid grid-cols-1">
                    <div>
                        <label className="block text-lg text-gray-500 mb-1">Title</label>
                        <input
                            id="title"
                            type="text"
                            onChange={handleTitleChange}
                            className={`border-2 px-4 py-1 w-full focus:ring-[#139086] focus:border-[#139086] ${titleError ? "border-red-500" : "border-[#0F766E]"
                                }`}
                        />
                        {titleError && <p className="text-red-500">{titleError}</p>}

                        <label className="block text-lg text-gray-500 mb-1 mt-4">Description</label>
                        <Editor value={description} onChange={handleDescriptionChange} />
                        {descriptionError && <p className="text-red-500">{descriptionError}</p>}

                        <label className="block text-lg text-gray-500 mb-1 mt-4">Images</label>
                        <div className="relative">
                            <input
                                id="images"
                                type="file"
                                multiple
                                onChange={handleImagesChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="images"
                                className="cursor-pointer inline-block bg-[#139086] text-white px-4 py-2 rounded-md"
                            >
                                Add Image
                            </label>
                            {imagesError && <p className="text-red-500">{imagesError}</p>}
                        </div>
                        {imagesPreview.length > 0 && (
                            <div className="flex flex-wrap gap-4 mt-4">
                                {imagesPreview.map((image, index) => (
                                    <div key={index} className="relative w-24 h-24">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                        <button
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {/* Second Column with two columns inside */}
                <div className="grid grid-cols-2 gap-x-4">
                    <div>
                        <label className="block text-lg text-gray-500 mb-1">Category</label>
                        <select
                            id="category"
                            onChange={handleCategoryChange}
                            className={`border-2 px-4 py-1 w-full focus:ring-[#139086] focus:border-[#139086] ${CategoryError ? "border-red-500" : "border-[#0F766E]"
                                }`}
                        >
                            <option value="">Select a Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {CategoryError && <p className="text-red-500">{CategoryError}</p>}
                    </div>
                    <div>
                        <label className="block text-lg text-gray-500 mb-1">Type</label>
                        <select
                            id="type"
                            onChange={handleTypeChange}
                            className={`border-2 px-4 py-1 w-full focus:ring-[#139086] focus:border-[#139086] ${typeError ? "border-red-500" : "border-[#0F766E]"
                                }`}
                        >
                            <option value="">Select a Type</option>
                            {types.map((type) => (
                                <option key={type._id} value={type._id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        {typeError && <p className="text-red-500">{typeError}</p>}
                    </div>
                    <div>
                        <label className="block text-lg text-gray-500 mb-1 mt-4">City</label>
                        <input
                            id="city"
                            type="text"
                            onChange={handleCityChange}
                            className={`border-2 px-4 py-1 w-full focus:ring-[#139086] focus:border-[#139086] ${cityError ? "border-red-500" : "border-[#0F766E]"
                                }`}
                        />
                        {cityError && <p className="text-red-500">{cityError}</p>}
                    </div>
                    <div>
                        <label className="block text-lg text-gray-500 mb-1 mt-4">Price</label>
                        <input
                            id="price"
                            type="number"
                            onChange={handlePriceChange}
                            className={`border-2 px-4 py-1 w-full focus:ring-[#139086] focus:border-[#139086] ${priceError ? "border-red-500" : "border-[#0F766E]"
                                }`}
                        />
                        {priceError && <p className="text-red-500">{priceError}</p>}
                    </div>
                    <div>
                        <label className="block text-lg text-gray-500 mb-1 mt-4">Mobile</label>
                        <input
                            id="mobile"
                            type="text"
                            onChange={handleMobileChange}
                            className={`border-2 px-4 py-1 w-full focus:ring-[#139086] focus:border-[#139086] ${mobileError ? "border-red-500" : "border-[#0F766E]"
                                }`}
                        />
                        {mobileError && <p className="text-red-500">{mobileError}</p>}
                    </div>
                    <div>
                        <label className="block text-lg text-gray-500 mb-1 mt-4">Phone</label>
                        <input
                            id="phone"
                            type="text"
                            onChange={handlePhoneChange}
                            className={`border-2 px-4 py-1 w-full focus:ring-[#139086] focus:border-[#139086] ${phoneError ? "border-red-500" : "border-[#0F766E]"
                                }`}
                        />
                        {phoneError && <p className="text-red-500">{phoneError}</p>}
                    </div>
                    <div>
                        <label className="block text-lg text-gray-500 mb-1 mt-4">Email</label>
                        <input
                            id="email"
                            type="email"
                            onChange={handleEmailChange}
                            className={`border-2 px-4 py-1 w-full focus:ring-[#139086] focus:border-[#139086] ${emailError ? "border-red-500" : "border-[#0F766E]"
                                }`}
                        />
                        {emailError && <p className="text-red-500">{emailError}</p>}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                <Link
                    to="/providerdashboard"
                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="bg-[#139086] text-yellow-500 font-medium px-4 py-2 rounded-md hover:bg-[#0F766E]"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default AddService;
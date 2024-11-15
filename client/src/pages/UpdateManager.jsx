import { useEffect, useState } from "react";
import logo from "../assets/bookMyPitch.png";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store";
import UserNav from "../components/UserNav";

function UpdateManager() {
  const { user , setUser } = useUserStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [price, setPrice] = useState("");
  const [turfName, setTurfName] = useState("");
  const [openTime, setOpenTime] = useState();
  const [closeTime, setCloseTime] = useState();
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("");
  const [images, setImages] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get(
          `https://bookmypitch.onrender.com/api/turf/${user._id}`
        );
        console.log(res);
        if (res.status === 200) {
          setData(res.data);
          setFname(res.data.firstName);
          setLname(res.data.lastName);
          setEmail(res.data.email);
          setPhoneno(res.data.phoneno);
          setTurfName(res.data.turfName);
          setPrice(res.data.price);
          setLocation(res.data.address);
          setDesc(res.data.desc);
          setCity(res.data.city);
        }

        //setOpenTime(data.openTime)
        //setCloseTime(data.closeTime)
      } catch (error) {
        console.error(error);
      }
    };

    fetchInfo();
  }, []);

  const validateSecondPage = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    // if (pass.length != 8) {
    //   toast.error("Password length must be of 8 characters");
    //   return;
    // }
    // if (pass !== confirmPass) {
    //   toast.error("Confirm password and password don't match");
    //   return;
    // }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }
    if (!phoneRegex.test(phoneno)) {
      toast.error("Phone number must have 10 numbers");
      return;
    }

    return true;
  };

  const submitData = async (e) => {
    e.preventDefault();
    const isValid = validateSecondPage();
    if (isValid) {
      try {
        const formData = new FormData();
        //let d = new Date(openTime);
        //console.log(`${openTime.getHours()}:${openTime.getMinutes()}`);

        formData.set("email", email);
        formData.set("firstName", fname);
        formData.set("lastName", lname);
        formData.set("phoneno", phoneno);
        formData.set("price", price);
        formData.set("turfName", turfName);
        formData.set("openTime", openTime);
        formData.set("closeTime", closeTime);
        formData.set("address", location);
        formData.set("desc", desc);
        formData.set("city", city);

        const body = {
          firstName : fname,
          lastName : lname,
          email,
          phoneno,
          price,
          turfName,
          openTime,
          closeTime,
          address: location,
          desc,
          city,
        };

        // images.forEach((image) => {
        //   formData.append("turfImages", image);
        // });

        console.log(formData);
        console.log(body)
        //console.log(user)
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        const response = await axios.put(
          `https://bookmypitch.onrender.com/api/turf/update/${user._id}`,
          body,
          
        );
        console.log("Response:", response.data);
        if (response.status === 200) {
          console.log(response.data.turf)
          setUser(response.data.turf)
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 403) {
          toast.error("Manager already exist");
        } else {
          toast.error(error.message);
        }
      }
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div className="className={mt-20}">
      <UserNav />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
      />
      <form
        encType="multipart/form-data"
        onSubmit={submitData}
        className="pt-36 font-semibold justify-center text-4xl flex items-center flex-col gap-6"
      >
        <div>
          <div className="flex justify-center mb-4">
            <h2 className="">Update</h2>
          </div>

          {/* first name */}

          <div className="flex gap-4">
            <div className="flex flex-col text-xl">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                id="fname"
                className="w-[14.5vw] p-2 bg-bg border-[1px] border-black"
              />
            </div>
            {/* last name */}
            <div className="flex flex-col text-xl">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                id="lname"
                className="w-[14.5vw] p-2 bg-bg border-[1px] border-black"
              />
            </div>
          </div>
          {/* phone */}
          <div className="flex flex-col text-xl">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            />
          </div>
          {/* email */}
          <div className="flex flex-col text-xl">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
              id="phone"
              className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            />
          </div>
          {/*  password */}
          {/* <div className="flex flex-col text-xl">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              id="password"
              className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            />
          </div>
          <div className="flex flex-col text-xl">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              id="password"
              className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            />
          </div> */}
        </div>

        <div>
          {/* =================================================================== */}
          {/* =================             Second page              ============ */}
          {/* =================================================================== */}
          {/* turf name  */}
          <div className="flex flex-col text-xl">
            <label htmlFor="turfName">Turf Name</label>
            <input
              type="text"
              value={turfName}
              onChange={(e) => setTurfName(e.target.value)}
              id="turfName"
              className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            />
          </div>
          {/* price per hour  */}
          <div className="flex flex-col text-xl">
            <label htmlFor="price">Price per hour </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="price"
              className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            />
          </div>
          {/* Opening time */}
          <div className="flex flex-col text-xl">
            <label htmlFor="openTime">Opening time</label>
            <DatePicker
              selected={openTime}
              onChange={setOpenTime}
              showTimeSelect
              showTimeSelectOnly
              timeInputLabel="Time:"
              timeFormat="HH:mm"
              timeIntervals={60}
              dateFormat="HH:mm"
              className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            />
            {/* <TimePicker onChange={setOpenTime} value={openTime}   /> */}
          </div>
          {/* Closing time */}
          <div className="flex flex-col text-xl">
            <label htmlFor="closeTime">Closing time</label>
            <DatePicker
              selected={closeTime}
              onChange={setCloseTime}
              showTimeSelect
              showTimeSelectOnly
              timeInputLabel="Time:"
              timeFormat="HH:mm"
              timeIntervals={60}
              dateFormat="HH:mm"
              className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            />
            {/* <TimePicker onChange={setCloseTime} value={closeTime}   /> */}
          </div>
          <div className="flex flex-col text-xl">
            <label htmlFor="location">Address</label>
            <textarea
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              id="location"
              rows="3"
              className="w-[30vw] bg-bg border-[1px] border-black "
            ></textarea>
          </div>
          {/* desc */}
          <div className="flex flex-col text-xl">
            <label htmlFor="desc">Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              id="desc"
              rows="3"
              className="w-[30vw] bg-bg border-[1px] border-black "
            ></textarea>
          </div>
          {/* City input */}
          <div className="flex flex-col text-xl">
            <label htmlFor="city">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              id="city"
              className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            />
          </div>
          {/* Image upload input */}
          {/* <div className="flex flex-col text-xl">
            <label htmlFor="images">Upload Images (up to 5)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              id="turfImages"
              name="turfImages"
              className="w-[30vw] p-2 bg-bg border-[1px] border-black"
            />
          </div> */}
          <div className="my-4">
            <button
              type="submit"
              className="p-2 w-full font-light text-xl bg-black text-white hover:bg-neutral-800"
            >
              Update
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default UpdateManager;

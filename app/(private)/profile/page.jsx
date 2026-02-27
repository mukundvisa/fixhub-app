"use client";
import Image from "next/image";
import Link from "next/link";
import profile from "../../../images/profile.jpg";
import { useState, useEffect, useRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import emptyProfile from "../../../images/empty.png";
import Swal from "sweetalert2";

const page = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [total, setTotal] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    bio: "",
    address: "",
    city: "",
    country: "",
    pincode: "",
    profile_image: "",
  });

  // Get User ID
  useEffect(() => {
    fetch("/api/user-id")
      .then((res) => res.json())
      .then((data) => {
        (setUserName(data.name), setUserId(data.id));
      });
  }, []);

  // Get Total of user problems
  useEffect(() => {
    if (!userId) return;
    fetch(`/api/get-fix?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setTotal(data.total);
      });
  }, [userId]);

  // Get User Profile data
  useEffect(() => {
    if (!userId) return;

    fetch(`/api/profile/`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [userId]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // preview image
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  // Remove Image
  const handleRemoveImage = () => {
    setUser((prev) => ({
      ...prev,
      profile_image: "",
      file: null,
    }));
  };

  // update profile api call
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("id", user.id);
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("gender", user.gender);
      formData.append("bio", user.bio);
      formData.append("address", user.address);
      formData.append("city", user.city);
      formData.append("country", user.country);
      formData.append("pincode", user.pincode);

      if (selectedFile) {
        formData.append("profile_image", selectedFile);
      }

      const res = await fetch("/api/update-profile", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profile Updated Successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    // Step 1: Confirm
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to permanently delete your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Continue",
    });

    if (!confirmResult.isConfirmed) return;

    // Step 2: Ask Password
    const { value: password } = await Swal.fire({
      title: "Enter Your Password",
      input: "password",
      inputPlaceholder: "Enter your account password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Verify",
    });

    if (!password) return;

    // Step 3: Verify Password
    const verifyRes = await fetch("/api/verify-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        password,
      }),
    });

    const verifyData = await verifyRes.json();

    if (!verifyRes.ok) {
      Swal.fire("Error", verifyData.message, "error");
      return;
    }

    // Step 4: Final Delete Confirmation
    const finalConfirm = await Swal.fire({
      title: "Final Confirmation",
      text: "This action cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete My Account",
    });

    if (!finalConfirm.isConfirmed) return;

    // Step 5: Delete API Call
    const deleteRes = await fetch("/api/delete-user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
      }),
    });

    const deleteData = await deleteRes.json();

    if (deleteRes.ok) {
      await Swal.fire({
        title: "Deleted!",
        text: "Your account has been deleted.",
        icon: "success",
      });

      window.location.href = "/";
    } else {
      Swal.fire("Error", deleteData.message, "error");
    }
  };

  return (
    <>
      <section className="relative w-full pt-32 pb-20">
        <Image
          src={profile}
          alt="Add Fix Banner"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-white/80 dark:bg-black/80 " />

        <div className="relative container mx-auto px-4">
          <nav className="mb-4 text-sm">
            <ol className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-neutral-900 dark:text-neutral-200">
                Profile
              </li>
            </ol>
          </nav>

          <span className="inline-block mb-4 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 px-4 py-1 text-sm font-medium">
            Profile
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            {userName}
          </h1>

          <p className="mt-4 max-w-2xl text-neutral-700 dark:text-neutral-300 text-base md:text-lg">
            Welcome, {userName}!
            <br />
            Here you can review and edit your personal details, update your
            contact information, and customize your profile information anytime.
          </p>
        </div>
      </section>

      <div className="min-h-screen py-10 px-4">
        <div className="container mx-auto bg-black dark:bg-white shadow-xl rounded-2xl p-6 sm:p-10">
          <h2 className="text-2xl font-semibold text-white dark:text-black mb-8">
            Personal Information
          </h2>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <Image
                src={
                  previewUrl
                    ? previewUrl
                    : user.profile_image
                      ? user.profile_image
                      : emptyProfile
                }
                alt="Profile"
                width={120}
                height={120}
                className="w-30 h-30 rounded-full object-cover border-2 border-blue-400 dark:border-black"
              />

              <div className="flex gap-4">
                <input
                  type="file"
                  id="profileImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  name="profile_image"
                />

                <label
                  htmlFor="profileImage"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition"
                >
                  Upload Image
                </label>

                <button
                  onClick={handleRemoveImage}
                  type="button"
                  className="px-5 py-2 bg-red-600  text-white rounded-lg hover:opacity-80 transition cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-medium text-white dark:text-black mb-2">
                  Full Name
                </label>
                <input
                  value={user.name}
                  onChange={handleChange}
                  name="name"
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black 
            text-black dark:text-white border border-transparent 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
            dark:focus:ring-blue-800 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-white dark:text-black mb-2">
                  Email
                </label>
                <input
                  value={user.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black 
            text-black dark:text-white border border-transparent 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
            dark:focus:ring-blue-800 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-white dark:text-black mb-2">
                  Phone Number
                </label>
                <input
                  value={user.phone}
                  onChange={handleChange}
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black 
            text-black dark:text-white border border-transparent 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
            dark:focus:ring-blue-800 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-white dark:text-black mb-2">
                  Gender
                </label>
                <select
                  value={user.gender}
                  onChange={handleChange}
                  name="gender"
                  className="w-full px-4 py-3.5 rounded-lg bg-white dark:bg-black
            text-black dark:text-white border border-transparent 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
            dark:focus:ring-blue-800 outline-none transition"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-white dark:text-black mb-2">
                Bio
              </label>
              <textarea
                value={user.bio}
                onChange={handleChange}
                name="bio"
                rows={4}
                placeholder="Write something about yourself..."
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black 
          text-black dark:text-white border border-transparent 
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
          dark:focus:ring-blue-800 outline-none transition"
              ></textarea>
            </div>

            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-white dark:text-black mb-6">
                Address Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-base font-medium text-white dark:text-black mb-2">
                    Address
                  </label>
                  <input
                    value={user.address}
                    onChange={handleChange}
                    name="address"
                    type="text"
                    placeholder="Enter address"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black 
              text-black dark:text-white border border-transparent 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
              dark:focus:ring-blue-800 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-white dark:text-black mb-2">
                    City
                  </label>
                  <input
                    value={user.city}
                    onChange={handleChange}
                    name="city"
                    type="text"
                    placeholder="Enter city"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black 
              text-black dark:text-white border border-transparent 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
              dark:focus:ring-blue-800 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-white dark:text-black mb-2">
                    Pincode
                  </label>
                  <input
                    value={user.pincode}
                    onChange={handleChange}
                    name="pincode"
                    type="text"
                    placeholder="Enter pincode"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black 
              text-black dark:text-white border border-transparent 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
              dark:focus:ring-blue-800 outline-none transition"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-base font-medium text-white dark:text-black mb-2">
                    Country
                  </label>
                  <input
                    value={user.country}
                    onChange={handleChange}
                    name="country"
                    type="text"
                    placeholder="Enter country"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black
              text-black dark:text-white border border-transparent 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
              dark:focus:ring-blue-800 outline-none transition"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center py-10 gap-4">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>

          <div className="pt-10 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-white dark:text-black mb-6">
              Integration Overview
            </h2>

            <div className="bg-white dark:bg-black rounded-xl p-6 flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-black dark:text-white">
                  Total Problems Submitted
                </p>
                <p className="mt-2 text-2xl font-bold text-black dark:text-white">
                  {total}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-start items-center pt-10 gap-4">
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 
    bg-red-50 dark:bg-red-900/20 px-8 py-3 rounded-lg transition cursor-pointer"
            >
              <RiDeleteBin6Line size={18} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

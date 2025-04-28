import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function AddCarousel() {
    const [form, setForm] = useState({
        name: "",
        text: "",
        button1_text: "",
        button1_link: "",
        button2_text: "",
        button2_link: "",
        image: null
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        axios.post("/api/store-carousel", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
            Swal.fire("Success", res.data.message, "success");
            setForm({
                name: "",
                text: "",
                button1_text: "",
                button1_link: "",
                button2_text: "",
                button2_link: "",
                image: null
            });
            document.getElementById("carousel-form").reset();
        })
        .catch(error => {
            Swal.fire("Error", "Something went wrong!", "error");
            console.error("API error:", error);
        });
    };

    return (
        <div className="container mt-5">
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Add Sidebar</h4>
                    <Link to="/admin/view-Carousel" className="btn btn-primary btn-sm">View Sidebar</Link>
                </div>
                <div className="card-body">
                    <form onSubmit={submitForm} id="carousel-form">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="text" className="form-label">Text:</label>
                                <textarea
                                    id="text"
                                    name="text"
                                    className="form-control"
                                    rows="3"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="button1_text" className="form-label">Button 1 Text:</label>
                                <input
                                    type="text"
                                    id="button1_text"
                                    name="button1_text"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="button1_link" className="form-label">Button 1 Link:</label>
                                <input
                                    type="text"
                                    id="button1_link"
                                    name="button1_link"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="button2_text" className="form-label">Button 2 Text:</label>
                                <input
                                    type="text"
                                    id="button2_text"
                                    name="button2_text"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="button2_link" className="form-label">Button 2 Link:</label>
                                <input
                                    type="text"
                                    id="button2_link"
                                    name="button2_link"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image:</label>
                            <input
                                type="file"
                                id="image"
                                className="form-control"
                                onChange={handleFileChange}
                                required
                            />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Add Carousel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCarousel;

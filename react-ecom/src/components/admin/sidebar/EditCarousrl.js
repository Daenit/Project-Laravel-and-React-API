import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditCarousel() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        text: "",
        button1_text: "",
        button1_link: "",
        button2_text: "",
        button2_link: "",
        image: null,
    });
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        axios.get(`/api/edit-carousels/${id}`)
            .then((res) => {
                const carousel = res.data.carousel;
                setForm({
                    name: carousel.name,
                    text: carousel.text,
                    button1_text: carousel.button1_text,
                    button1_link: carousel.button1_link,
                    button2_text: carousel.button2_text,
                    button2_link: carousel.button2_link,
                    image: carousel.image, // Current image URL
                });
            })
            .catch((error) => {
                Swal.fire("Error", "Failed to fetch carousel data!", "error");
                console.error(error);
            });
    }, [id]);

    // Handle changes in input fields
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle file input change for image
    const handleFileChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    // Submit form data to update the carousel item
    const submitForm = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Send the updated data to the API
        axios.put(`/api/update-carousel/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            Swal.fire("Success", res.data.message, "success");
            navigate("/admin/view-Carousel"); // Redirect to carousel view page
        })
        .catch((error) => {
            Swal.fire("Error", "Something went wrong!", "error");
            console.error(error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="container mt-5">
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Edit Carousel</h4>
                    <Link to="/admin/view-Carousel" className="btn btn-primary btn-sm">
                        View Sidebar
                    </Link>
                </div>
                <div className="card-body">
                    <form onSubmit={submitForm} id="carousel-form">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="text" className="form-label">
                                    Text:
                                </label>
                                <textarea
                                    id="text"
                                    name="text"
                                    className="form-control"
                                    rows="3"
                                    value={form.text}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="button1_text" className="form-label">
                                    Button 1 Text:
                                </label>
                                <input
                                    type="text"
                                    id="button1_text"
                                    name="button1_text"
                                    className="form-control"
                                    value={form.button1_text}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="button1_link" className="form-label">
                                    Button 1 Link:
                                </label>
                                <input
                                    type="text"
                                    id="button1_link"
                                    name="button1_link"
                                    className="form-control"
                                    value={form.button1_link}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="button2_text" className="form-label">
                                    Button 2 Text:
                                </label>
                                <input
                                    type="text"
                                    id="button2_text"
                                    name="button2_text"
                                    className="form-control"
                                    value={form.button2_text}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="button2_link" className="form-label">
                                    Button 2 Link:
                                </label>
                                <input
                                    type="text"
                                    id="button2_link"
                                    name="button2_link"
                                    className="form-control"
                                    value={form.button2_link}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Image:
                            </label>
                            <input
                                type="file"
                                id="image"
                                className="form-control"
                                onChange={handleFileChange}
                            />
                            {form.image && !(form.image instanceof File) && (
                                <img src={`http://127.0.0.1:8000/${form.image}`} alt="Current Carousel Image" width="100" />
                            )}
                            {form.image && form.image instanceof File && (
                                <img src={URL.createObjectURL(form.image)} alt="Preview" width="100" />
                            )}
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                {loading ? "Updating..." : "Update Carousel"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCarousel;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ViewCarousel() {
    const [carousels, setCarousels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch carousels from the API
        axios.get("/api/carousels")
            .then(res => {
                if (res.data.status === 200) {
                    setCarousels(res.data.carousels);
                } else {
                    console.error("Error fetching carousel:", res.data.message);
                }
            })
            .catch(error => {
                console.error("API Error:", error);
                Swal.fire("Error", "Failed to load carousels!", "error");
            })
            .finally(() => setLoading(false)); // Set loading to false when data is fetched
    }, []);

    const deleteCarousel = (id) => {
        // Confirm the deletion
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Show loading state while deleting
                Swal.fire({
                    title: 'Deleting...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                // Send delete request to the API
                axios.delete(`/api/delete-carousel/${id}`)
                    .then(res => {
                        if (res.data.status === 200) {
                            Swal.fire("Deleted!", res.data.message, "success");
                            setCarousels(prev => prev.filter(item => item.id !== id)); // Remove deleted item from state
                        } else {
                            Swal.fire("Error", res.data.message, "error");
                        }
                    })
                    .catch(error => {
                        console.error("Delete Error:", error);
                        Swal.fire("Error", "Something went wrong!", "error");
                    });
            }
        });
    };

    // If still loading, show a loading message
    if (loading) {
        return <h4>Loading Carousel...</h4>;
    }

    return (
        <div className="container">
            <div className="card mt-4">
                <div className="card-header">
                    <h3>
                        Carousel List
                        <Link to="/admin/add-carousel" className="btn btn-primary btn-sm float-end">Add Carousel</Link>
                    </h3>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carousels.length > 0 ? carousels.map(carousel => (
                                <tr key={carousel.id}>
                                    <td>{carousel.id}</td>
                                    <td>
                                        <img
                                            src={`http://127.0.0.1:8000/${carousel.image}`}
                                            alt={carousel.name}
                                            width="50"
                                        />
                                    </td>
                                    <td>{carousel.name}</td>
                                    <td>
                                        <Link to={`/admin/edit-carousel/${carousel.id}`} className="btn btn-success btn-sm">Edit</Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteCarousel(carousel.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No Carousel Items Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewCarousel;

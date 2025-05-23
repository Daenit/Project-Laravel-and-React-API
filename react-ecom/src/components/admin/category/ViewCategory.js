import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ViewCategory() {
    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('/api/view-category')
            .then(res => {
                if (res.status === 200) {
                    setCategoryList(res.data.category);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
                setLoading(false);
            });
    };

    const deleteCategory = (e, id) => {
        e.preventDefault();
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/delete-category/${id}`)
                    .then(res => {
                        if (res.data.status === 200) {
                            Swal.fire("Deleted!", res.data.message, "success");
                            fetchCategories(); // Refresh list after delete
                        } else {
                            Swal.fire("Error", res.data.message, "error");
                        }
                    })
                    .catch(error => {
                        Swal.fire("Error", "Something went wrong!", "error");
                        console.error("Delete Error:", error);
                    });
            }
        });
    };

    if (loading) {
        return <h4>Loading Categories...</h4>;
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3>Category List</h3>
                    <Link to="/admin/add-category" className="btn btn-primary btn-sm">Add Category</Link>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryList.length > 0 ? (
                                categoryList.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.slug}</td>
                                        <td>{item.status === 1 ? "Active" : "Inactive"}</td>
                                        <td>
                                            <Link to={`/admin/edit-category/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-danger btn-sm" onClick={(e) => deleteCategory(e, item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No categories found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewCategory;

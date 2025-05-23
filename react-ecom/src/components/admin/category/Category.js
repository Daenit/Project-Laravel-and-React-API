import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Category() {
    const [categoryInput, setCategory] = useState({
        slug: '',
        name: '',
        description: '',
        status: 0,
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        error_list: {},
    });

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setCategory({ 
            ...categoryInput, 
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value 
        });
    };

    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keyword: categoryInput.meta_keyword,
            meta_description: categoryInput.meta_description,
        };

        axios.post('/api/store-category', data)
            .then(res => {
                if (res.data.status === 200) {
                    Swal.fire("Success", res.data.message, "success");
                    setCategory({
                        slug: '',
                        name: '',
                        description: '',
                        status: 0,
                        meta_title: '',
                        meta_keyword: '',
                        meta_description: '',
                        error_list: {},
                    });
                } else if (res.data.status === 400) {
                    setCategory({ ...categoryInput, error_list: res.data.errors });
                }
            })
            .catch(error => {
                Swal.fire("Error", "Something went wrong!", "error");
                console.error("API error:", error);
            });
    };

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Category 
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">View Category</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitCategory}>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                            </li>
                        </ul>

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                                    {categoryInput.error_list?.slug && <small className="text-danger">{categoryInput.error_list.slug}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                    {categoryInput.error_list?.name && <small className="text-danger">{categoryInput.error_list.name}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Status</label>
                                    <input type="checkbox" name="status" onChange={handleInput} checked={categoryInput.status === 1} /> Status 0=shown/1=hidden
                                </div>
                            </div>

                            <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                                <div className="form-group mb-3">
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control" />
                                    {categoryInput.error_list?.meta_title && <small className="text-danger">{categoryInput.error_list.meta_title}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Keywords</label>
                                    <textarea name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <textarea name="meta_description" onChange={handleInput} value={categoryInput.meta_description} className="form-control"></textarea>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Category;

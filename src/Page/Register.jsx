import React, {useState} from "react";
import { useFormik } from 'formik';
const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password= 'Required';
    } else if (values.password.length > 20) {
        errors.password = 'Must be 20 characters or less';
    }
    if (!values.password_confirmation) {
        errors.password= 'Required';
    } else if (values.password_confirmation !== values.password) {
        errors.password_confirmation = 'password not match';
    }
    return errors;
};
const Register = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        },
        validate,
        onSubmit: values => {

        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="form-signin text-center">
            <img className="mb-4"
                 src="https://images-platform.99static.com//yX_hJnvr7TFJSzYF-b_Z5euG1kg=/62x794:812x1544/fit-in/500x500/99designs-contests-attachments/128/128777/attachment_128777932"
                 alt=""
                 width="72" height="72"/>
            <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
            />
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
            <label htmlFor="email" className="sr-only">Email</label>
            <input
                className="form-control"
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            <label htmlFor="password" className="sr-only">Password</label>
            <input
                className="form-control"
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
            <label htmlFor="c_password" className="sr-only">Confirm password</label>
            <input
                className="form-control"
                type="password"
                id="c_password"
                name="password_confirmation"
                placeholder="Confirm password"
                onChange={formik.handleChange}
                value={formik.values.password_confirmation}
            />
            {formik.errors.password_confirmation ? <div>{formik.errors.password_confirmation}</div> : null}
            <button className="btn btn-lg btn-primary btn-block"  type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">© 2017-2018</p>

        </form>
    )
}

export default Register;

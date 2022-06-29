import React, {useEffect} from "react";
import {useFormik} from "formik";
import {useDispatch,useSelector} from "react-redux";
import {login, reset} from "../Redux/Auth/Auth";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import  {useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const {isSuccess,isError,isLoading,message} = useSelector(state => state.auth )
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            return history('/home');
        }
        dispatch(reset())
    },[isSuccess,isError,isLoading,message,dispatch])
    const validate = values => {
        const errors = {};

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
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            dispatch(login(values))
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="form-signin text-center">
            <img className="mb-4"
                 src="https://images-platform.99static.com//yX_hJnvr7TFJSzYF-b_Z5euG1kg=/62x794:812x1544/fit-in/500x500/99designs-contests-attachments/128/128777/attachment_128777932"
                 alt=""
                 width="72" height="72"/>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
           <div style={{"marginBottom": "20px","marginTop": "20px"}}>
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
           </div>
            <div style={{"marginBottom": "20px"}}>
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
            </div>

            <button className="btn btn-lg btn-primary btn-block"  type="submit">Login</button>
            <p className="text-muted" style={{"marginTop": "10px"}}>For Create Account click  <Link to='/register'>Here</Link></p>
            <p className="mt-5 mb-3 text-muted">© 2017-2018</p>

        </form>
    )
}

export default Login;

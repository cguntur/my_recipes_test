import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [isLogggedIn, setIsLoggedIn] = useState(true);
    console.log("Is Logged In: " + isLogggedIn);

    const [loginUser, {error: loginError }] = useMutation(LOGIN_USER);

    //Update state based on form input changes
    const handleChange = (event) => {
        const {name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    //Handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await loginUser({        
                variables: { email: formState.email, password: formState.password }, 
            });
            Auth.login(data.login.token);
            setIsLoggedIn(true);
        } catch (err) {
            console.error(err);
        }
    };

    return(
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <h4>Login</h4>

                <form onSubmit={handleFormSubmit}>
                    <input
                        className="form-input"
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <input
                        className="form-input"
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <button
                        className="btn btn-block btn-info"
                        style={{ cursor: 'pointer' }}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
                {
                    loginError && <div className="my-3 p-3 bg-danger text-white">{loginError.message}</div>
                }
            </div>
        </main>
    )
}

export default Login;
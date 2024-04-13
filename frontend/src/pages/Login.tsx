import React, { SyntheticEvent, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props: { setName: (name: string) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = useCallback(async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'omit',
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const content = await response.json();

            console.log('Response content:', content);

            // handle successful login
            // navigate to another page or set some state
            props.setName(content.name);
            navigate('/');
        } catch (err) {
            console.error('An error occurred:', err);
        }
    }, [email, password, navigate, props]);
    return (
        <body className='bodyClass' >
            <section className="sattalogo">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <a title="satta" href="/" className="blink" style={{ display: 'inline', opacity: 0.877126 }}>
                                <h1 style={{ fontWeight: 700 }}>SATA</h1>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-5 card">
                        <div className='wrap'>
                            <div className="login-wrap p-4 p-md-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Sign In</h3>
                                    </div>
                                </div>
                                <form onSubmit={submit} className='signin-form'>
                                    <div className="form-group mt-3">
                                        <input type="email" name="email" className="form-control" required
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <input id="password-field" type="password" className="form-control" name="password" required
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Password"
                                        />
                                        <span className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign in</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="somelinks" style={{ overflow: "hidden" }}>
                <a className="yellow-link mx-4" href="/legal/privacy-policy">Privacy Policy</a>
                <a className="yellow-link" href="/legal/terms-and-conditions">Terms &amp; Conditions</a>
                <br />
            </section>
            <section className="somelinks2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <strong>@ 2022 SATA All Rights Reserved</strong>
                        </div>
                    </div>
                </div>
            </section>
            <section className="somelinks">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <ul>
                                <li>
                                    <p style={{ color: "rgb(255, 216, 0)", fontWeight: 700 }}>
                                        !! DISCLAIMER:- thesata.com is a non-commercial website. Viewing This Website Is Your Own Risk, All The Information Shown On Website Is Sponsored And We Warn You That Matka Gambling/Satta May Be Banned Or Illegal In Your Country..., We Are Not Responsible For Any Issues Or Scam..., We Respect All Country Rules/Laws... If You Not Agree With Our Site Disclaimer... Please Quit Our Site Right Now. Thank You.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


        </body>

    );
};

export default Login;
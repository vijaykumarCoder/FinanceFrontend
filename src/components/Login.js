import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Login = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("Token"))
			navigate("/")
	})
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [warning,setWarning] = useState(false)
	const data = {
		username: username,
		password: password
	}
	const HandleSubmit = (e) => {
		e.preventDefault()
		console.log("hi")
		axios.post("http://127.0.0.1:8000/api/login", data)
			.then(resp => {
				localStorage.setItem("Token", resp.data.token)
				localStorage.setItem("Username", resp.data.user_data["username"])
				console.log(resp.data.user_data["username"])
				navigate('/');
			})
			.catch(error => {
				setWarning(true)
				setTimeout(() => {
					setWarning(false)
				}, 3000);
				console.log(error)
			})
	}
	return (
		<>
			<div className="container">
				<div className="screen">
					<div className="screen__content">
						<form className="login" onSubmit={HandleSubmit}>
							{
								warning && (
									<div className='alert-box'>
							<Stack sx={{ width: '100%' }} spacing={2}>
								<Alert severity="warning">Check your Credentials !</Alert>
							</Stack>
							</div>
								)
							}
							<div className="login__field">
								<i className="login__icon fas fa-user"></i>
								<input
									type="text"
									className="login__input"
									placeholder="User name"
									required
									onChange={e => setUsername(e.target.value)}
								/>
							</div>
							<div className="login__field">
								<i className="login__icon fas fa-lock"></i>
								<input
									type="password"
									className="login__input"
									placeholder="Password"
									required
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
							<button className="button login__submit" type='submit'>
								<span className="button__text">Log In Now</span>
								<i className="button__icon fas fa-chevron-right"></i>
							</button>
						</form>
						<div className="social-login">
							<h3>log in via</h3>
							<div className="social-icons">
								{/* <a href="#" className="social-login__icon fab fa-instagram"></a>
					<a href="#" className="social-login__icon fab fa-facebook"></a>
					<a href="#" className="social-login__icon fab fa-twitter"></a> */}
							</div>
						</div>
					</div>
					<div className="screen__background">
						<span className="screen__background__shape screen__background__shape4"></span>
						<span className="screen__background__shape screen__background__shape3"></span>
						<span className="screen__background__shape screen__background__shape2"></span>
						<span className="screen__background__shape screen__background__shape1"></span>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
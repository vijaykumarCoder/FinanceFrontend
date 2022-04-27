import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import logo from './Finance.png'

function Topbar() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    let token = localStorage.getItem("Token")
    let username = localStorage.getItem("Username")
    useEffect(() => {
        if (localStorage.getItem("Token")) {
            setShow(true)
        }
        else {
            setShow(false)
        }
    }, [token])

    const LogOut = (e) => {
        var config = {
            method: 'POST',
            url: `http://localhost:8000/api/logout`,
            headers: {
                Authorization: `Token ${token}`,
            },
        }

        axios(config)
            .then(resp => {
                localStorage.removeItem("Token")
                navigate("/login")
                console.log(resp)
                setShow(false)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='topbar'>
            <div className='Heading'>
                <h3>FINANCEPEER</h3>
                {/* <img src={logo} alt="logo"/> */}
                </div>
            {
                show ? (
                    <div className='topbar-user'>
                        <h5>{username}</h5>
                        <Button color='primary' variant='contained' size='small' onClick={e => { LogOut(e) }}>LogOut</Button>
                    </div>
                ):
                (
                    <div>
                        <Link to="/login"><Button color='primary' variant='contained' size='small'>Login Now</Button></Link>
                    </div>
                )
            }
        </div>
    )
}

export default Topbar
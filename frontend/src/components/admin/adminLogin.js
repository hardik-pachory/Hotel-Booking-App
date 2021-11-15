import { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { getAdmin } from '../../service/adminapi';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';

const initialValue = {
    username: '',
    password: '',
}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const AddAdmin = () => {
    const [admin, setAdmin] = useState(initialValue);
    const { username, password} = admin;
    const classes = useStyles();
    let history = useHistory();

    const onValueChange = (e) => {
        console.log(e.target.value);
        setAdmin({...admin, [e.target.name]: e.target.value})
    }
    const errorDisp = () =>
    {
        history.push('./admin');
    }
    const addAdminDetails = async() => {
        let response = await getAdmin();
        for(let i=0 ; response.data[i]!= null; i++)
        if(admin.username===response.data[i].username)
        history.push('./admin/signed');
        else
        errorDisp();
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Enter Admin Details</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='password' type='password' value={password} id="my-input"/>
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addAdminDetails()}>Login</Button>
            </FormControl>
        </FormGroup>
    )
}

export default AddAdmin;
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function Upload() {
  const [filepath, setFilepath] = useState()
  const [userData, setUserData] = useState([])

  const [datavalue,setDatavalue] = useState(0)
  const data = {
    upload: filepath
  }
  useEffect(() => {
    axios.get("http://localhost:8000/api/allusers")
      .then(resp => {
        setUserData(resp.data)
        console.log(resp)
      })
      .catch(error => {
        console.log(error)
      })
  }, [datavalue])

  const SelectedFile = (e) => {
    setFilepath(e.target.files[0])
    // console.log(e.target.files[0])
  }
  
  const HandleSubmit1 = e => {
    e.preventDefault()
    console.log(filepath.name)
    let formdata = new FormData()
    formdata.append("name", filepath.name)
    // formdata.append("name", "one.json")
    formdata.append("upload", filepath)

    axios.post("http://localhost:8000/api/upload", formdata, { headers: { "Content-Type": "multipart/form-data" } })
      .then(resp => { 
        console.log(resp) })
      .catch(error => { console.log(error) })
  }
  const Hi = (e) => {
    e.preventDefault()
    var formdata = new FormData();
    formdata.append("upload", filepath);
    formdata.append("name", filepath.name);

    var requestOptions = {
      method: 'POST',
      "mimeType": "multipart/form-data",
      "contentType": false,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/api/upload", requestOptions)
      // .then(response => response.text())
      .then(result => {
        setDatavalue(datavalue+1)
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Upload" {...a11yProps(0)} />
            <Tab label="Users Data" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
         <div className='uploadbox'>
         <form onSubmit={Hi}>
            <input 
            className='input-attach'
            type='file'
            name="fileattach"
            accept='application/json'
            required
            onChange={e => SelectedFile(e)} />
            <Button color='secondary' variant='outlined' size='small' type='submit'>upload</Button>
          </form>
         </div>

        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
            {userData.map(one => {
              return (<>
                <div>
                  <Card sx={{ minWidth: 275 }} style={{margin:"1px"}}>
                    <CardContent style={{borderLeft:'2px solid #FFBF00'}}>
                      <Typography sx={{ fontSize: 14 }} color="#008080" gutterBottom>
                        <b>UserId : </b>{one.userId}
                      </Typography>

                      <Typography sx={{ mb: 1.5 }} color="#40E0D0" >
                      <strong>Title : </strong>{one.title}
                      </Typography>
                      <Typography variant="body2">
                        <b>Body : </b>{one.body}

                      </Typography>
                    </CardContent>
                  </Card>

                </div>
              </>)
            })}
          </div>
        </TabPanel>

      </Box>



      <div>


      </div>
    </>

  )
}

export default Upload
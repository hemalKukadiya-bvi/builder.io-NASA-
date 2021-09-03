import React,{useState} from 'react'
import {Container,Typography,makeStyles,Box,TextField,Button,Dialog,DialogActions,DialogContent,TableContainer,Table,TableBody,TableCell,TableRow} from '@material-ui/core'

import api from '../Services/api'
import RandomAsteroid from './RandomAsteroid'

interface Props {
    
}

const useStyle=makeStyles((theme)=>({
    root:{
        height:"100vh",
        width:"100vw",
        padding:theme.spacing(3),
        backgroundColor:theme.palette.grey[200]
    },
    box:{
        padding:theme.spacing(2)
    }
}))


//main home component
const Home = (props: Props) => {

//all state hooks
    const [asteroidID, setasteroidID] = useState(null)
    const [asteroidData, setasteroidData] = useState({name:"",nasa_jpl_url:"",is_potentially_hazardous_asteroid:null})
    const [showDialog, setshowDialog] = useState<boolean>(false)
    

    const classes = useStyle();

    const handleChange=(e:any)=>{
        
        setasteroidID(e.target.value)
    }

    const handleSearch=()=>{
        api.fetchAsteroid(asteroidID).then((res)=>{
            if(res.status===200){
                setasteroidData(res.data)
                setshowDialog(true)
            }
        }).catch((err)=>{

        })
    }

    return (
        <>
        <Container className={classes.root} onClick={()=>setshowDialog(false)}>
        <Box className={classes.box}>
            <TextField variant="outlined" label="Asteroid ID" helperText="example - 2000433" placeholder="Enter Asteroid ID" onChange={handleChange}/>
        </Box>
        <Box className={classes.box}>
            <Button variant="contained" color="primary" onClick={()=>handleSearch()} disabled={asteroidID ?false:true}>Search</Button>
        </Box>

        <Dialog open={showDialog}>  
            <DialogContent>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell><Typography>NAME : </Typography></TableCell>
                                <TableCell><Typography>{asteroidData.name}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>NASA_JPL_URL : </Typography></TableCell>
                                <TableCell><Typography>{asteroidData.nasa_jpl_url}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>IS_HAZARDOUS_ASTEROID </Typography></TableCell>
                                <TableCell><Typography>{asteroidData.is_potentially_hazardous_asteroid===true?"Yes":"No"}</Typography></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={()=>setshowDialog(false)}>
                    Back
                </Button>
            </DialogActions>
        </Dialog>
        <Typography variant="h5">OR</Typography>
        <RandomAsteroid/>

        </Container>
        </>
    )
}

export default Home

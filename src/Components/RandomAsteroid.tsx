import React,{useState} from 'react'
import {Box,Button,DialogActions,DialogContent,Dialog,Table,TableBody,TableContainer,Typography,TableCell,TableRow,MenuItem,Select} from '@material-ui/core'
import api from '../Services/api'

interface Props {
    
}

//random choose asteroid component
const RandomAsteroid = (props: Props) => {

    const [allData, setallData] = useState([{id:0,name:"",nasa_jpl_url:"",is_potentially_hazardous_asteroid:null}])
    const [DisplayItem, setDisplayItem] = useState(0)
    
    const [dilogRand, setdilogRand] = useState(false)
    const [selectShow, setselectShow] = useState(false)

    const handleRandom=()=>{

        api.fetchRandomAll().then((res)=>{

            if(res.status===200){
                setallData(res.data.near_earth_objects);
                setselectShow(true)
            }
            
        })
    }


    const handleChange=(e:any)=>{
        
    setDisplayItem(e.target.value);
    setdilogRand(true)
    }

    return (
        <>
        <Box style={{margin:"3rem"}}>
            <Button variant="contained" color="primary" onClick={()=>handleRandom()}>
                Random
            </Button>
        </Box>
        
       {
       selectShow && 
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={DisplayItem}
          onChange={handleChange}
        //   input={<BootstrapInput />}
        >
          {allData.map((elem,index)=>(
                
                <MenuItem key={index} value={index} onClick={()=>{}}>{allData[index].id}</MenuItem>
                
          )
          )}
        </Select>
        
        }
        <Dialog open={dilogRand}>
            <DialogContent>
            <TableContainer>
                    <Table>
                        <TableBody>
                        <TableRow>
                                <TableCell><Typography>ID : </Typography></TableCell>
                                <TableCell><Typography>{allData[DisplayItem].id}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>NAME : </Typography></TableCell>
                                <TableCell><Typography>{allData[DisplayItem].name}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>NASA_JPL_URL : </Typography></TableCell>
                                <TableCell><Typography>{allData[DisplayItem].nasa_jpl_url}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>IS_HAZARDOUS_ASTEROID </Typography></TableCell>
                                <TableCell><Typography>{allData[DisplayItem].is_potentially_hazardous_asteroid===true?"Yes":"No"}</Typography></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={()=>setdilogRand(false)}>
                    Back
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default RandomAsteroid

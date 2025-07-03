import { createTheme } from "@mui/material";


const theme=(mode)=>createTheme({
    typography:{
     button:{
        
     }
    },
    palette: {
    mode: mode,
    
    }
})

export default theme;
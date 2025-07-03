import { CssBaseline } from "@mui/material";
import { createContext, useState } from "react";
import { ThemeProvider } from '@mui/material';
import theme from '../theme/index.js';
export const Themecontext =createContext(null);

const Themecontexprovider =({children})=>{
    const [mode,setmode]=useState('light');
    const currentTheme = theme(mode);
    const togle =()=>{
        setmode((prev)=>(prev ==='light' ? 'dark' : 'light'));
    }
return<Themecontext.Provider value={{mode,togle}}>
    <ThemeProvider theme={currentTheme}>
    <CssBaseline/>
     {children}
    </ThemeProvider>

</Themecontext.Provider>
}
export default Themecontexprovider;
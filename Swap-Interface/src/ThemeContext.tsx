import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from '@pancakeswap-libs/uikit'

const CACHE_KEY = 'IS_DARK'
const initailload = 'INITIAL_LOAD';

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}


const ThemeContext = React.createContext<ThemeContextType>({ isDark: false, toggleTheme: () => null })

const ThemeContextProvider: React.FC = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if(!(localStorage.getItem(initailload)))
    {
      localStorage.setItem(CACHE_KEY,'true');
      localStorage.setItem(initailload,'true');

    }
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    console.log("isDarkUserSetting",isDarkUserSetting);
    const themepreference = isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false;
    // console.log("themepreference",themepreference,JSON.parse(isDarkUserSetting));
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
  })

  const toggleTheme = () => {
    setIsDark((prevState: any) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? dark : light}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }

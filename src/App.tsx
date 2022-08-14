import dark from './styles/themes/dark';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import GlobalStyle from './styles/global';

import { IconContext } from 'react-icons';

import { BrowserRouter } from 'react-router-dom';
import { useTheme } from './context/ThemeProvider/useTheme';
import { Router } from './routes/Router';
import { MenuProvider } from './context/MenuProvider';
import { ImageCategoryProvider } from './context/ImageCategoryProvider';

export function App() {
  const defaultTheme = dark;

  const theme = useTheme();

  return (
    <StyledThemeProvider theme={theme ?? defaultTheme}>
      <BrowserRouter>
        <IconContext.Provider value={{ size: '28' }}>
          <MenuProvider>
            <ImageCategoryProvider>
              <Router />
            </ImageCategoryProvider>
          </MenuProvider>
        </IconContext.Provider>

        <GlobalStyle />
      </BrowserRouter>
    </StyledThemeProvider>
  );
}

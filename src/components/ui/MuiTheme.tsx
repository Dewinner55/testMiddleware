'use client';

import { createTheme, ThemeProvider, CssBaseline, Theme } from '@mui/material';
import { useEffect, useState, ReactNode } from 'react';

interface MuiThemeProps {
    children: ReactNode;
}

const MuiTheme = ({ children }: MuiThemeProps) => {
    const [muiTheme, setMuiTheme] = useState<Theme | null>(null);

    useEffect(() => {
        const theme = createTheme({
            palette: {
                mode: 'light', // Или 'dark' для темной темы
                primary: {
                    main: '#1976d2', // Основной цвет
                },
                secondary: {
                    main: '#dc004e', // Вторичный цвет
                },
                background: {
                    default: '#f5f5f5', // Цвет фона
                },
            },
            typography: {
                fontFamily: 'Inter, Arial, sans-serif', // Семейство шрифтов
                h1: {
                    fontSize: '2rem', // Размер шрифта для заголовков
                },
                body1: {
                    fontSize: '1rem', // Размер шрифта для основного текста
                },
            },
        });

        setMuiTheme(theme);
    }, []);

    if (!muiTheme) {
        return null; // Или можно добавить индикатор загрузки
    }

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default MuiTheme;

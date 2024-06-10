import { createContext, useContext, useState } from 'react';

interface Settings {
    mode: 'light' | 'dark';
}

interface SettingsContextProps {
    settings: Settings;
    saveSettings: (values: Settings) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<Settings>({ mode: 'light' });

    const saveSettings = (values: Settings) => {
        setSettings(values);
        localStorage.setItem('theme', values.mode);
    };

    return (
        <SettingsContext.Provider value={{ settings, saveSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

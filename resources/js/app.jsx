import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useMode, ColorModeContext } from '@/theme'; 

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const AppWrapper = ({ App, props }) => {
    const [theme, colorMode] = useMode(); 

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <App {...props} />
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<AppWrapper App={App} props={props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

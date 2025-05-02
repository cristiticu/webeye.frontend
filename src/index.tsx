import { createRoot } from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import { Provider as ChakraProvider } from './components/ui/provider';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </StrictMode>
);

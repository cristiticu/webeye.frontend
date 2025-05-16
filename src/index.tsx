import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider as ChakraProvider } from './components/ui/provider';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <ChakraProvider>
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>
    </ChakraProvider>
);

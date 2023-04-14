import 'public/normalize.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapperStore } from '@/app/store';
import { Provider } from 'react-redux';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapperStore.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default App;

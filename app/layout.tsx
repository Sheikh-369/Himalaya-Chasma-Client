'use client'
import { Provider } from 'react-redux';
import './globals.css';
import store from '@/lib/store/store';
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/store/hooks/hooks';
import { setUser } from '@/lib/store/auth/auth-slice';

//login logout->Create a small wrapper to run useEffect
function Rehydrate({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return <>{children}</>;
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Rehydrate>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
          </Rehydrate>
        </Provider>
        
        </body>
    </html>
  );
}
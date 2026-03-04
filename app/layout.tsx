

'use client'
import "./globals.css";
import { Lora } from 'next/font/google';
import { Provider } from "react-redux";
import { store } from "@/redux/store";


const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'], // ✅ Use normal style instead of italic
  variable: '--font-lora',
});

export default function RootLayout({ children } : {children :React.ReactNode}) {
  return (
    <html lang="en" className={lora.variable} data-theme="light">
      <body className="font-lora"> 
        <Provider store={store}>
        
          {children}
        
        </Provider>
      </body>
    </html>
  );
}

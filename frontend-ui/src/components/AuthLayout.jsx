import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from "./Footer";

export default function AuthLayout({ children }) {
    return (
        <motion.div 
            className="min-h-screen flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </motion.div>
    );
}

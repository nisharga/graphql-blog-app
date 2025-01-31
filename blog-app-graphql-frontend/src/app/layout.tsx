'use client';
import { FONT_DEFAULT, switchThemeDuration } from '@/config';
import { ThemeProvider } from '@/providers/theme-provider';

import React from 'react';
import '../styles/global.css';
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000' // Replace with your API URL
});

const authLink = setContext((_, { headers }) => {
    if (typeof window !== 'undefined') {
        // Ensure we are on the client side before accessing sessionStorage
        const token = sessionStorage.getItem('authToken'); // Get the token dynamically
        return {
            headers: {
                ...headers,
                Authorization: token ? `${token}` : '' // Set the Authorization header
            }
        };
    }
    return { headers }; // Return headers unchanged if on the server
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

// const client = new ApolloClient({
//     uri: 'http://localhost:4000/',
//     cache: new InMemoryCache()
// });

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={`${FONT_DEFAULT.variable} ${switchThemeDuration}`}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                >
                    <ApolloProvider client={client}>{children}</ApolloProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

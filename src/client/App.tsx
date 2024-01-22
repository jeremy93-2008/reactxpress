import React from 'react';
import { Counter } from './components/Counter';

export function App() {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="/styles.css"></link>
                <title>My app</title>
            </head>
            <body>
                <div>
                    <h1>App</h1>
                    <p>App content</p>
                    <Counter />
                </div>
            </body>
        </html>
    );
}

export default App;
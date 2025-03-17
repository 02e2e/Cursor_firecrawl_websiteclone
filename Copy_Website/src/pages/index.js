import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    // Redirect to the scraped content
    window.location.href = '/scraped-content.html';
  }, []);
  
  return (
    <>
      <Head>
        <title>Redirecting to Scraped UI</title>
        <meta name="description" content="Redirecting to the scraped UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.5rem'
      }}>
        Redirecting to scraped content...
      </div>
    </>
  );
}
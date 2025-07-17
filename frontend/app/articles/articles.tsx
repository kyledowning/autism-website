import React, { useState, useEffect } from 'react';

export default function Articles() {

    // Fetch JSON from server.
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('http://127.0.0.1:5055/api/data').then(response => response.json()).then(
            response => {
                console.log(response.data);
                setData(response.data);
            }
        ).catch(error => {
            console.log("API request failed.", error);
        });
    }, []);
    if (!data) {
        return <h1>No entry</h1>
    }

    // Render JSON response as a table.
    return (
        <div className='min-h-screen'>
`        <div className='flex justify-center p-10'>
          <table>
            <tr className='bg-gray-800'>
                <th className='border border-gray-300 p-4 py-5'>ID</th>
                <th className='border border-gray-300 p-4 py-5'>Title</th>
                <th className='border border-gray-300 p-4 py-5'>Description</th>
            </tr>
            {data.map(entry => (
              <tr>
                <td className='border border-gray-300 p-4 py-3'>{entry.id}</td>
                <td className='border border-gray-300 p-4 py-3'>{entry.title}</td>
                <td className='border border-gray-300 p-4 py-3'>{entry.description}</td>
              </tr>))}
            </table>
          </div>
        </div>
      );
}

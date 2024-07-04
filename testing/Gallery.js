import '../styles/Gallery.css'; // Import your CSS file for styles
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/uploads')
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the images!", error);
            });
    }, []);

    return (
        <div className="gallery">
            {images.map((image, index) => (
                <a href="/upload" key={index}>
                    {image.image ? (
                        <img alt={image.text} src={`http://localhost:5000/${image.image}`} className="gallery-image" />
                    ) : (
                        <div className="gallery-title">{image.text}</div>
                    )}
                </a>
            ))}
        </div>
    );
};

export default Gallery;

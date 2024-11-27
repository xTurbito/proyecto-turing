import React from 'react';
import header from '../assets/img/header.jpg';
import wemake from '../assets/img/wemake.webp'
import '../css/CompIndexBlog.css';  


const CompIndexBlog = () => {
    return (
        <div className="header-container">
            <img className='blog-header-img' src={header} alt="Header" />
            <div className="overlay-text">
                <h1>Encuentra la propiedad de tus sueños</h1>
                <p>Explora las mejores oportunidades en bienes raíces para tu futuro.</p>
            </div>
            <section className="contenedor nosotros" id="nosotros">
                <div className='texto'>
                    <h2>WE MAKE IT HAPPEN</h2>
                    <p className='texto-lorem'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam et in soluta magni harum alias quo, itaque sed dolore, molestiae ad impedit illo excepturi vitae eius iusto tempora illum. Mollitia?</p>
                </div>
                <div>
                    <img className='wemake' src={wemake} alt="" />
                </div>
            </section>
            <section className='contenedor desarrollos'>
                <h2>Desarrollos</h2>
            </section>
        </div>
    );
}

export default CompIndexBlog;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/CompIndexBlog.css';  // Asegúrate de que este archivo tenga estilos personalizados
import header from '../assets/img/header.jpg';
import wemake from '../assets/img/wemake.webp';

const URL = 'http://localhost:8000/slide-principal/';
const URL_DESARROLLOS = 'http://localhost:8000/slide-desarrollos/';
const URL_SOCIOS = 'http://localhost:8000/socios/';

const CompIndexBlog = () => {
  const [slidesPrincipal, setSlidesPrincipal] = useState([]);
  const [slideDesarrollos, setSlideDesarrollos] = useState([]);
  const [socios, setSocios] = useState([]);

  useEffect(() => {
    getSlidesPrincipal();
    getSlidesDesarrollos();
    getSocios();
  }, []);

  const getSlidesPrincipal = async () => {
    try {
      const res = await axios.get(URL);
      setSlidesPrincipal(res.data);
    } catch (error) {
      console.error('Error al obtener las imágenes del slide:', error.response ? error.response.data : error);
      setSlidesPrincipal([]);
    }
  };

  const getSlidesDesarrollos = async () => {
    try {
      const res = await axios.get(URL_DESARROLLOS);
      setSlideDesarrollos(res.data);
    } catch (error) {
      console.error('Error al obtener las imágenes del slide desarrollos:', error.response ? error.response.data : error);
      setSlideDesarrollos([]); 
    }
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const getSocios = async () => {
    try {
      const res = await axios.get(URL_SOCIOS);
      setSocios(res.data);
    } catch (error) {
      console.error('Error al obtener las imágenes de los socios', error.response ? error.response.data : error);
      setSocios([]); 
    }
  };

  return (
    <div className="header-container">
      {/* Carrusel principal */}
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          {slidesPrincipal.length > 0 ? (
            slidesPrincipal.map((slide, index) => {
              const imagePath = slide.image;
              const imageUrl = imagePath ? `http://localhost:8000${imagePath}` : header;

              return (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={slide.id}>
                  <img 
                    src={imageUrl} 
                    className="d-block img-carousel" 
                    alt={slide.name || "Slide"}
                    onError={(e) => { e.target.src = header }} // Manejo de error en carga de imágenes
                  />
                </div>
              );
            })
          ) : (
            <div className="carousel-item active">
              <img src={header} className="d-block w-100" alt="Loading" />
            </div>
          )}
        </div>
        <div className="overlay-text">
          <h1>Encuentra la propiedad de tus sueños</h1>
          <p>Explora las mejores oportunidades en bienes raíces para tu futuro.</p>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Sección "Nosotros" */}
      <section className="contenedor nosotros" id="nosotros">
      <div className="row align-items-center">
        <div className="col-md-6 text-start">
          <h2>WE MAKE IT HAPPEN</h2>
          <div className="divider"></div>
          <p className="texto-lorem">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam et in soluta magni harum alias quo, itaque sed dolore, molestiae ad impedit illo excepturi vitae eius iusto tempora illum. Mollitia?
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img className="wemake img-fluid" src={wemake} alt="We Make It Happen" />
        </div>
      </div>
</section>


      {/* Sección "Desarrollos" con react-slick */}
      <section className="contenedor desarrollos">
        <h2 className='text-start'>Desarrollos</h2>
        <div className="divider mb-5"></div>
        {slideDesarrollos.length > 0 ? (
          <Slider {...settings}>
            {slideDesarrollos.map((slide) => {
              const imagePath = slide.image;
              const imageUrl = imagePath ? `http://localhost:8000${imagePath}` : header;

              return (
                <div key={slide.id}>
                  <img 
                    src={imageUrl} 
                    className="d-block img-carousel" 
                    alt={slide.name || "Slide"} 
                    style={{ width: 'auto', height: '100%' }}
                  />
                </div>
              );
            })}
          </Slider>
        ) : (
          <div className="carousel-item active">
            <img src={header} className="d-block w-100" alt="Loading" />
          </div>
        )}
      </section>

      <section className="contenedor socios">
        <h2 className='text-start'>Socios</h2>
        <div className="divider mb-5"></div>
        <div className="row">
          {socios.length > 0 ? (
            socios.map((socio) => (
              <div key={socio.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img 
                    src={`http://localhost:8000${socio.image}`} 
                    className="card-img-top" 
                    alt={socio.name || "Socio"} 
                    onError={(e) => { e.target.src = header }} // Imagen de respaldo
                  />
                  <div className="card-body">
                    <h5 className="card-title">{socio.name}</h5>
                    <p className="card-text">{socio.subtitle}</p>
                    <p className="card-text">{socio.descripcion}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No hay socios disponibles en este momento.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default CompIndexBlog;

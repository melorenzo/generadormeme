import React, { useState, useEffect , useContext} from 'react'
import Slider from 'react-slick';
import { GeneralContext } from "../contexts/GeneralContext"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const Caroussel = ({ selectedImage, textStyle }) => {
  const { setTexto1, seturlFoto } = useContext(GeneralContext);

  const handleClick = (event, url) => {
    seturlFoto(url);
    setTexto1(""); // Limpiamos el texto al cambiar la imagen
  };

  useEffect(() => {
    // Actualizamos el texto en el contexto al cambiar textStyle
    if (textStyle) {
      setTexto1(textStyle.text);
    }
  }, [textStyle]);

    const [imagenes, setimagenes] = useState([]);
    

    

    useEffect(() => {
  
  
      fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(response => setimagenes(response.data.memes))
        .catch(err => console.error(err));
       
       
  
    }, []);
  
    useEffect(() => {
  
    }, [imagenes])
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 320,
          settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 2, slidesToScroll: 2, infinite: false }
        },
        {
          breakpoint: 1024,
          settings: { slidesToShow: 4, slidesToScroll: 3, infinite: false 
          }
        }
      ]
      
    };





    return (
      <div className="contenedor-slider">
      <Slider {...settings}>
        {imagenes.map((imagen) => (
          <div key={imagen.id}>
            <img
              src={imagen.url}
              style={{ width: '100%', height: '700px', ...textStyle }}
              alt=""
              onClick={(event) => handleClick(event, imagen.url)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Caroussel
import React from 'react';
import Product from './Product';

import './Home.css'

function Home () {
    return ( 
        <div className="home">
            <div className="home_container">
                <img 
                className="home_image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt=""/>
                <div className="home_row">
                    <Product 
                    id="345678945"
                    title="The lean startup"
                    price={19.99}
                    rating={5}
                    image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"/>
                    <Product 
                    id="456789567"
                    title="Ultrabook 2en1 Dell 7405 Ryzen 7 4700u 16gb Ssd512 14 1,5kg"
                    price={989.99}
                    rating={3}
                    image="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6409/6409061cv3d.jpg"/>
                </div>
                <div className="home_row">
                <Product 
                    id="456789567"
                    title="Aspiradora Robot Gadnic Z900 Trapeadora"
                    price={36.99}
                    rating={4}
                    image="https://images.bidcom.com.ar/resize?src=https://www.bidcom.com.ar/publicacionesML/productos/ROB00080/1000x1000-ROB00080.jpg&w=500&q=100"/>
                    <Product 
                    id="234562846"
                    title="Remera Jamiroquai - Talles S, M, L, XL"
                    price={16.99}
                    rating={4}
                    image="https://http2.mlstatic.com/remera-jamiroquai-silhouette-jazz-alternativa-rock-funk-ban-D_NQ_NP_756782-MLA29405707174_022019-Q.jpg"/>
                    <Product 
                    id="234567132"
                    title="Godin 5th Avenue Jazz Sunburst AAA HG Guitarra Eléctrica"
                    price={2470.00}
                    rating={3}
                    image="https://musicopolix.com/38663/guitarra-electrica-godin-5th-avenue-jazz-sunburst-aaa-hg.jpg"/>
                </div>
                <div className="home_row">
                <Product 
                    id="234997132"
                    title="Tapete de hierba Putt-A-Bout para par tres, 9 x 3 pies"
                    price={29.91}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/71TE-u9pF7L._AC_SL1500_.jpg"/>
                </div>
                <div className="home_row">
                <Product 
                    id="234567342"
                    title="Respaldo de cama - Queen Size"
                    price={120.00}
                    rating={3}
                    image="data:image/jpeg;base64,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"/>
                    <Product 
                    id="9876543"
                    title="Cafetera eléctrica Dolce Gusto de Nescafé, Genio 2, talla única , Plateado"
                    price={79.00}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/713dwHB6-tL._AC_SL1500_.jpg"/>
                    <Product 
                    id="9823456"
                    title="Neutrogena Piel sana, paquete de 1, N/A"
                    price={5.96}
                    rating={3}
                    image="https://images-na.ssl-images-amazon.com/images/I/819kWnxrBlL._SY355_.jpg"/>
                </div>
            </div>
            
        </div>
     );
}
 
export default Home;
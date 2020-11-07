import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import ProductCard from 'components/ProductCard';

const ProductList = () => {
  const [dataProduct, setDataProduct] = useState(null);
  const [style, setStyles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [styleFilter, setStyleFilter] = useState([]);
  const [deliveryFilter, setDeliveryFilter] = useState({});
  const [showFilterStyle, setFilterStyle] = useState('none');
  const [showFilterDelivery, setFilterDelivery] = useState('none');

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleStyleFilter = e => {
    setStyleFilter({...styleFilter, [e.target.value] : e.target.checked });
  };

  const handleDeliveryFilter = e => {
    setDeliveryFilter({...deliveryFilter, [e.target.value] : e.target.checked });
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios(
        'https://www.mocky.io/v2/5c9105cb330000112b649af8',
      );

      const searchResults = response.data.products.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const styleResults = searchResults.filter(item => {
        let keys = Object.keys(styleFilter).filter(key => styleFilter[key]);

        if (keys.length === 0) return item;
        return item.furniture_style.some(pair => keys.includes(pair));
      });

      const deliveryResults = styleResults.filter(item => {
        let keys = Object.keys(deliveryFilter).filter(key => deliveryFilter[key]);
        let duration = Number(item.delivery_time);

        if (keys.length === 0) return item;
        return duration < Math.max.apply(Math, keys.map(v => parseInt(v, 10)))
      });

      setDataProduct(deliveryResults);
      setStyles(response.data.furniture_styles);
    };

    fetchData();
  }, [searchTerm, styleFilter, deliveryFilter]);

  return (
    <Fragment>
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="search-input"
                placeholder="Search Furniture"
                value={ searchTerm }
                onChange={ handleChange }
              />
            </div>
          </div>

          <div className="row form-filter">
            <div className="col-6">
              <div style={{position: 'relative'}}>
                <div className="dropdown-check-list" tabIndex="100">
                  <span
                    className="anchor"
                    onClick={() => setFilterStyle(showFilterStyle === 'block' ? 'none' : 'block')}
                  >
                    Furnitue style
                  </span>

                  <ul className="items" style={{display: showFilterStyle}}>
                    {style.map((item, i) => (
                      <li key={ i }>
                        <input
                          className="styled-checkbox"
                          id={`checkbox-${i}`}
                          type="checkbox"
                          value={ item }
                          onChange={ handleStyleFilter }
                        />
                        <label htmlFor={`checkbox-${i}`}>{ item }</label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div style={{position: 'relative'}}>
                <div className="dropdown-check-list" tabIndex="100">
                  <span
                    className="anchor"
                    onClick={() => setFilterDelivery(showFilterDelivery === 'block' ? 'none' : 'block')}
                  >
                    Delivery Time
                  </span>

                  <ul className="items" style={{display: showFilterDelivery}}>
                    <li>
                      <input
                        className="styled-checkbox"
                        id="time-2"
                        type="checkbox"
                        value={ 7 }
                        onChange={ handleDeliveryFilter }
                      />
                      <label htmlFor="time-2">1 Week</label>
                    </li>

                    <li>
                      <input
                        className="styled-checkbox"
                        id="time-7"
                        type="checkbox"
                        value={ 14 }
                        onChange={ handleDeliveryFilter }
                      />
                      <label htmlFor="time-7">2 Weeks</label>
                    </li>

                    <li>
                      <input
                        className="styled-checkbox"
                        id="time-28"
                        type="checkbox"
                        value={ 28 }
                        onChange={ handleDeliveryFilter }
                      />
                      <label htmlFor="time-28">1 Month</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {dataProduct && dataProduct.map(data => (
            <div className="col-6" key={ data.name }>
              <ProductCard
                name={ data.name }
                price={ data.price }
                description={ data.description }
                categories={ data.furniture_style }
                deliveryTime={ data.delivery_time }
              />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default ProductList;

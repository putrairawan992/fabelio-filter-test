import React from 'react';
import formatter from 'utils/currencyFormater';

const ProductCard = ({name, price, description, categories, deliveryTime}) => {
  return (
    <div className="product-card">
      <div className="product-header">
        <h3>{ name }</h3>
        <span>{ formatter.format(price) }</span>
      </div>

      <div className="product-content">
        <p>{ description.substring(0, 114) }.</p>

        {categories.map((tag, i) => [
          i > 0 && ", ",
          <span key={i}>{ tag }</span>
        ])}
      </div>

      <div className="product-footer">{ deliveryTime } days</div>

    </div>
  )
}

export default ProductCard;

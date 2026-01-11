import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'

const FoodDisplay = ({ category }) => {

  const { food_list, search } = useContext(StoreContext)

  const filteredFood = food_list.filter(item => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || category === item.category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className='food-display' id='food-display'>
      <h3>Top Dishes near you</h3>

      <div className="food-display-list">
        {filteredFood.length > 0 ? (
          filteredFood.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No food found 🍽️</p>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay

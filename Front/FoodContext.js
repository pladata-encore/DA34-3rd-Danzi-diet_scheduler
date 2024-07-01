import React, { createContext, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foodItems, setFoodItems] = useState([]);

  const addFoodItem = (date, foodItem) => {
    setFoodItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (!updatedItems[date]) {
        updatedItems[date] = [];
      }
      updatedItems[date].push(foodItem);
      return updatedItems;
    });
  };

  return (
    <SafeAreaProvider>
      <FoodContext.Provider value={{ foodItems, addFoodItem, setFoodItems }}>
        {children}
      </FoodContext.Provider>
    </SafeAreaProvider>
  );
};


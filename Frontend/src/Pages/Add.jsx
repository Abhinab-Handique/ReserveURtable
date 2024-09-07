import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const App = () => {
    const navigate = useNavigate();

  const [restaurantName, setRestaurantName] = useState('');
  const [menuItems, setMenuItems] = useState([{ name: '', price: '' }]);
  const [message, setMessage] = useState('');

  const handleAddMenuItem = () => {
    setMenuItems([...menuItems, { name: '', price: '' }]);
  };

  const handleMenuItemChange = (index, field, value) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index][field] = value;
    setMenuItems(newMenuItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/resturant', {
        name: restaurantName,
        menuItems,
      });
      setMessage('Restaurant added successfully!');
      setRestaurantName('');
      setMenuItems([{ name: '', price: '' }]);
      navigate('/');
    } catch (error) {
      setMessage('Error adding restaurant');
    }
  };

  // Inline styles
  const styles = {
    appContainer: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      color: '#333',
    },
    form: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '8px',
      boxSizing: 'border-box',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    menuItem: {
      marginBottom: '20px',
    },
    menuItemInput: {
      width: 'calc(50% - 10px)',
      padding: '8px',
      marginRight: '10px',
      boxSizing: 'border-box',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    addButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      margin: '10px 0',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    submitButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      margin: '10px 0',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    message: {
      textAlign: 'center',
      color: '#d9534f',
    },
  };

  return (<>
   
    
    <div style={styles.appContainer}>
      <h1 style={styles.header}>Add Restaurant</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="restaurantName" style={styles.label}>Restaurant Name:</label>
          <input
            type="text"
            id="restaurantName"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <h2>Menu Items</h2>
        {menuItems.map((item, index) => (
          <div key={index} style={styles.menuItem}>
            <label htmlFor={`itemName-${index}`} style={styles.label}>Item Name:</label>
            <input
              type="text"
              id={`itemName-${index}`}
              value={item.name}
              onChange={(e) => handleMenuItemChange(index, 'name', e.target.value)}
              required
              style={styles.menuItemInput}
            />
            <label htmlFor={`price-${index}`} style={styles.label}>Price:</label>
            <input
              type="number"
              id={`price-${index}`}
              value={item.price}
              onChange={(e) => handleMenuItemChange(index, 'price', e.target.value)}
              required
              style={styles.menuItemInput}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddMenuItem}
          style={styles.addButton}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.addButton.backgroundColor}
        >
          Add Another Menu Item
        </button>
        <button
          type="submit"
          style={styles.submitButton}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor}
        >
          Submit
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
    </>
  );
};

export default App;

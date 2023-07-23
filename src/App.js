import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 8px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductCard = styled.div`
  width: 23%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 10px;
`;

function App() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = async () => {
    try {
      let searchUrl = 'https://fakestoreapi.com/products';
      if (searchText) {
        searchUrl += `?title=${searchText}`;
      } else if (searchCategory) {
        searchUrl += `?category=${searchCategory}`;
      }

      const response = await axios.get(searchUrl);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <AppContainer>
      <h1>Product Search App</h1>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>
      <ProductsContainer>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={product.image} alt={product.title} />
              <p>{product.title}</p>
              <p>{product.category}</p>
            </ProductCard>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </ProductsContainer>
    </AppContainer>
  );
}

export default App;

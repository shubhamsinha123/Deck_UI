/* eslint-disable linebreak-style */
// AuthContext.js
import React, {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => {
    // Implement your login logic here
    setAuthenticated(true);
  };

  const logout = () => {
    // Implement your logout logic here
    setAuthenticated(false);
  };

  return <AuthContext.Provider value={{authenticated, login, logout}}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => {
  return useContext(AuthContext);
};

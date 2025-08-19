import React from 'react'
import { createContext, useContext, useState } from 'react';
import { useCart } from './Hooks';

const searchContext = createContext();
const SearchHooks = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmedSearchTerm, setConfirmedSearchTerm] = useState('');
    const [searchFilter, setSearchFilter] = useState(false);
    const { data } = useCart();

    const handleClickSearch = () => {
        setConfirmedSearchTerm(searchTerm);
        setSearchFilter(true);
    }

    const clearSearch = () => {
        setSearchTerm('');
        setConfirmedSearchTerm('');
        setSearchFilter(false);
    }

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(confirmedSearchTerm.toLowerCase())
    );

    const value = {
        searchTerm,
        setSearchTerm,
        searchFilter,
        handleClickSearch,
        filteredData,
        clearSearch
    }

    return <searchContext.Provider value={value}>{children}</searchContext.Provider>;
}
export const useSearch = () => useContext(searchContext);

export default SearchHooks
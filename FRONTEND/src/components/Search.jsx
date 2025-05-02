import React from 'react'
import { Search } from 'lucide-react'
import { useSearch } from '../Hooks/SearchHooks'
const SearchComp = () => {
    
    const {
        searchTerm,
        setSearchTerm,
        handleClickSearch
    } = useSearch();
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleClickSearch();
        }
    }
    
    return (
        <div className="relative sm:w-40 md:w-80">
            <div className="flex items-center">
                <input
                    type='text'
                    placeholder='Search...'
                    className='border border-gray-300 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button 
                    onClick={handleClickSearch}
                    className="absolute right-3"
                >
                    <Search className="text-gray-400 cursor-pointer" size={18}  />
                </button>
            </div>
        </div>
    )
}

export default SearchComp
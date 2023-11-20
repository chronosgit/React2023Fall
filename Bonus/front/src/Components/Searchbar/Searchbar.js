import { useEffect, useState } from "react";
import axios from "axios";

import { Oval } from  'react-loader-spinner'

function Searchbar({setUsers}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isSearched, setIsSearched] = useState(false);

    // const refreshController = new AbortController();
    // const searchController = new AbortController();

    useEffect(() => {
        if(isSearching && searchQuery !== "") {
            const timerId = setTimeout(async () => {
                try {
                    const response = await axios.get("http://localhost:3001/refresh", {
                        // signal: refreshController.signal,
                        withCredentials: true,
                        credentials: "include",
                    });
                    localStorage.removeItem("accessToken");
                    localStorage.setItem("accessToken", response.data.accessToken);
        
                    const users = await axios.get("http://localhost:3001/search/", {
                        // signal: searchController.signal,
                        withCredentials: true,
                        credentials: "include",
                        params: {
                            searchQuery,
                        },
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                        }
                    });
        
                    if(users !== undefined) {
                        setUsers(prev => {
                            return [
                                users,
                                ...users?.data?.data,
                            ]
                        });
                        setIsSearched(true);
                        setIsSearching(false);
                    }
                } catch(error) {
                    setIsSearched(false);
                    setIsSearching(false);
                    console.error(error);
                }

                return () => {
                    console.log("cleared");
                    clearTimeout(timerId);
                }
            }, 2000);
        }
    }, [isSearching])

    function handleInputChange(event) {
        if(event.target.value === "") {
            setIsSearching(false);
            setIsSearched(false);
        } else {
            setIsSearching(true);
            setIsSearched(false);
        }

        setUsers([]);
        setSearchQuery(event.target.value);

        // refreshController.abort();
        // searchController.abort();
    } 

    return (
        <div className="searchbar">
            <input 
                name="searchQuery" value={searchQuery}
                className="searchbar_input" placeholder="Search new people to chat with..."
                onChange={handleInputChange} 
            />

            {
                isSearching && !isSearched && searchQuery !== "" && 
                <Oval 
                    height={20}
                    width={20}
                    color="white"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="black"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            }
        </div>
    )
}

export default Searchbar;
import { useQuery } from "react-query";

const getItems = async (query: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search?query=${query}`);
        const items = await response.json();
        return items;
    } catch (error) {
        console.log('context error: ', error);
        return [];
    }
};

const useItemsQuery = (query: string) => {
    return useQuery([query], () => getItems(query), { refetchOnWindowFocus: false, enabled: false });
};


export { useItemsQuery };
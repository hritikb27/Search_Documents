import { useQuery } from "react-query";

const getItems = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search`);
        const items = await response.json();
        return items;
    } catch (error) {
        console.log('context error: ', error);
        return [];
    }
};

const useItemsQuery = () => {
    return useQuery(["items"], () => getItems());
};


export { useItemsQuery };
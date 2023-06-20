import { v4 } from 'uuid';
import { Item } from '../interfaces/ItemInterface';

export const addItem = async (item: Item) => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addItem`, {
            method: 'POST', body: JSON.stringify({ item: {...item, id: v4()} }), headers: {
                'Content-Type': 'application/json'
            }
        })
        return true;
        
    } catch (error) {
        console.log('context error: ', error)
        return false;
    }
};
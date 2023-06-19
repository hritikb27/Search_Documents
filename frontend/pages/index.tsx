import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import { useItemsQuery } from '../hooks/queries'

const inter = Inter({ subsets: ['latin'] })

export default function SearchText() {
  const [userInput, setUserInput] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { data, error, isLoading } = useItemsQuery();

  useEffect(() => {
    console.log('data: ', data)
  }, [data])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('submit')
    const sendReq = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addItem`, {
      method: 'POST', body: JSON.stringify({ "item": 'testing-id' }), headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <div className='bg-gray-200 h-screen flex flex-col items-center justify-start px-24 pt-4 gap-8'>
      <h2 className='text-2xl text-gray-900 font-bold'>Search</h2>

      <div className='w-full justify-center items-center gap-10 pl-24 flex'>
        <form onSubmit={handleSubmit} className='pt-2 relative w-[50%] text-gray-600'>
          <input
            className="border-2 border-gray-300 w-full bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
            <svg
              className="text-gray-800 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </form>
        <button onClick={()=>setOpenModal(true)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold flex h-[80%] items-center justify-self-center px-4 rounded">
          Upload
        </button>
      </div>
      <Modal open={openModal} setOpen={setOpenModal} />
    </div>
  )
}

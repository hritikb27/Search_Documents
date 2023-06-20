import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import FormModal from '../components/Documents/FormModal'
import { useItemsQuery } from '../hooks/queries'
import RenderDocs from '../components/Documents/RenderDocs'
import LoadingModal from '../components/Loading/LoadingModal'

const inter = Inter({ subsets: ['latin'] })

export default function SearchText() {
  const [userInput, setUserInput] = useState<string>('')
  const [openFormModal, setOpenFormModal] = useState<boolean>(false)
  const [openLoadingModal, setOpenLoadingModal] = useState<boolean>(false)
  const { data, refetch, error, isLoading } = useItemsQuery(userInput);

  useEffect(() => {
    if (!data && isLoading) setOpenLoadingModal(true)
    else setOpenLoadingModal(false)
  }, [data, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    refetch()
  }

  return (
    <div className='bg-gray-200 overflow-y-auto h-screen flex flex-col items-center justify-start px-24 pt-4 gap-8'>
      <h2 className='text-2xl text-gray-900 font-bold'>Search</h2>

      <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-10  flex'>
        <form onSubmit={handleSubmit} className='pt-2 relative w-[100%] sm:w-[50%] text-gray-600'>
          <input
            className="border-2 border-gray-300 w-full bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            type="search"
            name="search"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
            <img src='./sendIcon.svg' className="text-gray-800 h-4 w-4 fill-current" />
          </button>
        </form>
        <button onClick={() => setOpenFormModal(true)} className="sm:mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold flex h-[35px] sm:h-[80%] items-center justify-self-center px-4 rounded">
          Upload
        </button>
      </div>
      {data && data.length > 0 && <span className='text-black flex gap-1'><p className='font-semibold'>{data.length} posts </p> <p>were found</p></span>}
      <FormModal open={openFormModal} setOpen={setOpenFormModal} />
      <LoadingModal open={openLoadingModal} setOpen={setOpenLoadingModal} />
      {data && data.length > 0 && <RenderDocs docs={data || []} query={userInput} />}
    </div>
  )
}

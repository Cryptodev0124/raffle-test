import React, { useState, useEffect } from 'react'
import { pools } from '~/utils/constants'
import { Pool } from './Pool'
import LeftArrow from '~/assets/left-arrow.svg'
import RightArrow from '~/assets/right-arrow.svg'

interface CarouselComponentProps {
  id: string | undefined
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ id }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(1)

  const filteredPools = pools.filter((pool) => pool.id !== id)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3)
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(1)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initialize the number of items per page

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredPools.length - itemsPerPage : prevIndex - 1,
    )
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredPools.length - itemsPerPage ? 0 : prevIndex + 1,
    )
  }

  return (
    <div className="relative w-full mx-auto">
      <style>
        {`
        .glow {
            // font-size: 40px;
            color: #fff;
            text-align: center;
            animation: glow 1s ease-in-out infinite alternate;
          }

          @-webkit-keyframes glow {
            from {
              text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
            }
            
            to {
              text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
            }
          }

          .hover-animation-2:hover {
            transform: scale(1.02);
            box-shadow: 0 0 10px #0073e633, 0 0 5px #0073e633, 0 0 10px #0073e633, 0 0 20px #0073e633, 0 0 30px #0073e633, 0 0 40px #0073e633;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          }
          
          .blue-glow {
            animation: blue-glow 1.25s ease-in-out infinite alternate;
          }

          @-webkit-keyframes blue-glow {
            from {
              text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0073e677, 0 0 40px #0073e677, 0 0 50px #0073e677, 0 0 60px #0073e677, 0 0 70px #0073e677;
            }
            
            to {
              text-shadow: 0 0 20px #fff, 0 0 30px #4da6ff77, 0 0 40px #4da6ff77, 0 0 50px #4da6ff77, 0 0 60px #4da6ff77, 0 0 70px #4da6ff77, 0 0 80px #4da6ff77;
            }
          }
        `}
      </style>
      <div className="overflow-hidden flex flex-col md:flex-row">
        <div className="flex justify-center md:justify-start">
          <button
            className="px-[24px] md:px-[20px] py-8 bg-[#FFFFFF08] md:bg-[#FFFFFF00] text-gray rounded mb-8 md:mb-0 mr-0 md:-mr-2 text-[32px] relative"
            onClick={prevSlide}
          >
            <img
              src={LeftArrow}
              width="32px"
              className="absolute left-[6px] top-[8px] md:top-[45%]"
            />
          </button>
        </div>
        <div className="overflow-hidden">
          <div
            className="flex flex-row transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {/* Slice the pools data based on the current live page */}
            {filteredPools.map((pool) => (
              <div
                key={pool.id}
                className="flex-shrink-0 w-full flex items-center justify-center md:px-6 py-12"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div className="hover-animation-2 blue-glow">
                  <Pool
                    id={pool.id}
                    name={pool.name}
                    stakeAmount={pool.stakeAmount}
                    size={pool.size}
                    theme={pool.theme}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <button
            className="px-[24px] py-8 bg-[#FFFFFF08] md:bg-[#FFFFFF00] text-gray rounded mt-8 md:mt-0 mr-0 md:-mr-2 text-[32px] relative"
            onClick={nextSlide}
          >
            <img
              src={RightArrow}
              width="32px"
              className="absolute left-[6px] top-[8px] md:top-[45%]"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarouselComponent

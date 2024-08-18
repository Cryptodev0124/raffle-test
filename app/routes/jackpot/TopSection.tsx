import React from 'react'

const TopSection: React.FC = () => (
  <>
    <style>
      {`
      .glow {
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
      .yolo-card {
        align-items: center;
        background-color: #35317877;
        border: 1px solid #7862fe77;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
      }
      .yolo-title {
        align-items: center;
        background-image: linear-gradient(to right, #842856, #353178);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
      }
      .yolo-stats {
        background-color: #1a1c42;
        font-size: 12px;
        padding: 14px 13px;
      }
      .halfbrightness {
        filter: brightness(0.5);
      }
      .yolo-button {
        background-image: linear-gradient(to right, #FFFF34, #FFDD5E, #EBA054);
      }
    `}
  </style>
  <div className="py-12">
    <div className="sm:text-lg md:text-2xl lg:font-3xl font-extrabold uppercase text-center text-white glow">
      Innit2Winnit
    </div>
  </div>
  </>
)

export default TopSection

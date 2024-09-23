import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000); // Set interval to 1 second

    if (count === 0) {
      navigate(`/${path}`, { state: location.pathname });
    }

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [count, navigate, location, path]);

  return (
    <>
      <style>
        {`
          body {
            --black: #000000;
            --ash-black: #222;
            --white: #fafafa;
            --sky: #00ccff;
            --green: #22dddd;
            --blue: #1300ff;
            --dusk: #6600ff;
            --purple: #9900ff;
            --pink: #ff0066;
            --red: #fe0222;
            --orange: #fd7702;
            --yellow: #ffbb00;
            --gradient: linear-gradient(135deg, var(--blue), var(--purple), var(--pink));
            --accent: var(--white);
            margin: 0;
            padding: 0;
            background: var(--gradient);
            color: var(--accent);
            padding-bottom: 100px;
            overflow: hidden;
          }

          #root {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }

          * {
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
          }

          h1 {
            font-size: 36px;
            font-weight: 600;
            letter-spacing: -0.5px;
            line-height: 1.2;
            text-align: center;
            margin-bottom: 20px;
            transition: opacity 0.5s ease-in-out;
            opacity: ${count > 0 ? 1 : 0};
          }

          .box {
            width: 150px;
            height: 150px;
            background: var(--accent);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            border-radius: 20px;
          }
          
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
      <div className="container">
        <h1>Redirecting in {count} second{count !== 1 ? 's' : ''}...</h1>
        <motion.div
          className="box"
          animate={{
            scale: [1, 1.5, 1.5, 1, 1],
            rotateY: [0, 180, 360],
            rotateZ: [0, 0, 180, 180, 0],
            borderRadius: ["20%", "50%", "50%", "20%", "20%"],
            boxShadow: [
              "0px 0px 10px rgba(255, 255, 255, 0.2)",
              "0px 0px 20px rgba(255, 255, 255, 0.5)",
              "0px 0px 30px rgba(255, 255, 255, 0.8)",
              "0px 0px 40px rgba(255, 255, 255, 1)",
              "0px 0px 10px rgba(255, 255, 255, 0.2)"
            ]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
      </div>
    </>
  );
};

export default Spinner;

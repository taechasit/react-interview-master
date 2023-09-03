
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Modal from "./components/Modal/Modal"
import CarsLits from "./pages/Cars/CarsLits"
import "./App.css";
import { useEffect, useState } from "react"

function App() {
  const [isOpen, setisOpen] = useState(false)
  const [cartcount, setCartcount] = useState(0)

  const onAction = () => {
    setisOpen(!isOpen)
  }

  const onAddCar = (cardata) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    cart.push({ ...cardata, days: 1 })
    setCartcount(cart.length)
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  const update = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    setCartcount(cart.length)
  }
  useEffect(() => {
    update()

  }, [])

  return (
    <div>
      <Modal isOpen={isOpen} onAction={onAction} update={update}></Modal>
      <Navbar onAction={onAction} cartcount={cartcount} ></Navbar>
      <CarsLits onAddCar={onAddCar}></CarsLits>
      <Footer></Footer>
    </div>
  );
}

export default App;

import { useCallback, useEffect, useState } from "react"
import defualtcar from "../../assets/dufaultcar.svg"
import "./Modal.css"

export default function Modal({ isOpen, onAction, update }) {
    const [cart, setCart] = useState([])
    const [allDiscount, setAllDiscount] = useState({})
    const [total, settotal] = useState(0)

    const actiondate = (index, data) => {
        let temp = cart
        temp[index].days += data
        if (temp[index].days === 0) {
            temp.splice(index, 1)
        }
        setCart([...temp])
        calTotal([...temp], allDiscount)
        localStorage.setItem("cart", JSON.stringify([...temp]));
        update()
    }

    const mapCartList = () => {
        return cart.map((m, i) => {
            return <div className="cartdetaillist" key={i}>
                <div className="cartimg">
                    <img src={m.photo} alt="" onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = defualtcar;
                    }} />
                </div>
                <div className="cartdetail">
                    <div className="name">{m.title}</div>
                    <div className="price">{m.price} THB/Day</div>
                </div>
                <div className="incday">
                    <button className="incdaybtn" onClick={() => actiondate(i, 1)}>+</button>
                    <span className="incdaytext">{m.days}</span>
                    <button className="incdaybtn" onClick={() => actiondate(i, -1)}>-</button>
                </div>
            </div>
        })
    }

    const onenterCode = (e) => {
        const discount = JSON.parse(localStorage.getItem("discount")) || {}
        if (discount[e.target.value]) {
            setAllDiscount({ ...allDiscount, [e.target.value]: discount[e.target.value] })
            calTotal(cart, { ...allDiscount, [e.target.value]: discount[e.target.value] })
        }
    }

    const calTotal = useCallback((tempcart, tempallDiscount) => {
        let total = tempcart.reduce((acc, cur) => { return acc = (cur.price * cur.days) + acc }, 0) - Object.values(tempallDiscount).reduce((acc, cur) => { return acc = cur + acc }, 0)
        if (total < 0) total = 0
        settotal(total)
    }, [])

    useEffect(() => {
        if (isOpen) {
            const cartTemp = JSON.parse(localStorage.getItem("cart")) || []
            setCart(cartTemp)
            calTotal(cartTemp, allDiscount)
        } else {
            setAllDiscount({})
        }

    }, [isOpen, calTotal])

    return <div className={`modalbase ${isOpen ? "active" : ""}`}>
        <div className="backdrop" onClick={onAction}></div>
        <div className="mainmodal">
            <div className="header mainflexcenter">
                <div className="title">Cart</div>
                <div className="x" onClick={onAction}>X</div>
            </div>
            <div className="carlist">
                {mapCartList()}
            </div>
            <div className="discount">
                <input type="text" placeholder="Discount Code" onChange={onenterCode} />
            </div>
            <div className="total">
                <div className="text ">Total</div>
                <div className="price ">{cart.reduce((acc, cur) => { return acc = (cur.price * cur.days) + acc }, 0)} THB</div>
            </div>
            <div className="totaldiscount">
                <div className="text ">Discount</div>
                <div className="price ">{Object.values(allDiscount).reduce((acc, cur) => { return acc = cur + acc }, 0)} THB</div>
            </div>
            <div className="grandtotal">
                <div className="text ">Grand Total</div>
                <div className="price ">{total} THB</div>
            </div>
        </div>
    </div>;
}
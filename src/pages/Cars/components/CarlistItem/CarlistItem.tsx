import { memo, useEffect } from "react";
import "./CarListItem.css"
import CarItem from "../CarItem/CarItem"

function Car({ carlist, getCarList,onAddCar }) {
    const mapCarList = () => {
        return carlist.map((m, i) => {
            return <CarItem data={m} key={i} onAddCar={onAddCar}></CarItem>
        })
    }

    useEffect(() => {
        getCarList()
    }, [getCarList])

    return <div className="carlistitem">
        <div className="mainmargin carlistitemcontainer">
            {mapCarList()}
        </div>
    </div>;
}

export default memo(Car)
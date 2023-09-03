import "./CarsList.css"
import { useCallback, useEffect, useState } from "react";
import CarsListFilter from "./components/CarsListFilter/CarsListFilter"
import CarListItem from "./components/CarlistItem/CarlistItem"

export default function Car({ onAddCar }) {
    const [carlist, setCarlist] = useState([])
    const [carlistFilterd, setCarlistFilterd] = useState([])
    // const [discountList, setdiscountList] = useState({})

    const onFilterCar = useCallback((params = { sort: '1', name: '' }) => {
        let temp = carlist.filter(f => {
            return f.fields.title.includes(params.name)
        }).sort((a, b) => {
            if (params.sort === '1') {
                return a.fields.price - b.fields.price
            } else {
                return b.fields.price - a.fields.price
            }
        })
        setCarlistFilterd([...temp])
    }, [carlist])

    const getCarList = useCallback(
        () => {
            fetch("https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car&access_token=VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o", {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(res => res.json())
                .then(json => {
                    console.log(json)
                    setCarlist(json.items)
                })
                .catch(error => console.log(error))
        },
        [],
    )

    const getDiscount = useCallback(
        () => {
            fetch("https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=discount&access_token=VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o", {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(res => res.json())
                .then(json => {
                    let temp = {}
                    json.items.forEach(m => {
                        temp[m.fields.code] = m.fields.amount
                    })
                    localStorage.setItem("discount", JSON.stringify(temp));
                    onFilterCar()
                    // setdiscountList({ ...temp })

                })
                .catch(error => console.log(error))
        },
        [onFilterCar],
    )
    useEffect(() => {
        getDiscount()
    }, [getDiscount])

    return <div>
        <CarsListFilter onFilterCar={onFilterCar}></CarsListFilter>
        <CarListItem carlist={carlistFilterd} getCarList={getCarList} onAddCar={onAddCar}></CarListItem>
    </div>;
}
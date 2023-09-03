import "./CarsListFilter.css"
import arrow from "../../../../assets/arrow.svg"
import { useState } from "react"

export default function Car({ onFilterCar }) {
    const [params, setParams] = useState({ name: '', sort: '1' })

    let onChangetext = (event, key) => {
        setParams({ ...params, [key]: event.target.value })
        onFilterCar({ ...params, [key]: event.target.value })
    }

    return <div className="CarsListFilter">
        <div className="mainflexcenter mainmargin CarsListFiltercontainer">
            <div className="maintext">Car Available</div>
            <div className="mainfilterinput">
                <div className="textinput">
                    <input type="text" placeholder="Search Car" onChange={(event) => onChangetext(event, 'name')} value={params.name} />
                </div>
                <div className="selectinput">
                    <img src={arrow} alt="arrow" />
                    <select name="" id="" onChange={(event) => onChangetext(event, 'sort')} value={params.sort}>
                        <option value={'1'}>Price: Low - High</option>
                        <option value={'0'}>Price: High - Low</option>
                    </select>
                </div>
            </div>
        </div>
    </div>;
}
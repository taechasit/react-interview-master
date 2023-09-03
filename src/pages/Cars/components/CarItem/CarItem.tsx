import "./CarItem.css"
import defualtcar from "../../../../assets/dufaultcar.svg"


export default function Car({ data,onAddCar }) {

    return <div className="caritemContainer" key={data.sys.id}>
        <div className="carimage">
            <img src={data.fields.photo} alt="" onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = defualtcar;
            }} />
        </div>
        <div className="detail">
            <div className="cartitle">{data.fields.title}</div>
            <div className="carprice">{data.fields.price} THB/Day</div>
            <button className="addtocartbtn" onClick={() => onAddCar(data.fields)}>Add to cart</button>
        </div>
    </div>
}
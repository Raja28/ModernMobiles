import { useEffect, useState } from "react";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { setFilterProducts } from "../features/productSlice";
import { useNavigate, useParams } from "react-router-dom";

const radioButtonString = [
  "4 Stars & above",
  "3 Stars & above",
  "2 Stars & above",
  "1 Stars & above",
];

export const Sidebar = () => {

  // const [priceRange, setPriceRange] = useState(150000);
  const { userSelectedBrand } = useParams();
  const navigate = useNavigate()
  // const endPoint = `/${userSelectedBrand}`

  const [filter, setFilter] = useState({
    priceRange: 60000,
    category: [],
    rating: "",
    sortBy: "",
  });

  const { products} = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    if (products?.length !== 0) {
      let priceRange = filter.priceRange
      let category = [...filter.category]
      let rating = filter.rating
      let sortBy = filter.sortBy

      dispatch(setFilterProducts({ priceRange, category, rating, sortBy }))
    }
  }, [filter.priceRange, filter.category, filter.rating, filter.sortBy])

  function onChangeFilterHandler(e) {
    const { name, value, checked } = e.target;
    // console.log(name, value);

    if (name === "category") {
      if (checked) {
        setFilter((prev) => ({
          ...prev,
          [name]: [...prev[name], value],

        }));
      } else {
        setFilter((prev) => ({
          ...prev,
          [name]: prev[name].filter((data) => data !== value),
        }));
      }
      return;
    }

    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(filter);

  }

  // function clearFilterHandler() {
  //   setFilter(
  //     {
  //       priceRange: 150000,
  //       category: [],
  //       rating: "",
  //       sortBy: "",
  //     }
  //   )

  //   window.location.reload()
  // }


  function handlerOnSubmit(e) {
    e.preventDefault();
  
  }

  return (
    <div className="border  rounded">
      <div className="col-auto px-4 mb-5">
        <form onSubmit={handlerOnSubmit}>
          <div className="d-flex justify-content-between mt-1 ">
            <p className="fw-bold">Filter</p>
            <p role="button" className="text-decoration-underline"
              onClick={() => window.location.reload()}>
              Clear
            </p>
          </div>

          {/* Price */}
          <div className="mt-3">
            <div className="form-group">
              <label htmlFor="formControlRange" className="fw-bold">
                Price:
              </label>
              <br />

              <input
                type="range"
                className="form-control-range"
                min={10000}
                max={60000}
                step={10000}
                // defaultValue={150000}
                id="formControlRange"
                name="priceRange"
                value={filter.priceRange}
                onChange={(e) => onChangeFilterHandler(e)}
              />
              <br />
            </div>
            <div style={{ fontSize: "0.9rem" }}>
              {" "}
              Range: 10000 to{" "}
              <span
                className="border bg-white p-1 "
                style={{ fontSize: "0.9rem" }}
              >
                {" "}
                {filter.priceRange}
              </span>
            </div>
          </div>

          {/* Category */}
          <div className="mt-3">
            <p className="fw-bold mb-2">Category</p>

            <div className="d-flex gap-2">
              <input
                type="checkbox"
                id="flagship"
                name="category"
                value={"flagship"}
                onChange={(e) => onChangeFilterHandler(e)}
              />

              <label htmlFor="flagship">Flagship Smartphones</label>
            </div>

            <div className="d-flex gap-2">
              <input
                type="checkbox"
                id="premium"
                name="category"
                value={"premium"}
                onChange={(e) => onChangeFilterHandler(e)}
              />
              <label htmlFor="premium">Premium Smartphones</label>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-3">
            <p className="fw-bold mb-1">Rating</p>
            <div>
              {radioButtonString.map((str, index) => (
                <div key={str} className="d-flex gap-2">
                  <input
                    type="radio"
                    className=" "
                    id={str}
                    disabled={index === 3 || index === 2 ? true : false}
                    name="rating"
                    value={str.split(" ")[0]}
                    onChange={(e) => onChangeFilterHandler(e)}
                  />
                  <label htmlFor={str} className="">
                    {str}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Sort-by */}
          <div className="mt-3">
            <p className="fw-bold mb-1">Sort By</p>
            <div className="d-flex flex-column">
              <div className="d-flex  gap-2">
                <input
                  type="radio"
                  id="lowToHigh"
                  name="sortBy"
                  value={"lowToHigh"}
                  onChange={(e) => onChangeFilterHandler(e)}
                  className=""
                />

                <label htmlFor="lowToHigh" className="form-check-label">

                  Price-Low to High
                </label>
              </div>
              <div className="d-flex  gap-2">
                <input
                  type="radio"
                  id="highToLow"
                  name="sortBy"
                  value={"highToLow"}
                  onChange={(e) => onChangeFilterHandler(e)}
                  className=""
                />
                <label htmlFor="highToLow" className="form-check-lebal">
                  Price-High to Low
                </label>
              </div>
            </div>
          </div>
          {/* <button className="btn btn-primary mt-2 float-end" type="submit">
            Apply
          </button> */}
        </form>
      </div>
    </div>
  );
};

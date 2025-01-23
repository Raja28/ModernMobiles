import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

export const AddressForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { addressId } = useParams()

    const [userAddress, setUserAddress] = useState({
        firstName: "", lastName: "", contact: "", address: ""
    })
    const { firstName, lastName, contact, address, city, state, zip } = userAddress

    return (
        <>
            <Header />
            <div className="container border" style={{ marginTop: "5.5rem", minHeight: "calc(100vh - 5.7rem)" }}>
                <div>
                    <h2 className="text-center">{addressId ? "Update Address" : "Add Address"}</h2>
                </div>
                <form className="row border border-primary">
                    <div className="col-md-6">
                        <label for="firstName" className="form-label">First Name</label>
                        <input type="rext"
                            className="form-control"
                            value={firstName}
                            name="firstName"
                            placeholder="First Name"
                            id="firstName" />
                    </div>
                    <div className="col-md-6">
                        <label for="lastName" className="form-label">Last Name</label>
                        <input type="text"
                            className="form-control"
                            value={lastName}
                            name="lastName"
                            placeholder="Last Name"
                            id="lastName" />
                    </div>
                    <div className="col-12">
                        <label for="address" className="form-label">Address</label>
                        <input type="text"
                            className="form-control"
                            id="address"
                            value={address}
                            name="address"
                            placeholder="Apartment, studio, or floor" />
                    </div>

                    <div class="col-md-6">
                        <label for="city" class="form-label">City</label>
                        <input
                            type="text"
                            class="form-control"
                            value={city}
                            name="city"
                            placeholder="City"
                            id="inputCity" />
                    </div>
                    <div class="col-md-6">
                        <label for="state" class="form-label">State</label>
                        <input
                            type="text"
                            class="form-control"
                            value={state}
                            name="state"
                            placeholder="State"
                            id="state" />
                    </div>

                    <div class="col-md-2">
                        <label for="zip" class="form-label">Zip</label>
                        <input
                            type="text"
                            class="form-control"
                            value={zip}
                            name="zip"
                            placeholder="Zip"
                            id="zip" />
                    </div>

                    <div class="col-md-2">
                        <label for="contact" class="form-label">Phone</label>
                        <input
                            type="text"
                            class="form-control"
                            value={contact}
                            name="contact"
                            id="contact" />
                    </div>



                    <div className="col-12">
                        <button type="submit"
                            className="btn btn-primary">
                            Sign in
                        </button>
                    </div>
                </form>

            </div>
        </>
    )

}
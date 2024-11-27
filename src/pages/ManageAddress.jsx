import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { deliveryMan } from "../util/api"
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { addUserAddress, deleteUserAddress, updateUserAddress } from "../features/userSlice"
import toast from "react-hot-toast"

export const ManageAddress = () => {
    const { user, status } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const { address: originalAddress } = user
    // console.log(originalAddress);


    const [editAddress, setEditAddress] = useState(false);
    const [editBtnIdentifyNum, setEditBtnIdentifierNum] = useState("");
    const [addressIndex, setAddressIndex] = useState(-1)
    // console.log("editBtnIdentifier", editBtnIdentifier);



    const [userAddress, setUserAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        contact: "",
        addressId: ""
    });

    function handlerOnChange(e) {
        const { name, value } = e.target
        // console.log(name, value);

        setUserAddress(prev => ({
            ...prev,
            [name]: value
        }))


    }



    function handlerEditAddress(addressId) {
        setEditAddress(prev => !prev)

        if (!editAddress) {
            // console.log("editAddress", !editAddress);
            setEditBtnIdentifierNum(addressId)
            const addressIdx = originalAddress.findIndex(add => add._id === addressId)
            setAddressIndex(addressIdx)
            const { firstName, lastName, address, city, state, pinCode, contact } = originalAddress[addressIdx]
            setUserAddress({
                firstName, lastName, address, city, state, pinCode, contact
            })

        } else {
            setUserAddress({
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                state: "",
                pinCode: "",
                contact: ""
            })
            setEditBtnIdentifierNum("")
        }
    }

    function handlerOnSubmitAddEditAddress() {

        // if edit is true - update data
        if (editAddress) {

            // check wheather user made any changes in the existing data or not, If changes made by 
            // the user make call, else show toast to the user and return

            const { firstName, lastName, address, city, state, pinCode, contact } = originalAddress[addressIndex]

            if (firstName === userAddress.firstName && lastName === userAddress.lastName && contact === userAddress.contact &&
                city === userAddress.city && pinCode === userAddress.pinCode && address === userAddress.address && state === userAddress.state
            ) {
                toast.error("No changes so far")
                return
            }
            const updatedData = userAddress
            updatedData.addressId = editBtnIdentifyNum
            dispatch(updateUserAddress(updatedData))

        } else {
            // add new addresss
            if (!userAddress.firstName || !userAddress.lastName || !userAddress.contact ||
                !userAddress.city || !userAddress.pinCode || !userAddress.address || !userAddress.state
            ){
                toast.error("All Fields Required")
                return
            }
            dispatch(addUserAddress(userAddress))

        }

        setUserAddress({
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            pinCode: "",
            contact: ""
        })
        setEditAddress(false)
        setEditBtnIdentifierNum("")
    }

    // function handlerCancelEdit() {

    // }

    function handlerDeleteAddress(addressId) {
        // console.log(addressId);
        dispatch(deleteUserAddress(addressId))

    }

    return (
        <>
            <Header />
            <div className="container " style={{ marginTop: "5.5rem", minHeight: "calc(100vh - 5.7rem)" }}>
                <h2 className=" text-center">MANAGE ADDRESS</h2>
                <div className="d-flex gap-2 flex-wrap-reverse flex-lg-nowrap" style={{ minHeight: "calc(100vh - 8.5rem)" }}>
                    {/* left part */}
                    <div className="w-100" style={{ minWidth: "50%", }}>

                        {
                            originalAddress.length == 0 ?
                                (
                                    <div className="text-center d-flex flex-column align-items-center justify-content-center  "
                                        style={{ minHeight: "" }}>

                                        <img src={deliveryMan}
                                            alt="delivery-man"
                                            className="img-fluid shadow object-fit-contain"
                                            style={{ height: "20rem" }}
                                        />

                                        <p className="fw-semibold my-2">No Address Found</p>
                                    </div>
                                ) :
                                (
                                    <div className="overflow-auto vh-auto"  >
                                        <ul className="list-group list-group-flush list-group-numbered">
                                            {
                                                originalAddress?.map((address, index) => (
                                                    <li key={index} className="list-group-item d-flex flex-wrap justify-content-between 
                                                     my-2 shadow-sm">
                                                        <div className="card-body">
                                                            <p className="m-0"><strong>Name: </strong> {address?.firstName} {address?.lastName}</p>
                                                            <p className="m-0"><strong>Phone: </strong>{address?.contact}</p>
                                                            <p className="m-0"><strong>City & State: </strong>{address?.city}, {address?.state}</p>
                                                            <p className="m-0"><strong>Address: </strong>
                                                                {address?.address}
                                                            </p>
                                                        </div>

                                                        <div className="d-flex flex-sm-column my-2  
                                                          gap-2">
                                                            {
                                                                editAddress && editBtnIdentifyNum === address?._id ? (

                                                                    <button type="button"
                                                                        onClick={() => handlerEditAddress()}
                                                                        className="btn btn-warning btn-sm"
                                                                        disabled={status === "loading" || editAddress && editBtnIdentifyNum !== address?._id ? true : false}
                                                                    >
                                                                        Canel Edit
                                                                    </button>
                                                                )
                                                                    : (<button
                                                                        onClick={() => handlerEditAddress(address?._id)}
                                                                        className="btn btn-warning btn-sm "
                                                                        disabled={status === "loading" || editAddress && editBtnIdentifyNum !== address?._id ? true : false}
                                                                    >
                                                                        Edit
                                                                        <CiEdit className="mx-2" />
                                                                    </button>)
                                                            }
                                                            <button
                                                                onClick={() => handlerDeleteAddress(address?._id)}
                                                                className="btn btn-danger btn-sm"
                                                                disabled={status === "loading" ? true : false}
                                                            >
                                                                Delete
                                                                <RiDeleteBin6Line className="mx-2" />
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                        }

                    </div>

                    {/* right */}
                    <div className="w-100" style={{ minWidth: "50%", height: "100%" }}>
                        {/* <h4 className="text-center mt-3">Address Form</h4> */}
                        <div className="card
                         border mx-auto  " style={{ minWidth: "90%", minHeight: "85%" }}>
                            <div className="card-body  p-0">

                                {/* first & last Name */}
                                <div className=" d-flex m-0 gap-2">

                                    <div className="  ">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            name="firstName"
                                            required={true}
                                            value={userAddress.firstName}
                                            onChange={handlerOnChange}
                                            placeholder="First Name" />
                                    </div>
                                    <div className=" col-md-6">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            required={true}
                                            value={userAddress.lastName}
                                            onChange={handlerOnChange}
                                            className="form-control"
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Last Name" />
                                    </div>
                                </div>

                                {/* phone & City */}
                                <div className="d-flex my-2 gap-2">
                                    <div className="">
                                        <label htmlFor="phone">Phone</label>
                                        <input type="text"

                                            className="form-control"
                                            id="phone"
                                            name="contact"
                                            required={true}
                                            value={userAddress.contact}
                                            onChange={handlerOnChange}
                                            placeholder="1234567890" />
                                    </div>
                                    <div>
                                        <div className="">
                                            <label htmlFor="city">City</label>
                                            <input
                                                type="text"
                                                required={true}
                                                value={userAddress.city}
                                                onChange={handlerOnChange}
                                                className="form-control"
                                                id="city"
                                                name="city"
                                                placeholder="City"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="form-group">
                                <label for="inputAddress2">Address 2</label>
                                 <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                               </div> */}
                                <div className="d-flex gap-2">

                                    <div className="">
                                        <label htmlFor="state">State</label>
                                        <input type="text"
                                            required={true}
                                            className="form-control"
                                            id="state"
                                            name="state"
                                            value={userAddress.state}
                                            onChange={handlerOnChange}
                                            placeholder="State"
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="pinCode">Pin Code</label>
                                        <input type="text"
                                            required={true}
                                            className="form-control"
                                            value={userAddress.pinCode}
                                            onChange={handlerOnChange}
                                            id="pinCode"
                                            name="pinCode"
                                            placeholder="Pin Code"
                                        />
                                    </div>

                                </div>
                                <div className="my-2">
                                    <label htmlFor="address">Address</label>
                                    <textarea type="text"
                                        rows={2}
                                        cols={22}
                                        required={true}
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        value={userAddress.address}
                                        onChange={handlerOnChange}
                                        placeholder="1234 Main St" />
                                </div>

                                {
                                    editAddress ? (
                                        <div className="d-flex gap-2 mt-3 justify-content-end">

                                            <button type="button"
                                                disabled={status === "loading" ? true : false}
                                                onClick={() => handlerOnSubmitAddEditAddress()}
                                                className="btn btn-success btn-sm">
                                                Save
                                            </button>

                                            <button type="button"
                                                disabled={status === "loading" ? true : false}
                                                onClick={() => handlerEditAddress()}
                                                className="btn btn-warning btn-sm">
                                                Canel Edit
                                            </button>
                                        </div>
                                    )
                                        : (
                                            <div className="mt-3 ">

                                                <button
                                                    onClick={() => handlerOnSubmitAddEditAddress()}
                                                    type="buton"
                                                    disabled={status === "loading" ? true : false}
                                                    className="btn btn-primary btn-sm float-end">
                                                    Add New Address
                                                </button>
                                            </div>
                                        )
                                }

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
import Header from "./Header"

export const Loading = () => {
    return (
        <>
            <Header />
            <div className="container d-flex flex-column justify-content-center align-items-center " style={{ minHeight: "100vh" }}>
                <div className="spinner-border  mt-5  " role="status">
                </div>
                <span className="sr-only">Loading...</span>

            </div>
        </>
    )
}
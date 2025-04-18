import {Outlet} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



const Root = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header></Header>
           
            <Outlet></Outlet>
            <Footer></Footer>
            {/* <Home></Home> */}
        </div>
    );
};

export default Root;
import "./App.css";
import { filterData,apiUrl } from "./data";
import FilterNavbar from "./components/FilterNavbar";
import Spinner from "./components/Spinner";
import Cards from "./components/Cards";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function App() {
  const[loading,setLoading]=useState(true);
  const [courses,setCourses]=useState([]);
  const [category,setCategory]=useState(filterData[0].title);

  // ab sabse pehle data fetch karna padega 
  async function fetchData() {
    setLoading(true);
    try{
      let response=await fetch(apiUrl);
      let output=await response.json();
      setCourses(output.data);
    }
    catch(error){
      toast.error("Network me koi dikkat hai");
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  },[])



  return (
    // main div jiske andar sab kuch hai
    <div className="min-h-screen w-[100%] flex flex-col bg-bgDark2">

      {/* heading */}
      <div>
        <Header/>
      </div>

      <div className="bg-bgDark2">
        <FilterNavbar
        filterData={filterData}
        category={category}
        setCategory={setCategory}
        />
      </div>

      <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]"> 
        {/*filter ke baad cards and loading*/ }
        {
          loading ? (<Spinner/>):(<Cards
          courses={courses} category={category}/>)
        }
      </div>
    </div>
  );
}

export default App;

import MainSection from "@/components/mainSection";
import SideBar from "@/components/Sidebar";

export default function Home() {
  return (

    <div className="flex itrem-center">
    <SideBar/>

      <div className="ms-150">     <MainSection />
      </div>
    </div>
  );
}

import { Navbar } from "@/components/ui/NavBar";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

export default function ResultsLayout({ params } : { params : { id: string }}) {
  return (
    <div className='flex h-screel flex-col'>
      <Navbar>
        <ThemeSwitcher />
      </Navbar>

      <div className='flex-1 flex flex-col'>
        <p>Results for {params.id}</p>
      </div>
    </div>
  );
};

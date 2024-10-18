import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function AppLayout(props: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header></Header>
      <main className="flex-1">
        <div className="container relative">{props.children}</div>
      </main>
      <Footer></Footer>
    </div>
  );
}

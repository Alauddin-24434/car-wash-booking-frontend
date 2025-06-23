import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div >
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )


}

export default layout;
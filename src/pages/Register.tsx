
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Register from "@/components/auth/Register";

const RegisterPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-custom">
          <Register />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;

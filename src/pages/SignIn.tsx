
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SignIn from "@/components/auth/SignIn";

const SignInPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-custom">
          <SignIn />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignInPage;

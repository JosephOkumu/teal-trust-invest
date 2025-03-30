import { ExternalLink, CheckCircle } from 'lucide-react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const CDSGuide = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block">
              <span className="px-2 py-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium border border-teal-500/20">
                CDS Account Guide
              </span>
            </div>
            <h1 className="mt-6 mb-4 text-4xl font-bold">How to Get Your CDS Account</h1>
            <p className="text-muted-foreground text-lg">
              Follow these simple steps to create your Central Depository System (CDS) account
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-8 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Start Your Application</h2>
                <p className="text-muted-foreground">
                  Begin by visiting the official DhowCSD portal to create your CDS account
                </p>
              </div>
              <Button 
                className="flex items-center gap-2 py-6 px-8 text-base"
                onClick={() => window.open("https://dhowcsd.centralbank.go.ke/", "_blank")}
              >
                Go to DhowCSD Portal <ExternalLink className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Create Your DhowCSD Account</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>On the DhowCSD page, click the "Create Account" button.</p>
                    <p>Provide your login details and accept the terms and conditions.</p>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                      <p className="font-medium text-foreground">💡 Tip:</p>
                      <p>Use a strong password and an email address you check regularly, as verification will be sent to this email.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Enter Your Biographical Data</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Start the registration process by providing your personal information:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>National ID number</li>
                      <li>Nationality</li>
                      <li>KRA PIN number</li>
                    </ul>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                      <p className="font-medium text-foreground">💡 Tip:</p>
                      <p>Ensure all information matches your official documents to avoid verification issues.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 3: Enter Settlement Details</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Select your account type and provide settlement information:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Choose account type: Individual, Joint Account, or Legal Entity</li>
                      <li>Enter your bank account details for settlements</li>
                      <li>Provide additional information as required for your account type</li>
                    </ul>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                      <p className="font-medium text-foreground">💡 Tip:</p>
                      <p>Use the same bank account you plan to use for your investment activities.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 4: Upload Required Documents</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Upload the following documents as applicable:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>KRA PIN certificate</li>
                      <li>Recent passport-sized photo</li>
                      <li>Board resolution (for corporate accounts)</li>
                      <li>Tax exemption certificate (where applicable)</li>
                    </ul>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                      <p className="font-medium text-foreground">💡 Tip:</p>
                      <p>Ensure all documents are clear, legible scans or photos. File size should typically be under 5MB per document.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 5: Verify Email and Wait for Validation</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Complete the process by verifying your email address when prompted.</p>
                    <p>After verification, your application will be reviewed by the CDS team.</p>
                    <p>You will receive notification once your account is approved and activated.</p>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border">
                      <p className="font-medium text-foreground">💡 Tip:</p>
                      <p>The validation process typically takes 1-3 business days. If you don't hear back within a week, you can contact DhowCSD support for assistance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Once you have your CDS account, return to KenyaStocks to complete your registration</p>
            <Button 
              className="py-6 px-8 text-base"
              onClick={() => window.location.href = "/register"}
            >
              Back to Registration
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CDSGuide;
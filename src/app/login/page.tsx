import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-white rounded-full p-3 shadow-lg mb-4">
            <img 
              src="https://raw.githubusercontent.com/stackblitz/stackblitz-icons/main/files/vicki-ai-logo.png" 
              alt="Vicki.AI"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white">Vicki.AI</h1>
          <p className="text-blue-200 mt-2">Medical Dashboard Access</p>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign in to continue</CardTitle>
            <CardDescription>Access your medical dashboard</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-white text-black hover:bg-gray-100 border border-gray-200" 
              variant="outline"
              asChild
            >
              <Link href="/">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="mr-2 h-4 w-4" />
                Continue with Google
              </Link>
            </Button>
            
            <Button 
              className="w-full bg-[#2F2F2F] text-white hover:bg-[#444444]" 
              variant="outline"
              asChild
            >
              <Link href="/">
                <img src="https://www.microsoft.com/favicon.ico" alt="Microsoft" className="mr-2 h-4 w-4" />
                Continue with Microsoft
              </Link>
            </Button>
            
            <Button 
              className="w-full bg-[#0A66C2] text-white hover:bg-[#0D4F8C]" 
              variant="outline"
              asChild
            >
              <Link href="/">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4c1.86 0 3.41 1.28 3.86 3H8.14c.45-1.72 2-3 3.86-3zm0 14c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4z" />
                </svg>
                Enterprise SSO
              </Link>
            </Button>
            
            <div className="text-center pt-2">
              <Button 
                variant="ghost" 
                className="text-sm"
                asChild
              >
                <Link href="/">
                  Skip login (Demo Mode)
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

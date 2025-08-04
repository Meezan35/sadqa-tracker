import Sidebar from './Components/Sidebar'
import { UserProvider } from './context/UserContext'
import { ModalProvider  } from './context/ModalContext'
import './globals.css'


export const metadata = {
  title: 'Sadqa Tracker',
  description: 'Track your sadqa and charitable donations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
       
            <UserProvider>
          <ModalProvider> {/* Wrap with ModalProvider */}
            <div className="flex">
              <Sidebar />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </ModalProvider>
        </UserProvider>
        
      </body>
    </html>
  )
}
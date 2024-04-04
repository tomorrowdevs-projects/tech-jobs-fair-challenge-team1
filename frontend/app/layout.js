import 'styles/theme.scss';

export const metadata = {
    title: 'TechSolutions Inc',
    description: 'TechSolutions Inc - Admin dashboard',
    keywords: ''
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className='bg-light'>
                {children}
            </body>
        </html>
    )
}

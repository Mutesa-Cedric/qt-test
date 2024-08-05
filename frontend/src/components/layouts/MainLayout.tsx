import React from 'react'
import Navbar from '../Navbar'
import AddOrEditPostModal from '../modals/AddOrEditPost'
import DeletePostModal from '../modals/DeletePost'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-gray-100 w-full min-h-screen gap-y-6">
            <AddOrEditPostModal />
            <DeletePostModal />
            <Navbar />
            <div className="max-w-7xl mx-auto px-6">
                {children}
            </div>
        </main>
    )
}
